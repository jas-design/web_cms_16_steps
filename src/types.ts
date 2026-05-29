/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  description: string;
  role: string;
  namingConvention?: string;
  codeSample?: string;
  language?: string;
  children?: FileNode[];
}

export interface TenetDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullExplanation: string;
  keyStandards: string[];
  bestPractices: string[];
  codeTemplate?: {
    title: string;
    code: string;
    language: string;
  };
}

export interface CMSField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'list' | 'boolean';
  category: string;
  defaultValue: any;
  placeholder?: string;
}

// --- CMS LAYOUT SCHEMA TYPE CONTRACTS ---

export interface CtaData {
  text: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
}

export interface HeroData {
  accentText?: string;
  title: string;
  subtitle?: string;
  ctas?: CtaData[];
  backgroundImage?: string;
  alignment?: 'center' | 'left' | 'right';
}

export interface SplitData {
  leftTitle?: string;
  leftBody?: string;
  rightImage?: string;
  rightTitle?: string;
  rightBody?: string;
  ratio?: '50-50' | '60-40' | '40-60';
  reverse?: boolean;
}

export interface GridItemData {
  title: string;
  description?: string;
  icon?: string;
  tag?: string;
  link?: string;
}

export interface GridLayoutData {
  title?: string;
  subtitle?: string;
  columns?: 1 | 2 | 3 | 4 | 6;
  gapSize?: 'xs' | 's' | 'm' | 'l' | 'xl';
  items: GridItemData[];
}

export interface CtaLayoutData {
  accentText?: string;
  title: string;
  subtitle?: string;
  ctas: CtaData[];
  layoutType?: 'card' | 'stripe' | 'split';
  theme?: 'dark' | 'neon' | 'glass';
}

export interface FaqItemData {
  question: string;
  answer: string;
}

export interface FaqData {
  title?: string;
  subtitle?: string;
  items: FaqItemData[];
}

export interface PricingCardData {
  planName: string;
  price: string;
  billingPeriod?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  ctaUrl: string;
}

export interface PricingData {
  title?: string;
  subtitle?: string;
  plans: PricingCardData[];
}

export interface ContactData {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  formPlaceholderName?: string;
  formPlaceholderEmail?: string;
  formPlaceholderMessage?: string;
}

export interface TestimonialItemData {
  quote: string;
  authorName: string;
  authorRole?: string;
  rating?: number;
  avatarUrl?: string;
}

export interface TestimonialData {
  title?: string;
  subtitle?: string;
  items: TestimonialItemData[];
}

export interface SpacingConfig {
  paddingTop?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  paddingBottom?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
}

export interface ContainerConfig {
  maxWidth?: 'ch' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  theme?: 'default' | 'accent-glass' | 'dimmed';
}

export interface LayoutPayload {
  main?: {
    showHeader?: boolean;
    showFooter?: boolean;
  };
  page?: {
    title: string;
    description?: string;
    showBreadcrumbs?: boolean;
  };
  hero?: HeroData;
  split?: SplitData;
  grid?: GridLayoutData;
  cta?: CtaLayoutData;
  faq?: FaqData;
  pricing?: PricingData;
  contact?: ContactData;
  testimonial?: TestimonialData;
  spacing?: SpacingConfig;
  container?: ContainerConfig;
}
