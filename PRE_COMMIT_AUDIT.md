# Pre-Commit Audit Report — Responsive Fixes

Run this audit (and the checks below) before committing responsive changes. Last run: generated from codebase scan.

---

## 1️⃣ Global Leaks Audit

**Rules NOT inside `@media (max-width: …)` that affect layout primitives:**

| File | Selector | Notes |
|------|----------|--------|
| `src/layouts/BaseLayout.astro` | `.container` | Base padding `0 2em` — **intentional**; overrides only in 1024/768/480 media. ✅ |
| `src/styles/global.css` | `.container` | Base padding `0 var(--spacing-6)`; overrides only in 1024/768/480 media. ✅ |
| `src/styles/global.css` | `.section`, `.section-sm`, `.section-lg`, `.section-xl` | `overflow-x: hidden` — **documented** as localized containment, not primary fix. ✅ |
| `src/styles/global.css` | `.grid`, `.grid-cols-*` | Base grid definitions; **no** `min-width`/`grid-template-columns` changed outside media. ✅ |

**Component-scoped (not global):**

- `Navbar.astro` — `.container` only applies inside Navbar (scoped style). Padding `0` then `.navbar-container` gets `0 2rem`; mobile overrides at 991/479. ✅
- `Breadcrumb.astro`, `FAQSection.astro` — `.container` scoped to component; used as inner wrapper. ✅
- `ModernHero.astro` — `.hero .container` sets `overflow: visible`, `max-width: 100%` (hero-specific). ✅
- `SimplePageHeader.astro` — `.section` scoped; `overflow: hidden` on that component’s section only. ✅

**Verdict:** No accidental global layout leaks. All responsive overrides are inside `@media (max-width: …)`.

---

## 2️⃣ Layout Integrity Scan

- **All layout overrides scoped to max-width breakpoints:** ✅ Yes. New/changed layout rules are in `@media (max-width: 1024px)`, `768px`, `480px`, or existing 1199/991/767/479.
- **No desktop breakpoint (min-width ≥ 1025px) altered:** ✅ Confirmed. No edits to `min-width: 1025px` or similar; `tokens.css` still has `--large-desktop (min-width: 1200px)` only.
- **No new fixed pixel widths introduced outside mobile:** ✅ New rules use `%`, `100%`, `max-width: 100%`, or vars; fixed px only inside media (e.g. padding 12px/16px/20px).
- **No global container padding changed outside mobile media:** ✅ Base `.container` padding is unchanged in both BaseLayout and global.css; only `padding-left`/`padding-right` overrides exist inside 1024/768/480 blocks.

**Violations:** None.

---

## 3️⃣ Duplicate / Conflicting `.container` Definitions

| File | Scope | Base padding | Mobile overrides |
|------|--------|--------------|-------------------|
| `src/layouts/BaseLayout.astro` | Global (`is:global`) | `0 2em` | 1024: 20px; 768: 16px; 480: 12px |
| `src/styles/global.css` | Global | `0 var(--spacing-6)` (24px) | Same 1024/768/480 values |
| `src/components/Navbar.astro` | Scoped to Navbar | `0`; `.navbar-container` `0 2rem` | 991: 1rem; 479: 1rem |
| `src/components/Breadcrumb.astro` | Scoped | `0 2em` | 767: (other props) |
| `src/components/FAQSection.astro` | Scoped | `0 2em` | — |

**Cascade:** BaseLayout is loaded after global.css (layout wraps page). So **base** padding is **2em** (BaseLayout). Mobile: both BaseLayout and global set the same 20/16/12px in media — **no conflict**.

**Recommendation:** Leave as-is. If you want a single source of truth later, keep BaseLayout as the canonical global `.container` and ensure global.css doesn’t override base padding without a media query.

---

## 4️⃣ Breakpoint Consistency Check

**All media queries by value (sorted):**

| Breakpoint | Files |
|------------|--------|
| **479px** | LogoCarousel, FrameworksSection, Footer, ModernHero, SentryVideoShowcase, FeatureStack, global.css, PartnershipsContent, ServiceToggle |
| **480px** | BaseLayout, global.css, CTASection, FrameworksSection, TeamSection, PressGrid, ToggleMediaSection, SentryVideoShowcase, LogoCarousel |
| **767px** | Breadcrumb, FAQSection, SimplePageHeader, AuditRequest, SentryVideoShowcase, LogoCarousel, PressGrid, ModernHero, CTASection, global.css, FeatureStack, ServiceToggle, TeamSection, AuditBreakdown, StatsSection, ToggleMediaSection, PartnershipsContent, SentryFeatures, ExpertizeSection |
| **768px** | BaseLayout, global.css, Footer, CTASection, TeamSection, PressGrid, ToggleMediaSection, SentryVideoShowcase, ModernHero |
| **991px** | BaseLayout (typography), FrameworksSection, Footer, AuditBreakdown, SentryFeatures, PartnershipsContent |
| **1024px** | BaseLayout, global.css, FrameworksSection, TeamSection |
| **1199px** | AuditRequest, SentryVideoShowcase, FeatureStack, global.css, ExpertizeSection |

**Inconsistencies:**

