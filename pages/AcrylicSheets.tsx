import React from 'react';
import Button from '../components/ui/Button';
import { CheckCircle, ArrowRight, Layers, Sun, PenTool, Thermometer, Info } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import { useContent } from '../utils/content';

interface PageProps {
  onOpenModal: () => void;
}

const AcrylicSheets: React.FC<PageProps> = ({ onOpenModal }) => {
  const { content } = useContent();

  return (
    <div className="pt-20">
      {/* Page Header */}
      <div className="bg-brand-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513366853605-54962eb02f0a?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <span className="text-accent-400 font-bold tracking-wider uppercase text-sm mb-2 block">Premium Industrial Grade</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">{content.acrylic.title}</h1>
          <p className="text-xl text-brand-100 max-w-3xl leading-relaxed">
            {content.acrylic.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="accent" size="lg" onClick={onOpenModal}>{content.acrylic.btnPrimary}</Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-brand-900" onClick={onOpenModal}>{content.acrylic.btnSecondary}</Button>
          </div>
        </div>
      </div>

      {/* Introduction & Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-industrial-dark mb-6">Why StylenSurface Acrylic?</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Our Acrylic sheets (PMMA) are manufactured using 100% virgin MMA monomer to ensure the highest optical clarity and strength. Unlike recycled variants, our sheets do not yellow over time and maintain 92% light transmission—higher than glass—while being half the weight and 10x more impact resistant.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                  'High Optical Clarity (92%+ transmission)',
                  'UV Resistant & Weatherproof (10 Year Guarantee)',
                  'Lightweight (1.19 g/cm³ density)',
                  'Easy to Fabricate, Cut & Thermoform',
                  'Food Grade Certified variants available',
                  'Chemical Resistance to common acids'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                    <span className="font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/3 bg-brand-50 p-8 rounded-2xl border border-brand-100 sticky top-24">
              <h3 className="text-xl font-bold text-industrial-dark mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-600" /> Quick Specs
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-brand-200 pb-2">
                  <span className="text-gray-600">Standard Size</span>
                  <span className="font-bold text-industrial-dark">8ft x 4ft, 6ft x 4ft</span>
                </div>
                <div className="flex justify-between border-b border-brand-200 pb-2">
                  <span className="text-gray-600">Thickness Range</span>
                  <span className="font-bold text-industrial-dark">1.5mm - 50mm</span>
                </div>
                <div className="flex justify-between border-b border-brand-200 pb-2">
                  <span className="text-gray-600">Density</span>
                  <span className="font-bold text-industrial-dark">1.19 g/cm³</span>
                </div>
                <div className="flex justify-between border-b border-brand-200 pb-2">
                  <span className="text-gray-600">Process Type</span>
                  <span className="font-bold text-industrial-dark">Cast / Extruded</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-600">Surface Hardness</span>
                  <span className="font-bold text-industrial-dark">M-100 (Rockwell)</span>
                </div>
              </div>
              <div className="mt-8">
                <Button fullWidth variant="primary" onClick={onOpenModal}>
                  Request Price List <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="py-20 bg-industrial-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-industrial-dark">Industrial Applications</h2>
            <p className="text-gray-600 mt-2">Versatility across sectors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Layers, title: "Signage & Branding", desc: "LED light boxes, 3D letters, and retail display stands due to excellent light diffusion." },
              { icon: Sun, title: "Architectural Glazing", desc: "Skylights, windows, and partitions requiring high transparency and weather resistance." },
              { icon: PenTool, title: "Furniture & Decor", desc: "Modern transparent chairs, tables, and kitchen cabinet shutters." },
              { icon: Thermometer, title: "Medical & Lab", desc: "Incubators, safety shields, and test equipment requiring chemical resistance." }
            ].map((app, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-brand-700">
                  <app.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-industrial-dark mb-2">{app.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Data Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-industrial-dark mb-8">Technical Properties (ASTM Standards)</h2>
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 border-b border-gray-200 font-bold text-industrial-dark text-sm uppercase">Property</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-industrial-dark text-sm uppercase">Test Method</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-industrial-dark text-sm uppercase">Unit</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-industrial-dark text-sm uppercase">Value</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                <tr>
                  <td className="p-4">Specific Gravity</td>
                  <td className="p-4">ASTM D-792</td>
                  <td className="p-4">-</td>
                  <td className="p-4">1.19</td>
                </tr>
                <tr>
                  <td className="p-4">Tensile Strength</td>
                  <td className="p-4">ASTM D-638</td>
                  <td className="p-4">MPa</td>
                  <td className="p-4">75</td>
                </tr>
                <tr>
                  <td className="p-4">Flexural Modulus</td>
                  <td className="p-4">ASTM D-790</td>
                  <td className="p-4">MPa</td>
                  <td className="p-4">3200</td>
                </tr>
                <tr>
                  <td className="p-4">Light Transmission</td>
                  <td className="p-4">ASTM D-1003</td>
                  <td className="p-4">%</td>
                  <td className="p-4">92</td>
                </tr>
                <tr>
                  <td className="p-4">Heat Deflection Temp</td>
                  <td className="p-4">ASTM D-648</td>
                  <td className="p-4">°C</td>
                  <td className="p-4">95</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">* These values are typical for our Cast Acrylic sheets. Specifications for Extruded sheets may vary slightly.</p>
        </div>
      </section>

      {/* Processing Guide */}
      <section className="py-20 bg-brand-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div>
               <h2 className="text-3xl font-bold mb-6">Fabrication & Handling Guide</h2>
               <p className="text-brand-100 mb-8">
                 To ensure the longevity and finish of StylenSurface Acrylic, follow these best practices during fabrication.
               </p>
               <ul className="space-y-6">
                 <li className="flex gap-4">
                   <span className="font-bold text-accent-400 text-xl">01</span>
                   <div>
                     <h4 className="font-bold text-lg">Cutting</h4>
                     <p className="text-gray-400 text-sm mt-1">Use high-speed carbide-tipped blades for sawing. Laser cutting provides the best polished edge finish.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <span className="font-bold text-accent-400 text-xl">02</span>
                   <div>
                     <h4 className="font-bold text-lg">Cleaning</h4>
                     <p className="text-gray-400 text-sm mt-1">Never use ammonia-based cleaners (like glass cleaner). Use mild soap, water, and a soft microfiber cloth.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <span className="font-bold text-accent-400 text-xl">03</span>
                   <div>
                     <h4 className="font-bold text-lg">Thermoforming</h4>
                     <p className="text-gray-400 text-sm mt-1">Heat uniformly between 140°C to 180°C depending on thickness before bending or molding.</p>
                   </div>
                 </li>
               </ul>
             </div>
             <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Have Technical Questions?</h3>
                <p className="text-gray-400 mb-6">Our technical team can assist you with CNC files, load-bearing calculations, and adhesive selection.</p>
                <Button variant="accent" fullWidth onClick={onOpenModal}>Speak to an Engineer</Button>
             </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

export default AcrylicSheets;