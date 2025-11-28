import React, { useState, useEffect } from 'react';
import { Sheet, Facebook, Twitter, Linkedin, Instagram, Download, Phone, Mail, MapPin, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { CMS } from '../utils/cms';
import { GlobalSettings, MenuItem } from '../types';

interface FooterProps {
  onOpenModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
      const loadData = async () => {
          const s = await CMS.getSettings();
          const m = await CMS.getMenus();
          setSettings(s);
          setMenuItems(m.footer);
      };
      loadData();
  }, []);

  if (!settings) return null; // Or a loader

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <img src="/logo.webp" alt="Style Surface Logo" width={150} height={40} className="object-contain" />
            </div>
            <p className="text-gray-400 leading-relaxed">
              India's leading manufacturer and supplier of high-quality Acrylic, Ubuntu, and Cork sheets for industrial and commercial use.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="bg-gray-800 p-3 rounded-full hover:bg-brand-600 hover:text-white text-gray-400 transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              {menuItems.map((link) => (
                <li key={link.id}><Link to={link.url} className="hover:text-yellow-500 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                  {link.label}
                </Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-xs text-gray-500 uppercase mb-1 font-bold">Head Office</span>
                  {settings.address}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-xs text-gray-500 uppercase mb-1 font-bold">Phone</span>
                  {settings.phone}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-xs text-gray-500 uppercase mb-1 font-bold">Email</span>
                  {settings.email}
                </div>
              </li>
            </ul>
          </div>

          {/* Download */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Downloads</h4>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <p className="text-gray-400 mb-4 text-sm">Get our comprehensive product catalog with technical specifications.</p>
              <Button variant="accent" fullWidth className="flex items-center justify-center gap-2 text-sm" onClick={onOpenModal}>
                <Download className="w-4 h-4" /> Download Catalog
              </Button>
            </div>
            <div className="mt-6 text-sm text-gray-500">
               <span className="block font-bold text-gray-400">GST No.</span> 07ABCDE1234F1Z5
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            {/* <Link to="/stylesheet/admin" className="hover:text-brand-500 transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" /> Admin
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;