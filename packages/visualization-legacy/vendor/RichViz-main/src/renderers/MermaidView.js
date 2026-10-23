/* Mermaid Diagram (F1): the visual type that hands the author's source to the Mermaid adapter. */
export async function renderMermaid(stage, spec, ctx) {
  const host = stage;
  const adapter = await ctx.loadAdapter("mermaid");
  const handle = await adapter.render(host, spec.data, ctx);
  return handle;
}
