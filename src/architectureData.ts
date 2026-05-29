/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileNode, TenetDetail, CMSField } from './types';

export const FILE_TREE_DATA: FileNode = {
  name: "my-astro-project",
  type: "folder",
  path: "/",
  description: "Root level of the scalable Astro Multi-Page Architecture setup.",
  role: "Holds global compiler configurations, packages, and integration settings.",
  children: [
    {
      name: "src",
      type: "folder",
      path: "/src",
      description: "Development source directory containing all active compilation files.",
      role: "Core codebase directory where layouts, pages, components, and assets reside.",
      children: [
        {
          name: "content",
          type: "folder",
          path: "/src/content",
          description: "Astro's native type-safe Content Collections directory.",
          role: "Houses JSON content files and active schemas providing mock-free, CMS-ready data.",
          children: [
            {
              name: "config.ts",
              type: "file",
              path: "/src/content/config.ts",
              description: "Astro schema validation declaration using built-in Zod validator types.",
              role: "Enforces rigid static schema modeling over content JSONs to protect build-time compilation.",
              namingConvention: "PascalCase for schema variables, exported as standard collections mapping.",
              language: "typescript",
              codeSample: `import { defineCollection, z } from 'astro:content';

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().url().optional(),
  ogImage: z.string().optional(),
});

const heroSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  accentText: z.string().optional(),
  cta: z.object({
    text: z.string(),
    url: z.string(),
    variant: z.enum(['primary', 'secondary']),
  }),
});

const servicesSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  items: z.array(z.object({
    id: z.string(),
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    link: z.string(),
  })),
});

const pagesCollection = defineCollection({
  type: 'data', // Strict JSON reader compatibility
  schema: z.object({
    seo: seoSchema,
    hero: heroSchema.optional(),
    services: servicesSchema.optional(),
  }),
});

export const collections = {
  'pages': pagesCollection,
};`
            },
            {
              name: "pages",
              type: "folder",
              path: "/src/content/pages",
              description: "Structured page-by-page visual data folders containing localized copy.",
              role: "Abstracts text from designs, mapping page structures directly into static configurations.",
              children: [
                {
                  name: "home.json",
                  type: "file",
                  path: "/src/content/pages/home.json",
                  description: "Flat-file data source controlling home page representation.",
                  role: "Supplies decoupled textual data streams directly into index.astro sections.",
                  namingConvention: "snake_case or kebab-case file names, camelCase property keys.",
                  language: "json",
                  codeSample: `{
  "seo": {
    "title": "Astro Architecture Guide | Scale High",
    "description": "Production-ready boilerplate for multi-tier JSON-driven multipage Astro web ecosystems.",
    "keywords": ["astro", "scaffold", "typescript", "architecture"],
    "canonical": "https://architecture.example.com"
  },
  "hero": {
    "title": "Build Web Architectures Optimized for Decoupled CMS",
    "subtitle": "Discover modular structures tailored for extreme Core Web Vital metrics.",
    "accentText": "ARCHITECTURE BLUEPRINT v1.0",
    "cta": {
      "text": "Explore Blueprint Guide",
      "url": "#guide",
      "variant": "primary"
    }
  },
  "services": {
    "title": "Core Architectural Assets",
    "subtitle": "Highly structured subsystems created for immediate custom CMS integration.",
    "items": [
      {
        "id": "reusable-sections",
        "icon": "layers",
        "title": "Reusable Section Stripes",
        "description": "Autonomous full-width segments importing encapsulated layouts and isolated vanilla JS.",
        "link": "/services/sections"
      },
      {
        "id": "strict-schemas",
        "icon": "shield-check",
        "title": "Rigid Data Schemas",
        "description": "Zod-driven content type maps preventing invalid publishing inputs or runtime crashes.",
        "link": "/services/security"
      }
    ]
  }
}`
                }
              ]
            }
          ]
        },
        {
          name: "layouts",
          type: "folder",
          path: "/src/layouts",
          description: "Declarative global structural frameworks and container units.",
          role: "Houses reusable, type-safe Astro layouts and wrapping blocks driving isomorphic assemblies.",
          children: [
            {
              name: "BaseLayout.astro",
              type: "file",
              path: "/src/layouts/BaseLayout.astro",
              description: "HTML boilerplate encapsulating head, script triggers, and global imports.",
              role: "Ultimate master document framework containing HTML headers and metadata mappings.",
              namingConvention: "PascalCase with .astro extension.",
              language: "astro",
              codeSample: `---
import '../styles/main.scss';
import MetaTags from '../components/seo/MetaTags.astro';
interface Props {
  seo: { title: string; description: string; canonical?: string; };
}
const { seo } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <MetaTags {...seo} />
  </head>
  <body class="js-body bg-[#080c14] text-slate-100">
    <slot />
  </body>
</html>`
            },
            {
              name: "MainLayout.astro",
              type: "file",
              path: "/src/layouts/MainLayout.astro",
              description: "Reusable multi-page outer wrapper including Header navigation and Footer elements.",
              role: "Structures general application frames consistently across separate modules.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
import BaseLayout from './BaseLayout.astro';
import Header from '../components/navigation/Header.astro';
import Footer from '../components/navigation/Footer.astro';

interface Props {
  seo: { title: string; description: string; };
  showHeader?: boolean;
  showFooter?: boolean;
}
const { seo, showHeader = true, showFooter = true } = Astro.props;
---
<BaseLayout seo={seo}>
  {showHeader && <Header />}
  <main id="main-content" class="l-main-wrapper flex-1">
    <slot />
  </main>
  {showFooter && <Footer />}
</BaseLayout>`
            },
            {
              name: "PageLayout.astro",
              type: "file",
              path: "/src/layouts/PageLayout.astro",
              description: "Structured inner page framework managing breadcrumbs, section columns, and sidebar regions.",
              role: "Coordinates default page bodies, centering headings and providing asymmetrical layout grids.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
import MainLayout from './MainLayout.astro';
interface Props {
  title: string;
  description?: string;
  showBreadcrumbs?: boolean;
}
const { title, description, showBreadcrumbs = true } = Astro.props;
---
<div class="l-page-container py-8 px-6 space-y-6">
  {showBreadcrumbs && (
    <nav class="text-xs text-slate-500 font-mono">
      <span>workspace</span> / <span class="text-cyan-400">layouts</span>
    </nav>
  )}
  <header class="l-page-header space-y-2 border-b border-slate-800 pb-5">
    <h1 class="text-2xl font-bold text-white tracking-tight">{title}</h1>
    {description && <p class="text-sm text-slate-400">{description}</p>}
  </header>
  <div class="l-page-body">
    <slot />
  </div>
</div>`
            },
            {
              name: "SectionWrapper.astro",
              type: "file",
              path: "/src/layouts/SectionWrapper.astro",
              description: "Standardized horizontal striping wrapper defining standardized fluid clamp paddings.",
              role: "Enforces consistent background themes and dynamic vertical gaps without margin leakage.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
interface Props {
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'accent';
  id?: string;
}
const { paddingTop = 'm', paddingBottom = 'm', bgType = 'primary', id } = Astro.props;
---
<section id={id} class:list={[
  'l-section',
  \`l-section--bg-\${bgType}\`,
  \`pt-\${paddingTop}\`,
  \`pb-\${paddingBottom}\`
]}>
  <slot />
</section>`
            },
            {
              name: "ContentWrapper.astro",
              type: "file",
              path: "/src/layouts/ContentWrapper.astro",
              description: "A11y-approved content limits centering segments inside responsive grid margins.",
              role: "Eliminates visual width blowouts by clamping content column sizes based on structural standard sizes.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
interface Props {
  maxWidth?: 'ch' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  theme?: 'default' | 'glass' | 'dim';
}
const { maxWidth = 'lg', theme = 'default' } = Astro.props;
---
<div class:list={[
  'l-content-container mx-auto px-4 sm:px-6 w-full',
  \`l-content-container--max-\${maxWidth}\`,
  \`l-content-container--theme-\${theme}\`
]}>
  <slot />
</div>`
            },
            {
              name: "HeroLayout.astro",
              type: "file",
              path: "/src/layouts/HeroLayout.astro",
              description: "High impact visual landing block holding title banners and adaptive alignment styles.",
              role: "Handles marketing titles and responsive calls to action with extreme spacing integrity.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
import Button from '../components/base/Button.astro';
interface Props {
  accentText?: string;
  title: string;
  subtitle?: string;
  ctas?: Array<{ text: string; url: string; variant: string; }>;
}
const { accentText, title, subtitle, ctas } = Astro.props;
---
<div class="l-hero-block relative p-8 sm:p-16 border rounded-2xl bg-gradient-to-br from-[#0c1224] to-[#040811] overflow-hidden text-center">
  {accentText && <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-4">{accentText}</span>}
  <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
  {subtitle && <p class="text-sm text-slate-300 mt-3 max-w-2xl mx-auto">{subtitle}</p>}
  <div class="mt-6 flex justify-center gap-3">
    {ctas?.map(cta => <Button href={cta.url}>{cta.text}</Button>)}
  </div>
</div>`
            },
            {
              name: "SplitLayout.astro",
              type: "file",
              path: "/src/layouts/SplitLayout.astro",
              description: "Double-column asymmetric display system collapsing smoothly on mobile frames.",
              role: "Presents side-by-side marketing or interactive media features without duplicate CSS rules.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
interface Props {
  ratio?: '50-50' | '60-40' | '40-60';
  reverse?: boolean;
}
const { ratio = '50-50', reverse = false } = Astro.props;
---
<div class:list={[
  'l-split-layout grid gap-8 items-center',
  \`l-split-layout--ratio-\${ratio}\`,
  { 'l-split-layout--reverse': reverse }
]}>
  <div class="l-split-slot"><slot name="left" /></div>
  <div class="l-split-slot"><slot name="right" /></div>
</div>`
            },
            {
              name: "GridLayout.astro",
              type: "file",
              path: "/src/layouts/GridLayout.astro",
              description: "Flexible isometric column grid with configurable grid gaps and columns count.",
              role: "Creates repeatable structures supporting multiple column profiles safely.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
interface Props {
  columns?: 1 | 2 | 3 | 4 | 6;
  gapSize?: 'xs' | 's' | 'm' | 'l' | 'xl';
}
const { columns = 3, gapSize = 'm' } = Astro.props;
---
<div class:list={[
  'l-grid-layout grid',
  \`l-grid-layout--cols-\${columns}\`,
  \`l-grid-layout--gap-\${gapSize}\`
]}>
  <slot />
</div>`
            },
            {
              name: "CtaLayout.astro",
              type: "file",
              path: "/src/layouts/CtaLayout.astro",
              description: "Highly focused conversions stripe supporting clean action buttons and custom frames.",
              role: "Standardizes engagement loops, preventing scattered CTA microstyles.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
interface Props {
  title: string;
  subtitle?: string;
  ctas: Array<{ text: string; url: string; variant?: string; }>;
}
const { title, subtitle, ctas } = Astro.props;
---
<div class="l-cta bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-4">
  <h3 class="text-xl font-bold text-white">{title}</h3>
  {subtitle && <p class="text-xs text-slate-400">{subtitle}</p>}
  <div class="flex justify-center gap-3">
    {ctas.map(cta => <a href={cta.url} class="px-4 py-2 bg-cyan-400 text-slate-950 rounded font-bold text-xs">{cta.text}</a>)}
  </div>
</div>`
            },
            {
              name: "FaqLayout.astro",
              type: "file",
              path: "/src/layouts/FaqLayout.astro",
              description: "Structured accordions stack for safe layout parsing from headless schema files.",
              role: "Represents expandable QA items supporting continuous search index SEO tags.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
interface Props {
  title?: string;
  items: Array<{ question: string; answer: string; }>;
}
const { title, items } = Astro.props;
---
<div class="l-faq space-y-6">
  {title && <h2 class="text-xl font-bold text-white text-center">{title}</h2>}
  <div class="l-faq-accordion border border-slate-800 divide-y rounded-xl overflow-hidden">
    {items.map(item => (
      <details class="group p-4 bg-slate-900/40 font-sans">
        <summary class="list-none flex justify-between font-bold text-xs sm:text-sm text-white cursor-pointer select-none">
          {item.question}
        </summary>
        <p class="mt-3 text-xs text-slate-350 leading-relaxed">{item.answer}</p>
      </details>
    ))}
  </div>
</div>`
            },
            {
              name: "PricingLayout.astro",
              type: "file",
              path: "/src/layouts/PricingLayout.astro",
              description: "Structured grid frame holding comparative cards with popular highlight tags.",
              role: "Presents product plans side-by-side using unified layouts mapping.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
interface Props {
  title?: string;
  plans: Array<{ planName: string; price: string; features: string[]; ctaText: string; }>;
}
const { title, plans } = Astro.props;
---
<div class="l-pricing space-y-8">
  {title && <h2 class="text-center font-bold text-white">{title}</h2>}
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {plans.map(p => (
      <div class="border border-slate-800 bg-slate-950 p-6 rounded-2xl flex flex-col justify-between">
        <h4 class="text-xs text-cyan-400 uppercase font-bold">{p.planName}</h4>
        <div class="text-xl text-white font-mono font-bold mt-2">{p.price}</div>
        <ul class="text-xs text-slate-400 space-y-2 mt-4 flex-1">
          {p.features.map(f => <li>{f}</li>)}
        </ul>
        <button class="w-full mt-6 bg-cyan-400 text-slate-950 py-2 rounded text-xs font-bold">{p.ctaText}</button>
      </div>
    ))}
  </div>
</div>`
            },
            {
              name: "TestimonialLayout.astro",
              type: "file",
              path: "/src/layouts/TestimonialLayout.astro",
              description: "Review matrix rendering client feedback quotes and star assessments elegantly.",
              role: "Encapsulates high-credibility proof segments, ensuring extreme responsiveness.",
              namingConvention: "PascalCase",
              language: "astro",
              codeSample: `---
interface Props {
  title?: string;
  items: Array<{ quote: string; authorName: string; authorRole?: string; }>;
}
const { title, items } = Astro.props;
---
<div class="l-testimonials space-y-8">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {items.map(item => (
      <div class="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl flex flex-col justify-between">
        <p class="text-xs text-slate-300 italic">"{item.quote}"</p>
        <div class="border-t border-slate-900 pt-4 mt-4">
          <h4 class="text-xs text-white leading-none">{item.authorName}</h4>
          <span class="text-[9px] text-slate-500">{item.authorRole}</span>
        </div>
      </div>
    ))}
  </div>
</div>`
            }
          ]
        },
        {
          name: "sections",
          type: "folder",
          path: "/src/sections",
          description: "Page-level horizontal layout sectors. These are isolated structural entities.",
          role: "Contains structural compositions (e.g. Hero, Accordion, Contact Form) loaded via dynamic parameters.",
          children: [
            {
              name: "hero",
              type: "folder",
              path: "/src/sections/hero",
              description: "Design-isolated hero segment domain wrapper.",
              role: "Encapsulates visuals, typography, and scroll behaviors related to landing banners.",
              children: [
                {
                  name: "HeroSection.astro",
                  type: "file",
                  path: "/src/sections/hero/HeroSection.astro",
                  description: "Rich custom-rendered layout incorporating localized animations.",
                  role: "Pulls text components and triggers viewport interactions with full separation of text structure.",
                  namingConvention: "PascalCase suffixing Section.astro (e.g., ServicesGridSection.astro).",
                  language: "astro",
                  codeSample: `---
import Button from '../../components/base/Button.astro';

interface Props {
  data: {
    title: string;
    subtitle?: string;
    accentText?: string;
    cta?: {
      text: string;
      url: string;
      variant: 'primary' | 'secondary';
    };
  };
}

const { data } = Astro.props;
---
<section class="s-hero" aria-labelledby="hero-title" id="hero-segment">
  <div class="s-hero__container">
    <div class="s-hero__content-group">
      {data.accentText && (
        <span class="s-hero__label text-xs tracking-widest uppercase text-muted-600">
          {data.accentText}
        </span>
      )}
      <h1 class="s-hero__title" id="hero-title">
        {data.title}
      </h1>
      {data.subtitle && (
        <p class="s-hero__subtitle text-md max-w-xl self-center leading-relaxed">
          {data.subtitle}
        </p>
      )}
      {data.cta && (
        <div class="s-hero__btn-group">
          <Button href={data.cta.url} variant={data.cta.variant}>
            {data.cta.text}
          </Button>
        </div>
      )}
    </div>
  </div>
</section>

<script>
  // Dynamic client-side reactive animations with decoupled scripts
  const heroSection = document.getElementById('hero-segment');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('s-hero--in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(heroSection);
  }
</script>

<style lang="scss">
  // Nested layout specific scoped overrides
  .s-hero {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    
    &--in-view {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>`
                }
              ]
            }
          ]
        },
        {
          name: "components",
          type: "folder",
          path: "/src/components",
          description: "Decoupled global atomic utilities. Pure layouts avoiding domain knowledge.",
          role: "Houses primitive variables (Buttons, Cards, Inputs) styled cleanly via nested rulesets.",
          children: [
            {
              name: "base",
              type: "folder",
              path: "/src/components/base",
              description: "Universal design system design objects.",
              role: "Components that don't depend on page context. Ready for pure style configurations.",
              children: [
                {
                  name: "Button.astro",
                  type: "file",
                  path: "/src/components/base/Button.astro",
                  description: "Standard action button with dynamic properties.",
                  role: "Renders as anchor tag or standard button based on attribute targets.",
                  namingConvention: "Simple noun PascalCase wrapper (e.g. Card.astro, Input.astro).",
                  language: "astro",
                  codeSample: `---
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  id?: string;
  [key: string]: any; // Catch-all for data attributes (SEO/Analytics mapping)
}

const { 
  href, 
  variant = 'primary', 
  type = 'button', 
  className = '', 
  id,
  ...attributes 
} = Astro.props;

const classNames = [\`c-btn\`, \`c-btn--\${variant}\`, className].filter(Boolean).join(' ');
---
{href ? (
  <a href={href} class={classNames} id={id} {...attributes}>
    <slot />
  </a>
) : (
  <button type={type} class={classNames} id={id} {...attributes}>
    <slot />
  </button>
)}`
                }
              ]
            }
          ]
        },
        {
          name: "styles",
          type: "folder",
          path: "/src/styles",
          description: "Global system styles written in modular nested SCSS.",
          role: "Maintains brand consistency from abstract design tokens to clean CSS utilities.",
          children: [
            {
              name: "abstract",
              type: "folder",
              path: "/src/styles/abstract",
              description: "Non-compiling SCSS definitions holding design systems tokens, mixins, and mathematical conversion utilities.",
              role: "Holds variables, mixins, and mathematical layout functions without generating direct layout overhead.",
              children: [
                {
                  name: "_variables.scss",
                  type: "file",
                  path: "/src/styles/abstract/_variables.scss",
                  description: "Centralized configuration token variables. Implements colors, shadows, fluid typography curves, global z-indices, and responsive breakpoint lists.",
                  role: "Hosts spacing scales, fluid base layout sizing, consistent color palettes.",
                  namingConvention: "snake_case prefixed with _ for import restriction.",
                  language: "css",
                  codeSample: `// ==========================================================================
// SCSS DESIGN SYSTEM VARIABLES & DESIGN TOKENS
// ==========================================================================

:root {
  // --- COLOR SYSTEM (W3C Contrast Level AA Compliant System Tokens) ---
  --clr-bg-primary: #080c14;
  --clr-bg-secondary: #0d1222;
  --clr-bg-tertiary: #141b30;
  
  --clr-text-primary: #f8fafc;
  --clr-text-secondary: #94a3b8;
  --clr-text-muted: #64748b;
  
  --clr-brand-accent: #00e5ff;
  --clr-brand-accent-hover: #00b3cc;
  --clr-brand-accent-glow: rgba(0, 229, 255, 0.15);
  
  --clr-semantic-err: #ef4444;
  --clr-semantic-ok: #10b981;
  --clr-semantic-warn: #f59e0b;
  --clr-border-muted: #1e293b;
  --clr-border-vibrant: #334155;

  // --- FLUID SPACING SCALE (Utopia.fyi Formula - Base: 16px) ---
  // Fluidly scales spacing variables between 320px viewport and 1280px viewport
  --space-3xs: clamp(0.25rem, 0.23rem + 0.1vw, 0.375rem);   // 4px -> 6px
  --space-2xs: clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem);   // 8px -> 12px
  --space-xs: clamp(0.75rem, 0.7rem + 0.25vw, 1rem);       // 12px -> 16px
  --space-s: clamp(1rem, 0.9rem + 0.5vw, 1.5rem);          // 16px -> 24px
  --space-m: clamp(1.5rem, 1.3rem + 1vw, 2.5rem);          // 24px -> 40px
  --space-l: clamp(2rem, 1.8rem + 1.25vw, 3.5rem);         // 32px -> 56px
  --space-xl: clamp(3rem, 2.6rem + 2vw, 5rem);             // 48px -> 80px
  --space-xxl: clamp(4.5rem, 3.8rem + 3.5vw, 8rem);        // 72px -> 128px

  // --- BORDER RADIUS SCALE ---
  --radius-xs: 0.25rem;     // 4px
  --radius-sm: 0.375rem;    // 6px
  --radius-md: 0.5rem;      // 8px
  --radius-lg: 0.75rem;     // 12px
  --radius-xl: 1rem;        // 16px
  --radius-full: 9999px;

  // --- SHADOW SCALE ---
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 25px var(--clr-brand-accent-glow);

  // --- TRANSITIONS SYSTEM ---
  --transition-timing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-timing-entrance: cubic-bezier(0.16, 1, 0.3, 1); // custom out-quint
  --transition-duration-fast: 150ms;
  --transition-duration-normal: 250ms;
  --transition-duration-slow: 400ms;
}

// --- SCSS VARIABLE WRAPPERS & MAPS ---
$grid-max-width: 80rem !default; // 1280px

// Standardized Breakpoint Map (Responsive Systems)
$breakpoints: (
  "sm": 36rem,     // 576px
  "md": 48rem,     // 768px
  "lg": 64rem,     // 1024px
  "xl": 80rem,     // 1280px
  "xxl": 96rem     // 1536px
) !default;

// Standardized Z-Index Stack Matrix (A11y & Layer Controls)
$z-indices: (
  "below": -1,
  "base": 1,
  "header": 100,
  "sticky": 200,
  "dropdown": 300,
  "overlay": 400,
  "modal": 500,
  "tooltip": 1000
) !default;`
                },
                {
                  name: "_mixins.scss",
                  type: "file",
                  path: "/src/styles/abstract/_mixins.scss",
                  description: "Global design system mixins. Houses media query generators, flex/grid templates, relative z-index pullers, accessibility focus outlines, and fluid typography engines.",
                  role: "Supplies reusable style macros to components, eliminating duplicate layouts.",
                  namingConvention: "snake_case prefixed with _.",
                  language: "css",
                  codeSample: `// ==========================================================================
// SCSS CENTRAL DESIGN MIXINS
// ==========================================================================

// 1. Breakpoint Media Query Engine
// Syntactic wrapper protecting mobile-first cascade properties
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn "Unknown breakpoint lookup ID: '#{$breakpoint}'. Check variables map definitions.";
  }
}

// 2. Consistent Fluid Typography Mixin
// Formula mapping proportional text dimensions linearly using modern clamps
@mixin fluid-type($min-size, $max-size, $min-width: 320px, $max-width: 1280px) {
  $slope: calc(($max-size - $min-size) / ($max-width - $min-width));
  $y-intercept: $min-size - $slope * $min-width;
  font-size: clamp(#{$min-size}, #{$y-intercept} + #{$slope * 100}vw, #{$max-size});
}

// 3. Structured Layering Matrix (Z-index mapping)
@mixin z-layer($layer) {
  @if map-has-key($z-indices, $layer) {
    z-index: map-get($z-indices, $layer);
  } @else {
    @warn "Layer option '#{$layer}' is not declared in variables mapping. Falling back to default layout stack.";
    z-index: 1;
  }
}

// 4. Flex Alignment Shorthand
@mixin flex-container($direction: row, $justify: flex-start, $align: center, $gap: null) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  @if $gap {
    gap: $gap;
  }
}

// 5. Accessible Outline (Keyboard focus fallback styles)
@mixin a11y-focus-ring {
  outline: 2px solid var(--clr-brand-accent);
  outline-offset: 4px;
}

// 6. Complete Card Micro-Behaviors (Hover interactions)
@mixin interaction-glare {
  transition: transform var(--transition-duration-normal) var(--transition-timing-entrance),
              border-color var(--transition-duration-normal) var(--transition-timing-standard),
              box-shadow var(--transition-duration-normal) var(--transition-timing-standard);
  
  &:hover {
    transform: translateY(-4px);
    border-color: var(--clr-brand-accent);
    box-shadow: var(--shadow-lg), var(--shadow-glow);
  }
}`
                },
                {
                  name: "_functions.scss",
                  type: "file",
                  path: "/src/styles/abstract/_functions.scss",
                  description: "Centralized math conversion operations. Custom calculations converting px inputs to stable accessibility rem units and calculating dynamic contrast rates.",
                  role: "Ensures numeric inputs scale properly without rigid desktop px dimensions.",
                  namingConvention: "snake_case prefixed with _.",
                  language: "css",
                  codeSample: `// ==========================================================================
// SCSS DESIGN HELPER FUNCTIONS
// ==========================================================================

// 1. px to rem conversion calculator
// Guarantees text blocks adapt when browsers zoom/modify root dimensions
@function rem($pixels, $base: 16) {
  @if (unitless($pixels)) {
    @return calc($pixels / $base) * 1rem;
  } @else {
    @return calc(de-unit($pixels) / $base) * 1rem;
  }
}

// 2. px to em conversion calculator
// Useful for fluid margin, borders, and local component modifiers
@function em($pixels, $base: 16) {
  @if (unitless($pixels)) {
    @return calc($pixels / $base) * 1em;
  } @else {
    @return calc(de-unit($pixels) / $base) * 1em;
  }
}

// 3. Private helper: strip unit formatting from integers
@function de-unit($number) {
  @if type-of($number) == 'number' and not unitless($number) {
    @return calc($number / ($number * 0 + 1));
  }
  @return $number;
}

// 4. Retrieve Nested Color Map values safely
@function theme-color($key, $strength: 500) {
  @return var(--clr-brand-#{$key}-#{$strength});
}`
                }
              ]
            },
            {
              name: "base",
              type: "folder",
              path: "/src/styles/base",
              description: "Core element reset configurations and default tag typography structures.",
              role: "Provides styling parameters on general HTML nodes preventing cross-browser rendering shifts.",
              children: [
                {
                  name: "_reset.scss",
                  type: "file",
                  path: "/src/styles/base/_reset.scss",
                  description: "Universal tag reset files. Modern resets overrides eliminating default paddings, ensuring universal box-sizing, and supporting user accessibility preferences (reduced-motion).",
                  role: "Cleans styling behaviors on basic browsers nodes to protect rendering consistency.",
                  namingConvention: "snake_case prefixed with _.",
                  language: "css",
                  codeSample: `// ==========================================================================
// GLOBAL TARGET ELEMENTS RESET SCSS
// ==========================================================================

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  // Safe responsive baseline
  font-size: 100%;
  scroll-behavior: smooth;
  height: -webkit-fill-available;
}

body {
  background-color: var(--clr-bg-primary);
  color: var(--clr-text-primary);
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 1.6;
  text-rendering: optimizeSpeed;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Core node resets for components styling safety
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

a {
  color: inherit;
  text-decoration: none;
  
  &:focus-visible {
    @include a11y-focus-ring;
  }
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
  
  &:focus-visible {
    @include a11y-focus-ring;
  }
}

// --- ACCESSIBILITY RULES: REDUCED MOTION PREFERENCES ---
// Instantly eliminates intensive transitions for motion-sensitive users
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto !important;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`
                },
                {
                  name: "_typography.scss",
                  type: "file",
                  path: "/src/styles/base/_typography.scss",
                  description: "Central typography element files. Establishes fluid display text clamps, line-height boundaries, and spacing overrides on structural nodes (H1-H6, paragraph, blocks).",
                  role: "Ensures type scales align cleanly across viewport size ranges.",
                  namingConvention: "snake_case prefixed with _.",
                  language: "css",
                  codeSample: `// ==========================================================================
// SYSTEM TYPOGRAPHY RULES
// ==========================================================================

h1, .u-text-h1 {
  @include fluid-type(2rem, 3.75rem); // Fluid scales from 32px to 60px
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.025em;
}

h2, .u-text-h2 {
  @include fluid-type(1.5rem, 2.5rem); // Fluid scales from 24px to 40px
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

h3, .u-text-h3 {
  @include fluid-type(1.25rem, 1.875rem); // Fluid scales from 20px to 30px
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

h4, .u-text-h4 {
  font-size: clamp(1.1rem, 1rem + 0.5vw, 1.35rem);
  font-weight: 600;
  line-height: 1.4;
}

p, .u-text-body {
  font-size: clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem);
  color: var(--clr-text-secondary);
  line-height: 1.625;
  
  // W3C reading boundary optimization rule
  max-width: 75ch; 
  
  &:not(:last-child) {
    margin-bottom: var(--space-s);
  }
}

.u-text-caption {
  font-size: rem(13);
  color: var(--clr-text-muted);
  font-weight: 500;
}

.u-font-mono {
  font-family: var(--font-mono);
  letter-spacing: -0.01em;
}`
                }
              ]
            },
            {
              name: "layout",
              type: "folder",
              path: "/src/styles/layout",
              description: "Structural viewport controls including strict page grids and layout constraints.",
              role: "Coordinates relative placement vectors across high-level segments.",
              children: [
                {
                  name: "_grid.scss",
                  type: "file",
                  path: "/src/styles/layout/_grid.scss",
                  description: "Grid and Container controls. Orchestrates max margins, layout buffers, multi-span responsive templates, and modern CSS Grid architectures.",
                  role: "Ensures container grids align cleanly across flexible displays.",
                  namingConvention: "snake_case prefixed with _.",
                  language: "css",
                  codeSample: `// ==========================================================================
// SCALABLE GRID & CONTAINER SYSTEM
// ==========================================================================

// Centered viewport frame bounds
.l-container {
  width: 100%;
  max-width: $grid-max-width;
  margin-left: auto;
  margin-right: auto;
  
  // Adaptive inline cushions feeding from variable fluid scales
  padding-left: var(--space-s);
  padding-right: var(--space-s);
  
  @include respond-to("md") {
    padding-left: var(--space-m);
    padding-right: var(--space-m);
  }
}

// 12-Column Responsive CSS Grid
.l-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--space-s);
  
  @include respond-to("md") {
    gap: var(--space-m);
  }
}

// Generic Column Spans matching modern layouts
@for $i from 1 through 12 {
  .l-col-#{$i} {
    grid-column: span 12; // Mobile baseline
    
    @include respond-to("md") {
      grid-column: span #{$i};
    }
  }
}

// Bento Grid Layout Helper
.l-bento {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-s);
  
  @include respond-to("md") {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-m);
  }
  
  &__span-2 {
    @include respond-to("md") {
      grid-column: span 2;
    }
  }
}`
                }
              ]
            },
            {
              name: "components",
              type: "folder",
              path: "/src/styles/components",
              description: "Styling declarations for low-level modular cards and buttons.",
              role: "Holds core styling for components.",
              children: [
                {
                  name: "_button.scss",
                  type: "file",
                  path: "/src/styles/components/_button.scss",
                  description: "Action component styles. Defines the baseline `.c-btn` classes, sizing scales, and variations.",
                  role: "Establishes button component styling rules.",
                  language: "css",
                  codeSample: `/* BUTTON STYLING SPECS */`
                }
              ]
            },
            {
              name: "utilities",
              type: "folder",
              path: "/src/styles/utilities",
              description: "Reusable helper classes executing atomic overrides.",
              role: "Holds utility class configurations.",
              children: [
                {
                  name: "_utilities.scss",
                  type: "file",
                  path: "/src/styles/utilities/_utilities.scss",
                  description: "Helper class blueprints. Defines a11y visual hiding rules, responsive spacing increments, display controls, and alignment vectors.",
                  role: "Forces atomic design rules.",
                  namingConvention: "snake_case prefixed with _.",
                  language: "css",
                  codeSample: `// ==========================================================================
// SYSTEM ATOMIC HYPER OVERRIDES
// ==========================================================================

// --- ACCESSIBILITY GUIDELINE: HIGH-CONTRAST SCREEN READERS ONLY ---
// Standard W3C visually hidden configuration protecting keyboard flow
.u-visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

// Display Modifications
.u-display-none { display: none !important; }
.u-display-block { display: block !important; }

// Alignment overrides
.u-text-center { text-align: center !important; }
.u-text-left { text-align: left !important; }
.u-text-right { text-align: right !important; }

// Brand Visual Accents
.u-accent-text {
  color: var(--clr-brand-accent) !important;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
}

// Spacing Utilities
.u-margin-b-xs { margin-bottom: var(--space-xs) !important; }
.u-margin-b-s  { margin-bottom: var(--space-s) !important; }
.u-margin-b-m  { margin-bottom: var(--space-m) !important; }
.u-margin-b-l  { margin-bottom: var(--space-l) !important; }

.u-padding-y-m {
  padding-top: var(--space-m) !important;
  padding-bottom: var(--space-m) !important;
}
.u-padding-y-xl {
  padding-top: var(--space-xl) !important;
  padding-bottom: var(--space-xl) !important;
}`
                }
              ]
            },
            {
              name: "animations",
              type: "folder",
              path: "/src/styles/animations",
              description: "Hardware accelerated viewport transition animations.",
              role: "Stores base viewport animations.",
              children: [
                {
                  name: "_animations.scss",
                  type: "file",
                  path: "/src/styles/animations/_animations.scss",
                  description: "Viewport animation layers. Defines standard motion frames, custom spring entries, keyframes overrides, and modular intersection timing parameters.",
                  role: "Powers responsive web transitions safely.",
                  namingConvention: "snake_case prefixed with _.",
                  language: "css",
                  codeSample: `// ==========================================================================
// CENTRAL KEYFRAMES & ACCELERATED ANIMATIONS
// ==========================================================================

// 1. Hardware accelerated fade-and-slide up transitions
@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(rem(16));
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spinInfinite {
  100% {
    transform: rotate(360deg);
  }
}

// 2. Class Definitions utilizing standard timing curves
.u-anim-fade-up {
  opacity: 0;
  animation: fadeSlideUp var(--transition-duration-slow) var(--transition-timing-entrance) forwards;
  
  &--delay-1 { animation-delay: 100ms; }
  &--delay-2 { animation-delay: 200ms; }
  &--delay-3 { animation-delay: 300ms; }
}

// 3. Dynamic Glow animation cycles
@keyframes breatheArc {
  0%, 100% {
    opacity: 0.5;
    box-shadow: 0 0 10px var(--clr-brand-accent-glow);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 25px var(--clr-brand-accent-glow), 0 0 40px var(--clr-brand-accent-glow);
  }
}`
                }
              ]
            },
            {
              name: "main.scss",
              type: "file",
              path: "/src/styles/main.scss",
              description: "The primary stylesheet compiler hook importing configurations.",
              role: "Stitches abstracts, core reset elements, layouts, and components into one efficient styling asset.",
              language: "css",
              codeSample: `// STYLESHEET ENTRYPOINT
// Ordered imports establishing complete cascade context
@import "abstract/variables";
@import "abstract/mixins";
@import "abstract/functions";

// Core resets
@import "base/reset";
@import "base/typography";

// Viewport Structure
@import "layout/grid";

// Component namespaces mapping
@import "components/button";

// Utility & Animations rules
@import "utilities/utilities";
@import "animations/animations";`
            }
          ]
        },
        {
          name: "pages",
          type: "folder",
          path: "/src/pages",
          description: "Astro's file-based static routing layer.",
          role: "Compiles page layouts using schema data. Connects structural Astro templates directly to JSON contents.",
          children: [
            {
              name: "index.astro",
              type: "file",
              path: "/src/pages/index.astro",
              description: "Home page routing engine pulling home.json parameters.",
              role: "Combines SEO metadata blocks, assembles the Hero Section, and builds visual layouts cleanly.",
              language: "astro",
              codeSample: `---
import { getEntry } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import HeroSection from '../sections/hero/HeroSection.astro';
import ServicesGrid from '../components/base/Card.astro'; // maps services card

// Pure data extraction ensuring zero design hard-coding
const homeData = await getEntry('pages', 'home');
const { seo, hero, services } = homeData.data;
---
<BaseLayout seo={seo}>
  {hero && <HeroSection data={hero} />}
  
  {services && (
    <section class="s-services text-center py-20 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold tracking-tight mb-4">{services.title}</h2>
        {services.subtitle && <p class="text-gray-400 mb-12">{services.subtitle}</p>}
        
        <div class="grid md:grid-cols-2 gap-8">
          {services.items.map((item) => (
            <div class="c-card p-6 rounded-lg text-left border border-gray-800 bg-black/40">
              <span class="text-cyan-400 font-mono mb-2 block font-medium">{item.icon}</span>
              <h3 class="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p class="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>
              <a href={item.link} class="text-sm font-semibold tracking-wider text-cyan-400 hover:underline">Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )}
</BaseLayout>`
            }
          ]
        }
      ]
    },
    {
      name: "astro.config.mjs",
      type: "file",
      path: "/astro.config.mjs",
      description: "Astro project core compiler configuration compiler settings.",
      role: "Declares modern integrations (like sitemap engines, SCSS preprocessor setups, and asset outputs).",
      namingConvention: "camelCase, matching default Astro setups.",
      language: "typescript",
      codeSample: `import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://architecture.example.com',
  integrations: [sitemap()],
  output: 'static', // Strictly pre-rendered optimized HTML assets
  compressHTML: true, // Auto-minify HTML blocks for performance optimization
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: \`@import "src/styles/abstract/variables"; @import "src/styles/abstract/mixins";\`
          // Keeps common variables and mixins accessible universally in astro design scopes
        }
      }
    }
  }
});`
    }
  ]
};

export const TENET_DETAILS: TenetDetail[] = [
  {
    id: "naming-conventions",
    title: "1. Naming Conventions & Structure",
    shortDesc: "Standardized rulesets keeping assets fully discoverable by teams and automated frameworks.",
    fullExplanation: "A clean architectural blueprint demands semantic consistency to remain highly readable. All styles adopt the block-element-modifier (BEM) namespace. Every design system block uses prefix separation (c- for low-level components, s- for high-level full-width stripes, and u- for utility modifications). File trees split structural shells cleanly from markdown and schemas.",
    keyStandards: [
      "No direct lowercase files for components (e.g. use BaseLayout.astro instead of baselayout.astro).",
      "SCSS partial assets strictly require the underscore prefix (`_variables.scss`).",
      "Always export typescript models and interfaces from types.ts to make definitions universal."
    ],
    bestPractices: [
      "Namespace layout templates inside `/src/layouts/` and UI objects inside `/src/components/`.",
      "Decouple text components from Astro layout codes by importing properties directly from data JSONs."
    ],
    codeTemplate: {
      title: "SCSS BEM Structuring Pattern",
      language: "css",
      code: `/* DESIGN COMPONENT ACCORDION BLOCK */
.c-accordion {
  width: 100%;
  border-radius: var(--radius-m);
  border: 1px solid var(--clr-border);

  &__item {
    border-bottom: 1px solid var(--clr-border-muted);
    
    &:last-child {
      border-bottom: none;
    }
  }

  &__trigger {
    display: flex;
    justify-content: space-between;
    padding: var(--space-m);
    font-weight: 600;
    cursor: pointer;
    background: transparent;
  }

  &__panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    
    // Element active modifier state
    &--expanded {
      max-height: 100%;
    }
  }
}`
    }
  },
  {
    id: "component-strategy",
    title: "2. Component Strategy",
    shortDesc: "Low-level atomic building blocks that accept data payloads without business context.",
    fullExplanation: "Astro components are divided into pure atoms and layout blocks. Atoms (e.g. Buttons, Cards, Inputs, MetaTags) maintain strict visual parameters but lack logic or hardcoded strings. They use strict TypeScript type boundaries defining exactly which arguments they support.",
    keyStandards: [
      "Declare standard typescript interface 'Props' on every component to enforce type compliance.",
      "Support standard React/Astro slot elements `<slot />` inside items targeting composition instead of hard values.",
      "Default components to compiling zero javascript to streamline performance metrics."
    ],
    bestPractices: [
      "Expose clean styling options via string overrides when layouts need specific padding modifications.",
      "Accept metadata attributes via key collections: e.g. `{...attributes}` for flexible analytical trackers."
    ],
    codeTemplate: {
      title: "Component with Static Types Model (Card.astro)",
      language: "astro",
      code: `---
// Card.astro component template
interface Props {
  title: string;
  category?: string;
  image?: {
    src: string;
    alt: string;
  };
  hoverEffects?: boolean;
}

const { title, category, image, hoverEffects = true } = Astro.props;
---
<article class={\`c-card \${hoverEffects ? 'c-card--interactive' : ''}\`}>
  {image && (
    <figure class="c-card__frame">
      <img src={image.src} alt={image.alt} loading="lazy" class="c-card__img" />
    </figure>
  )}
  <div class="c-card__body">
    {category && <span class="c-card__badge uppercase font-mono">{category}</span>}
    <h3 class="c-card__title">{title}</h3>
    <!-- Injected children slots -->
    <div class="c-card__slot-content">
      <slot />
    </div>
  </div>
</article>`
    }
  },
  {
    id: "reusable-sections",
    title: "3. Reusable Sections Strategy",
    shortDesc: "Horizontally dividing screens into scalable visual blocks managing their own scripts.",
    fullExplanation: "Sections are self-directed full-width horizontal containers stacked on pages to construct unique user journeys. They pull corresponding parameters from page-specific JSONs, isolating custom styling structures and interactive Vanilla javascript systems to remain resilient.",
    keyStandards: [
      "Sections take dedicated JSON blocks from astro page properties mapping values to clean children objects.",
      "Encapsulate dynamic click states and interactions with scoped astro vanilla scripts checking root targets.",
      "Identify interactive domains with unique, strict visual IDs to prevent script crosstalk."
    ],
    bestPractices: [
      "Avoid linking styles globally; package custom animations or transforms inside scoped CSS selectors.",
      "Build section wrappers mapping to semantic structures: e.g. `<section aria-labelledby='...'>`."
    ],
    codeTemplate: {
      title: "Isolated Interactive Accordion Section Structure",
      language: "astro",
      code: `---
import Button from '../../components/base/Button.astro';

interface Props {
  sectionId: string;
  title: string;
  questions: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

const { sectionId, title, questions } = Astro.props;
---
<section class="s-faq" id={sectionId} aria-labelledby={\`\${sectionId}-title\`}>
  <div class="s-faq__container">
    <h2 class="s-faq__title" id={\`\${sectionId}-title\`}>{title}</h2>
    
    <div class="c-accordion js-accordion-group">
      {questions.map((faq) => (
        <div class="c-accordion__item">
          <button 
            class="c-accordion__trigger js-faq-trigger" 
            aria-expanded="false" 
            aria-controls={\`faq-panel-\${faq.id}\`}
          >
            <span>{faq.question}</span>
            <span class="c-accordion__icon" aria-hidden="true">+</span>
          </button>
          
          <div 
            class="c-accordion__panel js-faq-panel" 
            id={\`faq-panel-\${faq.id}\`}
            role="region"
          >
            <p class="c-accordion__text">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  // Self-executing script handling behavior scoped strictly toaccordions
  const queryAllAccordions = () => {
    const triggers = document.querySelectorAll('.js-faq-trigger');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId!);
        
        // Toggle expanded status attributes
        trigger.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
        
        if (panel) {
          if (!isExpanded) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            trigger.querySelector('.c-accordion__icon')!.textContent = '-';
          } else {
            panel.style.maxHeight = '0px';
            trigger.querySelector('.c-accordion__icon')!.textContent = '+';
          }
        }
      });
    });
  };

  // Run on load and support spa route changes
  queryAllAccordions();
  document.addEventListener('astro:after-swap', queryAllAccordions);
</script>`
    }
  },
  {
    id: "json-content",
    title: "4. JSON Content Architecture",
    shortDesc: "Complete isolation of text blocks and copy parameters from rendering blueprints.",
    fullExplanation: "By enforcing complete separation of content databases, you build structural configurations ready to connect with any layout engine or future custom CMS. Static Astro pages become templates, importing layout schemas directly from verified local JSON streams, preventing physical markdown sprawl.",
    keyStandards: [
      "Pages contain zero hardcoded content words or structural paragraphs.",
      "Strict data mapping via Content Collections ensuring JSON properties align to schema specifications.",
      "Utilize clean key naming standards universally (e.g. title, subtitle, items)."
    ],
    bestPractices: [
      "Configure localization namespaces directly in content structures (e.g., globals, navigation definitions).",
      "Reject formatting parameters in data (e.g., avoid inline custom html inline, use standard markdown)."
    ],
    codeTemplate: {
      title: "Content Configuration Schema Alignment (content/config.ts)",
      language: "typescript",
      code: `// Content structures map cleanly to typescript variables for Astro compiler
import { defineCollection, z } from 'astro:content';

export const collections = {
  'pages': defineCollection({
    type: 'data',
    schema: z.object({
      seo: z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.array(z.string()).optional(),
        canonical: z.string().url().optional()
      }),
      hero: z.object({
        headline: z.string(),
        subtext: z.string(),
        actionButton: z.object({
          label: z.string(),
          target: z.string()
        })
      }).optional()
    })
  })
};`
    }
  },
  {
    id: "seo-tags",
    title: "5. Metadata & Rich SEO Schemas",
    shortDesc: "Dynamic metadata tags computation mapped alongside automated schema integrations.",
    fullExplanation: "Every view computes a dense, rich suite of meta wrappers to maximize organic search placement. Astro statically generates Canonical paths, page-specific OpenGraph frames and handles raw structured JSON-LD payloads mapping business schema elements natively.",
    keyStandards: [
      "Ensure all layouts take schema-driven properties to construct metadata fields.",
      "Statically bind standardized social image files fallback links.",
      "Format JSON-LD arrays and inject them directly via raw template scripts."
    ],
    bestPractices: [
      "Precompile Sitemap indices using verified modules.",
      "Inject WebSite and Organization structure formats on core landings to optimize schema indexing."
    ],
    codeTemplate: {
      title: "SEO Structural Wrapper Implementation (MetaTags.astro)",
      language: "astro",
      code: `---
// MetaTags.astro component
interface Props {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogImage?: string;
}

const { title, description, canonical, keywords, ogImage } = Astro.props;
const siteUrl = 'https://architecture.example.com';
const secureCanonical = canonical || siteUrl + Astro.url.pathname;
const fallbackOgImage = \`\${siteUrl}/assets/images/shared/og-default.jpg\`;

// JSON-LD dynamic construction
const schemaJson = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": title,
  "description": description,
  "url": secureCanonical
};
---
<title>{title}</title>
<meta name="description" content={description} />
{keywords && <meta name="keywords" content={keywords.join(', ')} />}
<link rel="canonical" href={secureCanonical} />

<!-- OpenGraph Metadata -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={secureCanonical} />
<meta property="og:image" content={ogImage || fallbackOgImage} />
<meta property="og:type" content="website" />

<!-- Structured JSON-LD payload -->
<script type="application/ld+json" set:html={JSON.stringify(schemaJson)} />`
    }
  },
  {
    id: "performance-metrics",
    title: "6. Performance Optimizations",
    shortDesc: "Astro compiles 0kb Javascript by default to fulfill Core Web Vital boundaries easily.",
    fullExplanation: "Astro's architecture allows you to ship static layout blocks directly to browsers, compiling interactive features and client libraries only when specifically requested. Standard styling imports compile to a single optimized head asset, preventing render blocking styles.",
    keyStandards: [
      "Enforce explicit image width and height parameters on tags to eliminate Layout Shift (CLS) failures.",
      "Lazy-load secondary layouts by adding standard loading='lazy' parameters.",
      "Configure modern pre-fetching triggers using preloading structures."
    ],
    bestPractices: [
      "Leverage Astro’s native `<Image />` asset optimization engine.",
      "Optimize CSS delivery by packing design rules into component-scoped modules."
    ],
    codeTemplate: {
      title: "Vite Asset Delivery Optimization Configurations",
      language: "typescript",
      code: `// astro.config.mjs
export default defineConfig({
  compressHTML: true, // Shrink DOM byte counts immediately
  vite: {
    build: {
      cssCodeSplit: true, // Only load component CSS on active viewport requests
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        }
      }
    }
  }
});`
    }
  },
  {
    id: "accessibility-rules",
    title: "7. Accessibility (a11y) Scaffold",
    shortDesc: "Rigid structures supporting screen readers and smooth keyboard navigator streams.",
    fullExplanation: "A clean semantic layout ensures accessibility is not retrofitted later but serves as the bedrock of the DOM structure. Components enforce structured skip-links, screen reader only utilities, explicit labels on controls, and valid status bindings.",
    keyStandards: [
      "Every page layout requires a skip-to-content target link (e.g. c-skip-link).",
      "Do not use generic buttons without explicit aria-labels when they only contain icons.",
      "All active form inputs must match unique labels via standard 'for' hooks."
    ],
    bestPractices: [
      "Bind expanding layout containers dynamically via aria-expanded attributes.",
      "Provide distinct styling outlines for focused keyboard indicators."
    ],
    codeTemplate: {
      title: "Screen Reader Helpers & Accessible Forms Schema",
      language: "astro",
      code: `---
// ContactForm.astro with strict accessibility boundaries
interface Props {
  actionUrl: string;
}
const { actionUrl } = Astro.props;
---
<form action={actionUrl} method="POST" class="c-form">
  <div class="c-form__field">
    <label for="contact-name" class="c-form__label">Full Name <span class="text-danger">*</span></label>
    <input 
      type="text" 
      id="contact-name" 
      name="name" 
      required 
      aria-required="true"
      class="c-form__input" 
      placeholder="e.g. Alex Johnson"
    />
  </div>

  <div class="c-form__field">
    <label for="contact-email" class="c-form__label">Email Address <span class="text-danger">*</span></label>
    <input 
      type="email" 
      id="contact-email" 
      name="email" 
      required 
      aria-required="true" 
      aria-describedby="email-format-tip"
      class="c-form__input" 
      placeholder="alex@company.com"
    />
    <!-- Tip helper supporting screen reader details -->
    <span id="email-format-tip" class="c-form__tip u-visually-hidden">
      Please enter a standard organizational email address.
    </span>
  </div>
</form>

<style>
  // Dynamic visible utility keeping elements accessible to screen-reader only
  .u-visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
</style>`
    }
  },
  {
    id: "cms-integration",
    title: "8. Headless CMS Readiness",
    shortDesc: "A decoupled architecture configured for immediate integration with major Headless platforms.",
    fullExplanation: "By enforcing structured JSON formatting at the core content collections level, you ensure porting this repository to a custom database or modern Headless CMS (like Sanity, Strapi, or Contentful) requires zero modifications to rendering code. A build webhook grabs payload configurations, generates flat JSON objects locally at build-time, and builds production HTML sheets instantly.",
    keyStandards: [
      "Keep JSON layouts and components isomorphic to CMS schemas.",
      "Do not query styling models asynchronously in templates.",
      "Route all data loading mechanisms through Centralized Adapters (/src/utils/cms.js)."
    ],
    bestPractices: [
      "Generate dynamic TypeScript types directly from the CMS API query mapping engines.",
      "Include structured IDs on pages allowing editors to inspect live block regions easily."
    ],
    codeTemplate: {
      title: "Asynchronous Content Fetching Adapter (src/utils/cms.js)",
      language: "typescript",
      code: `// Adapter transforming raw External API nodes into local JSON schemas
export async function fetchCmsPageData(pageId: string) {
  const CMS_API_ENDPOINT = process.env.CMS_API_ENDPOINT;
  const CMS_BEARER_TOKEN = process.env.CMS_BEARER_TOKEN;

  try {
    const rawResponse = await fetch(\`\${CMS_API_ENDPOINT}/pages/\${pageId}\`, {
      headers: {
        'Authorization': \`Bearer \${CMS_BEARER_TOKEN}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!rawResponse.ok) throw new Error(\`CMS layout fetch failed for \${pageId}\`);
    const payload = await rawResponse.json();
    
    // Normalizes diverse backend models to the strict local template schemas
    return {
      seo: {
        title: payload.meta_title,
        description: payload.meta_description,
        canonical: payload.custom_canonical_url
      },
      hero: {
        title: payload.hero_heading,
        subtitle: payload.hero_subheading,
        accentText: payload.tagline,
        cta: {
          text: payload.button_label,
          url: payload.button_destination,
          variant: payload.style_accent ? 'primary' : 'secondary'
        }
      }
    };
  } catch (error) {
    console.error("CMS Integration Handler Exception:", error);
    // Graceful fallback to static local JSON files during pipeline failures
    return null;
  }
}`
    }
  },
  {
    id: "design-system-specs",
    title: "9. SCSS Design System & Tokens",
    shortDesc: "Scalable global design tokens, fluid clamp functions, and BEM layouts.",
    fullExplanation: "The design system establishes responsive structures without breakpoint noise. Color palettes comply with WCAG AAA, typographies rely on modern root font-size scales, containers map cleanly into a 12-column flex layout, and hardware-accelerated animations compile into non-blocking render loops.",
    keyStandards: [
      "No hardcoded colors, borders, or layout padding sizes in low-level component styles.",
      "Always construct fluid values dynamically through the helper function: rem(pxWidth).",
      "Prefix every global spacing utility with BEM layouts (.l-grid, .l-col-4, .l-col-8)."
    ],
    bestPractices: [
      "Combine native CSS custom properties with preprocessor variables for micro-theming.",
      "Keep transitions isolated on highly performant hardware properties to guarantee 60fps states."
    ],
    codeTemplate: {
      title: "SCSS Design Tokens & Fluid Math Mixer (src/styles/abstract/_functions.scss)",
      language: "scss",
      code: `// Dynamic fluid clamp math generator
@use "sass:math";

@function rem($pixels) {
  @if math.is-unitless($pixels) {
    @return math.div($pixels, 16) * 1rem;
  }
  @return math.div($pixels, 16px) * 1rem;
}

@function fluid($min-px, $max-px, $min-bp: 320px, $max-bp: 1280px) {
  $min-rem: rem($min-px);
  $max-rem: rem($max-px);
  $min-vw: rem($min-bp);
  $max-vw: rem($max-bp);
  
  $slope: math.div($max-rem - $min-rem, $max-vw - $min-vw);
  $y-intercept: $min-rem - $slope * $min-vw;
  
  @return clamp(#{$min-rem}, #{$y-intercept} + #{$slope * 100vw}, #{$max-rem});
}`
    }
  }
];

export const MOCK_CMS_FIELDS: CMSField[] = [
  {
    name: "heroHeadline",
    label: "Hero Headline",
    type: "text",
    category: "Hero Banner",
    defaultValue: "Build Scalable Web Blueprints with Astro",
    placeholder: "Set the main uppercase screen title..."
  },
  {
    name: "heroSubtitle",
    label: "Hero Subtitle Text",
    type: "textarea",
    category: "Hero Banner",
    defaultValue: "Pure decoupled JSON schemas providing high dynamic flexibility.",
    placeholder: "Describe layout features..."
  },
  {
    name: "accentText",
    label: "Accent Tagline Text",
    type: "text",
    category: "Hero Banner",
    defaultValue: "STANDARDIZED SCALP Blueprint",
    placeholder: "e.g. VERSION 1.0"
  },
  {
    name: "buttonUrl",
    label: "Primary CTA URL Link",
    type: "text",
    category: "Action Links",
    defaultValue: "/services/overview",
    placeholder: "e.g. /contact"
  },
  {
    name: "buttonLabel",
    label: "Primary Button Text",
    type: "text",
    category: "Action Links",
    defaultValue: "Access System Files",
    placeholder: "Set button label copy..."
  },
  {
    name: "enableAnimations",
    label: "Enable CSS Animations Scroll",
    type: "boolean",
    category: "Animations",
    defaultValue: true
  }
];
