import { spawnSync } from "child_process";
import {
  cpSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  existsSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const config = spawnSync("node", ["scripts/build-config.mjs"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

if (config.status !== 0) process.exit(config.status ?? 1);

const pinConfig = JSON.parse(
  readFileSync(join(root, "scripts", ".pin-build.json"), "utf8")
);

if (existsSync(dist)) rmSync(dist, { recursive: true });
mkdirSync(dist, { recursive: true });

for (const dir of ["css", "js", "content", "assets"]) {
  cpSync(join(root, dir), join(dist, dir), { recursive: true });
}

const indexSrc = readFileSync(join(root, "index.html"), "utf8");
const configScript = `<script>window.APP_CONFIG=${JSON.stringify(pinConfig)};</script>`;
const indexOut = indexSrc.replace(
  /<!-- PIN_CONFIG_START -->[\s\S]*?<!-- PIN_CONFIG_END -->/,
  `<!-- PIN_CONFIG_START -->\n  ${configScript}\n  <!-- PIN_CONFIG_END -->`
);

if (!indexOut.includes("pinHash")) {
  console.error("index.html missing PIN_CONFIG markers.");
  process.exit(1);
}

writeFileSync(join(dist, "index.html"), indexOut);
writeFileSync(join(dist, ".nojekyll"), "");

console.log("Wrote dist/ (deploy this folder)");
console.log("Build complete.");
