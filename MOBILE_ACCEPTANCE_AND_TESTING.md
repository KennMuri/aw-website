# Mobile Acceptance Criteria & Testing Guide

Use this doc **before** and **after** any responsive fix. It defines what “good mobile” means, how to test it, and how to avoid breaking desktop.

---

## 1. Acceptance Criteria: What “Good Mobile” Means

A page is considered **done for mobile** when it meets all of the following at:

- **320–375px** (small phones)
- **390–430px** (larger phones)
- **768px** (iPad portrait)
- **1024px** (iPad landscape / small laptop)

### Functional Criteria

| Check | Requirement |
|-------|-------------|
| **No horizontal scroll** | At the widths above, try to scroll sideways. If you can, it fails. |
| **Content visible** | No important content (text, CTAs, images) is cut off. |
| **Navigation works** | Burger menu opens/closes, dropdowns work, links navigate correctly. |
| **Tap targets** | Buttons and links are roughly **≥ 44×44px** and easy to tap. |
| **Forms usable** | Fields don’t extend off-screen; no weird zoom on focus (inputs use font-size ≥ 16px where needed). |

### Visual Criteria

| Check | Requirement |
|-------|-------------|
| **Hierarchy preserved** | Same logical order as desktop (Hero → value props → sections). No major reorder or removal of blocks. |
| **Readability** | Headings and body text are clearly legible; line length not overly cramped. |
| **Spacing** | Cards/sections have reasonable horizontal padding; layout doesn’t feel crushed. |
| **Images** | Images don’t overflow their containers and don’t get squashed beyond legibility (e.g. `max-width: 100%`, `height: auto`). |

**✅ If a page passes all criteria at the target widths, it’s “done” for mobile.**

---

## 2. Browser DevTools Device Emulation

Use DevTools to simulate devices and validate layout.

### Setup

1. Run the dev server / open preview (e.g. `http://localhost:4321`).
2. Open **DevTools**.
3. Toggle **Device Toolbar** (phone/tablet icon or **Cmd+Shift+M** / **Ctrl+Shift+M**).

### Devices to Test

- **iPhone SE** (375×667) – small phone
- **iPhone 13/15** (390×844) – common larger phone
- **Pixel 7/8** (~412×915) – Android
- **iPad** (768×1024) – tablet portrait
- **iPad Pro / 1024×1366** – tablet landscape / small laptop

### For Each Device

1. **Try to scroll horizontally.** If possible → record as overflow issue.
2. **Scroll from top to bottom** and check for:
   - Cards/sections wider than viewport
   - Images or blocks cut off on the right
   - Text flush against screen edges with no breathing room
3. **Rotate to landscape** and repeat.

---

## 3. Programmatic Overflow Check (DevTools Console)

Use this snippet to find elements wider than their own layout box (common overflow offenders):

```javascript
// Find elements whose content is wider than their box (likely horizontal overflow)
const offenders = Array.from(document.querySelectorAll('*')).filter(
  (el) => el.scrollWidth > el.clientWidth + 1
);
console.log('Offender count:', offenders.length);
offenders.forEach((el, i) => {
  console.log(
    i,
    el.tagName,
    el.className || '(no class)',
    'scrollWidth:', el.scrollWidth,
    'clientWidth:', el.clientWidth,
    el
  );
});
```

**How to use:**

1. Set the viewport width (e.g. **375px** or **768px**) in Device Toolbar.
2. Run the snippet in the **Console**.
3. For each offender:
   - Click it in the console → **Reveal in Elements**.
   - Inspect for common issues:
     - Fixed widths (`width: 400px` / `min-width: 400px`)
     - Large horizontal padding/margins
     - `white-space: nowrap`
     - Images with no `max-width: 100%`
4. Fix those causes in mobile/tablet media queries and re-run the snippet.

---

## 4. Guardrails: Don’t Break Desktop

### A. Desktop Regression Check

1. Use a **full-width viewport** (e.g. **1440×900**).
2. Open:
   - **Tab A:** Production/live site  
   - **Tab B:** Local preview / branch with responsive changes
