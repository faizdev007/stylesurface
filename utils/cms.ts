
import { CMSPage, MenuStructure, GlobalSettings, Product, MediaItem, Lead, PageSection, SEOData } from '../types';
import { supabase } from './supabaseClient';

// --- INITIAL FALLBACK DATA ---

const INITIAL_SETTINGS: GlobalSettings = {
  siteName: "StylenSurface",
  phone: "+91 98765 43210",
  email: "sales@stylensurface.com",
  address: "Plot No. 123, Industrial Area, Phase 2, New Delhi, 110020",
  whatsapp: "+91 98765 43210",
  integrations: {
    enableAutoSync: false,
    zapierWebhook: ''
  }
};

const INITIAL_MENUS: MenuStructure = {
  header: [
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'Acrylic Sheets', url: '/acrylic-sheets' },
    { id: '3', label: 'Ubuntu Sheets', url: '/ubuntu-sheets' },
    { id: '4', label: 'Cork Sheets', url: '/cork-sheets' },
    { id: '5', label: 'About Us', url: '/about' },
    { id: '6', label: 'Contact', url: '/contact' },
  ],
  footer: [
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'About Us', url: '/about' },
    { id: '3', label: 'Privacy Policy', url: '/privacy' },
    { id: '4', label: 'Terms', url: '/terms' },
  ]
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'Clear Cast Acrylic Sheet',
    category: 'acrylic',
    description: 'Premium optical grade clear acrylic with 92% light transmission. Ideal for signage and glazing.',
    features: ['UV Resistant', 'High Clarity', 'Weatherproof'],
    specs: [{ label: 'Thickness', value: '2mm - 50mm' }, { label: 'Size', value: '8ft x 4ft' }],
    image: 'https://images.unsplash.com/photo-1513366853605-54962eb02f0a?q=80&w=600&auto=format&fit=crop',
    applications: ['Signage', 'Glazing']
  },
  {
    id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    name: 'Ubuntu Foam Board',
    category: 'ubuntu',
    description: 'High density multi-layer composite board. 100% Waterproof and termite proof plywood alternative.',
    features: ['Waterproof', 'Termite Proof', 'Screw Holding'],
    specs: [{ label: 'Density', value: '0.65 g/cm3' }, { label: 'Size', value: '8ft x 4ft' }],
    image: 'https://picsum.photos/id/135/600/400',
    applications: ['Kitchens', 'Furniture']
  },
  {
    id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    name: 'Industrial Cork Sheet',
    category: 'cork',
    description: 'Rubberized cork sheets for industrial gaskets, vibration pads, and sealing applications.',
    features: ['High Compression', 'Oil Resistant', 'Durable'],
    specs: [{ label: 'Grade', value: 'RC-20' }, { label: 'Thickness', value: '3mm - 12mm' }],
    image: 'https://images.unsplash.com/photo-1621261354943-4a3b10856528?q=80&w=600&auto=format&fit=crop',
    applications: ['Gaskets', 'Flooring']
  },
  {
    id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    name: 'Colored Acrylic Sheet',
    category: 'acrylic',
    description: 'Vibrant opaque and translucent colored sheets for decorative and branding purposes.',
    features: ['Consistent Color', 'Gloss Finish', 'Easy Cutting'],
    specs: [{ label: 'Colors', value: '40+ Available' }],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    applications: ['Decor', 'Displays']
  }
];

