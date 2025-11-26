
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Save, LogOut, Code, Layout, FileText, Copy, Trash2, Plus, Globe, Settings, Image as ImageIcon, Menu as MenuIcon, MapPin, Box, X, Check, Upload, Table, ChevronDown, ChevronUp, Users, RefreshCw, Zap, Database, Edit3, MessageCircle } from 'lucide-react';
import { CMS } from '../utils/cms';
import { CMSPage, MenuStructure, Product, MediaItem, Lead, GlobalSettings, PageSection } from '../types';
import { syncLeadToCRM } from '../utils/crm';

// --- Sub-component: Image Picker Modal ---
interface ImagePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ isOpen, onClose, onSelect }) => {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [newUrl, setNewUrl] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            CMS.getMedia().then(setMedia);
        }
    }, [isOpen]);

    const handleAddUrl = async () => {
        if (!newUrl) return;
        await CMS.saveMedia({
            id: crypto.randomUUID(),
            name: 'Imported URL',
            type: 'image',
            url: newUrl
        });
        const m = await CMS.getMedia();
        setMedia(m);
        setNewUrl('');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (file.size > 800000) { 
            alert("File too large. Please use images under 800KB for now, or use external URLs.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64 = event.target?.result as string;
            await CMS.saveMedia({
                id: crypto.randomUUID(),
                name: file.name,
                type: 'image',
                url: base64
            });
            const m = await CMS.getMedia();
            setMedia(m);
        };
        reader.readAsDataURL(file);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[80vh]">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h3 className="font-bold text-lg text-industrial-dark">Select Image</h3>
                    <button onClick={onClose}><X className="w-5 h-5 text-gray-500" /></button>
                </div>
                
                <div className="p-4 border-b bg-white space-y-3">
                    {/* Upload Buttons */}
                    <div className="flex gap-2">
                        <div className="flex-1 flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Paste image URL..." 
                                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                            />
                            <Button size="sm" onClick={handleAddUrl} variant="secondary">Add URL</Button>
                        </div>
                        <div className="w-px bg-gray-300 mx-2"></div>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                        <Button size="sm" onClick={() => fileInputRef.current?.click()} variant="primary">
                            <Upload className="w-4 h-4 mr-2" /> Upload
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {media.map(item => (
                            <div key={item.id} className="group relative aspect-square rounded-lg border-2 border-transparent hover:border-brand-500 overflow-hidden cursor-pointer shadow-sm bg-white" onClick={() => { onSelect(item.url); onClose(); }}>
                                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    {media.length === 0 && <p className="text-center text-gray-400 py-8">No images in library.</p>}
                </div>
            </div>
        </div>
    );
};


const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pages' | 'products' | 'menu' | 'media' | 'code' | 'leads' | 'integrations'>('pages');
  const [saved, setSaved] = useState(false);

  // Data State
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [menus, setMenus] = useState<MenuStructure>({ header: [], footer: [] });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  
  const [scripts, setScripts] = useState({ header: '', footer: '' });
  
  // Editor State
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Image Picker State
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerCallback, setPickerCallback] = useState<(url: string) => void>(() => {});

  // Ref for main media tab upload
  const mediaTabInputRef = useRef<HTMLInputElement>(null);

  // Initial Load
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setPages(await CMS.getPages());
    setProducts(await CMS.getProducts());
    setMedia(await CMS.getMedia());
    setMenus(await CMS.getMenus());
    setLeads(await CMS.getLeads());
    setSettings(await CMS.getSettings());
    setScripts({
        header: localStorage.getItem('site_header_code') || '',
        footer: localStorage.getItem('site_footer_code') || ''
    });
  };

  // Helper to open image picker for any field
  const openPicker = (callback: (url: string) => void) => {
      setPickerCallback(() => callback);
      setIsPickerOpen(true);
  };

  // --- Page Handlers ---
  const handleCreatePage = async () => {
    try {
        const newPage: CMSPage = {
          id: crypto.randomUUID(),
          title: 'New Page',
          slug: `/new-page-${Date.now()}`, // Unique slug based on timestamp
          template: 'content',
          isPublished: false,
          updatedAt: new Date().toISOString(),
          seo: { title: 'New Page', description: '', keywords: '' },
          sections: []
        };
        await CMS.savePage(newPage);
        await loadData();
        setEditingPage(newPage);
    } catch (err) {
        console.error(err);
        alert("Failed to create page. Please check console for details.");
    }
  };

  const handleDuplicate = async (id: string) => {
    await CMS.duplicatePage(id);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('Are you sure? This cannot be undone.')) {
        await CMS.deletePage(id);
        loadData();
        if(editingPage?.id === id) setEditingPage(null);
    }
  };

  const handleSavePage = async () => {
    if (editingPage) {
      await CMS.savePage(editingPage);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      loadData();
    }
  };

  // --- Section Editing Helper ---
  const updatePageSection = (sectionId: string, contentUpdate: any) => {
      if (!editingPage) return;
      const sections = editingPage.sections || [];
      const index = sections.findIndex(s => s.id === sectionId);
      
      let newSections = [...sections];
      
      if (index === -1) {
          // If section doesn't exist, create it. Type inferred from ID for now (simple logic)
          let type: any = 'text';
          if(sectionId === 'hero') type = 'hero';
          if(sectionId === 'products') type = 'product-grid';
          if(sectionId === 'applications') type = 'gallery';
          if(sectionId === 'testimonials') type = 'features';
          if(sectionId === 'faq') type = 'text';
          if(sectionId === 'location-content') type = 'location-content';
          if(sectionId === 'main-content') type = 'html';
          if(sectionId === 'product-hero') type = 'hero';
          if(sectionId === 'product-features') type = 'features';
          
          newSections.push({
              id: sectionId,
              type: type,
              content: contentUpdate
          });
      } else {
          newSections[index] = {
              ...newSections[index],
              content: { ...newSections[index].content, ...contentUpdate }
          };
      }
      setEditingPage({ ...editingPage, sections: newSections });
  };
  
  const getSectionContent = (id: string) => {
      return editingPage?.sections?.find(s => s.id === id)?.content || {};
  };

  // --- Product Handlers ---
  const handleCreateProduct = () => {
      const newProd: Product = {
          id: crypto.randomUUID(),
          name: 'New Product',
          category: 'acrylic',
          description: '',
          features: ['Feature 1', 'Feature 2'],
          specs: [],
          image: '',
          applications: []
      };
      setEditingProduct(newProd);
  };

  const handleSaveProduct = async () => {
      if (editingProduct) {
          const res = await CMS.saveProduct(editingProduct);
          if (res.error) {
              alert("Failed to save product. Check console or ensure ID format is UUID.");
          } else {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
              await loadData();
              setEditingProduct(null);
          }
      }
  };

  const handleDeleteProduct = async (id: string) => {
      if(window.confirm('Delete this product?')) {
          await CMS.deleteProduct(id);
          loadData();
      }
  };

  const handleAddSpec = () => {
      if (!editingProduct) return;
      const currentSpecs = editingProduct.specs || [];
      setEditingProduct({
          ...editingProduct,
          specs: [...currentSpecs, { label: '', value: '' }]
      });
  };

  const handleUpdateSpec = (idx: number, field: 'label' | 'value', value: string) => {
      if (!editingProduct || !editingProduct.specs) return;
      const updatedSpecs = [...editingProduct.specs];
      // Create a shallow copy of the item being edited to avoid direct mutation
      updatedSpecs[idx] = { ...updatedSpecs[idx], [field]: value };
      setEditingProduct({...editingProduct, specs: updatedSpecs});
  };

  const handleDeleteSpec = (idx: number) => {
      if (!editingProduct || !editingProduct.specs) return;
      const updatedSpecs = [...editingProduct.specs];
      updatedSpecs.splice(idx, 1);
      setEditingProduct({...editingProduct, specs: updatedSpecs});
  };

  const handleAddFeature = () => {
      if (!editingProduct) return;
      const current = editingProduct.features || [];
      setEditingProduct({ ...editingProduct, features: [...current, ''] });
  };
  
  const handleUpdateFeature = (idx: number, val: string) => {
      if (!editingProduct || !editingProduct.features) return;
      const updated = [...editingProduct.features];
      updated[idx] = val;
      setEditingProduct({ ...editingProduct, features: updated });
  };
  
  const handleDeleteFeature = (idx: number) => {
      if (!editingProduct || !editingProduct.features) return;
      const updated = [...editingProduct.features];
      updated.splice(idx, 1);
      setEditingProduct({ ...editingProduct, features: updated });
  };

  // --- Media Handlers ---
  const handleDeleteMedia = async (id: string) => {
      if(window.confirm('Delete this image?')) {
          await CMS.deleteMedia(id);
          loadData();
      }
  };
  
  const handleAddMediaDirect = async (url: string) => {
     if(!url) return;
     await CMS.saveMedia({
         id: crypto.randomUUID(),
         name: 'Imported Image',
         type: 'image',
         url: url
     });
     loadData();
  };

  const handleTabFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 800000) { 
        alert("File too large (>800KB). Use a smaller file or a URL.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        await CMS.saveMedia({
            id: crypto.randomUUID(),
            name: file.name,
            type: 'image',
            url: base64
        });
        loadData();
    };
    reader.readAsDataURL(file);
  };

  // --- Menu Handlers ---
  const handleMenuChange = (type: 'header' | 'footer', idx: number, field: string, value: string) => {
      const updated = { ...menus };
      (updated[type][idx] as any)[field] = value;
      setMenus(updated);
  };

  const handleAddMenuItem = (type: 'header' | 'footer') => {
      const updated = { ...menus };
      updated[type].push({ id: crypto.randomUUID(), label: 'New Link', url: '/' });
      setMenus(updated);
  };

  const handleDeleteMenuItem = (type: 'header' | 'footer', idx: number) => {
      const updated = { ...menus };
      updated[type].splice(idx, 1);
      setMenus(updated);
  };

  const handleSaveMenus = async () => {
      await CMS.saveMenus(menus);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
  };

  // --- Integration Handlers ---
  const handleSaveIntegrations = async () => {
      if (!settings) return;
      await CMS.saveSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
  };
  
  const handleSyncLead = async (lead: Lead) => {
      if(window.confirm("Push this lead to Configured CRM (Zapier)?")) {
          const res = await syncLeadToCRM(lead);
          if(res.success) alert("Synced Successfully");
          else alert("Sync Failed: " + (res.message || "Check console"));
      }
  };

  // --- Seed Data Handler ---
  const handleSeedData = async () => {
      if(window.confirm("This will push all the default Demo Data (Home Page Content, Products, Menus) into the Database. This is required to edit the Home Page. Continue?")) {
          const success = await CMS.seedInitialData();
          if (success) {
              alert("Demo Data Synced to Database! You can now edit the Home Page.");
              loadData();
          }
      }
  };

  // --- Script Handler ---
  const handleSaveScripts = () => {
      localStorage.setItem('site_header_code', scripts.header);
      localStorage.setItem('site_footer_code', scripts.footer);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col h-screen overflow-hidden">
      {/* Admin Nav */}
      <nav className="bg-industrial-dark shadow-md border-b border-gray-800 px-4 md:px-6 py-3 shrink-0">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 font-bold text-xl text-white">
            <div className="bg-brand-500 p-1.5 rounded text-white">
               <Settings className="w-5 h-5" />
            </div>
            <span>StylenCMS</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:block">
            <div className="p-4 space-y-1">
                <button onClick={() => setActiveTab('pages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'pages' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <FileText className="w-4 h-4" /> Pages
                </button>
                <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'products' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <Box className="w-4 h-4" /> Products
                </button>
                <button onClick={() => setActiveTab('menu')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'menu' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <MenuIcon className="w-4 h-4" /> Menus
                </button>
                <div className="h-px bg-gray-100 my-2"></div>
                <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'leads' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <Users className="w-4 h-4" /> Leads
                </button>
                <button onClick={() => setActiveTab('integrations')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'integrations' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <Zap className="w-4 h-4" /> CRM / API
                </button>
                <div className="h-px bg-gray-100 my-2"></div>
                <button onClick={() => setActiveTab('media')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'media' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <ImageIcon className="w-4 h-4" /> Media
                </button>
                <button onClick={() => setActiveTab('code')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'code' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <Code className="w-4 h-4" /> Scripts
                </button>
            </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8 relative">
            
            {/* --- PAGES TAB --- */}
            {activeTab === 'pages' && !editingPage && (
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-industrial-dark">Pages</h2>
                        <Button size="sm" onClick={handleCreatePage}><Plus className="w-4 h-4 mr-2"/> Add New</Button>
                    </div>
                    {pages.length === 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-center mb-6">
                             <p className="text-yellow-800 mb-4 font-semibold">No pages found in database.</p>
                             <Button onClick={handleSeedData} variant="accent">Initialize with Default Home Page</Button>
                        </div>
                    )}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-gray-500">Title</th>
                                    <th className="px-6 py-4 font-bold text-gray-500">Slug</th>
                                    <th className="px-6 py-4 font-bold text-gray-500">Template</th>
                                    <th className="px-6 py-4 font-bold text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pages.map(page => (
                                    <tr key={page.id} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{page.title}</td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{page.slug}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs uppercase font-bold">{page.template}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button onClick={() => setEditingPage(page)} className="text-brand-600 hover:text-brand-800 font-medium text-xs">Edit</button>
                                            <button onClick={() => handleDuplicate(page.id)} className="text-gray-400 hover:text-brand-600" title="Duplicate"><Copy className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(page.id)} className="text-gray-400 hover:text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- PAGE EDITOR --- */}
            {activeTab === 'pages' && editingPage && (
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
                    <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50 rounded-t-xl sticky top-0 bg-white z-20 shadow-sm">
                        <h3 className="font-bold text-lg">Editing: {editingPage.title}</h3>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" onClick={() => setEditingPage(null)}>Cancel</Button>
                            <Button variant="primary" size="sm" onClick={handleSavePage}>
                                {saved ? 'Saved!' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                    <div className="p-6 space-y-8 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Page Title</label>
                                <input type="text" value={editingPage.title} onChange={e => setEditingPage({...editingPage, title: e.target.value})} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL Slug</label>
                                <input type="text" value={editingPage.slug} onChange={e => setEditingPage({...editingPage, slug: e.target.value})} className="w-full border p-2 rounded font-mono text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Template</label>
                                <select value={editingPage.template} onChange={e => setEditingPage({...editingPage, template: e.target.value as any})} className="w-full border p-2 rounded">
                                    <option value="home">Home</option>
                                    <option value="product">Product</option>
                                    <option value="location">Location (State/City)</option>
                                    <option value="content">Generic Content</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 w-full hover:bg-gray-100">
                                    <input 
                                        type="checkbox" 
                                        checked={editingPage.isPublished}
                                        onChange={e => setEditingPage({...editingPage, isPublished: e.target.checked})}
                                        className="w-5 h-5 text-brand-600 rounded" 
                                    />
                                    <span className="font-bold text-gray-700">Published</span>
                                </label>
                            </div>
                        </div>

                        {/* --- CONTENT EDITOR (Visual) --- */}
                        {editingPage.template === 'home' && (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
                                <h4 className="font-bold text-industrial-dark flex items-center gap-2 border-b border-gray-200 pb-2">
                                    <Edit3 className="w-4 h-4"/> Page Content (Sections)
                                </h4>

                                {/* Hero Editor */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <h5 className="font-bold text-sm text-gray-600 mb-3 uppercase">Hero Section</h5>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Hero Title" className="w-full border p-2 rounded" 
                                            value={getSectionContent('hero').title || ''} 
                                            onChange={e => updatePageSection('hero', {title: e.target.value})}
                                        />
                                        <textarea placeholder="Hero Subtitle" className="w-full border p-2 rounded h-20"
                                            value={getSectionContent('hero').subtitle || ''} 
                                            onChange={e => updatePageSection('hero', {subtitle: e.target.value})}
                                        ></textarea>
                                        <div className="flex gap-4">
                                            <input type="text" placeholder="Button 1 Label" className="flex-1 border p-2 rounded" 
                                                value={getSectionContent('hero').btnPrimary || ''} 
                                                onChange={e => updatePageSection('hero', {btnPrimary: e.target.value})}
                                            />
                                            <input type="text" placeholder="Button 2 Label" className="flex-1 border p-2 rounded" 
                                                 value={getSectionContent('hero').btnSecondary || ''} 
                                                onChange={e => updatePageSection('hero', {btnSecondary: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Background Image</label>
                                            <div className="flex gap-2">
                                                <input type="text" placeholder="Image URL" className="flex-1 border p-2 rounded text-sm" disabled value={getSectionContent('hero').bgImage || ''} />
                                                <Button size="sm" variant="outline" onClick={() => openPicker(url => updatePageSection('hero', {bgImage: url}))}>Select</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Section Editor */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <h5 className="font-bold text-sm text-gray-600 mb-3 uppercase">Trust Badges Section</h5>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Section Title" className="w-full border p-2 rounded"
                                            value={getSectionContent('trust').title || ''}
                                            onChange={e => updatePageSection('trust', {title: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* About Editor */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <h5 className="font-bold text-sm text-gray-600 mb-3 uppercase">About Section</h5>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Title" className="w-full border p-2 rounded" 
                                            value={getSectionContent('about').title || ''} 
                                            onChange={e => updatePageSection('about', {title: e.target.value})}
                                        />
                                        <textarea placeholder="About Text" className="w-full border p-2 rounded h-24"
                                            value={getSectionContent('about').text || ''} 
                                            onChange={e => updatePageSection('about', {text: e.target.value})}
                                        ></textarea>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Section Image</label>
                                            <div className="flex gap-2">
                                                <input type="text" placeholder="Image URL" className="flex-1 border p-2 rounded text-sm" disabled value={getSectionContent('about').image || ''} />
                                                <Button size="sm" variant="outline" onClick={() => openPicker(url => updatePageSection('about', {image: url}))}>Select</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Products Title Editor */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <h5 className="font-bold text-sm text-gray-600 mb-3 uppercase">Products Section (Headings)</h5>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Section Title" className="w-full border p-2 rounded" 
                                            value={getSectionContent('products').title || ''} 
                                            onChange={e => updatePageSection('products', {title: e.target.value})}
                                        />
                                        <textarea placeholder="Section Subtitle" className="w-full border p-2 rounded"
                                            value={getSectionContent('products').subtitle || ''} 
                                            onChange={e => updatePageSection('products', {subtitle: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Applications Editor */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <h5 className="font-bold text-sm text-gray-600 mb-3 uppercase">Applications Section</h5>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Section Title" className="w-full border p-2 rounded"
                                            value={getSectionContent('applications').title || ''}
                                            onChange={e => updatePageSection('applications', {title: e.target.value})}
                                        />
                                        <textarea placeholder="Subtitle" className="w-full border p-2 rounded"
                                            value={getSectionContent('applications').subtitle || ''}
                                            onChange={e => updatePageSection('applications', {subtitle: e.target.value})}
                                        ></textarea>
                                        
                                        <label className="block text-xs font-bold text-gray-500 uppercase mt-4">Gallery Items</label>
                                        <div className="space-y-2">
                                            {(getSectionContent('applications').items || []).map((item: any, idx: number) => (
                                                <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded border border-gray-100">
                                                    <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0 cursor-pointer border border-gray-300" onClick={() => openPicker(url => {
                                                        const newItems = [...(getSectionContent('applications').items || [])];
                                                        newItems[idx] = { ...item, img: url };
                                                        updatePageSection('applications', { items: newItems });
                                                    })}>
                                                        {item.img && <img src={item.img} className="w-full h-full object-cover" />}
                                                    </div>
                                                    <input type="text" className="flex-1 border p-1 rounded text-sm" value={item.title} onChange={e => {
                                                        const newItems = [...(getSectionContent('applications').items || [])];
                                                        newItems[idx] = { ...item, title: e.target.value };
                                                        updatePageSection('applications', { items: newItems });
                                                    }} />
                                                    <button onClick={() => {
                                                        const newItems = [...(getSectionContent('applications').items || [])];
                                                        newItems.splice(idx, 1);
                                                        updatePageSection('applications', { items: newItems });
                                                    }} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                                                </div>
                                            ))}
                                            <Button size="sm" variant="outline" onClick={() => {
                                                const newItems = [...(getSectionContent('applications').items || []), { title: 'New Application', img: '' }];
                                                updatePageSection('applications', { items: newItems });
                                            }}>+ Add Item</Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Testimonials Editor */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <h5 className="font-bold text-sm text-gray-600 mb-3 uppercase">Testimonials Section</h5>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Title" className="w-full border p-2 rounded"
                                            value={getSectionContent('testimonials').title || ''}
                                            onChange={e => updatePageSection('testimonials', {title: e.target.value})}
                                        />
                                        <textarea placeholder="Subtitle" className="w-full border p-2 rounded"
                                            value={getSectionContent('testimonials').subtitle || ''}
                                            onChange={e => updatePageSection('testimonials', {subtitle: e.target.value})}
                                        ></textarea>
                                        
                                        <div className="mt-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Advanced Data (JSON)</label>
                                            <textarea 
                                                className="w-full h-32 border border-gray-300 rounded p-2 text-xs font-mono bg-gray-50"
                                                value={JSON.stringify(getSectionContent('testimonials').items || [], null, 2)}
                                                onChange={e => {
                                                    try {
                                                        const items = JSON.parse(e.target.value);
                                                        updatePageSection('testimonials', { items });
                                                    } catch(e) {}
                                                }}
                                            ></textarea>
                                            <p className="text-[10px] text-gray-400 mt-1">Edit JSON directly to update reviews list.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Social Proof Editor */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <h5 className="font-bold text-sm text-gray-600 mb-3 uppercase">Social Proof (Chat) Section</h5>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Title" className="w-full border p-2 rounded"
                                            value={getSectionContent('social-proof').title || ''}
                                            onChange={e => updatePageSection('social-proof', {title: e.target.value})}
                                        />
                                        <textarea placeholder="Subtitle" className="w-full border p-2 rounded"
                                            value={getSectionContent('social-proof').subtitle || ''}
                                            onChange={e => updatePageSection('social-proof', {subtitle: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* FAQ Editor */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <h5 className="font-bold text-sm text-gray-600 mb-3 uppercase">FAQ Section</h5>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Title" className="w-full border p-2 rounded"
                                            value={getSectionContent('faq').title || ''}
                                            onChange={e => updatePageSection('faq', {title: e.target.value})}
                                        />
                                        <div className="mt-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Advanced Data (JSON)</label>
                                            <textarea 
                                                className="w-full h-32 border border-gray-300 rounded p-2 text-xs font-mono bg-gray-50"
                                                value={JSON.stringify(getSectionContent('faq').items || [], null, 2)}
                                                onChange={e => {
                                                    try {
                                                        const items = JSON.parse(e.target.value);
                                                        updatePageSection('faq', { items });
                                                    } catch(e) {}
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                        
                        {/* --- GENERIC CONTENT EDITOR --- */}
                        {editingPage.template === 'content' && (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
                                <h4 className="font-bold text-industrial-dark flex items-center gap-2 border-b border-gray-200 pb-2">
                                    <FileText className="w-4 h-4"/> Page Body
                                </h4>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <label className="block text-xs font-bold text-gray-500 mb-1">HTML Content</label>
                                    <textarea 
                                        className="w-full h-64 border border-gray-300 rounded p-3 font-mono text-sm"
                                        value={getSectionContent('main-content').html || ''}
                                        onChange={e => updatePageSection('main-content', {html: e.target.value})}
                                        placeholder="<p>Write your content here...</p>"
                                    ></textarea>
                                    <p className="text-[10px] text-gray-400 mt-1">Supports basic HTML tags like p, h2, ul, strong, etc.</p>
                                </div>
                            </div>
                        )}

                        {/* --- LOCATION EDITOR --- */}
                        {editingPage.template === 'location' && (
                             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
                                <h4 className="font-bold text-industrial-dark flex items-center gap-2 border-b border-gray-200 pb-2">
                                    <MapPin className="w-4 h-4"/> Location Content
                                </h4>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">City Name</label>
                                        <input 
                                            type="text" className="w-full border p-2 rounded"
                                            value={getSectionContent('location-content').city || ''}
                                            onChange={e => updatePageSection('location-content', {city: e.target.value})}
                                            placeholder="e.g. Mumbai"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Highlight Text (Hero)</label>
                                        <textarea 
                                            className="w-full border p-2 rounded h-24"
                                            value={getSectionContent('location-content').highlight || ''}
                                            onChange={e => updatePageSection('location-content', {highlight: e.target.value})}
                                            placeholder="Premium Sheets supplied directly to your doorstep..."
                                        ></textarea>
                                    </div>
                                </div>
                             </div>
                        )}

                        {/* --- PRODUCT LANDING EDITOR --- */}
                        {editingPage.template === 'product' && (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
                                <h4 className="font-bold text-industrial-dark flex items-center gap-2 border-b border-gray-200 pb-2">
                                    <Box className="w-4 h-4"/> Landing Page Details
                                </h4>
                                
                                {/* Hero Config */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
                                    <h5 className="font-bold text-sm text-gray-600 uppercase">Hero Section</h5>
                                    <input type="text" placeholder="Custom Hero Title (Overrides Page Title)" className="w-full border p-2 rounded" 
                                        value={getSectionContent('product-hero').title || ''} 
                                        onChange={e => updatePageSection('product-hero', {title: e.target.value})}
                                    />
                                    <textarea placeholder="Hero Subtitle" className="w-full border p-2 rounded"
                                        value={getSectionContent('product-hero').subtitle || ''} 
                                        onChange={e => updatePageSection('product-hero', {subtitle: e.target.value})}
                                    ></textarea>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Background Image</label>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="Image URL" className="flex-1 border p-2 rounded text-sm" disabled value={getSectionContent('product-hero').bgImage || ''} />
                                            <Button size="sm" variant="outline" onClick={() => openPicker(url => updatePageSection('product-hero', {bgImage: url}))}>Select</Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Features Config */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
                                    <h5 className="font-bold text-sm text-gray-600 uppercase">Feature Details</h5>
                                    <input type="text" placeholder="Features Title" className="w-full border p-2 rounded" 
                                        value={getSectionContent('product-features').title || ''} 
                                        onChange={e => updatePageSection('product-features', {title: e.target.value})}
                                    />
                                    <textarea placeholder="Intro Text" className="w-full border p-2 rounded"
                                        value={getSectionContent('product-features').text || ''} 
                                        onChange={e => updatePageSection('product-features', {text: e.target.value})}
                                    ></textarea>
                                    
                                    <label className="block text-xs font-bold text-gray-500 uppercase mt-2">Bullet Points</label>
                                    <div className="space-y-2">
                                        {(getSectionContent('product-features').items || []).map((item: string, idx: number) => (
                                            <div key={idx} className="flex gap-2">
                                                <input type="text" className="flex-1 border p-1 rounded text-sm" value={item} onChange={e => {
                                                    const newItems = [...(getSectionContent('product-features').items || [])];
                                                    newItems[idx] = e.target.value;
                                                    updatePageSection('product-features', { items: newItems });
                                                }} />
                                                <button onClick={() => {
                                                    const newItems = [...(getSectionContent('product-features').items || [])];
                                                    newItems.splice(idx, 1);
                                                    updatePageSection('product-features', { items: newItems });
                                                }} className="text-red-400"><X className="w-4 h-4" /></button>
                                            </div>
                                        ))}
                                        <Button size="sm" variant="outline" onClick={() => {
                                            const newItems = [...(getSectionContent('product-features').items || []), 'New Feature'];
                                            updatePageSection('product-features', { items: newItems });
                                        }}>+ Add Bullet</Button>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* SEO Section */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h4 className="font-bold text-industrial-dark mb-4 flex items-center gap-2"><Globe className="w-4 h-4"/> SEO Settings</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Meta Title</label>
                                    <input type="text" value={editingPage.seo.title} onChange={e => setEditingPage({...editingPage, seo: {...editingPage.seo, title: e.target.value}})} className="w-full border p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Meta Description</label>
                                    <textarea value={editingPage.seo.description} onChange={e => setEditingPage({...editingPage, seo: {...editingPage.seo, description: e.target.value}})} className="w-full border p-2 rounded h-20" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Keywords</label>
                                    <input type="text" value={editingPage.seo.keywords} onChange={e => setEditingPage({...editingPage, seo: {...editingPage.seo, keywords: e.target.value}})} className="w-full border p-2 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- LEADS TAB --- */}
            {activeTab === 'leads' && (
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-industrial-dark">Leads & Enquiries</h2>
                        <Button size="sm" onClick={loadData} variant="outline"><RefreshCw className="w-4 h-4 mr-2"/> Refresh</Button>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-gray-500">Date</th>
                                    <th className="px-6 py-4 font-bold text-gray-500">Name</th>
                                    <th className="px-6 py-4 font-bold text-gray-500">Phone</th>
                                    <th className="px-6 py-4 font-bold text-gray-500">Type</th>
                                    <th className="px-6 py-4 font-bold text-gray-500">Requirement</th>
                                    <th className="px-6 py-4 font-bold text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leads.map(lead => (
                                    <tr key={lead.id} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 text-gray-500 text-xs">
                                          {new Date(lead.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{lead.full_name}</td>
                                        <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border border-gray-200">{lead.user_type}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={lead.requirement}>
                                            {lead.requirement}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleSyncLead(lead)} className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1 justify-end ml-auto">
                                                <Zap className="w-3 h-3" /> Sync CRM
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {leads.length === 0 && (
                                  <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">No leads found.</td>
                                  </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- INTEGRATIONS TAB --- */}
            {activeTab === 'integrations' && settings && (
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* CRM Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                        <div className="flex justify-between items-center border-b pb-4">
                           <h2 className="text-xl font-bold text-industrial-dark">API & CRM Integrations</h2>
                           <Button size="sm" onClick={handleSaveIntegrations}>{saved ? 'Saved!' : 'Save Config'}</Button>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2"><Zap className="w-4 h-4"/> Sync to Zoho, HubSpot, Wati</h4>
                            <p className="text-sm text-blue-700 mb-2">
                              To sync leads to multiple CRMs (Zoho, HubSpot, Wati), we use a <strong>Webhook</strong> approach. 
                              Create a 'Catch Hook' trigger in Zapier (or Make.com), and paste the URL below.
                            </p>
                            <a href="https://zapier.com/apps/webhook/integrations" target="_blank" rel="noreferrer" className="text-xs font-bold underline text-blue-800">Learn how to get a Webhook URL</a>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 mb-2 font-bold text-industrial-dark">
                                <input 
                                  type="checkbox" 
                                  checked={settings.integrations?.enableAutoSync || false}
                                  onChange={e => setSettings({
                                      ...settings,
                                      integrations: { ...settings.integrations, enableAutoSync: e.target.checked }
                                  })}
                                />
                                Enable Auto-Sync on Form Submission
                            </label>
                            <p className="text-xs text-gray-500 pl-6">Leads will be pushed to the webhook immediately after user submits form.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Webhook URL (Zapier/Make)</label>
                            <input 
                                type="text" 
                                placeholder="https://hooks.zapier.com/hooks/catch/..."
                                className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                                value={settings.integrations?.zapierWebhook || ''}
                                onChange={e => setSettings({
                                      ...settings,
                                      integrations: { ...settings.integrations, zapierWebhook: e.target.value }
                                })}
                            />
                        </div>
                    </div>
                    {/* Setup Tools Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                         <div className="flex justify-between items-center border-b pb-4">
                           <h2 className="text-xl font-bold text-industrial-dark flex items-center gap-2">
                               <Database className="w-5 h-5 text-gray-500" /> Database Tools
                           </h2>
                        </div>
                        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                            <h4 className="font-bold text-yellow-900 mb-2">Sync Demo Data</h4>
                            <p className="text-sm text-yellow-800 mb-4">
                                If your database is empty, the website shows Demo Content from the code. 
                                Click below to <strong>permanently save</strong> this demo content (Products, Menus, Home Page Content) into your database so you can edit it.
                            </p>
                            <Button size="sm" variant="secondary" onClick={handleSeedData}>
                                Sync Demo Data to Database
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- PRODUCTS TAB --- */}
            {activeTab === 'products' && !editingProduct && (
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-industrial-dark">Products Listing</h2>
                        <Button size="sm" onClick={handleCreateProduct}><Plus className="w-4 h-4 mr-2"/> Add Product</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(prod => (
                            <div key={prod.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative group">
                                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden border border-gray-100">
                                    {prod.image ? <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>}
                                </div>
                                <h3 className="font-bold text-industrial-dark">{prod.name}</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-xs uppercase font-bold text-brand-500 bg-brand-50 px-2 py-1 rounded">{prod.category}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingProduct(prod)} className="p-2 hover:bg-gray-100 rounded-full text-brand-600"><Settings className="w-4 h-4" /></button>
                                        <button onClick={() => handleDeleteProduct(prod.id)} className="p-2 hover:bg-red-50 rounded-full text-red-500"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && (
                            <div className="col-span-3 text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-400 mb-4">No products found in database.</p>
                                <Button size="sm" onClick={handleSeedData}>Load Demo Products</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- PRODUCT EDITOR --- */}
            {activeTab === 'products' && editingProduct && (
                 <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 mb-20">
                     <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50 rounded-t-xl sticky top-0 bg-white z-10">
                         <h3 className="font-bold text-lg">Product Details</h3>
                         <div className="flex gap-2">
                             <Button variant="secondary" size="sm" onClick={() => setEditingProduct(null)}>Cancel</Button>
                             <Button variant="primary" size="sm" onClick={handleSaveProduct}>{saved ? 'Saved!' : 'Save Product'}</Button>
                         </div>
                     </div>
                     <div className="p-6 space-y-6">
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
                                <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                                <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})} className="w-full border p-2 rounded">
                                    <option value="acrylic">Acrylic</option>
                                    <option value="ubuntu">Ubuntu</option>
                                    <option value="cork">Cork</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                             <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full border p-2 rounded h-24" />
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Image</label>
                             <div className="flex items-center gap-4">
                                 <div className="w-20 h-20 bg-gray-100 rounded border border-gray-200 overflow-hidden">
                                     {editingProduct.image && <img src={editingProduct.image} className="w-full h-full object-cover" />}
                                 </div>
                                 <Button size="sm" variant="outline" onClick={() => openPicker(url => setEditingProduct({...editingProduct, image: url}))}>Change Image</Button>
                             </div>
                         </div>
                         
                         {/* Features Editor */}
                         <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                             <h4 className="font-bold text-sm mb-2 flex justify-between">
                                 <span>Key Features (Bullet Points)</span>
                                 <button onClick={handleAddFeature} className="text-brand-600 text-xs hover:underline">+ Add Feature</button>
                             </h4>
                             <div className="space-y-2">
                                 {editingProduct.features?.map((feature, idx) => (
                                     <div key={idx} className="flex gap-2">
                                         <input 
                                            type="text" 
                                            value={feature} 
                                            onChange={e => handleUpdateFeature(idx, e.target.value)} 
                                            className="flex-1 border p-1 rounded text-sm" 
                                            placeholder="Feature (e.g. UV Resistant)"
                                         />
                                         <button onClick={() => handleDeleteFeature(idx)} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                                     </div>
                                 ))}
                             </div>
                         </div>

                         {/* Specs Editor */}
                         <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-sm mb-2 flex justify-between">
                                <span>Technical Specs</span>
                                <button onClick={handleAddSpec} className="text-brand-600 text-xs hover:underline">+ Add Spec</button>
                            </h4>
                            <div className="space-y-2">
                                {editingProduct.specs?.map((spec, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input type="text" placeholder="Label (e.g. Thickness)" value={spec.label} onChange={e => handleUpdateSpec(idx, 'label', e.target.value)} className="w-1/3 border p-1 rounded text-sm" />
                                        <input type="text" placeholder="Value (e.g. 2mm)" value={spec.value} onChange={e => handleUpdateSpec(idx, 'value', e.target.value)} className="flex-1 border p-1 rounded text-sm" />
                                        <button onClick={() => handleDeleteSpec(idx)} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                {(!editingProduct.specs || editingProduct.specs.length === 0) && <p className="text-xs text-gray-400 italic">No specs added.</p>}
                            </div>
                         </div>
                     </div>
                 </div>
            )}
             
            {/* --- MENUS TAB --- */}
            {activeTab === 'menu' && (
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-industrial-dark">Menu Management</h2>
                        <Button size="sm" onClick={handleSaveMenus}>{saved ? 'Saved!' : 'Save Menus'}</Button>
                    </div>

                    {/* Header Menu */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="font-bold text-lg">Header Navigation</h3>
                            <button onClick={() => handleAddMenuItem('header')} className="text-brand-600 text-sm font-bold flex items-center gap-1"><Plus className="w-4 h-4"/> Add Item</button>
                        </div>
                        <div className="space-y-3">
                            {menus.header.map((item, idx) => (
                                <div key={item.id} className="flex gap-3 items-center bg-gray-50 p-2 rounded border border-gray-200">
                                    <span className="text-gray-400 text-xs font-mono w-6">{idx+1}.</span>
                                    <input type="text" value={item.label} onChange={e => handleMenuChange('header', idx, 'label', e.target.value)} className="flex-1 border p-1.5 rounded text-sm" placeholder="Label" />
                                    <input type="text" value={item.url} onChange={e => handleMenuChange('header', idx, 'url', e.target.value)} className="flex-1 border p-1.5 rounded text-sm font-mono text-gray-600" placeholder="/url" />
                                    <button onClick={() => handleDeleteMenuItem('header', idx)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                                </div>
                            ))}
                            {menus.header.length === 0 && <p className="text-gray-400 text-sm italic">No items in header.</p>}
                        </div>
                    </div>

                    {/* Footer Menu */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="font-bold text-lg">Footer Links</h3>
                            <button onClick={() => handleAddMenuItem('footer')} className="text-brand-600 text-sm font-bold flex items-center gap-1"><Plus className="w-4 h-4"/> Add Item</button>
                        </div>
                        <div className="space-y-3">
                             {menus.footer.map((item, idx) => (
                                <div key={item.id} className="flex gap-3 items-center bg-gray-50 p-2 rounded border border-gray-200">
                                    <span className="text-gray-400 text-xs font-mono w-6">{idx+1}.</span>
                                    <input type="text" value={item.label} onChange={e => handleMenuChange('footer', idx, 'label', e.target.value)} className="flex-1 border p-1.5 rounded text-sm" placeholder="Label" />
                                    <input type="text" value={item.url} onChange={e => handleMenuChange('footer', idx, 'url', e.target.value)} className="flex-1 border p-1.5 rounded text-sm font-mono text-gray-600" placeholder="/url" />
                                    <button onClick={() => handleDeleteMenuItem('footer', idx)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* --- MEDIA TAB --- */}
             {activeTab === 'media' && (
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-industrial-dark">Media Library</h2>
                    </div>
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex gap-4 items-center">
                        <input type="text" placeholder="Paste Image URL..." className="flex-1 border border-gray-300 rounded px-3 py-2" onKeyDown={(e) => { if (e.key === 'Enter') handleAddMediaDirect((e.target as HTMLInputElement).value) }} />
                         <div className="h-8 w-px bg-gray-300 mx-2"></div>
                         <input type="file" ref={mediaTabInputRef} className="hidden" accept="image/*" onChange={handleTabFileUpload} />
                        <Button size="sm" onClick={() => mediaTabInputRef.current?.click()} variant="primary"><Upload className="w-4 h-4 mr-2" /> Upload</Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {media.map(item => (
                            <div key={item.id} className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden aspect-square">
                                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <button onClick={() => handleDeleteMedia(item.id)} className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                        {media.length === 0 && <p className="col-span-5 text-center text-gray-400">No images found.</p>}
                    </div>
                </div>
            )}

            {/* --- CODE INJECTION TAB --- */}
            {activeTab === 'code' && (
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-industrial-dark">Custom Scripts</h2>
                        <Button size="sm" onClick={handleSaveScripts}>{saved ? 'Saved!' : 'Save Scripts'}</Button>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <label className="block font-bold text-gray-700 mb-2">Header Scripts {`(<head>)`}</label>
                            <p className="text-xs text-gray-500 mb-2">Good for Google Analytics, verify tags, etc.</p>
                            <textarea 
                                className="w-full h-40 border border-gray-300 rounded-lg p-3 font-mono text-xs bg-gray-900 text-green-400"
                                value={scripts.header}
                                onChange={e => setScripts({...scripts, header: e.target.value})}
                                placeholder="<!-- Paste script tags here -->"
                            ></textarea>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <label className="block font-bold text-gray-700 mb-2">Footer Scripts {`(</body>)`}</label>
                            <p className="text-xs text-gray-500 mb-2">Good for Chat widgets (Tawk.to, WhatsApp buttons), Pixels.</p>
                            <textarea 
                                className="w-full h-40 border border-gray-300 rounded-lg p-3 font-mono text-xs bg-gray-900 text-green-400"
                                value={scripts.footer}
                                onChange={e => setScripts({...scripts, footer: e.target.value})}
                                placeholder="<!-- Paste script tags here -->"
                            ></textarea>
                        </div>
                    </div>
                </div>
            )}

        </main>

        <ImagePicker 
            isOpen={isPickerOpen} 
            onClose={() => setIsPickerOpen(false)} 
            onSelect={pickerCallback} 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
