/* RichViz — reference examples.
 *
 * One valid example per registered type (plus localized variants). They are the single source for
 * the gallery, authoring template pickers, and automated tests, so a template cannot drift
 * from the schema it demonstrates.
 */
const tidy = (spec) => spec;

const processCards = tidy({
  version: 1, type: "process-cards", title: "Shared project state between two coding agents",
  description: "Claude Code writes its progress to a shared project state, and Codex reads that state before continuing the work.",
  data: {
    group: { title: "Hand-off between agents", subtitle: "One source of truth", icon: "workflow", tone: "accent" },
    orientation: "vertical",
    stages: [
      { title: "Claude Code", subtitle: "Implements the change and records what is finished", icon: "terminal", tone: "violet", status: { text: "Done", state: "ok" } },
      { title: "Shared project state", subtitle: "Files, notes and the task list that both agents read", icon: "database", tone: "info", active: true, status: { text: "Source of truth", tone: "info" } },
      { title: "Codex", subtitle: "Reads the state, reviews and continues from the same point", icon: "code", tone: "teal", progress: { value: 40, label: "Review" } },
    ],
  },
});

const stepGuide = tidy({
  version: 1, type: "step-guide", title: "Open a pull request in four steps",
  description: "Create a branch, commit the change, push it and open the pull request for review.",
  data: {
    steps: [
      { title: "Create a branch", text: "Work on a separate branch so main stays stable.", icon: "git-branch", tone: "violet", tip: "Name it after the change." },
      { title: "Commit the change", text: "Save a small, focused snapshot with a clear message.", icon: "git-commit", tone: "info" },
      { title: "Push to GitHub", text: "Send the branch to the shared repository.", icon: "upload", tone: "teal", active: true },
      { title: "Open the pull request", text: "Ask teammates to review and merge the branch.", icon: "git-pull-request", tone: "success", status: { text: "Ready for review", state: "ok" } },
    ],
  },
});

const pipeline = tidy({
  version: 1, type: "pipeline", title: "Request path through a web service",
  description: "A browser request passes the load balancer and the application server, which reads the database and returns a response.",
  data: {
    returnPath: { label: "Response" },
    stages: [
      { title: "Browser", subtitle: "Sends the request", icon: "monitor", tone: "info", outputs: ["HTTP request"], linkLabel: "HTTPS" },
      { title: "Load balancer", subtitle: "Picks a healthy server", icon: "network", tone: "violet", inputs: ["Request"], outputs: ["Routed request"] },
      { title: "App server", subtitle: "Runs the business logic", icon: "server", tone: "teal", active: true, inputs: ["Routed request"], outputs: ["Query"] },
      { title: "Database", subtitle: "Stores the data", icon: "database", tone: "orange", status: { text: "Healthy", state: "ok" }, inputs: ["Query"] },
    ],
  },
});

const processFlow = tidy({
  version: 1, type: "process-flow", title: "Should this change be merged?",
  description: "Checks run first. If they pass and a reviewer approves, the change is merged; otherwise the author fixes it and runs the checks again.",
  data: {
    direction: "TB",
    nodes: [
      { id: "start", title: "Change ready", icon: "flag", tone: "info", shape: "pill" },
      { id: "checks", title: "Automated checks", subtitle: "Tests, lint, security", icon: "list-check", tone: "violet" },
      { id: "pass", title: "Checks pass?", shape: "diamond", tone: "warning" },
      { id: "review", title: "Peer review", subtitle: "A teammate approves", icon: "users", tone: "teal" },
      { id: "fix", title: "Fix and push again", icon: "wrench", tone: "danger" },
      { id: "merge", title: "Merge", icon: "git-merge", tone: "success", shape: "pill" },
    ],
    edges: [
      { from: "start", to: "checks" }, { from: "checks", to: "pass" },
      { from: "pass", to: "review", label: "Yes", tone: "success" }, { from: "pass", to: "fix", label: "No", tone: "danger" },
      { from: "fix", to: "checks", dashed: true }, { from: "review", to: "merge" },
    ],
  },
});

