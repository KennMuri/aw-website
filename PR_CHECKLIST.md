# Pre-PR Checklist — Responsive Fixes

Tick each item before opening your PR.

---

## Code audit (done)

- [x] **No global leaks** — No layout changes outside `@media (max-width: …)`. `.container` / `.section` base unchanged; only padding/width overrides in 1024/768/480 (and existing 767/479).
- [x] **No overflow on body/html** — No `overflow-x: hidden` on `html` or `body`. Only `.section` (documented as localized containment).
- [x] **Duplicate .container** — BaseLayout + global.css both set same mobile padding (20/16/12px); no conflict. Navbar/Breadcrumb/FAQ are scoped.
- [x] **Desktop breakpoints untouched** — No `min-width: 1025px` or similar changed. `tokens.css` unchanged.
- [x] **Lint** — No linter errors on touched files.

---

## Manual checks (you do these)

- [ ] **No horizontal scroll** at **320px**, **375px**, **430px**, **768px**, **1024px** (DevTools device mode).
- [ ] **Overflow snippet** run at 375px and 768px — no offenders (or only known contained ones, e.g. carousel track).
- [ ] **Desktop (1440px)** — Side-by-side with production; layout and spacing match.
- [ ] **Lighthouse (Mobile)** — No “Content wider than screen” or “Tap targets too small” (or only acceptable).
- [ ] **Hard refresh** after device toggle — Re-test 375px and 768px.
- [ ] **Nav + footer** — Burger works; footer links wrap; no overflow.

---

## Docs

- [x] **MOBILE_ACCEPTANCE_AND_TESTING.md** — Defines “good mobile,” test widths, guardrails, checklist.
- [x] **PRE_COMMIT_AUDIT.md** — Full audit (global leaks, .container, breakpoints, flex/grid, manual steps).
- [x] **RESPONSIVE_FIX_REPORT.md** — What was changed and why (if present).
- [ ] **debug-overflow-outline.css** — Not committed, or removed before PR (optional; only for local debugging).

---

## Final gate

**Open PR only if:**

1. All “Code audit” boxes above are checked.
2. All “Manual checks” you can run are checked.
3. No horizontal scroll at 320–1024px.
4. Desktop looks identical to production.

If anything fails, fix or document in the PR description (e.g. “Known: X page still overflows at 320px due to Y; follow-up ticket Z”).
