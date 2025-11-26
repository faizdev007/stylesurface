
import React, { useState, useEffect } from 'react';
import { CMSPage, Product } from '../types';
import SEOHead from './SEOHead';
import Hero from './Hero';
import ProductSection from './ProductSection';
import TrustSection from './TrustSection';
import ContactSection from './ContactSection';
import AboutSection from './AboutSection';
import SocialProof from './SocialProof';
import Applications from './Applications';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Button from './ui/Button';
import { MapPin, CheckCircle, Info, Table } from 'lucide-react';
import LeadForm from './ui/LeadForm';
import { CMS } from '../utils/cms';

interface DynamicPageProps {
  page: CMSPage;
  onOpenModal: () => void;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ page, onOpenModal }) => {
  const [matchedProduct, setMatchedProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (page.template === 'product') {
      CMS.getProducts().then((products) => {
        const found = products.find(p => 
          page.slug.includes(p.category) || 
          page.title.toLowerCase().includes(p.name.toLowerCase())
        );
        setMatchedProduct(found);
      });
    } else {
      setMatchedProduct(undefined);
    }
  }, [page]);
  
  // 1. RENDER HOME TEMPLATE
  if (page.template === 'home') {
    const heroContent = page.sections.find(s => s.id === 'hero')?.content;
    const trustContent = page.sections.find(s => s.id === 'trust')?.content;
    const productContent = page.sections.find(s => s.id === 'products')?.content;
    const aboutContent = page.sections.find(s => s.id === 'about')?.content;
    const socialContent = page.sections.find(s => s.id === 'social-proof')?.content;
    const appContent = page.sections.find(s => s.id === 'applications')?.content;
    const testimonialContent = page.sections.find(s => s.id === 'testimonials')?.content;
    const faqContent = page.sections.find(s => s.id === 'faq')?.content;

    return (
      <>
        <SEOHead seo={page.seo} />
        <div className="pt-20">
             <Hero onOpenModal={onOpenModal} content={heroContent} /> 
             <TrustSection content={trustContent} />
             <ProductSection onOpenModal={onOpenModal} content={productContent} />
             <AboutSection content={aboutContent} />
             <SocialProof content={socialContent} />
             <Applications content={appContent} />
             <Testimonials content={testimonialContent} />
             <FAQ content={faqContent} />
             <ContactSection />
        </div>
      </>
    );
  }

  // 2. RENDER LOCATION / CITY PAGE TEMPLATE
  if (page.template === 'location') {
      // Prioritize content created via CMS, fallback to defaults
      const content = page.sections.find(s => s.id === 'location-content')?.content || {};
      const city = content.city || 'Your Location';
      
      return (
        <>
          <SEOHead seo={page.seo} />
          <div className="pt-20">
             {/* Location Hero */}
             <div className="bg-industrial-dark py-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-brand-700 opacity-90"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/30 px-4 py-1 rounded-full text-brand-300 text-sm font-bold mb-4">
                        <MapPin className="w-4 h-4" /> Serving {city}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">{page.title}</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                        {content.highlight || "Premium Sheets supplied directly to your doorstep."}
                    </p>
                    <Button variant="accent" size="lg" onClick={onOpenModal}>Get {city} Quote</Button>
                </div>
             </div>

             <div className="py-16 bg-white">
                 <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center">
                     <div className="flex-1">
                         <h2 className="text-3xl font-bold text-industrial-dark mb-4">Why buy in {city}?</h2>
                         <p className="text-gray-600 text-lg mb-6">
                             We have established a robust supply chain network in {city}, ensuring that you get factory-direct prices without the hassle of interstate logistics delays.
                         </p>
                         <ul className="space-y-3">
                             <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600"/> Fast Delivery in {city}</li>
                             <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600"/> Local GST Billing Available</li>
                             <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600"/> Bulk Discounts for {city} Dealers</li>
                         </ul>
                     </div>
                     <div className="w-full lg:w-1/3">
                         <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                             <h3 className="font-bold text-lg mb-4">Request {city} Pricelist</h3>
                             <LeadForm />
                         </div>
                     </div>
                 </div>
             </div>
             <TrustSection />
          </div>
        </>
      );
  }

  // 3. RENDER PRODUCT TEMPLATE (Generic)
  if (page.template === 'product') {
    const heroContent = page.sections.find(s => s.id === 'product-hero')?.content || {};
    const featureContent = page.sections.find(s => s.id === 'product-features')?.content || {};
    
    return (
      <>
        <SEOHead seo={page.seo} />
        <div className="pt-20">
            {/* Dynamic Hero */}
            <div className="bg-brand-900 py-24 text-white relative overflow-hidden">
                {heroContent.bgImage && (
                    <div className={`absolute inset-0 bg-cover bg-center opacity-20`} style={{ backgroundImage: `url(${heroContent.bgImage})` }}></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6">{heroContent.title || page.title}</h1>
                    <p className="text-xl text-brand-100 max-w-3xl leading-relaxed mb-8">
                        {heroContent.subtitle || "Premium Quality Industrial Sheets"}
                    </p>
                    <Button variant="accent" size="lg" onClick={onOpenModal}>Get Quote</Button>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-industrial-dark mb-6">{featureContent.title || 'Product Features'}</h2>
                            <p className="text-gray-600 text-lg mb-8">{featureContent.text}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {(featureContent.items || []).map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-brand-600"/>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                         {/* Technical Specs Table */}
                         <div className="w-full lg:w-5/12">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                <div className="bg-brand-50 p-4 border-b border-brand-100 flex items-center gap-2">
                                    <Table className="w-5 h-5 text-brand-700" />
                                    <h3 className="font-bold text-brand-900">Technical Specifications</h3>
                                </div>
                                <div>
                                    {matchedProduct?.specs && matchedProduct.specs.length > 0 ? (
                                        <table className="w-full text-sm text-left">
                                            <tbody className="divide-y divide-gray-100">
                                                {matchedProduct.specs.map((spec, i) => (
                                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                        <td className="p-4 font-semibold text-gray-600 bg-gray-50/50 w-1/3">{spec.label}</td>
                                                        <td className="p-4 text-industrial-dark font-medium">{spec.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="p-8 text-center text-gray-500">
                                            <p className="text-sm">Contact us for detailed technical data sheets (TDS) for this product range.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </section>
            <ContactSection />
        </div>
      </>
    );
  }

  // Default / Content Template
  const mainContent = page.sections.find(s => s.id === 'main-content')?.content || {};

  return (
    <>
        <SEOHead seo={page.seo} />
        <div className="pt-32 pb-20 container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-industrial-dark">{page.title}</h1>
            {mainContent.html ? (
                <div className="prose max-w-none prose-lg text-gray-600" dangerouslySetInnerHTML={{ __html: mainContent.html }} />
            ) : (
                <div className="prose max-w-none text-gray-500 italic">
                    <p>No content added yet.</p>
                </div>
            )}
        </div>
    </>
  );
};

export default DynamicPage;
