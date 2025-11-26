
import React from 'react';
import { Check } from 'lucide-react';

interface AboutSectionProps {
  content?: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  const data = content || {
    title: "Manufacturing Quality That You Can Trust",
    text: "Established in 2013, StylenSurface has grown to become one of India's most trusted suppliers of industrial grade sheets. Our state-of-the-art manufacturing facility employs advanced extrusion and casting technologies to ensure every sheet meets rigorous ISO standards.",
    image: "https://picsum.photos/id/180/600/500",
    years: "10+",
    bullets: ['ISO 9001:2015 Certified', 'Advanced CNC Cutting', 'Eco-friendly Practices', '24/7 Support']
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img 
                src={data.image} 
                alt="Factory" 
                className="rounded-xl shadow-xl w-full object-cover max-h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-800 p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-4xl font-bold text-white mb-1">{data.years}</p>
                <p className="text-brand-200 text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-6">{data.title}</h2>
            <div className="text-gray-600 text-lg mb-6 leading-relaxed whitespace-pre-line">
              {data.text}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {data.bullets?.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-green-100 p-1 rounded-full">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
