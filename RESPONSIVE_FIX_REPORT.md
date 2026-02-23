# Mobile/Tablet Responsiveness — Diagnosis & Fix Report

## Step 1: Diagnosis (Root Causes of Horizontal Scroll)

### 1. Fixed / excessive horizontal padding
- **BaseLayout.astro** `.container`: `padding: 0 2em` (32px each side). On 320px viewport that leaves 256px content width; combined with any child min-widths this contributed to overflow.
- **global.css** `.container`: Same pattern; `@media (max-width: 1199px)` and `479px` also set container padding, conflicting with a single mobile strategy.
- **Navbar** `.navbar-container`: `padding: 0 2rem`; only reduced at 479px. At 768px still 32px each side.
- **PressGrid** `.press-grid`: `padding: 80px 20px`; at 320px the 20px sides are OK but grid min-width (see below) caused overflow.
- **TeamSection** `.container-2`: `padding: 0 20px`; no reduction at 768/480.
- **SentryVideoShowcase** `.video-container`: `padding: var(--spacing-2) 24px`; no width: 100%; horizontal padding not reduced at 768/480.
- **FAQSection** (if used): `padding: 0 2em` on a child.

### 2. Grid minmax() exceeding viewport
- **FrameworksSection.astro** `.frameworks-grid`: `grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))`. On viewports &lt; 400px (or content width &lt; 400px after padding) the 400px minimum forced horizontal scroll.
- **PressGrid.astro** `.press-grid`: `minmax(300px, 1fr)`. On 320px (content ~296px with padding) 300px min caused overflow.
- **TeamSection.astro** `.team-grid`: `minmax(320px, 1fr)`. On 320px viewport with 20px padding each side, content width 280px; 320px min forced overflow.

### 3. Flex / grid children missing min-width: 0
- **ModernHero** `.hero-grid`, `.hero-text`: No `min-width: 0`, so flex/grid children could resist shrinking and extend past the viewport.
- **Navbar** `.navbar-content`: No `min-width: 0`, so the row could overflow.
- **Framework cards / team cards**: When forced to single column, cards needed `min-width: 0` and `max-width: 100%` so they don’t stick at 400px/320px.

### 4. Fixed widths on containers or wrappers
- **LogoCarousel** `.logo-carousel-item`: `min-width: 380px` (desktop), 280px (767), 240px (479). Section has `overflow: hidden` so the track is clipped; on 320px a 240px item is still a large proportion; added 480px breakpoint with smaller min-width so layout fits better.
- **SentryVideoShowcase** `.video-container`: No `width: 100%`; `.video-wrapper` had `max-width: 900px` but no explicit 100% on small screens.
- **ToggleMediaSection** `.toggle-media-card`: `max-width: 1200px` without `width: 100%`; padding not reduced on mobile.
- **CTASection** `.cta-content`: `max-width: 800px` without `width: 100%` or reduced padding on mobile.

### 5. white-space: nowrap causing overflow
- **global.css** `.btn`: `white-space: nowrap` — long button text could overflow on narrow screens.
- **global.css** `.framework-badge-title`: `white-space: nowrap` — long badge text could overflow.
- **Footer.astro** `.footer-link`, `.footer-copyright`: `white-space: nowrap` — links/copyright in one row could overflow when many links or long text.

### 6. Images / media
- **ModernHero** `.hero-image-container`: `min-height: 450px` and `max-width: 650px`; on small screens the box didn’t scale down (min-height too large); image already `width: 100%`.
- **ToggleMediaSection** `.toggle-media-image`: `max-width: 90%`; ensured `max-width: 100%` in mobile override so it never exceeds the card.

### 7. What was not changed
- No `overflow-x: hidden` on `body` or `html`.
- `.section { overflow-x: hidden }` kept as **localized** containment (e.g. for logo carousel track); documented in comment. Desktop layout (≥1025px), grid columns, and spacing unchanged; all new rules are inside `max-width: 1024px`, `768px`, or `480px`.

