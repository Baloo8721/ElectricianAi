import { sportsScenarios } from "./sports-lighting-scenarios.js";
import { renderSportsSVG } from "./sports-lighting-visual.js";

let simState = null;
const els = {};

function initSportsSim() {
  els.main = document.getElementById("sports-sim-main");
  els.scenarioSelect = document.getElementById("sports-scenario-select");
  els.scenarioDesc = document.getElementById("sports-scenario-desc");
  els.stepArea = document.getElementById("sports-step-area");
  els.stepNum = document.getElementById("sports-step-num");
  els.stepInfo = document.getElementById("sports-step-info");
  els.stepInstruction = document.getElementById("sports-step-instruction");
  els.stepOptions = document.getElementById("sports-step-options");
  els.stepExplanation = document.getElementById("sports-step-explanation");
  els.stepFeedback = document.getElementById("sports-step-feedback");
  els.btnNext = document.getElementById("sports-next-btn");
  els.visualCanvas = document.getElementById("sports-visual-canvas");
  els.progress = document.getElementById("sports-progress");
  els.score = document.getElementById("sports-score");
  els.resetBtn = document.getElementById("sports-reset-btn");
  els.completion = document.getElementById("sports-completion");
  els.completionScore = document.getElementById("sports-completion-score");
  els.completionDetail = document.getElementById("sports-completion-detail");
  els.btnResetFromComplete = document.getElementById("sports-btn-reset");
  els.btnScenarioList = document.getElementById("sports-btn-scenarios");

  if (!els.main) return;
  renderScenarioSelector();
  bindEvents();
}

function bindEvents() {
  els.scenarioSelect?.addEventListener("click", (e) => {
    const btn = e.target.closest(".sim-scenario-btn");
    if (!btn) return;
    startScenario(btn.dataset.scenarioId);
  });

  els.stepOptions?.addEventListener("click", (e) => {
    const btn = e.target.closest(".sim-opt-btn");
    if (!btn || simState.answered) return;
    handleAnswer(parseInt(btn.dataset.index));
  });

  els.btnNext?.addEventListener("click", nextStep);
  els.resetBtn?.addEventListener("click", resetSim);
  els.btnResetFromComplete?.addEventListener("click", resetSim);
  els.btnScenarioList?.addEventListener("click", renderScenarioSelector);
}

function renderScenarioSelector() {
  simState = null;
  els.scenarioSelect.hidden = false;
  els.scenarioDesc.hidden = true;
  els.stepArea.hidden = true;
  els.completion.hidden = true;
  els.resetBtn.hidden = true;
  els.visualCanvas.innerHTML = "";

  els.scenarioSelect.innerHTML = `
    <h2 class="sim-section-title">Sports Lighting Simulator</h2>
    <p class="sim-subtitle">Build a sports lighting pole system step-by-step, or diagnose and repair faults.</p>
    <p class="sim-pdf-link"><a href="assets/Musco_LSG-HID_1500W-eng.pdf" target="_blank" class="pdf-ref-link">&#128196; View Musco LSG-HID 1500W Reference PDF</a></p>
    <div class="sim-scenario-grid">
      ${sportsScenarios.map((s) => `
        <button type="button" class="sim-scenario-btn" data-scenario-id="${s.id}">
          <span class="sim-scenario-title">${escapeHtml(s.title)}</span>
          <span class="sim-scenario-desc">${escapeHtml(s.description)}</span>
          <span class="sim-scenario-spec"><strong>${s.mode === "build" ? "Assembly" : "Repair"}</strong> &middot; ${s.steps.length} steps</span>
        </button>
      `).join("")}
    </div>
  `;
}

function startScenario(id) {
  const scenario = sportsScenarios.find((s) => s.id === id);
  if (!scenario) return;

  simState = {
    scenario,
    stepIndex: 0,
    answers: [],
    correct: 0,
    answered: false,
  };

  els.scenarioSelect.hidden = true;
  els.scenarioDesc.hidden = false;
  els.stepArea.hidden = false;
  els.completion.hidden = true;
  els.resetBtn.hidden = false;

  els.scenarioDesc.innerHTML = `
    <span class="sim-scenario-badge">${escapeHtml(scenario.title)}</span>
    <span class="sim-scenario-spec">${scenario.mode === "build" ? "Assembly" : "Repair"} &middot; ${scenario.steps.length} steps</span>
  `;

  renderStep();
}

function renderStep() {
  const sc = simState.scenario;
  const step = sc.steps[simState.stepIndex];
  if (!step) return finishScenario();

  simState.answered = false;
  els.stepNum.textContent = `Step ${simState.stepIndex + 1} of ${sc.steps.length}`;
  els.stepInfo.textContent = step.info || "";
  els.stepInstruction.textContent = step.instruction;
  els.stepFeedback.hidden = true;
  els.btnNext.hidden = true;
  els.stepExplanation.hidden = true;

  els.stepOptions.innerHTML = step.options
    .map((opt, i) => `<button type="button" class="sim-opt-btn" data-index="${i}">${escapeHtml(opt)}</button>`)
    .join("");

  renderVisual(step.visual);
  updateProgress();
}

function renderVisual(visual) {
  if (!els.visualCanvas) return;
  els.visualCanvas.innerHTML = renderSportsSVG(visual, simState?.scenario);
}

function updateProgress() {
  const total = simState.scenario.steps.length;
  const current = simState.stepIndex + 1;
  const pct = Math.round((current / total) * 100);
  els.progress.style.setProperty("--sim-pct", pct + "%");
  els.score.textContent = `${simState.correct} / ${simState.stepIndex} correct`;
}

function handleAnswer(selectedIndex) {
  const step = simState.scenario.steps[simState.stepIndex];
  const isCorrect = selectedIndex === step.correct;
  simState.answered = true;
  simState.answers.push(selectedIndex);
  if (isCorrect) simState.correct++;

  els.stepOptions.querySelectorAll(".sim-opt-btn").forEach((btn, i) => {
    btn.disabled = true;
    if (i === step.correct) btn.classList.add("sim-opt-correct");
    else if (i === selectedIndex && !isCorrect) btn.classList.add("sim-opt-wrong");
  });

  els.stepFeedback.hidden = false;
  els.stepFeedback.textContent = isCorrect ? "Correct!" : "Not quite.";
  els.stepFeedback.className = `sim-step-feedback ${isCorrect ? "sim-feedback-correct" : "sim-feedback-wrong"}`;

  els.stepExplanation.textContent = step.explanation;
  els.stepExplanation.hidden = false;

  const isLast = simState.stepIndex >= simState.scenario.steps.length - 1;
  els.btnNext.textContent = isLast ? "See Results" : "Next Step";
  els.btnNext.hidden = false;

  updateProgress();
}

function nextStep() {
  simState.stepIndex++;
  if (simState.stepIndex >= simState.scenario.steps.length) {
    finishScenario();
  } else {
    renderStep();
  }
}

function finishScenario() {
  const total = simState.scenario.steps.length;
  const correct = simState.correct;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  let grade = pct >= 90 ? "Master Electrician!" : pct >= 70 ? "Journeyman Level" : pct >= 50 ? "Apprentice Level" : "Keep Studying";

  els.stepArea.hidden = true;
  els.completion.hidden = false;
  els.completionScore.textContent = `${correct} / ${total} correct (${pct}%)`;
  els.completionDetail.textContent = `${grade} — ${simState.scenario.title}`;
}

function resetSim() {
  simState = null;
  renderScenarioSelector();
}

function escapeHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

export { initSportsSim, startScenario as startSportsScenario, renderScenarioSelector as showSportsScenarios };
