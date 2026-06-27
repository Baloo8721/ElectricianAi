import { panelScenarios } from "./panel-scenarios.js";
import { renderPanelSVG } from "./panel-visual-svg.js";

let simState = null;

const simEls = {};

function initSimulator() {
  simEls.main = document.getElementById("sim-main");
  simEls.scenarioSelect = document.getElementById("sim-scenario-select");
  simEls.scenarioDesc = document.getElementById("sim-scenario-desc");
  simEls.stepArea = document.getElementById("sim-step-area");
  simEls.stepNum = document.getElementById("sim-step-num");
  simEls.stepInfo = document.getElementById("sim-step-info");
  simEls.stepInstruction = document.getElementById("sim-step-instruction");
  simEls.stepOptions = document.getElementById("sim-step-options");
  simEls.stepExplanation = document.getElementById("sim-step-explanation");
  simEls.stepFeedback = document.getElementById("sim-step-feedback");
  simEls.btnNext = document.getElementById("sim-next-btn");
  simEls.panelCanvas = document.getElementById("sim-panel-canvas");
  simEls.progress = document.getElementById("sim-progress");
  simEls.score = document.getElementById("sim-score");
  simEls.resetBtn = document.getElementById("sim-reset-btn");
  simEls.completion = document.getElementById("sim-completion");
  simEls.completionScore = document.getElementById("sim-completion-score");
  simEls.completionDetail = document.getElementById("sim-completion-detail");
  simEls.btnResetFromComplete = document.getElementById("sim-btn-reset");
  simEls.btnScenarioList = document.getElementById("sim-btn-scenarios");

  if (!simEls.main) return;
  renderScenarioSelector();
  bindSimEvents();
}

function bindSimEvents() {
  simEls.scenarioSelect?.addEventListener("click", (e) => {
    const btn = e.target.closest(".sim-scenario-btn");
    if (!btn) return;
    startScenario(btn.dataset.scenarioId);
  });

  simEls.stepOptions?.addEventListener("click", (e) => {
    const btn = e.target.closest(".sim-opt-btn");
    if (!btn || simState.answered) return;
    handleAnswer(parseInt(btn.dataset.index));
  });

  simEls.btnNext?.addEventListener("click", nextStep);
  simEls.resetBtn?.addEventListener("click", resetSimulator);
  simEls.btnResetFromComplete?.addEventListener("click", resetSimulator);
  simEls.btnScenarioList?.addEventListener("click", renderScenarioSelector);
}

function renderScenarioSelector() {
  simState = null;
  simEls.scenarioSelect.hidden = false;
  simEls.scenarioDesc.hidden = true;
  simEls.stepArea.hidden = true;
  simEls.completion.hidden = true;
  simEls.resetBtn.hidden = true;

  simEls.scenarioSelect.innerHTML = `
    <h2 class="sim-section-title">Panel Simulator</h2>
    <p class="sim-subtitle">Select a panel scenario to build step-by-step. Make the right wiring choices to complete the installation.</p>
    <div class="sim-scenario-grid">
      ${panelScenarios.map((s) => `
        <button type="button" class="sim-scenario-btn" data-scenario-id="${s.id}">
          <span class="sim-scenario-title">${escapeHtml(s.title)}</span>
          <span class="sim-scenario-desc">${escapeHtml(s.description)}</span>
          <span class="sim-scenario-spec">${s.voltage} &middot; ${s.ampacity} &middot; <strong>${s.type}</strong></span>
        </button>
      `).join("")}
    </div>
  `;
}

function startScenario(id) {
  const scenario = panelScenarios.find((s) => s.id === id);
  if (!scenario) return;

  simState = {
    scenario,
    stepIndex: 0,
    answers: [],
    correct: 0,
    answered: false,
  };

  simEls.scenarioSelect.hidden = true;
  simEls.scenarioDesc.hidden = false;
  simEls.stepArea.hidden = false;
  simEls.completion.hidden = true;
  simEls.resetBtn.hidden = false;

  simEls.scenarioDesc.innerHTML = `
    <span class="sim-scenario-badge">${escapeHtml(scenario.title)}</span>
    <span class="sim-scenario-spec">${scenario.voltage} &middot; ${scenario.ampacity} &middot; ${scenario.wires}</span>
  `;

  renderStep();
}

function renderStep() {
  const sc = simState.scenario;
  const step = sc.steps[simState.stepIndex];
  if (!step) return finishScenario();

  simState.answered = false;
  simEls.stepNum.textContent = `Step ${simState.stepIndex + 1} of ${sc.steps.length}`;
  simEls.stepInfo.textContent = step.info || "";
  simEls.stepInstruction.textContent = step.instruction;
  simEls.stepFeedback.hidden = true;
  simEls.btnNext.hidden = true;
  simEls.stepExplanation.hidden = true;

  simEls.stepOptions.innerHTML = step.options
    .map((opt, i) => `<button type="button" class="sim-opt-btn" data-index="${i}">${escapeHtml(opt)}</button>`)
    .join("");

  renderPanelVisual(step.visual);
  updateProgress();
}

function renderPanelVisual(visual) {
  if (!simEls.panelCanvas) return;
  simEls.panelCanvas.innerHTML = renderPanelSVG(visual, simState?.scenario);
}

function updateProgress() {
  const total = simState.scenario.steps.length;
  const current = simState.stepIndex + 1;
  const pct = Math.round((current / total) * 100);
  simEls.progress.style.setProperty("--sim-pct", pct + "%");
  simEls.score.textContent = `${simState.correct} / ${simState.stepIndex} correct`;
}

function handleAnswer(selectedIndex) {
  const step = simState.scenario.steps[simState.stepIndex];
  const isCorrect = selectedIndex === step.correct;
  simState.answered = true;
  simState.answers.push(selectedIndex);
  if (isCorrect) simState.correct++;

  simEls.stepOptions.querySelectorAll(".sim-opt-btn").forEach((btn, i) => {
    btn.disabled = true;
    if (i === step.correct) btn.classList.add("sim-opt-correct");
    else if (i === selectedIndex && !isCorrect) btn.classList.add("sim-opt-wrong");
  });

  simEls.stepFeedback.hidden = false;
  simEls.stepFeedback.textContent = isCorrect ? "Correct!" : "Not quite.";
  simEls.stepFeedback.className = `sim-step-feedback ${isCorrect ? "sim-feedback-correct" : "sim-feedback-wrong"}`;

  simEls.stepExplanation.textContent = step.explanation;
  simEls.stepExplanation.hidden = false;

  const isLast = simState.stepIndex >= simState.scenario.steps.length - 1;
  simEls.btnNext.textContent = isLast ? "See Results" : "Next Step";
  simEls.btnNext.hidden = false;

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

  simEls.stepArea.hidden = true;
  simEls.completion.hidden = false;
  simEls.completionScore.textContent = `${correct} / ${total} correct (${pct}%)`;
  simEls.completionDetail.textContent = `${grade} — ${simState.scenario.title}`;
}

function resetSimulator() {
  simState = null;
  renderScenarioSelector();
}

function escapeHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

export { initSimulator, startScenario, renderScenarioSelector };