3. Compare visually:
   - Same section order and structure
   - Same grid behavior (columns, gaps)
   - Spacing and typography consistent
4. If something changed unexpectedly:
   - Inspect the styles and confirm no global or desktop rules were modified unintentionally.

### B. Diff Review After Edits (Cursor or Manual)

When reviewing diffs:

**Do:**

- Ensure new rules are inside `@media (max-width: …)` (e.g. 1024px, 768px, 480px).
- Verify desktop breakpoints (`min-width: 1025px`, large grid configs) are untouched.
- Fix overflow by layout changes:
  - Single-column layouts on mobile
  - `min-width: 0` on flex/grid children
  - Reduced padding/gaps on small screens
  - `max-width: 100%` on containers/images

**Don’t:**

- Add global rules affecting all viewports (no media query) unless clearly safe.
- Change min-width values or desktop-only breakpoints.
- Add `overflow-x: hidden` on `html`, `body`, or broad selectors (`*`, `.section` globally) as a **primary** fix.

If you see a **global container change** or a **broad overflow-x: hidden**, treat it as suspicious and re-scope it to mobile/tablet or a specific component.

---

## 5. Per-Page / Per-Component Checklist

Use this loop each time you run a responsive fix on a page/component:

1. **Run** responsive prompt / make changes.
2. **Review diffs:**
   - [ ] Only mobile/tablet `@media (max-width: …)` rules were added/changed.
   - [ ] No desktop layout or spacing changes.
3. **Manual DevTools test:**
   - [ ] **375px** — no horizontal scroll, everything visible, sections in order.
   - [ ] **430px** — same.
   - [ ] **768px** — same.
   - [ ] **1024px** — same.
4. **Optional:** Run the overflow snippet at **375px** and **768px**; resolve any offenders.
5. **Desktop regression:** **1440px** side-by-side with production; layout and spacing match.

**If all boxes are checked, mark that page/component as mobile-complete.**

---

## 6. Testing Priority

Focus time where it matters most:

| Priority | Area | Reason |
|----------|------|--------|
| **1** | Homepage | Highest visibility; sets first impression. |
| **2** | Main Sentry page | Core product; most important for potential customers. |
| **3** | Navbar & footer | Present on every page; must not overflow or break. |
| **4** | Other product pages | Radar, multisig/audit pages, etc. |
| **5** | Secondary pages | About, blog, misc content pages. |

---

## 7. Viewport Widths to Always Test

| Width | Purpose |
|-------|---------|
| **320px** | Smallest phones / edge-case layouts. |
| **375px** | Common small phone baseline. |
| **390–430px** | Modern large phones. |
| **768px** | iPad portrait / base tablet. |
| **1024px** | iPad landscape / small laptop. |

Use these when validating that there is **no horizontal scroll** and that the layout still feels intentional and usable.

---

## 8. How the Codebase Aligns With This Doc

Responsive changes in this project follow the guardrails above:

- **Breakpoints used for mobile/tablet:** `max-width: 1024px`, `768px`, `480px` (plus existing 767px, 479px where present). These cover the required test widths: 320–430px (480px and below), 768px (iPad portrait), 1024px (iPad landscape).
- **No overflow-x on body/html:** Horizontal scroll is fixed via layout (reduced padding, single-column grids, `min-width: 0` on flex/grid children, `max-width: 100%` on containers/images). There is no `overflow-x: hidden` on `html` or `body`.
- **`.section` overflow-x:** Used only as **localized** containment (e.g. logo carousel track). It is not the primary fix; the comment in `global.css` states that overflow is addressed by layout first.
- **Desktop unchanged:** All new/edited rules are inside `@media (max-width: …)`; desktop breakpoints and grid/spacing at ≥1025px are untouched.
- When in doubt, re-run the **Per-Page Checklist** (§5) and the **overflow snippet** (§3) at 375px and 768px.

For a full **pre-commit audit** (global leaks, duplicate .container, breakpoint consistency, flex/grid shrink, Lighthouse, stress tests), see **PRE_COMMIT_AUDIT.md**.
