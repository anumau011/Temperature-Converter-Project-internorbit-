# Temperature Converter (modularized)

This project is a small temperature converter with the CSS and JavaScript extracted into modular files.

Files added/changed
- `TempretureConverter.html` - HTML file now references external CSS and JS.
- `styles/styles.css` - extracted styles.
- `scripts/converter.js` - extracted JavaScript modules (conversion, clipboard, UI, theme).

How to run
1. Open `TempretureConverter.html` in your browser (double-click or drag into a browser window).
2. Enter a temperature and choose the unit. Results update live. Click the clipboard icon to copy a value.

Notes
- The script uses the Clipboard API with a small fallback for older browsers.
- The JS is loaded with `defer`/DOMContentLoaded to ensure DOM elements are available.
