import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Table } from 'lucide-react';
import Button from './ui/Button';
import { Product } from '../types';
import { useContent } from '../utils/content';
import { CMS } from '../utils/cms';

interface ProductSectionProps {
  onOpenModal: () => void;
  content?: any;
}

const ProductSection: React.FC<ProductSectionProps> = ({ onOpenModal, content: propContent }) => {
  const { content: defaultContent } = useContent();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
        const data = await CMS.getProducts();
        setProducts(data);
    };
    fetchProducts();
  }, []);

  const title = propContent?.title || defaultContent.home.productTitle;
  const subtitle = propContent?.subtitle || defaultContent.home.productSubtitle;

  return (
    <section id="products" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-wider uppercase text-sm">Our Product Range</span>
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark mt-2 mb-6">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
              {/* Image Area */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                />
                {product.category === 'acrylic' && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-brand-800 shadow-sm">
                        Best Seller
                    </div>
                )}
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full">{product.category}</span>
                </div>
                <h3 className="text-lg font-bold text-industrial-dark mb-2 group-hover:text-brand-600 transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                
                <div className="mb-6 space-y-1">
                  {/* Prioritize Features, if not available, show top 2 specs */}
                  {product.features && product.features.length > 0 ? (
                      product.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                          <Star className="w-3 h-3 text-accent-500 fill-accent-500" />
                          {feature}
                        </div>
                      ))
                  ) : (
                      product.specs?.slice(0, 2).map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                          <Table className="w-3 h-3 text-brand-500" />
                          <span className="text-gray-400">{spec.label}:</span> {spec.value}
                        </div>
                      ))
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50">
                  <Button 
                    variant="white" 
                    size="sm"
                    fullWidth 
                    className="text-xs hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700"
                    onClick={onOpenModal}
                  >
                    Get Quote <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-brand-50 rounded-2xl p-8 border border-brand-100">
          <h3 className="text-xl font-bold text-brand-900 mb-2">Don't see what you're looking for?</h3>
          <p className="text-brand-700 mb-6">We offer custom manufacturing services for specific industrial requirements.</p>
          <Button variant="accent"  onClick={onOpenModal}>
            Request Custom Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;