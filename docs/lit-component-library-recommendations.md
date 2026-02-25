# Lit Component Library Tooling Recommendations

Recommendations for modern Lit component library tooling for the eg-portal (header, footer, side menu, wrapper) and related components, aligned with accessibility, performance, minimal bundle size, tree-shaking, minification, responsive design, design tokens, and ≥90% code coverage.

---

## 1. Bundlers

### Vite

| Pros | Cons |
|------|------|
| Fast dev server and HMR; ideal for Lit + ESM | Production build uses Rollup by default (slower than esbuild/Rolldown) |
| First-class ESM and tree-shaking | Rollup plugin ecosystem required for advanced Lit optimizations (e.g. HTML literal minification) |
| Simple config, widely adopted | |
| Rolldown integration (experimental) for future single fast pipeline | |
| Works well with Bun as runtime (`bunx --bun vite`) | |

### Bun (built-in bundler)

| Pros | Cons |
|------|------|
| Very fast native bundler | Less mature than Vite for app/library workflows |
| Single runtime + bundler + test runner | Fewer Lit-specific plugins (e.g. minify-html-literals) |
| ESM and multiple output formats | Ecosystem and examples smaller than Vite |
| No separate Node install if standardizing on Bun | |

### Rolldown

| Pros | Cons |
|------|------|
| Rust-based, 10–30× faster than Rollup, esbuild-like speed | Experimental; available via `rolldown-vite` |
| Aims to replace both esbuild (prebundle) and Rollup (build) in Vite | Not yet default in Vite; migration in progress |
| Rollup-compatible plugin API | Some Rollup plugins may need adaptation |
| Better chunk splitting, HMR, CSS handling | |

**Recommendation (bundler):** **Vite** as the primary bundler. Use **Rolldown** when it becomes the default or when you are ready to adopt the experimental integration for faster builds. Use Bun as the **runtime** (e.g. `bun run`, `bun test`) and optionally with Vite; use Bun’s bundler only if you explicitly want a single-toolchain and accept a smaller plugin ecosystem for Lit.

---

## 2. Test Runners

### Vitest

| Pros | Cons |
|------|------|
| Vite-native, fast, ESM by default | Separate process from Bun if you use Bun elsewhere |
| Strong coverage (v8 or Istanbul); easy path to ≥90% | Browser mode (Playwright/WebdriverIO) adds setup for real-DOM/Lit |
| Component testing and Lit examples in ecosystem | |
| Works well with Lit (real DOM, events, focus) when using browser mode | |
| Simple coverage thresholds in config | |

### Bun (test runner)

| Pros | Cons |
|------|------|
| Very fast, no extra test framework install | DOM/testing APIs are simulated; not a real browser |
| Same runtime as dev/build if using Bun | Less ideal for Lit (focus, layout, real events) |
| Built-in coverage and mocking | Fewer Lit-specific patterns and examples |
| Good for unit tests of logic and simple components | |

**Recommendation (test runner):** **Vitest** for the component library. Use **browser mode** (or similar real-browser setup) for Lit so focus, keyboard, and layout behave correctly and you can meet accessibility and 90% coverage goals. Use Bun test only for pure logic/unit tests if you standardize on Bun elsewhere.

---

## 3. Code Minification

### Rolldown (production build)

| Pros | Cons |
|------|------|
| Fast production builds when used with Vite | Experimental; not all minification plugins proven yet |
| Single pipeline for JS (and CSS when integrated) | |
| Rollup-style optimizations (tree-shaking, chunks) | |

### OXC / Oxc (minifier)

| Pros | Cons |
|------|------|
| Part of Oxc (Rust) toolchain; very fast | Focus is on JS/TS; CSS typically handled separately (e.g. Lightning CSS) |
| Aligns with Oxlint/Oxfmt in same ecosystem | Less documented for Lit-specific minification (e.g. HTML literals) |
| Active development | |

### esbuild