const kpiDashboard = tidy({
  version: 1, type: "kpi-dashboard", title: "Learning objective: merge a pull request",
  description: "The learner has completed 62 percent of the objective; checks and security pass, one review is still pending.",
  data: {
    current: { title: "Learning objective", subtitle: "Merge your first pull request safely", icon: "target", tone: "accent", progress: { value: 62, label: "Objective progress" },
      chips: [{ text: "Checks passing", state: "ok" }, { text: "1 review pending", state: "warn" }, { text: "Security clear", state: "ok" }] },
    metrics: [
      { label: "Lessons done", value: 8, unit: "/ 12", icon: "book", tone: "info", delta: { text: "+2 this week", direction: "up", tone: "success" } },
      { label: "Quiz score", value: 91, unit: "%", icon: "check-circle", tone: "success", progress: 91 },
      { label: "Open reviews", value: 1, icon: "eye", tone: "warning", note: "Waiting on a teammate" },
    ],
    progress: [{ label: "Branching", value: 100, tone: "success" }, { label: "Pull requests", value: 62, tone: "info" }, { label: "Conflict resolution", value: 20, tone: "orange" }],
    statuses: [{ label: "CI", state: "ok", text: "Passing" }, { label: "Review", state: "warn", text: "Pending" }, { label: "Deploy", state: "pending", text: "Not started" }],
  },
});

const barChart = tidy({
  version: 1, type: "bar-chart", title: "Monthly cost by model",
  description: "Model C costs the least per month, Model A the most; values are in US dollars.",
  options: { engine: "chartjs" },
  data: { chart: "bar", unit: "$", labels: ["Model A", "Model B", "Model C"], series: [{ name: "Monthly cost", values: [240, 120, 60] }], highlight: 2, axis: { y: "Cost (USD)" } },
});

const dataChart = tidy({
  version: 1, type: "data-chart", title: "Requests per hour through the day",
  description: "Traffic is low at night, rises through the morning and peaks in the early afternoon.",
  options: { engine: "chartjs" },
  data: { chart: "area", labels: ["00", "04", "08", "12", "16", "20"], unit: "k", axis: { x: "Hour", y: "Requests (thousands)" },
    series: [{ name: "Requests", values: [4, 2, 18, 46, 39, 14], tone: "info" }, { name: "Errors", values: [0.1, 0.1, 0.4, 1.2, 0.8, 0.3], tone: "danger" }] },
});

const reactFlowGraph = tidy({
  version: 1, type: "react-flow", title: "Where a commit travels",
  description: "A commit moves from the working directory to the staging area, the local repository and then the remote repository.",
  data: { graph: { version: 1,
    nodes: [
      { id: "wd", position: { x: 0, y: 0 }, data: { label: "Working directory", subtitle: "Edit files", icon: "folder", tone: "info" } },
      { id: "stage", position: { x: 330, y: 0 }, data: { label: "Staging area", subtitle: "git add", icon: "layers", tone: "violet" } },
      { id: "local", position: { x: 660, y: 0 }, data: { label: "Local repository", subtitle: "git commit", icon: "database", tone: "teal" } },
      { id: "remote", position: { x: 990, y: 0 }, data: { label: "Remote repository", subtitle: "git push", icon: "cloud", tone: "success", status: { text: "Shared", state: "ok" } } },
    ],
    edges: [
      { id: "e1", source: "wd", target: "stage", label: "add" }, { id: "e2", source: "stage", target: "local", label: "commit" }, { id: "e3", source: "local", target: "remote", label: "push", animated: true },
    ] } },
});

