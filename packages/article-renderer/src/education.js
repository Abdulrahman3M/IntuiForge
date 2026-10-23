function normalizedText(value) {
  return typeof value === "string" ? value.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en") : "";
}

function sameSet(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) return false;
  const expected = new Set(right);
  return expected.size === right.length && left.every((value) => expected.has(value));
}

function sameRecord(left, right) {
  if (!left || typeof left !== "object" || Array.isArray(left) || !right || typeof right !== "object" || Array.isArray(right)) return false;
  const leftKeys = Object.keys(left).sort();
  const rightKeys = Object.keys(right).sort();
  return leftKeys.length === rightKeys.length && leftKeys.every((key, index) => key === rightKeys[index] && left[key] === right[key]);
}

function isCorrect(question, response) {
  switch (question.type) {
    case "single-choice": return typeof response === "string" && response === question.answer;
    case "multiple-choice": return sameSet(response, question.answer);
    case "true-false": return typeof response === "boolean" && response === question.answer;
    case "short-answer": {
      const accepted = question.acceptedAnswers ?? [question.answer];
      return typeof response === "string" && accepted.some((answer) => normalizedText(answer) === normalizedText(response));
    }
    case "matching": return sameRecord(response, question.answer);
    case "ordering": return Array.isArray(response) && response.length === question.answer.length && response.every((item, index) => item === question.answer[index]);
    default: return false;
  }
}

/** Deterministically grade a validated quiz without executing article-provided code. */
export function gradeQuiz(questions, answers) {
  if (!Array.isArray(questions)) throw new TypeError("Quiz grading requires a question array.");
  const responseMap = answers && typeof answers === "object" && !Array.isArray(answers) ? answers : Object.create(null);
  const results = questions.map((question) => {
    const weight = Number.isFinite(question?.weight) && question.weight > 0 ? question.weight : 1;
    const correct = isCorrect(question ?? {}, responseMap[question?.id]);
    return Object.freeze({ id: question?.id, correct, earnedPoints: correct ? weight : 0, maximumPoints: weight, explanation: question?.explanation ?? "" });
  });
  const score = results.reduce((total, result) => total + result.earnedPoints, 0);
  const maximumScore = results.reduce((total, result) => total + result.maximumPoints, 0);
  return Object.freeze({ score: Number(score.toFixed(4)), maximumScore: Number(maximumScore.toFixed(4)), correctCount: results.filter((result) => result.correct).length, results: Object.freeze(results) });
}
