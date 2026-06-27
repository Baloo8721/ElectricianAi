let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
const pdfPath = "assets/nec.pdf";
let pageRendering = false;
let pdfReady = false;
let necInitialized = false;
let currentScale = 1.5;
let activeTab = "pdf";

const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.mjs";

// Text search state
let necContent = null;
let searchIndex = null;
let textSearchLoaded = false;

const necBookmarks = [
  { label: "Article 90 — Introduction", page: 1 },
  { label: "Article 100 — Definitions", page: 20 },
  { label: "Article 110 — Requirements for Electrical Installations", page: 30 },
  { label: "Article 200 — Neutral Identification", page: 50 },
  { label: "Article 210 — Branch Circuits", page: 55 },
  { label: "Article 215 — Feeders", page: 65 },
  { label: "Article 220 — Load Calculations", page: 68 },
  { label: "Article 225 — Outside Branch Circuits", page: 75 },
  { label: "Article 230 — Services", page: 80 },
  { label: "Article 240 — Overcurrent Protection", page: 90 },
  { label: "Article 250 — Grounding & Bonding", page: 100 },
  { label: "Article 300 — Wiring Methods", page: 120 },
  { label: "Article 310 — Conductors & Ampacity", page: 130 },
  { label: "Article 314 — Boxes & Enclosures", page: 140 },
  { label: "Article 330 — MC Cable", page: 148 },
  { label: "Article 334 — NM Cable (Romex)", page: 150 },
  { label: "Article 340 — UF Cable", page: 153 },
  { label: "Article 342 — IMC", page: 155 },
  { label: "Article 344 — RMC", page: 158 },
  { label: "Article 352 — PVC Conduit", page: 162 },
  { label: "Article 358 — EMT", page: 168 },
  { label: "Article 362 — ENT", page: 172 },
  { label: "Article 370 — LFMC", page: 175 },
  { label: "Article 376 — Metal Wireways", page: 178 },
  { label: "Article 386 — Surface Raceways", page: 180 },
  { label: "Article 392 — Cable Trays", page: 182 },
  { label: "Article 400 — Flexible Cords", page: 186 },
  { label: "Article 404 — Switches", page: 190 },
  { label: "Article 406 — Receptacles", page: 195 },
  { label: "Article 408 — Switchboards & Panels", page: 200 },
  { label: "Article 410 — Luminaires", page: 208 },
  { label: "Article 422 — Appliances", page: 215 },
  { label: "Article 424 — Fixed Electric Space Heating", page: 220 },
  { label: "Article 430 — Motors", page: 225 },
  { label: "Article 440 — HVAC", page: 240 },
  { label: "Article 445 — Generators", page: 248 },
  { label: "Article 450 — Transformers", page: 250 },
  { label: "Article 480 — Storage Batteries", page: 258 },
  { label: "Article 490 — Industrial Equipment", page: 260 },
  { label: "Article 500 — Hazardous Locations", page: 265 },
  { label: "Article 517 — Health Care Facilities", page: 275 },
  { label: "Article 518 — Places of Assembly", page: 282 },
  { label: "Article 525 — Carnivals & Fairs", page: 285 },
  { label: "Article 550 — Mobile Homes", page: 290 },
  { label: "Article 551 — Recreational Vehicles", page: 295 },
  { label: "Article 555 — Marinas & Boatyards", page: 300 },
  { label: "Article 590 — Temporary Installations", page: 305 },
  { label: "Article 600 — Electric Signs", page: 310 },
  { label: "Article 610 — Cranes & Hoists", page: 312 },
  { label: "Article 620 — Elevators", page: 315 },
  { label: "Article 625 — EV Charging", page: 320 },
  { label: "Article 630 — Welding", page: 325 },
  { label: "Article 640 — Audio Equipment", page: 328 },
  { label: "Article 645 — IT Equipment", page: 330 },
  { label: "Article 680 — Pools & Spas", page: 335 },
  { label: "Article 690 — Solar PV", page: 345 },
  { label: "Article 695 — Fire Pumps", page: 355 },
  { label: "Article 700 — Emergency Systems", page: 360 },
  { label: "Article 701 — Legally Required Standby", page: 366 },
  { label: "Article 702 — Optional Standby", page: 368 },
  { label: "Article 705 — Interconnected Sources", page: 370 },
  { label: "Article 708 — Critical Operations", page: 375 },
  { label: "Article 725 — Class 1, 2, 3 Circuits", page: 380 },
  { label: "Article 760 — Fire Alarm", page: 388 },
  { label: "Article 770 — Optical Fiber", page: 392 },
  { label: "Article 800 — Communications", page: 395 },
  { label: "Annex C — Conduit Fill Tables", page: 410 },
  { label: "Annex D — Examples", page: 440 },
  { label: "Table 310.16 — Ampacity", page: 130 },
  { label: "Table 250.122 — EGC Sizing", page: 110 },
  { label: "Table 250.66 — GEC Sizing", page: 112 },
];