| Pros | Cons |
|------|------|
| Very fast JS minification, default in Vite for dev | No built-in HTML template literal minification for Lit |
| Good for production when combined with Lightning CSS for CSS | Lit’s `css` literals need a dedicated plugin (e.g. rollup-plugin-minify-html-literals) in a Rollup/Rolldown pipeline |
| Mature and widely used | |

### Terser

| Pros | Cons |
|------|------|
| Mature, maximum JS size reduction | Slower than esbuild/Rolldown |
| Works with Rollup/Vite and Lit’s HTML literal minification plugins | Can be bottleneck in large builds |
| Well understood and configurable | |

### Lightning CSS

| Pros | Cons |
|------|------|
| Fast CSS parsing and minification (shorthand merging, rule merging, color/calc reduction) | JS minification not in scope; use with a JS minifier |
| Vendor prefix handling and modern CSS | |
| Integrates with Vite and other bundlers | |

**Recommendation (minification):** Use **Vite’s production build** (Rollup today, Rolldown when stable) with **JS minification** (esbuild or Terser, depending on speed vs. size preference) and **Lightning CSS** for CSS. Add **rollup-plugin-minify-html-literals** (or equivalent for Rolldown) so Lit’s `css` and HTML template literals are minified. Prefer **esbuild** for speed; switch to **Terser** only if bundle size gains justify the slower build.

---

## 4. Code Formatters

### Oxfmt

| Pros | Cons |
|------|------|
| Very fast (e.g. ~30× vs Prettier without cache) | Newer; default options differ (e.g. printWidth 100) |
| Prettier-compatible (JS/TS); migration path from Prettier | |
| Built-in Tailwind/import/package.json sorting | |
| Multi-format (JS, TS, JSON, HTML, CSS, Markdown, etc.) | |
| Same ecosystem as Oxlint | |

### Prettier

| Pros | Cons |
|------|------|
| De facto standard; many integrations and docs | Slower on large repos |
| Predictable output; minimal config | Extra plugins for Tailwind/import sorting |
| Works everywhere (editors, CI, Lit projects) | |

**Recommendation (formatter):** **Oxfmt** for speed and alignment with **Oxlint** in the same toolchain, especially if the repo already uses Oxfmt (as in this repo). Use Prettier if you need maximum ecosystem compatibility or existing Prettier-only configs.

---

## 5. Code Linters

### Oxlint

| Pros | Cons |
|------|------|
| 50–100× faster than ESLint in many setups | Fewer Lit-specific rules than ESLint + plugins |
| 655+ built-in rules; no plugin resolution | Accessibility rules for Lit best covered by eslint-plugin-lit-a11y |
| Multi-file and type-aware analysis | |
| Zero config by default; used at scale (e.g. Shopify, Vue) | |

### ESLint

| Pros | Cons |
|------|------|
| **eslint-plugin-lit-a11y** for Lit accessibility (ARIA, keyboard, semantics) | Slower; more config and plugin management |
| Huge plugin ecosystem and familiarity | |
| Can enforce WCAG-oriented rules in templates | |

**Recommendation (linter):** Use **Oxlint** for general linting (correctness, style, imports). Add **ESLint** with **eslint-plugin-lit-a11y** (and minimal other rules) for accessibility on Lit templates so you meet “meet accessibility standards.” Run Oxlint first (fast), then ESLint for a11y in CI.

---

## 6. Lit CSS Template Literal vs. Native CSS

### Lit `css` template literal

| Pros | Cons |
|------|------|
| Adopted stylesheets when available; one parse, shared across instances | Requires Lit runtime |
| Caching of `CSSResult` for identical styles | `unsafeCSS()` can bypass cache and duplicate work |
| Scoped to shadow root; no global leakage | |
| Design tokens via `var(--token)` in the same literal | |
| Colocated styles with component; good DX | |

### Native CSS (e.g. separate .css + adoptedStyleSheets)

| Pros | Cons |
|------|------|
| No framework dependency for styles | Manual adoption and composition in each component |
| Can reuse same stylesheet across components | More boilerplate and easy to miss adoption in new components |
| Works with Lightning CSS and design tokens in CSS files | Less direct colocation with Lit class |

