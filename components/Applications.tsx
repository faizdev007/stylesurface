
import React from 'react';

const defaultItems = [
  { title: 'Furniture Manufacturing', img: 'https://picsum.photos/id/40/600/400' },
  { title: 'Interior Design & Decor', img: 'https://picsum.photos/id/50/600/400' },
  { title: 'Signage & Displays', img: 'https://picsum.photos/id/60/600/400' },
  { title: 'Industrial Fabrication', img: 'https://picsum.photos/id/70/600/400' },
  { title: 'Construction & Roofing', img: 'https://picsum.photos/id/80/600/400' },
  { title: 'Office Partitions', img: 'https://picsum.photos/id/90/600/400' },
];

interface ApplicationsProps {
  content?: any;
}

const Applications: React.FC<ApplicationsProps> = ({ content }) => {
  const title = content?.title || "Applications Across Industries";
  const subtitle = content?.subtitle || "From heavy industry to aesthetic interiors, our sheets deliver performance and beauty.";
  const items = content?.items || defaultItems;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">{title}</h2>
            <p className="text-gray-600 text-lg">{subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((app: any, idx: number) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl h-64 cursor-pointer">
              <img 
                src={app.img} 
                alt={app.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">{app.title}</h3>
                <div className="h-1 w-12 bg-brand-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Applications;