const els = {};

function initNecViewer() {
  if (necInitialized) return;
  necInitialized = true;

  els.title = document.getElementById("nec-title");
  els.pageNum = document.getElementById("nec-page-num");
  els.totalPages = document.getElementById("nec-total-pages");
  els.canvas = document.getElementById("nec-canvas");
  els.ctx = els.canvas?.getContext("2d");
  els.prev = document.getElementById("nec-prev");
  els.next = document.getElementById("nec-next");
  els.search = document.getElementById("nec-search-input");
  els.searchBtn = document.getElementById("nec-search-btn");
  els.bookmarks = document.getElementById("nec-bookmarks");
  els.loadStatus = document.getElementById("nec-load-status");
  els.pageInput = document.getElementById("nec-page-input");
  els.pageGo = document.getElementById("nec-page-go");
  els.zoomIn = document.getElementById("nec-zoom-in");
  els.zoomOut = document.getElementById("nec-zoom-out");
  els.sidebar = document.getElementById("nec-sidebar");
  els.sidebarToggle = document.getElementById("nec-sidebar-toggle");
  els.tabs = document.querySelectorAll(".nec-tab");
  els.pdfView = document.getElementById("nec-pdf-view");
  els.textView = document.getElementById("nec-text-view");
  els.textSearchInput = document.getElementById("nec-text-search");
  els.textResults = document.getElementById("nec-text-results");
  els.textContent = document.getElementById("nec-text-article");
  els.textSearchBtn = document.getElementById("nec-text-search-btn");
  els.textNotFound = document.getElementById("nec-text-notfound");

  if (!els.canvas) return;

  buildBookmarks();
  bindEvents();
  loadPdf();
  loadTextContent();
}

function buildBookmarks() {
  if (!els.bookmarks) return;
  els.bookmarks.innerHTML = necBookmarks
    .map(
      (b) =>
        `<button type="button" class="nec-bookmark" data-page="${b.page}">${escapeHtml(b.label)}</button>`
    )
    .join("");
}

function escapeHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function bindEvents() {
  // PDF events
  els.prev?.addEventListener("click", () => changePage(-1));
  els.next?.addEventListener("click", () => changePage(1));
  els.search?.addEventListener("input", () => searchPdf());
  els.searchBtn?.addEventListener("click", () => searchPdf());

  els.pageGo?.addEventListener("click", () => {
    const p = parseInt(els.pageInput?.value);
    if (p && p >= 1 && p <= totalPages) goToPage(p);
  });
  els.pageInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") els.pageGo?.click();
  });

  els.zoomIn?.addEventListener("click", () => zoom(1.25));
  els.zoomOut?.addEventListener("click", () => zoom(0.8));
  els.sidebarToggle?.addEventListener("click", () => {
    els.sidebar?.classList.toggle("nec-sidebar-open");
  });

  els.bookmarks?.addEventListener("click", (e) => {
    const btn = e.target.closest(".nec-bookmark");
    if (!btn) return;
    const page = parseInt(btn.getAttribute("data-page"));
    if (page) goToPage(page);
  });

  // Tab switching
  els.tabs?.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.view));
  });

  // Text search events
  els.textSearchBtn?.addEventListener("click", () => searchText());
  els.textSearchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchText();
  });

  // Keyboard nav for PDF
  document.addEventListener("keydown", (e) => {
    if (document.getElementById("view-nec")?.hidden) return;
    if (activeTab !== "pdf") return;
    if (e.key === "ArrowRight") changePage(1);
    if (e.key === "ArrowLeft") changePage(-1);
  });
}

