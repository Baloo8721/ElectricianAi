import { initNecViewer } from "./nec-viewer.js";
import { initSimulator } from "./panel-simulator.js";
import { initSportsSim } from "./sports-lighting-sim.js";
import { initScheduleView } from "./schedule-view.js";
import { initInstallGame } from "./install-game.js";

let lessons = { topics: [], suggestedPath: [] };
let searchIndex = [];
let studyMode = "read";
let currentTopicId = null;
let quizState = null;

const views = {
  home: document.getElementById("view-home"),
  topic: document.getElementById("view-topic"),
  nec: document.getElementById("view-nec"),
  simulator: document.getElementById("view-simulator"),
  sportsSim: document.getElementById("view-sports-sim"),
  schedule: document.getElementById("view-schedule"),
  installGame: document.getElementById("view-install-game"),
  search: document.getElementById("view-search"),
};

const els = {
  title: document.getElementById("app-title"),
  back: document.getElementById("btn-back"),
  searchBtn: document.getElementById("btn-search"),
  topicGrid: document.getElementById("topic-grid"),
  suggestedList: document.getElementById("suggested-path-list"),
  topicIntro: document.getElementById("topic-intro"),
  topicCards: document.getElementById("topic-cards"),
  searchInput: document.getElementById("search-input"),
  searchResults: document.getElementById("search-results"),
  imageModal: document.getElementById("image-modal"),
  imageModalImg: document.getElementById("image-modal-img"),
  progressBar: document.getElementById("progress-bar"),
  progressText: document.getElementById("progress-text"),
  quizArea: document.getElementById("quiz-area"),
  quizQuestion: document.getElementById("quiz-question"),
  quizOptions: document.getElementById("quiz-options"),
  quizFeedback: document.getElementById("quiz-feedback"),
  quizProgress: document.getElementById("quiz-progress"),
  btnQuizNext: document.getElementById("btn-quiz-next"),
  quizResultsModal: document.getElementById("quiz-results-modal"),
  quizResultsScore: document.getElementById("quiz-results-score"),
  quizResultsDetail: document.getElementById("quiz-results-detail"),
  btnQuizCloseResults: document.getElementById("btn-quiz-close-results"),
  btnStudyRead: document.getElementById("btn-study-read"),
  btnStudyFlash: document.getElementById("btn-study-flash"),
  btnStudyQuiz: document.getElementById("btn-study-quiz"),
  btnStudySim: document.getElementById("btn-study-sim"),
  btnNecViewer: document.getElementById("btn-nec-viewer"),
  btnPanelSim: document.getElementById("btn-panel-sim"),
  btnSportsSim: document.getElementById("btn-sports-sim"),
  btnInstallGame: document.getElementById("btn-install-game"),
  btnSchedule: document.getElementById("btn-schedule"),
  btnNfpaLink: document.getElementById("btn-nfpa-link"),
  btnTapeMeasure: document.getElementById("btn-tape-measure"),
  btnTradeCalc: document.getElementById("btn-trade-calc"),
  btnMeterSim: document.getElementById("btn-meter-sim"),
};

let currentView = "home";
const STORAGE_KEY = "electricianai_progress";

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function markTopicViewed(topicId) {
  const p = getProgress();
  p[topicId] = true;
  saveProgress(p);
}

function escapeHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function paragraphs(body) {
  const parts = Array.isArray(body) ? body : [body];
  return parts.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
}

