/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Check, Settings } from 'lucide-react';

// Reusable configurations
import navData from './content/pages/navigation.json';
import homeData from './content/pages/home.json';
import aboutData from './content/pages/about.json';
import servicesData from './content/pages/services.json';
import faqData from './content/pages/faq.json';
import contactData from './content/pages/contact.json';

// Lightweight flat-file Admin Component
import AdminPanel from './components/AdminPanel';

// Reusable high-fidelity layouts & sections
import {
  Navbar,
  Footer
} from './components/ReusableComponents';

import {
  deepMergeWithFallback,
  DynamicSectionRenderer
} from './utils/cmsUtility';

export default function App() {
  // Leverage dynamic React state wrappers for immediate preview syncing
  const [home, setHome] = useState(() => {
    const local = localStorage.getItem('cutisure_cms_home');
    return local ? JSON.parse(local) : homeData;
  });
  const [about, setAbout] = useState(() => {
    const local = localStorage.getItem('cutisure_cms_about');
    return local ? JSON.parse(local) : aboutData;
  });
  const [services, setServices] = useState(() => {
    const local = localStorage.getItem('cutisure_cms_services');
    return local ? JSON.parse(local) : servicesData;
  });
  const [faq, setFaq] = useState(() => {
    const local = localStorage.getItem('cutisure_cms_faq');
    return local ? JSON.parse(local) : faqData;
  });
  const [contact, setContact] = useState(() => {
    const local = localStorage.getItem('cutisure_cms_contact');
    return local ? JSON.parse(local) : contactData;
  });
  const [navigation, setNavigation] = useState(() => {
    const local = localStorage.getItem('cutisure_cms_navigation');
    return local ? JSON.parse(local) : navData;
  });

  // Access dynamic navigation values
  const listLinks = navigation.links || navData.links;
  const brandTitle = navigation.brandName || navData.brandName;
  const footerCopyright = navigation.footer?.copyright || navData.footer.copyright;

  // Capture active hash route, default to '#home'
  const [activePath, setActivePath] = useState<string>(() => {
    const hash = window.location.hash;
    const validPaths = ['#home', '#about', '#services', '#faq', '#contact', '#admin'];
    return validPaths.includes(hash) ? hash : '#home';
  });

  // Dynamic mount fetch to pull the latest JSON files directly from the flat-file disk server
  useEffect(() => {
    const fetchLatestCMSData = async () => {
      try {
        const response = await fetch('/api/cms/pages');
        if (response.ok) {
          const payload = await response.json();
          if (payload.success && payload.data) {
            // Incorporate robust baseline fallbacks during deep merges
            const mergedHome = deepMergeWithFallback(payload.data.home, homeData);
            const mergedAbout = deepMergeWithFallback(payload.data.about, aboutData);
            const mergedServices = deepMergeWithFallback(payload.data.services, servicesData);
            const mergedFaq = deepMergeWithFallback(payload.data.faq, faqData);
            const mergedContact = deepMergeWithFallback(payload.data.contact, contactData);
            const mergedNav = deepMergeWithFallback(payload.data.navigation, navData);

            setHome(mergedHome);
            setAbout(mergedAbout);
            setServices(mergedServices);
            setFaq(mergedFaq);
            setContact(mergedContact);
            setNavigation(mergedNav);

            // Buffer inside localStorage for ultra fast static loading speeds
            localStorage.setItem('cutisure_cms_home', JSON.stringify(mergedHome));
            localStorage.setItem('cutisure_cms_about', JSON.stringify(mergedAbout));
            localStorage.setItem('cutisure_cms_services', JSON.stringify(mergedServices));
            localStorage.setItem('cutisure_cms_faq', JSON.stringify(mergedFaq));
            localStorage.setItem('cutisure_cms_contact', JSON.stringify(mergedContact));
            localStorage.setItem('cutisure_cms_navigation', JSON.stringify(mergedNav));
          }
        }
      } catch (err) {
        console.warn('[CMS-CONNECTOR] running off local cached state or hardcoded fallbacks.', err);
      }
    };

    fetchLatestCMSData();
  }, []);

  // Track hash alterations of the browser deep links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const validPaths = ['#home', '#about', '#services', '#faq', '#contact', '#admin'];
      if (validPaths.includes(hash)) {
        setActivePath(hash);
        // Safely slide viewports back to top smoothly
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Apply initial hash if not set
    if (!window.location.hash) {
      window.location.hash = '#home';
    } else {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic layouts callback triggered from CMS Admin panel
  const handleUpdateAppContent = (pageKey: string, payload: any) => {
    if (pageKey === 'home') setHome(payload);
    else if (pageKey === 'about') setAbout(payload);
    else if (pageKey === 'services') setServices(payload);
    else if (pageKey === 'faq') setFaq(payload);
    else if (pageKey === 'contact') setContact(payload);
    else if (pageKey === 'navigation') setNavigation(payload);
  };

  // Map and sync SEO titles & metadata dynamically in relation to the active page
  useEffect(() => {
    let title = 'Cutisure | Skincare';
    let description = '';
    let keywords: string[] = [];

    if (activePath === '#home') {
      title = home.seo?.title || homeData.seo.title;
      description = home.seo?.description || homeData.seo.description;
      keywords = home.seo?.keywords || homeData.seo.keywords || [];
    } else if (activePath === '#about') {
      title = (about.seo as any)?.title || (aboutData.seo as any)?.title;
      description = (about.seo as any)?.description || (aboutData.seo as any)?.description;
      keywords = (about.seo as any)?.keywords || (aboutData.seo as any)?.keywords || ["clinical credentials", "organic skincare research"];
    } else if (activePath === '#services') {
      title = (services.seo as any)?.title || (servicesData.seo as any)?.title;
      description = (services.seo as any)?.description || (servicesData.seo as any)?.description;
      keywords = (services.seo as any)?.keywords || (servicesData.seo as any)?.keywords || ["cellular active peels", "organic facials", "dermal solutions"];
    } else if (activePath === '#faq') {
      title = (faq.seo as any)?.title || (faqData.seo as any)?.title;
      description = (faq.seo as any)?.description || (faqData.seo as any)?.description;
      keywords = (faq.seo as any)?.keywords || (faqData.seo as any)?.keywords || ["skin care advice", "skincare faq", "dermal support help"];
    } else if (activePath === '#contact') {
      title = (contact.seo as any)?.title || (contactData.seo as any)?.title;
      description = (contact.seo as any)?.description || (contactData.seo as any)?.description;
      keywords = (contact.seo as any)?.keywords || (contactData.seo as any)?.keywords || ["book derm consultation", "skincare clinic address"];
    }
    
    document.title = title;

    // Helper toupsert standard meta indicators
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Fulfill dynamic standard & Open Graph support
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords.join(', '));
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:image', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600');

    // Dynamically insert Google-friendly JSON-LD structured schema markup (Elements 5 & 6)
    let schemaJson: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Cutisure Dermal Clinic & Science Lab",
      "alternateName": "Cutisure Laboratory Board",
      "description": "Discover organic dermal-grade skincare, medical skin peel systems, and hydration boosters, formulated under board-certified clinician oversight.",
      "url": window.location.origin,
      "logo": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=150",
      "telephone": "+1-800-555-SKIN",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "742 Dermal Avenue, Suite 100",
        "addressLocality": "Beverly Hills",
        "addressRegion": "CA",
        "postalCode": "90210",
        "addressCountry": "US"
      }
    };

    if (activePath === '#about') {
      schemaJson = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
          "@type": "MedicalOrganization",
          "name": "Cutisure Dermal Clinical Research Board",
          "knowsAbout": ["Clinical Dermatology", "Organic Biochemistry", "Acne Therapies", "Dermal Longevity"]
        }
      };
    } else if (activePath === '#services') {
      schemaJson = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Cellular Active Peels & Hydration Booster Protocols",
        "provider": {
          "@type": "MedicalBusiness",
          "name": "Cutisure Dermal Clinic"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": "85",
          "highPrice": "240",
          "offerCount": "3"
        }
      };
    } else if (activePath === '#faq') {
      const qas = faq.faq?.items || faqData.faq.items || [];
      schemaJson = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": qas.map((item: any) => ({
          "@type": "Question",
          "name": item.question || 'Dermatology Protocol',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer || 'Consult clinical specialists for custom instructions.'
          }
        }))
      };
    }

    // Refresh dynamic schema tags
    const existingScript = document.getElementById('cutisure-schema-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', 'cutisure-schema-jsonld');
    script.innerHTML = JSON.stringify(schemaJson);
    document.head.appendChild(script);
  }, [activePath, home, about, services, faq, contact]);

  // Page Content Assembler (assembles dynamic templates)
  const renderPageContent = () => {
    const pageKeys: Record<string, string> = {
      '#home': 'home',
      '#about': 'about',
      '#services': 'services',
      '#faq': 'faq',
      '#contact': 'contact'
    };

    const key = pageKeys[activePath];
    if (!key) return null;

    let data;
    if (key === 'home') data = home;
    else if (key === 'about') data = about;
    else if (key === 'services') data = services;
    else if (key === 'faq') data = faq;
    else if (key === 'contact') data = contact;

    if (!data) return null;

    return (
      <DynamicSectionRenderer 
        pageKey={key} 
        pageData={data} 
      />
    );
  };

  if (activePath === '#admin') {
    return (
      <div id="cutisure-app" className="bg-[#FAFBFB] min-h-screen">
        <AdminPanel 
          onClose={() => {
            window.location.hash = '#home';
          }} 
          onUpdateAppContent={handleUpdateAppContent}
        />
      </div>
    );
  }

  return (
    <div id="cutisure-app" className="min-h-screen flex flex-col bg-[#F4FAF9] text-gray-950 font-sans selection:bg-[#0E9A92]/20 select-none">
      {/* Editorial Header / Navbar */}
      <Navbar brandName={brandTitle} links={listLinks} />

      {/* Primary Accessible Main Body */}
      <main id="main-content" className="flex-grow focus:outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePath}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Standard Bio-certified Clinical Footer */}
      <Footer brandName={brandTitle} copyright={footerCopyright} />

      {/* Discrete Floating CMS Admin Portal Link Anchor */}
      <a 
        href="#admin" 
        className="fixed bottom-4 right-4 z-40 bg-brand-forest hover:bg-brand-forest/95 text-brand-mint p-2.5 rounded-full shadow-lg transition-all opacity-20 hover:opacity-100 flex items-center justify-center border border-brand-teal/15 hover:-translate-y-0.5"
        title="Dermal CMS Admin Cockpit Password: admin123"
        id="cms-cockpit-link shadow-cyan-glow"
      >
        <Settings size={13} className="animate-spin-slow text-brand-mint" />
      </a>
    </div>
  );
}
