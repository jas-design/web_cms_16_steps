import React, { useState } from 'react';
import { 
  ArrowUp, ArrowDown, Plus, Trash2, Image as ImageIcon, 
  Settings2, Copy, Check, ChevronDown, Sparkles 
} from 'lucide-react';

// ==========================================================================
// 1. DYNAMIC REUSABLE SCHEMAS DEFINITION
// ==========================================================================

export interface SchemaField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'number' | 'boolean' | 'select' | 'object' | 'list';
  placeholder?: string;
  options?: string[]; // for select dropdowns
  fields?: SchemaField[]; // nested items for object or list-element types
}

export const SECTION_SCHEMAS: Record<string, SchemaField[]> = {
  seo: [
    { key: 'title', label: 'Search Engine Page Title', type: 'text', placeholder: 'e.g. Cutisure | Pure Dermatological Skincare Solutions' },
    { key: 'description', label: 'Meta Description Snippet (Search snippet details)', type: 'textarea', placeholder: 'Provide detailed search descriptive sentence...' },
    { key: 'keywords', label: 'SEO Campaign Keywords (comma separated list)', type: 'text', placeholder: 'e.g. organic skincare, bespoke peels, dermal science' }
  ],
  hero: [
    { key: 'accentText', label: 'Accent Highlight Text', type: 'text', placeholder: 'e.g. BIO-CERTIFIED MEDICAL DERMATOLOGY' },
    { key: 'title', label: 'Main Display Headline', type: 'text', placeholder: 'Enter main banner headline...' },
    { key: 'subtitle', label: 'Sub-headline Description', type: 'textarea', placeholder: 'Provide detailed medical statement...' },
    { key: 'imageUrl', label: 'Hero Image Location', type: 'image' },
    { key: 'floatingBadge', label: 'Floating Badge Tag', type: 'text', placeholder: 'e.g. 100% Acid Mantle Safe' },
    { 
      key: 'primaryCta', 
      label: 'Primary Action Link', 
      type: 'object',
      fields: [
        { key: 'text', label: 'Button Caption', type: 'text', placeholder: 'e.g. Book Treatment' },
        { key: 'url', label: 'Link Target Identifier', type: 'text', placeholder: 'e.g. #contact' },
        { key: 'variant', label: 'Visual Accent', type: 'select', options: ['glow', 'outline', 'primary'] }
      ]
    },
    { 
      key: 'secondaryCta', 
      label: 'Secondary Action Link', 
      type: 'object',
      fields: [
        { key: 'text', label: 'Button Caption', type: 'text', placeholder: 'e.g. Meet Research Board' },
        { key: 'url', label: 'Link Target Identifier', type: 'text', placeholder: 'e.g. #about' },
        { key: 'variant', label: 'Visual Accent', type: 'select', options: ['glow', 'outline', 'primary'] }
      ]
    }
  ],
  stats: [
    {
      key: 'metrics',
      label: 'Core Highlights List',
      type: 'list',
      fields: [
        { key: 'value', label: 'Raw Count/Metric', type: 'text', placeholder: 'e.g. 99.4%' },
        { key: 'label', label: 'Short Caption Description', type: 'text', placeholder: 'e.g. Placebo trial efficacy rate' },
        { key: 'annotation', label: 'Upper Mini-Tag', type: 'text', placeholder: 'e.g. BIO-AUDIT TEST' }
      ]
    }
  ],
  about: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Descriptive Headline', type: 'text' },
    { key: 'italicWord', label: 'Decorative Highlight (Italicized)', type: 'text' },
    { key: 'description', label: 'Short Summary statement', type: 'textarea' },
    { 
      key: 'paragraphs', 
      label: 'Paragraph blocks', 
      type: 'list',
      fields: [{ key: 'text', label: 'Story paragraph content', type: 'textarea' }]
    },
    { key: 'imageUrl', label: 'Media Photo Location', type: 'image' },
    { key: 'experienceYears', label: 'Experience Accent Label', type: 'text', placeholder: 'e.g. 12+ YEARS' },
    {
      key: 'features',
      label: 'Narrative highlights grid',
      type: 'list',
      fields: [
        { key: 'title', label: 'Headline', type: 'text' },
        { key: 'description', label: 'Details', type: 'text' }
      ]
    }
  ],
  narrative: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Descriptive Headline', type: 'text' },
    { key: 'italicWord', label: 'Decorative Highlight (Italicized)', type: 'text' },
    { key: 'description', label: 'Short Summary statement', type: 'textarea' },
    { 
      key: 'paragraphs', 
      label: 'Paragraph blocks', 
      type: 'list',
      fields: [{ key: 'text', label: 'Story paragraph content', type: 'textarea' }]
    },
    { key: 'imageUrl', label: 'Media Photo Location', type: 'image' },
    { key: 'experienceYears', label: 'Experience Accent Label', type: 'text', placeholder: 'e.g. 12+ YEARS' },
    {
      key: 'features',
      label: 'Narrative highlights grid',
      type: 'list',
      fields: [
        { key: 'title', label: 'Headline', type: 'text' },
        { key: 'description', label: 'Details', type: 'text' }
      ]
    }
  ],
  servicesBrief: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Section Headline', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'columns', label: 'Target Grid Columns', type: 'select', options: ['2', '3', '4'] },
    {
      key: 'items',
      label: 'Services Listings',
      type: 'list',
      fields: [
        { key: 'title', label: 'Treatment Label', type: 'text' },
        { key: 'description', label: 'Clinical procedures detail', type: 'textarea' },
        { key: 'iconName', label: 'Icon selection', type: 'select', options: ['sparkles', 'shield', 'heart', 'smile', 'flower', 'clock', 'target'] },
        { key: 'price', label: 'Treatment Pricing Tag', type: 'text', placeholder: 'e.g. $140 session' }
      ]
    }
  ],
  services: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Section Headline', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'columns', label: 'Target Grid Columns', type: 'select', options: ['2', '3', '4'] },
    {
      key: 'services', // Maps to the JSON nested key
      label: 'Complete services Listings',
      type: 'list',
      fields: [
        { key: 'title', label: 'Treatment Label', type: 'text' },
        { key: 'description', label: 'Clinical procedures detail', type: 'textarea' },
        { key: 'iconName', label: 'Icon selection', type: 'select', options: ['sparkles', 'shield', 'heart', 'smile', 'flower', 'clock', 'target'] },
        { key: 'price', label: 'Treatment Pricing Tag', type: 'text', placeholder: 'e.g. $140 session' }
      ]
    }
  ],
  features: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Section Headline', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'columns', label: 'Target Grid Columns', type: 'select', options: ['2', '3', '4'] },
    {
      key: 'items',
      label: 'Commitments list',
      type: 'list',
      fields: [
        { key: 'title', label: 'Commitment Title', type: 'text' },
        { key: 'description', label: 'Commitment Description Statement', type: 'textarea' },
        { key: 'iconName', label: 'Icon Selection', type: 'select', options: ['shield', 'sparkles', 'smile', 'compass', 'leaf', 'star'] }
      ]
    }
  ],
  testimonial: [
    { key: 'title', label: 'Section Headline Title', type: 'text' },
    { key: 'subtitle', label: 'Sub-headline', type: 'text' },
    {
      key: 'items',
      label: 'Skincare Reviews Feedback List',
      type: 'list',
      fields: [
        { key: 'quote', label: 'Patient Quote Review', type: 'textarea' },
        { key: 'authorName', label: 'Patient Wordmark / Author', type: 'text' },
        { key: 'authorRole', label: 'Professional designation', type: 'text', placeholder: 'e.g. Verified Clinic Resident' },
        { key: 'rating', label: 'Testimonial Rating stars', type: 'number', placeholder: '5' }
      ]
    }
  ],
  pricing: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Section Headline', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'columns', label: 'Target Grid Columns', type: 'select', options: ['2', '3'] },
    {
      key: 'plans',
      label: 'Consultation tier pricing Tiers',
      type: 'list',
      fields: [
        { key: 'name', label: 'Tier Plan Name', type: 'text', placeholder: 'e.g. Clinical Assessment' },
        { key: 'price', label: 'Tier Price', type: 'text', placeholder: 'e.g. $85' },
        { key: 'period', label: 'Billing Period', type: 'text', placeholder: 'e.g. consultation session' },
        { key: 'description', label: 'Tier Summary details', type: 'text' },
        { key: 'popular', label: 'Highly Recommended Highlight Tag', type: 'boolean' },
        { key: 'ctaText', label: 'Button Caption', type: 'text' },
        { key: 'ctaUrl', label: 'Action Button Link Target', type: 'text' },
        { key: 'features', label: 'Included Features (comma separated list)', type: 'text', placeholder: 'pH Consultation, Microscopic Analysis, Serum Bottle' }
      ]
    }
  ],
  gallery: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Section Headline', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'columns', label: 'Target Grid Columns', type: 'select', options: ['2', '3', '4'] },
    {
      key: 'items',
      label: 'Sanctuary Portfolio Gallery Pictures',
      type: 'list',
      fields: [
        { key: 'imageUrl', label: 'Gallery Photo Location URL', type: 'image' },
        { key: 'category', label: 'Upper Mini Filter Category', type: 'text', placeholder: 'e.g. LAB COMPUTE' },
        { key: 'title', label: 'Asset Short Title Accent', type: 'text' },
        { key: 'caption', label: 'Detailed Description Info hover', type: 'text' }
      ]
    }
  ],
  faq: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Section Headline', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'columns', label: 'Target Grid Columns', type: 'select', options: ['1', '2'] },
    {
      key: 'items',
      label: 'FAQ Accordions Blocks',
      type: 'list',
      fields: [
        { key: 'question', label: 'Question Label', type: 'text' },
        { key: 'answer', label: 'Response Body', type: 'textarea' }
      ]
    }
  ],
  cta: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Section Headline', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'theme', label: 'Color Variant Theme', type: 'select', options: ['dark', 'neon', 'glass'] },
    {
      key: 'ctas',
      label: 'Section Action CTAs List',
      type: 'list',
      fields: [
        { key: 'text', label: 'Button Caption label', type: 'text' },
        { key: 'url', label: 'Link Target Identifier', type: 'text' },
        { key: 'variant', label: 'Visual Accent style', type: 'select', options: ['glow', 'outline', 'primary'] }
      ]
    }
  ],
  ctaSection: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Section Headline', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'theme', label: 'Color Variant Theme', type: 'select', options: ['dark', 'neon', 'glass'] },
    {
      key: 'ctas',
      label: 'Section Action CTAs List',
      type: 'list',
      fields: [
        { key: 'text', label: 'Button Caption label', type: 'text' },
        { key: 'url', label: 'Link Target Identifier', type: 'text' },
        { key: 'variant', label: 'Visual Accent style', type: 'select', options: ['glow', 'outline', 'primary'] }
      ]
    }
  ],
  contact: [
    { key: 'annotation', label: 'Upper Accent Tag', type: 'text' },
    { key: 'title', label: 'Section Headline', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
    { key: 'email', label: 'Administrative Registry Email', type: 'text' },
    { key: 'phone', label: 'Clinical Hotline Phone Number', type: 'text' },
    { key: 'address', label: 'Physical Compound Address location', type: 'text' },
    {
      key: 'hours',
      label: 'Standard Weekly Consultation Hours block',
      type: 'list',
      fields: [
        { key: 'days', label: 'Active Days label', type: 'text', placeholder: 'e.g. MON - FRI' },
        { key: 'hours', label: 'Timing bracket description', type: 'text', placeholder: 'e.g. 09h00 - 18h00' }
      ]
    }
  ]
};

