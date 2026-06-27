import { renderInstallGuideSVG } from "./install-guide.js";

let schedules = { weeks: [] };

let scheduleDataLoaded = false;
const loadCallbacks = [];

function onSchedulesReady(fn) {
  if (scheduleDataLoaded) { fn(); return; }
  loadCallbacks.push(fn);
}

async function loadSchedules() {
  try {
    const res = await fetch("content/schedules.json");
    if (!res.ok) throw new Error("Failed to load schedules");
    schedules = await res.json();
    scheduleDataLoaded = true;
    loadCallbacks.forEach((fn) => fn());
    loadCallbacks.length = 0;
  } catch (err) {
    console.error(err);
  }
}

function escapeHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function renderScheduleView() {
  const root = document.getElementById("schedule-week-list");
  if (!root) return;

  if (!schedules.weeks || schedules.weeks.length === 0) {
    root.innerHTML = `<p class="schedule-empty">No schedules yet. Add a week to get started.</p>`;
    return;
  }

  root.innerHTML = schedules.weeks.map((w, wi) => renderWeek(w, wi)).join("");
}

function renderWeek(w, wi) {
  const daysHtml = (w.days || []).map((d) => `
    <div class="schedule-day">
      <div class="schedule-day-header">
        <span class="schedule-day-name">${escapeHtml(d.day)}</span>
        <span class="schedule-day-type">${escapeHtml(d.type)}</span>
      </div>
      <div class="schedule-day-meta">
        <span>Crew: ${escapeHtml(d.crew)}</span>
        ${d.location ? `<span>Location: ${escapeHtml(d.location)}</span>` : ""}
      </div>
      <p class="schedule-day-work">${escapeHtml(d.work)}</p>
      ${d.details?.length ? `<ul class="schedule-day-details">${d.details.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : ""}
    </div>
  `).join("");

  const installGuideHtml = wi === 0 ? `
    <div class="schedule-block">
      <h4 class="schedule-block-title">5-Step Pole Installation</h4>
      <p class="schedule-subtitle" style="margin-bottom:0.75rem">Sequence for Musco sports lighting systems</p>
      <div class="schedule-install-visual">${renderInstallGuideSVG()}</div>
    </div>
  ` : "";

  const studyHtml = (w.study || []).map((s) => `
    <div class="schedule-block">
      <h4 class="schedule-block-title">${escapeHtml(s.topic)}</h4>
      <ul>${s.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
    </div>
  `).join("");

  const toolsHtml = (w.tools || []).length ? `
    <div class="schedule-block">
      <h4 class="schedule-block-title">Tools to Have Ready</h4>
      <ul>${w.tools.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
    </div>
  ` : "";

  const safetyHtml = (w.safety || []).length ? `
    <div class="schedule-block schedule-block-safety">
      <h4 class="schedule-block-title">Safety to Know Cold</h4>
      <ul>${w.safety.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
    </div>
  ` : "";

  const tipsHtml = (w.dayOneTips || []).length ? `
    <div class="schedule-block">
      <h4 class="schedule-block-title">How to Act on Day One</h4>
      <h5 class="schedule-subtitle">Before the job:</h5>
      <ul>${w.dayOneTips.filter((_, i) => i < 4).map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
      <h5 class="schedule-subtitle">On the job:</h5>
      <ul>${w.dayOneTips.slice(4).map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
    </div>
  ` : "";

  const impressHtml = (w.impressTheCrew || []).length ? `
    <div class="schedule-block">
      <h4 class="schedule-block-title">Things That Impress a Crew</h4>
      <ul>${w.impressTheCrew.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
    </div>
  ` : "";

  const cheatHtml = (w.cheatSheet || []).length ? `
    <div class="schedule-block">
      <h4 class="schedule-block-title">Quick Cheat Sheet</h4>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Term</th><th>What It Means</th></tr></thead>
          <tbody>${w.cheatSheet.map((c) => `<tr><td><strong>${escapeHtml(c.term)}</strong></td><td>${escapeHtml(c.meaning)}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    </div>
  ` : "";

  const crewMeta = w.crew ? `<p class="schedule-crew">Crew: ${escapeHtml(w.crew)}</p>` : "";
  const locMeta = w.location ? `<p class="schedule-location">Location: ${escapeHtml(w.location)}</p>` : "";

  return `
    <article class="schedule-week" data-week-index="${wi}">
      <div class="schedule-week-header">
        <h2 class="schedule-week-title">${escapeHtml(w.week)}</h2>
        ${w.dates ? `<span class="schedule-week-dates">${escapeHtml(w.dates)}</span>` : ""}
      </div>
      ${crewMeta}
      ${locMeta}
      ${daysHtml}
      ${installGuideHtml}
      ${studyHtml}
      ${toolsHtml}
      ${safetyHtml}
      ${tipsHtml}
      ${impressHtml}
      ${cheatHtml}
    </article>
  `;
}

function initScheduleView() {
  loadSchedules().then(() => renderScheduleView());
}

function refreshScheduleView() {
  renderScheduleView();
}

export { initScheduleView, refreshScheduleView, onSchedulesReady };
