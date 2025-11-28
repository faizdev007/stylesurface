import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/ui/Modal';
import LeadForm from './components/ui/LeadForm';
import CodeInjector from './components/CodeInjector';
import DynamicPage from './components/DynamicPage';
import { CMS } from './utils/cms';
import { CMSPage } from './types';
import { Loader2 } from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ThankYou from './pages/ThankYou';

// Route Wrapper for Dynamic Content
const PageRouter = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const { slug } = useParams();
  // If slug is undefined, we are at root '/'
  const isRoot = !slug;
  const fullSlug = isRoot ? '/' : `/${slug}`;
  
  const [pageData, setPageData] = useState<CMSPage | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      try {
          const data = await CMS.getPageBySlug(fullSlug);
          setPageData(data);
      } catch (e) {
          console.error(e);
          setPageData(null);
      } finally {
          setLoading(false);
      }
    };
    loadPage();
  }, [fullSlug]);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
          </div>
      );
  }

  // Fallback Logic: If no dynamic page is found in CMS
  if (!pageData) {
    // If we are at root ('/'), ALWAYS render the hardcoded Home component
    if (isRoot || fullSlug === '/') {
        return <Home onOpenModal={onOpenModal} />;
    }
    
    return (
      <div className="pt-32 pb-20 text-center container mx-auto">
        <h1 className="text-4xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-gray-500">Page not found</p>
      </div>
    );
  }

  return <DynamicPage page={pageData} onOpenModal={onOpenModal} />;
};

// Layout Component to wrap Navbar and Footer
const Layout = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <>
    <Navbar onOpenModal={onOpenModal} />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer onOpenModal={onOpenModal} />
  </>
);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <CodeInjector />
      <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
        <Routes>
          {/* Admin Routes (No Navbar/Footer) */}
          <Route path="/stylesheet/admin" element={<AdminLogin />} />
          <Route path="/stylesheet/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Thank You Page (No Navbar/Footer) */}
          <Route path="/thank-you" element={<ThankYou />} />
          
          {/* Public Routes Wrapped in Layout */}
          <Route element={<Layout onOpenModal={openModal} />}>
              {/* Specific Static Routes */}
              <Route path="/about" element={<About onOpenModal={openModal} />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Home Route */}
              <Route path="/" element={<PageRouter onOpenModal={openModal} />} />
              
              {/* Dynamic Catch-all for other pages (Must be last) */}
              <Route path="/:slug" element={<PageRouter onOpenModal={openModal} />} />
          </Route>
        </Routes>

        <Modal isOpen={isModalOpen} onClose={closeModal} title="Get Your Bulk Quote">
          <LeadForm onSuccess={closeModal} />
        </Modal>
      </div>
    </Router>
  );
}

export default App;