function renderTable(table) {
  if (!table?.headers) return "";
  const head = table.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("");
  const rows = (table.rows || [])
    .map(
      (row) =>
        `<tr>${row.map((c) => `<td>${escapeHtml(String(c))}</td>`).join("")}</tr>`
    )
    .join("");
  return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderImage(img) {
  if (!img?.src) return "";
  const alt = escapeHtml(img.alt || "");
  const cap = img.caption ? `<figcaption>${escapeHtml(img.caption)}</figcaption>` : "";
  return `<figure class="figure-img"><button type="button" data-zoom="${escapeHtml(img.src)}" data-alt="${alt}"><img src="${escapeHtml(img.src)}" alt="${alt}" loading="lazy"></button>${cap}</figure>`;
}

const quadrantClass = {
  multimeter: "quadrant-tl",
  bender: "quadrant-tr",
  residential: "quadrant-bl",
  commercial: "quadrant-br",
};

const quadrantLabel = {
  multimeter: "Multimeter (top left)",
  bender: "Conduit bender (top right)",
  residential: "Residential diagram (bottom left)",
  commercial: "Commercial diagram (bottom right)",
};

function renderPosterQuadrant(section) {
  const cls = quadrantClass[section] || "quadrant-tl";
  const label = quadrantLabel[section] || section;
  return `<div class="quadrant-view ${cls}"><button type="button" data-zoom="assets/field-reference-poster.png" data-alt="Field reference poster"><img src="assets/field-reference-poster.png" alt=""><span class="quadrant-label">${escapeHtml(label)}</span></button></div>`;
}

function renderCard(card) {
  let html = `<article class="lesson-card" data-card-title="${escapeHtml(card.title)}" data-card-body="${escapeHtml(JSON.stringify(card))}">`;
  html += `<h3>${escapeHtml(card.title)}</h3>`;
  if (studyMode === "flash") {
    html += `<div class="flash-reveal" hidden>`;
  }
  if (card.safety) {
    const text = card.body
      ? Array.isArray(card.body) ? card.body.join(" ") : card.body
      : "";
    if (text) html += `<p class="callout-safety">${escapeHtml(text)}</p>`;
  } else if (card.body) {
    html += paragraphs(card.body);
  }
  if (card.list) {
    const listClass = card.safety ? "compact callout-safety-list" : "compact";
    html += `<ul class="${listClass}">${card.list.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
  }
  if (card.table) html += renderTable(card.table);
  if (card.image) html += renderImage(card.image);
  if (card.posterQuadrant) html += renderPosterQuadrant(card.posterQuadrant);
  if (card.posterQuadrants) {
    html += `<div class="quadrant-grid">${card.posterQuadrants.map((q) => renderPosterQuadrant(q)).join("")}</div>`;
  }
  if (card.remember) {
    html += `<p class="remember">Remember: ${escapeHtml(card.remember)}</p>`;
  }
  if (studyMode === "flash") {
    html += `</div>`;
    html += `<button type="button" class="btn-flip" aria-label="Reveal card">Tap to reveal</button>`;
  }
  html += "</article>";
  return html;
}

function showView(name) {
  currentView = name;
  views.home.hidden = name !== "home";
  views.topic.hidden = name !== "topic";
  views.nec.hidden = name !== "nec";
  views.simulator.hidden = name !== "simulator";
  views.sportsSim.hidden = name !== "sportsSim";
  views.schedule.hidden = name !== "schedule";
  views.installGame.hidden = name !== "installGame";
  views.search.hidden = name !== "search";
  els.back.hidden = name === "home";
  if (name === "home") els.title.textContent = "ElectricianAi";
}

function openTopic(topicId) {
  const topic = lessons.topics.find((t) => t.id === topicId);
  if (!topic) return;
  currentTopicId = topicId;
  markTopicViewed(topicId);
  updateProgress();
  els.title.textContent = topic.title;
  els.topicIntro.textContent = topic.intro || "";
  els.btnStudyRead.classList.add("btn-mode-active");
  els.btnStudyFlash.classList.remove("btn-mode-active");
  els.btnStudyQuiz.classList.remove("btn-mode-active");
  els.btnStudySim.classList.remove("btn-mode-active");
  els.btnStudySim.style.display = topic.keywords?.includes("panel") || topic.keywords?.includes("panels") ? "" : "none";
  studyMode = "read";
  els.quizArea.hidden = true;
  els.topicCards.hidden = false;
  renderTopicCards(topic);
  showView("topic");
  window.scrollTo(0, 0);
}

function renderTopicCards(topic) {
  els.topicCards.innerHTML = topic.cards.map(renderCard).join("");
  bindZoomButtons(els.topicCards);
  if (studyMode === "flash") {
    els.topicCards.querySelectorAll(".lesson-card").forEach((card) => {
      const btn = card.querySelector(".btn-flip");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const content = card.querySelector(".flash-reveal");
        if (content) {
          content.hidden = !content.hidden;
          btn.textContent = content.hidden ? "Tap to reveal" : "Tap to hide";
        }
      });
    });
  }
}

function bindZoomButtons(root) {
  root.querySelectorAll("[data-zoom]").forEach((btn) => {
    btn.addEventListener("click", () => {
      els.imageModalImg.src = btn.getAttribute("data-zoom");
      els.imageModalImg.alt = btn.getAttribute("data-alt") || "";
      els.imageModal.hidden = false;
    });
  });
}

function updateProgress() {
  const p = getProgress();
  const total = lessons.topics.length;
  const done = lessons.topics.filter((t) => p[t.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  if (els.progressBar) els.progressBar.style.setProperty("--pct", pct + "%");
  if (els.progressText) els.progressText.textContent = `${done} / ${total} topics`;
}

function renderHome() {
  const p = getProgress();
  els.topicGrid.innerHTML = lessons.topics
    .map(
      (t) => `
    <button type="button" class="topic-card ${p[t.id] ? "topic-done" : ""}" data-topic="${escapeHtml(t.id)}">
      <span class="topic-card-num">${t.number}</span>
      <h2>${escapeHtml(t.title)}</h2>
      <p>${escapeHtml(t.description)}</p>
      ${p[t.id] ? '<span class="topic-check">&#10003;</span>' : ""}
    </button>`
    )
    .join("");

  els.topicGrid.querySelectorAll(".topic-card").forEach((btn) => {
    btn.addEventListener("click", () => openTopic(btn.getAttribute("data-topic")));
  });

  els.suggestedList.innerHTML = lessons.suggestedPath
    .map((id) => {
      const t = lessons.topics.find((x) => x.id === id);
      return t ? `<li>${escapeHtml(t.title)}</li>` : "";
    })
    .join("");
  updateProgress();
}

function buildSearchIndex() {
  searchIndex = [];
  for (const topic of lessons.topics) {
    for (let i = 0; i < topic.cards.length; i++) {
      const c = topic.cards[i];
      const text = [
        topic.title,
        c.title,
        ...(Array.isArray(c.body) ? c.body : [c.body || ""]),
        c.remember || "",
        ...(c.list || []),
      ].join(" ");
      searchIndex.push({
        topicId: topic.id,
        topicTitle: topic.title,
        cardIndex: i,
        title: c.title,
        text: text.toLowerCase(),
      });
    }
  }
}

function runSearch(q) {
  const query = q.trim().toLowerCase();
  els.searchResults.innerHTML = "";
  if (!query) return;

  const hits = searchIndex
    .filter((e) => e.text.includes(query))
    .slice(0, 24);

  els.searchResults.innerHTML = hits
    .map(
      (h) => `
    <li>
      <button type="button" data-topic="${escapeHtml(h.topicId)}" data-card="${h.cardIndex}">
        <span class="search-hit-topic">${escapeHtml(h.topicTitle)}</span>
        <span class="search-hit-title">${escapeHtml(h.title)}</span>
      </button>
    </li>`
    )
    .join("");

  els.searchResults.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const topicId = btn.getAttribute("data-topic");
      const cardIndex = Number(btn.getAttribute("data-card"));
      openTopic(topicId);
      showView("topic");
      const cards = els.topicCards.querySelectorAll(".lesson-card");
      if (cards[cardIndex]) {
        cards[cardIndex].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function openSearch() {
  els.title.textContent = "Search";
  els.searchInput.value = "";
  els.searchResults.innerHTML = "";
  showView("search");
  els.searchInput.focus();
}

function setStudyMode(mode) {
  if (!currentTopicId) return;
  studyMode = mode;
  const topic = lessons.topics.find((t) => t.id === currentTopicId);
  if (!topic) return;
  els.btnStudyRead.classList.toggle("btn-mode-active", mode === "read");
  els.btnStudyFlash.classList.toggle("btn-mode-active", mode === "flash");
  els.btnStudyQuiz.classList.toggle("btn-mode-active", mode === "quiz");
  els.topicCards.hidden = mode === "quiz";
  els.quizArea.hidden = mode !== "quiz";
  if (mode === "quiz") {
    startQuiz(topic);
  } else {
    renderTopicCards(topic);
  }
}

function startQuiz(topic) {
  const questions = [];
  const cardsWithRemember = topic.cards.filter((c) => c.remember);
  const cardsWithList = topic.cards.filter((c) => c.list);
  const cardsWithBody = topic.cards.filter((c) => c.body);
  const allCards = topic.cards;

  for (const card of allCards.slice(0, 10)) {
    const q = makeQuestion(card, topic);
    if (q) questions.push(q);
  }

  if (questions.length < 5) {
    for (const card of allCards) {
      if (questions.length >= 10) break;
      if (!questions.find((q) => q.answer === card.title)) {
        const q = makeQuestion(card, topic);
        if (q) questions.push(q);
      }
    }
  }

  if (questions.length < 3) {
    els.quizArea.innerHTML = `<p class="lead">Not enough quiz material for this topic. Try Flash or Read mode.</p>`;
    els.topicCards.hidden = true;
    return;
  }

  quizState = {
    questions,
    index: 0,
    correct: 0,
    answered: false,
  };
  showQuestion();
}

function makeQuestion(card, topic) {
  if (card.remember) {
    const distractors = getDistractors(card.remember, topic);
    if (distractors.length >= 3) {
      return {
        question: `What is the key point of "${card.title}"?`,
        options: shuffle([card.remember, ...distractors.slice(0, 3)]),
        answer: card.remember,
      };
    }
  }
  if (card.list && card.list.length > 0) {
    const item = card.list[Math.floor(Math.random() * card.list.length)];
    const part = item.split(/[—\-:]/)[0].trim();
    if (part && part.length > 10) {
      const distractors = getDistractors(part, topic);
      if (distractors.length >= 3) {
        return {
          question: `Which of these is mentioned in "${card.title}"?`,
          options: shuffle([part, ...distractors.slice(0, 3)]),
          answer: part,
        };
      }
    }
  }
  return null;
}

function getDistractors(exclude, topic) {
  const pool = [];
  for (const c of topic.cards) {
    if (c.remember && c.remember !== exclude) pool.push(c.remember);
    if (c.list) {
      for (const item of c.list) {
        const part = item.split(/[—\-:]/)[0].trim();
        if (part && part !== exclude && part.length > 5) pool.push(part);
      }
    }
    if (pool.length >= 10) break;
  }
  return shuffle(pool);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showQuestion() {
  if (!quizState || quizState.index >= quizState.questions.length) {
    finishQuiz();
    return;
  }
  const q = quizState.questions[quizState.index];
  els.quizQuestion.innerHTML = `<p class="quiz-q-text">${escapeHtml(q.question)}</p>`;
  els.quizOptions.innerHTML = q.options
    .map(
      (opt, i) =>
        `<button type="button" class="quiz-opt" data-index="${i}">${escapeHtml(opt)}</button>`
    )
    .join("");
  els.quizFeedback.hidden = true;
  els.btnQuizNext.hidden = true;
  els.quizProgress.textContent = `${quizState.index + 1} / ${quizState.questions.length}`;
  quizState.answered = false;

  els.quizOptions.querySelectorAll(".quiz-opt").forEach((btn) => {
    btn.addEventListener("click", () => answerQuestion(btn, q));
  });
}

function answerQuestion(btn, q) {
  if (quizState.answered) return;
  quizState.answered = true;
  const selected = btn.textContent;
  const isCorrect = selected === q.answer;
  if (isCorrect) quizState.correct++;
  els.quizOptions.querySelectorAll(".quiz-opt").forEach((b) => {
    b.disabled = true;
    if (b.textContent === q.answer) b.classList.add("quiz-correct");
    else if (b === btn && !isCorrect) b.classList.add("quiz-wrong");
  });
  els.quizFeedback.hidden = false;
  els.quizFeedback.textContent = isCorrect ? "Correct!" : `Incorrect. Answer: ${q.answer}`;
  els.quizFeedback.className = isCorrect ? "quiz-feedback quiz-feedback-correct" : "quiz-feedback quiz-feedback-wrong";
  els.btnQuizNext.hidden = false;
}

function finishQuiz() {
  if (!quizState) return;
  const total = quizState.questions.length;
  const correct = quizState.correct;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  els.quizResultsScore.textContent = `${correct} / ${total} correct (${pct}%)`;
  let grade = pct >= 90 ? "Excellent!" : pct >= 70 ? "Good job!" : pct >= 50 ? "Keep studying." : "Review this topic again.";
  els.quizResultsDetail.textContent = grade;
  els.quizResultsModal.hidden = false;
}

els.back.addEventListener("click", () => {
  if (currentView === "search" || currentView === "topic" || currentView === "nec" || currentView === "simulator" || currentView === "sportsSim" || currentView === "schedule" || currentView === "installGame") {
    showView("home");
    els.title.textContent = "ElectricianAi";
    quizState = null;
  }
});

els.searchBtn.addEventListener("click", openSearch);
els.searchInput.addEventListener("input", (e) => runSearch(e.target.value));

document.querySelector(".image-modal-close").addEventListener("click", () => {
  els.imageModal.hidden = true;
  els.imageModalImg.src = "";
});

els.imageModal.addEventListener("click", (e) => {
  if (e.target === els.imageModal) {
    els.imageModal.hidden = true;
    els.imageModalImg.src = "";
  }
});

els.btnStudyRead?.addEventListener("click", () => setStudyMode("read"));
els.btnStudyFlash?.addEventListener("click", () => setStudyMode("flash"));
els.btnStudyQuiz?.addEventListener("click", () => setStudyMode("quiz"));
els.btnStudySim?.addEventListener("click", openSimulator);

els.btnQuizNext?.addEventListener("click", () => {
  quizState.index++;
  showQuestion();
});

els.btnQuizCloseResults?.addEventListener("click", () => {
  els.quizResultsModal.hidden = true;
});

els.quizResultsModal?.addEventListener("click", (e) => {
  if (e.target === els.quizResultsModal) els.quizResultsModal.hidden = true;
});

function openNecViewer() {
  els.title.textContent = "NEC Code Book";
  showView("nec");
  initNecViewer();
}

function openSimulator() {
  els.title.textContent = "Panel Simulator";
  showView("simulator");
  initSimulator();
}

function openSportsSim() {
  els.title.textContent = "Sports Lighting Sim";
  showView("sportsSim");
  initSportsSim();
}

function openSchedule() {
  els.title.textContent = "My Weeks";
  showView("schedule");
  initScheduleView();
}

function openInstallGame() {
  els.title.textContent = "Install Game";
  showView("installGame");
  initInstallGame();
}

els.btnNecViewer?.addEventListener("click", openNecViewer);
els.btnPanelSim?.addEventListener("click", openSimulator);
els.btnSportsSim?.addEventListener("click", openSportsSim);
els.btnInstallGame?.addEventListener("click", openInstallGame);
els.btnSchedule?.addEventListener("click", openSchedule);
els.btnNfpaLink?.addEventListener("click", () => {
  window.open("https://link.nfpa.org/free-access/publications/70/2026", "_blank");
});
els.btnTapeMeasure?.addEventListener("click", () => {
  window.open("https://baloo8721.github.io/TradeMath-Ruler-Multimeter/ruler.html", "_blank");
});
els.btnTradeCalc?.addEventListener("click", () => {
  window.open("https://baloo8721.github.io/TradeMath-Ruler-Multimeter/calculator.html", "_blank");
});
els.btnMeterSim?.addEventListener("click", () => {
  window.open("https://baloo8721.github.io/TradeMath-Ruler-Multimeter/Multi-Meter.html", "_blank");
});

async function loadLessons() {
  const res = await fetch("content/lessons.json");
  if (!res.ok) throw new Error("Failed to load lessons");
  lessons = await res.json();
  buildSearchIndex();
  renderHome();
}

window.addEventListener("app-unlocked", () => {
  loadLessons().catch((err) => {
    console.error(err);
    els.topicGrid.innerHTML = `<p class="pin-error">Could not load lessons.</p>`;
  });
});
