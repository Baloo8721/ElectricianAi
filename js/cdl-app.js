let MODULES = [];
/* ============ CDL Fast Track — App Logic ============ */
const state = {
  view: 'home',          // home | study | quiz | results
  filter: 'all',         // all | core | endorsement | skills | testday | path
  currentModuleId: null,
  quizQueue: [],          // array of {moduleShort, q}
  quizIndex: 0,
  quizAnswers: [],         // per question: {correct:bool, chosenIdx, qRef}
  quizMode: 'module',     // module | general | full | classa
  examVersion: null,      // 1 | 2 | 3 for classa exam buckets
  progress: {},            // moduleId -> {bestPct, attempts}
  lastResult: null,        // {correct, total, pct, label, date}
};

const PROGRESS_KEY = 'cdl_fasttrack_progress_v1';

function loadProgress(){
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if(!raw) return;
    const saved = JSON.parse(raw);
    if(saved && saved.progress) state.progress = saved.progress;
    if(saved && saved.lastResult) state.lastResult = saved.lastResult;
  } catch(e){ /* ignore */ }
}

function saveProgress(){
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      progress: state.progress,
      lastResult: state.lastResult,
    }));
  } catch(e){ /* ignore */ }
}

function $(sel, root){ return (root||document).querySelector(sel); }
function el(tag, cls, html){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html !== undefined) e.innerHTML = html;
  return e;
}
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
function moduleById(id){ return MODULES.find(m => m.id === id); }

function groupLabel(g){
  if(g==='core') return 'Core';
  if(g==='endorsement') return 'Endorsement';
  if(g==='skills') return 'Skills Test';
  return g;
}
function groupTagClass(g){
  if(g==='core') return 'tag-core';
  if(g==='endorsement') return 'tag-endorsement';
  if(g==='testday') return 'tag-testday';
  return 'tag-skills';
}

/* ---------------- RENDER: ROOT ---------------- */
function render(){
  const app = $('#app');
  app.innerHTML = '';
  app.appendChild(renderHero());

  if(state.view === 'home'){
    app.appendChild(renderHomeView());
  } else if(state.view === 'study'){
    app.appendChild(renderStudyView());
  } else if(state.view === 'quiz'){
    app.appendChild(renderQuizView());
  } else if(state.view === 'results'){
    app.appendChild(renderResultsView());
  }

  const foot = el('footer','app-footer',
    'Unofficial study guide condensed from the Florida Commercial Driver\'s License Handbook.<br>Always confirm current rules at the FLHSMV before your test.'
  );
  app.appendChild(foot);
  window.scrollTo({top:0, behavior: state.view==='home' ? 'auto':'smooth'});
}

function renderHero(){
  const hero = el('div','hero');
  const totalQ = MODULES.reduce((n,m)=>n+m.quiz.length,0);
  const totalMin = MODULES.reduce((n,m)=>n+m.minutes,0);
  const last = state.lastResult;
  hero.innerHTML = `
    <div class="hero-top">
      <div class="badge-diamond"><span>CDL</span></div>
      <div>
        <h1>CDL Fast Track</h1>
        <p class="sub">Florida handbook, condensed into ${MODULES.length} quick study stops + mini tests</p>
      </div>
    </div>
    <div class="hero-stats">
      <div class="stat-chip">📖 <b>${MODULES.length}</b>&nbsp;modules</div>
      <div class="stat-chip">❓ <b>${totalQ}</b>&nbsp;quiz Qs</div>
      <div class="stat-chip">⏱️ <b>~${totalMin}</b>&nbsp;min total</div>
      ${last ? `<div class="stat-chip">🏁 Last test <b>${last.pct}%</b> ${last.label ? '· '+last.label : ''}</div>` : ''}
    </div>
  `;
  return hero;
}