const nodeMap = tidy({
  version: 1, type: "node-map", title: "Git concepts map",
  description: "Repositories contain branches; branches hold commits; pull requests propose merging one branch into another.",
  data: {
    layout: "layered", direction: "LR",
    groups: [{ id: "local", label: "Local", tone: "teal" }, { id: "remote", label: "Remote", tone: "info" }],
    nodes: [
      { id: "repo", label: "Repository", subtitle: "All history", icon: "database", tone: "accent", details: "A repository stores every commit and branch of a project." },
      { id: "branch", label: "Branch", subtitle: "A line of work", icon: "git-branch", tone: "violet", group: "local", details: "A branch is a movable pointer to a commit." },
      { id: "commit", label: "Commit", subtitle: "A snapshot", icon: "git-commit", tone: "teal", group: "local", details: "A commit records the project state and a message." },
      { id: "remote", label: "Remote", subtitle: "Shared copy", icon: "cloud", tone: "info", group: "remote", details: "A remote is a copy of the repository hosted elsewhere." },
      { id: "pr", label: "Pull request", subtitle: "Review and merge", icon: "git-pull-request", tone: "success", group: "remote", status: { text: "Open", state: "ok" }, details: "A pull request proposes merging one branch into another." },
    ],
    edges: [{ from: "repo", to: "branch", label: "has" }, { from: "branch", to: "commit", label: "points to" }, { from: "repo", to: "remote", label: "syncs with" }, { from: "remote", to: "pr", label: "hosts" }, { from: "branch", to: "pr", label: "proposed in" }],
  },
});

const annotated = tidy({
  version: 1, type: "annotated", title: "Anatomy of a pull request page",
  description: "The pull request page shows the title, the changed files and the review status; numbered markers explain each area.",
  data: {
    aspect: 1.6,
    scene: { viewBox: [0, 0, 640, 400], elements: [
      { type: "rect", x: 10, y: 10, width: 620, height: 380, rx: 14, fill: "neutral", stroke: "neutral", opacity: 0.12 },
      { type: "rect", x: 30, y: 30, width: 580, height: 56, rx: 10, fill: "info", opacity: 0.25 },
      { type: "text", x: 56, y: 64, text: "Add login validation  #42", size: 22, anchor: "start", weight: "bold" },
      { type: "rect", x: 30, y: 106, width: 360, height: 250, rx: 10, fill: "neutral", opacity: 0.18 },
      { type: "line", x1: 50, y1: 150, x2: 370, y2: 150, stroke: "success", strokeWidth: 6 },
      { type: "line", x1: 50, y1: 190, x2: 300, y2: 190, stroke: "danger", strokeWidth: 6 },
      { type: "line", x1: 50, y1: 230, x2: 340, y2: 230, stroke: "success", strokeWidth: 6 },
      { type: "rect", x: 410, y: 106, width: 200, height: 250, rx: 10, fill: "warning", opacity: 0.2 },
      { type: "icon", name: "check-circle", x: 430, y: 130, size: 30, stroke: "success", label: "Checks" },
      { type: "icon", name: "users", x: 430, y: 190, size: 30, stroke: "warning", label: "Reviewers" },
    ] },
    annotations: [
      { x: 90, y: 15, title: "Title and number", text: "Names the change and gives it a number you can reference.", icon: "tag", tone: "info" },
      { x: 62, y: 38, title: "Changed lines", text: "Green lines were added, red lines were removed.", icon: "code", tone: "success" },
      { x: 93, y: 62, title: "Checks and reviewers", text: "Automated checks and the people asked to review the change.", icon: "shield", tone: "warning" },
    ],
  },
});

const infographic = tidy({
  version: 1, type: "infographic", title: "Why use version control",
  description: "Version control keeps history, supports teamwork, and makes it safe to experiment.",
  data: {
    columns: 3,
    intro: { title: "Three reasons teams adopt Git", text: "Each one removes a common risk of working on shared files.", icon: "git-branch", tone: "accent" },
    sections: [
      { title: "History", subtitle: "Never lose work", icon: "clock", tone: "info", metric: { value: "100", unit: "%", label: "Recoverable" }, text: "Every change is saved, so you can go back to any earlier state." },
      { title: "Teamwork", subtitle: "Work in parallel", icon: "users", tone: "violet", items: [{ label: "Branches", value: "Unlimited" }, { label: "Reviews", value: "Built in" }, { label: "Merges", text: "Combine work safely" }] },
      { title: "Safety", subtitle: "Experiment freely", icon: "shield", tone: "success", steps: ["Create a branch", "Try the idea", "Keep it or discard it"], progress: { value: 85, label: "Confidence" } },
    ],
  },
});