function switchTab(view) {
  activeTab = view;
  els.tabs?.forEach((t) => t.classList.toggle("nec-tab-active", t.dataset.view === view));
  els.pdfView?.classList.toggle("nec-panel-hidden", view !== "pdf");
  els.textView?.classList.toggle("nec-panel-hidden", view !== "text");
}

async function loadPdf() {
  try {
    const res = await fetch(pdfPath);
    if (!res.ok) throw new Error("PDF not found at " + pdfPath);
    const arr = await res.arrayBuffer();

    const pdfjsLib = await import(PDFJS_CDN);
    pdfDoc = await pdfjsLib.getDocument({ data: arr }).promise;
    totalPages = pdfDoc.numPages;
    pdfReady = true;
    if (els.totalPages) els.totalPages.textContent = totalPages;
    if (els.loadStatus) els.loadStatus.hidden = true;
    goToPage(1);
  } catch (err) {
    console.error("NEC PDF load error:", err);
    if (els.loadStatus) {
      els.loadStatus.innerHTML = `
        <p>NEC PDF not loaded yet.</p>
        <p class="nec-hint">Drop your NEC PDF as <code>assets/nec.pdf</code> to enable the full code book viewer.</p>
        <p class="nec-hint">Or use the <strong>Text</strong> tab above if you've scraped the NEC content.</p>
      `;
      els.loadStatus.hidden = false;
    }
  }
}

function zoom(factor) {
  if (!pdfReady) return;
  currentScale = Math.max(0.5, Math.min(4, currentScale * factor));
  renderPage(currentPage);
}

async function renderPage(num) {
  if (!pdfDoc || pageRendering) return;
  pageRendering = true;
  try {
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: currentScale });
    els.canvas.width = viewport.width;
    els.canvas.height = viewport.height;
    await page.render({ canvasContext: els.ctx, viewport }).promise;
    currentPage = num;
    if (els.pageNum) els.pageNum.textContent = num;
    if (els.pageInput) els.pageInput.value = num;
    els.prev.disabled = num <= 1;
    els.next.disabled = num >= totalPages;
    updateActiveBookmark();
  } catch (err) {
    console.error("Render error:", err);
  }
  pageRendering = false;
}

function changePage(delta) {
  const next = currentPage + delta;
  if (next >= 1 && next <= totalPages) goToPage(next);
}

function goToPage(num) {
  if (num < 1 || num > totalPages) return;
  renderPage(num);
}

function updateActiveBookmark() {
  if (!els.bookmarks) return;
  els.bookmarks.querySelectorAll(".nec-bookmark").forEach((b) => {
    const p = parseInt(b.getAttribute("data-page"));
    b.classList.toggle("nec-bookmark-active", p === currentPage);
  });
}

function searchPdf() {
  if (!pdfDoc || !els.search) return;
  const q = els.search.value.trim().toLowerCase();
  if (!q) return;

  let matches = [];
  const maxPages = Math.min(totalPages, 100);

  (async () => {
    for (let i = 1; i <= maxPages; i++) {
      try {
        const page = await pdfDoc.getPage(i);
        const text = await page.getTextContent();
        const fullText = text.items.map((t) => t.str).join(" ");
        if (fullText.toLowerCase().includes(q)) {
          matches.push(i);
        }
      } catch (e) {}
    }
    if (matches.length > 0) {
      goToPage(matches[0]);
      if (els.loadStatus) {
        els.loadStatus.innerHTML = `<p class="nec-search-result">Found in ${matches.length} page(s): ${matches.slice(0, 10).join(", ")}${matches.length > 10 ? "..." : ""}</p>`;
        els.loadStatus.hidden = false;
        setTimeout(() => { els.loadStatus.hidden = true; }, 4000);
      }
    } else {
      if (els.loadStatus) {
        els.loadStatus.innerHTML = `<p class="nec-search-result">No matches found for "${q}"</p>`;
        els.loadStatus.hidden = false;
        setTimeout(() => { els.loadStatus.hidden = true; }, 3000);
      }
    }
  })();
}

