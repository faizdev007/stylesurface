
import React, { useEffect } from 'react';
import { SEOData } from '../types';

interface SEOHeadProps {
  seo: SEOData;
}

const SEOHead: React.FC<SEOHeadProps> = ({ seo }) => {
  useEffect(() => {
    // Update Title
    document.title = seo.title;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper for Open Graph
    const updateOG = (property: string, content: string) => {
       let element = document.querySelector(`meta[property="${property}"]`);
       if (!element) {
         element = document.createElement('meta');
         element.setAttribute('property', property);
         document.head.appendChild(element);
       }
       element.setAttribute('content', content);
    };

    updateMeta('description', seo.description);
    updateMeta('keywords', seo.keywords);
    updateOG('og:title', seo.title);
    updateOG('og:description', seo.description);
    if(seo.ogImage) updateOG('og:image', seo.ogImage);
    
    // Canonical
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
    }
    link.setAttribute('href', seo.canonicalUrl || window.location.href);

  }, [seo]);

  return null;
};

export default SEOHead;