const svg = tidy({
  version: 1, type: "svg", title: "Client and server exchange",
  description: "A client sends a request to a server and the server sends back a response.",
  data: { viewBox: [0, 0, 640, 220], elements: [
    { type: "rect", x: 30, y: 60, width: 160, height: 100, rx: 16, fill: "info", opacity: 0.25, stroke: "info", strokeWidth: 2 },
    { type: "text", x: 110, y: 116, text: "Client", size: 22, weight: "bold" },
    { type: "rect", x: 450, y: 60, width: 160, height: 100, rx: 16, fill: "teal", opacity: 0.25, stroke: "teal", strokeWidth: 2 },
    { type: "text", x: 530, y: 116, text: "Server", size: 22, weight: "bold" },
    { type: "line", x1: 195, y1: 90, x2: 445, y2: 90, stroke: "violet", strokeWidth: 3, arrow: true },
    { type: "text", x: 320, y: 78, text: "Request", size: 15 },
    { type: "line", x1: 445, y1: 135, x2: 195, y2: 135, stroke: "success", strokeWidth: 3, arrow: true, dash: true },
    { type: "text", x: 320, y: 160, text: "Response", size: 15 },
  ] },
});

const custom = tidy({
  version: 1, type: "custom", title: "Branch strategies compared",
  description: "Trunk-based development favours short branches; Git Flow uses long-lived release branches.",
  data: { layout: "grid", columns: 2, blocks: [
    { block: "card", title: "Trunk-based", subtitle: "Short-lived branches", icon: "git-merge", tone: "success", text: "Merge small changes to main many times a day.", status: { text: "Fast feedback", state: "ok" } },
    { block: "card", title: "Git Flow", subtitle: "Long-lived branches", icon: "git-branch", tone: "violet", text: "Separate develop, release and hotfix branches.", status: { text: "More ceremony", state: "warn" } },
    { block: "group", title: "Compare in detail", layout: "stack", blocks: [
      { block: "tabs", items: [
        { label: "Release cadence", icon: "calendar", blocks: [{ block: "progress", label: "Trunk-based", value: 90, tone: "success" }, { block: "progress", label: "Git Flow", value: 45, tone: "violet" }] },
        { label: "Risk", icon: "alert", blocks: [{ block: "callout", title: "Watch out", text: "Long-lived branches drift and make merges painful.", tone: "warning", icon: "alert" }] },
      ] },
    ] },
    { block: "list", items: ["Pick one strategy per team", "Automate the checks", "Keep branches small"], ordered: true },
  ] },
});

const mermaidExample = tidy({
  version: 1, type: "mermaid", title: "Git branching sequence",
  description: "A feature branch is created from main, receives commits and is merged back into main.",
  data: { source: "flowchart LR\n  A[main] --> B(create feature branch)\n  B --> C[commit work]\n  C --> D{review ok?}\n  D -- yes --> E[merge into main]\n  D -- no --> C" },
});

const mediaExample = tidy({
  version: 1, type: "process-cards", title: "From screenshot to explanation",
  description: "Each stage pairs a screenshot with a short explanation of what the learner should notice.",
  data: { orientation: "horizontal", stages: [
    { title: "Open the page", subtitle: "Find the pull request tab", icon: "image", tone: "info", media: { src: "media/sample-pr-list.svg", alt: "A list of three pull requests with open status" } },
    { title: "Read the checks", subtitle: "Green means passing", icon: "check-circle", tone: "success", media: { src: "media/sample-checks.svg", alt: "Three checks, all passing" }, active: true },
  ] },
});

