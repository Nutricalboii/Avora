# Avora — Methodology Page Blueprint

**New route: `/methodology`** (linked from "Services" instead of anchoring to `/#services`, or as a "Read the full methodology" link alongside it — see §6). This is the deep, numbers-free version of the six-discipline pipeline from the AI Delivery Playbook. Case-study proof points (the 87→50,000, $8.3M, 680% ROI figures) stay out of this page entirely, by your instruction — they belong in a sales conversation or the capability deck, not a self-serve page. What replaces them here is the actual *thinking* — frameworks, methodology choices, tradeoffs — which is what makes a page read as expert rather than promotional.

Reusing exactly what's already in the repo: `--accent: #B8860B`, `--accent-soft: #D4AF37`, `--accent-tint: rgba(184, 134, 11, 0.08)`, `--background: #f8fafc`, `--border: #e2e8f0`. No new colors. Framer Motion and GSAP are already installed — no new dependencies needed for animation or diagrams (all diagrams are custom SVG, not a charting library, since there's no data to chart).

---

## 1. Page structure — sticky section nav, six disciplines

One scrollable page, not six separate routes — six is too many page-loads for a reader mid-thought, and a single page with a sticky in-page nav lets someone jump straight to "AI Solutions" without reading Generation first. Reuse the tab-console visual language already established in `Services.tsx` (left rail navigation, right content panel) rather than inventing a new layout pattern.

```
┌─────────────────────────────────────────────────────┐
│  AVORA VENTURES                    [nav]  [Partner]  │
├──────────────┬──────────────────────────────────────┤
│ 01 Generation │                                      │
│ 02 Annotation │        Active section content         │
│ 03 Labeling   │        (scrolls independently,        │
│ 04 Quality    │         left rail stays sticky)        │
│ 05 AI Solns   │                                      │
│ 06 Outsourcing│                                      │
└──────────────┴──────────────────────────────────────┘
```