/* ---------------- RENDER: HOME ---------------- */
function renderHomeView(){
  const wrap = el('div','view');

  const intro = el('div','route-intro');
  intro.innerHTML = `
    <p><span class="accent">How to use this:</span> Work through the modules in order, or jump straight to whatever endorsement you need. Each stop has a short study card followed by a mini quiz pulled straight from the handbook's own "test your knowledge" style questions.</p>
    <p><span class="accent">Class A focus:</span> You only need <b>Sections 1, 2, 3, 5, 6</b> for the three written tests (General Knowledge, Air Brakes, Combination Vehicles). Sections 11–13 are for the skills test (practice after you get your permit). Sections 4, 7, 8, 9, 10 are optional endorsements for other vehicle types.</p>
  `;
  wrap.appendChild(intro);

  wrap.appendChild(renderPathBanner());

  // Practice exam card
  const examCard = el('div','exam-card');
  const last = state.lastResult;
  const vSizes = classAVersionSizes();
  examCard.innerHTML = `
    <h3>🏁 Ready to test yourself?</h3>
    <p>Simulate the real Florida Class A CLP exam. Three versions split the full question bank (${classAPools().gk.length} GK + ${classAPools().ab.length} Air Brakes + ${classAPools().combo.length} Combo) so every single question gets covered across versions. Each section requires 80% to pass.</p>
    <div class="exam-buttons">
      <div class="exam-btn exam-btn-primary" id="btn-exam-classa1"><span>🚛 Florida Class A CLP Exam · Version 1</span><b>${vSizes[0]} Q · GK + Air Brakes + Combo</b></div>
      <div class="exam-btn" id="btn-exam-classa2"><span>Florida Class A CLP Exam · Version 2</span><b>${vSizes[1]} Q · GK + Air Brakes + Combo</b></div>
      <div class="exam-btn" id="btn-exam-classa3"><span>Florida Class A CLP Exam · Version 3</span><b>${vSizes[2]} Q · GK + Air Brakes + Combo</b></div>
      <div class="exam-btn" id="btn-exam-general"><span>General Knowledge Practice Exam</span><b>50 Q · Sections 1–3</b></div>
      <div class="exam-btn" id="btn-exam-full"><span>Full Mixed Review</span><b>${Math.min(50, MODULES.reduce((n,m)=>n+m.quiz.length,0))} Q · All modules</b></div>
    </div>
    ${last ? `<p class="exam-last">Last test: <b>${last.pct}%</b> (${last.correct}/${last.total})${last.label ? ' · '+last.label : ''}${last.date ? ' · '+last.date : ''}</p>` : ''}
  `;
  wrap.appendChild(examCard);

  // filter pills
  const picker = el('div','section-picker');
  const filters = [['path','🚛 Required for Class A'],['all','All'],['core','Core'],['endorsement','Endorsements'],['skills','Skills Tests'],['testday','Test Day']];
  filters.forEach(([key,label])=>{
    const p = el('div','pill-toggle'+(state.filter===key?' active':''), label);
    p.addEventListener('click', ()=>{ state.filter = key; render(); });
    picker.appendChild(p);
  });
  wrap.appendChild(picker);

  // practice resources
  wrap.appendChild(renderResources());

  // route list
  const route = el('div','route');
  let list;
  if(state.filter === 'all') list = MODULES;
  else if(state.filter === 'path') list = MODULES.filter(m => !m.optional);
  else list = MODULES.filter(m => m.group === state.filter);
  list.forEach(m=>{
    route.appendChild(renderStopCard(m));
  });
  wrap.appendChild(route);

  setTimeout(()=>{
    $('#btn-exam-classa1')?.addEventListener('click', ()=> startClassAExam(1));
    $('#btn-exam-classa2')?.addEventListener('click', ()=> startClassAExam(2));
    $('#btn-exam-classa3')?.addEventListener('click', ()=> startClassAExam(3));
    $('#btn-exam-general')?.addEventListener('click', ()=> startExam('general'));
    $('#btn-exam-full')?.addEventListener('click', ()=> startExam('full'));
  },0);

  return wrap;
}

