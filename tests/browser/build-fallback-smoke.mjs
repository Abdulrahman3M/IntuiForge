import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const taskId = "Task-2026-10-18-IntuiForge-P01-Core-Contracts";
const outputDirectory = resolve(projectRoot, "Shared-Project-State", "Test-Workspace", taskId);
const outputPath = resolve(outputDirectory, "p01-fallback-smoke.js");
const sourcePath = resolve(projectRoot, "packages/core/src/fallback.js");
const source = await readFile(sourcePath, "utf8");
if (!source.includes("export function renderErrorFallback")) throw new Error("Fallback source export was not found.");

const classicSource = source.replace("export function renderErrorFallback", "function renderErrorFallback") + `
const arabicHost = document.querySelector("#fallback-ar");
const englishHost = document.querySelector("#fallback-en");
renderErrorFallback(arabicHost, new Error("private renderer details"), { lang: "ar", dir: "rtl" });
renderErrorFallback(englishHost, new Error("private renderer details"), { lang: "en", dir: "ltr" });
const arabicAlert = arabicHost.querySelector("[data-intui-error-host]")?.shadowRoot?.querySelector('[role="alert"]');
const englishAlert = englishHost.querySelector("[data-intui-error-host]")?.shadowRoot?.querySelector('[role="alert"]');
const fontSize = arabicAlert ? getComputedStyle(arabicAlert.querySelector("p")).fontSize : null;
const safeText = ![arabicAlert?.textContent, englishAlert?.textContent].join(" ").includes("private renderer details");
const result = {
  status: arabicAlert?.getAttribute("dir") === "rtl" && englishAlert?.getAttribute("dir") === "ltr" && Number.parseFloat(fontSize) >= 16 && arabicAlert?.getAttribute("role") === "alert" && safeText ? "PASS" : "FAIL",
  arabicDirection: arabicAlert?.getAttribute("dir"),
  englishDirection: englishAlert?.getAttribute("dir"),
  arabicFontSize: fontSize,
  safeText,
  role: arabicAlert?.getAttribute("role"),
};
document.querySelector("#result").textContent = JSON.stringify(result);
document.documentElement.dataset.p01FallbackStatus = result.status;
window.__INTUIFORGE_P01_FALLBACK__ = result;
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, classicSource, "utf8");
process.stdout.write(`${outputPath}\n`);