Left rail: `position: sticky; top: 5rem`, updates active state via `IntersectionObserver` on scroll (reuse the existing `useInView` hook pattern already in the codebase — don't write a second one).

---

## 2. Section-by-section content (numbers stripped, framework kept)

### 01 — Data Generation
**One-line definition:** Engineering synthetic data for scarcity, privacy, and scale — from rule-based generators to diffusion models.

**Why it matters (6 cards, no metrics):** overcome data scarcity · preserve privacy · accelerate development · enable what-if analysis · mitigate bias · test edge cases. One sentence each, exactly as the PDF frames them.

**Diagram 1 — Five methodologies, one spectrum.** A horizontal spectrum diagram (SVG) with five positioned nodes: Rule-Based & Heuristic → Statistical Modeling → Machine-Learning Based → Agent-Based Simulation → Hybrid & Specialized. Each node, on hover/tap, reveals strength / limit / best-for in a small callout — this is real methodology content, not a metric.

**Diagram 2 — The fidelity/privacy tension.** Recreate the PDF's own curve concept as a clean line-chart-style SVG (fidelity on Y, privacy risk on X, curve bending upward, a "sweet spot" zone marked) — this is explicitly a conceptual tradeoff diagram, not a data chart, so it stays even though "no numbers": there's no metric being reported, just a relationship being illustrated. Label the sweet spot "DP-constrained generation, validated on downstream task performance."

**Close with:** the five-myth/reality pairs, reformatted as a two-column "myth → reality" list. These contain no numbers and are some of the most credibility-building content in the whole PDF — keep all five.

### 02 — Data Annotation
**One-line definition:** The foundational act of giving raw data meaning — ontology, guidelines, and human judgment.

**Diagram 3 — The annotation lifecycle.** A five-step horizontal process diagram: Requirement & Ontology → Guidelines & Training → Execution with Tooling → QA & Refinement → Delivery & Integration. Reuse the exact numbered-badge component style from `Process.tsx` if one still exists in the codebase, or build one consistent with it — don't introduce a second "numbered step" visual language.

**Tooling by modality:** four short cards (Computer Vision / NLP / Audio / Video) naming the actual tool categories (CVAT, Labelbox, Prodigy, etc.) — this is real technical grounding, not filler.

**Why humans stay irreplaceable:** the four reasons (contextual understanding, ambiguity resolution, bias detection, handling novelty) — keep as a compact list, this is genuinely differentiating content most competitor sites skip.

**Four pitfalls of underestimating annotation:** keep all four ("garbage in, gospel out," scalability misjudgment, weak tooling, treating annotators as clerks) — no numbers in the PDF's framing of these except the throwaway "1,000 images vs millions" comparison, which can stay since it's illustrative scale language, not a metric.

### 03 — Data Labeling
**One-line definition:** Operationalising annotation at scale — the full lifecycle from planning to certified datasets.

**Three dimensions of labeling:** Label Types (classification, detection, segmentation, etc.) × Modality (images, text, audio, 3D, multimodal) × Paradigm (expert / crowd / hybrid). Present as a compact three-column reference, not a chart.

**Diagram 4 — The labeling lifecycle.** Same five-step visual language as Diagram 3 (Strategic Planning → Process & Tooling → Execution with QA → Validation & Certification → Delivery & Integration), reused component, different labels.

**The labeling-performance link:** rewrite the five points to drop the embedded percentages ("a 10% reduction can lift F1 by 15-25%" → "small reductions in label noise can produce outsized gains in downstream model performance — often more than architecture changes alone") — keep the *insight*, lose the specific numbers.

### 04 — Data Quality Assurance
**One-line definition:** Making data fit for purpose across eight dimensions — accuracy, completeness, timeliness, and more.

**Diagram 5 — Eight dimensions, one wheel.** A radial/wheel SVG with all eight quality dimensions (Accuracy, Completeness, Consistency, Timeliness, Validity, Uniqueness, Relevance, Accessibility) as equal segments, each with a one-line definition on hover. This is the single best diagram opportunity in the whole page — DAMA-DMBOK2's actual framework, visualized cleanly, no numbers required at all.

**The DQA lifecycle:** same five-step diagram language (Strategy & Governance → Profiling & Assessment → Root Cause & Prevention → Remediation & Correction → Monitor & Improve).

**Why DQA is strategic:** the four reasons (Risk / Operations / Strategy / Finance) as a clean 2×2 grid — no numbers needed, the PDF's own framing here is already numbers-free.

### 05 — AI Solutions
**One-line definition:** Where quality data becomes engineered systems — from problem framing to production monitoring.

**Diagram 6 — Beyond algorithms: the seven-layer anatomy.** This is the PDF's strongest conceptual diagram — a stacked/layered SVG showing all seven components (Data Strategy & Problem Framing at the base, up through Model, System Integration, Deployment, UX & Change Management, to Operations & Monitoring at the top). The point of this diagram is literally "the model is one layer of seven" — visualize it as layers, not a list, so the proportion lands.

**Ten core principles:** condense to the six or seven most distinctive (Start with the problem / Invest in data quality / Choose the right tool, resist deep-learning-by-default / Design for human-AI collaboration / Plan the full lifecycle / Consider ethics early) rather than all ten — this is the one section where the PDF itself is list-heavy, and trimming it is the "not overloading" instruction in practice.

**Optional, only if space allows:** a condensed "what's next" trends strip (3-4 items, not all eight) — cut this first if the page is running long.

### 06 — Specialized Outsourcing
**One-line definition:** The expertise layer that can accelerate any stage above — when and how to buy capability, not headcount.

**Not the same as basic outsourcing:** the five category cards (IT Services, KPO, Creative & Technical, Operational, Data-Centric) — keep, this is a genuinely useful distinction most visitors won't have seen articulated this clearly.

**Diagram 7 — How it works.** Reuse the same five/six-step process diagram language one final time (Identify the Need → Define the Scope → Select the Partner → Transition Knowledge → Manage the Relationship) for visual consistency across all six sections — a reader who's scrolled this far should recognize the pattern instantly.

**Seven reasons companies choose it / five conditions for success:** compress into a single two-column list (reasons left, conditions right) rather than two separate stacked lists — this is where "not overloading" matters most, since this section has the most raw bullet count in the source PDF.

---

## 3. Diagram implementation notes

All seven diagrams are static custom SVG (or SVG + a light Framer Motion reveal-on-scroll, reusing the existing GSAP/Framer patterns already in `Services.tsx` and `Process.tsx` — don't add a new animation library). None of them plot data, so none of them need Recharts/D3/Chart.js — adding a charting library for zero actual data points would be the wrong tool for the job.

Five of the seven diagrams (03, 04, 05 process steps, 07) are the *same* five-step visual component with different labels — build it once as a shared `<ProcessSteps />` component and reuse it four times, not four separate implementations. Diagrams 01 (methodology spectrum), 02 (fidelity/privacy curve), and 05's seven-layer stack are each genuinely unique and need their own build.

---

## 4. What NOT to include (explicit, since this is the actual ask)

- No case-study metrics anywhere — no 87→50,000, no $8.3M, no 680% ROI, no AUC scores. If a sentence exists only to introduce a number, cut the sentence.
- No "eight habits of effective generation programs" style exhaustive checklists repeated for every section — pick the strongest 4-6 items per list, not all 8-10.
- No stock photography, no decorative icons without informational content behind them.
- No repeating the same insight in both prose and a bullet list — say it once, in whichever form fits better.

---

## 5. Tone

This page's job is to read like documentation a serious technical buyer would trust, not a marketing page. Prose sentences should sound like the PDF's own voice ("Without accurately annotated data, even the most sophisticated neural network is a student without a textbook") — confident, specific, occasionally a real analogy — not softened into generic marketing copy in the rewrite. Where a section originally opened with a strong line, keep that exact line.

---

## 6. Navigation wiring

In `src/config/site.ts`, keep `{ label: "Services", href: "/#services" }` as-is (fast path for someone who just wants the four-service overview), but add: `{ label: "Methodology", href: "/methodology" }` as its own nav item — don't bury it as a sub-link under Services, it deserves equal billing since it's a real, substantial page. Also add a "Read the full methodology →" link at the bottom of the homepage `Services.tsx` panel, pointing to `/methodology#{active-tab-slug}` so a visitor reading about "AI Implementation" on the homepage can jump straight to that section's deep-dive, not the top of the page.

---

## 7. Master prompt for Antigravity

```
Read src/components/Services.tsx, src/components/Process.tsx, src/config/site.ts,
src/app/globals.css, and src/hooks/useInView.ts (or wherever the scroll-reveal
hook currently lives) before building anything.

Create a new route at src/app/methodology/page.tsx. Build a single scrollable
page with six sections (Data Generation, Data Annotation, Data Labeling, Data
Quality Assurance, AI Solutions, Specialized Outsourcing), navigated by a
sticky left-rail nav that highlights the active section via IntersectionObserver
(reuse the existing useInView hook — do not write a second scroll-tracking hook).

Content for each section is specified in AVORA_METHODOLOGY_PAGE_BLUEPRINT.md
section 2 — pull the actual prose from the source PDF where directed, and
strip every case-study metric (percentages, dollar figures, before/after
numbers) per section 4's explicit exclusion list. Do not shorten the
conceptual/framework content — only the numeric proof points are cut.

Build ONE shared <ProcessSteps /> component for the five-step process diagrams
(used in Data Annotation, Data Labeling, Data Quality Assurance, and
Specialized Outsourcing sections) rather than four separate implementations.
Build three additional unique diagrams: the five-methodology spectrum
(Data Generation), the fidelity/privacy tradeoff curve (Data Generation),
and the seven-layer AI Solutions anatomy stack. All diagrams are custom SVG —
do not add a charting library, there is no data being plotted, only concepts
being illustrated.

Use only the existing design tokens from globals.css (--accent: #B8860B,
--accent-soft: #D4AF37, --accent-tint, --background, --border) — no new
colors. Reuse Framer Motion / GSAP patterns already present in Services.tsx
and Process.tsx for any reveal animation — no new animation library.

Update src/config/site.ts: add { label: "Methodology", href: "/methodology" }
as its own top-level nav item alongside Services. Add a "Read the full
methodology →" link at the bottom of the homepage Services.tsx panel pointing
to /methodology#{matching-section-slug}.

Keep prose voice close to the source PDF's own phrasing — confident and
specific — do not soften it into generic marketing copy. Trim exhaustive
lists (the ten-principle and eight-habit style sections) down to the
strongest 4-7 items rather than reproducing every item, per blueprint
section 4.

Run npm run build after. Commit once with a message describing the new page.
```
