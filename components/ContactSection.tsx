import React from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import LeadForm from './ui/LeadForm';
import { useContent } from '../utils/content';

const ContactSection: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-4">
              Wholesale & Bulk Orders
            </div>
            <h2 className="text-4xl font-bold text-industrial-dark mb-6">Start Your Bulk Order</h2>
            <p className="text-gray-600 text-lg mb-8">
              Get the best wholesale rates in the market. Fill out the form or reach us directly via phone or WhatsApp.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-lg text-brand-700">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-industrial-dark">Call Us (24/7)</h3>
                  <p className="text-gray-600">{content.global.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-lg text-brand-700">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-industrial-dark">WhatsApp Support</h3>
                  <p className="text-gray-600">{content.global.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-lg text-brand-700">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-industrial-dark">Email Us</h3>
                  <p className="text-gray-600">{content.global.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-lg text-brand-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-industrial-dark">Factory Address</h3>
                  <p className="text-gray-600">{content.global.address}</p>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="mt-8 h-48 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400">
               Google Map Integration
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-industrial-dark mb-6">Send Enquiry</h3>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;