// --- DEFAULT HOME PAGE CONTENT ---
const DEFAULT_HOME_PAGE: CMSPage = {
    id: '307c8702-85a0-4357-9653-4158654c6095',
    title: 'Home Page',
    slug: '/',
    template: 'home',
    isPublished: true,
    updatedAt: new Date().toISOString(),
    seo: {
        title: 'StylenSurface | Premium Industrial Sheets',
        description: 'Manufacturer of Acrylic, Ubuntu, and Cork Sheets.',
        keywords: 'acrylic sheets, ubuntu board, cork sheets'
    },
    sections: [
        {
            id: 'hero',
            type: 'hero',
            content: {
                title: 'Premium Acrylic, Ubuntu & Cork Sheets',
                subtitle: 'Direct from manufacturer. High-quality, custom-cut sheets for furniture, construction, signage, and industrial applications across India.',
                btnPrimary: 'Get Best Price Quote',
                btnSecondary: 'View Catalog',
                bgImage: ''
            }
        },
        {
            id: 'trust',
            type: 'features',
            content: {
                title: "Why Industry Leaders Choose Us",
                features: [
                  { icon: "Factory", title: "Manufacturer Direct", desc: "No middlemen, get factory prices." },
                  { icon: "Clock", title: "10+ Years Experience", desc: "Expertise in sheet manufacturing." },
                  { icon: "Users", title: "500+ Happy Clients", desc: "Trusted by top furniture brands." },
                  { icon: "Ruler", title: "Custom Sizes", desc: "Cut-to-size service available." },
                  { icon: "MapPin", title: "Pan-India Delivery", desc: "Fast logistics partner network." },
                  { icon: "Award", title: "ISO 9001 Certified", desc: "Guaranteed quality standards." },
                ]
            }
        },
        {
            id: 'products',
            type: 'product-grid',
            content: {
                title: 'Premium Industrial Sheets',
                subtitle: 'Explore our extensive collection of specialized sheet categories designed for durability, aesthetics, and industrial performance.'
            }
        },
        {
            id: 'about',
            type: 'text',
            content: {
                title: "Manufacturing Quality That You Can Trust",
                text: "Established in 2013, StylenSurface has grown to become one of India's most trusted suppliers of industrial grade sheets. Our state-of-the-art manufacturing facility employs advanced extrusion and casting technologies to ensure every sheet meets rigorous ISO standards.",
                image: "https://picsum.photos/id/180/600/500",
                years: "10+",
                bullets: ['ISO 9001:2015 Certified', 'Advanced CNC Cutting', 'Eco-friendly Practices', '24/7 Support']
            }
        },
        {
            id: 'social-proof',
            type: 'text',
            content: {
                title: "Don't Just Take Our Word For It",
                subtitle: "See what our clients are saying about us directly on WhatsApp and Instagram. Transparency is our best policy.",
                items: [
                  {
                    platform: 'whatsapp',
                    name: 'Rahul - Furniture Mfg',
                    role: 'Bulk Buyer',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    messages: [
                      { side: 'right', text: "Hi team, received the 50 sheets of Acrylic today.", time: "10:30 AM" },
                      { side: 'right', text: "Packaging was solid. No scratches at all! ⭐", time: "10:31 AM" },
                      { side: 'left', text: "Glad to hear that Rahul! We added extra corner guards this time.", time: "10:35 AM" }
                    ]
                  },
                  {
                    platform: 'instagram',
                    name: 'design_studio_x',
                    role: 'Interior Designer',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=300&auto=format&fit=crop',
                    messages: [
                      { side: 'left', text: "Hey! Just installed the Ubuntu sheets for the vanity.", time: "2h" },
                      { side: 'left', text: "Carpenters are loving the calibration. Zero undulations! 😍", time: "2h" },
                      { side: 'right', text: "Music to our ears! 🛠️✨ Can't wait to see the final pics.", time: "1h" },
                    ]
                  },
                  {
                    platform: 'whatsapp',
                    name: 'Vikram Signs',
                    role: 'Distributor',
                    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
                    messages: [
                      { side: 'left', text: "Sir, the 12mm Clear Acrylic quality is superb.", time: "4:20 PM" },
                      { side: 'left', text: "Laser cutting edges are coming out crystal clear.", time: "4:21 PM" },
                      { side: 'right', text: "That's great Vikram. It's 100% virgin monomer casting.", time: "4:25 PM" }
                    ]
                  }
                ]
            }
        },
        {
            id: 'applications',
            type: 'gallery',
            content: {
                title: "Applications Across Industries",
                subtitle: "From heavy industry to aesthetic interiors, our sheets deliver performance and beauty.",
                items: [
                  { title: 'Furniture Manufacturing', img: 'https://picsum.photos/id/40/600/400' },
                  { title: 'Interior Design & Decor', img: 'https://picsum.photos/id/50/600/400' },
                  { title: 'Signage & Displays', img: 'https://picsum.photos/id/60/600/400' },
                  { title: 'Industrial Fabrication', img: 'https://picsum.photos/id/70/600/400' },
                  { title: 'Construction & Roofing', img: 'https://picsum.photos/id/80/600/400' },
                  { title: 'Office Partitions', img: 'https://picsum.photos/id/90/600/400' },
                ]
            }
        },
        {
            id: 'testimonials',
            type: 'features',
            content: {
                title: "Trusted by Professionals",
                subtitle: "Join over 500+ businesses who trust StylenSurface for their material needs.",
                items: [
                  {
                    id: 1,
                    name: "Rajesh Kumar",
                    role: "Production Manager",
                    company: "Urban Furniture Ltd.",
                    content: "We have been procuring Ubuntu sheets for our modular kitchens for 2 years. The moisture resistance and finish are top-notch.",
                    rating: 5,
                    image: "https://randomuser.me/api/portraits/men/32.jpg"
                  },
                  {
                    id: 2,
                    name: "Sarah Pinto",
                    role: "Interior Designer",
                    company: "Design Studio X",
                    content: "Their clear acrylic sheets are perfect for the high-end signage projects we handle. Delivery is always on time in Mumbai.",
                    rating: 5,
                    image: "https://randomuser.me/api/portraits/women/44.jpg"
                  },
                  {
                    id: 3,
                    name: "Amit Verma",
                    role: "Purchase Head",
                    company: "Industrial Solutions",
                    content: "Excellent cork sheets for our industrial gasket requirements. Very consistent density and pricing is competitive.",
                    rating: 4,
                    image: "https://randomuser.me/api/portraits/men/85.jpg"
                  }
                ]
            }
        },
        {
            id: 'faq',
            type: 'text',
            content: {
                title: "Frequently Asked Questions",
                items: [
                  {
                    question: "What is the minimum order quantity (MOQ) for bulk prices?",
                    answer: "For wholesale pricing, our MOQ is typically 500kg or 50 sheets, depending on the material type."
                  },
                  {
                    question: "Do you provide custom cutting services?",
                    answer: "Yes, we have advanced CNC and laser cutting machines to provide sheets cut to your exact dimensions."
                  },
                  {
                    question: "What is the difference between Cast and Extruded Acrylic?",
                    answer: "Cast acrylic offers better optical clarity and chemical resistance. Extruded is more uniform in thickness."
                  },
                  {
                    question: "Do you deliver pan-India?",
                    answer: "Yes, we have logistics partners covering all major cities and industrial hubs across India."
                  },
                  {
                    question: "Can I get a sample before placing a bulk order?",
                    answer: "Absolutely. We can ship a sample kit containing small swatches of our Acrylic, Ubuntu, and Cork sheets."
                  }
                ]
            }
        }
    ]
};