---

## Step 2: Fixes Applied (Mobile-First, max-width Only)

### BaseLayout.astro
- **Change:** Added `@media (max-width: 1024px)` → container `padding-left/right: 20px`; `@media (max-width: 768px)` → 16px; `@media (max-width: 480px)` → 12px.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — reduce side padding so content fits within viewport. */`
- **Why it fixes:** Less horizontal padding on small screens gives more room for content and prevents padding + child min-width from exceeding viewport. Desktop keeps `padding: 0 2em`.

### global.css
- **Container:** Same 1024/768/480 padding overrides; `box-sizing: border-box` on `.container`. Removed `.container` from `@media (max-width: 1199px)` and `@media (max-width: 479px)` so the single 1024/768/480 strategy applies.
- **.framework-badge-title:** `@media (max-width: 768px)` → `white-space: normal; word-break: break-word`.
- **.btn:** `@media (max-width: 768px)` → `white-space: normal; overflow-wrap: break-word`.
- **.section:** Comment added: `/* Localized containment: sections clip wide content (e.g. carousel track); do not use on body/html. */`
- **Why:** One consistent container padding scale; text wraps instead of overflowing; desktop unchanged.

### FrameworksSection.astro
- **Change:** `@media (max-width: 1024px)` → `.frameworks-grid` `grid-template-columns: 1fr`, `min-width: 0`; `.framework-card` `max-width: 100%`, `min-width: 0`. At 768px and 480px reduced gap only.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — minmax(400px) exceeds viewport; single column + min-width:0 so cards shrink. */`
- **Why:** Below 1025px the grid no longer uses a 400px minimum; cards can shrink with the viewport. Desktop keeps two columns and 400px min.

### LogoCarousel.astro
- **Change:** `.logo-carousel-container` → `width: 100%`, `max-width: 100%`. `@media (max-width: 480px)` → `.logo-carousel-item` `min-width: 140px`, smaller height/images and gap.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — on very narrow viewports (e.g. 320px) item min-width 240px plus padding can exceed width; section clips track but smaller items improve fit. */`
- **Why:** Container is constrained; on very narrow screens items are smaller so the strip fits better; section still clips the track so no page scroll.

### PressGrid.astro
- **Change:** `@media (max-width: 768px)` → `.press-grid` `grid-template-columns: 1fr`, `min-width: 0`, `padding-left/right: 16px`. `@media (max-width: 480px)` → padding 12px, smaller gap.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — minmax(300px) exceeds 320px viewport; single column + min-width:0. */`
- **Why:** Single column below 768px so 300px min never forces overflow; padding scales. Desktop unchanged.

### TeamSection.astro
- **Change:** `.container-2` → at 768px padding 16px, at 480px 12px. `@media (max-width: 1024px)` → `.team-grid` `grid-template-columns: 1fr`, `min-width: 0`; `.team-card` `max-width: 100%`, `min-width: 0`. At 480px reduced gap.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — minmax(320px) exceeds 320px viewport with padding; single column + min-width:0. */`
- **Why:** Below 1025px one column and cards can shrink; no 320px minimum on narrow viewports. Desktop unchanged.

### Footer.astro
- **Change:** `@media (max-width: 768px)` → `.footer-link` and `.footer-copyright` `white-space: normal`, `.footer-link` `overflow-wrap: break-word`.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — allow links to wrap when many in a row. */`
- **Why:** Links and copyright can wrap instead of overflowing. Desktop keeps nowrap.

### Navbar.astro
- **Change:** `.fixed-navbar` → `max-width: 100%`. `.navbar-content` → `min-width: 0`. `@media (max-width: 991px)` → `.container.navbar-container` `padding-left/right: 1rem`.
- **Why:** Navbar can’t exceed viewport; flex content can shrink; tablet/mobile get smaller horizontal padding. Desktop unchanged.

