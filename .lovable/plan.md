## Polish Pass — Premium 9.8/10 Refinement

This is a large scope. I'll execute it in **6 focused phases**, verifying build between each. No redesign — pure polish on top of the existing liquid-glass system.

---

### Phase 1 — Foundation (tokens, spacing, a11y base)
- Add strict brand palette in `src/styles.css`: `--brand-purple #A855F7`, `--brand-cyan #67E8F9`, plus neutral gray scale. Remove/alias stray accent hues.
- Add 8px spacing scale utilities and standard radius/shadow/blur tokens.
- Add 2% SVG noise texture layer (single fixed overlay, GPU-cheap).
- Enforce 0.5px hairline borders on `.glass-card` variants.
- Add skip link, focus-visible ring token, `prefers-reduced-motion` global guard.
- Split the 3k-line `src/routes/index.tsx` into `src/components/portfolio/*` (Hero, About, Skills, Projects, Journey, Contact, Resume, Footer, Nav). Move data to `src/lib/portfolio-data.ts`.

### Phase 2 — Hero + About + Skills
- Hero: tighter value prop headline, availability pill, 1 primary + 1 secondary CTA, 4 metric tiles (Projects 4 · Internships 2 · Technologies 15+ · Graduating 2026). Reduce floating decor by ~40%.
- About: replace generic badges with 3 measurable achievements + 2-sentence story + location (Andhra Pradesh, India · Remote-ready).
- Skills: regroup into **Frontend / Backend / AI / Design** columns. Each chip shows a small "used in →" tooltip listing projects.

### Phase 3 — Projects + Case Studies
- Standardize card frame (same aspect ratio, shadow, radius, padding).
- Add "Featured" badge on Tripzy.
- Each card: **Problem → Solution → Stack → Results** micro-structure.
- Whole card = single `<Link>` (a11y-correct, no nested interactives).
- Expand existing `src/routes/projects.$slug.tsx` with full case-study template pulling from data file.

### Phase 4 — Journey polish (preserve rope signature)
- Keep current rope + titanium loop architecture. Refine texture, add gentle 10s sway (respect reduced-motion).
- Guarantee: rope/loop static during expand; only detail card grows; one-open + click-to-close.
- Add real dates + measurable outcomes per milestone.

### Phase 5 — Contact + Resume + Footer
- Contact: desktop = normal Send button (wired via `mailto:` fallback + toast); mobile = keep swipe-to-send. Show email, phone, LinkedIn, GitHub, response time (<24h). Add copy-to-clipboard on email/phone with sonner toast.
- Resume: desktop keeps macOS Preview. Mobile becomes clean summary card with "Open PDF" + "Download" buttons. Remove ATS 96 badge. Add "Last updated: Jul 2026".
- Footer: 3 columns — **Navigate** / **Connect** / **Colophon** (built with TanStack Start, React 19, Tailwind v4, Framer Motion · v2.0 · deployed Jul 2026).

### Phase 6 — Micro-interactions + perf + a11y sweep
- Command palette (Cmd/Ctrl+K) using existing `cmdk` — jump to any section/project/resume.
- Magnetic hover util (respect reduced-motion).
- Lazy-load project screenshots (`loading="lazy" decoding="async"`), pause off-screen framer animations via `useInView`.
- Tree-shake lucide (already per-icon imports — audit for stragglers).
- Final a11y pass: aria-labels on icon buttons, keyboard nav on Journey pills, contrast check on gray text against beige.

---

### Notes
- **Not touching**: overall layout, typography families, beige base, rope metaphor, macOS Preview, mobile stacked deck.
- **Deliverable**: same portfolio, dramatically tighter execution.
- Estimated: ~15-20 file writes across phases. Build verified after each phase.

Proceed?