- **767 vs 768:** Many components use `767px`, our new responsive fixes use `768px`. Difference is 1px; both cover “tablet portrait” range. **Optional:** Normalize to `768px` for new code; existing 767 can stay for legacy consistency, or batch-replace 767 → 768 if you want one breakpoint.
- **479 vs 480:** Same 1px split. **Optional:** Prefer `480px` for new code (matches doc “480px”); 479 is still common in existing code.

**Verdict:** No functional conflict. Optional normalization: use **768px** and **480px** for all new responsive rules and document “preferred breakpoints” in MOBILE_ACCEPTANCE_AND_TESTING.md.

---

## 5️⃣ Flex / Grid Shrink Issues

**Where `min-width: 0` was explicitly added (responsive fixes):**

- `FrameworksSection.astro` — `.frameworks-grid`, `.framework-card` (inside 1024px).
- `TeamSection.astro` — `.team-grid`, `.team-card` (inside 1024px).
- `ModernHero.astro` — `.hero-grid`, `.hero-text`.
- `Navbar.astro` — `.navbar-content`.

**Potential risks (flex/grid parents whose children might not shrink):**

- **global.css** — `.hero-cta` (flex), `.cta-buttons` (flex), `.footer-wrapper` (flex), `.stats` (grid), `.feature-stack-item` (grid). At 767/479 we set `flex-direction: column` or `grid-template-columns: 1fr` so children stack; `min-width: 0` less critical there.
- **LogoCarousel** — `.logo-carousel-track` is flex with `width: fit-content`; items have `min-width` (reduced at 480px). Section has `overflow: hidden` so track is contained. ✅
- **ServiceToggle** — `.service-toggle` flex; at 767 we set `flex-direction: column` and `width: 100%`. ✅

**Verdict:** Critical flex/grid (hero, nav, frameworks, team) have `min-width: 0` or single-column at small widths. No further changes required for this audit; if overflow appears at 320px, add `min-width: 0` to the offending flex/grid child.

---

## 6️⃣ Lighthouse (Mobile) — Manual Step

Before commit:

1. Open DevTools → **Lighthouse**.
2. Device: **Mobile**; categories: **Performance** + **Best Practices**.
3. Run audit.
4. Check: layout shifts (CLS), “Tap targets too small,” “Content wider than screen.”

If Lighthouse flags tap targets or width, fix in mobile-only styles (e.g. padding or font-size in `@media (max-width: …)`).

---

## 7️⃣ Hard Reset Test — Manual Step

In DevTools:

1. Toggle device mode **off** then **on**.
2. Hard refresh: **Cmd+Shift+R** (Mac) / **Ctrl+Shift+R** (Win).
3. Clear cache if needed.

Re-test at 375px and 768px. Ensures no cascade/source-order surprises.

---

## 8️⃣ Scroll Stress Test — Manual Step

At mobile widths:

- Rapid scroll top → bottom.
- Try to scroll horizontally.
- Open nav (burger), then rotate orientation.

If you see jitter, shift, or brief overflow, check: `min-width` on a flex/grid child, carousel track width, or container padding.

---

## 9️⃣ Production vs Local (Desktop) — Manual Step

At **1440px** (or 1440×900):

- Screenshot production; screenshot local.
- Overlay or compare: section order, grid columns, spacing, typography.

Desktop must be visually identical. If not, a global or unscoped rule was likely changed.

---

## 🔟 Optional: Debug Outline (Remove Before Commit)

Temporarily in DevTools → Elements → `<head>` or a test stylesheet:

```css
* {
  outline: 1px solid rgba(255, 0, 0, 0.1);
}
```

Any element sticking out of the viewport is easy to spot. **Remove before commit.**

---

## 🔐 Final Pre-Commit Gate

Commit only if:

| Check | Status |
|-------|--------|
| No horizontal scroll at 320, 375, 430, 768, 1024px | Manual test |
| No global layout primitives changed (or only in media) | ✅ Audited |
| Desktop (1440px) visually identical to production | Manual test |
| No breakpoint inconsistencies (or documented) | ✅ 767/768 and 479/480 noted |
| No Lighthouse mobile layout/tap-target warnings | Manual Lighthouse run |

---

## Quick Cursor Prompts for Re-Audit

**Global leak check:**

```text
Search for any CSS rules in this repo that: (1) are not inside a @media (max-width: …) block, (2) modify .container, .section, .grid globally, (3) add overflow-x: hidden, (4) change min-width, grid-template-columns, or display without media scoping. List file and line.
```

**Layout integrity:**

```text
Confirm all responsive layout overrides are in max-width media queries; no desktop (min-width ≥ 1025px) changed; no new fixed px widths outside mobile; no global .container padding outside mobile media. List any violation with file + line.
```

**Duplicate .container:**

```text
List every file that defines or modifies .container and the padding/width/max-width used. Note any conflicts.
```

**Breakpoints:**

```text
List every @media (max-width: …) and @media (min-width: …) in this repo with breakpoint value. Highlight 767 vs 768 and 479 vs 480.
```

**Flex/grid shrink:**

```text
Find flex and grid containers whose children do not have min-width: 0. List selector and file. Flag risk on small viewports.
```
