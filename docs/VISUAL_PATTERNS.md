# Cutisure Pure Derma Care — Normalized Visual Patterns, Spacing & Composition Systems
This specification documents the extracted design semantics, mathematical layout constants, spatial relationships, and component behaviors of the **Cutisure Pure Derma Care** design reference. These rules are fully normalized to serve as a type-safe blueprint for high-fidelity component compilation.

---

## 1. Reusable Spacing Rules (Sizing Scales & Enclosures)

### 1.1 Section Spacing (Viewport Height Stripes)
To prevent erratic margin behavior or overlap, all sections use height-proportional spacing that flows dynamically based on device size.

*   **Standard Section (Medium)**: Designed for regular layout sections (Features, Grid blocks).
    *   *Mobile (Base)*: `pt-12 pb-12` (equivalent to standard `3rem`)
    *   *Desktop (MD+)*: `pt-20 pb-20` (equivalent to standard `5rem`)
    *   *Utopia Fluid Clamp*: `py-[clamp(3rem,2.2rem+4vw,5rem)]`
*   **Hero & High-Impact Section (Large)**: Used for landing zones and primary conversions.
    *   *Mobile (Base)*: `pt-16 pb-16` (equivalent to `4rem`)
    *   *Desktop (MD+)*: `pt-28 pb-28` (equivalent to `7rem`)
    *   *Utopia Fluid Clamp*: `py-[clamp(4rem,2.8rem+6vw,7rem)]`
*   **Utility & Compact Section (Small)**: Used for footer matrices, badge rows, and sub-headers.
    *   *Mobile (Base)*: `pt-8 pb-8` (equivalent to `2rem`)
    *   *Desktop (MD+)*: `pt-12 pb-12` (equivalent to `3rem`)
    *   *Utopia Fluid Clamp*: `py-[clamp(2rem,1.6rem+2vw,3rem)]`

### 1.2 Card Spacing (Internal Spans)
Card elements enforce exact inner negative space boundaries based on content density.

*   **Default Feature Card**: Used in standard grids.
    *   *Padding*: `p-6 sm:p-8` (fluidly transitions from `1.5rem` to `2rem`)
    *   *Internal Gap*: Title-to-body spacer uses standard `space-y-3` or `margin-bottom: 0.75rem`.
*   **Asymmetric Informational Card & Hero Forms**:
    *   *Padding*: `p-8 sm:p-10` (fluidly transitions from `2rem` to `2.5rem`)
    *   *Content Isolation*: Section grouping uses `space-y-5` with explicit margin-topper bounds.

---

## 2. Typography Rhythm Rules (Fluid Hierarchy)

Our typography system pairs an elegant editorial serif with a highly legible crisp sans-serif, using mathematically balanced line-heights to eliminate line-wrapping issues.

| Element Role | Style Token | Family | Font Scale (Tailwind) / Weight | Leading | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Level 1** | Hero Titles | Playfair Display | `text-3xl sm:text-4xl md:text-5xl` | `leading-[1.12]` | `tracking-tight font-medium` |
| **Section Title H2**| Grid Headers | Playfair Display | `text-2xl sm:text-3xl md:text-4xl` | `leading-[1.20]` | `tracking-tight font-medium` |
| **Section Annotations**| Category Pins | JetBrains Mono | `text-[10px] sm:text-xs` | `leading-none` | `tracking-wider uppercase font-bold` |
| **Interactive Headings** | Card Titles | Inter | `text-base sm:text-lg` | `leading-snug` | `tracking-wide font-semibold` |
| **Reading Narratives**| Body Copy | Inter | `text-xs sm:text-sm` | `leading-relaxed` | `tracking-normal` |
| **Action Targets** | Buttons / Badges | Inter | `text-[11px] sm:text-xs` | `leading-none` | `tracking-wider uppercase font-bold` |

*Typography Convention*: Whenever standard display levels are italicized (represented via Markdown `*italicized*` or CSS `italic`), they represent organic concepts like *Beauty*, *Youth*, *Glow*, and *Science*.

---

## 3. Image Proportions & Shape Rules

Images are structured under strict containment policies to ensure fast loading times (respecting Core Web Vitals) and stylized organic properties.

*   **The Leaf Aspect Ratio**:
    *   All portrait images employ a standard **`aspect-[4/5]`** ratio (e.g., width 400px by height 500px).
    *   All landscape images use a standard **`aspect-video`** (`aspect-[16/9]`) or **`aspect-[3/2]`** ratio.
*   **The Organic Leaf Mask (Fluid Border-Radius)**:
    *   To replicate fluid skincare drops and botanical leaves, portrait frames use asymmetric border-radii values:
        *   *Standard Leaf*: `rounded-[100px_40px_100px_40px]`
        *   *Opposing Leaf*: `rounded-[40px_100px_40px_100px]`
        *   *Standard Blob*: `rounded-[30%_70%_70%_30%]`
*   **Scale Containment**:
    *   Image elements must be wrapped inside a parent `div` marked `overflow-hidden` with a subtle default background (`bg-[#EAF3FA]`).
    *   Every image must use `object-cover w-full h-full` to prevent squishing.

---

## 4. Reusable Composition Systems & Layout Logic

Instead of hardcoded sections, all pages are composed of three highly adaptive layout skeletons.

