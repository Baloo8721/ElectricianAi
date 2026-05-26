import { createHash, randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  const pin = process.env.APP_PIN;
  if (pin) return pin.trim();

  const envPath = join(root, ".env");
  if (!existsSync(envPath)) return null;

  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key.trim() === "APP_PIN") return rest.join("=").trim();
  }
  return null;
}

const pin = loadEnv();
if (!pin || !/^\d{6}$/.test(pin)) {
  console.error("APP_PIN must be exactly 6 digits. Set in .env or environment.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const pinHash = createHash("sha256").update(`${salt}:${pin}`).digest("hex");

const out = `// Generated — do not edit. Run: npm run build
window.APP_CONFIG = ${JSON.stringify({ pinHash, salt }, null, 2)};
`;

// pin-hash.js must NOT be in .gitignore — gh-pages deploy skips ignored files
writeFileSync(join(root, "js", "pin-hash.js"), out);
console.log("Wrote js/pin-hash.js");
