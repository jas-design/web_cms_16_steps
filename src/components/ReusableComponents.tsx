import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronDown,
  Star, 
  Check, 
  X, 
  Info, 
  AlertTriangle, 
  Search, 
  Menu, 
  Mail, 
  Phone, 
  MapPin, 
  Play, 
  Pause,
  ArrowLeft,
  Calendar,
  User,
  Shield,
  HelpCircle,
  Eye,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ============================================================================
// COMPONENT CONVENTIONS, SCSS PRESETS AND MODERN SYSTEM ARCHITECTURE
// ============================================================================
/*
  COMPONENT NAMING CONVENTIONS:
  1. Primary Layout Wrappers: UpperCamelCase (e.g., SectionWrapper)
  2. Core Reusable Elements: UpperCamelCase (e.g., Button, Badge, TestimonialCard)
  3. Interactive Compound Sub-items: ComponentNameItem (e.g., AccordionItem)
  4. Form Controls: Prefix with Form (e.g., FormInput, FormSelect)

  SCSS & CSS UTILITY CORRESPONDENCE:
  All layout controls leverage standard CSS variables mapped to Tailwind theme configurations:
  - Theme colors: bg-[#080c14] (primary), border border-slate-800/80 (boundaries), text-cyan-400 (interactive highlight)
  - Layout scales correspond directly to Utopia design tokens (fluid clamp scales mapped from 320px to 1440px wide templates).

  MODIFIER SYSTEM:
  Most components employ a typed "modifier prop" schema rather than string-concatenation,
  making them robust to typos and strictly guarded by TypeScript typings.
*/

// ============================================================================
// 1. REUSABLE BADGE SYSTEM
// ============================================================================
export interface BadgeProps {
  label: string;
  variant?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'slate' | 'neon' | 'glow';
  size?: 'xs' | 'sm' | 'md';
  onClose?: () => void;
  icon?: React.ReactNode;
}

export function Badge({
  label,
  variant = 'cyan',
  size = 'sm',
  onClose,
  icon
}: BadgeProps) {
  // Normalized brand visual configurations
  const variantStyles = {
    cyan: 'bg-brand-teal/8 text-brand-teal border border-brand-teal/15 shadow-sm',
    emerald: 'bg-brand-mint text-brand-teal border border-brand-teal/10',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200/50',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200/50',
    slate: 'bg-slate-50 text-slate-600 border border-slate-200',
    neon: 'bg-brand-chartreuse/12 text-brand-forest border border-brand-chartreuse/35 font-semibold',
    glow: 'bg-brand-mint text-brand-teal border border-brand-teal/20 shadow-brand-glow'
  };

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-bold',
    sm: 'px-3 py-0.75 text-[10px] font-mono tracking-wider uppercase font-bold',
    md: 'px-4 py-1 text-xs font-sans font-semibold'
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-full select-none transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]}`}
      role="status"
    >
      {icon && <span className="shrink-0 text-brand-teal">{icon}</span>}
      <span>{label}</span>
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-1 shrink-0 p-0.5 rounded-full hover:bg-black/5 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X size={8} />
        </button>
      )}
    </span>
  );
}

// ============================================================================
// 2. ATOMIC BUTTON COMPONENT
// ============================================================================
export interface ButtonProps {
  key?: React.Key;
  text: string;
  url?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glow' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  fullWidth?: boolean;
}

export function Button({
  text,
  url,
  variant = 'primary',
  size = 'md',
  iconRight,
  iconLeft,
  loading = false,
  disabled = false,
  ariaLabel,
  onClick,
  fullWidth = false
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-sans font-bold tracking-wide rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-teal/40 disabled:opacity-50 disabled:pointer-events-none select-none hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.985]";
  
  const variantStyles = {
    primary: "bg-brand-chartreuse hover:bg-[#c4dd2a] text-brand-forest shadow-lg shadow-brand-chartreuse/10 hover:shadow-chartreuse-glow",
    secondary: "bg-brand-forest hover:bg-brand-forest/90 text-brand-mint shadow-lg shadow-brand-forest/10",
    outline: "bg-transparent border-2 border-brand-forest/80 text-brand-forest hover:bg-brand-forest hover:text-white",
    glow: "bg-brand-teal text-white hover:bg-[#0c8881] shadow-lg shadow-brand-teal/10 hover:shadow-brand-glow",
    danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/10",
    ghost: "bg-transparent hover:bg-brand-teal/8 text-brand-teal hover:text-[#0c8881]",
    glass: "bg-white/80 border border-brand-teal/10 backdrop-blur-md text-brand-forest hover:bg-brand-mint/40"
  };

  const sizeStyles = {
    sm: "px-4 py-1.75 text-xs",
    md: "px-5.5 py-2.5 text-xs sm:text-sm",
    lg: "px-7 py-3.5 text-sm sm:text-base"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const renderContent = () => (
    <>
      {loading ? (
        <span className="h-4 w-4 rounded-full border-2 border-brand-forest border-t-transparent animate-spin mr-2" />
      ) : iconLeft ? (
        <span className="mr-2 leading-none shrink-0">{iconLeft}</span>
      ) : null}
      
      <span>{text}</span>
      
      {!loading && iconRight && (
        <span className="ml-2 leading-none shrink-0 group-hover:translate-x-1 transition-transform duration-200">{iconRight}</span>
      )}
    </>
  );

  if (url) {
    return (
      <a 
        href={url}
        onClick={onClick as any}
        className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} group`}
        aria-label={ariaLabel || text}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} group`}
      aria-label={ariaLabel || text}
    >
      {renderContent()}
    </button>
  );
}

// ============================================================================
// 3. SEMANTIC SYSTEM CARD COMPONENT
// ============================================================================
export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outlined' | 'glass' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  id?: string;
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  id,
  className = ''
}: CardProps) {
  const baseClasses = "rounded-2xl overflow-hidden transition-all duration-300 relative";
  
  const variantStyles = {
    default: "bg-white border border-brand-teal/8 shadow-sm",
    accent: "bg-brand-mint/35 border border-brand-teal/15 shadow-sm before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-brand-teal",
    outlined: "bg-transparent border border-brand-teal/12",
    glass: "border border-brand-teal/8 bg-white/70 backdrop-blur-md shadow-sm",
    interactive: "bg-white border border-brand-teal/8 hover:border-brand-teal/20 shadow-sm hover:shadow-brand-glow hover:-translate-y-[3px] group"
  };

  const paddingStyles = {
    none: "p-0",
    sm: "p-4",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10"
  };

  return (
    <div 
      id={id}
      className={`${baseClasses} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================================
