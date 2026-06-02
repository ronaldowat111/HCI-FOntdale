# Fontdale — Static Multi-page Site

Fontdale is a premium lifestyle mall at **Arcadia Circle**, founded by **Franz Diego** (2023, opened 2025).
Its architecture has two wings — the **North Gallery** and the **South Pavilion** — joined by the glass **Lumen Skywalk**.

## Structure

    fontdale/
    ├── index.html        # Home — tagline, location, hours, CTA to Directory
    ├── directory.html    # Directory — tenants by zone (interactive)
    ├── events.html       # Events — current + upcoming
    ├── newsletter.html   # Newsletter — subscription form (JS-validated)
    ├── about.html        # About Us — story, founder, what makes us unique
    ├── css/
    │   ├── style.css     # Shared base: tokens (:root), nav, buttons, footer, responsive
    │   └── <page>.css    # Per-page styles (index, directory, events, newsletter, about)
    └── js/
        ├── main.js       # Mobile menu toggle (all pages)
        ├── directory.js  # Tenant data + zone logic (edit the `zones` array)
        └── newsletter.js # Form validation (5 checks, no regex)

## Running

Open `index.html` in a browser. Keep all files in the same folder.
Recommended: VS Code **Live Server** so paths and images load smoothly.

## Editing notes

- **Theme (colors/fonts):** edit the `:root` tokens at the top of `css/style.css`.
- **Directory tenants:** edit the `zones` array in `js/directory.js`.
- **Images:** all are `picsum.photos` placeholders, each preceded by an HTML comment marking the real Figma asset to drop in.

## Project rules (kept in the code)

- **External CSS only** — no inline or internal styles (animation delays use `.d1`–`.d6` utility classes).
- **Responsive** — `<meta name="viewport">` on every page + a `@media screen and (max-width:540px)` rule.
- **Layout** uses CSS box positioning (flex/grid/position), never tables.
- **Newsletter** has 5 JavaScript validations (name, email, phone, topic, frequency) implemented **without regex**.
- **One language** — all site content is in English.
