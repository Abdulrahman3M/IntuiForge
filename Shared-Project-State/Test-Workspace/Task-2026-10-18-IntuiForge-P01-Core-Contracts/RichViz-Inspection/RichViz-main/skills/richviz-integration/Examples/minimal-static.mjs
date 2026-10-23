import { RichViz } from "../../../src/RichVisualization.js";
import { EXAMPLES } from "../../../src/RichVisualizationExamples.js";

const host = document.querySelector("#visualization");
const handle = RichViz.render(host, EXAMPLES["step-guide"], { lang: document.documentElement.lang, dir: document.documentElement.dir });
window.addEventListener("pagehide", () => handle.dispose(), { once: true });
