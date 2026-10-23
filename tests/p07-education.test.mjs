import test from "node:test";
import assert from "node:assert/strict";
import { validateArticle } from "../packages/article/src/index.js";
import { createLearningProgress } from "../packages/state/src/index.js";
import { gradeQuiz } from "../packages/article-renderer/src/index.js";

function articleWithBlock(block) {
  return {
    kind: "intui.article", schemaVersion: "1.0.0", id: "education-fixture", locale: "en", dir: "ltr",
    title: "Educational interaction fixture",
    summary: "A valid article envelope for P07 educational contract tests.",
    metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["en"], provenance: [] },
    assets: [], initialState: {}, derived: {},
    sections: [{ id: "education", heading: "Education", blocks: [block] }],
  };
}

test("EDU-02 rejects an unsupported declared quiz question type", () => {
  const result = validateArticle(articleWithBlock({
    id: "quiz-one", type: "quiz", props: { label: "Quick quiz", questions: [
      { id: "question-one", type: "executable", prompt: "Which answer is correct?", answer: "a" },
    ] },
  }));
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.code === "INVALID_QUIZ_QUESTION_TYPE"));
});

test("EDU-02 validates scoring keys and option references for supported quiz question types", () => {
  const quiz = (question) => articleWithBlock({ id: "quiz-one", type: "quiz", props: { label: "Quick quiz", questions: [question] } });
  const badChoice = validateArticle(quiz({ id: "q1", type: "single-choice", prompt: "Choose one", options: [{ id: "a", label: "A" }, { id: "b", label: "B" }], answer: "missing" }));
  const badMultiple = validateArticle(quiz({ id: "q1", type: "multiple-choice", prompt: "Choose all", options: [{ id: "a", label: "A" }, { id: "b", label: "B" }], answer: ["a", "a"] }));
  const badMatch = validateArticle(quiz({ id: "q1", type: "matching", prompt: "Match", pairs: [{ id: "left-a", label: "Alpha" }], options: [{ id: "right-a", label: "One" }], answer: { "left-a": "unknown" } }));
  const badOrder = validateArticle(quiz({ id: "q1", type: "ordering", prompt: "Order", items: [{ id: "a", label: "A" }, { id: "b", label: "B" }], answer: ["a", "a"] }));
  for (const result of [badChoice, badMultiple, badMatch, badOrder]) assert.equal(result.ok, false);
});

test("EDU-01/04 require stable selectable children and timeline dates", () => {
  const make = (type, children) => ({
    id: `${type}-one`, type, bindings: { selected: "activePanel" }, props: { label: "Learning sequence" }, children,
  });
  const children = [
    { id: "step-one", type: "group", props: { label: "First" }, children: [{ id: "step-copy-one", type: "paragraph", content: "First step content." }] },
    { id: "step-two", type: "group", props: { label: "Second" }, children: [{ id: "step-copy-two", type: "paragraph", content: "Second step content." }] },
  ];
  const article = (block, values) => {
    const value = articleWithBlock(block); value.initialState.activePanel = { type: "enum", value: values[0], values }; return value;
  };
  const validStepper = validateArticle(article(make("stepper", children), ["step-one", "step-two"]));
  assert.equal(validStepper.ok, true, JSON.stringify(validStepper.errors));
  const invalidStepper = validateArticle(article(make("stepper", children), ["step-one"]));
  assert.equal(invalidStepper.ok, false);
  const timeline = children.map((child, index) => ({ ...child, props: { ...child.props, date: index === 0 ? "2026-01-01" : "2026-02-31" } }));
  const invalidTimeline = validateArticle(article(make("timeline", timeline), ["step-one", "step-two"]));
  assert.equal(invalidTimeline.ok, false);
});

