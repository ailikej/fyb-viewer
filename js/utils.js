// js/utils.js

// Two “sources”: doubles & singles
const SOURCES = {
  doubles: {
    BASE: "https://www.fuzzyyellowballs.com/dp/?vdo=",
    IMG_BASE: "https://www.fuzzyyellowballs.com/dp/images/",
  },
  singles: {
    BASE: "https://www.fuzzyyellowballs.com/sp2019/?vdo=",
    IMG_BASE: "https://www.fuzzyyellowballs.com/sp2019/images/",
    // NOTE: if images don’t show, we can change IMG_BASE to the correct path
  },
};

export function getBase(mode = "doubles") {
  return (SOURCES[mode] || SOURCES.doubles).BASE;
}

export function getImgBase(mode = "doubles") {
  return (SOURCES[mode] || SOURCES.doubles).IMG_BASE;
}

// Backwards-compatible exports (default to doubles)
export const BASE = getBase("doubles");
export const IMG_BASE = getImgBase("doubles");

export function loadPreviewImage(imgEl, statusEl, id, mode = "doubles") {
  imgEl.style.display = "none";
  statusEl.textContent = "Loading preview…";
  const exts = ["png", "webp", "jpg"];
  let i = 0;

  const tryNext = () => {
    if (i >= exts.length) {
      statusEl.textContent = "Preview not available.";
      return;
    }
    const url = `${getImgBase(mode)}${id}.${exts[i++]}`;
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

export function setIframe(iframeEl, id, mode = "doubles") {
  iframeEl.src = `${getBase(mode)}${id}`;
}