// 4. ATOMIC PRICING CARD COMPONENT (JSON PROPS)
// ============================================================================
export interface PricingCardProps {
  planName: string;
  price: string;
  billingPeriod?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  ctaUrl: string;
  description?: string;
  onCtaClick?: () => void;
}

export function PricingCard({
  planName,
  price,
  billingPeriod = '/ mo',
  isPopular = false,
  features,
  ctaText,
  ctaUrl,
  description,
  onCtaClick
}: PricingCardProps) {
  return (
    <div 
      className={`rounded-3xl relative transition-all duration-300 flex flex-col justify-between p-8 sm:p-10 min-h-[32rem] ${
        isPopular 
          ? 'bg-brand-forest border-2 border-brand-teal/40 shadow-xl shadow-brand-forest/15 scale-[1.02] z-10 text-white' 
          : 'bg-white border border-brand-teal/10 hover:border-brand-teal/25 shadow-sm hover:shadow-md text-brand-forest'
      }`}
    >
      {isPopular && (
        <span className="absolute top-0 right-1/2 translate-x-1/2 translate-y-[-50%] bg-brand-chartreuse text-brand-forest font-mono text-[9px] font-extrabold uppercase tracking-widest px-4 py-1.25 rounded-full shadow-md shadow-brand-chartreuse/10">
          Rejuvenating Treatment Choice
        </span>
      )}

      <div className="space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <h4 className={`text-xs font-mono font-bold tracking-widest uppercase ${isPopular ? 'text-brand-chartreuse' : 'text-brand-teal'}`}>{planName}</h4>
            {description && <p className={`text-xs mt-1.5 font-sans font-normal leading-relaxed ${isPopular ? 'text-brand-mint/70' : 'text-slate-500'}`}>{description}</p>}
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 pt-2">
          <span className={`text-4xl sm:text-5xl font-serif tracking-tight font-medium ${isPopular ? 'text-brand-mint' : 'text-brand-forest'}`}>{price}</span>
          <span className={`text-xs font-mono ${isPopular ? 'text-brand-mint/60' : 'text-slate-400'}`}>{billingPeriod}</span>
        </div>

        {/* Dynamic feature dividers */}
        <div className={`pt-5 border-t space-y-4 ${isPopular ? 'border-brand-mint/10' : 'border-brand-teal/8'}`}>
          <span className={`text-[9px] font-mono font-bold tracking-widest uppercase block ${isPopular ? 'text-brand-chartreuse/85' : 'text-brand-teal'}`}>skincare inclusion benefits</span>
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                <div className={`shrink-0 mt-0.5 h-4 w-4 rounded-full flex items-center justify-center border ${
                  isPopular 
                    ? 'bg-brand-teal/15 text-brand-chartreuse border-brand-teal/20' 
                    : 'bg-brand-teal/5 text-brand-teal border-brand-teal/10'
                }`}>
                  <Check size={10} className="stroke-[3]" />
                </div>
                <span className={`font-sans leading-relaxed ${isPopular ? 'text-brand-mint/90' : 'text-slate-600'}`}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8">
        <Button 
          text={ctaText}
          url={ctaUrl}
          variant={isPopular ? 'primary' : 'outline'}
          fullWidth={true}
          onClick={onCtaClick}
        />
      </div>
    </div>
  );
}

