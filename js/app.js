// js/app.js
import { ITEMS } from "./items.js";
import { BASE, loadPreviewImage, setIframe } from "./utils.js";

const list = document.getElementById("list");
const img = document.getElementById("preview");
const imgMsg = document.getElementById("imgStatus");
const status = document.getElementById("status");
const iframe = document.getElementById("player");
const openBtn = document.getElementById("openNew");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchEl = document.querySelector(".search");

let activeId = null;
let visibleItems = ITEMS.slice();

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
  loadPreviewImage(img, imgMsg, id);
  setIframe(iframe, id);
  status.textContent =
    "Attempting to load FYB page… If it stays blank, click 'Open on FYB'.";
  openBtn.onclick = () => window.open(`${BASE}${id}`, "_blank", "noopener");
  history.replaceState(null, "", "#" + id);
  localStorage.setItem("fyb-active-id", id);
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
  visibleItems = !q
    ? ITEMS.slice()
    : ITEMS.filter(
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

function boot() {
  if (!ITEMS.length) {
    status.textContent = "No items found.";
    return;
  }
  visibleItems = ITEMS.slice();
  render(visibleItems);
  const saved = localStorage.getItem("fyb-active-id");
  const initial = location.hash
    ? location.hash.slice(1)
    : saved || visibleItems[0]?.id;
  if (initial) select(initial);
}

prevBtn.addEventListener("click", () => navigate(-1));
nextBtn.addEventListener("click", () => navigate(1));
searchEl.addEventListener("input", (e) => filterList(e.target.value));
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") navigate(-1);
  if (e.key === "ArrowRight") navigate(1);
});

window.addEventListener("DOMContentLoaded", boot);
