// js/utils.js
export const BASE = "https://www.fuzzyyellowballs.com/dp/?vdo=";
export const IMG_BASE = "https://www.fuzzyyellowballs.com/dp/images/";

export function loadPreviewImage(imgEl, statusEl, id) {
  imgEl.style.display = "none";
  statusEl.textContent = "Loading preview…";
  const exts = ["png", "webp", "jpg"];
  let i = 0;

  const tryNext = () => {
    if (i >= exts.length) {
      statusEl.textContent = "Preview not available.";
      return;
    }
    const url = `${IMG_BASE}${id}.${exts[i++]}`;
    const test = new Image();
    test.onload = () => {
      imgEl.src = url;
      imgEl.style.display = "block";
      statusEl.textContent = "";
    };
    test.onerror = tryNext;
    test.src = url;
  };
  tryNext();
}

export function setIframe(iframeEl, id) {
  iframeEl.src = `${BASE}${id}`;
}