const chart = (title, description, kind, labels, series, axis = {}) => ({version:1,type:'data-chart',title,description,dir:'ltr',options:{engine:'chartjs',height:340},data:{chart:kind,labels,series,axis}});
const diagram = (title, description, source) => ({version:1,type:'mermaid',title,description,dir:'ltr',data:{source}});
const sourceExamples = [
chart('How a study session is composed','Stacked segments show both total study time and the contribution of each activity. Illustrative minutes; not a learning recommendation.','stacked-bar',['Monday','Tuesday','Wednesday'],[{name:'Read',values:[20,15,10],tone:'info'},{name:'Practice',values:[15,25,35],tone:'teal'},{name:'Recall',values:[10,10,15],tone:'violet'}],{y:'Minutes'}),
chart('Parts of a learning resource','A doughnut encodes mutually exclusive parts of one whole. Illustrative allocation totals 100 percent.','doughnut',['Explanation','Worked examples','Exercises','Reflection'],[{name:'Share',values:[30,25,35,10]}]),
chart('A multidimensional skill profile','Radar spokes compare strengths across dimensions on a shared 0–10 scale. Illustrative self-assessment, not an objective score.','radar',['Recall','Explain','Apply','Analyze','Evaluate'],[{name:'Before',values:[7,5,3,2,2],tone:'info'},{name:'After',values:[8,8,7,6,5],tone:'teal'}]),
chart('Association is not causation','Scatter points encode two numeric variables, including observations with similar practice time and different scores. These invented observations cannot establish causation.','scatter',[],[{name:'Observations',values:[[1,42],[2,58],[3,51],[3,76],[4,70],[5,78],[6,75],[7,90]],tone:'violet'}],{x:'Practice hours',y:'Quiz score (%)'}),
diagram('Messages over time: cache hit and miss','Lifelines, activation and alternative fragments explain who sends each message and in what temporal order. This is a sequence model rather than a process graph.',`sequenceDiagram
    participant L as Learner
    participant A as App
    participant C as Cache
    participant D as Database
    L->>A: Open lesson
    activate A
    A->>C: Look up lesson
    alt Cache hit
        C-->>A: Cached lesson
    else Cache miss
        C-->>A: Not found
        A->>D: Read lesson
        D-->>A: Lesson data
        A->>C: Store lesson
    end
    A-->>L: Display lesson
    deactivate A`),
diagram('A resource lifecycle','States describe what a resource is; transition labels describe events. A paused state preserves identity until the resource resumes.',`stateDiagram-v2
    [*] --> Draft
    Draft --> Published: approve
    Published --> Paused: suspend
    Paused --> Published: resume
    Published --> Archived: retire
    Paused --> Archived: retire
    Archived --> [*]`),
diagram('Enrollment: entities and cardinalities','Crow-foot relationships distinguish one-to-many relationships and a junction entity. Attributes separate identity from descriptive information.',`erDiagram
    LEARNER ||--o{ ENROLLMENT : has
    COURSE ||--o{ ENROLLMENT : receives
    COURSE ||--|{ LESSON : contains
    LEARNER {
        int learner_id PK
        string name
    }
    COURSE {
        int course_id PK
        string title
    }
    ENROLLMENT {
        int learner_id FK
        int course_id FK
        string status
    }
    LESSON {
        int lesson_id PK
        int course_id FK
    }`),
diagram('Overlapping work and dependencies','A Gantt timeline encodes duration, overlap and a milestone. It differs from an ordered step guide because tasks occupy explicit intervals.',`gantt
    title Illustrative course preparation
    dateFormat YYYY-MM-DD
    axisFormat %d %b
    section Content
    Outline :a, 2026-10-05, 2d
    Write lessons :b, after a, 4d
    section Review
    Prepare rubric :c, 2026-10-06, 3d
    Review lessons :d, after b, 2d
    Release :milestone, after d, 0d`),
{version:1,type:'custom',title:'Predict, then reveal the explanation',description:'Make a prediction in the first accordion panel, then open the counterexample and transfer question. This progressive-disclosure interaction differs from the original tab comparison.',dir:'ltr',data:{layout:'stack',blocks:[
{block:'accordion',items:[
{label:'Make a prediction',icon:'book',blocks:[{block:'callout',title:'Prediction',text:'Two equal-size samples have the same mean. Must their values be distributed alike? Make a prediction before revealing the explanation.',icon:'book',tone:'info'}]},
{label:'Reveal the explanation',icon:'eye',blocks:[{block:'text',text:'Sample A: 4, 4, 4. Sample B: 0, 4, 8. Both means are 4, but the second sample has a wider spread.'},{block:'callout',title:'What the mean omits',text:'A center statistic does not describe the spread or shape of a distribution.',tone:'warning',icon:'alert'},{block:'text',text:'Transfer question: if two classes have the same average score, which additional information would help you compare their learning needs?'},{block:'list',items:['Range or other spread measure','Distribution of individual scores','Context and sample size'],ordered:true}]}
]}]}}
];

