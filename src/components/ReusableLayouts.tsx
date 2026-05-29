import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  HelpCircle, 
  Check, 
  Sparkles, 
  Shield, 
  Plus, 
  Minus,
  Briefcase,
  Layers,
  LayoutGrid
} from 'lucide-react';
import { 
  HeroData, 
  SplitData, 
  GridLayoutData, 
  CtaLayoutData, 
  FaqData, 
  PricingData, 
  ContactData, 
  TestimonialData, 
  SpacingConfig, 
  ContainerConfig 
} from '../types';

// ==========================================================================
// 1. REUSABLE SECTION WRAPPER & SPACING SYSTEM
// ==========================================================================
interface SectionWrapperProps extends SpacingConfig {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bgType?: 'primary' | 'secondary' | 'tertiary' | 'dimmed' | 'accent-glow';
}

export function SectionWrapper({
  children,
  paddingTop = 'm',
  paddingBottom = 'm',
  id,
  className = '',
  bgType = 'primary'
}: SectionWrapperProps) {
  // Mapping responsive padding scales
  const paddingTopClasses = {
    none: 'pt-0',
    xs: 'pt-4 sm:pt-6',
    s: 'pt-8 sm:pt-12',
    m: 'pt-12 sm:pt-20',
    l: 'pt-16 sm:pt-28',
    xl: 'pt-24 sm:pt-36',
    xxl: 'pt-36 sm:pt-48'
  };

  const paddingBottomClasses = {
    none: 'pb-0',
    xs: 'pb-4 sm:pb-6',
    s: 'pb-8 sm:pb-12',
    m: 'pb-12 sm:pb-20',
    l: 'pb-16 sm:pb-28',
    xl: 'pb-24 sm:pb-36',
    xxl: 'pb-36 sm:pb-48'
  };

  const bgClasses = {
    primary: 'bg-white',
    secondary: 'bg-brand-blue-bg/40',
    tertiary: 'bg-brand-mint/45',
    dimmed: 'bg-slate-50/60 backdrop-blur-sm',
    'accent-glow': 'bg-brand-mint/20 relative overflow-hidden before:absolute before:inset-0 before:bg-brand-teal/[0.012] before:pointer-events-none'
  };

  return (
    <section 
      id={id} 
      className={`w-full relative transition-all duration-300 ${bgClasses[bgType]} ${paddingTopClasses[paddingTop]} ${paddingBottomClasses[paddingBottom]} ${className}`}
    >
      {children}
    </section>
  );
}

// ==========================================================================
// 2. REUSABLE CONTENT WRAPPER & CONTAINER SYSTEM
// ==========================================================================
interface ContentWrapperProps extends ContainerConfig {
  children: React.ReactNode;
  className?: string;
}