function renderPathBanner(){
  const priorityModules = MODULES.filter(m => !m.optional);
  const banner = el('div','path-banner');
  banner.innerHTML = `
    <div class="path-banner-head">
      <div class="path-banner-icon">🚛</div>
      <h3>Required for Class A — 3 Written Tests + Skills</h3>
    </div>
    <p><b>Written tests:</b> General Knowledge (Sections 1–3), Air Brakes (Section 5), Combination Vehicles (Section 6). <b>Skills tests:</b> Pre-trip inspection, backing, road test (Sections 11–13, practice after permit). <b>Manual vs Automatic:</b> Test in a manual = no E restriction (can drive both). Test in automatic = E restriction for life (no manual transmission).</p>
    <p>Focus on: <b>${priorityModules.map(m=>m.number).join(', ')}</b> — 9 required modules. Optional sections (4, 7, 8, 9, 10) are for bus drivers, tankers, hazmat, etc. Look for the <span class="priority-star">★</span> star on required Class A content.</p>
    <div class="path-cta" id="btn-path-filter">Show only required (${priorityModules.length} stops) →</div>
  `;
  setTimeout(()=>{
    $('#btn-path-filter')?.addEventListener('click', ()=>{ state.filter = 'path'; render(); });
  },0);
  return banner;
}

function renderResources(){
  const wrap = el('div','resources-card');
  wrap.innerHTML = `
    <h4>🌐 Free practice tests — use 2–3 of these, they pull from the real question pool</h4>
    <div class="resources-list">
      <a href="https://driving-tests.org/florida/fl-cdl-practice-test/" target="_blank" rel="noopener">Florida CDL practice — driving-tests.org <span class="res-arrow">↗</span></a>
      <a href="https://cdlpracticetest.com/florida/" target="_blank" rel="noopener">Florida practice tests — cdlpracticetest.com <span class="res-arrow">↗</span></a>
      <a href="https://www.cristcdl.com/" target="_blank" rel="noopener">CristCDL — r/Truckers' #1 pick <span class="res-arrow">↗</span></a>
      <a href="https://www.test-guide.com/free-cdl-practice-tests.html" target="_blank" rel="noopener">Test-Guide — deepest air brakes bank <span class="res-arrow">↗</span></a>
      <a href="https://www.roehl.jobs/cdl-practice-tests/florida" target="_blank" rel="noopener">Roehl Florida practice tests <span class="res-arrow">↗</span></a>
    </div>
  `;
  return wrap;
}

function renderStopCard(m){
  const prog = state.progress[m.id];
  const stop = el('div','stop'+(m.optional ? ' optional':''));
  const marker = el('div','stop-marker'+(prog && prog.bestPct>=80 ? ' done':''), prog && prog.bestPct>=80 ? '✓' : String(m.number));
  stop.appendChild(marker);

  const card = el('div','stop-card');
  card.innerHTML = `
    <div class="stop-head">
      <div class="stop-title">${m.optional ? '<span class="optional-badge" title="'+m.skipReason+'">⚠️ Optional</span> ' : ''}${m.classAManual ? '<span class="priority-star" title="Recommended for Class A, manual transmission">★</span>' : ''}${m.title}</div>
      <div class="stop-tag ${groupTagClass(m.group)}">${m.endorsement ? m.endorsement.split('—')[0].trim() : groupLabel(m.group)}</div>
    </div>
    <div class="stop-summary">${m.summary}${m.optional ? ' <span class="skip-note">(' + m.skipReason + ')</span>' : ''}</div>
    <div class="stop-foot">
      <span>⏱ ~${m.minutes} min · ${m.quiz.length} quiz Qs</span>
      <span class="${prog?'stop-score':''}">${prog ? 'Best: '+prog.bestPct+'%' : ''}</span>
    </div>
    <div class="stop-actions">
      <div class="mini-btn study-action">Study</div>
      <div class="mini-btn primary quiz-action">Quiz</div>
    </div>
  `;
  card.querySelector('.study-action').addEventListener('click', (e)=>{ e.stopPropagation(); openStudy(m.id); });
  card.querySelector('.quiz-action').addEventListener('click', (e)=>{ e.stopPropagation(); startModuleQuiz(m.id); });
  card.addEventListener('click', ()=> openStudy(m.id));

  stop.appendChild(card);
  return stop;
}

