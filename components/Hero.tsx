import React from 'react';
import { CheckCircle, ShieldCheck, Truck, Award, Star } from 'lucide-react';
import Button from './ui/Button';
import LeadForm from './ui/LeadForm';
import { useContent } from '../utils/content';

interface HeroProps {
  onOpenModal: () => void;
  content?: any;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal, content: propContent }) => {
  const { content: defaultContent } = useContent();
  
  // Use propContent if available (from CMS), otherwise fall back to defaultContent (hardcoded/legacy)
  const title = propContent?.title || defaultContent.home.heroTitle;
  const subtitle = propContent?.subtitle || defaultContent.home.heroSubtitle;
  const btnPrimary = propContent?.btnPrimary || defaultContent.home.heroBtnPrimary;
  const btnSecondary = propContent?.btnSecondary || defaultContent.home.heroBtnSecondary;
  const bgImage = propContent?.bgImage;

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-industrial-light overflow-hidden">
      {/* Background Elements */}
      {bgImage ? (
          <div className="absolute inset-0">
              <img src={bgImage} alt="Hero Background" className="w-full h-full object-cover opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/90"></div>
          </div>
      ) : (
          <>
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
          </>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-brand-100 text-brand-800 text-sm font-bold tracking-wide">
              <Award className="w-4 h-4 text-accent-500" />
              ISO 9001:2015 Certified Manufacturer
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-industrial-dark leading-[1.1] tracking-tight">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {subtitle}
            </p>
            
            <ul className="space-y-4 max-w-md mx-auto lg:mx-0">
              {[
                'Best Price Guaranteed - Factory Direct',
                'Bulk Orders & Custom Cut Sizes',
                'Pan-India Fast Delivery',
                'Certified Industrial Grade Quality'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-industrial-dark font-medium">
                  <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <Button size="lg" variant="accent" onClick={onOpenModal} className="w-full sm:w-auto">
                {btnPrimary}
              </Button>
              <Button size="lg" variant="outline" onClick={onOpenModal} className="w-full sm:w-auto bg-white">
                {btnSecondary}
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-gray-200/60 mt-6">
               {/* Trust Badges */}
               <div className="flex items-center gap-2 opacity-80 grayscale hover:grayscale-0 transition-all">
                  <ShieldCheck className="w-8 h-8 text-brand-700" />
                  <div className="text-left leading-none">
                    <span className="block text-[10px] text-gray-500 font-bold">100%</span>
                    <span className="block text-xs font-bold text-industrial-dark">SECURE</span>
                  </div>
               </div>
               <div className="flex items-center gap-2 opacity-80 grayscale hover:grayscale-0 transition-all">
                  <Truck className="w-8 h-8 text-brand-700" />
                  <div className="text-left leading-none">
                    <span className="block text-[10px] text-gray-500 font-bold">FAST</span>
                    <span className="block text-xs font-bold text-industrial-dark">SHIPPING</span>
                  </div>
               </div>
               <div className="flex items-center gap-2 opacity-80 grayscale hover:grayscale-0 transition-all">
                  <Star className="w-8 h-8 text-brand-700" />
                  <div className="text-left leading-none">
                    <span className="block text-[10px] text-gray-500 font-bold">TOP</span>
                    <span className="block text-xs font-bold text-industrial-dark">RATED</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="w-full lg:w-[480px] relative z-10 animate-fade-in-up delay-200">
             {/* Decorative blob behind form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-accent-500 rounded-2xl blur opacity-20"></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-brand-900 p-4 text-center">
                <h3 className="text-white font-bold text-lg">Request Wholesale Quote</h3>
                <p className="text-brand-200 text-xs">Get response within 2 hours</p>
              </div>
              
              <div className="p-6 md:p-8">
                <LeadForm />
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                   <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                     <ShieldCheck className="w-3 h-3" /> Your data is secure & private
                   </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;