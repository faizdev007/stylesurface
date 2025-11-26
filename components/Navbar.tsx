import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Sheet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from './ui/Button';
import { CMS } from '../utils/cms';
import { MenuItem, GlobalSettings } from '../types';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<GlobalSettings | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load Menu & Settings
    const loadData = async () => {
        const menuData = await CMS.getMenus();
        setMenuItems(menuData.header);
        const settingsData = await CMS.getSettings();
        setSettings(settingsData);
    };
    loadData();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path; 
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || location.pathname !== '/' ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-brand-800 to-brand-600 p-2 rounded-lg shadow-lg">
              <Sheet className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl md:text-2xl font-extrabold tracking-tight ${isScrolled || location.pathname !== '/' ? 'text-industrial-dark' : 'text-industrial-dark'}`}>
              {settings?.siteName.split('Stylen')[0] || 'Stylen'}<span className="text-brand-600">{settings?.siteName.includes('Surface') ? 'Surface' : ''}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((link) => (
              <Link 
                key={link.id} 
                to={link.url} 
                target={link.target}
                className={`font-medium text-sm transition-colors relative group ${isActive(link.url) ? 'text-brand-700 font-bold' : 'text-industrial-gray hover:text-brand-700'}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-600 transition-all ${isActive(link.url) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <a href={`tel:${settings?.phone}`} className="flex items-center gap-2 text-industrial-dark hover:text-brand-700 font-bold transition-colors">
              <div className="bg-brand-50 p-2 rounded-full">
                <Phone className="w-4 h-4 text-brand-600" />
              </div>
              <span>{settings?.phone}</span>
            </a>
            <Button variant="accent" size="md" onClick={onOpenModal} className="shadow-accent-500/20">
              Get Bulk Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-industrial-dark p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl p-4 flex flex-col gap-2 animate-fade-in-up">
            {menuItems.map((link) => (
              <Link 
                key={link.id} 
                to={link.url}
                className={`font-medium p-3 rounded-lg transition-colors ${isActive(link.url) ? 'bg-brand-50 text-brand-700' : 'text-industrial-dark hover:bg-gray-50'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2"></div>
            <Button fullWidth variant="accent" onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenModal();
            }}>
              Get Bulk Quote
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;