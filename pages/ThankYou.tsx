
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight, Phone, Mail } from 'lucide-react';
import Button from '../components/ui/Button';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100 relative z-10 animate-fade-in-up">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-industrial-dark mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We have received your enquiry. <br/>Our sales team will get back to you within 2 hours.
        </p>
        
        <div className="bg-brand-50 rounded-xl p-6 mb-8 text-left border border-brand-100">
            <h3 className="font-bold text-brand-900 mb-3 text-sm uppercase tracking-wider">What happens next?</h3>
            <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-200 text-brand-700 flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
                  <span className="mt-0.5">Our technical expert will review your requirement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-200 text-brand-700 flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
                  <span className="mt-0.5">You will receive a call or WhatsApp for verification.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-200 text-brand-700 flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
                  <span className="mt-0.5">We will share the best wholesale quotation.</span>
                </li>
            </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Link to="/">
            <Button variant="primary" fullWidth className="group">
              <Home className="w-4 h-4 mr-2" /> Back to Homepage <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
            </Button>
          </Link>
          <div className="flex justify-center gap-6 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> +91 98765 43210</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> sales@stylensurface.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
