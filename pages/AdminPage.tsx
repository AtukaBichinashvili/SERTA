import React, { useState, useRef, useEffect } from 'react';
import { useApp, Slide, MenuItem } from '../store.tsx';
import { Product, LocalizedString, SizePrice } from '../types.ts';
import { 
  Trash2, Copy, Edit3, Plus, Save, X, Image as ImageIcon, 
  Layout as LayoutIcon, ShoppingBag, ArrowLeft, Lock, Upload, 
  CheckCircle, Database, AlertCircle, RefreshCw, Star, Info, RotateCcw, Ruler,
  MoveUp, MoveDown, Layers, Bed, Cloud, Wind, Menu, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { products, setProducts, settings, updateSettings, lang, dbStatus, fetchData } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'status'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadingSlideIndex, setUploadingSlideIndex] = useState<number | null>(null);
  
  const [localSettings, setLocalSettings] = useState(settings);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const slideImageInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const triggerSuccess = () => {
    setShowSuccess(true);
    setSaveError(null);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bichina123') setIsLoggedIn(true);
    else alert('არასწორი პაროლი!');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLocalSettings({ ...localSettings, logoUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      const reader = new FileReader();
      reader.onloadend = () => setEditingProduct({ ...editingProduct, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSlideImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadingSlideIndex !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSlides = [...localSettings.slides];
        newSlides[uploadingSlideIndex].image = reader.result as string;
        setLocalSettings({ ...localSettings, slides: newSlides });
        setUploadingSlideIndex(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveError(null);
    const success = await updateSettings(localSettings);
    setIsSaving(false);
    if (success) triggerSuccess();
    else setSaveError("Failed to save settings. Check console for details.");
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      image: 'https://images.unsplash.com/photo-1505693333510-5d93f4ef4c7d?auto=format&fit=crop&q=80&w=2070',
      title: { ka: 'ახალი სლაიდი', en: 'New Slide' },
      subtitle: { ka: 'აღწერა...', en: 'Description...' }
    };
    setLocalSettings({ ...localSettings, slides: [...localSettings.slides, newSlide] });
  };

  const handleRemoveSlide = (index: number) => {
    setLocalSettings({ ...localSettings, slides: localSettings.slides.filter((_, i) => i !== index) });
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...localSettings.slides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
    setLocalSettings({ ...localSettings, slides: newSlides });
  };

  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      name: { ka: 'ახალი კატეგორია', en: 'New Category' },
      iconName: 'Layers',
      path: '/shop'
    };
    setLocalSettings({ ...localSettings, menuItems: [...localSettings.menuItems, newItem] });
  };

  const handleRemoveMenuItem = (index: number) => {
    setLocalSettings({ ...localSettings, menuItems: localSettings.menuItems.filter((_, i) => i !== index) });
  };

  const handleMoveMenuItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...localSettings.menuItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setLocalSettings({ ...localSettings, menuItems: newItems });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    setSaveError(null);
    
    const index = products.findIndex(p => p.id === editingProduct.id);
    const newProducts = index > -1 ? products.map((p, i) => i === index ? editingProduct : p) : [...products, editingProduct];
    
    const success = await setProducts(newProducts);
    setIsSaving(false);
    if (success) {
      setEditingProduct(null);
      triggerSuccess();
    } else {
      setSaveError("Failed to save product. Database error.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('დარწმუნებული ხართ?')) {
      setIsSaving(true);
      const success = await setProducts(products.filter(p => p.id !== id));
      setIsSaving(false);
      if (success) triggerSuccess();
      else setSaveError("Delete failed.");
    }
  };

  const handleDuplicateProduct = async (product: Product) => {
    setIsSaving(true);
    const newProduct = { ...product, id: `prod-${Date.now()}` };
    const success = await setProducts([...products, newProduct]);
    setIsSaving(false);
    if (success) triggerSuccess();
    else setSaveError("Duplicate failed.");
  };

  const handleAddFeature = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: [...editingProduct.features, { ka: '', en: '' }]
    });
  };

  const handleUpdateFeature = (index: number, key: keyof LocalizedString, value: string) => {
    if (!editingProduct) return;
    const newFeatures = [...editingProduct.features];
    newFeatures[index] = { ...newFeatures[index], [key]: value };
    setEditingProduct({ ...editingProduct, features: newFeatures });
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: editingProduct.features.filter((_, i) => i !== index)
    });
  };

  const handleAddSizePrice = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      sizePrices: [...editingProduct.sizePrices, { size: 0, price: 0 }]
    });
  };

  const handleUpdateSizePrice = (index: number, key: keyof SizePrice, value: number) => {
    if (!editingProduct) return;
    const newSizePrices = [...editingProduct.sizePrices];
    newSizePrices[index] = { ...newSizePrices[index], [key]: value };
    setEditingProduct({ ...editingProduct, sizePrices: newSizePrices });
  };

  const handleRemoveSizePrice = (index: number) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      sizePrices: editingProduct.sizePrices.filter((_, i) => i !== index)
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
          <div className="w-20 h-20 bg-serta-navy text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"><Lock size={40} /></div>
          <h1 className="text-2xl font-black text-serta-navy text-center mb-8 uppercase tracking-tight">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              autoFocus
              type="password" 
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-4 ring-serta-yellow/20 outline-none transition-all font-bold"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-serta-navy text-white py-4 rounded-2xl font-black text-lg hover:shadow-2xl transition-all">Log In</button>
            <button type="button" onClick={() => navigate('/')} className="w-full text-gray-400 font-bold text-sm">Back to Home</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {showSuccess && (
        <div className="fixed top-8 right-8 z-[200] bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black animate-in slide-in-from-right">
          <CheckCircle size={24} /> Saved Successfully!
        </div>
      )}

      {saveError && (
        <div className="fixed top-8 right-8 z-[200] bg-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black animate-in slide-in-from-right">
          <AlertCircle size={24} /> {saveError}
        </div>
      )}

      <input 
        ref={slideImageInputRef} 
        type="file" 
        className="hidden" 
        accept="image/*" 
        onChange={handleSlideImageUpload} 
      />

      <div className="bg-serta-navy text-white py-16 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white font-black uppercase text-xs tracking-widest transition-all">
               <ArrowLeft size={16} /> Exit Admin
            </button>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl">
              <Database size={16} className={dbStatus === 'connected' ? 'text-green-400' : 'text-red-400'} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                DB Status: {dbStatus === 'connected' ? 'Online' : 'Offline/Error'}
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Admin Control Center</h1>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setActiveTab('products')} className={`px-8 py-3 rounded-[18px] font-black transition-all ${activeTab === 'products' ? 'bg-serta-yellow text-serta-navy' : 'bg-white/10 hover:bg-white/20'}`}>
              <ShoppingBag size={20} className="inline mr-2" /> Products
            </button>
            <button onClick={() => setActiveTab('settings')} className={`px-8 py-3 rounded-[18px] font-black transition-all ${activeTab === 'settings' ? 'bg-serta-yellow text-serta-navy' : 'bg-white/10 hover:bg-white/20'}`}>
              <LayoutIcon size={20} className="inline mr-2" /> Settings
            </button>
            <button onClick={() => setActiveTab('status')} className={`px-8 py-3 rounded-[18px] font-black transition-all ${activeTab === 'status' ? 'bg-serta-yellow text-serta-navy' : 'bg-white/10 hover:bg-white/20'}`}>
              <Database size={20} className="inline mr-2" /> Connection
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {activeTab === 'products' && (
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-10 border-b flex justify-between items-center bg-gray-50/30">
              <h2 className="text-2xl font-black text-serta-navy">Inventory</h2>
              <button 
                onClick={() => setEditingProduct({
                  id: 'prod-' + Date.now(),
                  name: { ka: '', en: '' }, sizePrices: [{size: 90, price: 0}],
                  type: { ka: 'მატრასი', en: 'Mattress' }, firmness: 5, height: 25,
                  warranty: 10, category: 'Hybrid', image: '', 
                  description: { ka: '', en: '' }, features: [], careInstructions: { ka: '', en: '' }, isBestSeller: false
                })}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg"
              >
                <Plus size={20} className="inline mr-2" /> Add New
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] uppercase font-black tracking-widest text-gray-400">
                <tr><th className="p-8">Product</th><th className="p-8">Category</th><th className="p-8">Base Price</th><th className="p-8 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <img src={p.image} className="w-12 h-10 rounded-lg object-cover bg-gray-100" />
                        <span className="font-black text-serta-navy flex items-center gap-2">
                          {p.name[lang]}
                          {p.isBestSeller && <Star size={14} className="text-serta-yellow fill-current" />}
                        </span>
                      </div>
                    </td>
                    <td className="p-8 font-bold text-gray-400 text-xs">{p.category}</td>
                    <td className="p-8 font-black text-lg">
                      {p.sizePrices && p.sizePrices.length > 0 ? Math.min(...p.sizePrices.map(sp => sp.price)) : 0} ₾ <span className="text-[10px] text-gray-400">MIN</span>
                    </td>
                    <td className="p-8">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingProduct(p)} className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Edit3 size={18} /></button>
                        <button onClick={() => handleDuplicateProduct(p)} className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Copy size={18} /></button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="p-2 bg-red-50 text-red-600 rounded-lg"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-12">
            <div className="bg-white rounded-[40px] shadow-2xl p-12 border border-gray-100">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black text-serta-navy uppercase tracking-tight">Main Configuration</h2>
                <button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving} 
                  className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-green-700 shadow-xl disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  {isSaving ? "Saving..." : "Save Settings"}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-gray-400 px-1">Logo</label>
                  <div className="flex items-center gap-8 bg-gray-50 p-6 rounded-3xl">
                    <div className="w-32 h-20 bg-white border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden">
                      {localSettings.logoUrl ? <img src={localSettings.logoUrl} className="max-h-full p-2" /> : <ImageIcon className="text-gray-200" />}
                    </div>
                    <button onClick={() => logoInputRef.current?.click()} className="bg-serta-navy text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest">Upload Logo</button>
                    <input ref={logoInputRef} type="file" className="hidden" onChange={handleLogoUpload} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 px-1">Or Paste Logo URL</label>
                    <input type="text" className="w-full border p-3 rounded-xl text-xs font-bold" value={localSettings.logoUrl} onChange={e => setLocalSettings({...localSettings, logoUrl: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-gray-400">Contact Phone</label>
                    <input className="w-full border-2 p-4 rounded-2xl font-bold" value={localSettings.contactPhone} onChange={e => setLocalSettings({...localSettings, contactPhone: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-gray-400">Contact Email</label>
                    <input className="w-full border-2 p-4 rounded-2xl font-bold" value={localSettings.contactEmail} onChange={e => setLocalSettings({...localSettings, contactEmail: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Editor */}
            <div className="bg-white rounded-[40px] shadow-2xl p-12 border border-gray-100">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black text-serta-navy uppercase tracking-tight flex items-center gap-3"><ImageIcon className="text-blue-600" /> Hero Slider Editor</h2>
                <button onClick={handleAddSlide} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 shadow-lg text-xs uppercase tracking-widest"><Plus size={16} className="inline mr-2" /> Add Slide</button>
              </div>
              <div className="space-y-8">
                {localSettings.slides.map((slide, idx) => (
                  <div key={idx} className="bg-gray-50/50 border border-gray-100 p-8 rounded-[32px] group relative">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                      <button onClick={() => handleMoveSlide(idx, 'up')} className="p-2 bg-white shadow-md rounded-full hover:bg-serta-yellow transition-all"><MoveUp size={16} /></button>
                      <button onClick={() => handleMoveSlide(idx, 'down')} className="p-2 bg-white shadow-md rounded-full hover:bg-serta-yellow transition-all"><MoveDown size={16} /></button>
                    </div>
                    <button onClick={() => handleRemoveSlide(idx)} className="absolute -right-4 -top-4 p-3 bg-red-500 text-white shadow-lg rounded-full opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={20} /></button>
                    <div className="grid lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-4">
                        <label className="text-[10px] font-black uppercase text-gray-400 mb-3 block">Slide Media</label>
                        <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-4 border-2 border-dashed relative group/media">
                          <img src={slide.image} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-all flex items-center justify-center">
                            <button 
                              onClick={() => {
                                setUploadingSlideIndex(idx);
                                slideImageInputRef.current?.click();
                              }} 
                              className="bg-white text-serta-navy px-4 py-2 rounded-xl font-black text-[10px] uppercase shadow-xl"
                            >
                              <Upload size={14} className="inline mr-1" /> Change Image
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase text-gray-400 px-1">Or Paste URL</label>
                          <input className="w-full text-xs font-mono p-3 border rounded-xl" value={slide.image} onChange={e => {
                            const newSlides = [...localSettings.slides];
                            newSlides[idx].image = e.target.value;
                            setLocalSettings({ ...localSettings, slides: newSlides });
                          }} />
                        </div>
                      </div>
                      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-gray-400">Title (KA / EN)</label>
                          <input className="w-full border p-3 rounded-xl font-bold text-sm" placeholder="KA" value={slide.title.ka} onChange={e => {
                            const newSlides = [...localSettings.slides];
                            newSlides[idx].title.ka = e.target.value;
                            setLocalSettings({ ...localSettings, slides: newSlides });
                          }} />
                          <input className="w-full border p-3 rounded-xl font-bold text-sm" placeholder="EN" value={slide.title.en} onChange={e => {
                            const newSlides = [...localSettings.slides];
                            newSlides[idx].title.en = e.target.value;
                            setLocalSettings({ ...localSettings, slides: newSlides });
                          }} />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-gray-400">Subtitle (KA / EN)</label>
                          <textarea className="w-full border p-3 rounded-xl font-bold text-sm min-h-[90px]" placeholder="KA" value={slide.subtitle.ka} onChange={e => {
                            const newSlides = [...localSettings.slides];
                            newSlides[idx].subtitle.ka = e.target.value;
                            setLocalSettings({ ...localSettings, slides: newSlides });
                          }} />
                          <textarea className="w-full border p-3 rounded-xl font-bold text-sm min-h-[90px]" placeholder="EN" value={slide.subtitle.en} onChange={e => {
                            const newSlides = [...localSettings.slides];
                            newSlides[idx].subtitle.en = e.target.value;
                            setLocalSettings({ ...localSettings, slides: newSlides });
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu Editor */}
            <div className="bg-white rounded-[40px] shadow-2xl p-12 border border-gray-100">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black text-serta-navy uppercase tracking-tight flex items-center gap-3"><Menu className="text-blue-600" /> Vertical Menu Editor</h2>
                <button onClick={handleAddMenuItem} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 shadow-lg text-xs uppercase tracking-widest"><Plus size={16} className="inline mr-2" /> Add Item</button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {localSettings.menuItems.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border p-6 rounded-[28px] relative group hover:shadow-lg transition-all">
                    <button onClick={() => handleRemoveMenuItem(idx)} className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                    <div className="flex justify-between mb-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleMoveMenuItem(idx, 'up')} className="p-1.5 bg-white border rounded-lg hover:bg-serta-yellow"><MoveUp size={14} /></button>
                        <button onClick={() => handleMoveMenuItem(idx, 'down')} className="p-1.5 bg-white border rounded-lg hover:bg-serta-yellow"><MoveDown size={14} /></button>
                      </div>
                      <select className="text-[10px] font-black uppercase bg-white border p-1 rounded-lg" value={item.iconName} onChange={e => {
                        const newItems = [...localSettings.menuItems];
                        newItems[idx].iconName = e.target.value;
                        setLocalSettings({ ...localSettings, menuItems: newItems });
                      }}>
                        <option value="Layers">Layers</option>
                        <option value="Bed">Bed</option>
                        <option value="Cloud">Cloud</option>
                        <option value="Wind">Wind</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <input className="w-full border p-3 rounded-xl font-black text-xs" placeholder="Name KA" value={item.name.ka} onChange={e => {
                        const newItems = [...localSettings.menuItems];
                        newItems[idx].name.ka = e.target.value;
                        setLocalSettings({ ...localSettings, menuItems: newItems });
                      }} />
                      <input className="w-full border p-3 rounded-xl font-black text-xs" placeholder="Name EN" value={item.name.en} onChange={e => {
                        const newItems = [...localSettings.menuItems];
                        newItems[idx].name.en = e.target.value;
                        setLocalSettings({ ...localSettings, menuItems: newItems });
                      }} />
                      <input className="w-full border p-3 rounded-xl font-mono text-[10px]" placeholder="Path" value={item.path} onChange={e => {
                        const newItems = [...localSettings.menuItems];
                        newItems[idx].path = e.target.value;
                        setLocalSettings({ ...localSettings, menuItems: newItems });
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="bg-white rounded-[40px] shadow-2xl p-12 border border-gray-100">
            <h2 className="text-2xl font-black text-serta-navy mb-8 uppercase tracking-tight">Database Connection Checker</h2>
            <div className={`p-8 rounded-3xl flex items-center gap-6 ${dbStatus === 'connected' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${dbStatus === 'connected' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {dbStatus === 'connected' ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
              </div>
              <div>
                <h3 className={`text-xl font-black ${dbStatus === 'connected' ? 'text-green-700' : 'text-red-700'}`}>{dbStatus === 'connected' ? 'კავშირი დამყარებულია!' : 'კავშირის შეცდომა'}</h3>
                <p className="text-sm font-medium opacity-70">{dbStatus === 'connected' ? 'თქვენი საიტი წარმატებით უკავშირდება Supabase-ს.' : 'ბრაუზერი ბლოკავს კავშირს (CORS) ან მონაცემები არასწორია.'}</p>
              </div>
              <button onClick={fetchData} className="ml-auto flex items-center gap-2 bg-serta-navy text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest"><RefreshCw size={14} /> Retry</button>
            </div>
          </div>
        )}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-[100] bg-serta-navy/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[40px] p-8 space-y-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-black text-serta-navy uppercase tracking-tight flex items-center gap-3"><Edit3 className="text-blue-600" /> Product Editor</h2>
              <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition-all"><X size={24} /></button>
            </div>
            
            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-5 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><ImageIcon size={14} /> Product Media</h3>
                  <div className="aspect-[4/3] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative group">
                    {editingProduct.image ? (
                      <><img src={editingProduct.image} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"><button onClick={() => productImageInputRef.current?.click()} className="bg-white text-serta-navy px-6 py-2 rounded-xl font-black text-xs uppercase">Change Photo</button></div></>
                    ) : (
                      <div className="text-center p-8"><Upload size={32} className="mx-auto mb-4 text-gray-300" /><button onClick={() => productImageInputRef.current?.click()} className="text-blue-600 font-black text-sm hover:underline">Click to Upload</button></div>
                    )}
                    <input ref={productImageInputRef} type="file" className="hidden" accept="image/*" onChange={handleProductImageUpload} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 px-1">Or Paste Image URL</label>
                    <input type="text" className="w-full border p-3 rounded-xl text-xs font-bold" value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-4 bg-gray-50/50 p-6 rounded-3xl">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><Ruler size={14} /> Size & Pricing Management</h3>
                  <div className="space-y-3">
                    {editingProduct.sizePrices.map((sp, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input type="number" placeholder="Size (cm)" className="w-20 border p-2 rounded-lg font-black text-xs" value={sp.size} onChange={e => handleUpdateSizePrice(idx, 'size', Number(e.target.value))} />
                        <input type="number" placeholder="Price (₾)" className="flex-1 border p-2 rounded-lg font-black text-xs" value={sp.price} onChange={e => handleUpdateSizePrice(idx, 'price', Number(e.target.value))} />
                        <button onClick={() => handleRemoveSizePrice(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                      </div>
                    ))}
                    <button onClick={handleAddSizePrice} className="w-full py-2 bg-blue-600/10 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest"><Plus size={14} className="inline mr-1" /> Add Size Option</button>
                  </div>
                </div>

                <div className="space-y-4 bg-gray-50/50 p-6 rounded-3xl">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><Info size={14} /> Taxonomy</h3>
                  <div className="grid gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 px-1">Category</label>
                      <select className="w-full border p-3 rounded-xl font-bold" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}>
                        <option value="Hybrid">Hybrid</option><option value="Memory Foam">Memory Foam</option><option value="Spring">Spring</option><option value="Orthopedic">Orthopedic</option>
                      </select>
                    </div>
                    <label className="flex items-center gap-3 p-4 bg-white rounded-2xl cursor-pointer hover:shadow-sm transition-all border">
                      <input type="checkbox" className="w-5 h-5 accent-serta-yellow" checked={editingProduct.isBestSeller} onChange={e => setEditingProduct({...editingProduct, isBestSeller: e.target.checked})} />
                      <span className="font-black text-serta-navy uppercase text-[10px] tracking-widest">Best Seller</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-10">
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Localized Names</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1"><label className="text-[10px] font-black uppercase text-gray-400 px-1">KA</label><input type="text" className="w-full border-2 p-3 rounded-xl font-bold focus:border-blue-500 outline-none" value={editingProduct.name.ka} onChange={e => setEditingProduct({...editingProduct, name: {...editingProduct.name, ka: e.target.value}})} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-black uppercase text-gray-400 px-1">EN</label><input type="text" className="w-full border-2 p-3 rounded-xl font-bold focus:border-blue-500 outline-none" value={editingProduct.name.en} onChange={e => setEditingProduct({...editingProduct, name: {...editingProduct.name, en: e.target.value}})} /></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Attributes</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white border p-6 rounded-3xl">
                      <div className="space-y-1"><label className="text-[8px] font-black uppercase text-gray-400">Firmness (1-10)</label><input type="number" min="0" max="10" className="w-full border p-2 rounded-lg font-bold" value={editingProduct.firmness} onChange={e => setEditingProduct({...editingProduct, firmness: Number(e.target.value)})} /></div>
                      <div className="space-y-1"><label className="text-[8px] font-black uppercase text-gray-400">Height (CM)</label><input type="number" className="w-full border p-2 rounded-lg font-bold" value={editingProduct.height} onChange={e => setEditingProduct({...editingProduct, height: Number(e.target.value)})} /></div>
                      <div className="space-y-1"><label className="text-[8px] font-black uppercase text-gray-400">Warranty (Y)</label><input type="number" className="w-full border p-2 rounded-lg font-bold" value={editingProduct.warranty} onChange={e => setEditingProduct({...editingProduct, warranty: Number(e.target.value)})} /></div>
                    </div>
                  </div>

                  <div className="space-y-4 bg-blue-50/30 p-6 rounded-3xl border border-blue-100">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2"><RotateCcw size={14} /> Care Instructions</h3>
                    <div className="space-y-4">
                      <textarea placeholder="Care (KA)" className="w-full border p-4 rounded-xl font-medium min-h-[80px] bg-white text-sm" value={editingProduct.careInstructions?.ka || ''} onChange={e => setEditingProduct({...editingProduct, careInstructions: {...(editingProduct.careInstructions || {ka: '', en: ''}), ka: e.target.value}})} />
                      <textarea placeholder="Care (EN)" className="w-full border p-4 rounded-xl font-medium min-h-[80px] bg-white text-sm" value={editingProduct.careInstructions?.en || ''} onChange={e => setEditingProduct({...editingProduct, careInstructions: {...(editingProduct.careInstructions || {ka: '', en: ''}), en: e.target.value}})} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Descriptions</h3>
                    <textarea placeholder="Description (KA)" className="w-full border-2 p-4 rounded-2xl font-bold min-h-[100px] outline-none focus:border-blue-500 transition-all" value={editingProduct.description.ka} onChange={e => setEditingProduct({...editingProduct, description: {...editingProduct.description, ka: e.target.value}})} />
                    <textarea placeholder="Description (EN)" className="w-full border-2 p-4 rounded-2xl font-bold min-h-[100px] outline-none focus:border-blue-500 transition-all" value={editingProduct.description.en} onChange={e => setEditingProduct({...editingProduct, description: {...editingProduct.description, en: e.target.value}})} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2"><h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Features List</h3><button type="button" onClick={handleAddFeature} className="text-blue-600 font-black text-[10px] uppercase flex items-center gap-1 hover:underline"><Plus size={14} /> New Feature</button></div>
                    <div className="grid gap-3">{editingProduct.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-2 items-start bg-gray-50 p-4 rounded-2xl group border border-transparent hover:border-gray-200 transition-all"><div className="grid flex-1 gap-2"><input type="text" placeholder="KA Feature" className="w-full border p-2 rounded-lg text-sm font-medium" value={feature.ka} onChange={e => handleUpdateFeature(idx, 'ka', e.target.value)} /><input type="text" placeholder="EN Feature" className="w-full border p-2 rounded-lg text-sm font-medium" value={feature.en} onChange={e => handleUpdateFeature(idx, 'en', e.target.value)} /></div><button type="button" onClick={() => handleRemoveFeature(idx)} className="p-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button></div>
                    ))}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-10 border-t">
              <button onClick={() => setEditingProduct(null)} className="px-8 py-4 font-black text-gray-400 uppercase tracking-widest text-xs hover:text-gray-600 transition-all">Cancel</button>
              <button 
                onClick={handleSaveProduct} 
                disabled={isSaving}
                className="bg-serta-navy text-white px-16 py-4 rounded-[20px] font-black shadow-xl hover:shadow-2xl hover:bg-blue-900 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {isSaving ? "Saving Product..." : "Save Product Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;