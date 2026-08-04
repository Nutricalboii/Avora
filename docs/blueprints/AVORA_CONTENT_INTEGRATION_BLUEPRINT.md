# Avora Ventures — Content Integration Blueprint
**PDF → Live Site, exact placement.** Built against the real repo (`avoraventure.com` / `github.com/Nutricalboii/Avora`) as of now — not a generic template. Every class name below (`glass-panel`, `section-eyebrow`, `#D4AF37`, `py-24`, `max-w-6xl`) already exists in your `globals.css` and `Services.tsx`. This reuses your system; it doesn't invent a new one.

**One honest flag before anything else:** the six case studies in the PDF (biotech binding-mechanism discovery, $184M insurer savings, $8.3M pharma savings, etc.) read as illustrative industry examples demonstrating methodology, not dated, named Avora client engagements. That's a legitimate content pattern for a services firm — but present them as "how this plays out in practice" / "representative engagement," not "our client," unless Avora actually delivered these exact numbers. I've kept the framing from your PDF as-is below; just confirm with whoever owns the claim before a cold client sees it.

---

## 1. What exists now vs. what the PDF adds

Your site currently has **4 service tabs** (`src/config/services.ts` + `src/components/Services.tsx`): Outsourcing, Skill Hiring, AI Solutions, Data Annotations. The PDF has **6 disciplines**: Generation, Annotation, Labeling, Quality Assurance, AI Solutions, Outsourcing.

Mapping:
| PDF Stage | Where it goes |
|---|---|
| 02 Annotation, 03 Labeling, 04 Quality Assurance | Deepen the existing **Data Annotations** tab (currently thin — one paragraph, four bullet fragments) |
| 05 AI Solutions | Deepen the existing **AI Solutions** tab |
| 06 Specialized Outsourcing | Deepen the existing **Outsourcing** tab |
| 01 Data Generation | New content — closest fit is a sub-point inside **Data Annotations**, since your current 4-tab structure has no fifth slot |
| Full six-stage playbook with case studies | **New page**, `/insights` (or `/playbook`) — the tab panels are ~180px of visible space; this content is long-form and deserves its own route, linked from Services |

---

## 2. Component 1 — `src/config/services.ts` (replace description/features/metrics only, keep `id`/`icon`)

This is the highest-leverage change: your current tab copy is generic placeholder language ("Deploy embedded engineering teams..."). The PDF gives you real methodology vocabulary and real numbers. Swap in:

**`outsourcing`**
- `description`: "Specialized outsourcing delegates knowledge-intensive work — not generic tasks — to partners whose focused experience, scale, or technology genuinely beats an in-house build. Available at any stage of the data-to-deployment pipeline, from IT infrastructure to clinical trial management to computational chemistry."
- `features`: `["Elite talent, zero ramp-up", "Fixed cost → variable operating expense", "Domain risk shared with a specialist partner", "Scale up or down without headcount complexity"]`
- `metrics`: `"6-week engagement, $500K saved vs. in-house build"` *(pulled from the biotech case study — replace only if that number is one Avora can stand behind)*

**`skill-hiring`** — leave close to current, it's already tight. Optional one-line addition to `description`: "...deployed against a defined scope, quality bar, and timeline — not an open-ended headcount request."

**`ai-solutions`**
- `description`: "A true AI solution is not an impressive model — it's seven components working in concert: problem framing, data strategy, model development, system integration, deployment, change management, and monitoring. We engineer all seven, not just the algorithm."
- `features`: `["Problem framing tied to measurable KPIs", "Human-in-the-loop by design, not full autopilot", "SHAP-based explainability for stakeholder trust", "Drift monitoring and retraining built in from day one"]`
- `metrics`: `"23.4% cost reduction, 680% ROI at 36 months"` *(electronics manufacturing case study — same caveat as above)*

**`data-annotations`**
- `description`: "Annotation gives raw data meaning; labeling operationalizes it at scale; quality assurance is the gate that decides whether it's trustworthy enough to train on. We run all three as one continuous, auditable pipeline — with inter-annotator agreement (Cohen's Kappa) tracked and reported, not assumed."
- `features`: `["Ontology + guidelines before labeling starts", "Model-assisted pre-labeling, expert-reviewed", "Inter-annotator agreement reported (target >0.85 Kappa)", "Eight-dimension quality scoring: accuracy, completeness, consistency, timeliness, validity, uniqueness, relevance, accessibility"]`
- `metrics`: `"0.94 entity-level F1, 99.98% consensus confidence"`

Keep `metrics` visually where it already renders (the "Target SLA Objective" gold-mono line in `Services.tsx` — no layout change needed, just the string).

---

## 3. Component 2 — new route `src/app/insights/page.tsx` (or `/playbook`)

This is where the full six-stage document lives. Structure, using components you already have:

```
/insights
  ├── Hero block (reuse Hero.tsx's typographic pattern, not full component)
  │     "AI Delivery Playbook" / "Six disciplines, one continuous pipeline"
  │     background: reuse .hero-bg class (Gold_Flow) at 40% opacity variant
  │
  ├── Stage nav — sticky horizontal strip, 6 items, same treatment as
  │     Services.tsx's left tab column but horizontal: numbered 01–06,
  │     gold underline on active state (border-b-2 border-[#D4AF37])
  │
  ├── Six stage sections, each:
  │     - max-w-4xl mx-auto (narrower than services' max-w-6xl — this is
  │       reading content, not a dashboard)
  │     - section-eyebrow / section-heading / section-subtext (reuse exactly)
  │     - Body content from PDF, condensed — see §4 for exact cuts
  │     - Case study as a glass-panel card, rounded-2xl, p-8
  │     - Stat row inside case study: grid-cols-2 md:grid-cols-4 gap-4,
  │       each stat: text-2xl font-heading font-bold text-[#D4AF37],
  │       label below at text-xs text-slate-500 uppercase tracking-wider
  │       (this exact pattern already exists in your Hero stat cards —
  │       reuse the same JSX, just swap numbers)
  │
  └── CTA footer block: "See how this applies to your data" →
        links to /#contact
```