// ==========================================================================
// 2. REUSABLE SECTION CO-ORDINATOR SYSTEM PANEL
// ==========================================================================

interface SectionEditorProps {
  sectionKey: string;
  sectionData: any;
  onChange: (updatedData: any) => void;
  mediaLibraryList?: Array<{ name: string; url: string; alt: string }>;
}

export function SectionEditor({ sectionKey, sectionData, onChange, mediaLibraryList = [] }: SectionEditorProps) {
  // Gracefully fallback to schema dynamic definition
  const schema = SECTION_SCHEMAS[sectionKey];
  const [activeMediaPickerField, setActiveMediaPickerField] = useState<string | null>(null);

  if (!schema) {
    return (
      <div className="p-6 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
        <span>No dynamic schema definition mapped for section type: <strong>{sectionKey}</strong>. Raw json panel fallbacks are active.</span>
      </div>
    );
  }

  // Multi-level nested key-value updator with immutability guarantees
  const updateFieldValue = (parentObject: any, path: string[], value: any): any => {
    const nextObj = { ...parentObject };
    let current = nextObj;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      } else {
        current[path[i]] = { ...current[path[i]] };
      }
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    return nextObj;
  };

  const handleFieldChange = (fieldPath: string[], value: any) => {
    let nextValue = value;
    if (fieldPath.includes('keywords') && typeof value === 'string') {
      nextValue = value.split(',').map((s) => s.trim()).filter(Boolean);
    }
    let nextData = updateFieldValue(sectionData, fieldPath, nextValue);
    onChange(nextData);
  };

  // --------------------------------------------------------------------------
  // FIELD GENERATORS SYSTEM (Aesthetic Visual Controller inputs)
  // --------------------------------------------------------------------------
  const renderFieldInput = (field: SchemaField, value: any, path: string[]) => {
    switch (field.type) {
      case 'text':
        const displayValue = Array.isArray(value) ? value.join(', ') : (value || '');
        return (
          <input
            type="text"
            value={displayValue}
            placeholder={field.placeholder || `Enter ${field.label}...`}
            onChange={(e) => handleFieldChange(path, e.target.value)}
            className="w-full p-2.5 bg-neutral-50/50 hover:bg-neutral-50 border border-brand-teal/10 rounded-xl focus:ring-1 focus:ring-brand-teal outline-none transition-all"
          />
        );

      case 'textarea':
        return (
          <textarea
            rows={3}
            value={value || ''}
            placeholder={field.placeholder || `Details concerning ${field.label}...`}
            onChange={(e) => handleFieldChange(path, e.target.value)}
            className="w-full p-2.5 bg-neutral-50/50 hover:bg-neutral-50 border border-brand-teal/10 rounded-xl focus:ring-1 focus:ring-brand-teal outline-none transition-all text-xs leading-relaxed"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value !== undefined ? value : ''}
            placeholder={field.placeholder}
            onChange={(e) => handleFieldChange(path, parseFloat(e.target.value) || 0)}
            className="w-full max-w-[120px] p-2 bg-neutral-50 border border-brand-teal/10 rounded-xl"
          />
        );

      case 'boolean':
        return (
          <label className="flex items-center gap-3 select-none cursor-pointer p-1">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleFieldChange(path, e.target.checked)}
              className="h-4 w-4 text-brand-teal focus:ring-brand-teal rounded border-brand-teal/20"
            />
            <span className="font-medium text-brand-forest">Yes, highlight as highly popular choice</span>
          </label>
        );

      case 'select':
        return (
          <div className="relative w-full max-w-xs">
            <select
              value={value || (field.options ? field.options[0] : '')}
              onChange={(e) => handleFieldChange(path, e.target.value)}
              className="w-full p-2.5 pr-8 bg-neutral-50 border border-brand-teal/10 rounded-xl appearance-none outline-none focus:ring-1 focus:ring-brand-teal font-sans text-xs"
            >
              {(field.options || []).map((opt) => (
                <option key={opt} value={opt} className="capitalize">{opt}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-teal pointer-events-none" />
          </div>
        );

      case 'image':
        const selectId = path.join('_');
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={value || ''}
                placeholder="Choose from library or input URL..."
                onChange={(e) => handleFieldChange(path, e.target.value)}
                className="flex-grow p-2.5 bg-neutral-50 border border-brand-teal/10 rounded-xl font-mono text-[11px]"
              />
              <button
                type="button"
                onClick={() => setActiveMediaPickerField(activeMediaPickerField === selectId ? null : selectId)}
                className="px-3 bg-brand-mint border border-brand-teal/10 hover:bg-brand-mint/80 rounded-xl text-brand-forest font-serif inline-flex items-center gap-1.5 transition-all text-xs"
              >
                <ImageIcon size={13} />
                Gallery Pool
              </button>
            </div>

            {/* INTEGRATED POPUP GALLERY SELECTION COCKPIT */}
            {activeMediaPickerField === selectId && (
              <div className="p-3 bg-[#F4FAF9] border border-brand-teal/20 rounded-xl space-y-2 max-h-[180px] overflow-y-auto">
                <span className="text-[10px] font-mono text-brand-forest uppercase font-bold tracking-wider float-left">Vault Asset Pool Selector</span>
                <button 
                  onClick={() => setActiveMediaPickerField(null)}
                  className="text-[10px] text-brand-teal hover:underline font-bold float-right"
                >
                  Collapse Pool
                </button>
                <div className="clear-both"></div>
                {mediaLibraryList.length === 0 ? (
                  <p className="text-[10px] text-gray-400 p-2 text-center">No images uploaded. Add some in the **Media Vault** tab!</p>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {mediaLibraryList.map((m, id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          handleFieldChange(path, m.url);
                          setActiveMediaPickerField(null);
                        }}
                        className="aspect-video relative rounded-lg overflow-hidden border border-brand-teal/10 hover:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                        title={m.alt}
                      >
                        <img src={m.url} alt={m.alt} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-brand-forest/70 p-0.5 text-[7px] text-brand-mint font-mono truncate">{m.name}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'object':
        return (
          <div className="p-3.5 bg-[#FAFBFB] border border-brand-teal/10 rounded-xl space-y-3">
            {(field.fields || []).map((nestedField) => (
              <div key={nestedField.key} className="space-y-1">
                <label className="text-[11px] font-semibold text-brand-forest">{nestedField.label}</label>
                {renderFieldInput(nestedField, (value || {})[nestedField.key], [...path, nestedField.key])}
              </div>
            ))}
          </div>
        );

      case 'list':
        const listItems = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-3">
            {listItems.length === 0 ? (
              <div className="p-4 border border-dashed border-brand-teal/15 text-center text-gray-400 rounded-xl bg-neutral-50/30">
                <p className="text-[11px]">No items configured in this section collection list.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {listItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-3 bg-[#FAFBFB] p-3.5 rounded-2xl border border-brand-teal/15 items-start relative hover:shadow-sm transition-shadow">
                    
                    {/* Index Indicator */}
                    <div className="h-6 w-6 rounded-full bg-brand-mint/30 flex items-center justify-center text-[10px] font-semibold text-brand-forest shrink-0 mt-0.5">
                      {idx + 1}
                    </div>

                    {/* Sub fields wrapper */}
                    <div className="flex-grow space-y-3">
                      {field.fields && field.fields.map((nested) => {
                        // Special support for list of raw simple entries (e.g. string benefits arrays)
                        const isSimpleString = nested.key === 'text' && typeof item === 'string';
                        const itemValue = isSimpleString ? item : item[nested.key];
                        
                        return (
                          <div key={nested.key} className="space-y-1">
                            <label className="text-[11px] font-semibold text-zinc-500">{nested.label}</label>
                            
                            {/* Special change path interceptor if flat array in JSON */}
                            {renderFieldInput(
                              nested, 
                              itemValue, 
                              isSimpleString ? [...path, idx.toString()] : [...path, idx.toString(), nested.key]
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Array Order Operations buttons list */}
                    <div className="flex flex-col gap-1 shrink-0 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (idx === 0) return;
                          const nextList = [...listItems];
                          const temp = nextList[idx];
                          nextList[idx] = nextList[idx - 1];
                          nextList[idx - 1] = temp;
                          handleFieldChange(path, nextList);
                        }}
                        disabled={idx === 0}
                        className="p-1 text-gray-400 hover:text-brand-forest disabled:opacity-30 bg-white border border-brand-teal/10 rounded-lg hover:shadow-sm"
                        title="Move Element Up"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (idx === listItems.length - 1) return;
                          const nextList = [...listItems];
                          const temp = nextList[idx];
                          nextList[idx] = nextList[idx + 1];
                          nextList[idx + 1] = temp;
                          handleFieldChange(path, nextList);
                        }}
                        disabled={idx === listItems.length - 1}
                        className="p-1 text-gray-400 hover:text-brand-forest disabled:opacity-30 bg-white border border-brand-teal/10 rounded-lg hover:shadow-sm"
                        title="Move Element Down"
                      >
                        <ArrowDown size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const nextList = listItems.filter((_, i) => i !== idx);
                          handleFieldChange(path, nextList);
                        }}
                        className="p-1 text-red-400 hover:text-red-600 bg-white border border-red-50 rounded-lg shadow-sm"
                        title="Delete Element"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                const emptyItem: any = {};
                if (field.fields) {
                  // Special check for fallback flat lists
                  if (field.fields.length === 1 && field.fields[0].key === 'text') {
                    handleFieldChange(path, [...listItems, "New Element statement"]);
                    return;
                  }
                  field.fields.forEach((f) => {
                    if (f.type === 'number') emptyItem[f.key] = 0;
                    else if (f.type === 'boolean') emptyItem[f.key] = false;
                    else emptyItem[f.key] = '';
                  });
                }
                handleFieldChange(path, [...listItems, emptyItem]);
              }}
              className="px-4 py-2 bg-brand-mint hover:bg-brand-mint/85 text-brand-forest rounded-xl font-serif text-xs inline-flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus size={13} />
              Add new entry
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-5 text-left text-xs" id={`editor-${sectionKey}`}>
      {schema.map((field) => (
        <div key={field.key} className="space-y-1.5 border-b border-brand-teal/5 pb-4 last:border-0 last:pb-0">
          <div className="flex justify-between items-center">
            <label className="font-bold text-brand-forest text-xs tracking-wide">{field.label}</label>
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{field.type} Field</span>
          </div>
          {renderFieldInput(field, sectionData[field.key], [field.key])}
        </div>
      ))}
    </div>
  );
}
