
import React, { useState, useRef, useEffect } from 'react';
import { useApp, Slide, MenuItem } from '../store';
import { Product, LocalizedString, SizePrice } from '../types';
import { 
  Trash2, Copy, Edit3, Plus, Save, X, Image as ImageIcon, 
  Layout as LayoutIcon, ShoppingBag, ArrowLeft, Lock, Upload, 
  CheckCircle, Database, AlertCircle, RefreshCw, Star, Info, RotateCcw, Ruler,
  MoveUp, MoveDown, Menu, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { products, setProducts, saveSingleProduct, settings, updateSettings, lang, dbStatus, fetchData, uploadImage } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'status'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [localSettings, setLocalSettings] = useState(settings);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const slideImageInputRef = useRef<HTMLInputElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => { setLocalSettings(settings); }, [settings]);

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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const url = await uploadImage(file);
      if (url) setLocalSettings({ ...localSettings, logoUrl: url });
      setIsUploading(false);
    }
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      setIsUploading(true);
      const url = await uploadImage(file);
      if (url) setEditingProduct({ ...editingProduct, image: url });
      setIsUploading(false);
    }
  };

  const handleSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeSlideIndex !== null) {
      setIsUploading(true);
      const url = await uploadImage(file);
      if (url) {
        const newSlides = [...localSettings.slides];
        newSlides[activeSlideIndex].image = url;
        setLocalSettings({ ...localSettings, slides: newSlides });
      }
      setIsUploading(false);
      setActiveSlideIndex(null);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    const success = await updateSettings(localSettings);
    setIsSaving(false);
    if (success) triggerSuccess();
    else setSaveError("შეცდომა შენახვისას");
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    const success = await saveSingleProduct(editingProduct);
    setIsSaving(false);
    if (success) {
      setEditingProduct(null);
      triggerSuccess();
    } else {
      alert("ბაზასთან დაკავშირება ვერ მოხერხდა. დარწმუნდით რომ Supabase-ში RLS გამორთულია.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('დარწმუნებული ხართ?')) {
      const success = await setProducts(products.filter(p => p.id !== id));
      if (success) triggerSuccess();
    }
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
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {showSuccess && <div className="fixed top-8 right-8 z-[200] bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black animate-in slide-in-from-right"><CheckCircle size={24} /> შენახულია!</div>}
      
      <div className="bg-serta-navy text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white font-black uppercase text-xs tracking-widest"><ArrowLeft size={16} /> Exit Admin</button>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl">
              <Database size={16} className={dbStatus === 'connected' ? 'text-green-400' : 'text-red-400'} />
              <span className="text-[10px] font-black uppercase tracking-widest">Database: {dbStatus}</span>
            </div>
          </div>
          <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Control Center</h1>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('products')} className={`px-8 py-3 rounded-xl font-black ${activeTab === 'products' ? 'bg-serta-yellow text-serta-navy' : 'bg-white/10'}`}>Products</button>
            <button onClick={() => setActiveTab('settings')} className={`px-8 py-3 rounded-xl font-black ${activeTab === 'settings' ? 'bg-serta-yellow text-serta-navy' : 'bg-white/10'}`}>Settings</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {activeTab === 'products' && (
          <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-xl font-black text-serta-navy">Inventory</h2>
              <button 
                onClick={() => setEditingProduct({
                  id: 'prod-' + Date.now(), name: { ka: '', en: '' }, sizePrices: [{size: 90, price: 0}],
                  type: { ka: 'მატრასი', en: 'Mattress' }, firmness: 5, height: 25, warranty: 10, category: 'Hybrid',
                  image: '', description: { ka: '', en: '' }, features: [], isBestSeller: false
                })}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm"
              >
                + New Product
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400">
                <tr><th className="p-6">Product</th><th className="p-6">Price</th><th className="p-6 text-right">Actions</th></tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="p-6 flex items-center gap-4">
                      <img src={p.image} className="w-12 h-10 object-cover rounded-lg" />
                      <span className="font-bold">{p.name[lang]}</span>
                    </td>
                    <td className="p-6 font-black">{p.sizePrices[0]?.price} ₾</td>
                    <td className="p-6 text-right">
                      <button onClick={() => setEditingProduct(p)} className="p-2 text-blue-600"><Edit3 size={18} /></button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-red-600"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-[32px] shadow-xl p-8 space-y-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-serta-navy">General Settings</h2>
              <button onClick={handleSaveSettings} disabled={isSaving} className="bg-green-600 text-white px-8 py-3 rounded-xl font-black flex items-center gap-2">
                {isSaving ? <Loader2 className="animate-spin" /> : <Save />} Save
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-gray-400">Logo</label>
                <div className="flex items-center gap-4 p-4 border rounded-2xl">
                  <img src={localSettings.logoUrl} className="h-10 object-contain" />
                  <button onClick={() => logoInputRef.current?.click()} className="ml-auto text-blue-600 font-bold text-xs uppercase">Change</button>
                  <input ref={logoInputRef} type="file" className="hidden" onChange={handleLogoUpload} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input className="border p-4 rounded-xl font-bold" value={localSettings.contactPhone} placeholder="Phone" onChange={e => setLocalSettings({...localSettings, contactPhone: e.target.value})} />
                <input className="border p-4 rounded-xl font-bold" value={localSettings.contactEmail} placeholder="Email" onChange={e => setLocalSettings({...localSettings, contactEmail: e.target.value})} />
              </div>
            </div>

            <div className="pt-10 border-t">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-serta-navy uppercase">Hero Slides</h3>
                <button onClick={() => setLocalSettings({...localSettings, slides: [...localSettings.slides, {image: '', title: {ka: '', en: ''}, subtitle: {ka: '', en: ''}}]})} className="text-blue-600 font-bold">+ Add Slide</button>
              </div>
              <div className="space-y-6">
                {localSettings.slides.map((slide, idx) => (
                  <div key={idx} className="p-6 border rounded-2xl grid md:grid-cols-3 gap-6 relative group">
                    <button onClick={() => setLocalSettings({...localSettings, slides: localSettings.slides.filter((_, i) => i !== idx)})} className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
                    <div className="space-y-2">
                      <div className="aspect-video bg-gray-50 rounded-xl overflow-hidden border">
                        {slide.image ? <img src={slide.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>}
                      </div>
                      <button onClick={() => { setActiveSlideIndex(idx); slideImageInputRef.current?.click(); }} className="w-full py-2 bg-gray-100 rounded-lg text-[10px] font-black uppercase">Upload Image</button>
                      <input ref={slideImageInputRef} type="file" className="hidden" onChange={handleSlideImageUpload} />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <input className="w-full border p-3 rounded-lg text-sm font-bold" placeholder="Title KA" value={slide.title.ka} onChange={e => {
                        const s = [...localSettings.slides]; s[idx].title.ka = e.target.value; setLocalSettings({...localSettings, slides: s});
                      }} />
                      <textarea className="w-full border p-3 rounded-lg text-xs" placeholder="Subtitle KA" value={slide.subtitle.ka} onChange={e => {
                        const s = [...localSettings.slides]; s[idx].subtitle.ka = e.target.value; setLocalSettings({...localSettings, slides: s});
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[32px] p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-serta-navy">Product Editor</h2>
              <button onClick={() => setEditingProduct(null)}><X /></button>
            </div>
            
            <div className="space-y-4">
              <div className="aspect-video bg-gray-50 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden relative group">
                {editingProduct.image ? <img src={editingProduct.image} className="w-full h-full object-cover" /> : <Upload className="text-gray-200" size={48} />}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <button onClick={() => productImageInputRef.current?.click()} className="bg-white text-serta-navy px-4 py-2 rounded-lg font-black text-xs">Upload Photo</button>
                </div>
                <input ref={productImageInputRef} type="file" className="hidden" onChange={handleProductImageUpload} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <input className="border p-4 rounded-xl font-bold" value={editingProduct.name.ka} placeholder="Name KA" onChange={e => setEditingProduct({...editingProduct, name: {...editingProduct.name, ka: e.target.value}})} />
                <input className="border p-4 rounded-xl font-bold" value={editingProduct.name.en} placeholder="Name EN" onChange={e => setEditingProduct({...editingProduct, name: {...editingProduct.name, en: e.target.value}})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="number" className="border p-4 rounded-xl font-bold" value={editingProduct.sizePrices[0].price} placeholder="Price" onChange={e => {
                  const sp = [...editingProduct.sizePrices]; sp[0].price = Number(e.target.value); setEditingProduct({...editingProduct, sizePrices: sp});
                }} />
                <select className="border p-4 rounded-xl font-bold" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Memory Foam">Memory Foam</option>
                  <option value="Orthopedic">Orthopedic</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button onClick={() => setEditingProduct(null)} className="flex-1 py-4 font-black text-gray-400">Cancel</button>
              <button onClick={handleSaveProduct} disabled={isSaving || isUploading} className="flex-1 bg-serta-navy text-white py-4 rounded-xl font-black">
                {isSaving ? "Saving..." : isUploading ? "Uploading..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