function openStudy(moduleId){
  state.currentModuleId = moduleId;
  state.view = 'study';
  render();
}

/* ---------------- RENDER: STUDY ---------------- */
function renderStudyView(){
  const m = moduleById(state.currentModuleId);
  const wrap = el('div','view');

  const backRow = el('div','back-row');
  backRow.innerHTML = `<div class="back-btn">←</div><div class="crumb">Stop ${m.number} of ${MODULES.length} ${m.endorsement ? '· '+m.endorsement : ''}${m.classAManual ? ' · ★ Your path' : ''}</div>`;
  backRow.querySelector('.back-btn').addEventListener('click', goHome);
  wrap.appendChild(backRow);

  wrap.appendChild(el('h2','study-title', m.title));
  wrap.appendChild(el('p','study-sub', m.summary));

  m.topics.forEach(t=>{
    const card = el('div','topic-card');
    const h = el('h4', null, t.heading);
    card.appendChild(h);
    const ul = el('ul');
    t.bullets.forEach(b=>{
      const li = el('li', null, b);
      ul.appendChild(li);
    });
    card.appendChild(ul);
    wrap.appendChild(card);
  });

  if(m.tips && m.tips.length){
    const divider = el('div','tips-divider');
    divider.innerHTML = `<div class="line"></div><span>Pro Tips · Manual Transmission</span><div class="line"></div>`;
    wrap.appendChild(divider);
    m.tips.forEach(t=>{
      const tc = el('div','tip-card');
      tc.appendChild(el('h4', null, t.heading));
      tc.appendChild(el('p', null, t.body));
      wrap.appendChild(tc);
    });
  }

  const cta = el('div','study-cta');
  const btn = document.createElement('button');
  btn.textContent = `Take the ${m.short} quiz (${m.quiz.length} Q) →`;
  btn.addEventListener('click', ()=> startModuleQuiz(m.id));
  cta.appendChild(btn);
  wrap.appendChild(cta);

  return wrap;
}

function goHome(){
  state.view = 'home';
  render();
}

/* ---------------- QUIZ SETUP ---------------- */
function startModuleQuiz(moduleId){
  const m = moduleById(moduleId);
  state.quizMode = 'module';
  state.currentModuleId = moduleId;
  state.quizQueue = shuffle(m.quiz).map(q => ({moduleShort: m.short, q}));
  state.quizIndex = 0;
  state.quizAnswers = [];
  state.view = 'quiz';
  render();
}

function startExam(mode){
  state.quizMode = mode;
  state.currentModuleId = null;
  let pool = [];
  if(mode === 'general'){
    MODULES.filter(m => m.group === 'core').forEach(m=>{
      m.quiz.forEach(q => pool.push({moduleShort:m.short, q}));
    });
  } else {
    MODULES.forEach(m=>{
      m.quiz.forEach(q => pool.push({moduleShort:m.short, q}));
    });
  }
  pool = shuffle(pool).slice(0, 50);
  state.quizQueue = pool;
  state.quizIndex = 0;
  state.quizAnswers = [];
  state.view = 'quiz';
  render();
}

