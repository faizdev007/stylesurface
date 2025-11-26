import { useState, useEffect } from 'react';

export const defaultContent = {
  global: {
    phone: "+91 98765 43210",
    email: "sales@stylensurface.com",
    address: "Plot No. 123, Industrial Area, Phase 2, New Delhi, 110020",
    whatsapp: "+91 98765 43210"
  },
  home: {
    heroTitle: "Premium Acrylic, Ubuntu & Cork Sheets",
    heroSubtitle: "Direct from manufacturer. High-quality, custom-cut sheets for furniture, construction, signage, and industrial applications across India.",
    heroBtnPrimary: "Get Best Price Quote",
    heroBtnSecondary: "View Catalog",
    productTitle: "Premium Industrial Sheets",
    productSubtitle: "Explore our extensive collection of 12+ specialized sheet categories designed for durability, aesthetics, and industrial performance."
  },
  acrylic: {
    title: "Acrylic Sheets",
    subtitle: "Superior optical clarity meeting ISO standards. Cast and Extruded variants available for signage, architectural glazing, and precision engineering.",
    btnPrimary: "Get Bulk Quote",
    btnSecondary: "Download Datasheet"
  },
  ubuntu: {
    title: "Ubuntu Sheets",
    subtitle: "Advanced composite foam boards designed to replace plywood. 100% Waterproof, Termite-proof, and Calibrated for premium interiors.",
    btnPrimary: "Order Sample Kit",
    btnSecondary: "View Color Chart"
  },
  cork: {
    title: "Cork Sheets",
    subtitle: "Premium agglomerated cork sheets for thermal insulation, vibration dampening, and architectural acoustics. 100% Natural & Renewable.",
    btnPrimary: "Get Bulk Pricing",
    btnSecondary: "Download Spec Sheet"
  }
};

export type ContentType = typeof defaultContent;

export const useContent = () => {
  const [content, setContent] = useState<ContentType>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedContent = localStorage.getItem('site_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        // Merge parsed content with defaults to ensure new keys are present
        setContent(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse site content", e);
      }
    }
    setIsLoaded(true);
  }, []);

  return { content, isLoaded };
};
