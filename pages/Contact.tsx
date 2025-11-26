import React from 'react';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import { MapPin, Clock, Mail, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="bg-brand-900 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-brand-200 max-w-xl mx-auto text-lg">Get in touch for bulk orders, dealership enquiries, or technical support.</p>
      </div>
      
      {/* Regional Info Grid */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="text-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-700">
                   <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-industrial-dark mb-2">Office Hours</h3>
                <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
             </div>
             <div className="text-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-700">
                   <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-industrial-dark mb-2">Department Emails</h3>
                <p className="text-gray-600 text-sm">Sales: <a href="mailto:sales@stylensurface.com" className="text-brand-600 hover:underline">sales@stylensurface.com</a></p>
                <p className="text-gray-600 text-sm">Support: <a href="mailto:support@stylensurface.com" className="text-brand-600 hover:underline">support@stylensurface.com</a></p>
             </div>
             <div className="text-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-700">
                   <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-industrial-dark mb-2">Direct Lines</h3>
                <p className="text-gray-600">+91 98765 43210 (Sales)</p>
                <p className="text-gray-600">+91 11 2345 6789 (Head Office)</p>
             </div>
           </div>
        </div>
      </div>

      <ContactSection />
      
      {/* Regional Warehouses */}
      <section className="py-20 bg-industrial-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-industrial-dark">Our Presence</h2>
            <p className="text-gray-600 mt-2">Visit our regional distribution centers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div className="bg-white p-6 rounded-xl border-l-4 border-brand-500 shadow-sm">
               <h3 className="font-bold text-lg text-industrial-dark mb-2 flex items-center gap-2">
                 <MapPin className="w-5 h-5 text-brand-500" /> New Delhi (HQ)
               </h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                 Plot No. 123, Industrial Area, Phase 2,<br/> Okhla, New Delhi, 110020
               </p>
             </div>
             <div className="bg-white p-6 rounded-xl border-l-4 border-brand-500 shadow-sm">
               <h3 className="font-bold text-lg text-industrial-dark mb-2 flex items-center gap-2">
                 <MapPin className="w-5 h-5 text-brand-500" /> Mumbai
               </h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                 Gala No. 45, Building B, Bhiwandi Logistics Park,<br/> Thane, Maharashtra, 421302
               </p>
             </div>
             <div className="bg-white p-6 rounded-xl border-l-4 border-brand-500 shadow-sm">
               <h3 className="font-bold text-lg text-industrial-dark mb-2 flex items-center gap-2">
                 <MapPin className="w-5 h-5 text-brand-500" /> Bangalore
               </h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                 Shed 12, Peenya Industrial Estate,<br/> 2nd Stage, Bangalore, 560058
               </p>
             </div>
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
};

export default Contact;