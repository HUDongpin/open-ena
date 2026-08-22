# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Open ENA
**Generated:** 2026-08-22 10:41:02
**Category:** Research Lab / University Department
**Design Dials:** Variance 2/10 (Centered / Minimal) | Motion 2/10 (Subtle) | Density 3/10 (Spacious)

---

## Global Rules

### Color Palette

The generator's generic dark developer palette is superseded by the product owner's baby-blue brief and the established ENA interface tokens. Baby blue is used as an accessible surface and accent with navy text; it is never used as low-contrast body text on white.

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary / Navy | `#0F172A` | `--ink` |
| On Primary | `#FFFFFF` | `--on-ink` |
| Baby Blue | `#89CFF0` | `--baby-blue` |
| Baby Blue Hover | `#73C2E8` | `--baby-blue-hover` |
| Accessible Blue | `#175F88` | `--blue-strong` |
| Page Background | `#F7FBFE` | `--page` |
| Surface | `#FFFFFF` | `--surface` |
| Soft Blue Surface | `#EDF8FD` | `--blue-soft` |
| Muted Text | `#526477` | `--muted` |
| Border | `#D5E8F1` | `--line` |
| Success | `#187A60` | `--success` |
| Focus Ring | `#175F88` | `--focus` |

**Color Notes:** The palette comes directly from the parent ENA interface (`#89CFF0`) and the owner's baby-blue direction. Navy supplies the contrast and academic seriousness.

### Typography

- **Heading Font:** Geist-compatible system sans (`Inter`, `Helvetica Neue`, Arial, sans-serif)
- **Body Font:** Geist-compatible system sans (`Inter`, `Helvetica Neue`, Arial, sans-serif)
- **Monospace:** `SFMono-Regular`, Consolas, monospace
- **Mood:** academic, precise, calm, open, readable
- **Loading:** use system fonts so production builds do not depend on a remote font request

**CSS Import:**
```css
:root {
  --font-sans: Inter, "Helvetica Neue", Arial, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, monospace;
}
```

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #89CFF0;
  color: #0F172A;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #175F88;
  border: 1px solid #89CFF0;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #D5E8F1;
  border-radius: 18px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: default;
}

.card:hover { box-shadow: var(--shadow-lg); }
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #0F172A;
  outline: none;
  box-shadow: 0 0 0 3px #0F172A20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Scientific Minimalism

**Keywords:** open, baby blue, precise, airy, transparent, research-grade, quiet confidence

**Best For:** open-source scientific software, academic research tools, project team profiles

**Key Effects:** restrained large type, generous whitespace, thin blue rules, open arcs, network-node geometry, no decorative glassmorphism

### Page Pattern

**Pattern Name:** Two-page research product

- **CTA Placement:** Above fold
- **Open ENA order:** Minimal hero > interface boundary note > full UI preview
- **About order:** Purpose > four-person team grid > open-practice statement

---

## Motion

Use only CSS transitions for hover, focus, the mobile navigation, and UI-preview tabs. Keep durations between 160–240ms. No scroll-jacking, parallax, or animation dependency. Disable nonessential transitions under `prefers-reduced-motion: reduce`.

---

## Anti-Patterns (Do NOT Use)

- ❌ Excessive card shadows or glassmorphism
- ❌ Low-information marketing filler

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