// ============================================================================
// 5. ATOMIC SERVICE CARD COMPONENT
// ============================================================================
export interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tags?: string[];
  linkUrl?: string;
  linkLabel?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  tags = [],
  linkUrl,
  linkLabel = "Explore skincare benefits"
}: ServiceCardProps) {
  return (
    <div className="p-7 rounded-2xl bg-white border border-brand-teal/8 hover:border-brand-teal/20 hover:shadow-brand-glow hover:-translate-y-[3px] transition-all duration-300 group flex flex-col justify-between h-full shadow-sm">
      <div className="space-y-4.5">
        <div className="h-11 w-11 flex items-center justify-center rounded-2xl bg-brand-teal/5 border border-brand-teal/12 text-brand-teal group-hover:bg-brand-teal group-hover:text-white group-hover:shadow-brand-glow transition-all duration-300">
          {icon || <Check size={18} />}
        </div>

        <div className="space-y-2 focus:outline-none">
          <h4 className="text-base font-bold text-brand-forest group-hover:text-brand-teal transition-colors font-sans">{title}</h4>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">{description}</p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-brand-mint border border-brand-teal/8 text-brand-teal font-bold">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {linkUrl && (
        <a 
          href={linkUrl}
          className="text-xs font-mono text-brand-teal hover:text-brand-forest flex items-center gap-1.5 mt-6 uppercase font-bold tracking-wider transition-all duration-200"
        >
          <span>{linkLabel}</span>
          <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  );
}

// ============================================================================
// 6. ATOMIC TESTIMONIAL CARD COMPONENT
// ============================================================================
export interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorRole?: string;
  rating?: number;
  avatarUrl?: string;
}

export function TestimonialCard({
  quote,
  authorName,
  authorRole = "Verified Treatment Client",
  rating = 5,
  avatarUrl
}: TestimonialCardProps) {
  return (
    <figure className="bg-white border border-brand-teal/8 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all duration-300">
      <div className="space-y-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < rating ? "text-brand-chartreuse fill-brand-chartreuse text-[#8ca310]" : "text-slate-200"} 
            />
          ))}
        </div>
        <blockquote className="text-sm sm:text-base text-brand-forest/90 tracking-normal font-serif italic leading-relaxed">
          "{quote}"
        </blockquote>
      </div>

      <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-brand-teal/8">
        <div className="h-10 w-10 rounded-full bg-brand-mint border border-brand-teal/12 shrink-0 overflow-hidden flex items-center justify-center">
          {avatarUrl ? (
            <img src={avatarUrl} alt={authorName} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
          ) : (
            <User size={15} className="text-brand-teal/60" />
          )}
        </div>
        <div className="min-w-0">
          <figcaption className="text-xs sm:text-sm font-bold text-brand-forest truncate font-sans">{authorName}</figcaption>
          <span className="text-[10px] sm:text-[11px] text-slate-400 block truncate font-mono uppercase tracking-wider font-semibold">{authorRole}</span>
        </div>
      </div>
    </figure>
  );
}

// ============================================================================
// 7. ATOMIC FEATURE CARD COMPONENT
// ============================================================================
export interface FeatureCardProps {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  icon?: React.ReactNode;
  imageUrl?: string;
}

