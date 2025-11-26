import React from 'react';
import AboutSection from '../components/AboutSection';
import TrustSection from '../components/TrustSection';
import ContactSection from '../components/ContactSection';
import { Target, Heart, Zap, Factory } from 'lucide-react';

interface PageProps {
  onOpenModal: () => void;
}

const About: React.FC<PageProps> = ({ onOpenModal }) => {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-industrial-dark py-20 text-center border-b border-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">About StylenSurface</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Building the foundation of Indian industry since 2013 with precision, quality, and trust.</p>
        </div>
      </div>
      
      {/* Main Intro */}
      <AboutSection />
      
      {/* Core Values */}
      <div className="py-20 bg-brand-50">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-industrial-dark">Our Core Values</h2>
             <p className="text-gray-600 mt-2">The principles that drive every sheet we manufacture</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                 <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-700">
                   <Target className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-industrial-dark mb-3">Precision First</h3>
                 <p className="text-gray-600">We believe that even a millimeter makes a difference. Our rigorous quality control ensures that every sheet is calibrated to exact specifications.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                 <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-700">
                   <Zap className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-industrial-dark mb-3">Innovation</h3>
                 <p className="text-gray-600">From introducing Ubuntu sheets to optimizing cork composites, we constantly evolve our product line to meet modern industrial needs.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                 <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-700">
                   <Heart className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-industrial-dark mb-3">Customer Partnership</h3>
                 <p className="text-gray-600">We don't just sell sheets; we solve problems. Our relationship with clients goes beyond the transaction to long-term supply reliability.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Timeline / Journey */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-industrial-dark mb-12 text-center">Our Journey</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-brand-500 group-[.is-active]:bg-accent-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                2013
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-200 shadow">
                <div className="font-bold text-gray-900">Inception</div>
                <div className="text-gray-600 text-sm mt-1">StylenSurface started as a small trading unit for Acrylic sheets in New Delhi.</div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-brand-500 group-[.is-active]:bg-accent-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                2016
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-200 shadow">
                <div className="font-bold text-gray-900">Manufacturing Unit</div>
                <div className="text-gray-600 text-sm mt-1">Established our first manufacturing plant with a capacity of 500 sheets/day.</div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-brand-500 group-[.is-active]:bg-accent-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                2019
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-200 shadow">
                <div className="font-bold text-gray-900">Ubuntu Launch</div>
                <div className="text-gray-600 text-sm mt-1">Pioneered the Ubuntu Sheet in the Indian market as a waterproof plywood alternative.</div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-brand-500 group-[.is-active]:bg-accent-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                2023
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-200 shadow">
                <div className="font-bold text-gray-900">Pan-India Expansion</div>
                <div className="text-gray-600 text-sm mt-1">Crossed 500+ active B2B clients and established distribution hubs in Mumbai & Bangalore.</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Infrastructure */}
      <div className="py-20 bg-industrial-dark text-white">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col lg:flex-row items-center gap-12">
             <div className="flex-1">
               <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                 <Factory className="w-8 h-8 text-accent-500" />
                 Our Infrastructure
               </h2>
               <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                 Located in the industrial heart of New Delhi, our facility spans 25,000 sq. ft. and is equipped with automated extrusion lines and calibration sanders.
               </p>
               <ul className="space-y-4 text-gray-300">
                 <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-500 rounded-full"></div> Automated Extrusion Lines for Acrylic</li>
                 <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-500 rounded-full"></div> High-Pressure Compression Molding for Cork</li>
                 <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-500 rounded-full"></div> CNC & Laser Cutting Service Center</li>
                 <li className="flex items-center gap-3"><div className="w-2 h-2 bg-accent-500 rounded-full"></div> In-house Quality Testing Lab</li>
               </ul>
             </div>
             <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                <img src="https://picsum.photos/id/237/400/300" alt="Factory 1" className="rounded-lg opacity-80 hover:opacity-100 transition-opacity" />
                <img src="https://picsum.photos/id/238/400/300" alt="Factory 2" className="rounded-lg opacity-80 hover:opacity-100 transition-opacity" />
                <img src="https://picsum.photos/id/239/400/300" alt="Factory 3" className="rounded-lg opacity-80 hover:opacity-100 transition-opacity" />
                <img src="https://picsum.photos/id/240/400/300" alt="Factory 4" className="rounded-lg opacity-80 hover:opacity-100 transition-opacity" />
             </div>
           </div>
        </div>
      </div>

      <TrustSection />
      <ContactSection />
    </div>
  );
};

export default About;