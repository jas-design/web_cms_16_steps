# Cutisure Design System Extraction & Normalization
This specification outlines the extraction, structural analysis, and normalization of the **Cutisure Pure Derma Care** website design reference into the existing **Astro Scalable Component Architecture Model**.

The goal is to capture the structural relationships, aesthetic decisions, spacing grids, and component signatures *without cloning* the layout, translating them instead into highly reusable layouts, dynamic UI patterns, and type-safe components.

---

## 1. Design System Extraction Matrix

### 1.1 Color System
The palette transitions from medical sterile layouts into a warm, organic, editorial skincare aesthetic using soft pastel hues, bold deep teal-forest neutrals, and chartreuse call-outs.

| Token | CSS Variable / Tailwind | Hex Value | Practical Application |
|---|---|---|---|
| **Primary Accent** | `var(--color-primary-teal)` / `text-[#0E9A92]` | `#0E9A92` | Key highlights, circular status tags, primary brand identification blocks. |
| **Secondary Accent** | `var(--color-chartreuse)` / `bg-[#D4F038]` | `#D4F038` | High-vibrancy call-to-actions, prominent buttons, interactive hovers. |
| **Deep Neutral** | `var(--color-forest-teal)` / `bg-[#0E2A24]` | `#0E2A24` | Primary footers, full-page hero cards, extreme high-contrast blocks. |
| **Warm Highlight** | `var(--color-lemon-bg)` / `bg-[#EAF3FA]` | `#EAF3FA` | Behind hero graphics, split container background accents. |
| **Muted Pastel** | `var(--color-soft-mint)` / `bg-[#F4FAF9]` | `#F4FAF9` | Grid section backgrounds, alternative list rows, soft dividers. |
| **Base Surface** | `var(--color-base-surface)` / `bg-[#FFFFFF]` | `#FFFFFF` | Standard white cards, inputs, dropdown nodes. |

### 1.2 Typography System
The typography pairs a sophisticated editorial serif for dramatic headings with a high-legibility crisp sans-serif for reading flows and structural menus.

| Element | Font Stack | Tracking / Weight | Leading | Optical Notes |
|---|---|---|---|---|
| **Display Headings (H1/H2)** | `"Playfair Display"`, serif | `tracking-tight font-medium` | `leading-[1.12]` | Large display, beautiful italic letters (e.g. *Beauty*, *True Glow*). |
| **Section Annotations** | `"JetBrains Mono"`, monospace | `tracking-wider font-bold text-xs uppercase` | `leading-normal` | Prefix metadata alerts (e.g. `ABOUT CUTISURE`, `CHOOSE PACKAGE`). |
| **Body Narratives** | `"Inter"`, sans-serif | `tracking-normal text-slate-650` | `leading-relaxed` | Soft gray readability blocks holding dense paragraphs. |
| **Interactive Elements** | `"Inter"`, sans-serif | `tracking-wide font-semibold text-sm` | `leading-none` | Precise caps sizing inside buttons, badges, and navigators. |

### 1.3 Spacing Logic (Fluid Utopia Scale Grid)
Aligned with our `COMPONENTS.md` standards, spacing utilizes clamp-calculated variables to avoid layout structural leaks.

- **Gutters & Grids**: Fluid `clamp(1rem, 0.91rem + 0.45vw, 1.3rem)` for horizontal blocks.
- **Section Gaps**: Alternate structural rows between `m` padding-top/bottom (e.g., `pt-12 sm:pt-20` / `pb-12 sm:pb-20`) and `l` spacing boundaries for wide display screens.
- **Card Padding**: Inner bounds standard to `p-6 sm:p-8` for spacious air grids.

### 1.4 Border Radius & Shadow Systems
- **The Organic Mask (Asymmetric Blobs)**: Portrait graphic elements employ asymmetric rounded corners (`rounded-[30%_70%_70%_30%]` or `rounded-[100px_40px_100px_40px]`) to replicate organic fluid leaves, shifting depending on scroll direction or interactive hover.
- **The Pill Border**: High-contrast chartreuse action items use `rounded-full` profiles.
- **Card Cornering**: Standard container blocks utilize `rounded-2xl` boundaries.
- **Subtle Dropshadows**: Soft diffused elevations (`shadow-2xl shadow-teal-950/2`) mapping behind active input boxes, pricing blocks, and floating informational cards.

---

## 2. Reusable Component Normalization

We normalize the visual reference components into decoupled, type-safe API signature contracts.

### 2.1 GlowBadge (Universal Badge Addition)
A specific badge mapping a round status icon, stacked avatars, or highlighted numerical badges with deep glows.