// ===== Text Search Mode =====

async function loadTextContent() {
  try {
    const res = await fetch("data/nec-content.json");
    if (!res.ok) throw new Error("Not found");
    necContent = await res.json();
    buildSearchIndex();
    textSearchLoaded = true;
    if (els.textNotFound) els.textNotFound.hidden = true;
    if (els.textSearchInput) els.textSearchInput.disabled = false;
    if (els.textSearchBtn) els.textSearchBtn.disabled = false;
    console.log(`Loaded ${necContent.articles.length} NEC articles for text search`);
  } catch {
    console.log("NEC text content not available. Run the scraper to generate it.");
    if (els.textNotFound) els.textNotFound.hidden = false;
  }
}

function buildSearchIndex() {
  if (!necContent?.articles) return;
  searchIndex = {};
  for (const article of necContent.articles) {
    const words = tokenize(article.title + " " + article.content);
    for (const word of words) {
      if (!searchIndex[word]) searchIndex[word] = [];
      if (!searchIndex[word].find((a) => a.id === article.id)) {
        searchIndex[word].push({ id: article.id, title: article.title });
      }
    }
  }
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function searchText() {
  if (!textSearchLoaded || !els.textSearchInput || !els.textResults) return;
  const query = els.textSearchInput.value.trim().toLowerCase();
  if (!query) return;

  const queryWords = tokenize(query);
  if (queryWords.length === 0) return;

  const scores = {};

  for (const article of necContent.articles) {
    const contentLower = (article.title + " " + article.content).toLowerCase();
    let score = 0;
    for (const word of queryWords) {
      // Count occurrences
      let idx = 0;
      let count = 0;
      while ((idx = contentLower.indexOf(word, idx)) !== -1) {
        count++;
        idx += word.length;
      }
      score += count;
    }
    if (score > 0) {
      scores[article.id] = { article, score };
    }
  }

  const results = Object.values(scores)
    .sort((a, b) => b.score - a.score)
    .slice(0, 50);

  if (results.length === 0) {
    els.textResults.innerHTML = `<p class="nec-search-result">No matches found for "${query}"</p>`;
    els.textContent.innerHTML = "";
    return;
  }

  els.textResults.innerHTML = results
    .map(
      (r) => `
        <button type="button" class="nec-text-result" data-id="${escapeHtml(r.article.id)}">
          <span class="nec-result-title">${escapeHtml(r.article.title)}</span>
          <span class="nec-result-snip">${escapeHtml(snippet(r.article.content, query, 120))}</span>
          <span class="nec-result-score">${r.score} matches</span>
        </button>
      `
    )
    .join("");

  els.textResults.querySelectorAll(".nec-text-result").forEach((btn) => {
    btn.addEventListener("click", () => showArticle(btn.dataset.id, query));
  });

  // Show first result
  showArticle(results[0].article.id, query);
}

function snippet(text, query, maxLen) {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return text.slice(0, maxLen) + "...";
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + query.length + 80);
  let snip = text.slice(start, end);
  if (start > 0) snip = "..." + snip;
  if (end < text.length) snip += "...";
  return snip;
}

function showArticle(id, highlight) {
  if (!els.textContent || !necContent) return;
  const article = necContent.articles.find((a) => a.id === id);
  if (!article) return;

  let content = escapeHtml(article.content);

  if (highlight) {
    const re = new RegExp(`(${escapeRegex(highlight)})`, "gi");
    content = content.replace(re, "<mark>$1</mark>");
  }

  els.textContent.innerHTML = `
    <h3 class="nec-article-title">${escapeHtml(article.title)}</h3>
    <div class="nec-article-body">${content}</div>
  `;

  // Highlight matching result in sidebar
  els.textResults?.querySelectorAll(".nec-text-result").forEach((b) => {
    b.classList.toggle("nec-result-active", b.dataset.id === id);
  });
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export { initNecViewer, goToPage, loadPdf };