const additionalExampleIds = ["study-session-stacked","resource-proportions-doughnut","skill-profile-radar","practice-score-scatter","cache-hit-sequence","resource-lifecycle-states","enrollment-relationships","course-preparation-gantt","mean-progressive-reveal"];
/** Named catalogue entries share the same Examples root and schema authority as EXAMPLES. */
export const EXAMPLES_CATALOG = Object.freeze([
  ...Object.entries({
    mermaid: mermaidExample, "react-flow": reactFlowGraph, "process-cards": processCards, "process-flow": processFlow, "step-guide": stepGuide,
    pipeline, "kpi-dashboard": kpiDashboard, "bar-chart": barChart, "data-chart": dataChart, "node-map": nodeMap, annotated, infographic, svg, custom,
  }).map(([id, spec]) => Object.freeze({ id, spec: Object.freeze(spec), group: "core" })),
  Object.freeze({ id: "media", spec: Object.freeze(mediaExample), group: "core" }),
  ...sourceExamples.map((spec, index) => Object.freeze({ id: additionalExampleIds[index], spec: Object.freeze(spec), group: "patterns" })),
]);

export const EXAMPLES = Object.freeze({
  mermaid: mermaidExample, "react-flow": reactFlowGraph, "process-cards": processCards, "process-flow": processFlow, "step-guide": stepGuide,
  pipeline, "kpi-dashboard": kpiDashboard, "bar-chart": barChart, "data-chart": dataChart, "node-map": nodeMap, annotated, infographic, svg, custom,
});

/** Media-enriched example (F13): any family may carry media; this one is demonstrated in the gallery. */
export const MEDIA_EXAMPLE = mediaExample;

