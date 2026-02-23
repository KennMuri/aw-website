# Mobile Section Alignment – Diagnosis

## 1. Hero layout (source of truth)

**Structure:** `.hero` → `.container` → `.hero-content` → `.hero-grid` → content

**Classes used for centering and padding:**
- **Outer:** `.hero` — `width: 100%`, `max-width: 100%`, `box-sizing: border-box`, vertical padding only (`padding: var(--spacing-7) 0 var(--spacing-16)`).
- **Inner:** `.hero .container` — gets global `.container` styles plus **hero-specific overrides** in `ModernHero.astro`:
  - `max-width: 100%`
  - `overflow: visible` (no clipping)
- **Global `.container`** (from `global.css` + `BaseLayout.astro`): `width: 100%`, `max-width: var(--container-max)`, `margin: 0 auto`, `padding: 0 var(--spacing-6)` (desktop), and in media:
  - `@media (max-width: 1024px)`: `padding-left: 20px`, `padding-right: 20px`
  - `@media (max-width: 768px)`: `padding-left: 16px`, `padding-right: 16px`
  - `@media (max-width: 480px)`: `padding-left: 12px`, `padding-right: 12px`

So the hero uses the **same** `.container` as other sections, with extra rules only for overflow and `max-width: 100%`. On mobile, horizontal padding is symmetric (e.g. 16px at 768px, 12px at 480px).

---

## 2. Sections below the hero

| Section              | Wrapper(s)                          | Inner content wrapper      |
|----------------------|-------------------------------------|-----------------------------|
| LogoCarousel         | `.logo-carousel.section-sm` → `.container` | —                           |
| FrameworksSection    | `.frameworks-section.section-sm` → `.container` | `.frameworks-content` (max-width: 1000px, margin: 0 auto) |
| ServiceToggle        | `.service-section.section` → `.container`   | `.service-content-wrapper` (max-width: 900px, margin: 0 auto) |
| SentryVideoShowcase  | `.feature-stack-section.section` → **`.video-container`** (not `.container`) | — |
| CTASection           | `.cta-section.section` → `.container`       | `.cta-content` (max-width: 800px, margin: 0 auto) |
| Footer               | `.footer` → `.container`                    | `.footer-wrapper`           |

**Classes used:**
- **Sections with `.section` / `.section-sm`:** Same global `.container` for horizontal padding and centering. Sections also have `width: 100%`, `max-width: 100%`, **`overflow-x: hidden`**, vertical padding only.
- **SentryVideoShowcase:** Uses **`.video-container`** instead of `.container`: `max-width: 1600px`, `width: 100%`, `margin: 0 auto`, `padding: var(--spacing-2) 24px` (desktop), then `padding-left/right: 16px` (768px), `12px` (480px). So at 400px it matches .container (16px); between 768–1024px it uses 24px vs .container’s 20px.

---

## 3. Exact CSS differences that can cause the left shift on mobile (~400px)

1. **Hero-only override:** `.hero .container` gets `max-width: 100%` in `ModernHero.astro`. Sections’ `.container` does not; it keeps `max-width: var(--container-max)`. On a 400px viewport both resolve to 400px, so this alone shouldn’t shift — but the hero is explicitly “full width” of its parent; sections are not, which can matter with overflow/BFC.

2. **`overflow-x: hidden` on sections:** `.section` and `.section-sm` have `overflow-x: hidden`; `.hero` does not. That can change how width/scroll is calculated and, if any child is wider than the viewport (e.g. carousel track, grid), the section clips and the visible content can appear to sit against the left edge instead of being centered.

3. **Different inner wrapper:** SentryVideoShowcase uses `.video-container`, not `.container`. Padding is aligned at 768px/480px (16px/12px), but the **canonical** wrapper is different, so any future or browser-specific difference in padding/width could make this section misalign.

4. **Inner content wrappers with fixed max-width:** `.frameworks-content` (1000px), `.service-content-wrapper` (900px), `.cta-content` (800px) all have `margin: 0 auto` and are inside `.container`. On mobile they get `max-width: 100%` in component media. If any of these rules are missing or overridden in a breakpoint, or if the surrounding `.container` isn’t clearly full-width and centered, the content can look left-aligned.

5. **Cascade/specificity:** `.container` is defined in both `global.css` and `BaseLayout.astro` (layout style block after global). BaseLayout sets `padding: 0 2em` (desktop); media overrides are 20/16/12 px. So mobile padding should be symmetric; the main risk is inconsistent application if another rule targets sections’ `.container` differently.

**Summary:** The left shift is most likely from **sections using `overflow-x: hidden`** and/or **not explicitly forcing the same width/centering/padding as the hero’s container on mobile**, plus **one section using a different wrapper** (`.video-container`). Normalizing all section content wrappers to the hero’s pattern on mobile/tablet (same width, max-width, margin, symmetric padding, box-sizing) and aligning `.video-container` to that pattern will fix it.

---

## 4. Fix applied (summary)

- **Cause of left shift:** Section content wrappers did not explicitly match the hero’s container on mobile: global `.container` kept `max-width: var(--container-max)` in all viewports, and only the hero had `max-width: 100%` via `.hero .container`. Sections use `overflow-x: hidden`, which can make the visible content appear left-aligned when layout or overflow is ambiguous. SentryVideoShowcase uses `.video-container` instead of `.container`, so it could diverge in padding/width.

- **Classes standardized:** In `global.css`, `.container` inside `@media (max-width: 1024px)`, `768px`, and `480px` now gets: `width: 100%`, `max-width: 100%`, `margin-left: auto`, `margin-right: auto`, symmetric `padding-left`/`padding-right` (20px / 16px / 12px), and `box-sizing: border-box`. In `SentryVideoShowcase.astro`, `.video-container` in the same media queries gets the same set so it matches the hero’s container.

- **Why mobile/tablet-only and safe for desktop:** All of these rules live inside `max-width` media queries only. Desktop (≥1025px) still uses the base `.container` (and `.video-container`) rules: same `max-width`, spacing, and grid as before. The hero is unchanged; only sections below now align with it on narrow viewports.
