import { SCENES } from "./install-game-scenes.js";

let gameState = null;

const els = {};

function initInstallGame() {
  els.main = document.getElementById("game-main");
  els.sceneSelect = document.getElementById("game-scene-select");
  els.gameArea = document.getElementById("game-area");
  els.visualCanvas = document.getElementById("game-visual-canvas");
  els.gameInstruction = document.getElementById("game-instruction");
  els.gameTitle = document.getElementById("game-title");
  els.gameStepProg = document.getElementById("game-step-progress");
  els.gameHint = document.getElementById("game-hint");
  els.gameBackBtn = document.getElementById("game-back-btn");
  els.completion = document.getElementById("game-completion");
  els.completionMsg = document.getElementById("game-completion-msg");
  els.completionTitle = document.getElementById("game-completion-title");
  els.gameReset = document.getElementById("game-reset-btn");

  if (!els.main) return;
  renderSceneSelector();
  bindGameEvents();
}

function bindGameEvents() {
  els.sceneSelect.addEventListener("click", (e) => {
    const btn = e.target.closest(".game-scene-btn");
    if (!btn) return;
    startScene(parseInt(btn.dataset.sceneIndex));
  });

  els.gameBackBtn.addEventListener("click", renderSceneSelector);
  els.gameReset.addEventListener("click", renderSceneSelector);

  els.visualCanvas.addEventListener("click", (e) => {
    const hotspot = e.target.closest(".game-hotspot");
    if (!hotspot || gameState.answered) return;
    handleHotspotClick(hotspot);
  });
}

