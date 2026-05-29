import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';

// Reusable Sections definitions
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  TestimonialsSection,
  PricingSection,
  FAQSection,
  CTASection,
  GallerySection,
  ContactSection,
  StatsSection,
  FeaturesSection
} from '../components/ReusableSections';

// ==========================================================================
// 1. CONTENT DEEP-MERGE & FALLBACK SYSTEM
// ==========================================================================

/**
 * Deep merges target payload with baseline static configuration.
 * Safely prevents broken UI renders if certain dynamic keys or objects are omitted.
 */
export function deepMergeWithFallback<T extends Record<string, any>>(target: T, fallback: T): T {
  if (!target) return fallback;
  const output = { ...target };
  
  for (const key in fallback) {
    if (Object.prototype.hasOwnProperty.call(fallback, key)) {
      if (fallback[key] && typeof fallback[key] === 'object' && !Array.isArray(fallback[key])) {
        if (!(key in target) || !target[key]) {
          output[key] = fallback[key];
        } else {
          output[key] = deepMergeWithFallback(target[key], fallback[key]);
        }
      } else if (!(key in target) || target[key] === undefined || target[key] === null) {
        output[key] = fallback[key];
      }
    }
  }
  return output as T;
}

// ==========================================================================
// 2. STATE-AWARE MEDIA LOADING SYSTEM with SKELETON & CACHING
// ==========================================================================

const SKINCARE_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1556228515-3198ece1c440?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=600'
];

interface CMSImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  className?: string;
  fallbackIndex?: number;
}

export function CMSImage({ src, alt, className = '', fallbackIndex = 0, ...props }: CMSImageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setIsLoading(true);
      setErrorCount(0);
    } else {
      setImgSrc(SKINCARE_FALLBACK_IMAGES[fallbackIndex % SKINCARE_FALLBACK_IMAGES.length]);
    }
  }, [src, fallbackIndex]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (errorCount < 2) {
      // Step to fallback stock photos from curated server or Unsplash bank
      const alternative = SKINCARE_FALLBACK_IMAGES[(fallbackIndex + errorCount + 1) % SKINCARE_FALLBACK_IMAGES.length];
      setImgSrc(alternative);
      setErrorCount(prev => prev + 1);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative overflow-hidden w-full h-full min-h-[140px] flex items-center justify-center bg-brand-mint/20 ${className}`}>
      {/* Dynamic Skeletal Placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-mint/10 via-brand-teal/8 to-brand-mint/10 animate-pulse flex flex-col items-center justify-center gap-1.5 z-10">
          <Loader2 className="animate-spin text-brand-teal/40" size={20} />
          <span className="text-[9px] font-mono tracking-widest text-[#0bc4b9] uppercase font-bold select-none">loading dermal asset...</span>
        </div>
      )}

      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-all duration-500 ease-out ${isLoading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-none'}`}
        {...props}
      />
    </div>
  );
}

// ==========================================================================
// 3. REUSABLE BLOCKS / CONTENT CROSS-MAPPING DICTIONARY
// ==========================================================================

export function renderGlobalTrustBadge() {
  return (
    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-brand-teal/10 shadow-sm max-w-fit" id="cms-trust-badge">
      <Sparkles size={11} className="text-brand-teal animate-pulse" />
      <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-brand-forest">Dermal Science Board Audited</span>
    </div>
  );
}


// ==========================================================================
// 4. DYNAMIC SECTION RENDERING ENGINE
// ==========================================================================

interface DynamicSectionRendererProps {
  pageKey: string;
  pageData: any;
  resolvedMediaUrl?: (url?: string) => string;
}

