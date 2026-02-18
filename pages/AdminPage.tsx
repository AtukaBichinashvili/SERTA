
import React, { useState, useRef, useEffect } from 'react';
import { useApp, Slide, MenuItem } from '../store';
import { Product, LocalizedString, SizePrice } from '../types';
import { 
  Trash2, Edit3, Plus, Save, X, ShoppingBag, ArrowLeft, Lock, Upload, 
  CheckCircle, Database, Star, Info, RotateCcw, Ruler,
  MoveUp, MoveDown, Menu, Loader2, Layers, Activity, Wind
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { products, setProducts, saveSingleProduct, settings, updateSettings, lang, dbStatus, fetchData, uploadImage } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const handleSaveSettings = async () => {
    setIsSaving(true);
    const success = await updateSettings(localSettings);
    setIsSaving(false);
    if (success) triggerSuccess();
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
      alert("შეცდომა! დარწმუნდით, რომ Supabase-ში RLS გამორთულია და SQL სკრიპტი გაშვებულია.");
    }
  };

  const addFeature = () => {
    if (!editingProduct) return;
    const newFeatures = [...editingProduct.features, { ka: '', en: '' }];
    setEditingProduct({ ...editingProduct, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    if (!editingProduct) return;
    const newFeatures = editingProduct.features.filter((_, i) => i !== index);
    setEditingProduct({ ...editingProduct, features: newFeatures });
  };

  const addSizePrice = () => {
    if (!editingProduct) return;
    const newSP = [...editingProduct.sizePrices, { size: 160, price: 0 }];
    setEditingProduct({ ...editingProduct, sizePrices: newSP });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
          <div className="w-20 h-20 bg-serta-navy text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"><Lock size={40} /></div>
          <h1 className="text-2xl font-black text-serta-navy text-center mb-8 uppercase tracking-tight">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input autoFocus type="password" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-4 ring-serta-yellow/20 outline-none transition-all font-bold" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
              <span className="text-[10px] font-black uppercase tracking-widest">DB: {dbStatus}</span>
            </div>
          </div>
          <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Admin Panel</h1>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('products')} className={`px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest ${activeTab === 'products' ? 'bg-serta-yellow text-serta-navy' : 'bg-white/10'}`}>Products</button>
            <button onClick={() => setActiveTab('settings')} className={`px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest ${activeTab === 'settings' ? 'bg-serta-yellow text-serta-navy' : 'bg-white/10'}`}>Settings</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {activeTab === 'products' && (
          <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-xl font-black text-serta-navy uppercase tracking-tight">Inventory</h2>
              <button onClick={() => setEditingProduct({
                id: 'prod-' + Date.now(), name: { ka: '', en: '' }, sizePrices: [{size: 160, price: 0}],
                type: { ka: 'მატრასი', en: 'Mattress' }, firmness: 5, height: 25, warranty: 10, category: 'Hybrid',
                image: '', description: { ka: '', en: '' }, features: [], isBestSeller: false
              })} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest">+ Add Product</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400">
                  <tr><th className="p-6">Product</th><th className="p-6">Category</th><th className="p-6">Min Price</th><th className="p-6 text-right">Actions</th></tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="p-6 flex items-center gap-4">
                        <img src={p.image} className="w-12 h-10 object-cover rounded-lg bg-gray-100" />
                        <span className="font-bold text-serta-navy">{p.name[lang] || 'Unnamed'}</span>
                      </td>
                      <td className="p-6 text-sm font-medium text-gray-500 uppercase tracking-tighter">{p.category}</td>
                      <td className="p-6 font-black text-serta-navy">{Math.min(...p.sizePrices.map(sp => sp.price))} ₾</td>
                      <td className="p-6 text-right">
                        <button onClick={() => setEditingProduct(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2 transition-all"><Edit3 size={18} /></button>
                        <button onClick={async () => { if(window.confirm('Delete?')) await setProducts(products.filter(item => item.id !== p.id)); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-[32px] shadow-xl p-8 space-y-10">
            <div className="flex justify-between items-center border-b pb-6">
              <h2 className="text-xl font-black text-serta-navy uppercase tracking-tight">Main Configuration</h2>
              <button onClick={handleSaveSettings} disabled={isSaving} className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-green-600/20 active:scale-95 transition-all">
                {isSaving ? <Loader2 className="animate-spin" /> : <Save />} Save Settings
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Logo</label>
                <div className="flex items-center gap-6 p-6 border rounded-3xl bg-gray-50/50">
                  <div className="h-16 w-32 bg-white rounded-xl border flex items-center justify-center p-2">
                    <img src={localSettings.logoUrl} className="max-h-full object-contain" />
                  </div>
                  <button onClick={() => logoInputRef.current?.click()} className="bg-serta-navy text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">Upload Logo</button>
                  <input ref={logoInputRef} type="file" className="hidden" onChange={handleLogoUpload} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Contact Phone</label>
                  <input className="w-full border p-4 rounded-xl font-bold" value={localSettings.contactPhone} onChange={e => setLocalSettings({...localSettings, contactPhone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Contact Email</label>
                  <input className="w-full border p-4 rounded-xl font-bold" value={localSettings.contactEmail} onChange={e => setLocalSettings({...localSettings, contactEmail: e.target.value})} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-[100] bg-serta-navy/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[40px] p-8 lg:p-12 max-h-[90vh] overflow-y-auto space-y-10 shadow-2xl relative">
            <button onClick={() => setEditingProduct(null)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-all"><X /></button>
            
            <h2 className="text-3xl font-black text-serta-navy uppercase tracking-tighter">Product Editor</h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="aspect-video bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative group">
                  {editingProduct.image ? (
                    <>
                      <img src={editingProduct.image} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <button onClick={() => productImageInputRef.current?.click()} className="bg-white text-serta-navy px-6 py-3 rounded-xl font-black text-xs uppercase">Change Photo</button>
                      </div>
                    </>
                  ) : (
                    <button onClick={() => productImageInputRef.current?.click()} className="flex flex-col items-center gap-3 text-gray-400 hover:text-serta-navy transition-colors">
                      <Upload size={48} />
                      <span className="font-black text-xs uppercase tracking-widest">Upload Product Photo</span>
                    </button>
                  )}
                  <input ref={productImageInputRef} type="file" className="hidden" onChange={handleProductImageUpload} />
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400">Name (KA)</label>
                      <input className="w-full border p-4 rounded-xl font-bold" value={editingProduct.name.ka} onChange={e => setEditingProduct({...editingProduct, name: {...editingProduct.name, ka: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400">Name (EN)</label>
                      <input className="w-full border p-4 rounded-xl font-bold" value={editingProduct.name.en} onChange={e => setEditingProduct({...editingProduct, name: {...editingProduct.name, en: e.target.value}})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400">Description (KA)</label>
                    <textarea className="w-full border p-4 rounded-xl font-medium h-32" value={editingProduct.description.ka} onChange={e => setEditingProduct({...editingProduct, description: {...editingProduct.description, ka: e.target.value}})} />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-serta-navy text-sm uppercase tracking-widest flex items-center gap-2"><Ruler size={16}/> Sizes & Prices</h3>
                    <button onClick={addSizePrice} className="text-blue-600 text-xs font-black uppercase">+ Add Size</button>
                  </div>
                  {editingProduct.sizePrices.map((sp, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <input type="number" className="w-24 border p-3 rounded-xl font-bold" placeholder="Size" value={sp.size} onChange={e => {
                        const newSP = [...editingProduct.sizePrices]; newSP[idx].size = Number(e.target.value); setEditingProduct({...editingProduct, sizePrices: newSP});
                      }} />
                      <input type="number" className="flex-1 border p-3 rounded-xl font-bold" placeholder="Price" value={sp.price} onChange={e => {
                        const newSP = [...editingProduct.sizePrices]; newSP[idx].price = Number(e.target.value); setEditingProduct({...editingProduct, sizePrices: newSP});
                      }} />
                      <button onClick={() => setEditingProduct({...editingProduct, sizePrices: editingProduct.sizePrices.filter((_, i) => i !== idx)})} className="p-2 text-red-400"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
                   <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-serta-navy text-sm uppercase tracking-widest flex items-center gap-2"><Wind size={16}/> Features List</h3>
                    <button onClick={addFeature} className="text-blue-600 text-xs font-black uppercase">+ New Feature</button>
                  </div>
                  {editingProduct.features.map((f, idx) => (
                    <div key={idx} className="space-y-2 p-3 bg-white rounded-xl relative group">
                      <button onClick={() => removeFeature(idx)} className="absolute top-2 right-2 p-1 text-red-300 opacity-0 group-hover:opacity-100 transition-all"><X size={14}/></button>
                      <input className="w-full border-none bg-gray-50 p-2 rounded-lg text-xs font-bold" placeholder="ქართულად" value={f.ka} onChange={e => {
                        const newF = [...editingProduct.features]; newF[idx].ka = e.target.value; setEditingProduct({...editingProduct, features: newF});
                      }} />
                      <input className="w-full border-none bg-gray-50 p-2 rounded-lg text-xs font-medium" placeholder="In English" value={f.en} onChange={e => {
                        const newF = [...editingProduct.features]; newF[idx].en = e.target.value; setEditingProduct({...editingProduct, features: newF});
                      }} />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Firmness (1-10)</label>
                    <input type="range" min="1" max="10" className="w-full accent-serta-navy" value={editingProduct.firmness} onChange={e => setEditingProduct({...editingProduct, firmness: Number(e.target.value)})} />
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl cursor-pointer" onClick={() => setEditingProduct({...editingProduct, isBestSeller: !editingProduct.isBestSeller})}>
                    <input type="checkbox" checked={editingProduct.isBestSeller} readOnly className="w-5 h-5 accent-serta-navy" />
                    <span className="text-[10px] font-black uppercase text-serta-navy tracking-widest">Best Seller</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-10 border-t">
              <button onClick={() => setEditingProduct(null)} className="flex-1 py-5 font-black text-gray-400 uppercase tracking-widest">Cancel</button>
              <button onClick={handleSaveProduct} disabled={isSaving || isUploading} className="flex-[2] bg-serta-navy text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-serta-navy/20 active:scale-95 transition-all">
                {isSaving ? "Saving..." : isUploading ? "Uploading..." : "Save Product Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