```typescript
export interface GlowBadgeProps {
  label: string;
  avatarStack?: string[]; // Overlapping circular avatar thumbnails
  glowColor?: 'teal' | 'chartreuse' | 'coral';
  icon?: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-right' | 'static';
}
```

### 2.2 ChartreuseButton (Primary Brand Accent Action)
A specialized hover-animated button executing the chartreuse high-contrast color scheme.

```typescript
export interface BrandButtonProps {
  text: string;
  url: string;
  variant?: 'brand-pill' | 'dark-outline' | 'text-link-chevron';
  glowEffect?: boolean;
  disabled?: boolean;
}
```

### 2.3 ServiceCircleGrid (Centered Image with Outer Elements)
A modular circle grid mapping a core central image surrounded by up to 6 symmetrically laid out service columns on screens above `md`.

```typescript
export interface CircularGridComponentItem {
  title: string;
  description: string;
  iconName: string;
}

export interface CircularGridProps {
  centralImage: string;
  items: CircularGridComponentItem[]; // Max 6, automatically divided into Left Stack and Right Stack
}
```

### 2.4 TimedSequenceSteps (Horizontal Block Grid)
A sequence mapping user timelines or appointment steps, complete with custom progress tags across sequential layouts.

```typescript
export interface SequenceStepItem {
  stepNumber: string; // e.g. "STEP 01"
  title: string;
  description: string;
  iconName: string;
}

export interface TimedSequenceProps {
  title?: string;
  steps: SequenceStepItem[];
}
```

---

## 3. Reusable Layout Normalization

We decompose the complex landing segments into generalizable structural layouts.

```
Layout Template Normalization File Structure:
src/components/layout/
├── AsymmetricSplit.astro  # Dynamic left-heavy/right-heavy portrait structures
├── FullBadgeRow.astro      # Grid for social proof brand logos
└── TimelineProgress.astro  # Process/Sequence workflow layouts
```

### 3.1 AsymmetricSplit (Split Structural Section)
Maps asymmetrical grids (ratio options `50-50` or `60-40` with customizable reversing to stack correctly across devices). Can be loaded with:
- Standard typographic narrative columns + CTA (Left).
- Asymmetric leaf-masked portraits with floating badges (Right).

```typescript
export interface AsymmetricSplitProps {
  ratio?: '50-50' | '60-40' | '40-60';
  reverseOnMobile?: boolean;
  leftSideContent: 'markup' | 'text-column';
  rightSideContent: 'organic-media' | 'form-card';
}
```

### 3.2 FullBadgeRow (Brand Logo Section)
Used for gray-faded social-proof logos, rendering a clean, fluid scroll grid.

```typescript
export interface BrandShowcaseProps {
  logos: {
    name: string;
    imageUrl: string;
  }[];
}
```

### 3.3 TimelineProgress (Timed Sequence Grid)
Allows horizontal mapping of structured cards that shift to vertical stack models on mobile, tracking steps sequentially.

---

## 4. Normalization of Complex Tiers with existing CMS Scheme

By mapping these parameters into the existing `src/types.ts` collections schema, the Cutisure aesthetic can be loaded entirely via standard JSON static files.

### 4.1 Normalized JSON Content Fragment Example
The following snippet maps the new design system specs directly into standard page content properties:

```json
{
  "seo": {
    "title": "Pure Derma Care Solutions",
    "description": "Reveal your natural skin glow under our expert dermatologist supervision."
  },
  "hero": {
    "accentText": "Nurture Your Skin",
    "title": "Reveal Your True Glow",
    "subtitle": "Discover personalized, scientifically guarded skincare protocols targeting complete hydration.",
    "ctas": [
      {
        "text": "Book Appointment",
        "url": "#booking",
        "variant": "glow"
      }
    ],
    "backgroundImage": "/assets/hero-bg.jpg"
  },
  "grid": {
    "title": "Elevate Your Skin",
    "subtitle": "Our dermatological treatments are structured around medical precision and organic soothing protocols.",
    "columns": 3,
    "items": [
      {
        "title": "Face Treatment",
        "description": "Complete cellular hydration therapies yielding refined dermal texture.",
        "icon": "sparkles"
      },
      {
        "title": "Body Treatment",
        "description": "Purifying pore cleanse routines and organic exfoliation.",
        "icon": "shield"
      }
    ]
  }
}
```

---

## 5. Summary of the Architectural Translation
By applying this normalization layer, we avoid manual custom CSS for subsequent page builds. Rather than repeating design attributes, the entire **Cutisure design reference** is structured as modular configurations consuming standard, type-safe layouts and stylized variables directly inside the existing Astro framework setup.
