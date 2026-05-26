let lessons = { topics: [], suggestedPath: [] };
let searchIndex = [];

const views = {
  home: document.getElementById("view-home"),
  topic: document.getElementById("view-topic"),
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
};

let currentView = "home";

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
  let html = `<article class="lesson-card"><h3>${escapeHtml(card.title)}</h3>`;
  if (card.safety) {
    const text = card.body
      ? Array.isArray(card.body)
        ? card.body.join(" ")
        : card.body
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
  html += "</article>";
  return html;
}

function showView(name) {
  currentView = name;
  views.home.hidden = name !== "home";
  views.topic.hidden = name !== "topic";
  views.search.hidden = name !== "search";
  els.back.hidden = name === "home";
  if (name === "home") els.title.textContent = "ElectricianAi";
}

function openTopic(topicId) {
  const topic = lessons.topics.find((t) => t.id === topicId);
  if (!topic) return;
  els.title.textContent = topic.title;
  els.topicIntro.textContent = topic.intro || "";
  els.topicCards.innerHTML = topic.cards.map(renderCard).join("");
  bindZoomButtons(els.topicCards);
  showView("topic");
  window.scrollTo(0, 0);
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

function renderHome() {
  els.topicGrid.innerHTML = lessons.topics
    .map(
      (t) => `
    <button type="button" class="topic-card" data-topic="${escapeHtml(t.id)}">
      <span class="topic-card-num">${t.number}</span>
      <h2>${escapeHtml(t.title)}</h2>
      <p>${escapeHtml(t.description)}</p>
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

els.back.addEventListener("click", () => {
  if (currentView === "search" || currentView === "topic") {
    showView("home");
    els.title.textContent = "ElectricianAi";
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
