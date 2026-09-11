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

## Confirmed content

- **Hours** — Sun–Thu 11:30am–1am, Fri–Sat 11:30am–2am (from the Apple Maps
  listing). Used in the "Visit" section, footer, and the page's structured
  data (`openingHoursSpecification`).
- **Phone** — (415) 466-5036 (from the Apple Maps listing). Linked as `tel:`
  in the "Visit" card and footer, and set as `telephone` in structured data.

## Known placeholders to replace with real content

- **Menu items and prices** — provisional, written to match the concept;
  confirm against the actual printed menu before publishing live.
- **Testimonials** — no real reviews were supplied, so the "Neighbors" section
  ships three labeled placeholder slots rather than invented quotes.
- **Contact form endpoint** — `js/main.js` has a placeholder submit handler;
  the real endpoint is commented at the `fetch(...)` line.
- The Apple Maps listing also shows a `facebook.com` website link with no
  path — if that's Darna's real Facebook page, send the full URL and it can
  be added to the footer and structured data.