function classAPools(){
  // Florida Class A CLP Exam pools: GK (Sections 1-3), Air Brakes (5), Combo (6)
  const gk = [];
  ['sec1','sec2','sec3'].forEach(id=>{
    const m = moduleById(id);
    if(m) m.quiz.forEach(q => gk.push({moduleShort:m.short, q, section:'GK'}));
  });
  const ab = [];
  const abModule = moduleById('sec5');
  if(abModule) abModule.quiz.forEach(q => ab.push({moduleShort:abModule.short, q, section:'Air Brakes'}));
  const combo = [];
  const comboModule = moduleById('sec6');
  if(comboModule) comboModule.quiz.forEach(q => combo.push({moduleShort:comboModule.short, q, section:'Combo'}));
  return {gk, ab, combo};
}

function split3(pool){
  // deterministic round-robin split so every question lands in exactly one version
  const buckets = [[], [], []];
  pool.forEach((item, i) => buckets[i % 3].push(item));
  return buckets;
}

function classAVersionSizes(){
  const {gk, ab, combo} = classAPools();
  const gkB = split3(gk), abB = split3(ab), combB = split3(combo);
  return [0,1,2].map(i => gkB[i].length + abB[i].length + combB[i].length);
}

function startClassAExam(version){
  // version 1 | 2 | 3 — each draws a different third of the bank so all
  // questions are covered across the three versions
  const {gk, ab, combo} = classAPools();
  const b = (version || 1) - 1;
  state.quizMode = 'classa';
  state.examVersion = version || 1;
  state.currentModuleId = null;
  state.quizQueue = [
    ...shuffle(split3(gk)[b]),
    ...shuffle(split3(ab)[b]),
    ...shuffle(split3(combo)[b]),
  ];
  state.quizIndex = 0;
  state.quizAnswers = [];
  state.view = 'quiz';
  render();
}

/* ---------------- RENDER: QUIZ ---------------- */
function renderQuizView(){
  const wrap = el('div','view');
  const total = state.quizQueue.length;
  const idx = state.quizIndex;
  const item = state.quizQueue[idx];

  const backRow = el('div','back-row');
  const label = state.quizMode === 'module' ? moduleById(state.currentModuleId).short :
                (state.quizMode === 'general' ? 'General Knowledge Practice Exam' : 
                 (state.quizMode === 'classa' ? 'Florida Class A CLP Exam · Version ' + (state.examVersion || 1) : 'Full Mixed Review'));
  backRow.innerHTML = `<div class="back-btn">✕</div><div class="crumb">${label}</div>`;
  if(state.quizMode === 'classa' && item.section) {
    backRow.querySelector('.crumb').innerHTML += ` <span class="section-badge">${item.section}</span>`;
  }
  backRow.querySelector('.back-btn').addEventListener('click', ()=>{
    if(confirm('Quit this quiz? Your progress on it will be lost.')) goHome();
  });
  wrap.appendChild(backRow);

  const correctSoFar = state.quizAnswers.filter(a=>a.correct).length;
  const progWrap = el('div','quiz-progress-wrap');
  progWrap.innerHTML = `
    <span class="quiz-count">${idx+1} / ${total}</span>
    <div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:${(idx/total)*100}%"></div></div>
    <span class="score-chip">✓ ${correctSoFar}</span>
  `;
  wrap.appendChild(progWrap);

  const qCard = el('div','q-card');
  const tag = el('div','q-tag', state.quizMode === 'module' ? `Question ${idx+1}` : item.moduleShort);
  qCard.appendChild(tag);
  qCard.appendChild(el('p','q-text', item.q.q));

  const optsWrap = el('div','opts');
  item.q.options.forEach((optText, i)=>{
    const b = document.createElement('button');
    b.className = 'opt-btn';
    b.textContent = optText;
    b.addEventListener('click', ()=> selectAnswer(i));
    optsWrap.appendChild(b);
  });
  qCard.appendChild(optsWrap);

  const explainBox = el('div','explain-box');
  explainBox.innerHTML = `<div class="explain-label">Why</div><div class="explain-text"></div>`;
  qCard.appendChild(explainBox);

  const nextRow = el('div','next-row');
  const nextBtn = document.createElement('button');
  nextBtn.className = 'next-btn';
  nextBtn.textContent = (idx === total-1) ? 'See results →' : 'Next question →';
  nextBtn.addEventListener('click', goToNextQuestion);
  nextRow.appendChild(nextBtn);
  qCard.appendChild(nextRow);

  wrap.appendChild(qCard);
  return wrap;
}

