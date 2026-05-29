# Astro Scalable Component Architecture Model

This document outlines the **Component Architecture Conventions**, styling modifier systems, and accessibility guidelines established for our multi-page Astro static platform. 

All atomic UI components are coded as decoupled, type-safe structures capable of consuming direct JSON database feeds (CMS ready).

---

## 1. Component Structure & Naming Conventions

To guarantee consistency across massive development teams and hundreds of pages, we enforce a strict **Atomic Taxonomy** for our component directory:

```
src/components/
├── base/          # Level 0: Pure, atomic elements (e.g. Buttons, Badges, Loaders)
├── cards/         # Level 1: Self-contained interactive tiles holding media/content
├── interactive/   # Level 2: State-driven tools (e.g. Accordions, Modals, Carousel, Gallery)
├── layout/        # Level 3: Scaffolding, navigators, and structural compliance frames (e.g. Nav, Footer)
└── templates/     # Level 4: Complex multi-slot sections consuming page datasets directly
```

### Standard File Layout

Every Astro/TypeScript component must follow the **Self-Documenting Triad** order:
1. **TypeScript Interface Contracts**: Explicitly typed prop mappings defining optional items and style constraints (modifier sets).
2. **Style Map Helpers**: Localized mappings translating design variables (e.g., `'cyan' | 'emerald'`) straight to Tailwind class strings.
3. **Semantic HTML Render Block**: Strictly structured layout capturing responsive widths and fully accessible ARIA identifiers.

---

## 2. Reusable Modifier & Variant Systems

Rather than concatenating fragile, custom class strings on consumer pages, components govern their own visual states using strict **Modifier Enums**.

### Visual Variant Selection
Modifiers are structured as string-literals under TypeScript:
- **`variant`**: Handles tone styles (`primary` | `secondary` | `outline` | `glow` | `danger` | `glass`)
- **`size`**: Maps exact spacing limits (`xs` | `sm` | `md` | `lg`)
- **`align`**: Controls grid column flow orientations (`center` | `left` | `right`)

### Example: Component Props Signatures

```typescript
export interface ButtonProps {
  text: string;
  url?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glow' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  iconRight?: React.ReactNode;
  loading?: boolean;
}

export interface BadgeProps {
  label: string;
  variant?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'slate' | 'neon' | 'glow';
  size?: 'xs' | 'sm' | 'md';
}
```

---

## 3. SCSS Organization & Global Variables

For custom styling beyond standard Tailwind configurations or when using SCSS compilation, variables are strictly bounded inside dedicated namespaces:

```scss
// src/styles/abstract/_variables.scss

// 1. Color Tokens mapping digital palette
$c-cyan: #00f5ff;
$c-emerald: #10b981;
$c-slate-bg: #080c14;
$c-border: rgba(30, 41, 59, 0.8);

// 2. Utopia Fluid Scale Calculations (320px to 1440px)
$space-xs: clamp(0.75rem, 0.68rem + 0.36vw, 1rem);
$space-s:  clamp(1rem, 0.91rem + 0.45vw, 1.3rem);
$space-m:  clamp(1.5rem, 1.36rem + 0.68vw, 2rem);
$space-l:  clamp(2rem, 1.82rem + 0.91vw, 2.6rem);
$space-xl: clamp(3rem, 2.73rem + 1.36vw, 4rem);

// 3. Modifier System BEM Pattern Example
.c-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-family: var(--font-mono);

  &--size-xs { padding: 2px 6px; font-size: 9px; }
  &--size-sm { padding: 4px 10px; font-size: 10px; }
  
  &--variant-cyan {
    background: rgba($c-cyan, 0.1);
    color: $c-cyan;
    border: 1px solid rgba($c-cyan, 0.2);
  }
}
```

---

## 4. Reusable JSON Props Examples (CMS Payloads)

Each component can be built directly by passing flat static JSON parameters. This makes plugging your codebase into a headless CMS like Sanity or Strapi plug-and-play.

### 1. Testimonial Card Collection
```json
{
  "title": "Tested by Lead Engineering Teams",
  "subtitle": "Discover how architects integrate reusable models into modern delivery workflows.",
  "items": [
    {
      "quote": "The reusable component architecture saved our team hundreds of duplicate markup blocks, improving load-speed performance by 40% out of the box.",
      "authorName": "Dr. Sarah Sterling",
      "authorRole": "Director of Product at CloudX",
      "rating": 5,
      "avatarUrl": "/assets/avatars/sterling.png"
    }
  ]
}
```

### 2. Pricing Plans SLA
```json
{
  "planName": "Enterprise SLA Scale",
  "price": "$149",
  "billingPeriod": "/ developer",
  "isPopular": true,
  "features": [
    "Strict type-safe metadata validations",
    "Fluid Utopia clamp scales removing margin leaks",
    "WCAG AAA contrast adherence benchmarks",
    "Live API webhook sync templates"
  ],
  "ctaText": "Activate Dev Token",
  "ctaUrl": "#pro-access"
}
```

### 3. Navigation link mapping
```json
{
  "brandName": "Astro Blueprint",
  "links": [
    { "label": "Blueprint System", "url": "#blueprint" },
    { "label": "Layout Portfolios", "url": "#layouts" },
    { 
      "label": "Engineering Docs", 
      "url": "#docs",
      "children": [
        { "label": "Component Specifications", "url": "/docs/components" },
        { "label": "SCSS Token Systems", "url": "/docs/tokens" }
      ]
    }
  ]
}
```

---

## 5. Accessibility (A11y) & SEO Standards

Component rendering follows Strict WCAG AA compliance out of the box:
- **ARIA Disclosure Matrix**: Carousel slides, accordion triggers, and overlays use `aria-expanded`, `aria-controls`, and `aria-modal="true"` states.
- **Semantic Tags**: Components render dedicated HTML5 blocks (`<figure>`, `<nav>`, `<article>`, `<header>`, `<footer>`, `<aside>`) instead of generic nested `div` wraps.
- **Contrast Check**: Neon borders, overlays, and text classes are constrained to soft off-whites and dark backdrops, keeping reading ratios compliant.
