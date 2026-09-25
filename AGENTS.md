# AGENTS.md

Personal portfolio SPA (Ignacio Ibaigorria). React 18 + CRA (`react-scripts` 5, **JavaScript only, no TypeScript**), Tailwind 3, framer-motion. All user-facing copy is **Spanish (rioplatense voseo** — "Enviame", "Contactame", "podés")**; keep new copy in that voice. Content is hardcoded in components — there is no CMS or data layer.

## Commands

- `npm start` — dev server on :3000
- `npm run build` — production build to `build/` (currently compiles successfully)
- `CI=true npx react-scripts test --watchAll=false` — single non-watch test run
- No lint command, no formatter, no typecheck. ESLint (`react-app` config inside `package.json`) only runs as part of `npm start` / `npm run build`. No CI workflows and no git hooks — nothing gates a push.
- Ignore the recurring `babel-preset-react-app` / stale `browserslist` warnings during build; they are pre-existing noise.

## Tests are broken (read before adding any)

`npm test` cannot run at all: `src/App.test.js` → `src/App.js` imports `react-router-dom` v7, which is ESM-only and CRA's Jest 27 resolver rejects → `Cannot find module 'react-router-dom' from 'src/App.js'`. Every suite that touches `App` fails this way. The assertion (`getByText(/learn react/i)`) is also stale CRA boilerplate that would fail regardless.

Fixing this requires making ESM deps resolvable in Jest (moduleNameMapper / transformIgnorePatterns) or dropping the router from tests — not deleting the suite. If you touch this area, keep the failure visible rather than papering over it.

## Contact form env vars

CRA only inlines `REACT_APP_*`. `.env` and `src/pages/Contact.js` both use `REACT_APP_EMAILJS_SERVICE` / `_TEMPLATE` / `_PUBLIC_KEY`; anything else compiles to `undefined` and the send fails silently behind an error toast. `.env` **is committed** (only `.env.local` variants are gitignored) — the EmailJS public key is designed to be client-visible, so that's acceptable, but never put a private key there.

`<Toaster />` from `react-hot-toast` is mounted in `src/App.js`. Without it every `toast.success/error` call in `Contact.js` renders nothing — keep the mount when touching either file.

## Layout traps

- `public/index.html` is the template CRA actually serves. The root `index.html`, `styles.css`, and `scripts.js` are a dead first-pass static prototype — editing them changes nothing in the running app.
- Entry chain: `src/index.js` → `src/App.js` (BrowserRouter, sets the `--vh` resize var used for mobile viewport height). Routes `/`, `/projects`, `/contact` map to `src/pages/*`; shell lives in `src/components/` (`Header`, `AnimatedBackground`, `ParallaxLayer`).
- Content is inline in the page components: the `projects` array in `src/pages/Projects.js`, and `skills` / `experience` / `method` / `stats` in `src/pages/Home.js`. Array order is display order; the entry with `featured: true` is marked "destacado" and gets the accent marker (only on the "Todos" filter).
- Projects render as an index list with a sticky hover-preview pane (`filtered[0]` when nothing is hovered — look the hover target up inside `filtered`, not the full array, or the preview shows a project the filter just hid). On touch widths the pane is hidden and each row carries its own thumbnail.
- Project images are referenced by string path from `public/images/projects/<slug>/`. Add the files and the array entry together — a missing path renders as a broken card, and a missing image just skips the gallery.
- Tech badges resolve through `getTechInfo()` in `src/utils/techData.js` (keyed by **lowercase** tech name → `{icon, color}`). Unknown names silently fall back to gray with no icon, so add the key there when introducing a new technology.
- Dead leftovers that do not affect the UI: `src/App.css`, `src/portfolio-dark.css` (its import is commented out at `src/App.js:1`), `src/components/ParallaxLayer.jsx` (reduced-motion handling now lives in `Reveal.js` / `index.css`), `src/logo.svg`, and deps `react-tsparticles`, `react-intersection-observer`, `email-js`. Don't assume they run.
- `.agents/skills/frontend-design` is a repo-local skill; use it for UI work.

## Design system

Dark only. The whole palette is in `tailwind.config.js` and it is small on purpose: `ink` (page), `raised` / `inset` (surfaces), `line` / `line-soft` (hairlines), `frost` (primary text), `muted` (secondary), `signal` (the single accent — interactive and emphasis), `live` (a 6px status dot, nothing else). All flat, so `bg-inset` and never `bg-ink-inset`. The stock `zinc-*` and `slate-*` scales are **not** redefined, so any `zinc-`/`slate-` class in `src/` is a leftover to remove, not a valid token.

Tailwind drops an unknown utility silently — no error, no warning, it simply renders nothing. When you use a token or variant you aren't sure about, confirm it reached `build/static/css/main.*.css` before you go looking for a markup bug.

- Structure comes from 1px `border-line` rules and space. Rounded cards are the failure mode here — don't reintroduce them.
- The 12-column composition is a **desktop-only** layout: grids are `grid-cols-1 ... lg:grid-cols-12`, and the split always happens at `lg`, never `md`. Two rules follow, and breaking either one reintroduces horizontal overflow: the `col-span-*` on a child must use the **same** breakpoint as the grid's `lg:grid-cols-12` (a `md:col-span-6` on a one-column grid creates implicit columns and blows the layout out), and no bare `grid-cols-12` may sit on a mobile-width container — 11 gaps alone can exceed the viewport.
- Type: `font-display` (Bricolage Grotesque, variable) for headings and big statements only, `font-sans` (IBM Plex Sans) for everything else, `font-mono` **only** for real data and short functional tags (counters, periods, tech names, tags). Mono is not for decoration and there are no ALL-CAPS eyebrow labels above headings.
- Weight and tracking live in the `fontSize` steps in `tailwind.config.js`, not in JSX — so don't add `font-semibold` to a heading that already has a `text-*` step. Note `fontWeight` in those option objects works, but `fontVariationSettings` is silently dropped; the display face's width axis is set in `index.css` on `h1`/`h2`/`h3` instead.
- One accent, spent once per page: the hero statement, the Projects preview pane, the form focus underline.
- Motion lives in `src/components/Reveal.js`: `Wipe` (clip wipe, headings), `Blur` (blur+opacity, content), `RuleReveal` (the single load-in rule). All three collapse to plain elements under `prefers-reduced-motion`, and `index.css` also kills CSS animation globally. Ambient motion is only the background glow. Never put a fade-and-slide-up on every block.
- `AnimatedBackground` owns the page background (grid, glow, grain). The pages used to each carry their own copy of it — don't re-add per-page background blocks.
- Fonts are loaded via `<link>` in `public/index.html` only; there is no `@import` in `index.css`.
- `Contact` owns its validation: the form is `noValidate` on purpose, because the browser's own bubble is unstyled, in the browser's language, and fires before `submit` so our Spanish field-level messages would never run. The email pattern is `EMAIL_PATTERN` in `Contact.js` — pragmatic RFC-ish, TLD required, empty dot-segments impossible. Keep `noValidate`, and keep validation in front of the `emailjs.sendForm` call.
- Overlays (mobile drawer, project gallery) must keep their Escape handler, body scroll lock, and `useFocusTrap` from `src/utils/useFocusTrap.js`.

## Deploy

`npm run build` emits a static `build/` at the site root (no `homepage` field). Because routing is `BrowserRouter`, the host must rewrite unknown paths to `index.html`; `.vercel/` is gitignored and no `vercel.json` rewrite config is committed, so check the hosting project's settings if deep links 404.