test("EDU-03/06 validate flashcard records and numeric progress bindings", () => {
  const flashcards = validateArticle(articleWithBlock({ id: "cards", type: "flashcards", props: { cards: [
    { id: "card-one", front: "Prompt", back: "Answer" }, { id: "card-two", front: "Another prompt", back: "Another answer" },
  ] } }));
  assert.equal(flashcards.ok, true);
  const badFlashcards = validateArticle(articleWithBlock({ id: "cards", type: "flashcards", props: { cards: [{ id: "same", front: "Prompt", back: "Answer" }, { id: "same", front: "Prompt 2", back: "Answer 2" }] } }));
  assert.equal(badFlashcards.ok, false);
  const progressArticle = articleWithBlock({ id: "progress", type: "progress", props: { label: "Course progress", max: 8 }, bindings: { value: "doneCount" } });
  progressArticle.initialState.doneCount = { type: "integer", value: 2, min: 0, max: 8 };
  assert.equal(validateArticle(progressArticle).ok, true);
  progressArticle.initialState.doneCount = { type: "string", value: "two" };
  assert.equal(validateArticle(progressArticle).ok, false);
  progressArticle.initialState.doneCount = { type: "integer", value: 2 };
  assert.equal(validateArticle(progressArticle).ok, false, "an unbounded state value cannot back a determinate progress bar");
});

test("EDU-07 validates guided scenario comparisons and their selected-state contract", () => {
  const block = { id: "guided", type: "guidedComparison", props: { label: "Compare approaches", scenarios: [
    { id: "scenario-a", label: "Approach A", left: { label: "Method", value: "A" }, right: { label: "Outcome", value: "Stable" }, rationale: "A remains stable under this condition." },
    { id: "scenario-b", label: "Approach B", left: { label: "Method", value: "B" }, right: { label: "Outcome", value: "Fast" }, rationale: "B is faster for this condition." },
  ] }, bindings: { selected: "scenario" } };
  const article = articleWithBlock(block);
  article.initialState.scenario = { type: "enum", value: "scenario-a", values: ["scenario-a", "scenario-b"] };
  assert.equal(validateArticle(article).ok, true);
  article.initialState.scenario.values = ["scenario-a"];
  assert.equal(validateArticle(article).ok, false);
});

test("EDU-02 grades every supported question type deterministically", () => {
  const questions = [
    { id: "single", type: "single-choice", answer: "b", weight: 2, explanation: "B is correct." },
    { id: "multiple", type: "multiple-choice", answer: ["a", "c"] },
    { id: "boolean", type: "true-false", answer: true },
    { id: "short", type: "short-answer", acceptedAnswers: ["state machine"] },
    { id: "match", type: "matching", answer: { left: "right", top: "bottom" } },
    { id: "order", type: "ordering", answer: ["first", "second", "third"] },
  ];
  const result = gradeQuiz(questions, {
    single: "b", multiple: ["c", "a"], boolean: true, short: " State   Machine ",
    match: { top: "bottom", left: "right" }, order: ["first", "second", "third"],
  });
  assert.deepEqual({ score: result.score, maximumScore: result.maximumScore, correctCount: result.correctCount }, { score: 7, maximumScore: 7, correctCount: 6 });
  const incorrect = gradeQuiz(questions, { single: "a", multiple: ["a"], boolean: false, short: "unknown", match: {}, order: ["third", "second", "first"] });
  assert.equal(incorrect.score, 0);
});

test("EDU-06 exposes stable, per-session progress snapshots without implicit persistence", () => {
  const progress = createLearningProgress(["lesson-a", "quiz-a"]);
  const initial = progress.getSnapshot();
  assert.equal(initial.sessionOnly, true);
  assert.equal(initial.completedCount, 0);
  progress.setSelection("lesson-a", "step-two");
  progress.markCardReviewed("lesson-a", "card-1");
  progress.setScore("quiz-a", 3, 4);
  const snapshot = progress.getSnapshot();
  assert.equal(snapshot.activities["lesson-a"].status, "in-progress");
  assert.deepEqual(snapshot.activities["lesson-a"].reviewedCardIds, ["card-1"]);
  assert.equal(snapshot.activities["quiz-a"].score, 3);
  assert.equal(snapshot.completedCount, 1);
  assert.throws(() => { snapshot.activities["lesson-a"].status = "complete"; }, TypeError);
});