**Recommendation (styling):** Use **Lit’s `css` template literal** for component styles. Use **CSS custom properties (design tokens)** inside it (e.g. `var(--eg-button-bg, ...)`) and keep a small, optional global or layer for token definitions. Use native adopted stylesheets only for shared theme/layout CSS that is not component-specific. This keeps bundle size and parsing optimal while meeting design-token and responsiveness requirements.

---

## 7. Other Tooling and Optimizations

### Accessibility

- **eslint-plugin-lit-a11y**: Use for Lit templates (alt text, ARIA, keyboard events, semantics). Complement with **Lighthouse** and **Axe DevTools** for runtime checks.
- **Lit controllers**: Use reactive controllers (e.g. for modals, focus traps) to encapsulate a11y behavior and keep components WCAG 2.2 Level AA–oriented.

### Design tokens

- Prefer **CSS custom properties** on `:host` or a shared layer (e.g. `--eg-*`) and reference them in Lit `styles` with `var(--eg-token, fallback)`.
- Optional: TypeScript/JS token objects for design tooling or server-driven themes; publish tokens as a small module and map to CSS variables where needed.

### Tree-shaking and bundle size

- Publish **ESM** with `"type": "module"` and `main`/`module` pointing to ESM.
- Use **named exports** and avoid barrel re-exports that pull in unused code.
- Build **eg-portal** (and header/footer/side menu) as a single entry (or few entries) so the consumer can load one script and one CSS file as in the prompt’s `index.html` example.

### Responsive design

- Use **container queries** and **media queries** inside Lit `css` with the same design tokens.
- Keep breakpoints in CSS (or in a small token module) so the side menu “pinned vs. collapsed” and header/footer layout stay responsive without extra JS.

### Production build checklist

- Minify JS (esbuild or Terser).
- Minify Lit HTML/CSS literals (e.g. rollup-plugin-minify-html-literals).
- Minify and optimize CSS (Lightning CSS).
- Enable tree-shaking and avoid side-effectful barrels.
- Output a single (or minimal) `eg-portal.js` and `eg-portal.css` for the consumer snippet.

---

## 8. Final Recommendation Summary

| Area | Recommendation | Rationale |
|------|----------------|-----------|
| **Bundler** | **Vite** (Rolldown when stable) | ESM, tree-shaking, plugin support for Lit; path to Rolldown for speed. |
| **Runtime** | **Bun** (optional) | Fast installs and scripts; use with Vite if desired. |
| **Test runner** | **Vitest** (browser mode for Lit) | Coverage to ≥90%, real DOM for a11y and Lit behavior. |
| **Minification** | **Vite build** + **esbuild** (or Terser) + **Lightning CSS** + **minify-html-literals** | Small production bundles; minified JS, CSS, and Lit literals. |
| **Formatter** | **Oxfmt** | Speed and consistency with Oxlint; Prettier-compatible. |
| **Linter** | **Oxlint** + **ESLint + eslint-plugin-lit-a11y** | Correctness and speed plus Lit-specific accessibility. |
| **Styles** | **Lit `css` template literal** + **CSS custom properties** | Performance (adopted stylesheets, caching), design tokens, responsive. |

This stack supports:

- **Accessibility**: eslint-plugin-lit-a11y + Lit controllers + runtime checks.
- **Performance**: Vite/Rolldown, esbuild, Lightning CSS, adopted stylesheets.
- **Minimal bundle size**: Tree-shaking, ESM, minification of JS, CSS, and Lit literals.
- **Tree-shakable exports**: ESM and named exports from the library.
- **Minified production**: JS, CSS, and HTML/CSS literals all minified.
- **Responsive design**: Media/container queries and tokens in Lit `css`.
- **Design tokens**: CSS variables (and optional TS/JS token objects).
- **≥90% code coverage**: Vitest with coverage thresholds and browser mode for Lit components.

The proposed **eg-portal** integration (single `eg-portal.js` + `eg-portal.css` in `index.html`) is satisfied by building the library with Vite into one (or a few) entry points and shipping the assets under `/libs/eg-portal/latest/`.
