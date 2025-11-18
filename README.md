# **FYB Tennis Lessons Viewer**

A lightweight, fast, no-framework web viewer for **Fuzzy Yellow Balls (FYB)** tennis lessons — now supporting **Doubles** _and_ **Singles** lessons.

This tool gives you an efficient way to browse, search, preview, and watch FYB videos without navigating the full FYB website.

---

## ⭐️ Features

### 🎾 **Doubles & Singles Lessons Toggle**

- Instantly switch between:

  - **Doubles** lesson catalog (84 items)
  - **Singles** lesson catalog (from the _sp2019_ series)

- Seamlessly reuses the same 3-pane layout (Left list, Center image, Right video)

### 📋 **Full Lesson Catalogs**

- Lessons stored locally in:

  - `js/items.js`
  - `js/items_singles.js`

- Each lesson has:

  - Number
  - FYB Video ID
  - Human-friendly title

### 🔍 **Smart Search**

Filter lessons by:

- Title
- FYB ID

### 🖼️ **Preview Images**

Automatically loads preview images (`png → webp → jpg`) from FYB servers.

### ▶️ **Embedded Player**

Video loads directly inside the right pane.

### ⌨️ **Keyboard Navigation**

Use:

- ← (Left Arrow): Previous Lesson
- → (Right Arrow): Next Lesson

### 💾 **Auto-save Progress**

Remembers your last watched lesson _per mode_:

- `fyb-active-id-doubles`
- `fyb-active-id-singles`

---

## 🧩 Layout (3-Pane UI)

```
 -------------------------------
| Lessons (Left List)          |
|------------------------------|
| Preview Image (Middle Pane)  |
|------------------------------|
| Video Player (Right Pane)    |
 -------------------------------
```

### Includes:

- **Mode Toggle Button** (Singles / Doubles) in header
- **Bottom navigation bar** for Prev/Next

---

## 🛠️ Setup & Running

This app uses **ES6 modules**, so it cannot be opened using `file://`.

### Option 1: Python (Recommended)

```bash
cd fyb-viewer
python3 -m http.server 8000
```

Visit:

```
http://localhost:8000
```

### Option 2: Node (http-server)

```bash
npx http-server -p 8000
```

### Option 3: VS Code – Live Server

Right-click `index.html` → **Open with Live Server**

---

## 📁 Project Structure

```
fyb-viewer/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js               # Main app logic
│   ├── items.js             # Doubles lessons
│   ├── items_singles.js     # Singles lessons (generated)
│   └── utils.js             # URL helpers, image loader, iframe loader
├── assets/
│   └── favicon.svg
└── README.md
```

---

## 🔄 How the Mode Toggle Works

### Doubles Mode

Uses base:

```
https://www.fuzzyyellowballs.com/dp/?vdo={id}
```

### Singles Mode

Uses base:

```
https://www.fuzzyyellowballs.com/sp2019/?vdo={id}
```

Preview images come from the corresponding `.../images/` paths.

The toggle button:

- Switches lesson list (`ITEMS` ↔ `ITEMS_SINGLES`)
- Updates heading text
- Loads correct preview + video
- Remembers last selected lesson for each mode

---

## 🎯 How to Use

1. Launch the viewer (see "Setup & Running")
2. Use the **toggle button** to select Singles or Doubles
3. Browse or search lessons
4. Click a lesson to load:

   - Preview image (center)
   - Embedded video (right)

5. Use the bottom navigation or keyboard arrows to move through lessons
6. Use **Open on FYB** button if the embedded player fails (rare)

---

## 🧪 Data & Sources

### Doubles Lessons (`items.js`)

Manually curated 84-item list with video IDs from FYB's original doubles course.

### Singles Lessons (`items_singles.js`)

Programmatically scraped from:

```
https://www.fuzzyyellowballs.com/sp2019/?vdo=XXXXX
```

Titles extracted from page:

```
body > div > div > section.heading > h1
```

---

## ⚠️ Known Limitations

- If FYB changes their website HTML structure, titles might need re-scraping.
- Some preview images may not exist for certain Singles videos.
- Safari may block third-party iframe cookies; use “Open on FYB” when needed.
- Must run from a local web server (not file://).

---

## 📜 License

All video content belongs to **FuzzyYellowBalls.com**.
This viewer is for personal learning and organizational purposes only.

---

If you'd like, I can also:
✅ Add screenshots
✅ Add a GIF demo
✅ Generate a new `README` section for your toggle UX
Just tell me!