export function DynamicSectionRenderer({ pageKey, pageData, resolvedMediaUrl }: DynamicSectionRendererProps) {
  // Graceful definition mapping dictionary
  const defaultLayoutSequences: Record<string, string[]> = {
    home: ['hero', 'stats', 'about', 'servicesBrief', 'cta'],
    about: ['hero', 'narrative', 'features', 'testimonial'],
    services: ['hero', 'services', 'pricing', 'gallery'],
    faq: ['hero', 'faq', 'ctaSection'],
    contact: ['hero', 'contact']
  };

  // Enable dynamic customization ordering if administrator sets layout lists
  const sectionSequence = pageData.sectionOrder || defaultLayoutSequences[pageKey] || Object.keys(pageData).filter(k => k !== 'seo');

  const resolveImage = (raw?: string) => {
    if (!raw) return '';
    if (resolvedMediaUrl) {
      return resolvedMediaUrl(raw);
    }
    return raw;
  };

  return (
    <div className="space-y-0" id={`dyn-page-${pageKey}`}>
      {sectionSequence.map((sectionKey: string, index: number) => {
        const keyId = `${pageKey}-${sectionKey}-${index}`;

        // Dynamic key mappings based on schema requirements
        switch (sectionKey) {
          case 'hero': {
            const data = pageData.hero;
            if (!data) return null;
            return (
              <HeroSection
                key={keyId}
                id={keyId}
                variant={pageKey === 'home' ? 'split' : 'centered'}
                accentText={data.accentText}
                title={data.title}
                subtitle={data.subtitle}
                primaryCta={data.primaryCta}
                secondaryCta={data.secondaryCta}
                imageUrl={resolveImage(data.imageUrl)}
                floatingBadgeText={data.floatingBadge}
                benefits={data.benefits}
                bgType="accent-glow"
              />
            );
          }

          case 'stats': {
            const data = pageData.stats;
            if (!data) return null;
            return (
              <StatsSection
                key={keyId}
                id={keyId}
                metrics={data}
                layout="card"
                bgType="secondary"
              />
            );
          }

          case 'about': {
            const data = pageData.about;
            if (!data) return null;
            return (
              <AboutSection
                key={keyId}
                id={keyId}
                variant="right-media"
                annotation={data.annotation}
                title={data.title}
                italicWord={data.italicWord}
                description={data.description}
                paragraphs={data.paragraphs}
                imageUrl={resolveImage(data.imageUrl)}
                experienceYears={data.experienceYears}
                features={data.features}
                bgType="primary"
              />
            );
          }

          case 'narrative': {
            const data = pageData.narrative;
            if (!data) return null;
            return (
              <AboutSection
                key={keyId}
                id={keyId}
                variant="left-media"
                annotation={data.annotation}
                title={data.title}
                italicWord={data.italicWord}
                description={data.description}
                paragraphs={data.paragraphs}
                imageUrl={resolveImage(data.imageUrl)}
                experienceYears={data.experienceYears}
                features={data.features}
                bgType="primary"
              />
            );
          }

          case 'servicesBrief': {
            const data = pageData.servicesBrief;
            if (!data) return null;
            return (
              <ServicesSection
                key={keyId}
                id={keyId}
                annotation={data.annotation}
                title={data.title}
                subtitle={data.subtitle}
                services={data.items}
                columns={data.columns || 3}
                bgType="secondary"
              />
            );
          }

          case 'services': {
            const data = pageData.services;
            if (!data) return null;
            return (
              <ServicesSection
                key={keyId}
                id={keyId}
                annotation={data.annotation}
                title={data.title}
                subtitle={data.subtitle}
                services={data.services}
                columns={data.columns || 3}
                bgType="secondary"
              />
            );
          }

          case 'features': {
            const data = pageData.features;
            if (!data) return null;
            return (
              <FeaturesSection
                key={keyId}
                id={keyId}
                annotation={data.annotation}
                title={data.title}
                subtitle={data.subtitle}
                features={data.items}
                columns={data.columns || 2}
                bgType="secondary"
              />
            );
          }

          case 'testimonial': {
            const data = pageData.testimonial;
            if (!data) return null;
            return (
              <TestimonialsSection
                key={keyId}
                id={keyId}
                annotation="CLINICAL TEST EVALUATIONS"
                title={data.title}
                subtitle={data.subtitle}
                testimonials={data.items}
                columns={3}
                bgType="tertiary"
              />
            );
          }

          case 'pricing': {
            const data = pageData.pricing;
            if (!data) return null;
            return (
              <PricingSection
                key={keyId}
                id={keyId}
                annotation={data.annotation}
                title={data.title}
                subtitle={data.subtitle}
                plans={data.plans}
                columns={data.columns || 3}
                bgType="primary"
              />
            );
          }

          case 'gallery': {
            const data = pageData.gallery;
            if (!data) return null;
            return (
              <GallerySection
                key={keyId}
                id={keyId}
                annotation={data.annotation}
                title={data.title}
                subtitle={data.subtitle}
                items={data.items}
                columns={data.columns || 3}
                bgType="secondary"
              />
            );
          }

          case 'faq': {
            const data = pageData.faq;
            if (!data) return null;
            return (
              <FAQSection
                key={keyId}
                id={keyId}
                annotation={data.annotation}
                title={data.title}
                subtitle={data.subtitle}
                faqs={data.items}
                columns={data.columns || 1}
                bgType="secondary"
              />
            );
          }

          case 'cta':
          case 'ctaSection': {
            const data = pageData.cta || pageData.ctaSection;
            if (!data) return null;
            return (
              <CTASection
                key={keyId}
                id={keyId}
                annotation={data.annotation}
                title={data.title}
                subtitle={data.subtitle}
                theme={data.theme || 'dark'}
                ctas={data.ctas}
                bgType="primary"
              />
            );
          }

          case 'contact': {
            const data = pageData.contact;
            if (!data) return null;
            return (
              <ContactSection
                key={keyId}
                id={keyId}
                annotation={data.annotation}
                title={data.title}
                subtitle={data.subtitle}
                email={data.email}
                phone={data.phone}
                address={data.address}
                hours={data.hours}
                bgType="primary"
              />
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