Background rotation across the 6 stages (reuse existing 4 wallpapers, no new assets needed): Generation → `hero-bg` (Gold_Flow), Annotation → `services-bg` (Institutional_Network), Labeling → `services-bg` again (same discipline family, visual continuity), Quality Assurance → `ventures-bg` (Silicone_Gold), AI Solutions → `ventures-bg`, Outsourcing → `contact-bg` (Structural_Precision). This keeps the page from needing new image assets while still visually differentiating stage groups.

---

## 4. Content cuts — the PDF is long-form; the site needs scannable

Do **not** paste the PDF text wholesale into the page. For each stage, keep exactly three things and cut the rest to supporting detail behind a "Read the full methodology" expand (or just cut it — the case study carries the credibility weight):

1. The one-sentence definition (already gold — e.g., "Labeling is the sophisticated alchemy that converts unstructured images, text, audio, and sensor streams into the structured datasets that power machine learning")
2. One framework visual reduced to a 3–5 step numbered list (the lifecycle diagrams in the PDF) — render as a horizontal stepper using the same numbered-badge pattern already in `Process.tsx` (`w-10 h-10` circle, gold border, number inside) — don't rebuild this component, reuse it
3. The case study, compressed to: headline stat, 3-sentence problem, 3-sentence approach, stat grid (4 numbers max — pick the 4 most concrete from each case study, not all 6-8 listed in the PDF)

Cut entirely: the "five myths," the "eight habits," the "ten principles" lists — these are good LinkedIn/blog content later, not homepage-adjacent page content under a 1-hour deadline. If there's time after the core build, they become individual short blog posts, not this page.

---

## 5. Exact dimensions (matching your current breakpoints)

- Page container: `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8` for body copy, `max-w-6xl` for the stat grids and case study cards (matches `Services.tsx` precisely)
- Section vertical rhythm: `py-20 md:py-24` between stages (your existing sections use `py-24` flat — fine to match exactly)
- Case study card: `rounded-2xl p-8 md:p-10`, using `.glass-panel` as-is
- Stat numbers: `text-2xl md:text-3xl font-heading font-bold` in `text-[#D4AF37]` (dark) / `text-[#C5A059]` (light) — matches your existing `--accent` variables exactly, don't hardcode a new hex
- Stepper badges: `w-10 h-10 rounded-full border border-[#D4AF37]/60` — same as `Process.tsx`'s existing number badge, reused not recreated
- Stage nav strip: `h-14` sticky under your existing `SpotlightNav`, `top-[64px]` (matches navbar height) so it doesn't overlap on scroll

---

## 6. Footer + nav wiring

Add one line to `Footer.tsx`'s "Company" column: `{ label: 'Insights', href: '/insights' }`. Add one line to `Navbar.tsx` desktop nav if there's room (`Services · Process · Insights · Founder · Contact` — five items still fits a standard nav bar without crowding).

---

## 7. Master prompt for Antigravity

```
Read src/config/services.ts, src/components/Services.tsx, src/app/globals.css,
and src/components/Process.tsx before changing anything — reuse existing
classes (glass-panel, section-eyebrow, section-heading, section-subtext,
hero-bg, services-bg, ventures-bg, contact-bg) and the --accent CSS variable.
Do not introduce new color values, new card components, or new section
padding scales. This is a content-integration task, not a redesign.

1. Update src/config/services.ts: replace description, features, and metrics
   fields only (keep id and icon) for all four services using the copy in
   AVORA_CONTENT_INTEGRATION_BLUEPRINT.md section 2. Do not change the tab
   UI in Services.tsx — the copy renders into the existing layout as-is.

2. Create src/app/insights/page.tsx as a new route. Structure per blueprint
   section 3: sticky stage nav (6 items, numbered, gold active underline),
   six stage sections at max-w-4xl, each with a case-study card at max-w-6xl
   reusing the exact glass-panel + stat-grid pattern already present in
   Hero.tsx's stat row and Process.tsx's numbered badges. Reuse the four
   existing background classes (hero-bg, services-bg, ventures-bg,
   contact-bg) rotated across stages per blueprint section 3 — do not add
   new background images.

3. Condense content per blueprint section 4 — definition sentence, 3-5 step
   framework as a Process.tsx-style stepper, and one compressed case study
   with a 4-stat grid. Do not paste full PDF paragraphs. Cut the myths/
   habits/principles lists from this page entirely.

4. Add "Insights" to Footer.tsx Company column and Navbar.tsx desktop nav.

Run /impeccable audit src/app/insights/ after building, before calling it done.
```

---

## 8. If the hour runs out before all six stages are built

Priority order if you have to cut scope: **Data Annotations tab copy update (§2) first** — it's a five-minute find-replace in one config file and immediately improves the page a cold client sees first. The `/insights` page (§3) is the impressive-but-optional piece — ship it with 2-3 stages live rather than none, and add the rest after the meeting.
