# Avora — Container Width & Empty-Box Fix

**Diagnosis, not a guess:** every section's `max-w-*` value, checked directly in the repo.

| Component | Current | Should be | Why |
|---|---|---|---|
| `Hero.tsx` | `max-w-6xl` (1152px) | `max-w-7xl` (1280px) | Matches Ventures/Footer, which already look right |
| `Services.tsx` | `max-w-6xl` | `max-w-7xl` | Same |
| `Process.tsx` | `max-w-6xl` | `max-w-7xl` | Same |
| `FAQ.tsx` | `max-w-4xl` (896px) | `max-w-5xl` (1024px) | Was the narrowest section on the page — most visible gap offender |
| `Testimonials.tsx` | `max-w-4xl` | `max-w-5xl` | Same |
| `Contact.tsx` | `max-w-4xl` outer / `max-w-2xl` form | `max-w-5xl` outer / `max-w-2xl` form kept | Widen the section, keep the form itself narrow — forms should stay readable-width, the surrounding section shouldn't |
| `Team.tsx` | `max-w-5xl` | `max-w-6xl` | Minor, for consistency |
| `Ventures.tsx`, `Footer.tsx` | `max-w-7xl` | **unchanged** | These are already correct — this is the target every other section should match |

This is a one-line change per file (swap the class), zero risk, zero logic touched. Not "make it bigger" for its own sake — matching what's already correct elsewhere on the same page.

---

## The two actually-empty boxes (not just narrow — genuinely hollow)

**`Services.tsx` line 88** — `min-h-[500px]` on the whole tab panel, but the right-side "Placement Quality Guarantee" content (icon + two short paragraphs + one line) is maybe 260px tall. The panel forces itself to 500px regardless, so there's a dead gap at the bottom every time you're on the Outsourcing or Skill Hiring tab (visible clearly in your screenshot 2).

Fix: remove the fixed `min-h-[500px]` from the outer grid. Instead, on the right-side content wrapper (`lg:w-72` block), change `flex flex-col justify-center` so short content centers vertically in whatever height the *left* panel (the tab list, which is naturally taller) sets — instead of top-anchoring with empty space below. The grid still matches heights via `items-stretch`, but content is centered, not stranded at the top.

**`Testimonials.tsx` line 74** — same pattern, `min-h-[220px]` around a single quote. Less severe, but fix identically: drop the fixed min-height, let `p-8 md:p-12` padding alone set the size, add `flex items-center` so short quotes center rather than top-align with trailing dead space.

---

## Master prompt for Antigravity

```
Read src/components/Hero.tsx, Services.tsx, Process.tsx, FAQ.tsx,
Testimonials.tsx, Contact.tsx, Team.tsx, Ventures.tsx, and Footer.tsx
before changing anything.

Ventures.tsx and Footer.tsx already use max-w-7xl and are correct —
treat them as the reference. Every other section currently uses
max-w-6xl or max-w-4xl, which is why there are large empty gaps on
both sides of every section except Ventures and Footer, visible on
every scroll position, not just the hero.

Change:
- Hero.tsx, Services.tsx, Process.tsx: max-w-6xl → max-w-7xl
- FAQ.tsx, Testimonials.tsx: max-w-4xl → max-w-5xl
- Contact.tsx: the OUTER section container max-w-4xl → max-w-5xl.
  Do NOT widen the form itself (max-w-2xl) — forms should stay
  narrow and readable, only the surrounding section width changes.
- Team.tsx: max-w-5xl → max-w-6xl

Then fix two forced-empty boxes:
- Services.tsx line ~88: remove the fixed min-h-[500px] from the
  glass-panel grid. On the right-side content block (currently
  lg:w-72), add flex flex-col justify-center so short content
  (Outsourcing/Skill Hiring tabs) centers vertically instead of
  top-aligning with dead space below it. Keep items-stretch on the
  parent grid so the panel still matches the left tab list's height.
- Testimonials.tsx line ~74: remove min-h-[220px], add
  flex items-center to the glass-panel so the quote centers in
  whatever height the padding naturally produces, instead of
  leaving trailing empty space.

Do not change colors, fonts, the gold accent, wallpaper backgrounds,
or any component logic. This is a spacing/width fix only. Test at
100% browser zoom, standard 1440px and 1920px viewport widths —
the fix should make 100% zoom look like the previous 125% zoom
screenshots, without needing to zoom at all.

Run npm run build after, confirm zero errors, then commit.
```

---

## One more small thing worth doing while in there

Screenshot 6 shows the `services-bg` / testimonial background transitioning into a plain black area right where FAQ starts — the "OPERATIONAL VERIFICATION" heading is nearly invisible against its own background image at that scroll point. Once the section is widened, check that heading's contrast at that specific scroll position (it's a text-over-image legibility issue, separate from the width fix — flag it to Antigravity as a secondary check, not part of the main prompt above, since it's copy positioning not container width).
