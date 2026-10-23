import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFile, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(await readFile(join(projectRoot, "package.json"), "utf8"));
const outputDirectory = resolve(projectRoot, process.argv[2] ?? "release");
function getNpmInvocation() {
  if (process.env.npm_execpath) return { command: process.execPath, prefixArgs: [process.env.npm_execpath] };
  if (process.platform === "win32") {
    for (const directory of (process.env.PATH ?? "").split(delimiter)) {
      const npmCli = resolve(directory, "node_modules", "npm", "bin", "npm-cli.js");
      if (existsSync(npmCli)) return { command: process.execPath, prefixArgs: [npmCli] };
    }
    throw new Error("Could not locate npm's JavaScript CLI from PATH.");
  }
  return { command: "npm", prefixArgs: [] };
}

const npm = getNpmInvocation();
const runNpm = (args, cwd = projectRoot) => execFileSync(npm.command, [...npm.prefixArgs, ...args], {
  cwd,
  encoding: "utf8",
  stdio: ["ignore", "pipe", "inherit"],
});
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
async function writeNewOrIdentical(path, bytes) {
  try {
    const existing = await readFile(path);
    if (!existing.equals(bytes)) throw new Error(`Refusing to overwrite different release output: ${path}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await writeFile(path, bytes, { flag: "wx" });
  }
}
const pack = (directory) => {
  const result = JSON.parse(runNpm(["pack", "--json", "--pack-destination", directory]));
  if (result.length !== 1 || !result[0].filename) throw new Error("npm pack did not produce exactly one package.");
  return result[0];
};

if (packageJson.private !== true || packageJson.license !== "Apache-2.0") {
  throw new Error("Release must remain a private local artifact with the owner-approved Apache-2.0 license.");
}
await mkdir(outputDirectory, { recursive: true });
const temporaryRoot = await mkdtemp(join(tmpdir(), "intuiforge-release-"));
try {
  const firstDirectory = join(temporaryRoot, "first");
  const secondDirectory = join(temporaryRoot, "second");
  const consumerDirectory = join(temporaryRoot, "consumer");
  await Promise.all([mkdir(firstDirectory), mkdir(secondDirectory), mkdir(consumerDirectory)]);

  const firstPack = pack(firstDirectory);
  const secondPack = pack(secondDirectory);
  const firstBytes = await readFile(join(firstDirectory, firstPack.filename));
  const secondBytes = await readFile(join(secondDirectory, secondPack.filename));
  const firstHash = sha256(firstBytes);
  if (firstHash !== sha256(secondBytes)) throw new Error("Repeated npm pack outputs differ; reproducibility check failed.");

  const artifactPath = join(outputDirectory, firstPack.filename);
  await writeNewOrIdentical(artifactPath, firstBytes);
  await copyFile(artifactPath, join(consumerDirectory, "intuiforge-engine.tgz"));
  runNpm(["install", "--offline", "--ignore-scripts", "--no-audit", "--no-fund", "--prefix", consumerDirectory, "./intuiforge-engine.tgz"], consumerDirectory);
  const smoke = [
    "import { readFile } from 'node:fs/promises';",
    "import { resolve } from 'node:path';",
    "const paths=['@intuiforge/engine','@intuiforge/engine/v1','@intuiforge/engine/article','@intuiforge/engine/article-renderer','@intuiforge/engine/authoring','@intuiforge/engine/design-system','@intuiforge/engine/host','@intuiforge/engine/react-island','@intuiforge/engine/richviz','@intuiforge/engine/scientific','@intuiforge/engine/state'];",
    "for (const path of paths) await import(path);",
    "const schema=JSON.parse(await readFile(resolve('node_modules/@intuiforge/engine/packages/article/schema/article-v1.schema.json'),'utf8'));",
    "if (schema.$id !== 'https://intuiforge.dev/schemas/article-v1.schema.json') throw new Error('installed schema missing');",
    "console.log('offline public-export smoke: PASS');",
  ].join("\n");
  const node = process.execPath;
  execFileSync(node, ["--input-type=module", "-e", smoke], { cwd: consumerDirectory, encoding: "utf8", stdio: "inherit" });

  const manifest = {
    schemaVersion: 1,
    package: packageJson.name,
    version: packageJson.version,
    license: packageJson.license,
    privacy: "private local distribution; registry publication disabled",
    artifact: firstPack.filename,
    sha256: firstHash,
    reproducible: true,
    packedFileCount: firstPack.files.length,
    packedFiles: firstPack.files.map(({ path }) => path).sort(),
    checks: {
      repeatedPackSha256: sha256(secondBytes),
      offlineInstall: "PASS",
      publicExportImport: "PASS",
    },
  };
  await writeNewOrIdentical(join(outputDirectory, "release-manifest.json"), Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
  await writeNewOrIdentical(join(outputDirectory, "SHA256SUMS.txt"), Buffer.from(`${firstHash}  ${firstPack.filename}\n`));
  process.stdout.write(`Release package: ${artifactPath}\nSHA-256: ${firstHash}\nPacked files: ${firstPack.files.length}\nReproducibility: PASS\nOffline install and export smoke: PASS\n`);
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