/** Localized variants used by the gallery and RTL/LTR tests. */
export const LOCALIZED = Object.freeze({
  ar: {
    "process-cards": { version: 1, type: "process-cards", title: "الحالة المشتركة بين وكيلين برمجيين",
      description: "يكتب Claude Code تقدّمه في حالة مشروع مشتركة، ثم يقرأ Codex هذه الحالة قبل متابعة العمل.",
      data: { group: { title: "التسليم بين الوكيلين", subtitle: "مصدر واحد للحقيقة", icon: "workflow", tone: "accent" }, orientation: "vertical", stages: [
        { title: "Claude Code", subtitle: "ينفّذ التعديل ويسجّل ما اكتمل", icon: "terminal", tone: "violet", status: { text: "مكتمل", state: "ok" } },
        { title: "حالة المشروع المشتركة", subtitle: "الملفات والملاحظات وقائمة المهام التي يقرؤها الوكيلان", icon: "database", tone: "info", active: true },
        { title: "Codex", subtitle: "يقرأ الحالة ويراجع ويكمل من النقطة نفسها", icon: "code", tone: "teal", progress: { value: 40, label: "المراجعة" } } ] } },
    "bar-chart": { version: 1, type: "bar-chart", title: "التكلفة الشهرية حسب النموذج", description: "النموذج ج الأقل تكلفة شهريًا والنموذج أ الأعلى؛ القيم بالدولار الأمريكي.",
      options: { engine: "chartjs" }, data: { chart: "bar", unit: "$", labels: ["نموذج أ", "نموذج ب", "نموذج ج"], series: [{ name: "التكلفة الشهرية", values: [240, 120, 60] }], highlight: 2 } },
    "step-guide": { version: 1, type: "step-guide", title: "فتح طلب دمج في أربع خطوات", description: "أنشئ فرعًا ثم احفظ التعديل وارفعه وافتح طلب الدمج للمراجعة.",
      data: { steps: [
        { title: "أنشئ فرعًا", text: "اعمل على فرع منفصل ليبقى الفرع الرئيسي مستقرًا.", icon: "git-branch", tone: "violet" },
        { title: "احفظ التعديل", text: "سجّل لقطة صغيرة مركّزة مع رسالة واضحة.", icon: "git-commit", tone: "info" },
        { title: "ارفع إلى GitHub", text: "أرسل الفرع إلى المستودع المشترك.", icon: "upload", tone: "teal", active: true },
        { title: "افتح طلب الدمج", text: "اطلب من الفريق المراجعة والدمج.", icon: "git-pull-request", tone: "success", status: { text: "جاهز للمراجعة", state: "ok" } } ] } },
    "kpi-dashboard": { version: 1, type: "kpi-dashboard", title: "هدف التعلم: دمج طلب سحب", description: "أكمل المتعلم 62٪ من الهدف؛ الفحوص والأمان ناجحان وتبقّت مراجعة واحدة.",
      data: { current: { title: "هدف التعلم", subtitle: "ادمج أول طلب سحب بأمان", icon: "target", tone: "accent", progress: { value: 62, label: "التقدم" },
        chips: [{ text: "الفحوص ناجحة", state: "ok" }, { text: "مراجعة قيد الانتظار", state: "warn" }, { text: "الأمان سليم", state: "ok" }] },
        metrics: [{ label: "دروس مكتملة", value: 8, unit: "/ 12", icon: "book", tone: "info" }, { label: "درجة الاختبار", value: 91, unit: "%", icon: "check-circle", tone: "success", progress: 91 }] } },
  },
  ru: {
    "process-cards": { version: 1, type: "process-cards", title: "Общее состояние проекта для двух агентов",
      description: "Claude Code записывает прогресс в общее состояние проекта, а Codex читает его перед продолжением работы.",
      data: { group: { title: "Передача между агентами", subtitle: "Единый источник правды", icon: "workflow", tone: "accent" }, orientation: "vertical", stages: [
        { title: "Claude Code", subtitle: "Вносит изменение и фиксирует результат", icon: "terminal", tone: "violet", status: { text: "Готово", state: "ok" } },
        { title: "Общее состояние", subtitle: "Файлы, заметки и список задач для обоих агентов", icon: "database", tone: "info", active: true },
        { title: "Codex", subtitle: "Читает состояние, проверяет и продолжает", icon: "code", tone: "teal", progress: { value: 40, label: "Проверка" } } ] } },
    "bar-chart": { version: 1, type: "bar-chart", title: "Месячная стоимость по моделям", description: "Модель C стоит меньше всего в месяц, модель A — больше всего; значения в долларах США.",
      options: { engine: "chartjs" }, data: { chart: "bar", unit: "$", labels: ["Модель A", "Модель B", "Модель C"], series: [{ name: "Стоимость в месяц", values: [240, 120, 60] }], highlight: 2 } },
    "step-guide": { version: 1, type: "step-guide", title: "Pull request за четыре шага", description: "Создайте ветку, сохраните изменение, отправьте его и откройте pull request на проверку.",
      data: { steps: [
        { title: "Создайте ветку", text: "Работайте в отдельной ветке, чтобы main оставалась стабильной.", icon: "git-branch", tone: "violet" },
        { title: "Сделайте коммит", text: "Сохраните небольшой снимок с понятным сообщением.", icon: "git-commit", tone: "info" },
        { title: "Отправьте на GitHub", text: "Передайте ветку в общий репозиторий.", icon: "upload", tone: "teal", active: true },
        { title: "Откройте pull request", text: "Попросите коллег проверить и слить ветку.", icon: "git-pull-request", tone: "success", status: { text: "Готово к проверке", state: "ok" } } ] } },
    "kpi-dashboard": { version: 1, type: "kpi-dashboard", title: "Цель обучения: слить pull request", description: "Ученик выполнил 62 процента цели; проверки и безопасность пройдены, одна проверка ещё ожидается.",
      data: { current: { title: "Цель обучения", subtitle: "Безопасно слейте первый pull request", icon: "target", tone: "accent", progress: { value: 62, label: "Прогресс" },
        chips: [{ text: "Проверки пройдены", state: "ok" }, { text: "Ждёт ревью", state: "warn" }, { text: "Безопасность в норме", state: "ok" }] },
        metrics: [{ label: "Уроков пройдено", value: 8, unit: "/ 12", icon: "book", tone: "info" }, { label: "Результат теста", value: 91, unit: "%", icon: "check-circle", tone: "success", progress: 91 }] } },
  },
});