// --- MAPPERS ---
// Maps DB columns (snake_case) to App types (camelCase) and vice versa

const mapPageFromDB = (data: any): CMSPage => ({
  id: data.id,
  slug: data.slug,
  template: data.template,
  title: data.title,
  seo: data.seo || { title: '', description: '', keywords: '' },
  sections: data.sections || [],
  isPublished: data.is_published,
  updatedAt: data.updated_at
});

const mapPageToDB = (page: CMSPage) => ({
  id: page.id,
  slug: page.slug,
  template: page.template,
  title: page.title,
  seo: page.seo,
  sections: page.sections,
  is_published: page.isPublished,
  updated_at: page.updatedAt
});

const mapProductFromDB = (data: any): Product => ({
  id: data.id,
  name: data.name,
  category: data.category,
  description: data.description,
  features: data.features || [],
  specs: data.specs || [],
  image: data.image,
  applications: data.applications || [],
  isFeatured: data.is_featured
});

const mapProductToDB = (product: Product) => ({
  id: product.id,
  name: product.name,
  category: product.category,
  description: product.description,
  features: product.features,
  specs: product.specs,
  image: product.image,
  applications: product.applications,
  is_featured: product.isFeatured
});


export const CMS = {
  // --- Pages ---
  getPages: async (): Promise<CMSPage[]> => {
    const { data, error } = await supabase.from('cms_pages').select('*').order('created_at', { ascending: true });
    if (error || !data) return [];
    return data.map(mapPageFromDB);
  },
  
  getPageBySlug: async (slug: string): Promise<CMSPage | undefined> => {
    const normalize = (s: string) => s === '/' ? s : s.replace(/\/$/, '');
    const { data, error } = await supabase
      .from('cms_pages')
      .select('*')
      .eq('slug', normalize(slug))
      .maybeSingle();
      
    if (error || !data) {
        return undefined;
    }
    return mapPageFromDB(data);
  },

  savePage: async (page: CMSPage) => {
    // Ensure we update timestamp
    const pageWithTime = { ...page, updatedAt: new Date().toISOString() };
    const payload = mapPageToDB(pageWithTime);

    const { error } = await supabase.from('cms_pages').upsert(payload, { onConflict: 'id' });
    
    if (error) {
        console.error("Supabase Save Page Error", JSON.stringify(error, null, 2));
        throw error;
    }
  },

  deletePage: async (id: string) => {
    await supabase.from('cms_pages').delete().eq('id', id);
  },

  duplicatePage: async (id: string) => {
    const { data: source } = await supabase.from('cms_pages').select('*').eq('id', id).single();
    if (!source) return;

    // source is raw DB data (snake_case)
    const newPagePayload = {
      ...source, 
      id: crypto.randomUUID(),
      title: `${source.title} (Copy)`,
      slug: `${source.slug}-copy`,
      updated_at: new Date().toISOString(),
      is_published: false
    };
    await supabase.from('cms_pages').insert(newPagePayload);
  },

  // --- Products ---
  getProducts: async (): Promise<Product[]> => {
    const { data, error } = await supabase.from('cms_products').select('*');
    if (error || !data || data.length === 0) {
        return INITIAL_PRODUCTS;
    }
    return data.map(mapProductFromDB);
  },

  saveProduct: async (product: Product) => {
    const payload = mapProductToDB(product);
    const { error } = await supabase.from('cms_products').upsert(payload);
    if(error) {
        console.error("Save Product Error", error);
        return { error };
    }
    return { success: true };
  },

  deleteProduct: async (id: string) => {
    await supabase.from('cms_products').delete().eq('id', id);
  },

  // --- Media ---
  getMedia: async (): Promise<MediaItem[]> => {
    const { data, error } = await supabase.from('cms_media').select('*').order('created_at', { ascending: false });
    if (error) return [];
    return data as MediaItem[];
  },

  saveMedia: async (media: MediaItem) => {
    await supabase.from('cms_media').insert(media);
  },

  deleteMedia: async (id: string) => {
    await supabase.from('cms_media').delete().eq('id', id);
  },

  // --- Menus ---
  getMenus: async (): Promise<MenuStructure> => {
    const { data: header } = await supabase.from('cms_menus').select('items').eq('type', 'header').maybeSingle();
    const { data: footer } = await supabase.from('cms_menus').select('items').eq('type', 'footer').maybeSingle();
    
    return {
        header: header?.items || INITIAL_MENUS.header,
        footer: footer?.items || INITIAL_MENUS.footer
    };
  },

  saveMenus: async (menus: MenuStructure) => {
    await supabase.from('cms_menus').upsert({ type: 'header', items: menus.header }, { onConflict: 'type' });
    await supabase.from('cms_menus').upsert({ type: 'footer', items: menus.footer }, { onConflict: 'type' });
  },

  // --- Settings ---
  getSettings: async (): Promise<GlobalSettings> => {
    const { data, error } = await supabase.from('cms_settings').select('*').maybeSingle();
    if (error || !data) return INITIAL_SETTINGS;
    
    return {
        siteName: data.site_name || INITIAL_SETTINGS.siteName,
        phone: data.phone || INITIAL_SETTINGS.phone,
        email: data.email || INITIAL_SETTINGS.email,
        address: data.address || INITIAL_SETTINGS.address,
        whatsapp: data.whatsapp || INITIAL_SETTINGS.whatsapp,
        integrations: data.integrations || INITIAL_SETTINGS.integrations
    };
  },

  saveSettings: async (settings: GlobalSettings) => {
      const { data } = await supabase.from('cms_settings').select('id').limit(1);
      
      const payload = {
          site_name: settings.siteName,
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          whatsapp: settings.whatsapp,
          integrations: settings.integrations
      };

      if (data && data.length > 0) {
          await supabase.from('cms_settings').update(payload).eq('id', data[0].id);
      } else {
          await supabase.from('cms_settings').insert(payload);
      }
  },

  // --- Leads ---
  getLeads: async (): Promise<Lead[]> => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching leads", error);
      return [];
    }
    return data as Lead[];
  },

  /**
   * One-time seed function to populate the DB with demo data
   * so the user doesn't lose it when they start editing.
   */
  seedInitialData: async () => {
      console.log("Seeding Database...");
      
      // 1. Seed Products
      const { data: existingProducts } = await supabase.from('cms_products').select('id').limit(1);
      if (!existingProducts || existingProducts.length === 0) {
          for (const p of INITIAL_PRODUCTS) {
              await supabase.from('cms_products').upsert(mapProductToDB(p));
          }
      }

      // 2. Seed Menus
      const { data: existingMenus } = await supabase.from('cms_menus').select('id').limit(1);
      if (!existingMenus || existingMenus.length === 0) {
          await supabase.from('cms_menus').upsert({ type: 'header', items: INITIAL_MENUS.header }, { onConflict: 'type' });
          await supabase.from('cms_menus').upsert({ type: 'footer', items: INITIAL_MENUS.footer }, { onConflict: 'type' });
      }

      // 3. Seed Settings
      const { data: existingSettings } = await supabase.from('cms_settings').select('id').limit(1);
      if (!existingSettings || existingSettings.length === 0) {
           await supabase.from('cms_settings').insert({
              site_name: INITIAL_SETTINGS.siteName,
              phone: INITIAL_SETTINGS.phone,
              email: INITIAL_SETTINGS.email,
              address: INITIAL_SETTINGS.address,
              whatsapp: INITIAL_SETTINGS.whatsapp,
              integrations: INITIAL_SETTINGS.integrations
           });
      }

      // 4. Seed Home Page (Critical for Editing Content)
      // Check if ANY home page exists
      const { data: existingHome } = await supabase.from('cms_pages').select('id').eq('slug', '/').maybeSingle();
      if (!existingHome) {
          await supabase.from('cms_pages').insert(mapPageToDB(DEFAULT_HOME_PAGE));
      }

      return true;
  }
};
