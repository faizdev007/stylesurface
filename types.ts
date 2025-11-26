
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'acrylic' | 'ubuntu' | 'cork' | 'other';
  description: string;
  features: string[];
  specs?: ProductSpec[]; // New field for technical data
  image: string;
  applications: string[];
  isFeatured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// CMS Types

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface PageSection {
  id: string;
  type: 'hero' | 'text' | 'features' | 'gallery' | 'form' | 'product-grid' | 'location-content';
  content: any; 
}

export interface CMSPage {
  id: string;
  slug: string;
  template: 'home' | 'product' | 'content' | 'location'; // location is for state/city pages
  title: string; // Internal name
  seo: SEOData;
  sections: PageSection[];
  isPublished: boolean;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  target?: '_blank' | '_self';
}

export interface MenuStructure {
  header: MenuItem[];
  footer: MenuItem[];
}

export interface CRMIntegrations {
  zapierWebhook?: string; // Best for connecting to Zoho, HubSpot, Wati simultaneously
  customEndpoint?: string;
  enableAutoSync: boolean;
}

export interface GlobalSettings {
  siteName: string;
  phone: string;
  email: string;
  address: string;
  logoUrl?: string;
  whatsapp: string;
  integrations?: CRMIntegrations;
}

export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  user_type: string;
  requirement: string;
  created_at: string;
}
