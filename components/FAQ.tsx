
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const defaultFaqs: FAQItem[] = [
  {
    question: "What is the minimum order quantity (MOQ) for bulk prices?",
    answer: "For wholesale pricing, our MOQ is typically 500kg or 50 sheets, depending on the material type. However, we can discuss smaller trial orders."
  },
  {
    question: "Do you provide custom cutting services?",
    answer: "Yes, we have advanced CNC and laser cutting machines to provide sheets cut to your exact dimensions, saving you fabrication time."
  },
  {
    question: "What is the difference between Cast and Extruded Acrylic?",
    answer: "Cast acrylic offers better optical clarity and chemical resistance, making it ideal for fabrication. Extruded acrylic is more uniform in thickness and cost-effective."
  },
  {
    question: "Do you deliver pan-India?",
    answer: "Yes, we have logistics partners covering all major cities and industrial hubs across India including Mumbai, Delhi, Bangalore, Chennai, and Gujarat."
  },
  {
    question: "Can I get a sample before placing a bulk order?",
    answer: "Absolutely. We can ship a sample kit containing small swatches of our Acrylic, Ubuntu, and Cork sheets for quality verification."
  }
];

interface FAQProps {
  content?: any;
}

const FAQ: React.FC<FAQProps> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const title = content?.title || "Frequently Asked Questions";
  const items = content?.items || defaultFaqs;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-industrial-dark">{title}</h2>
        </div>

        <div className="space-y-4">
          {items.map((faq: FAQItem, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-industrial-dark text-lg">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="w-5 h-5 text-brand-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              
              <div className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 py-5 border-t border-gray-100' : 'max-h-0'}`}>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
