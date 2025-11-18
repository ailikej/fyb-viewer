// js/app.js
import { ITEMS } from "./items.js";
import { ITEMS_SINGLES } from "./items_singles.js";
import { loadPreviewImage, setIframe, getBase } from "./utils.js";

const list = document.getElementById("list");
const img = document.getElementById("preview");
const imgMsg = document.getElementById("imgStatus");
const status = document.getElementById("status");
const iframe = document.getElementById("player");
const openBtn = document.getElementById("openNew");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchEl = document.querySelector(".search");

const headingEl = document.getElementById("lessonHeading");
const modeToggleBtn = document.getElementById("modeToggle");

// App supports two modes: doubles & singles
const MODES = {
  doubles: {
    key: "doubles",
    heading: "FYB Doubles Lessons",
    items: ITEMS,
    storageKey: "fyb-active-id-doubles",
  },
  singles: {
    key: "singles",
    heading: "FYB Singles Lessons",
    items: ITEMS_SINGLES,
    storageKey: "fyb-active-id-singles",
  },
};

let currentMode = "doubles";
let activeId = null;
let visibleItems = [];

function getAllItemsForCurrentMode() {
  return MODES[currentMode].items;
}

function render(items) {
  list.innerHTML = "";
  items.forEach((it) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + it.id;
    a.textContent = it.title || it.id;
    a.className = "item";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      select(it.id, { scroll: true });
    });
    li.appendChild(a);
    list.appendChild(li);
  });
  updateNavButtons();
}

function markActive(scrollIntoView = false) {
  document
    .querySelectorAll("a.item")
    .forEach((a) => a.classList.remove("active"));
  const cur = document.querySelector(`a.item[href="#${activeId}"]`);
  if (cur) {
    cur.classList.add("active");
    if (scrollIntoView) cur.scrollIntoView({ block: "nearest" });
  }
}

function select(id, { scroll = false } = {}) {
  if (!id) return;
  activeId = id;
  markActive(scroll);

  // Use mode-aware helpers
  loadPreviewImage(img, imgMsg, id, currentMode);
  setIframe(iframe, id, currentMode);

  status.textContent =
    "Attempting to load FYB page… If it stays blank, click 'Open on FYB'.";

  openBtn.onclick = () =>
    window.open(`${getBase(currentMode)}${id}`, "_blank", "noopener");

  history.replaceState(null, "", "#" + id);

  // Save last active id per mode
  localStorage.setItem(MODES[currentMode].storageKey, id);

  updateNavButtons();
}

function getVisibleIndex() {
  return visibleItems.findIndex((it) => it.id === activeId);
}

function updateNavButtons() {
  const idx = getVisibleIndex();
  const len = visibleItems.length;
  prevBtn.disabled = idx <= 0;
  nextBtn.disabled = idx < 0 || idx >= len - 1;
}

function navigate(delta) {
  const idx = getVisibleIndex();
  if (idx < 0) return;
  const nextIdx = idx + delta;
  if (nextIdx < 0 || nextIdx >= visibleItems.length) return;
  select(visibleItems[nextIdx].id, { scroll: true });
}

function filterList(q) {
  q = (q || "").toLowerCase().trim();
  const allItems = getAllItemsForCurrentMode();

  visibleItems = !q
    ? allItems.slice()
    : allItems.filter(
        (it) =>
          (it.title && it.title.toLowerCase().includes(q)) ||
          it.id.toLowerCase().includes(q)
      );

  render(visibleItems);

  if (!visibleItems.some((it) => it.id === activeId)) {
    const first = visibleItems[0]?.id;
    if (first) select(first);
  } else {
    updateNavButtons();
  }
}

function switchMode(mode, { initialId } = {}) {
  if (!MODES[mode]) mode = "doubles";
  if (currentMode === mode && !initialId) return;

  currentMode = mode;
  localStorage.setItem("fyb-mode", mode);

  const cfg = MODES[mode];

  // Update heading and toggle label
  headingEl.textContent = cfg.heading;
  if (mode === "doubles") {
    modeToggleBtn.textContent = "Singles";
    modeToggleBtn.setAttribute("aria-label", "Switch to singles lessons");
  } else {
    modeToggleBtn.textContent = "Doubles";
    modeToggleBtn.setAttribute("aria-label", "Switch to doubles lessons");
  }

  // Reset list for this mode
  const allItems = cfg.items;
  visibleItems = allItems.slice();
  render(visibleItems);

  // Choose which ID to show first:
  // 1) hash (if it exists in this mode)
  // 2) saved last ID for this mode
  // 3) first item
  const saved = localStorage.getItem(cfg.storageKey);
  const hasInitialInMode =
    initialId && allItems.some((it) => it.id === initialId);

  const startId = (hasInitialInMode && initialId) || saved || allItems[0]?.id;

  if (startId) {
    select(startId);
  }
}

function boot() {
  // If absolutely no items at all
  if (!MODES.doubles.items.length && !MODES.singles.items.length) {
    status.textContent = "No items found.";
    return;
  }

  const hashId = location.hash ? location.hash.slice(1) : null;
  const storedMode = localStorage.getItem("fyb-mode");

  // Decide initial mode:
  // 1) If hash matches one of the lists, use that mode
  // 2) Else fall back to stored mode
  // 3) Else default to doubles
  let mode = storedMode === "singles" ? "singles" : "doubles";
  if (hashId) {
    if (MODES.doubles.items.some((it) => it.id === hashId)) {
      mode = "doubles";
    } else if (MODES.singles.items.some((it) => it.id === hashId)) {
      mode = "singles";
    }
  }

  switchMode(mode, { initialId: hashId });
}

modeToggleBtn.addEventListener("click", () => {
  const newMode = currentMode === "doubles" ? "singles" : "doubles";
  switchMode(newMode);
});

prevBtn.addEventListener("click", () => navigate(-1));
nextBtn.addEventListener("click", () => navigate(1));
searchEl.addEventListener("input", (e) => filterList(e.target.value));
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") navigate(-1);
  if (e.key === "ArrowRight") navigate(1);
});

window.addEventListener("DOMContentLoaded", boot);
