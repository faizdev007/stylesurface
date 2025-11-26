import React from 'react';
import Button from '../components/ui/Button';
import { CheckCircle, ArrowRight, Leaf, Volume2, Zap, Box } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import { useContent } from '../utils/content';

interface PageProps {
  onOpenModal: () => void;
}

const CorkSheets: React.FC<PageProps> = ({ onOpenModal }) => {
  const { content } = useContent();

  return (
    <div className="pt-20">
      {/* Page Header */}
      <div className="bg-[#5D4037] py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621261354943-4a3b10856528?q=80&w=2000&auto=format&fit=crop')] opacity-30 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037] via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <span className="text-orange-200 font-bold tracking-wider uppercase text-sm mb-2 block">Sustainable Industrial Material</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">{content.cork.title}</h1>
          <p className="text-xl text-orange-100 max-w-3xl leading-relaxed">
            {content.cork.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="accent" size="lg" className="bg-orange-600 hover:bg-orange-700 border-transparent" onClick={onOpenModal}>{content.cork.btnPrimary}</Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-[#5D4037]" onClick={onOpenModal}>{content.cork.btnSecondary}</Button>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-industrial-dark">Why Choose Cork?</h2>
             <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Cork is nature's own high-tech foam, offering properties that synthetic materials struggle to match.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: Leaf, title: "Eco-Friendly", desc: "Harvested from the bark of cork oak trees without cutting them down. 100% biodegradable and recyclable." },
               { icon: Volume2, title: "Acoustic Insulation", desc: "Natural cellular structure absorbs sound waves, making it perfect for recording studios and office walls." },
               { icon: Zap, title: "Thermal Barrier", desc: "Low thermal conductivity helps maintain room temperature, saving energy costs in buildings." },
               { icon: Box, title: "Elastic & Resilient", desc: "Compresses under pressure and recovers to original shape, ideal for gaskets and seals." }
             ].map((item, i) => (
               <div key={i} className="text-center p-6 rounded-xl hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-100">
                 <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-[#5D4037]">
                   <item.icon className="w-8 h-8" />
                 </div>
                 <h3 className="font-bold text-lg text-industrial-dark mb-2">{item.title}</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Grades & Specs */}
      <section className="py-20 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
               <h2 className="text-3xl font-bold text-industrial-dark mb-8">Available Grades</h2>
               <div className="space-y-6">
                 <div className="flex gap-6 items-start border-b border-gray-200 pb-6">
                   <div className="w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] bg-orange-200 rounded-lg flex-shrink-0"></div>
                   <div>
                     <h3 className="text-xl font-bold text-[#5D4037]">Fine Grain</h3>
                     <p className="text-sm text-gray-500 mb-2">Density: 200-220 kg/m³</p>
                     <p className="text-gray-700">Best for pinboards, notice boards, and decorative wall tiles where a smooth texture is required.</p>
                   </div>
                 </div>
                 <div className="flex gap-6 items-start border-b border-gray-200 pb-6">
                   <div className="w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] bg-orange-300 rounded-lg flex-shrink-0 grayscale-[0.5]"></div>
                   <div>
                     <h3 className="text-xl font-bold text-[#5D4037]">Medium Grain</h3>
                     <p className="text-sm text-gray-500 mb-2">Density: 220-260 kg/m³</p>
                     <p className="text-gray-700">Versatile usage for underlayment beneath flooring to reduce impact noise and thermal loss.</p>
                   </div>
                 </div>
                 <div className="flex gap-6 items-start">
                   <div className="w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] bg-gray-400 rounded-lg flex-shrink-0 grayscale"></div>
                   <div>
                     <h3 className="text-xl font-bold text-[#5D4037]">Rubberized Cork</h3>
                     <p className="text-sm text-gray-500 mb-2">Synthetic Blend</p>
                     <p className="text-gray-700">Engineered for heavy industrial use: gaskets, oil seals, and vibration pads for heavy machinery.</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="w-full lg:w-1/2">
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-industrial-dark mb-6">Technical Specifications</h3>
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                         <td className="py-3 text-gray-500">Sheet Dimensions</td>
                         <td className="py-3 font-semibold text-right">915mm x 610mm (Standard)</td>
                      </tr>
                      <tr>
                         <td className="py-3 text-gray-500">Thickness Options</td>
                         <td className="py-3 font-semibold text-right">1mm, 2mm, 4mm, 6mm, 8mm, 10mm+</td>
                      </tr>
                      <tr>
                         <td className="py-3 text-gray-500">Compressibility</td>
                         <td className="py-3 font-semibold text-right">30% - 50% at 400 PSI</td>
                      </tr>
                      <tr>
                         <td className="py-3 text-gray-500">Recovery</td>
                         <td className="py-3 font-semibold text-right">> 80%</td>
                      </tr>
                      <tr>
                         <td className="py-3 text-gray-500">Thermal Conductivity</td>
                         <td className="py-3 font-semibold text-right">0.042 W/mK</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-8 p-4 bg-orange-50 rounded-lg text-sm text-[#5D4037]">
                    <strong>Installation Tip:</strong> For wall applications, use a contact adhesive applied to both the cork sheet and the wall surface. Ensure the wall is dry and dust-free.
                  </div>
                  <div className="mt-6">
                    <Button fullWidth variant="primary" className="bg-[#5D4037] hover:bg-[#4E342E]" onClick={onOpenModal}>
                      Order Sample Kit
                    </Button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

export default CorkSheets;