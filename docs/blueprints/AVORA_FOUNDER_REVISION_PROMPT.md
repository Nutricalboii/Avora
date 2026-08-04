# Avora — Founder-Approved Revision Prompt (ready to paste into Antigravity)

**Reading-back check first, so you can confirm before this goes anywhere:** your notes say remove Outsourcing/Skill Hiring as named services, reduce to a 5-step pipeline (Generation → Annotation → Labeling → Auditing → AI Implementation), kill the AI Playbook page, fold the A.I.M. framework into the AI Implementation step only, make case studies nameless ("what we did," no client/company names), switch testimonials to role + industry only, go light-mode-default with a better font, fix mobile, and swap Budget → Industry on the contact form. That's what's below. If any of that is a misread, say so before you send it.

---

## The prompt

```
Read src/config/services.ts, src/components/Services.tsx, src/components/Process.tsx,
src/app/insights/InsightsPage.tsx, src/components/InsightsTeaser.tsx,
src/components/Testimonials.tsx, src/components/Contact.tsx, src/app/layout.tsx,
and src/app/globals.css before changing anything. This is a scope reduction and
clarity pass, approved by the founder — cut precisely, don't add.

1. SERVICES — reduce from 4 named services to a 5-step pipeline
   In src/config/services.ts, remove "Specialized Outsourcing" and "Specialized
   Skill Hiring" as distinct named offerings entirely — do not keep them as
   hidden/secondary items. Replace the whole services array with five steps,
   presented as a sequence, not four independent named product tiles:
     1. Data Generation
     2. Data Annotation
     3. Labeling
     4. Auditing (quality assurance)
     5. AI Implementation
   Each step description should describe the discipline generically — what the
   step does and delivers — not "we are the best at X." No outsourcing/staffing
   language anywhere in this section. Update Services.tsx's tab/step rendering
   to reflect 5 sequential steps instead of 4 independent tabs. Keep the existing
   glass-panel visual language and the max-w-7xl container width already fixed.

2. AI IMPLEMENTATION — absorb the A.I.M. framework, remove it as a standalone section
   Take the three-phase content currently in Process.tsx (Discovery,
   Implementation, Scaling — the "A.I.M. Framework") and move it inside the new
   "AI Implementation" step's detail view from item 1 above. Delete Process.tsx
   as a standalone homepage section. The AIM framework should now only appear
   when a visitor is looking at the AI Implementation step specifically, not as
   its own top-level section on the homepage.

3. REMOVE THE AI PLAYBOOK / INSIGHTS PAGE ENTIRELY
   Delete src/app/insights/ (page.tsx and InsightsPage.tsx), delete
   InsightsTeaser.tsx, and remove every reference to it — check Footer.tsx,
   Hero.tsx, HeroBento.tsx, and src/app/api/chat/route.ts (the chatbot currently
   has an intent routing to this page — remove that intent or repoint it to the
   AI Implementation step instead). Remove the nav link if one exists. This is a
   full removal, not a hide.

4. CASE STUDIES — generic, no names
   Wherever case study / "delivered outcomes" content exists (Ventures.tsx's
   "From the Field" cards, and anywhere else pulled from the old playbook),
   reformat each entry to strictly: which service/step it was, and what was
   done — no client name, no company name, no fabricated company ("TechFlow",
   "FinEdge Innovations" — remove these), no industry-specific proper nouns
   that could identify a real client. Format: "For [step]: what we did" +
   the outcome metric. Keep the real numbers (they're the credibility signal),
   drop anything that names or implies a specific identifiable client.

5. TESTIMONIALS — role + industry, not company name
   In Testimonials.tsx, remove the fabricated company names currently attached
   to each quote (TechFlow, Industrial Solutions Japan, FinEdge Innovations,
   ScaleTech). Replace the attribution line with role + industry only —
   e.g. "VP of Operations, Logistics & Supply Chain" instead of "VP of
   Operations, TechFlow (USA)". Keep the person's first-name-only or drop the
   name entirely if it was invented — do not present a fabricated named
   individual as a real testimonial source.

6. DESIGN — light mode default, better font, simplify
   In src/app/layout.tsx, change ThemeProvider's defaultTheme from "dark" to
   "light". Keep the toggle available, but light is now the default experience.
   Review src/app/globals.css font stack — the brief calls for a cleaner,
   more minimal, easier-to-read typeface than what's currently set. Evaluate
   swapping the body font for something with better light-mode legibility at
   small sizes (the founder's note is "difficulty to read/understand" — treat
   this as a real usability complaint, not a style preference). Do not touch
   the gold accent color or the wallpaper backgrounds — those stay. This is
   about hierarchy and legibility, not a full re-theme.

7. MOBILE — fix responsiveness properly
   Audit every section (Hero/HeroBento, the new 5-step Services, Ventures,
   Testimonials, Contact, Footer) at 375px and 414px widths specifically.
   Fix any horizontal scroll, cramped touch targets under 44px, or text that
   overflows its container. This was flagged explicitly as currently poor —
   treat it as a required fix, not optional polish.

8. CONTACT FORM — swap Budget Range for Industry
   In Contact.tsx, remove the budgetRange field entirely (state, JSX, and any
   reference in the submit handler). Add an "Industry" field in its place —
   optional, same select-dropdown pattern as the field it replaces, with
   options covering common client industries (Healthcare, Finance, Retail,
   Manufacturing, Technology, Logistics, Other — adjust as sensible). Update
   the API route (/api/contact) to accept and forward `industry` instead of
   `budgetRange`.

Do not touch: the gold accent, wallpaper backgrounds, dashboard, auth, Prisma
schema, security headers, or any config outside what's listed above. This is
a content-scope and clarity revision, not a redesign.

Run npm run build after each numbered item, not just at the end — confirm
clean before moving to the next. Commit once, at the end, with a clear message
describing all 8 changes. Push to both remotes.
```

---

## One open question before you send this

Item 6 (font swap) is the one place the prompt has to make a judgment call rather than follow an exact instruction — your note says "better font" but doesn't name one. If the founder has a specific typeface in mind, add it as item 6a before sending; otherwise Antigravity will pick something reasonable (a legible humanist sans for body text) and you can veto it in review. Everything else above is a direct, unambiguous translation of the notes — nothing invented, nothing softened.