function selectAnswer(choiceIdx){
  const item = state.quizQueue[state.quizIndex];
  if(state.quizAnswers[state.quizIndex]) return; // already answered
  const isCorrect = choiceIdx === item.q.correct;
  state.quizAnswers[state.quizIndex] = { correct: isCorrect, chosenIdx: choiceIdx, item };

  const opts = document.querySelectorAll('.opt-btn');
  opts.forEach((btn, i)=>{
    btn.disabled = true;
    if(i === item.q.correct) btn.classList.add('correct');
    else if(i === choiceIdx) btn.classList.add('incorrect');
  });

  const explainBox = $('.explain-box');
  explainBox.querySelector('.explain-text').textContent = item.q.explain;
  explainBox.classList.add('show');
  $('.next-row').classList.add('show');
  $('.score-chip').textContent = '✓ ' + state.quizAnswers.filter(a=>a && a.correct).length;

  // haptic-ish scroll to explanation on mobile
  setTimeout(()=>{
    if(explainBox && typeof explainBox.scrollIntoView === 'function'){
      explainBox.scrollIntoView({behavior:'smooth', block:'nearest'});
    }
  }, 60);
}

function goToNextQuestion(){
  if(state.quizIndex < state.quizQueue.length - 1){
    state.quizIndex++;
    render();
  } else {
    finishQuiz();
  }
}

function finishQuiz(){
  const total = state.quizQueue.length;
  const correct = state.quizAnswers.filter(a=>a && a.correct).length;
  const pct = Math.round((correct/total)*100);

  if(state.quizMode === 'module'){
    const prev = state.progress[state.currentModuleId];
    state.progress[state.currentModuleId] = {
      bestPct: prev ? Math.max(prev.bestPct, pct) : pct,
      attempts: (prev ? prev.attempts : 0) + 1
    };
  }
  
  let label = state.quizMode === 'module'
    ? moduleById(state.currentModuleId).short
    : (state.quizMode === 'general' ? 'General Knowledge Practice Exam' : 
       (state.quizMode === 'classa' ? 'Florida Class A CLP Exam · Version ' + (state.examVersion || 1) : 'Full Mixed Review'));
  
  // Calculate section results for Class A exam
  let sectionResults = null;
  if(state.quizMode === 'classa') {
    sectionResults = {
      GK: { correct: 0, total: 0, passed: false },
      'Air Brakes': { correct: 0, total: 0, passed: false },
      Combo: { correct: 0, total: 0, passed: false }
    };
    
    state.quizQueue.forEach((item, idx) => {
      const answer = state.quizAnswers[idx];
      if(answer && answer.correct) {
        if(item.section && sectionResults[item.section]) {
          sectionResults[item.section].correct++;
        }
      }
      if(item.section && sectionResults[item.section]) {
        sectionResults[item.section].total++;
      }
    });
    
    // Calculate pass/fail for each section (80% required)
    Object.keys(sectionResults).forEach(section => {
      const s = sectionResults[section];
      s.pct = Math.round((s.correct / s.total) * 100);
      s.passed = s.pct >= 80;
    });
  }
  
  state.lastResult = {
    correct, total, pct, label,
    date: new Date().toLocaleDateString(undefined, {month:'short', day:'numeric'}),
    sectionResults
  };
  saveProgress();
  state.view = 'results';
  render();
}