export function ContentWrapper({
  children,
  maxWidth = 'lg',
  theme = 'default',
  className = ''
}: ContentWrapperProps) {
  const widthClasses = {
    ch: 'max-w-prose', // ~75ch standard
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[85rem]',
    full: 'max-w-full'
  };

  const themeClasses = {
    default: '',
    'accent-glass': 'border border-brand-teal/8 bg-brand-mint/20 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-sm',
    dimmed: 'border border-brand-teal/8 bg-brand-blue-bg/40 p-6 sm:p-10 rounded-3xl'
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${widthClasses[maxWidth]} ${themeClasses[theme]} ${className}`}>
      {children}
    </div>
  );
}

// ==========================================================================
// 3. REUSABLE SYSTEM: GRID LAYOUT
// ==========================================================================
interface GridLayoutProps extends GridLayoutData {
  className?: string;
}

export function GridLayout({
  title,
  subtitle,
  columns = 3,
  gapSize = 'm',
  items,
  className = ''
}: GridLayoutProps) {
  const colSpanClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  };

  const gapClasses = {
    xs: 'gap-2 sm:gap-3',
    s: 'gap-4 sm:gap-6',
    m: 'gap-6 sm:gap-8',
    l: 'gap-8 sm:gap-12',
    xl: 'gap-12 sm:gap-16'
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          {title && <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{title}</h2>}
          {subtitle && <p className="text-xs text-slate-400 font-sans leading-relaxed">{subtitle}</p>}
        </div>
      )}
      
      <div className={`grid ${colSpanClasses[columns]} ${gapClasses[gapSize]}`}>
        {items.map((item, index) => (
          <div 
            key={index}
            className="group border border-slate-800/85 bg-[#0b1224] p-5 rounded-xl hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {item.icon ? (
                  <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Sparkles size={14} />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                    <LayoutGrid size={14} />
                  </div>
                )}
                {item.tag && (
                  <span className="text-[9px] font-mono font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded uppercase">
                    {item.tag}
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-normal font-sans tracking-wide">{item.title}</h4>
                {item.description && (
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5 font-sans">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            {item.link && (
              <div className="border-t border-slate-900/60 pt-3 mt-4">
                <a 
                  href={item.link} 
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 font-bold tracking-tight transition-colors"
                >
                  Explore Module <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// 4. REUSABLE SYSTEM: SPLIT LAYOUT
// ==========================================================================
interface SplitLayoutProps extends SplitData {
  className?: string;
}

export function SplitLayout({
  leftTitle,
  leftBody,
  rightImage,
  rightTitle,
  rightBody,
  ratio = '50-50',
  reverse = false,
  className = ''
}: SplitLayoutProps) {
  const columnsLayout = {
    '50-50': 'grid-cols-1 lg:grid-cols-2',
    '60-40': 'grid-cols-1 lg:grid-cols-[1.5fr_1fr]',
    '40-60': 'grid-cols-1 lg:grid-cols-[1fr_1.5fr]'
  };

  return (
    <div className={`grid ${columnsLayout[ratio]} gap-8 sm:gap-12 md:gap-16 items-center ${className}`}>
      {/* Block 1 (Left Side Default) */}
      <div className={`space-y-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="space-y-4">
          {leftTitle && (
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white leading-tight font-sans">
              {leftTitle}
            </h3>
          )}
          {leftBody && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl">
              {leftBody}
            </p>
          )}
        </div>
      </div>

      {/* Block 2 (Right Side Default) */}
      <div className={`space-y-6 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
        {rightImage ? (
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0e1628] aspect-video sm:aspect-auto sm:min-h-64 flex items-center justify-center p-6 bg-gradient-to-br from-[#0c1222] to-[#121c35]">
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none"></div>
            <div className="text-center space-y-2 z-10">
              <Layers size={32} className="text-cyan-400 mx-auto" />
              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block font-bold">IMAGE CONTAINER MODEL</span>
              <p className="text-[10px] text-slate-500 max-w-xs">{rightImage}</p>
            </div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[8px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-slate-800">
              <span className="h-1 w-1 rounded-full bg-emerald-400"></span>
              decoupled CMS reference
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {rightTitle && (
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight font-sans">
                {rightTitle}
              </h3>
            )}
            {rightBody && (
              <p className="text-xs text-slate-350 leading-relaxed font-sans">
                {rightBody}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================================================
// 5. REUSABLE SYSTEM: MAIN LAYOUT
// ==========================================================================
interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function MainLayout({
  children,
  showHeader = true,
  showFooter = true
}: MainLayoutProps) {
  return (
    <div className="min-h-full flex flex-col bg-[#080c14] border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
      {showHeader && (
        <header className="border-b border-slate-800/80 bg-[#0b101f] px-5 py-3 flex justify-between items-center z-10 h-14 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-cyan-400 flex items-center justify-center text-[10px] text-[#080c14] font-bold font-mono">
              AS
            </div>
            <span className="text-xs font-bold text-white tracking-wide">Multi-Page Production Platform</span>
          </div>
          <nav className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Enterprise API</span>
          </nav>
        </header>
      )}

      <main className="flex-1 overflow-x-hidden focus:outline-none min-h-[30rem] flex flex-col justify-between">
        {children}
      </main>

      {showFooter && (
        <footer className="border-t border-slate-800/80 bg-[#060a12] p-5 z-10 shrink-0 select-none">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-500 font-mono">
            <span>© 2026 ASTRO INC. ISO-COMPLIANT ARCHITECTURE</span>
            <div className="flex gap-4">
              <span>SECURITY CERTIFIED (SOC2)</span>
              <span>•</span>
              <span>WaaC ENGINE ENABLED</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

// ==========================================================================
// 6. REUSABLE SYSTEM: PAGE LAYOUT
// ==========================================================================
interface PageLayoutProps {
  title: string;
  description?: string;
  showBreadcrumbs?: boolean;
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export function PageLayout({
  title,
  description,
  showBreadcrumbs = true,
  children,
  rightSidebar
}: PageLayoutProps) {
  return (
    <div className="w-full space-y-6">
      {/* Page Header Segment */}
      <div className="space-y-2 border-b border-slate-850 pb-5">
        {showBreadcrumbs && (
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
            <span className="hover:text-slate-400 cursor-pointer">workspace</span>
            <ChevronRight size={10} />
            <span className="hover:text-slate-400 cursor-pointer">architecture</span>
            <ChevronRight size={10} />
            <span className="text-cyan-400 font-semibold">layout-previewer</span>
          </div>
        )}
        <div className="space-y-1">
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-normal">{title}</h1>
          {description && (
            <p className="text-xs text-slate-400 max-w-3xl font-sans leading-relaxed">{description}</p>
          )}
        </div>
      </div>

      {/* Main Content Split with Optional Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className={rightSidebar ? 'lg:col-span-3 space-y-6' : 'lg:col-span-4 space-y-6'}>
          {children}
        </div>
        
        {rightSidebar && (
          <aside className="lg:col-span-1 space-y-4 border border-slate-800/80 bg-[#0a101f]/75 p-4 rounded-xl">
            {rightSidebar}
          </aside>
        )}
      </div>
    </div>
  );
}

// ==========================================================================
// 7. REUSABLE SYSTEM: HERO LAYOUT
// ==========================================================================
interface HeroLayoutProps extends HeroData {
  className?: string;
}

export function HeroLayout({
  accentText,
  title,
  subtitle,
  ctas = [],
  backgroundImage,
  alignment = 'center',
  className = ''
}: HeroLayoutProps) {
  const alignmentClasses = {
    center: 'text-center items-center justify-center max-w-3xl mx-auto',
    left: 'text-left items-start justify-start max-w-4xl',
    right: 'text-right items-end justify-end max-w-4xl ml-auto'
  };

  return (
    <div className={`relative isolate w-full rounded-2xl overflow-hidden border border-slate-800/70 p-6 sm:p-12 md:p-16 flex flex-col ${alignment === 'center' ? 'items-center text-center' : alignment === 'left' ? 'items-start text-left' : 'items-end text-right'} bg-gradient-to-br from-[#0c1224] via-[#090d18] to-[#040811] ${className}`}>
      {/* Grid overlay for ambient tech aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141b30_1px,transparent_1px),linear-gradient(to_bottom,#141b30_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
      
      {/* Gradient glow nodes */}
      <div className="absolute -top-12 left-1/3 h-[20rem] w-[20rem] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

      <div className={`relative z-10 space-y-6 ${alignmentClasses[alignment]}`}>
        {accentText && (
          <div className="flex justify-center sm:justify-start">
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 bg-cyan-400/5 border border-cyan-400/15 px-2.5 py-1 rounded uppercase font-bold">
              {accentText}
            </span>
          </div>
        )}
        
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
            {subtitle}
          </p>
        )}

        {ctas && ctas.length > 0 && (
          <div className={`pt-2 flex flex-wrap gap-3 ${alignment === 'center' ? 'justify-center' : alignment === 'left' ? 'justify-start' : 'justify-end'}`}>
            {ctas.map((cta, index) => (
              <a
                key={index}
                href={cta.url}
                className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 shadow-md ${
                  cta.variant === 'primary' 
                    ? 'bg-cyan-400 hover:bg-cyan-500 text-slate-950 focus:ring-2 focus:ring-cyan-500' 
                    : cta.variant === 'glow'
                    ? 'bg-[#0b1224] text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:shadow-[0_0_25px_rgba(0,229,255,0.25)]'
                    : 'bg-[#18233c] hover:bg-[#1f2d4d] text-white border border-slate-800'
                }`}
              >
                {cta.text}
              </a>
            ))}
          </div>
        )}
      </div>

      {backgroundImage && (
        <span className="absolute bottom-2 left-6 text-[9px] font-mono text-slate-600 block">[ CMS BG URL: {backgroundImage} ]</span>
      )}
    </div>
  );
}

// ==========================================================================
// 8. REUSABLE SYSTEM: CTA LAYOUT
// ==========================================================================
interface CtaLayoutProps extends CtaLayoutData {
  className?: string;
}

export function CTALayout({
  accentText,
  title,
  subtitle,
  ctas,
  layoutType = 'card',
  theme = 'glass',
  className = ''
}: CtaLayoutProps) {
  
  const themeClasses = {
    dark: 'bg-[#0f172a] border border-slate-800',
    neon: 'bg-[#070d19] border border-cyan-500/20 shadow-lg shadow-cyan-500/5',
    glass: 'bg-[#131b2e]/50 backdrop-blur-md border border-slate-800/80 shadow-md'
  };

  if (layoutType === 'split') {
    return (
      <div className={`p-6 sm:p-10 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${themeClasses[theme]} ${className}`}>
        <div className="space-y-2 max-w-2xl">
          {accentText && (
            <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest">{accentText}</span>
          )}
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          {ctas.map((cta, i) => (
            <a 
              key={i} 
              href={cta.url} 
              className={`px-4 py-2 rounded text-xs font-mono font-bold tracking-tight transition-all duration-200 ${
                cta.variant === 'primary' 
                  ? 'bg-cyan-400 hover:bg-cyan-505 text-slate-950 font-bold' 
                  : 'border border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              {cta.text}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`p-8 sm:p-12 rounded-2xl text-center space-y-5 max-w-4xl mx-auto overflow-hidden relative ${themeClasses[theme]} ${className}`}>
      {/* Decorative pulse element */}
      <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-cyan-400/5 blur-xl pointer-events-none"></div>

      <div className="space-y-2 max-w-2xl mx-auto z-10 relative">
        {accentText && (
          <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">{accentText}</span>
        )}
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 leading-relaxed">{subtitle}</p>}
      </div>

      <div className="flex justify-center flex-wrap gap-3 pt-2 z-10 relative">
        {ctas.map((cta, i) => (
          <a
            key={i}
            href={cta.url}
            className={`px-4.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
              cta.variant === 'primary' 
                ? 'bg-cyan-400 hover:bg-cyan-500 text-slate-950 shadow-md shadow-cyan-400/10' 
                : 'bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {cta.text}
          </a>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// 9. REUSABLE SYSTEM: FAQ LAYOUT (ACCORDION DECK)
// ==========================================================================
interface FAQLayoutProps extends FaqData {
  className?: string;
}

export function FAQLayout({
  title,
  subtitle,
  items,
  className = ''
}: FAQLayoutProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`space-y-8 max-w-3xl mx-auto ${className}`}>
      {(title || subtitle) && (
        <div className="text-center space-y-2">
          {title && <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">{title}</h2>}
          {subtitle && <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">{subtitle}</p>}
        </div>
      )}

      <div className="border border-slate-800/85 bg-[#0b1224]/65 rounded-xl overflow-hidden divide-y divide-slate-850 shadow-md">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="transition-all duration-200">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-4.5 sm:p-5 text-left font-sans text-xs sm:text-sm font-semibold text-white hover:bg-slate-900/40 focus:outline-none transition-colors"
              >
                <span className="pr-4 flex items-center gap-2">
                  <HelpCircle size={15} className="text-cyan-400 shrink-0" />
                  {item.question}
                </span>
                <span className="h-5 w-5 rounded bg-slate-850 flex items-center justify-center text-slate-400 hover:text-cyan-400 pointer-events-none">
                  {isOpen ? <Minus size={11} /> : <Plus size={11} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-56 border-t border-slate-850 bg-[#070b13]/50' : 'max-h-0'
                }`}
              >
                <div className="p-4.5 sm:p-5 text-xs text-slate-350 leading-relaxed font-sans max-w-2xl">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================================================
// 10. REUSABLE SYSTEM: CONTACT LAYOUT
// ==========================================================================
interface ContactLayoutProps extends ContactData {
  className?: string;
}

export function ContactLayout({
  title,
  subtitle,
  email = 'architects@digital.co',
  phone = '+1 (555) 019-2831',
  address = 'Cloud Base One, Suite 400, Orbit',
  formPlaceholderName = 'Your Name',
  formPlaceholderEmail = 'your@email.com',
  formPlaceholderMessage = 'How can our multi-page blueprint help you?',
  className = ''
}: ContactLayoutProps) {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className={`space-y-8 ${className}`}>
      {(title || subtitle) && (
        <div className="space-y-1">
          {title && <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">{title}</h2>}
          {subtitle && <p className="text-xs text-slate-400 max-w-xl leading-relaxed">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Contact Coordinates */}
        <div className="lg:col-span-4 space-y-5">
          <div className="border border-slate-800/80 bg-[#0b1224] p-5 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-white border-b border-slate-900 pb-2 uppercase text-cyan-400 tracking-wider">Coordinates Depot</h4>
            
            <div className="space-y-3.5 font-sans text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <Mail size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium text-[10px] text-slate-500 font-mono uppercase">EMAIL CHANNEL</span>
                  <span className="text-slate-200 select-all font-mono">{email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Phone size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium text-[10px] text-slate-500 font-mono uppercase">PHONE COUPLING</span>
                  <span className="text-slate-200 select-all font-mono">{phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <MapPin size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium text-[10px] text-slate-500 font-mono uppercase">STATIC LOCATION</span>
                  <span className="text-slate-250 leading-relaxed font-mono">{address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive form simulator */}
        <div className="lg:col-span-8 border border-slate-800/80 bg-[#0e1628]/40 p-6 rounded-xl relative overflow-hidden">
          {formSent ? (
            <div className="py-12 text-center space-y-3">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <Check size={18} />
              </div>
              <h4 className="text-xs font-bold text-white">Transmission Relayed Safely!</h4>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                Form payload successfully simulated and parsed against standard SEO configurations.
              </p>
              <button 
                onClick={() => setFormSent(false)}
                className="text-[10px] font-mono text-cyan-400 font-bold underline hover:text-cyan-300 mt-2"
              >
                Transmit Another Wave
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1.5">Your Identity</label>
                  <input 
                    required
                    type="text" 
                    placeholder={formPlaceholderName}
                    className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1.5">Return Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder={formPlaceholderEmail}
                    className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1.5">Message payload</label>
                <textarea 
                  required
                  rows={4} 
                  placeholder={formPlaceholderMessage}
                  className="w-full bg-slate-950 border border-slate-850 rounded px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-950 py-2 rounded font-mono font-bold text-xs shadow-md transition-all duration-200"
              >
                Send Encrypted Dispatch (API Mock)
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 11. REUSABLE SYSTEM: PRICING LAYOUT (MATRIX DECK)
// ==========================================================================
interface PricingLayoutProps extends PricingData {
  className?: string;
}

export function PricingLayout({
  title,
  subtitle,
  plans,
  className = ''
}: PricingLayoutProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          {title && <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">{title}</h2>}
          {subtitle && <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {plans.map((plan, i) => (
          <div 
            key={i}
            className={`border rounded-2xl p-6.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
              plan.isPopular 
                ? 'bg-[#121d37] border-cyan-400/80 shadow-xl shadow-cyan-500/5 scale-100 relative overflow-hidden' 
                : 'bg-[#0b1224] border-slate-800'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0">
                <span className="bg-cyan-400 text-slate-950 text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl inline-block shadow-sm">
                  POPULAR MODEL
                </span>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">{plan.planName}</span>
                <div className="flex items-baseline gap-1.5 text-white">
                  <span className="text-2xl font-extrabold tracking-tight font-mono">{plan.price}</span>
                  {plan.billingPeriod && (
                    <span className="text-[10px] text-slate-400 font-mono uppercase">{plan.billingPeriod}</span>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-900 pt-4.5">
                <ul className="space-y-2.5 font-sans text-xs">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5 text-slate-305">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href={plan.ctaUrl}
                className={`w-full py-2.5 rounded-lg text-xs font-mono font-bold text-center block tracking-tight transition-all duration-200 ${
                  plan.isPopular 
                    ? 'bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-extrabold shadow-md' 
                    : 'bg-slate-900 hover:bg-slate-850 border border-slate-850 text-slate-300 hover:text-white'
                }`}
              >
                {plan.ctaText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// 12. REUSABLE SYSTEM: TESTIMONIAL LAYOUT
// ==========================================================================
interface TestimonialLayoutProps extends TestimonialData {
  className?: string;
}

export function TestimonialLayout({
  title,
  subtitle,
  items,
  className = ''
}: TestimonialLayoutProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          {title && <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">{title}</h2>}
          {subtitle && <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <div 
            key={i}
            className="bg-[#0b1224] border border-slate-800/85 p-6 rounded-2xl hover:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Rating stars if requested */}
              {item.rating && (
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star 
                      key={starIdx} 
                      size={12} 
                      fill={starIdx < (item.rating || 5) ? "currentColor" : "none"} 
                      className={starIdx < (item.rating || 5) ? "" : "text-slate-700"}
                    />
                  ))}
                </div>
              )}
              
              <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                "{item.quote}"
              </p>
            </div>

            <div className="border-t border-slate-900/60 pt-4 mt-6 flex items-center gap-3">
              {item.avatarUrl ? (
                <div className="h-8 w-8 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center font-mono text-[9px] text-cyan-400 font-bold uppercase shrink-0">
                  {item.authorName.slice(0, 2)}
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full border border-slate-850 bg-slate-900 flex items-center justify-center font-mono text-[9px] text-slate-500 shrink-0 uppercase font-black">
                  {item.authorName.slice(0, 2)}
                </div>
              )}
              <div>
                <h4 className="text-[11px] font-bold text-white font-sans leading-none">{item.authorName}</h4>
                {item.authorRole && (
                  <span className="text-[9px] text-slate-450 font-mono uppercase mt-0.5 block">{item.authorRole}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
