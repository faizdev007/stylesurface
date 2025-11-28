import React from 'react';
import { Factory, Clock, Users, Ruler, MapPin, Award } from 'lucide-react';

const defaultFeatures = [
  { icon: Factory, title: "Manufacturer Direct", desc: "No middlemen, get factory prices." },
  { icon: Clock, title: "10+ Years Experience", desc: "Expertise in sheet manufacturing." },
  { icon: Users, title: "500+ Happy Clients", desc: "Trusted by top furniture brands." },
  { icon: Ruler, title: "Custom Sizes", desc: "Cut-to-size service available." },
  { icon: MapPin, title: "Pan-India Delivery", desc: "Fast logistics partner network." },
  { icon: Award, title: "ISO 9001 Certified", desc: "Guaranteed quality standards." },
];

const iconMap: any = { Factory, Clock, Users, Ruler, MapPin, Award };

interface TrustSectionProps {
    content?: any;
}

const TrustSection: React.FC<TrustSectionProps> = ({ content }) => {
  // If content is passed, map it. Otherwise use defaults.
  // We handle string icon names from CMS if needed.
  const features = content?.features || defaultFeatures;
  const title = content?.title || "Why Industry Leaders Choose Us";

  return (
    <section className="py-20 bg-gray-700 text-white relative overflow-hidden">
       {/* Decorative background */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
       
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <div className="w-24 h-1.5 bg-accent-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {features.map((feature: any, idx: number) => {
             // Handle both component reference (hardcoded) and string name (CMS)
             const IconComponent = typeof feature.icon === 'string' ? (iconMap[feature.icon] || Award) : feature.icon;
             
             return (
                <div key={idx} className="group flex flex-col items-center text-center p-6 rounded-2xl bg-yellow-600/80 border border-brand-700/50 hover:bg-yellow-800/80 hover:border-brand-600 transition-all duration-300 hover:-translate-y-1">
                <div className="bg-brand-950 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-brand-800">
                    <IconComponent className="w-8 h-8 text-accent-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-brand-200 text-sm leading-snug">{feature.desc}</p>
                </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;