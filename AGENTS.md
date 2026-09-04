# AGENTS.md

## Project Overview
- Static vanilla HTML, CSS, and JavaScript dashboard project.
- **No build tools or package managers:** No Node.js, `package.json`, bundlers, or transpilers. All code runs directly in modern browsers.

## How to Run & Verify
- **Local preview:** Open `index.html` directly in any web browser, or serve via a static HTTP server:
  - `npx serve .` or `python -m http.server 8000`
- **Verification:** Inspect browser console for errors and test widget interactions directly in DOM.

## Architecture & Conventions
- **Grid Layout (`index.html`):** `<main class="panel">` contains 8 predefined grid slots (`#widget-1` to `#widget-8`).
- **Widget Pattern:**
  - Each widget lives in its own root JavaScript file (`<feature>-widget.js` or `<feature>-widget-v<N>.js`).
  - Exposes a global mount function: `mount<Feature>Widget(containerId)`.
  - Validates container existence before manipulating DOM (`if (!container) return;`).
  - Injects widget markup with a `<span class="tag">Title</span>` header and binds event listeners scoped to the container.
- **Registering Widgets (`index.html`):**
  1. Load widget script: `<script src="<feature>-widget.js"></script>`
  2. Call mount function targeting a specific slot: `<script>mount<Feature>Widget('widget-N');</script>`
- **Design System (`styles.css`):**
  - Use `:root` CSS variables for consistency: `--ink`, `--ink-soft`, `--accent`, `--card-bg`, `--card-border`, `--radius`, `--gap`, `--shadow`.
  - Fonts: `Outfit` for titles, tags, and action buttons; `Inter` for general text and inputs.

## Git Conventions
- Feature branches branch from and merge into `develop` before `main`.
