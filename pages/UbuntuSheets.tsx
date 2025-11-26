import React from 'react';
import Button from '../components/ui/Button';
import { CheckCircle, ArrowRight, XCircle, Shield, Droplets, Hammer } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import { useContent } from '../utils/content';

interface PageProps {
  onOpenModal: () => void;
}

const UbuntuSheets: React.FC<PageProps> = ({ onOpenModal }) => {
  const { content } = useContent();

  return (
    <div className="pt-20">
      {/* Page Header */}
      <div className="bg-brand-800 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610505466396-3f81b2a8c10a?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-800 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <span className="text-accent-400 font-bold tracking-wider uppercase text-sm mb-2 block">The Future of Furniture</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">{content.ubuntu.title}</h1>
          <p className="text-xl text-brand-100 max-w-3xl leading-relaxed">
            {content.ubuntu.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="accent" size="lg" onClick={onOpenModal}>{content.ubuntu.btnPrimary}</Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-brand-800" onClick={onOpenModal}>{content.ubuntu.btnSecondary}</Button>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
             <div className="flex-1">
               <h2 className="text-3xl font-bold text-industrial-dark mb-6">What is Ubuntu Sheet?</h2>
               <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                 Ubuntu Sheet is a high-density Multi-Layer Composite (MLC) board. Unlike WPC or PVC boards which can be brittle, Ubuntu sheets are engineered with a specialized core that offers high screw-holding capacity comparable to hardwood plywood, but without the risk of termites or water damage.
               </p>
               <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                 It is a "Fit and Forget" solution for homeowners and a "Calibrated & Easy to Cut" material for carpenters.
               </p>
               <div className="flex gap-4 flex-wrap">
                 <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full font-bold text-sm">
                   <Shield className="w-4 h-4" /> Termite Proof
                 </div>
                 <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full font-bold text-sm">
                   <Droplets className="w-4 h-4" /> Waterproof
                 </div>
                 <div className="flex items-center gap-2 bg-orange-50 text-orange-800 px-4 py-2 rounded-full font-bold text-sm">
                   <Hammer className="w-4 h-4" /> High Strength
                 </div>
               </div>
             </div>
             <div className="w-full lg:w-1/2">
               <img src="https://picsum.photos/id/135/800/500" alt="Ubuntu Sheet Layers" className="rounded-xl shadow-2xl" />
               <p className="text-center text-xs text-gray-400 mt-2">Cross-section showing high-density core</p>
             </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-industrial-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-industrial-dark">Ubuntu vs The Rest</h2>
            <p className="text-gray-600 mt-2">Why upgrade from Plywood?</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-brand-900 text-white">
                <tr>
                  <th className="p-5 text-left">Feature</th>
                  <th className="p-5 text-left bg-accent-600">Ubuntu Sheet</th>
                  <th className="p-5 text-left opacity-80">BWP Plywood</th>
                  <th className="p-5 text-left opacity-80">MDF / Particle Board</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm md:text-base">
                <tr>
                  <td className="p-5 font-bold text-industrial-dark">Water Resistance</td>
                  <td className="p-5 bg-brand-50 font-bold text-brand-700"><CheckCircle className="w-5 h-5 inline mr-2"/> 100% Waterproof</td>
                  <td className="p-5 text-gray-600">Water Resistant (Swells over time)</td>
                  <td className="p-5 text-gray-600"><XCircle className="w-5 h-5 inline mr-2 text-red-500"/> Swells instantly</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-industrial-dark">Termite Proof</td>
                  <td className="p-5 bg-brand-50 font-bold text-brand-700"><CheckCircle className="w-5 h-5 inline mr-2"/> Lifetime Guarantee</td>
                  <td className="p-5 text-gray-600">Requires chemical treatment</td>
                  <td className="p-5 text-gray-600">Prone to pests</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-industrial-dark">Surface Finish</td>
                  <td className="p-5 bg-brand-50 font-bold text-brand-700">Calibrated Smooth (No sanding)</td>
                  <td className="p-5 text-gray-600">Rough (Needs sanding)</td>
                  <td className="p-5 text-gray-600">Smooth</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-industrial-dark">Screw Holding</td>
                  <td className="p-5 bg-brand-50 font-bold text-brand-700">Excellent (>1800 N)</td>
                  <td className="p-5 text-gray-600">Excellent</td>
                  <td className="p-5 text-gray-600">Poor</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-industrial-dark">VOC Emissions</td>
                  <td className="p-5 bg-brand-50 font-bold text-brand-700">Zero (E0 Grade)</td>
                  <td className="p-5 text-gray-600">Contains Formaldehyde</td>
                  <td className="p-5 text-gray-600">High Chemical Content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Applications & Installation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
             <div>
                <h2 className="text-3xl font-bold text-industrial-dark mb-8">Ideal Applications</h2>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">01</div>
                    <div>
                      <h4 className="text-lg font-bold text-industrial-dark">Modular Kitchens</h4>
                      <p className="text-gray-600 text-sm">Perfect for carcass boxes specifically in wet areas (sink units).</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">02</div>
                    <div>
                      <h4 className="text-lg font-bold text-industrial-dark">Bathroom Vanities</h4>
                      <p className="text-gray-600 text-sm">Will never rot or swell even with direct water contact.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">03</div>
                    <div>
                      <h4 className="text-lg font-bold text-industrial-dark">Wall Cladding & CNC Jali</h4>
                      <p className="text-gray-600 text-sm">Can be CNC routed intricately without chipping edges.</p>
                    </div>
                  </li>
                </ul>
             </div>
             
             <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl">
               <h3 className="text-xl font-bold text-industrial-dark mb-6">Carpenter's Guide</h3>
               <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5" />
                    <p className="text-sm text-gray-700"><strong>Cutting:</strong> Use standard circular saws or panel saws. No special blades required.</p>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5" />
                    <p className="text-sm text-gray-700"><strong>Screwing:</strong> Pre-drilling is recommended for edges to prevent splitting, similar to hardwood.</p>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5" />
                    <p className="text-sm text-gray-700"><strong>Adhesives:</strong> Use PVC solvent cement for board-to-board bonding or high-strength PU glue for laminates.</p>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5" />
                    <p className="text-sm text-gray-700"><strong>Finishing:</strong> Can be directly painted with DUCO/PU paints or laminated using standard adhesives.</p>
                 </div>
               </div>
               <div className="mt-8">
                 <Button fullWidth variant="secondary" onClick={onOpenModal}>Get Technical Manual</Button>
               </div>
             </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

export default UbuntuSheets;