/* ---------------- RENDER: RESULTS ---------------- */
function renderResultsView(){
  const wrap = el('div','view');
  const {correct, total, pct, sectionResults} = state.lastResult;
  const passed = pct >= 80;

  const resultWrap = el('div','result-wrap');
  
  let resultMsg = '';
  if(state.quizMode === 'classa' && sectionResults) {
    const allPassed = Object.values(sectionResults).every(s => s.passed);
    resultMsg = allPassed
      ? '🎉 You passed all three sections! Florida requires 80% on each section.'
      : 'Florida requires 80% on each section. Review the section breakdown below.';
  } else {
    resultMsg = passed
      ? 'Florida requires 80% to pass the knowledge test — you cleared that bar. Review any misses below, then try another module.'
      : 'Florida requires 80% (' + Math.ceil(total*0.8) + '/' + total + ') to pass. Review what you missed below, restudy that module, and try again.';
  }
  
  resultWrap.innerHTML = `
    <div class="result-badge">
      <div class="pct">${pct}%</div>
      <div class="of">${correct}/${total}</div>
    </div>
    <h2 class="result-title">${passed ? "🎉 You'd pass!" : "Keep studying"}</h2>
    <p class="result-msg">${resultMsg}</p>
    <div class="result-actions">
      <button class="mini-btn primary" id="btn-retry" style="padding:12px;">Retake this quiz</button>
      <button class="mini-btn" id="btn-home" style="padding:12px;">Back to all modules</button>
    </div>
  `;
  wrap.appendChild(resultWrap);

  // Show section breakdown for Class A exam
  if(state.quizMode === 'classa' && sectionResults) {
    const sectionBreakdown = el('div','section-breakdown');
    sectionBreakdown.appendChild(el('h4', null, 'Section Breakdown (80% required each)'));
    
    Object.entries(sectionResults).forEach(([section, s]) => {
      const row = el('div', 'section-row' + (s.passed ? ' passed' : ' failed'));
      row.innerHTML = `
        <div class="section-name">${section}</div>
        <div class="section-score">${s.correct}/${s.total} (${s.pct}%)</div>
        <div class="section-status">${s.passed ? '✓ PASS' : '✗ FAIL'}</div>
      `;
      sectionBreakdown.appendChild(row);
    });
    
    const note = el('p', 'section-note', 'Note: At the DMV, you can take all three exams on the same day or separately. Failing one section doesn\'t wipe your progress on the others.');
    sectionBreakdown.appendChild(note);
    wrap.appendChild(sectionBreakdown);
  }

  const misses = state.quizAnswers.map((a,i)=> ({a, i})).filter(x=>x.a && !x.a.correct);
  if(misses.length){
    const list = el('div','review-list');
    list.appendChild(el('h4', null, `Review: ${misses.length} missed`));
    misses.forEach(({a})=>{
      const item = el('div','review-item miss');
      const correctText = a.item.q.options[a.item.q.correct];
      const sectionTag = state.quizMode === 'classa' && a.item.section ? `<span class="section-tag">${a.item.section}</span>` : '';
      item.innerHTML = `<div class="rq">${sectionTag}${a.item.q.q}</div><div class="ra">Correct answer: <b>${correctText}</b></div>`;
      list.appendChild(item);
    });
    wrap.appendChild(list);
  }

  setTimeout(()=>{
    $('#btn-retry').addEventListener('click', ()=>{
      if(state.quizMode === 'module') startModuleQuiz(state.currentModuleId);
      else if(state.quizMode === 'classa') startClassAExam(state.examVersion || 1);
      else startExam(state.quizMode);
    });
    $('#btn-home').addEventListener('click', goHome);
  }, 0);

  return wrap;
}

/* ---------------- INIT ---------------- */
async function init() {
  loadProgress();
  const res = await fetch('content/cdl-modules.json');
  if (!res.ok) throw new Error('Failed to load modules: ' + res.status);
  MODULES = await res.json();
  render();
}
init();