function renderSceneSelector() {
  gameState = null;
  els.sceneSelect.hidden = false;
  els.gameArea.hidden = true;
  els.completion.hidden = true;

  const saved = getCompletionData();
  const totalScenes = SCENES.length;
  const completedCount = SCENES.filter((s) => saved[s.id]).length;

  els.sceneSelect.innerHTML = `
    <h2 class="sim-section-title">Pole Assembly Game</h2>
    <p class="sim-subtitle">Click through 8 scenes to assemble a Musco sports lighting pole. Tap the correct spot in each scene to advance.</p>
    <div class="game-stats"><span>Scenes: ${completedCount} / ${totalScenes}</span></div>
    <div class="game-scene-grid">
      ${SCENES.map((s, i) => {
        const done = saved[s.id];
        return `
          <button type="button" class="game-scene-btn ${done ? "game-scene-done" : ""}" data-scene-index="${i}">
            <span class="game-scene-icon">${done ? "&#10003;" : (i + 1)}</span>
            <span class="game-scene-title">${escapeHtml(s.title)}</span>
            <span class="game-scene-desc">${escapeHtml(s.desc)}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function startScene(index) {
  const scene = SCENES[index];
  if (!scene) return;

  gameState = {
    sceneIndex: index,
    stepIndex: 0,
    answered: false,
  };

  els.sceneSelect.hidden = true;
  els.gameArea.hidden = false;
  els.completion.hidden = true;

  renderStep();
}

function renderStep() {
  const scene = SCENES[gameState.sceneIndex];
  const steps = scene.steps;
  const step = steps[gameState.stepIndex];
  if (!step) return finishScene();

  gameState.answered = false;
  els.gameTitle.textContent = `${scene.title} \u2014 Step ${gameState.stepIndex + 1} of ${steps.length}`;
  els.gameInstruction.textContent = step.instruction;
  els.gameStepProg.textContent = `Scene ${gameState.sceneIndex + 1} of ${SCENES.length}`;
  els.gameHint.hidden = true;

  const body = step.svg ? step.svg() : defaultSVG(scene.id);
  renderSVG(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">${body}</svg>`);

  if (els.completion) els.completion.hidden = true;
}

function renderSVG(svgString) {
  if (!els.visualCanvas) return;
  els.visualCanvas.innerHTML = svgString;
  const svgEl = els.visualCanvas.querySelector("svg");
  if (!svgEl) return;

  const scene = SCENES[gameState.sceneIndex];
  const step = scene.steps[gameState.stepIndex];
  if (!step) return;

  const vb = svgEl.getAttribute("viewBox") || "0 0 400 400";
  const parts = vb.split(" ").map(Number);
  const vbW = parts[2] || 400;
  const vbH = parts[3] || 400;

  const wrap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  wrap.setAttribute("viewBox", `0 0 ${vbW} ${vbH}`);
  wrap.setAttribute("width", "100%");
  wrap.setAttribute("height", "100%");
  wrap.style.position = "absolute";
  wrap.style.top = "0";
  wrap.style.left = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.pointerEvents = "none";

  for (const hs of step.hotspots) {
    const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    r.setAttribute("x", hs.x);
    r.setAttribute("y", hs.y);
    r.setAttribute("width", hs.w);
    r.setAttribute("height", hs.h);
    r.setAttribute("fill", "transparent");
    r.setAttribute("stroke", "transparent");
    r.setAttribute("class", "game-hotspot");
    r.dataset.hsId = hs.id;
    r.dataset.correct = hs.correct ? "1" : "0";
    r.dataset.msg = hs.msg || "";
    r.style.pointerEvents = "all";
    r.style.cursor = "pointer";
    wrap.appendChild(r);
  }

  els.visualCanvas.style.position = "relative";
  const existingOverlay = els.visualCanvas.querySelector(".game-hotspot-overlay");
  if (existingOverlay) existingOverlay.remove();

  wrap.setAttribute("class", "game-hotspot-overlay");
  els.visualCanvas.appendChild(wrap);
}

function defaultSVG(sceneId) {
  return `<rect x="0" y="0" width="400" height="400" fill="#e8f4f8"/><text x="200" y="200" font-size="14" fill="#999" text-anchor="middle">${escapeHtml(sceneId)}</text>`;
}

function handleHotspotClick(el) {
  const isCorrect = el.dataset.correct === "1";
  const msg = el.dataset.msg;
  const scene = SCENES[gameState.sceneIndex];
  const step = scene.steps[gameState.stepIndex];

  if (isCorrect) {
    gameState.answered = true;
    el.classList.add("game-hotspot-correct");

    if (msg) {
      const rect = el.getBoundingClientRect();
      const container = els.visualCanvas.getBoundingClientRect();
      const overlay = document.createElement("div");
      overlay.className = "game-popup game-popup-correct";
      overlay.textContent = msg;
      const popupX = Math.min(
        Math.max(0, rect.left - container.left + rect.width / 2 - 80),
        container.width - 170
      );
      overlay.style.left = popupX + "px";
      overlay.style.top = Math.max(0, rect.top - container.top - 36) + "px";
      els.visualCanvas.appendChild(overlay);
      setTimeout(() => overlay.remove(), 1500);
    }

    setTimeout(() => {
      gameState.stepIndex++;
      if (gameState.stepIndex >= scene.steps.length) {
        finishScene();
      } else {
        renderStep();
      }
    }, 600);
  } else {
    el.classList.add("game-hotspot-wrong");
    setTimeout(() => el.classList.remove("game-hotspot-wrong"), 400);

    els.gameHint.hidden = false;
    els.gameHint.textContent = msg || "Not here. Try a different spot.";
    clearTimeout(els._hintTimer);
    els._hintTimer = setTimeout(() => {
      if (els.gameHint) els.gameHint.hidden = true;
    }, 3000);
  }
}

function finishScene() {
  const scene = SCENES[gameState.sceneIndex];
  const saved = getCompletionData();
  saved[scene.id] = true;
  saveCompletionData(saved);

  const totalScenes = SCENES.length;
  const completedCount = Object.keys(saved).length;
  const allDone = completedCount >= totalScenes;

  els.gameArea.hidden = true;
  els.completion.hidden = false;

  if (allDone) {
    els.completionTitle.textContent = "All Scenes Complete!";
    els.completionMsg.textContent = "You completed the entire Musco pole installation. Great work!";
  } else {
    els.completionTitle.textContent = `${scene.title} Complete`;
    els.completionMsg.textContent = `${completedCount} of ${totalScenes} scenes done. Keep going!`;
  }
}

function getCompletionData() {
  try {
    return JSON.parse(localStorage.getItem("electricianai_install_game") || "{}");
  } catch {
    return {};
  }
}

function saveCompletionData(data) {
  localStorage.setItem("electricianai_install_game", JSON.stringify(data));
}

function escapeHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

export { initInstallGame };
