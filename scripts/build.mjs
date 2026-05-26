import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const config = spawnSync("node", ["scripts/build-config.mjs"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

if (config.status !== 0) process.exit(config.status ?? 1);
console.log("Build complete.");
