import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { DIAGRAM_REGISTRY } from "../src/RichVisualizationRegistry.js";
import { EXAMPLES_CATALOG } from "../src/RichVisualizationExamples.js";

const write = async (path, value) => { await mkdir(dirname(path), { recursive: true }); await writeFile(path, value, "utf8"); };
const title = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
for (const [i, entry] of EXAMPLES_CATALOG.entries()) {
  const safeId = entry.id.replace(/[^a-z0-9-]/gi, "-");
  await write(`Examples/${entry.group}/${safeId}.json`, JSON.stringify(entry.spec, null, 2) + "\n");
}
for (const item of DIAGRAM_REGISTRY) {
  const example = EXAMPLES_CATALOG.find((entry) => entry.id === item.id)?.spec;
  const snippet = example ? JSON.stringify(example, null, 2) : "{}";
  await write(item.documentation, `# ${item.name}\n\n**Category:** ${item.category}  \n**Rendering:** ${item.static ? "Static" : "Not currently static"}${item.interactive ? " and interactive" : ""}  \n**Renderer:** \`${item.renderer}\`\n\n## Description\n\n${example?.description || `${item.name} visualizes structured learning information using the RichViz schema.`}\n\n## Best use cases\n\nUse this type when its structure matches the information learners need to understand. Avoid using a visual encoding that implies relationships the data does not support.\n\n## Features\n\n${item.capabilities.map((c) => `- ${c.replaceAll("-", " ")}`).join("\n")}\n\n## Limitations\n\n- This type accepts only the fields defined by its schema.\n- Interactive engine features depend on the corresponding local engine being available.\n- Chart kinds requiring radar or scatter support cannot use Native SVG.\n\n## Configuration\n\nSee the [schema definition](../../src/schema/) and the current [engine matrix](../ENGINES.md). Dimensions, chart engine, display title, and data fields are constrained by the validated type.\n\n## Example\n\nOpen the [gallery preview](../../src/gallery/index.html#example-${item.id}) for a rendered example, or inspect the [source specification](../../${item.example}).\n\n\`\`\`js\nimport { RichViz } from "../../src/RichVisualization.js";\nimport { EXAMPLES } from "../../src/RichVisualizationExamples.js";\nconst view = RichViz.render("#visualization", EXAMPLES["${item.id}"]);\n\`\`\`\n\n## Variations and responsive behavior\n\nThe example gallery includes themed variants, narrow viewport rendering, and chart engine selection. Layout uses responsive components and local horizontal scrolling for intrinsically wide diagrams.\n\n## Accessibility\n\nEvery visualization requires a title and description and exposes a text alternative. Keep meaningful labels in the data, preserve keyboard focus and test screen-reader output when introducing new interactions.\n\n## Related types\n\n${DIAGRAM_REGISTRY.filter((other) => other.id !== item.id && (other.category === item.category || other.renderer === item.renderer)).slice(0, 5).map((other) => `- [${other.name}](${other.id}.md)`).join("\n") || "- See the full [diagram catalog](../../README.md#diagram-catalog)."}\n\n## Source specification\n\n\`\`\`json\n${snippet}\n\`\`\`\n`);
}
await write("docs/diagrams/README.md", `# Diagram documentation\n\n${DIAGRAM_REGISTRY.map((d) => `- [${d.name}](${d.id}.md) — ${d.category}; renderer: \`${d.renderer}\`.`).join("\n")}\n`);
await write("src/registry.json", JSON.stringify(DIAGRAM_REGISTRY, null, 2) + "\n");
console.log(`Wrote ${EXAMPLES_CATALOG.length} examples, ${DIAGRAM_REGISTRY.length} diagram pages and the registry.`);