### 4.1 AsymmetricSplit (The Leaf-Grid Split)
A classic high-contrast composition dividing screen estate between imagery and narratives.
*   **Desktop Structure**: 2-column flex or CSS Grid mapping a `50-50` or `40-60` ratio.
*   **Responsive Collapsing**: Content collapses to single columns on devices below `lg`.
*   **Media Treatment**: Holds an aspect `rounded` leaf portrait accompanied by a floating `GlowBadge` overlap.
*   **Flow Orientation Directive**: Left-to-right defaults. Supports mirror swapping (`reverse`) where media shifts to the left and copy to the right without modifying HTML elements.

```
+------------------------------------+------------------------------------+
|  [MONOSPACE ANNOTATION]            |                                    |
|                                    |            /============\          |
|  Display Editorial Serif Heading   |           /              \         |
|  With Beautiful *Italic Words*     |          /    Leaf-Mask   \        |
|                                    |         |    Portrait      |       |
|  Sophisticated body paragraphs ... |         |                  |       |
|                                    |          \   [GlowBadge]  /        |
|  +----------------+                |           \              /         |
|  | Chartreuse CTA |                |            \============/          |
|  +----------------+                |                                    |
+------------------------------------+------------------------------------+
```

### 4.2 Modular Grid Composites (The Bento & Isometric Cards)
Used to showcase benefits, packages, or steps.
*   **Mobile Standard**: 1 column (`grid-cols-1 gap-4`)
*   **Desktop Standard**: Adaptive grid configuration (`sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8`)
*   **Component Alignment**: Card items are self-contained flexbox models. Content aligns to the left by default.
*   **Icon Isolation**: Icons are housed in rounded circles with soft glowing borders (`bg-teal-500/5 text-[#0E9A92] border border-teal-500/10`).

### 4.3 FullBadgeRow & Multi-Column Footers
*   **Social Proof Brands List**: Auto-scrolling horizontal container or centered flex layouts. Items use a custom grayscale opacity filter (`opacity-40 grayscale contrast-150 hover:opacity-100 transition-opacity`).
*   **Responsive Matrix**: Transitions from single-row stacks into 4 columns (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`) on wider displays.

---

## 5. Normalized CSS-Tailwind Tokens

These explicit tokens are assigned directly as standard layouts variables in our systems:

```css
:root {
  /* Colors */
  --color-primary-teal: #0E9A92;   /* Key Brand Accent */
  --color-forest-teal: #0E2A24;    /* Deep Neutral Backdrops */
  --color-chartreuse: #D4F038;     /* High-contrast Action Target */
  --color-soft-mint: #F4FAF9;      /* Muted Pastel Backdrops */
  --color-lemon-bg: #EAF3FA;       /* Split Image Overlay Backdrop */
  
  /* Borders */
  --border-light: rgba(14, 154, 146, 0.12);
  --border-forest: rgba(14, 42, 36, 0.08);
}
```

---

## 6. Comprehensive Component Interactive Behaviors

Our component systems enforce strict interactive rules on mouse triggers, focus-states, and overlays.

### 6.1 Button Styles & Action States (CTA Behaviors)
*   **Brand Pill (Primary CTA)**:
    *   *CSS*: `bg-[#D4F038] hover:bg-[#c2dc2f] text-[#0E2A24] font-bold tracking-wider rounded-full shadow-lg shadow-[#D4F038]/10 hover:shadow-[#D4F038]/30 transition-all duration-300`
    *   *Touch Bounds*: Target padding matches `px-6 py-3.5` (never below 44px on mobile viewports).
*   **Forest Outline (Secondary CTA)**:
    *   *CSS*: `border border-[#0E2A24] hover:bg-[#0E2A24] text-[#0E2A24] hover:text-[#FFFFFF] transition-all duration-300 font-bold rounded-full`
*   **Text/Chevron Link**:
    *   *CSS*: `text-[#0E9A92] hover:text-[#0c827b] flex items-center gap-1.5 transition-all font-semibold font-sans`
    *   *Hover State*: Shift standard Chevron coordinate 4px to the right (`group-hover:translate-x-1 duration-200`).

### 6.2 Hover Effects
*   **Card Hover Springs**:
    *   *CSS*: `hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#0E9A92]/8 hover:border-[#0E9A92]/30 transition-all duration-300`
*   **Leaf Rotation Glow**:
    *   Skincare leaf masked illustrations undergo soft scaling shifts (`hover:scale-[1.025] transition-transform duration-500 ease-out`).
*   **Interactive Overlays**:
    *   Background overlays use a faint radial lighting accent in the background layer (`from-[#0E9A92]/4 to-transparent blur-3xl`).

### 6.3 Icon Usage & Semantic Labels
*   All icons must be loaded from standard **Lucide React** imports.
*   Icons are explicitly decorative; they are marked with `aria-hidden="true"` to prevent screen reader stuttering.
*   Every button containing only an icon must carry `aria-label="Action description"` attributes.

---

## 7. Responsive Normalization Rules
To secure fluid execution, visual logic incorporates the following rules:
1.  **Strict Fluid Scale Blocks**: Never declare fixed widths (e.g. `w-[640px]`) on container divs; instead, use Tailwind fluid constraints (`w-full max-w-xl lg:max-w-7xl mx-auto`).
2.  **Order Reversal (Desktop Flippable)**: Flex elements use `flex-col lg:flex-row` configurations with responsive order utilities (`order-first lg:order-last`) to ensure appropriate stacking on mobile screens.
3.  **Contrast Adherence**: Deep forest-accent elements (`#0E2A24`) must pair text with bright off-whites (`#F4FAF9` or `#FFFFFF`) to maintain accessible contrast margins (W3C AAA benchmark). Chartreuse buttons use solid `#0E2A24` text to ensure proper visibility.
