import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  User, 
  CheckCircle2, 
  Star, 
  Users, 
  FileText,
  Lock,
  Compass,
  Smile,
  Shield,
  Instagram,
  ChevronDown
} from 'lucide-react';
import { 
  Button, 
  Badge, 
  Card, 
  ServiceCard, 
  PricingCard, 
  TestimonialCard, 
  FeatureCard, 
  Accordion, 
  FormInput, 
  FormTextarea, 
  Gallery, 
  CtaBlock, 
  StatsBlock,
  FaqItem
} from './ReusableComponents';
import { SectionWrapper, ContentWrapper } from './ReusableLayouts';

// ==========================================================================
// 1. HERO SECTION
// ==========================================================================
export interface HeroSectionProps {
  id?: string;
  variant?: 'split' | 'split-reverse' | 'centered';
  accentText?: string;
  title: string;
  subtitle: string;
  primaryCta: { text: string; url: string; variant?: string };
  secondaryCta?: { text: string; url: string; variant?: string };
  imageUrl?: string;
  floatingBadgeText?: string;
  benefits?: string[];
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary' | 'accent-glow';
}

export function HeroSection({
  id = 'hero-section',
  variant = 'split',
  accentText = 'NURTURE YOUR NATURAL GLOW',
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  imageUrl,
  floatingBadgeText,
  benefits = [],
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'accent-glow'
}: HeroSectionProps) {
  const renderTextContent = () => (
    <div className="space-y-6 max-w-2xl text-left">
      <Badge label={accentText} variant="glow" size="sm" icon={<Sparkles size={11} />} />
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-forest tracking-tight font-medium leading-[1.12]">
        {title}
      </h1>
      
      <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl font-sans font-normal">
        {subtitle}
      </p>

      {benefits.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-sans text-brand-forest/90 font-medium">
              <span className="h-5 w-5 rounded-full bg-brand-teal/8 border border-brand-teal/12 flex items-center justify-center text-brand-teal shrink-0">
                <CheckCircle2 size={11} className="stroke-[2.5]" />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
        <Button 
          text={primaryCta.text} 
          url={primaryCta.url} 
          variant={(primaryCta.variant as any) || 'primary'} 
          size="lg" 
        />
        {secondaryCta && (
          <Button 
            text={secondaryCta.text} 
            url={secondaryCta.url} 
            variant={(secondaryCta.variant as any) || 'outline'} 
            size="lg" 
          />
        )}
      </div>
    </div>
  );

  const renderGraphicContent = () => {
    if (!imageUrl) return null;
    return (
      <div className="relative w-full max-w-md lg:max-w-none mx-auto flex items-center justify-center">
        {/* Soft atmospheric backlight halo */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-tr from-brand-teal/10 via-transparent to-brand-chartreuse/10 blur-3xl select-none pointer-events-none rounded-full" />
        
        {/* Dynamic leaf mask portrait container */}
        <div className="relative overflow-hidden w-full aspect-[4/5] bg-brand-blue-bg/40 border border-brand-teal/10 shadow-lg hover:scale-[1.015] transition-transform duration-500 ease-out z-10 rounded-[100px_40px_100px_40px]">
          <img 
            src={imageUrl} 
            alt="Skincare treatment process" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Floating status badges */}
        {floatingBadgeText && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-10 -right-4 sm:-right-8 bg-white border border-brand-teal/12 p-3.5 sm:p-4 rounded-2xl shadow-xl max-w-xs flex items-center gap-3 z-30"
          >
            <div className="h-9 w-9 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold text-brand-forest block truncate font-sans">{floatingBadgeText}</span>
              <span className="text-[9px] text-[#0bc4b9] font-mono tracking-widest font-extrabold block uppercase">DDRM Tested</span>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        {variant === 'centered' ? (
          <div className="text-center max-w-4xl mx-auto space-y-8 flex flex-col items-center">
            <Badge label={accentText} variant="glow" size="sm" icon={<Sparkles size={11} />} />
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-brand-forest tracking-tight font-medium leading-[1.12] max-w-3xl">
              {title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl font-sans">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4">
              <Button text={primaryCta.text} url={primaryCta.url} variant={(primaryCta.variant as any) || 'primary'} size="lg" />
              {secondaryCta && (
                <Button text={secondaryCta.text} url={secondaryCta.url} variant={(secondaryCta.variant as any) || 'outline'} size="lg" />
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            {variant === 'split' ? (
              <>
                {renderTextContent()}
                {renderGraphicContent()}
              </>
            ) : (
              <>
                {renderGraphicContent()}
                {renderTextContent()}
              </>
            )}
          </div>
        )}
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 2. ABOUT SECTION
// ==========================================================================
export interface AboutSectionProps {
  id?: string;
  variant?: 'left-media' | 'right-media';
  annotation?: string;
  title: string;
  italicWord?: string;
  description: string;
  paragraphs: string[];
  imageUrl?: string;
  experienceYears?: string;
  features?: { title: string; description: string; icon?: React.ReactNode }[];
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function AboutSection({
  id = 'about-section',
  variant = 'right-media',
  annotation = 'EXPERTISE & CLINICAL SAFETY',
  title,
  italicWord,
  description,
  paragraphs = [],
  imageUrl,
  experienceYears = '12+',
  features = [],
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'primary'
}: AboutSectionProps) {
  const renderTextSide = () => (
    <div className="space-y-6 max-w-xl text-left">
      <Badge label={annotation} variant="emerald" size="sm" icon={<ShieldCheck size={11} />} />
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-forest tracking-tight font-medium leading-[1.15]">
        {title} {italicWord && <span className="font-serif italic font-normal text-brand-teal">{italicWord}</span>}
      </h2>
      <p className="text-sm sm:text-base text-brand-forest/90 font-sans font-semibold leading-relaxed border-l-3 border-brand-teal pl-4">
        {description}
      </p>
      
      <div className="space-y-4 text-xs sm:text-sm text-slate-550 font-sans leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      {features.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-teal/8">
          {features.map((feature, idx) => (
            <div key={idx} className="space-y-1.5 font-sans">
              <span className="flex items-center gap-2 font-bold text-brand-forest text-xs sm:text-sm">
                <span className="h-5 w-5 bg-brand-teal/8 text-brand-teal rounded flex items-center justify-center shrink-0">
                  {feature.icon || <Sparkles size={11} />}
                </span>
                {feature.title}
              </span>
              <p className="text-xs text-slate-500 pl-7 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMediaSide = () => (
    <div className="relative w-full max-w-sm lg:max-w-none mx-auto flex items-center justify-center">
      <div className="relative w-full aspect-[4/5] bg-brand-blue-bg/40 border border-brand-teal/10 overflow-hidden shadow-md rounded-[40px_100px_40px_100px]">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Consultation lab" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-brand-mint flex items-center justify-center text-brand-teal/50 font-serif text-xl">
            *Pure Care Consult*
          </div>
        )}
      </div>

      {/* Floating credential pill */}
      <div className="absolute top-8 -left-5 bg-brand-forest text-white p-5 rounded-2xl shadow-xl border border-brand-teal/20 text-center select-none font-serif">
        <span className="text-3xl sm:text-4xl font-semibold tracking-tight block text-brand-chartreuse">{experienceYears}</span>
        <span className="text-[9px] tracking-wider uppercase font-sans font-bold text-brand-mint/80">Years Clinically Certified</span>
      </div>
    </div>
  );

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 sm:gap-16 items-center">
          {variant === 'left-media' ? (
            <>
              {renderMediaSide()}
              {renderTextSide()}
            </>
          ) : (
            <>
              {renderTextSide()}
              {renderMediaSide()}
            </>
          )}
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 3. SERVICES SECTION
// ==========================================================================
export interface ServiceItem {
  title: string;
  description: string;
  iconName?: 'sparkles' | 'shield' | 'calendar' | 'users' | 'compass' | 'smile';
  tags?: string[];
  linkUrl?: string;
  linkLabel?: string;
}

export interface ServicesSectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  services: ServiceItem[];
  columns?: 2 | 3 | 4;
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

const serviceIconMap = {
  sparkles: <Sparkles size={18} />,
  shield: <ShieldCheck size={18} />,
  calendar: <Calendar size={18} />,
  users: <Users size={18} />,
  compass: <Compass size={18} />,
  smile: <Smile size={18} />
};

export function ServicesSection({
  id = 'services-section',
  annotation = 'TARGETED DERMATOLOGICAL SOLUTIONS',
  title,
  subtitle,
  services = [],
  columns = 3,
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'secondary'
}: ServicesSectionProps) {
  const gridColClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <Badge label={annotation} variant="cyan" size="sm" icon={<Sparkles size={11} />} />
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-medium tracking-tight leading-[1.20]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={`grid ${gridColClasses[columns]} gap-6 sm:gap-8`}>
          {services.map((service, idx) => (
            <ServiceCard 
              key={idx}
              title={service.title}
              description={service.description}
              icon={service.iconName ? serviceIconMap[service.iconName] : <Sparkles size={18} />}
              tags={service.tags}
              linkUrl={service.linkUrl || '#'}
              linkLabel={service.linkLabel}
            />
          ))}
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 4. TESTIMONIALS SECTION
// ==========================================================================
export interface TestimonialItem {
  quote: string;
  authorName: string;
  authorRole?: string;
  rating?: number;
  avatarUrl?: string;
}

export interface TestimonialsSectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  testimonials: TestimonialItem[];
  columns?: 2 | 3;
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function TestimonialsSection({
  id = 'testimonials-section',
  annotation = 'TRUSTED BY THOUSANDS',
  title,
  subtitle,
  testimonials = [],
  columns = 3,
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'tertiary'
}: TestimonialsSectionProps) {
  const gridColClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <Badge label={annotation} variant="glow" size="sm" icon={<Star size={11} className="fill-brand-chartreuse text-brand-chartreuse" />} />
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-medium tracking-tight leading-[1.2]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={`grid ${gridColClasses[columns]} gap-6 sm:gap-8`}>
          {testimonials.map((t, idx) => (
            <TestimonialCard 
              key={idx}
              quote={t.quote}
              authorName={t.authorName}
              authorRole={t.authorRole}
              rating={t.rating}
              avatarUrl={t.avatarUrl}
            />
          ))}
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 5. PRICING SECTION
// ==========================================================================
export interface PricingPlan {
  planName: string;
  price: string;
  billingPeriod?: string;
  description?: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

export interface PricingSectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  columns?: 2 | 3;
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function PricingSection({
  id = 'pricing-section',
  annotation = 'TRANSPARENT VALUE MATRIX',
  title,
  subtitle,
  plans = [],
  columns = 3,
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'primary'
}: PricingSectionProps) {
  const gridColClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <Badge label={annotation} variant="emerald" size="sm" icon={<ShieldCheck size={11} />} />
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-medium tracking-tight leading-[1.20]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className={`grid ${gridColClasses[columns]} gap-6 sm:gap-8`}>
            {plans.map((plan, idx) => (
              <PricingCard 
                key={idx}
                planName={plan.planName}
                price={plan.price}
                billingPeriod={plan.billingPeriod || 'per session'}
                description={plan.description}
                features={plan.features}
                isPopular={plan.isPopular}
                ctaText={plan.ctaText || 'Select Package'}
                ctaUrl={plan.ctaUrl || '#booking'}
              />
            ))}
          </div>
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 6. FAQ SECTION
// ==========================================================================
export interface FaqItemType {
  id: string;
  title: string;
  content: string;
}

export interface FAQSectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  faqs: FaqItemType[];
  columns?: 1 | 2;
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function FAQSection({
  id = 'faq-section',
  annotation = 'DERMAL QUESTIONS ANSWERED',
  title,
  subtitle,
  faqs = [],
  columns = 1,
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'secondary'
}: FAQSectionProps) {
  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <Badge label={annotation} variant="slate" size="sm" icon={<FileText size={11} className="text-brand-teal" />} />
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-medium tracking-tight leading-[1.2]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {columns === 1 ? (
            <Accordion items={faqs} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Accordion items={faqs.slice(0, Math.ceil(faqs.length / 2))} />
              <Accordion items={faqs.slice(Math.ceil(faqs.length / 2))} />
            </div>
          )}
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 7. CTA SECTION
// ==========================================================================
export interface CTASectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  theme?: 'dark' | 'neon' | 'glass';
  ctas: { text: string; url: string; variant?: string }[];
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function CTASection({
  id = 'cta-section',
  annotation = 'COMMITTED TO PURE HEALTH',
  title,
  subtitle,
  theme = 'dark',
  ctas = [],
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'primary'
}: CTASectionProps) {
  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <CtaBlock 
          accentText={annotation}
          title={title}
          subtitle={subtitle}
          theme={theme}
          ctas={ctas}
        />
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 8. GALLERY SECTION
// ==========================================================================
export interface GalleryItem {
  id: string;
  imageUrl?: string;
  title: string;
  category: string;
  description?: string;
}

export interface GallerySectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function GallerySection({
  id = 'gallery-section',
  annotation = 'CLINICAL VISUAL DIARY',
  title,
  subtitle,
  items = [],
  columns = 3,
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'secondary'
}: GallerySectionProps) {
  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
          <Badge label={annotation} variant="cyan" size="sm" icon={<Compass size={11} />} />
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-medium tracking-tight leading-[1.2]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Gallery 
            items={items}
            columns={columns}
          />
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 9. CONTACT SECTION
// ==========================================================================
export interface ContactSectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  address: string;
  hours: string[];
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function ContactSection({
  id = 'contact-section',
  annotation = 'SCHEDULING CENTER & INQUIRIES',
  title,
  subtitle,
  email,
  phone,
  address,
  hours = [],
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'primary'
}: ContactSectionProps) {

  const [formData, setFormData] = useState({ name: '', email: '', treatment: 'general', details: '' });
  const [validationMsg, setValidationMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      setValidationMsg('Please compile all required active fields.');
      return;
    }
    
    setValidationMsg('');
    setIsSubmitted(true);
  };

  const renderInfoSide = () => (
    <div className="space-y-6 max-w-md text-left">
      <Badge label={annotation} variant="emerald" size="sm" icon={<Clock size={11} />} />
      <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-medium tracking-tight leading-[1.20]">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
        {subtitle}
      </p>

      <div className="space-y-4 pt-4 border-t border-brand-teal/8">
        <div className="flex items-start gap-4 flex-row font-sans">
          <span className="h-9 w-9 rounded-full bg-brand-teal/8 border border-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0 mt-0.5">
            <Phone size={15} />
          </span>
          <div>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 block uppercase font-bold">clinical phoneline</span>
            <a href={`tel:${phone}`} className="text-xs sm:text-sm font-bold text-brand-forest hover:text-brand-teal transition-colors block">{phone}</a>
          </div>
        </div>

        <div className="flex items-start gap-4 flex-row font-sans">
          <span className="h-9 w-9 rounded-full bg-brand-teal/8 border border-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0 mt-0.5">
            <Mail size={15} />
          </span>
          <div>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 block uppercase font-bold">clinical email box</span>
            <a href={`mailto:${email}`} className="text-xs sm:text-sm font-bold text-brand-forest hover:text-brand-teal transition-colors block">{email}</a>
          </div>
        </div>

        <div className="flex items-start gap-4 flex-row font-sans">
          <span className="h-9 w-9 rounded-full bg-brand-teal/8 border border-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0 mt-0.5">
            <MapPin size={15} />
          </span>
          <div>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 block uppercase font-bold">dermatology center</span>
            <span className="text-xs sm:text-sm font-normal text-brand-forest block leading-relaxed">{address}</span>
          </div>
        </div>
      </div>

      {hours.length > 0 && (
        <div className="p-5.5 rounded-2xl bg-brand-mint border border-brand-teal/8 space-y-3 font-sans">
          <span className="text-[10px] font-mono text-brand-teal tracking-widest font-extrabold uppercase flex items-center gap-1.5 leading-none">
            <Clock size={11} /> operational hours
          </span>
          <ul className="space-y-2 text-[11px] sm:text-xs">
            {hours.map((hour, idx) => {
              const [day, time] = hour.split(': ');
              return (
                <li key={idx} className="flex justify-between items-center text-slate-600">
                  <span className="font-semibold">{day}</span>
                  <span className="font-bold text-brand-forest">{time || 'Closed'}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );

  const renderFormSide = () => (
    <div id="booking" className="bg-white p-7 sm:p-9 rounded-3xl border border-brand-teal/10 shadow-lg relative max-w-lg mx-auto w-full z-10">
      <h3 className="text-lg sm:text-xl font-serif text-brand-forest leading-snug font-medium mb-1.5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-teal shrink-0 inline-block"></span> Secure Skin Health Consultation
      </h3>
      <p className="text-xs text-slate-500 font-sans leading-relaxed mb-6">
        Formulate clinical therapy inquiries directly. Complete the active fields to receive scheduled appointment choices.
      </p>

      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 space-y-4 font-sans"
        >
          <div className="h-14 w-14 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 size={32} className="stroke-[2.5]" />
          </div>
          <p className="text-sm font-bold text-brand-forest">Clinical Request Transmitted</p>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Thank you {formData.name}, your request has been recorded securely. Our dermatology triage coordinator will reply at <span className="font-semibold text-brand-forest">{formData.email}</span> within 2 hours.
          </p>
          <Button 
            text="Formulate Another Enquiry" 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', treatment: 'general', details: '' });
            }}
            variant="outline"
            size="sm"
          />
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <FormInput 
            label="full patient name" 
            required 
            placeholder="Alexandra Bennett" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            icon={<User size={13} />}
          />
          
          <FormInput 
            label="email communication address" 
            type="email" 
            required 
            placeholder="alexandra@glow.com" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            icon={<Mail size={13} />}
          />

          <div className="space-y-2 font-sans w-full">
            <label className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#3c5651]">targeted skin therapy option</label>
            <select
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              className="w-full bg-white select-none text-brand-forest text-sm font-sans rounded-xl border border-brand-teal/15 px-4 py-2.5 hover:border-brand-teal/30 focus:outline-none focus:ring-2 focus:ring-brand-teal/10 transition-all duration-200"
            >
              <option value="general">Clinical Consultation & General Checkup</option>
              <option value="acne">Dermal Acne & Cellular Clarifying Peels</option>
              <option value="hydration">Pure Dermal Moisture Exfoliation</option>
              <option value="laser">Fractional Laser Skin Rejuvenation</option>
              <option value="anti-aging">Anti-Aging & Collagen Repair Programs</option>
            </select>
          </div>

          <FormTextarea 
            label="skin health history & details" 
            required 
            rows={3} 
            placeholder="Summarize present concerns, targeted areas, or past treatment history..." 
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            helperText="HIPAA Compliant Secure Transfer"
          />

          {validationMsg && (
            <p className="text-[11px] font-mono font-bold text-rose-500 animate-pulse">{validationMsg}</p>
          )}

          <Button 
            text="Transmit Skincare Request" 
            fullWidth={true} 
            variant="primary" 
            size="md"
            iconRight={<ArrowRight size={14} />}
          />
        </form>
      )}
    </div>
  );

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {renderInfoSide()}
          {renderFormSide()}
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 10. STATS SECTION
// ==========================================================================
export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

export interface StatsSectionProps {
  id?: string;
  metrics: MetricItem[];
  layout?: 'grid' | 'row' | 'card';
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function StatsSection({
  id = 'stats-section',
  metrics = [],
  layout = 'card',
  paddingTop = 's',
  paddingBottom = 's',
  bgType = 'secondary'
}: StatsSectionProps) {
  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <StatsBlock 
          metrics={metrics}
          layout={layout}
        />
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 11. FEATURES SECTION
// ==========================================================================
export interface FeatureItem {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  imageUrl?: string;
  iconName?: 'sparkles' | 'shield' | 'users' | 'compass' | 'smile';
}

export interface FeaturesSectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function FeaturesSection({
  id = 'features-section',
  annotation = 'DERMATOLOGY CLINIC CORE TENETS',
  title,
  subtitle,
  features = [],
  columns = 3,
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'primary'
}: FeaturesSectionProps) {
  const gridColClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <Badge label={annotation} variant="emerald" size="sm" icon={<ShieldCheck size={11} />} />
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-medium tracking-tight leading-[1.20]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={`grid ${gridColClasses[columns]} gap-6 sm:gap-8`}>
          {features.map((feature, idx) => (
            <FeatureCard 
              key={idx}
              title={feature.title}
              description={feature.description}
              metric={feature.metric}
              metricLabel={feature.metricLabel}
              imageUrl={feature.imageUrl}
              icon={feature.iconName ? serviceIconMap[feature.iconName] : <Sparkles size={18} />}
            />
          ))}
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 12. BEFORE / AFTER COMPARISON SECTION
// ==========================================================================
export interface ComparisonItem {
  title: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
  timeframe?: string;
}

export interface BeforeAfterSectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  items: ComparisonItem[];
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function BeforeAfterSection({
  id = 'before-after-section',
  annotation = 'PROVEN DERMAL RESULTS',
  title,
  subtitle,
  items = [],
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'secondary'
}: BeforeAfterSectionProps) {
  
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;
  const currentItem = items[activeIndex];

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
          <Badge label={annotation} variant="glow" size="sm" icon={<Sparkles size={11} />} />
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-medium tracking-tight leading-[1.20]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Controls list list */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#3c5651] uppercase block">select clinical study</span>
            <div className="space-y-2.5">
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    activeIndex === idx 
                      ? 'bg-brand-forest border-brand-teal text-white shadow-md' 
                      : 'bg-white border-brand-teal/8 text-brand-forest hover:border-brand-teal/20 hover:bg-brand-mint/10'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold block">{item.title}</span>
                  {item.timeframe && (
                    <span className={`text-[10px] font-mono block mt-1 ${activeIndex === idx ? 'text-brand-chartreuse' : 'text-brand-teal'}`}>
                      Treatment span: {item.timeframe}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <p className="text-xs text-slate-505 leading-relaxed font-sans bg-brand-mint/30 p-4 rounded-2xl border border-brand-teal/5">
              All therapeutic case studies are verified by clinical dermatologists using high-definition polarization photography.
            </p>
          </div>

          {/* Sibling Visual comparison sliders */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Before item */}
              <div className="space-y-2 text-center">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400 block">Baseline (Before Treatment)</span>
                <div className="aspect-[4/5] rounded-[40px_16px_40px_16px] overflow-hidden border border-brand-teal/10 bg-brand-blue-bg/40">
                  <img src={currentItem.beforeUrl} alt={`${currentItem.title} before treatment`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* After item */}
              <div className="space-y-2 text-center">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#0bc4b9] block flex items-center justify-center gap-1.5 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0bc4b9] animate-ping" /> Rejuvenated (After Treatment)
                </span>
                <div className="aspect-[4/5] rounded-[16px_40px_16px_40px] overflow-hidden border border-[#0bc4b9]/20 bg-brand-blue-bg/40 shadow-sm shadow-[#0bc4b9]/10">
                  <img src={currentItem.afterUrl} alt={`${currentItem.title} after treatment`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-brand-teal/8 space-y-2 font-sans shadow-sm">
              <span className="text-sm font-bold text-brand-forest block">{currentItem.title} Result Log</span>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {currentItem.description}
              </p>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 13. TEAM SECTION
// ==========================================================================
export interface TeamMember {
  name: string;
  role: string;
  credentials?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface TeamSectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  members: TeamMember[];
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary';
}

export function TeamSection({
  id = 'team-section',
  annotation = 'EXPERIENCED MEDICAL TRIAGE',
  title,
  subtitle,
  members = [],
  paddingTop = 'm',
  paddingBottom = 'm',
  bgType = 'primary'
}: TeamSectionProps) {
  const gridColClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <Badge label={annotation} variant="slate" size="sm" icon={<Users size={11} className="text-brand-teal" />} />
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-medium tracking-tight leading-[1.20]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={`grid ${members.length > 3 ? gridColClasses[4] : gridColClasses[3]} gap-6 sm:gap-8`}>
          {members.map((member, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-7 rounded-2xl border border-brand-teal/8 hover:border-brand-teal/20 transition-all duration-300 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-brand-glow group">
              <div className="space-y-4 w-full flex flex-col items-center">
                {/* Organical curved mask for portraits */}
                <div className={`h-28 w-28 overflow-hidden relative border border-brand-teal/10 bg-brand-blue-bg/40 shadow-sm shrink-0 ${
                  idx % 2 === 0 ? 'rounded-[30px_12px_30px_12px]' : 'rounded-[12px_30px_12px_30px]'
                }`}>
                  {member.avatarUrl ? (
                    <img src={member.avatarUrl} alt={member.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550" />
                  ) : (
                    <User size={36} className="text-brand-teal/60 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-serif text-brand-forest group-hover:text-brand-teal transition-colors font-medium">{member.name}</h4>
                  <span className="text-[10px] sm:text-xs text-brand-teal font-mono uppercase tracking-wider font-extrabold">{member.role}</span>
                  {member.credentials && (
                    <span className="text-[9px] text-[#3c5651] font-mono tracking-widest block font-bold uppercase">{member.credentials}</span>
                  )}
                </div>

                {member.bio && (
                  <p className="text-xs text-slate-450 leading-relaxed font-sans font-normal border-t border-brand-teal/6 pt-3.5 max-w-xs">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

// ==========================================================================
// 14. NEWSLETTER SECTION
// ==========================================================================
export interface NewsletterSectionProps {
  id?: string;
  annotation?: string;
  title: string;
  subtitle: string;
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  bgType?: 'primary' | 'secondary' | 'tertiary' | 'accent-glow';
}

export function NewsletterSection({
  id = 'newsletter-section',
  annotation = 'DERMAL HEALTH COMMUNITY',
  title,
  subtitle,
  paddingTop = 's',
  paddingBottom = 's',
  bgType = 'accent-glow'
}: NewsletterSectionProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
    }
  };

  return (
    <SectionWrapper id={id} paddingTop={paddingTop} paddingBottom={paddingBottom} bgType={bgType as any}>
      <ContentWrapper maxWidth="lg">
        <div className="bg-brand-forest text-brand-mint border border-brand-teal/20 p-8 sm:p-14 rounded-[36px] shadow-xl text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none select-none h-64 w-64 rounded-full bg-brand-teal/4 blur-[100px]" />
          
          <div className="space-y-4 max-w-2xl mx-auto relative z-10 flex flex-col items-center">
            <Badge label={annotation} variant="glow" size="sm" icon={<Sparkles size={11} className="text-brand-chartreuse" />} />
            
            <h2 className="text-2xl sm:text-4xl font-serif text-brand-mint font-medium tracking-tight leading-snug">
              {title}
            </h2>
            
            <p className="text-xs sm:text-sm text-brand-mint/75 leading-relaxed font-sans max-w-xl mx-auto pb-2">
              {subtitle}
            </p>

            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-teal/15 p-5 px-8 rounded-2xl border border-brand-teal/30 space-y-1 text-center"
              >
                <span className="text-xs font-mono font-bold text-brand-chartreuse uppercase tracking-wider block">✓ Welcome to the Formulation Club</span>
                <p className="text-xs text-brand-mint/90 font-sans leading-relaxed">Your digital skin hygiene guides and exclusive clinical trial offers are programmed for dispatch.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full max-w-md gap-2.5 font-sans justify-center pt-2">
                <input 
                  type="email" 
                  required
                  placeholder="alexandra@glowskincare.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full sm:flex-1 bg-white/10 hover:bg-white/[0.13] focus:bg-white/[0.16] border border-brand-teal/30 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 rounded-full px-5 py-3 text-xs sm:text-sm text-white focus:outline-none transition-all placeholder-brand-mint/40 select-text"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-brand-chartreuse hover:bg-[#c4dd2a] text-brand-forest font-bold font-sans text-xs sm:text-sm rounded-full shadow-md shadow-brand-chartreuse/10 hover:shadow-chartreuse-glow active:scale-[0.98] transition-all tracking-wide cursor-pointer"
                >
                  Join Formulation Club
                </button>
              </form>
            )}

            <div className="flex justify-center gap-5 pt-4 text-[10px] font-mono text-brand-mint/55 tracking-wider font-semibold">
              <span className="flex items-center gap-1.5"><ShieldCheck size={11} className="text-brand-chartreuse" /> Zero Spam Toleration</span>
              <span className="flex items-center gap-1.5"><Lock size={11} className="text-brand-chartreuse" /> Secure Data Privacy</span>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}
