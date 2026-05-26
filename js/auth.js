const pinScreen = document.getElementById("pin-screen");
const appScreen = document.getElementById("app-screen");
const pinDots = document.getElementById("pin-dots");
const pinError = document.getElementById("pin-error");
const pinPad = document.getElementById("pin-pad");

let entered = "";

function showPin() {
  pinScreen.hidden = false;
  appScreen.hidden = true;
  entered = "";
  updateDots();
  pinError.hidden = true;
  pinScreen.classList.remove("shake");
}

function showApp() {
  pinScreen.hidden = true;
  appScreen.hidden = false;
  window.dispatchEvent(new CustomEvent("app-unlocked"));
}

async function hashPin(pin) {
  const { salt } = window.APP_CONFIG;
  const data = new TextEncoder().encode(`${salt}:${pin}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function updateDots() {
  const spans = pinDots.querySelectorAll("span");
  spans.forEach((s, i) => {
    s.classList.toggle("filled", i < entered.length);
  });
}

async function tryUnlock() {
  if (entered.length !== 6) return;
  const hash = await hashPin(entered);
  if (hash === window.APP_CONFIG.pinHash) {
    showApp();
    return;
  }
  entered = "";
  updateDots();
  pinError.hidden = false;
  pinScreen.classList.add("shake");
  setTimeout(() => pinScreen.classList.remove("shake"), 400);
}

function addDigit(d) {
  if (entered.length >= 6) return;
  entered += d;
  updateDots();
  pinError.hidden = true;
  if (entered.length === 6) tryUnlock();
}

function removeDigit() {
  entered = entered.slice(0, -1);
  updateDots();
  pinError.hidden = true;
}

function buildPad() {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];
  keys.forEach((k) => {
    const btn = document.createElement("button");
    btn.type = "button";
    if (k === "") {
      btn.className = "pin-key pin-key-empty";
      btn.disabled = true;
      btn.tabIndex = -1;
    } else if (k === "del") {
      btn.className = "pin-key pin-key-del";
      btn.textContent = "⌫";
      btn.setAttribute("aria-label", "Delete");
      btn.addEventListener("click", removeDigit);
    } else {
      btn.className = "pin-key";
      btn.textContent = k;
      btn.addEventListener("click", () => addDigit(k));
    }
    pinPad.appendChild(btn);
  });
}

function init() {
  if (!window.APP_CONFIG?.pinHash) {
    pinScreen.hidden = false;
    pinPad.innerHTML = "";
    const msg = document.createElement("p");
    msg.className = "pin-error";
    msg.textContent =
      "PIN config not loaded. If this is the live site, wait for the deploy workflow to finish, then hard-refresh.";
    pinScreen.appendChild(msg);
    return;
  }
  buildPad();
  showPin();
}

init();
