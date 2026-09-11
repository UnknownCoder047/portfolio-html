# Project Guidelines & Agent Instructions

## 1. Development & Live Preview URL
- **Local Server**: Served via Laravel Herd at **`http://portfolio.test/`**.
- **Do NOT spin up ad-hoc HTTP servers** (e.g., `python -m http.server` or `npx serve`) — the project is already continuously served live by Laravel Herd at `http://portfolio.test/`.
- Always use **`http://portfolio.test/`** for browser testing, responsive checks, and visual QA.

## 2. Tooling & MCP Policy
- **Never use external MCP tools for capabilities already built into Antigravity.**
- Use Antigravity's native tools (`view_file`, `replace_file_content`, `write_to_file`, `run_command`, `grep_search`, `find_by_name`, `list_dir`) for all file reading, editing, searching, and terminal execution.
- Use the built-in browser tools (Playwright / Chrome DevTools) for web navigation, screenshots, console checks, and visual regression testing.

## 3. Design & Architecture Standards
- **Pure SCSS**: Do not use Tailwind CSS. Maintain styles strictly in `scss/` following the modular architecture (`scss/abstracts/`, `scss/base/`, `scss/components/`, `scss/layout/`, `scss/sections/`).
- **Section Modularity**: Keep extracted modular HTML components inside the `/sections` directory (e.g., `sections/header.html`, `sections/hero.html`, `sections/selected-work.html`) and keep `index.html` synchronized.
- **Pixel-Perfect & Responsive**: All UI elements must strictly match the mockups in `designs/` and be verified across Desktop (1440px), Tablet (768px), and Mobile (375px).
- **SCSS Build**: Run `npm run build` after editing SCSS files to compile `css/style.css` and `css/style.min.css`.
