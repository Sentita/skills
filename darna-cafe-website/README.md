# Darna Cafe — Website

A static, dependency-free website for Darna Cafe, a Mediterranean coffeehouse at
2778 W Ball Rd, Anaheim, CA 92804.

## Structure

- `index.html` — the full one-page site
- `404.html` — designed not-found page
- `css/style.css` — full design system (tokens, type scale, components)
- `js/main.js` — interactivity (reveals, nav drawer, menu tabs, sticky narrative,
  FAQ accordion, form validation, active-section nav indicator)
- `favicon.svg` — site icon

## Running locally

No build step. Serve the folder with any static server, e.g.:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploying

This is plain HTML/CSS/JS and can be deployed as-is to GitHub Pages, Netlify,
Vercel, or any static host.

## Known placeholders to replace with real content

- **Hours** — not supplied; the "Visit" section links out to the live Apple
  Maps listing instead of guessing hours.
- **Menu items and prices** — provisional, written to match the concept;
  confirm against the actual printed menu before publishing live.
- **Testimonials** — no real reviews were supplied, so the "Neighbors" section
  ships three labeled placeholder slots rather than invented quotes.
- **Phone number** — not supplied; add one to the footer and contact section
  once available.
- **Contact form endpoint** — `js/main.js` has a placeholder submit handler;
  the real endpoint is commented at the `fetch(...)` line.
