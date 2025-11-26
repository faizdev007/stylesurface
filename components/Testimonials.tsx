
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Production Manager",
    company: "Urban Furniture Ltd.",
    content: "We have been procuring Ubuntu sheets for our modular kitchens for 2 years. The moisture resistance and finish are top-notch. Highly recommended for bulk buyers.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sarah Pinto",
    role: "Interior Designer",
    company: "Design Studio X",
    content: "Their clear acrylic sheets are perfect for the high-end signage projects we handle. Delivery is always on time in Mumbai, which is crucial for our deadlines.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Purchase Head",
    company: "Industrial Solutions",
    content: "Excellent cork sheets for our industrial gasket requirements. Very consistent density and pricing is competitive compared to other suppliers in the market.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/85.jpg"
  }
];

interface TestimonialsProps {
  content?: any;
}

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  const title = content?.title || "Trusted by Professionals";
  const subtitle = content?.subtitle || "Join over 500+ businesses who trust StylenSurface for their material needs.";
  const items = content?.items || defaultTestimonials;

  return (
    <section className="py-24 bg-industrial-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item: Testimonial) => (
            <div key={item.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative group">
              <Quote className="absolute top-8 right-8 w-10 h-10 text-brand-100 group-hover:text-brand-200 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < item.rating ? 'text-accent-400 fill-accent-400' : 'text-gray-200'}`} />
                ))}
              </div>
              
              <p className="text-gray-700 text-lg italic mb-8 leading-relaxed relative z-10">"{item.content}"</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand-100" />
                <div>
                  <h4 className="font-bold text-industrial-dark text-lg">{item.name}</h4>
                  <p className="text-sm text-brand-600 font-medium">{item.role}, {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