export function FeatureCard({
  title,
  description,
  metric,
  metricLabel,
  icon,
  imageUrl
}: FeatureCardProps) {
  return (
    <article className="rounded-2xl overflow-hidden bg-white border border-brand-teal/8 hover:border-brand-teal/15 hover:shadow-brand-glow hover:-translate-y-[2px] transition-all duration-300 flex flex-col h-full group shadow-sm">
      {imageUrl && (
        <div className="w-full h-44 bg-brand-blue-bg/40 overflow-hidden relative">
          <div className="absolute inset-0 bg-brand-teal/5 select-none pointer-events-none group-hover:bg-transparent transition-colors duration-300"></div>
          <img 
            src={imageUrl} 
            alt={title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
          />
        </div>
      )}

      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {icon && (
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-teal/5 border border-brand-teal/10 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-300 shadow-sm">
                {icon}
              </div>
            )}
            {metric && (
              <div className="text-right">
                <span className="text-base font-extrabold text-[#0bc4b9] font-mono tracking-tighter block">{metric}</span>
                {metricLabel && <span className="text-[9px] text-[#0bc4b9] font-mono tracking-widest uppercase block font-bold">{metricLabel}</span>}
              </div>
            )}
          </div>

          <div className="space-y-1.5 pb-2">
            <h4 className="text-base font-bold text-brand-forest group-hover:text-brand-teal transition-colors font-sans">{title}</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">{description}</p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-brand-teal/8 flex justify-between items-center text-[10px] text-brand-teal font-mono uppercase tracking-widest font-bold">
          <span>Treatment Supervised</span>
          <Check size={12} className="text-brand-teal shrink-0" />
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// 8. ACCESSIBLE ACCORDION SYSTEM (SINGLE OR MULTI EXPANSIONS)
// ============================================================================
export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
}

export function Accordion({
  items,
  allowMultiple = false
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setExpandedIds(prev => 
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
    } else {
      setExpandedIds(prev => 
        prev.includes(id) ? [] : [id]
      );
    }
  };

  return (
    <div className="space-y-3 font-sans">
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        return (
          <div 
            key={item.id}
            className="border border-brand-teal/8 bg-white hover:border-brand-teal/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
          >
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:bg-brand-mint/10 active:bg-brand-mint/20 cursor-pointer"
              aria-expanded={isExpanded}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
            >
              <span className="text-sm sm:text-base font-bold text-brand-forest hover:text-brand-teal transition-colors duration-205">{item.title}</span>
              <span className="shrink-0 p-1.5 bg-brand-mint border border-brand-teal/8 rounded-full">
                {isExpanded ? (
                  <Minus size={12} className="text-brand-teal shrink-0" />
                ) : (
                  <Plus size={12} className="text-brand-teal shrink-0" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-brand-teal/8 bg-brand-mint/5"
                >
                  <div className="px-6 py-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-3xl">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 9. ACCESSIBLE MODAL WINDOW SYSTEM
// ============================================================================
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md'
}: ModalProps) {
  // Capture focus and handle escape keydown bounds
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const maxWClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-forest/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 20, stiffness: 240 }}
            className={`w-full ${maxWClasses[maxWidth]} bg-white border border-brand-teal/15 rounded-3xl shadow-xl relative overflow-hidden flex flex-col max-h-[90vh]`}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-brand-teal/8 shrink-0">
              <h3 id="modal-title" className="text-sm sm:text-base font-bold text-brand-forest font-sans flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-brand-teal shrink-0 inline-block animate-pulse"></span>
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-brand-mint border border-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Close modal dialog"
              >
                <X size={14} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-teal/10 text-slate-600 font-sans text-xs sm:text-sm">
              {children}
            </div>

            {/* Modal Action footer */}
            <div className="px-6 py-4.5 bg-brand-mint/30 border-t border-brand-teal/8 shrink-0 flex justify-end gap-2.5 text-xs">
              <Button text="Cancel Operation" variant="ghost" size="sm" onClick={onClose} />
              <Button text="Execute Slate" variant="glow" size="sm" onClick={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// 10. REUSABLE FORMS CONTROLS (WITH REAL-TIME VALIDATION INDICATION)
// ============================================================================
export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  id?: string;
  className?: string;
  required?: boolean;
}

export function FormInput({
  label,
  error,
  helperText,
  icon,
  id,
  className = '',
  required,
  ...props
}: FormInputProps) {
  const inputID = id || `form-control-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={`space-y-2 font-sans w-full ${className}`}>
      <label 
        htmlFor={inputID}
        className="flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold tracking-wider text-[#3c5651]"
      >
        <span>{label}</span>
        {required && <span className="text-brand-teal">*</span>}
      </label>

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-brand-teal/60 pointer-events-none">{icon}</span>
        )}
        <input
          id={inputID}
          required={required}
          className={`w-full bg-white text-brand-forest text-sm font-sans rounded-xl border px-4 py-2.5 hover:border-brand-teal/40 focus:outline-none focus:ring-2 focus:ring-brand-teal/10 transition-all duration-200 ${
            icon ? 'pl-10' : ''
          } ${
            error 
              ? 'border-rose-300 focus:border-rose-500/80 focus:ring-rose-500/10' 
              : 'border-brand-teal/15 focus:border-brand-teal focus:ring-brand-teal/10'
          }`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-[10px] sm:text-xs font-mono text-rose-600 flex items-center gap-1">
          <AlertTriangle size={11} className="shrink-0" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 font-sans leading-normal">{helperText}</p>
      ) : null}
    </div>
  );
}

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  id?: string;
  className?: string;
  required?: boolean;
  rows?: number;
}

export function FormTextarea({
  label,
  error,
  helperText,
  id,
  className = '',
  required,
  rows = 3,
  ...props
}: FormTextareaProps) {
  const textareaID = id || `form-control-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={`space-y-2 font-sans w-full ${className}`}>
      <label 
        htmlFor={textareaID}
        className="flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold tracking-wider text-[#3c5651]"
      >
        <span>{label}</span>
        {required && <span className="text-brand-teal">*</span>}
      </label>

      <textarea
        id={textareaID}
        required={required}
        rows={rows}
        className={`w-full bg-white text-brand-forest text-sm font-sans rounded-xl border px-4 py-2.5 hover:border-brand-teal/40 focus:outline-none focus:ring-2 focus:ring-brand-teal/10 transition-all duration-200 ${
          error 
            ? 'border-rose-300 focus:border-rose-500/80 focus:ring-rose-500/10' 
            : 'border-brand-teal/15 focus:border-brand-teal focus:ring-brand-teal/10'
        }`}
        {...props}
      />

      {error ? (
        <p className="text-[10px] sm:text-xs font-mono text-rose-600 flex items-center gap-1">
          <AlertTriangle size={11} className="shrink-0" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 font-sans leading-normal">{helperText}</p>
      ) : null}
    </div>
  );
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
  id?: string;
  className?: string;
  required?: boolean;
}

export function FormSelect({
  label,
  options,
  error,
  id,
  className = '',
  required,
  ...props
}: FormSelectProps) {
  const selectID = id || `form-control-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={`space-y-2 font-sans w-full ${className}`}>
      <label 
        htmlFor={selectID}
        className="flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold tracking-wider text-[#3c5651]"
      >
        <span>{label}</span>
        {required && <span className="text-brand-teal">*</span>}
      </label>

      <div className="relative">
        <select
          id={selectID}
          required={required}
          className={`w-full appearance-none bg-white text-brand-forest text-sm font-sans rounded-xl border px-4 py-2.5 pr-10 hover:border-brand-teal/40 focus:outline-none focus:ring-2 focus:ring-brand-teal/10 transition-all duration-200 ${
            error 
              ? 'border-rose-300 focus:border-rose-500/80 focus:ring-rose-500/10' 
              : 'border-brand-teal/15 focus:border-brand-teal focus:ring-brand-teal/10'
          }`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-brand-teal">
          <ChevronDown size={15} />
        </div>
      </div>

      {error && (
        <p className="text-[10px] sm:text-xs font-mono text-rose-600 flex items-center gap-1">
          <AlertTriangle size={11} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// 11. REUSABLE SLIDER / CAROUSEL SYSTEM
// ============================================================================
export interface SliderProps {
  slides: {
    title: string;
    description: string;
    tag?: string;
    bgImage?: string;
  }[];
  autoPlayInterval?: number;
}

export function Slider({
  slides,
  autoPlayInterval = 6000
}: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Automated rotating effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(nextSlide, autoPlayInterval);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeIndex, autoPlayInterval]);

  return (
    <div className="relative w-full overflow-hidden bg-brand-mint border border-brand-teal/8 p-1 rounded-3xl shadow-sm min-h-[22rem] flex flex-col justify-between">
      {/* Container Track */}
      <div className="flex-1 relative flex items-center p-6 sm:p-10 z-10">
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-r from-brand-mint/90 via-brand-mint/60 to-transparent pointer-events-none select-none z-0" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="space-y-4.5 max-w-xl z-10"
          >
            {slides[activeIndex].tag && (
              <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest bg-brand-teal/10 text-brand-teal border border-brand-teal/15 uppercase">
                {slides[activeIndex].tag}
              </span>
            )}

            <h3 className="text-xl sm:text-2xl font-serif text-brand-forest font-medium leading-snug">
              {slides[activeIndex].title}
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
              {slides[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Navigation Strip */}
      <div className="bg-white px-5 py-3.5 rounded-b-[22px] border-t border-brand-teal/8 flex items-center justify-between shrink-0 z-10">
        {/* Toggle continuous rotations */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 px-3.5 rounded-full bg-brand-mint border border-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-250 flex items-center gap-1.5 text-[10px] cursor-pointer"
            aria-label={isPlaying ? "Pause slide loop" : "Play slide loop"}
          >
            {isPlaying ? <Pause size={10} /> : <Play size={10} />}
            <span className="font-mono uppercase font-bold text-[9px]">{isPlaying ? 'Looping' : 'Paused'}</span>
          </button>
        </div>

        {/* Visual active dots indicator */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-6 bg-brand-teal' : 'w-2 bg-brand-teal/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Back and Forth Arrows */}
        <div className="flex gap-1.5">
          <button 
            onClick={prevSlide}
            className="p-1.5 bg-brand-mint border border-brand-teal/8 hover:bg-brand-teal hover:text-white transition-all rounded-full text-brand-teal cursor-pointer"
            aria-label="Previous image carousel slide"
          >
            <ArrowLeft size={11} />
          </button>
          <span className="text-[11px] font-mono text-slate-400 p-1 shrink-0 self-center font-bold">{activeIndex + 1} / {slides.length}</span>
          <button 
            onClick={nextSlide}
            className="p-1.5 bg-brand-mint border border-brand-teal/8 hover:bg-brand-teal hover:text-white transition-all rounded-full text-brand-teal cursor-pointer"
            aria-label="Next image carousel slide"
          >
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 12. FILTERABLE REUSABLE GALLERY SYSTEM
// ============================================================================
export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description?: string;
}

export interface GalleryProps {
  items: GalleryItemData[];
  columns?: 2 | 3 | 4;
}

export function Gallery({
  items,
  columns = 3
}: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeZoomedItem, setActiveZoomedItem] = useState<GalleryItemData | null>(null);

  // Derive simple categorized checklist
  const categories = ['ALL', ...Array.from(new Set(items.map(item => item.category.toUpperCase())))];

  // Filter lists based on buttons selections
  const filteredItems = selectedCategory === 'ALL' 
    ? items 
    : items.filter(x => x.category.toUpperCase() === selectedCategory);

  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="space-y-6">
      {/* Category Selection Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brand-teal/8 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.75 rounded-full font-mono text-[10px] sm:text-xs font-bold transition-all duration-200 uppercase border cursor-pointer ${
              selectedCategory === cat 
                ? 'bg-brand-teal text-white border-brand-teal shadow-sm shadow-brand-teal/15' 
                : 'bg-transparent text-slate-500 border-transparent hover:text-brand-forest hover:bg-brand-teal/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Elements layout wrapper */}
      <div className={`grid gap-5 sm:gap-6 ${colClasses[columns]}`}>
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.24 }}
              onClick={() => setActiveZoomedItem(item)}
              className="group bg-white border border-brand-teal/8 hover:border-brand-teal/20 rounded-2xl overflow-hidden cursor-zoom-in group flex flex-col justify-between shadow-sm hover:shadow-brand-glow transition-all duration-300"
            >
              {/* Asset Box */}
              <div className="w-full h-48 bg-brand-blue-bg/40 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-teal/5 select-none pointer-events-none group-hover:bg-transparent transition-colors duration-300"></div>
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    referrerPolicy="no-referrer" 
                    className={`w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ${
                      idx % 2 === 0 ? 'rounded-[40px_16px_40px_16px]' : 'rounded-[16px_40px_16px_40px]'
                    }`} 
                  />
                ) : (
                  <div className="w-full h-full bg-brand-mint flex items-center justify-center text-brand-teal/60">
                    <span className="font-mono text-[10px] font-bold tracking-widest">PURE DERMA FORMULA</span>
                  </div>
                )}
                {/* Float Category Overlay tag */}
                <span className="absolute top-3 left-3 px-3 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-white/90 border border-brand-teal/10 text-brand-teal font-bold shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Text Box */}
              <div className="p-5 flex-1">
                <h4 className="text-sm sm:text-base font-bold text-brand-forest group-hover:text-brand-teal transition-colors font-sans">{item.title}</h4>
                {item.description && <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans mt-2">{item.description}</p>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* PopUp Detail Zoom Overlay */}
      <AnimatePresence>
        {activeZoomedItem && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveZoomedItem(null)}
              className="absolute inset-0 bg-brand-forest/65 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white border border-brand-teal/15 rounded-3xl overflow-hidden max-w-2xl w-full relative shadow-2xl"
            >
              <div className="w-full h-64 sm:h-80 bg-brand-blue-bg/40 relative">
                {activeZoomedItem.imageUrl ? (
                  <img src={activeZoomedItem.imageUrl} alt={activeZoomedItem.title} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-brand-mint flex items-center justify-center text-brand-teal/60">
                    <span className="font-mono text-xs font-bold tracking-widest animate-pulse">NATURAL BEAUTY FORMULA</span>
                  </div>
                )}
                <button 
                  onClick={() => setActiveZoomedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 border border-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-white shadow-sm transition-all cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-6.5 space-y-2.5 font-sans">
                <span className="px-3 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-brand-teal/10 text-brand-teal font-extrabold">
                  {activeZoomedItem.category}
                </span>

                <h3 className="text-lg sm:text-xl font-serif font-medium text-brand-forest mt-1.5">{activeZoomedItem.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
                  {activeZoomedItem.description || "Our premium clinical skincare formulations are decoupled from artificial inputs, guaranteeing strict safety, deep organic dermal therapy, and optimal transdermal nutrition."}
                </p>
                <div className="pt-4 flex justify-end">
                  <Button text="Dismiss Formulation Details" variant="outline" size="sm" onClick={() => setActiveZoomedItem(null)} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 13. ATOMIC CTA BLOCK CONTAINER
// ============================================================================
export interface CtaBlockProps {
  accentText?: string;
  title: string;
  subtitle: string;
  ctas: { text: string; url: string; variant?: any }[];
  theme?: 'dark' | 'neon' | 'glass';
}

export function CtaBlock({
  accentText = "ORGANIC DERMATOLOGY SOLUTIONS",
  title,
  subtitle,
  ctas,
  theme = 'glass'
}: CtaBlockProps) {
  const themeClasses = {
    dark: 'bg-brand-forest text-brand-mint border border-brand-teal/20 p-8 sm:p-14 rounded-3xl relative overflow-hidden shadow-lg',
    neon: 'bg-brand-mint border-2 border-brand-teal/40 p-8 sm:p-14 rounded-3xl relative overflow-hidden shadow-brand-glow text-brand-forest',
    glass: 'bg-white/80 border border-brand-teal/8 backdrop-blur-md p-8 sm:p-14 rounded-3xl relative overflow-hidden text-brand-forest shadow-sm'
  };

  const isDark = theme === 'dark';

  return (
    <div className={`text-center max-w-4xl mx-auto space-y-5 ${themeClasses[theme]}`}>
      {/* Visual background lights for neon/glass themes */}
      {theme !== 'dark' && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none select-none h-64 w-64 rounded-full bg-brand-teal/3 hover:bg-brand-teal/5 blur-[90px] transition-all" />
      )}

      <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase block ${isDark ? 'text-brand-chartreuse' : 'text-brand-teal'}`}>
        {accentText}
      </span>

      <h3 className={`text-xl sm:text-3xl font-serif max-w-2xl mx-auto leading-tight font-medium ${isDark ? 'text-brand-mint' : 'text-brand-forest'}`}>
        {title}
      </h3>

      <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${isDark ? 'text-brand-mint/75' : 'text-slate-500'}`}>
        {subtitle}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
        {ctas.map((cta, i) => (
          <Button 
            key={i} 
            text={cta.text} 
            url={cta.url} 
            variant={(cta.variant as any) || (i === 0 ? (isDark ? 'primary' : 'glow') : 'outline')} 
            size="md" 
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 14. ATOMIC STATS MODULE BLOCK
// ============================================================================
export interface StatsBlockProps {
  metrics: { value: string; label: string; description?: string }[];
  layout?: 'grid' | 'row' | 'card';
}

export function StatsBlock({
  metrics,
  layout = 'grid'
}: StatsBlockProps) {
  const layoutClasses = {
    grid: 'grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6',
    row: 'flex flex-col sm:flex-row items-center justify-around gap-6 py-8 sm:py-10 border-y border-brand-teal/10 bg-brand-mint/15',
    card: 'grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 sm:p-9 rounded-3xl border border-brand-teal/8 shadow-sm'
  };

  return (
    <div className={`${layoutClasses[layout]}`}>
      {metrics.map((metric, i) => (
        <div key={i} className="text-center font-sans space-y-2 py-4 px-3 hover:bg-brand-mint/30 rounded-2xl transition-all duration-200">
          <span className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-brand-teal block">
            {metric.value}
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-brand-forest font-bold block">
            {metric.label}
          </span>
          {metric.description && (
            <p className="text-xs text-slate-400 leading-normal max-w-[14rem] mx-auto font-sans font-medium">
              {metric.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 15. RESPONSIVE NAVIGATION COMPONENT
// ============================================================================
export interface NavbarProps {
  brandName: string;
  links: { label: string; url: string; children?: { label: string; url: string }[] }[];
}

export function Navbar({
  brandName,
  links
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-brand-teal/8 sticky top-0 z-[100] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-full bg-brand-teal flex items-center justify-center text-white font-serif font-black text-sm select-none">
              C
            </span>
            <span className="text-sm sm:text-base font-serif font-medium tracking-wide text-brand-forest uppercase">
              {brandName}
            </span>
          </div>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, idx) => (
              <div 
                key={idx} 
                className="relative text-brand-forest font-medium"
                onMouseEnter={() => link.children && setActiveDropdownIndex(idx)}
                onMouseLeave={() => link.children && setActiveDropdownIndex(null)}
              >
                <a 
                  href={link.children ? undefined : link.url}
                  className="text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-teal pb-1.5 focus:outline-none flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{link.label}</span>
                  {link.children && <ChevronDown size={11} className="text-brand-teal" />}
                </a>

                {/* Desktop Dropdown popup drawer */}
                <AnimatePresence>
                  {link.children && activeDropdownIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.12 }}
                      className="absolute top-full left-0 mt-1 bg-white border border-brand-teal/10 p-2.5 rounded-2xl shadow-xl min-w-[14rem] flex flex-col gap-1.5"
                    >
                      {link.children.map((sub, sIdx) => (
                        <a 
                          key={sIdx}
                          href={sub.url}
                          className="px-3 py-2 text-xs text-slate-600 hover:text-brand-teal hover:bg-brand-mint/40 rounded-xl transition-all duration-150 block"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Action Trigger Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button text="Book Appointment" size="sm" variant="glow" url="#booking" />
          </div>

          {/* Mobile responsive toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 px-2.5 bg-brand-mint border border-brand-teal/10 rounded-full text-brand-teal hover:bg-brand-teal hover:text-white transition-all cursor-pointer"
              aria-label="Toggle mobile menu disclosure draw"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer block */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-brand-teal/8 bg-white p-4.5 text-xs space-y-4"
          >
            <div className="flex flex-col gap-3">
              {links.map((link, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="font-bold text-brand-forest border-b border-brand-teal/8 pb-1 flex justify-between">
                    <span>{link.label}</span>
                    <span className="text-[9px] font-mono text-brand-teal uppercase font-black tracking-wider bg-brand-teal/5 px-2 py-0.5 rounded-full">Menu</span>
                  </div>
                  {link.children ? (
                    <div className="pl-3 py-1 flex flex-col gap-2 border-l border-brand-teal/15">
                      {link.children.map((sub, sIdx) => (
                        <a key={sIdx} href={sub.url} className="text-slate-500 hover:text-brand-teal p-0.5 block">{sub.label}</a>
                      ))}
                    </div>
                  ) : (
                    <a href={link.url} className="text-slate-500 hover:text-brand-teal p-0.5 block pl-3">{link.label}</a>
                  )}
                </div>
              ))}
            </div>
            
            <div className="pt-2">
              <Button text="Book Appointment" variant="glow" size="sm" fullWidth={true} url="#booking" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ============================================================================
// 16. DETAILED FOOTER SYSTEM METADATA COMPONENT
// ============================================================================
export interface FooterProps {
  brandName: string;
  copyright?: string;
}

export function Footer({
  brandName,
  copyright = `© ${new Date().getFullYear()} Cutisure. Beautifully formulated skin care solutions.`
}: FooterProps) {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setEmailInput("");
    }
  };

  return (
    <footer className="bg-brand-forest border-t border-brand-teal/10 pt-16 pb-10 text-xs font-sans text-brand-mint/80 justify-between shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
        {/* Brand identity */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-full bg-brand-teal text-white flex items-center justify-center text-xs font-serif font-black select-none">C</span>
            <span className="text-xs sm:text-sm font-serif font-bold text-white uppercase tracking-wider">{brandName} Care</span>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-brand-mint/75 font-sans">
            Clinically-proven organic dermatology therapies formulated to protect skin longevity, completely free from artificial toxins or aggressive chemicals.
          </p>
          {/* SEO Structured schemas list */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-brand-mint/60 border-b border-dashed border-brand-teal/20 pb-4">
            <span className="flex items-center gap-1"><Shield size={10} className="text-brand-chartreuse" /> Skincare Safe AA</span>
            <span className="flex items-center gap-1"><Check size={10} className="text-brand-chartreuse" /> Certified Dermatologist Approved</span>
          </div>
        </div>

        {/* Double row links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          <div className="space-y-4.5">
            <h5 className="text-[11px] font-mono text-brand-mint font-bold uppercase tracking-wider block border-l-2 border-brand-teal pl-2">Treatments</h5>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#services" className="hover:text-brand-chartreuse transition-colors">Acne Therapy</a></li>
              <li><a href="#services" className="hover:text-brand-chartreuse transition-colors">Anti-Aging Care</a></li>
              <li><a href="#services" className="hover:text-brand-chartreuse transition-colors">Chemical Peels</a></li>
              <li><a href="#services" className="hover:text-brand-chartreuse transition-colors">Laser Treatments</a></li>
            </ul>
          </div>

          <div className="space-y-4.5">
            <h5 className="text-[11px] font-mono text-brand-mint font-bold uppercase tracking-wider block border-l-2 border-brand-teal pl-2">Dermal Care</h5>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#about" className="hover:text-brand-chartreuse transition-colors">Dermal Education</a></li>
              <li><a href="#faq" className="hover:text-brand-chartreuse transition-colors">FAQs</a></li>
              <li><a href="#about" className="hover:text-brand-chartreuse transition-colors">Dermatologist Team</a></li>
              <li><a href="#contact" className="hover:text-brand-chartreuse transition-colors">Contact Center</a></li>
            </ul>
          </div>
        </div>

        {/* Subscription newsletter box */}
        <div className="md:col-span-3 space-y-4">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-brand-mint/90 uppercase tracking-widest block">Skin Health Club</span>
          {emailSubscribed ? (
            <div className="p-4.5 bg-brand-teal/20 border border-brand-teal/30 rounded-2xl space-y-1">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-brand-chartreuse uppercase block">✓ Formulation Club Subscribed</span>
              <p className="text-[11px] text-brand-mint/80 leading-relaxed font-sans">Your dermatology skin tips and exclusive offers are dispatched weekly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="skin@dermalcare.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-white/10 border border-brand-teal/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/30 placeholder-brand-mint/40"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2 bg-brand-teal text-white font-bold font-sans text-xs rounded-xl hover:bg-brand-mint hover:text-brand-forest transition-colors cursor-pointer"
              >
                Join Formulation Club
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-brand-teal/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10.5px] text-brand-mint/60 tracking-wider font-mono">
        <span>{copyright}</span>
        <div className="flex gap-4">
          <span>Pure Clinical Skincare</span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// 17. ATOMIC FAQ ITEM CONTAINER (ACCORDION PIECE INDEPENDENT)
// ============================================================================
export interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqItem({
  question,
  answer
}: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-brand-teal/8 bg-white hover:border-brand-teal/20 p-5 rounded-2xl space-y-3 font-sans transition-all duration-300 shadow-sm hover:shadow-brand-glow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-bold text-brand-forest hover:text-brand-teal transition-colors duration-200">{question}</span>
        <span className="h-6 w-6 rounded-full bg-brand-mint border border-brand-teal/10 flex items-center justify-center shrink-0">
          <ChevronDown size={13} className={`text-brand-teal transition-transform ${isOpen ? "rotate-180 text-brand-teal font-extrabold" : ""}`} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans pt-3.5 border-t border-brand-teal/8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
