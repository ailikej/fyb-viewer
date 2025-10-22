# FYB Doubles Lessons Viewer

A web-based viewer for Fuzzy Yellow Balls (FYB) doubles tennis lesson videos. This application provides an organized interface to browse and watch FYB doubles lesson content with preview images and navigation controls.

## Features

- 📋 **84 Lesson Catalog** - Browse all FYB doubles lessons organized by category
- 🔍 **Search Functionality** - Filter lessons by title or ID
- 🖼️ **Preview Images** - Visual preview of each lesson (when available)
- ▶️ **Embedded Player** - Watch lessons directly in the interface
- ⌨️ **Keyboard Navigation** - Use arrow keys to navigate between lessons
- 💾 **Auto-save Progress** - Automatically remembers your last viewed lesson

## Lesson Categories

- **Anticipation** - Positioning strategies (Sword/Shield movements)
- **Net Moves** - Poaching, faking, covering
- **Formations** - 1-up-1-back, stagger, I-formation
- **Passing Shots** - Thread the needle, hulk smash, big dipper, etc.
- **Plays (Serve & Volley)** - The O.G., ankle breaker, full poach, etc.
- **Plays (Serve Delayed Approach)** - Main street, coast-to-coast, Czechmate, etc.
- **Plays (Serve Stay Back)** - I-formation, Aussie, nowhere to hide
- **Plays (Return)** - Chip & charge, lob defense, parachute return

## Setup & Running

⚠️ **Important:** This application uses ES6 modules and **CANNOT** be opened directly with `file://` protocol. You must run a local web server.

### Option 1: Python (Recommended)

```bash
# Navigate to project directory
cd fyb-viewer

# Start server (Python 3)
python3 -m http.server 8000

# Open in browser
# http://localhost:8000
```

### Option 2: Node.js

```bash
# Using npx (no installation needed)
npx http-server -p 8000

# Or install globally
npm install -g http-server
http-server -p 8000
```

### Option 3: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## Project Structure

```
fyb-viewer/
├── index.html          # Main HTML file
├── 404.html           # Error page
├── css/
│   └── styles.css     # All styles
├── js/
│   ├── app.js        # Main application logic
│   ├── items.js      # Lesson data (84 items)
│   └── utils.js      # Helper functions
└── asset/            # Images and icons
```

## How to Use

1. **Browse Lessons** - Scroll through the numbered list on the left
2. **Search** - Type in the search box to filter by title or ID
3. **Select a Lesson** - Click any lesson to view it
4. **Navigate** - Use the large Previous/Next buttons at the bottom or arrow keys
5. **Open Externally** - Click "Open on FYB" button to view on the FYB website

## Technical Details

- **No dependencies** - Pure vanilla JavaScript with ES6 modules
- **Responsive layout** - 3-column grid design
- **Keyboard shortcuts** - Left/Right arrows for navigation
- **Local storage** - Saves your last viewed lesson
- **Image fallback** - Tries multiple formats (PNG, WebP, JPG)

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari

Requires a browser with ES6 module support (all modern browsers).

## Known Limitations

- Some lessons may not have preview images available
- Embedded FYB player may be blocked by referrer policies (use "Open on FYB" button)
- Must be run from a web server (not file://)

## License

Content belongs to Fuzzy Yellow Balls (fuzzyyellowballs.com). This viewer is for educational and organizational purposes.
