// Imports practice questions from assets/testprep.md into content/cdl-modules.json
// Usage: node scripts/import-cdl-testprep.mjs
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcPath = join(root, "assets", "testprep.md");
const dstPath = join(root, "content", "cdl-modules.json");

const src = readFileSync(srcPath, "utf8");

// Answer keys: set -> question number -> correct option index (0-based)
const ANSWERS = {
  gk: {
    1: 3, 2: 2, 3: 2, 4: 3, 5: 0, 6: 2, 7: 0, 8: 0, 9: 2, 10: 1,
    11: 3, 12: 0, 13: 1, 14: 1, 15: 3, 16: 0, 17: 1, 18: 1, 19: 0, 20: 1,
    21: 0, 22: 0, 23: 1, 24: 2, 25: 2, 26: 3, 27: 3, 28: 1, 29: 0, 30: 1,
    31: 3, 32: 0, 33: 0, 34: 0, 35: 2, 36: 1, 37: 3, 38: 3, 39: 0, 40: 1,
    41: 0, 42: 1, 43: 1, 44: 3, 45: 0, 46: 1, 47: 2, 48: 0, 49: 0, 50: 0,
  },
  ab: {
    1: 3, 2: 3, 3: 2, 4: 3, 5: 1, 6: 1, 7: 3, 8: 3, 9: 3, 10: 3,
    11: 3, 12: 3, 13: 3, 14: 3, 15: 0, 16: 1, 17: 3, 18: 3, 19: 2, 20: 3,
    21: 0, 22: 2, 23: 0, 24: 1, 25: 0, 26: 0, 27: 3, 28: 0, 29: 3, 30: 3,
  },
  combo: {
    1: 1, 2: 1, 3: 2, 4: 1, 5: 3, 6: 3, 7: 2, 8: 3, 9: 1, 10: 2,
    11: 2, 12: 1, 13: 0, 14: 1, 15: 0, 16: 3, 17: 3, 18: 0, 19: 3, 20: 0,
    21: 3, 22: 2, 23: 3, 24: 2, 25: 1, 26: 2, 27: 1, 28: 0, 29: 2, 30: 3,
    31: 3, 32: 1, 33: 1, 34: 0, 35: 2, 36: 3, 37: 1, 38: 1, 39: 3, 40: 3,
  },
};

// Explanation overrides (question number -> replacement) for source text that is inaccurate
const EXPLAIN_OVERRIDES = {
  gk: {
    30: "At least one tie-down per 10 feet of cargo, and never fewer than two — no matter how small the load.",
  },
};

// Module each set appends to
const SET_TARGET = { gk: "sec2", ab: "sec5", combo: "sec6" };

// Which GK questions belong to the Cargo module (sec3) instead of Driving Safely (sec2)
const GK_CARGO_QUESTIONS = new Set([24, 25, 30, 33, 42, 47]);

const lines = src.split(/\r?\n/);
const questions = []; // {set, num, q, options[], explain}

let plainCount = 0;
let abDone = false;
let comboDone = false;

let i = 0;
while (i < lines.length) {
  const line = lines[i];
  const plainMatch = line.match(/^Question\s+(\d+)\s*$/);
  const setMatch = line.match(/^Question\s+(\d+)\s+of\s+(\d+)\s*$/);

  let set = null;
  let num = 0;
  if (plainMatch) {
    plainCount++;
    if (plainCount <= 50) { set = "gk"; num = parseInt(plainMatch[1], 10); }
    // later plain "Question N" blocks (the 5-question mini quiz) are duplicates — skipped
  } else if (setMatch) {
    const total = parseInt(setMatch[2], 10);
    num = parseInt(setMatch[1], 10);
    if (total === 30 && !abDone) { set = "ab"; if (num === 30) abDone = true; }
    else if (total === 40 && !comboDone) { set = "combo"; if (num === 40) comboDone = true; }
  }

  if (!set) { i++; continue; }

  // Question text = first non-empty line after the header
  let qText = "";
  let j = i + 1;
  while (j < lines.length && lines[j].trim() === "") j++;
  if (j < lines.length) {
    qText = lines[j].replace(/^\u00a0+/, "").replace(/\s+/g, " ").trim();
    j++;
  }

  // Options = consecutive lines starting with a space or nbsp
  const options = [];
  while (j < lines.length && /^[\s\u00a0]/.test(lines[j]) && lines[j].trim() !== "") {
    options.push(lines[j].replace(/^[\s\u00a0]+/, "").replace(/\s+/g, " ").trim());
    j++;
  }

  // Explanation = "Try Again - ..." line
  let explain = "";
  while (j < lines.length && lines[j].trim() === "") j++;
  if (j < lines.length && /^Try Again\s*-/.test(lines[j].trim())) {
    explain = lines[j].replace(/^Try Again\s*-\s*/, "").replace(/\s+/g, " ").trim();
    j++;
  }

  questions.push({ set, num, q: qText, options, explain });
  i = j;
}

// Build the additions per module
const additions = { sec2: [], sec3: [], sec5: [], sec6: [] };
let skipped = [];

for (const item of questions) {
  const answerKey = ANSWERS[item.set]?.[item.num];
  if (answerKey === undefined) {
    skipped.push(`no answer key: ${item.set} #${item.num} — ${item.q}`);
    continue;
  }
  if (item.options.length !== 4) {
    skipped.push(`not 4 options (${item.options.length}): ${item.set} #${item.num} — ${item.q}`);
    continue;
  }
  if (item.q === "" || item.explain === "") {
    skipped.push(`missing text: ${item.set} #${item.num}`);
    continue;
  }

  const target = item.set === "gk"
    ? (GK_CARGO_QUESTIONS.has(item.num) ? "sec3" : "sec2")
    : SET_TARGET[item.set];

  additions[target].push({
    q: item.q,
    options: item.options,
    correct: answerKey,
    explain: EXPLAIN_OVERRIDES[item.set]?.[item.num] || item.explain,
  });
}

// Merge into the modules JSON (idempotent: skips questions already present)
const modules = JSON.parse(readFileSync(dstPath, "utf8"));
let added = 0;
for (const [moduleId, newQuestions] of Object.entries(additions)) {
  const mod = modules.find(m => m.id === moduleId);
  if (!mod) { console.error(`Module not found: ${moduleId}`); process.exit(1); }
  const existing = new Set(mod.quiz.map(q => q.q));
  for (const q of newQuestions) {
    if (existing.has(q.q)) { skipped.push(`duplicate already present: ${q.q}`); continue; }
    mod.quiz.push(q);
    existing.add(q.q);
    added++;
  }
}

writeFileSync(dstPath, JSON.stringify(modules, null, 1) + "\n");

console.log(`Imported ${added} questions into content/cdl-modules.json`);
for (const [moduleId, list] of Object.entries(additions)) {
  console.log(`  ${moduleId}: +${list.length}`);
}
if (skipped.length) {
  console.log(`Skipped ${skipped.length}:`);
  skipped.forEach(s => console.log(`  - ${s}`));
}