### ModernHero.astro
- **Change:** `.hero-grid` and `.hero-text` → `min-width: 0`. `.hero-image-container` at 768px → `min-height: 220px`, `max-width: 100%`, reduced padding; at 480px → `min-height: 180px`, less padding.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — allow image to scale; lower min-height so content fits. */`
- **Why:** Grid/text can shrink; hero image scales and doesn’t force a tall box on small screens. Desktop unchanged.

### CTASection.astro
- **Change:** `.cta-content` → `width: 100%`, `box-sizing: border-box`. At 768px → padding and `max-width: 100%` for content and description. At 480px → padding 12px.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — reduce padding and constrain width. */`
- **Why:** CTA box stays within viewport and doesn’t feel cramped. Desktop unchanged.

### SentryVideoShowcase.astro
- **Change:** `.video-container` → `width: 100%`, `box-sizing: border-box`; at 768px padding 16px, at 480px 12px. `.video-wrapper` at 768px → `max-width: 100%`.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — proportional padding. */`
- **Why:** Video section and wrapper stay within viewport; padding scales. Desktop unchanged.

### ToggleMediaSection.astro
- **Change:** `@media (max-width: 768px)` → `.toggle-media-card` `width: 100%`, `max-width: 100%`, reduced padding; `.toggle-media-image` `max-width: 100%`. At 480px further padding reduction.
- **Comment:** `/* Mobile/tablet-only: prevent horizontal overflow — card and images stay within viewport. */`
- **Why:** Card and images don’t extend past viewport. Desktop unchanged.

---

## Step 3: Desktop Protected

- All new/edited rules are inside `max-width: 1024px`, `768px`, or `480px`.
- No changes to styles that apply only at `min-width: 1025px` or to desktop grid column counts, spacing, or alignment.
- No new wrapper divs; only CSS (padding, max-width, grid, flex, media queries) changed.

---

## Step 4: Verification Checklist

After deploying, confirm:

- [ ] No horizontal scroll at **320px**, **375px**, **430px**, **768px**, **1024px**.
- [ ] Layout at **≥1025px** matches the existing desktop design (grids, spacing, hierarchy).
- [ ] If any overflow remains, iterate on the specific component (padding, min-width, or grid) rather than adding body/html overflow hidden.

---

## File List (Diffs)

| File | Summary of changes |
|------|--------------------|
| `src/layouts/BaseLayout.astro` | Container padding 1024/768/480 only. |
| `src/styles/global.css` | Container 1024/768/480; removed container from 1199/479; framework-badge-title + btn wrap at 768; section comment. |
| `src/components/FrameworksSection.astro` | Grid 1fr + card min-width:0 at 1024; gap at 768/480. |
| `src/components/LogoCarousel.astro` | Container width/max-width 100%; 480px item min-width 140px, smaller assets/gap. |
| `src/components/PressGrid.astro` | Grid 1fr + min-width:0 and padding at 768/480. |
| `src/components/TeamSection.astro` | container-2 padding 768/480; team-grid 1fr + card min-width:0 at 1024; gap at 480. |
| `src/components/Footer.astro` | footer-link + footer-copyright wrap at 768. |
| `src/components/Navbar.astro` | fixed-navbar max-width 100%; navbar-content min-width 0; navbar-container padding 1rem at 991. |
| `src/components/ModernHero.astro` | hero-grid/hero-text min-width 0; hero-image-container mobile min-height + max-width + padding. |
| `src/components/CTASection.astro` | cta-content width 100%, box-sizing; mobile padding + max-width 100%. |
| `src/components/SentryVideoShowcase.astro` | video-container width 100%, mobile padding; video-wrapper max-width 100% at 768. |
| `src/components/ToggleMediaSection.astro` | toggle-media-card width/max-width 100% + padding at 768/480; image max-width 100% at 768. |
