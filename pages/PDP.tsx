
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { TRANSLATIONS } from '../constants';
// Added ArrowRight to imports to resolve "Cannot find name 'ArrowRight'" error
import { 
  ShieldCheck, Truck, RotateCcw, Ruler, Wind, Activity, Heart, 
  Layers, ArrowLeft, Info, CheckCircle, Star, Sparkles, CreditCard,
  ArrowRight
} from 'lucide-react';

const PDP: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, addToCart, toggleWishlist, wishlist, toggleComparison, comparisonList, products } = useApp();
  const t = TRANSLATIONS[lang];
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState(product?.sizePrices[0]?.size || 160);

  if (!product) return <div className="py-40 text-center font-black text-serta-navy uppercase tracking-widest">Product not found</div>;

  const currentPrice = product.sizePrices.find(sp => sp.size === selectedSize)?.price || 0;

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="py-6 lg:py-12 animate-in fade-in duration-500">
      <div className="max-w-[1400px] mx-auto px-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-400 hover:text-serta-navy transition-all mb-8 font-bold uppercase text-[10px] tracking-widest"
        >
          <ArrowLeft size={16} />
          {t.product.back}
        </button>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
          {/* Gallery Side */}
          <div className="flex-1 space-y-4">
            <div className="aspect-square sm:aspect-[4/3] rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl relative">
              <img src={product.image} alt={product.name[lang]} className="w-full h-full object-cover" />
              {product.isBestSeller && (
                <div className="absolute top-8 left-8 bg-serta-yellow text-serta-navy px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
                  {t.product.bestSeller}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-50 cursor-pointer border-2 border-transparent hover:border-serta-yellow transition-all">
                  <img src={`https://picsum.photos/seed/serta${product.id}${i}/400/400`} className="w-full h-full object-cover opacity-60 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Side */}
          <div className="flex-1 py-4">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6 text-serta-yellow">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                <span className="text-gray-400 text-[10px] font-black uppercase ml-2 tracking-widest">4.9/5 (120+ Reviews)</span>
              </div>
              <h1 className="text-4xl lg:text-7xl font-black text-serta-navy mb-6 tracking-tighter leading-none">{product.name[lang]}</h1>
              <p className="text-gray-400 font-bold uppercase text-[11px] tracking-widest mb-8">{product.type[lang]}</p>
              
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-4xl lg:text-6xl font-black text-blue-700">{currentPrice} ₾</span>
                <span className="text-gray-400 font-medium line-through decoration-red-500/50">{Math.round(currentPrice * 1.25)} ₾</span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-black">-20%</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-10 p-8 bg-gray-50 rounded-[32px] border border-gray-100">
              <h3 className="font-black text-serta-navy mb-6 text-[11px] uppercase tracking-widest flex items-center gap-2">
                <Ruler size={14} />
                {t.filter.size}
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizePrices.map(sp => (
                  <button 
                    key={sp.size}
                    onClick={() => setSelectedSize(sp.size)}
                    className={`px-6 py-4 rounded-2xl border-2 font-black text-xs transition-all transform active:scale-95 ${selectedSize === sp.size ? 'border-serta-navy bg-serta-navy text-white shadow-xl' : 'border-white bg-white hover:border-serta-yellow text-gray-400'}`}
                  >
                    {sp.size} {t.product.cm}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-serta-yellow text-serta-navy py-6 px-10 rounded-[28px] font-black text-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4"
              >
                {t.product.addToCart}
                <ArrowRight size={24} />
              </button>
              <div className="flex gap-4">
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-6 rounded-[28px] transition-all border-2 shadow-sm ${wishlist.includes(product.id) ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white hover:bg-gray-50 border-gray-100 text-serta-navy'}`}
                >
                  <Heart fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} size={24} />
                </button>
                <button 
                  onClick={() => toggleComparison(product.id)}
                  className={`p-6 rounded-[28px] transition-all border-2 shadow-sm ${comparisonList.includes(product.id) ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-white hover:bg-gray-50 border-gray-100 text-serta-navy'}`}
                >
                  <Layers size={24} />
                </button>
              </div>
            </div>

            {/* High Conversion Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-[11px] font-black text-green-800 uppercase tracking-tight">{t.product.trial}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <CreditCard className="text-blue-600" size={20} />
                <span className="text-[11px] font-black text-blue-800 uppercase tracking-tight">{t.product.financing}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specs */}
        <section className="bg-gray-50 rounded-[64px] p-8 lg:p-24 mb-24">
          <div className="max-w-4xl mx-auto">
             <div className="flex flex-col lg:flex-row gap-16">
               <div className="flex-1">
                 <h2 className="text-3xl font-black text-serta-navy mb-8 uppercase tracking-tighter flex items-center gap-3">
                   <Sparkles className="text-serta-yellow" size={28} />
                   {t.product.tech}
                 </h2>
                 <ul className="space-y-6">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-serta-navy text-white flex-shrink-0 flex items-center justify-center text-[10px] font-black">✓</div>
                        <span className="font-bold text-lg text-gray-600 leading-tight">{f[lang]}</span>
                      </li>
                    ))}
                 </ul>
               </div>
               <div className="flex-1">
                 <h2 className="text-3xl font-black text-serta-navy mb-8 uppercase tracking-tighter flex items-center gap-3">
                   <Info className="text-blue-500" size={28} />
                   Details
                 </h2>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.product.warranty}</p>
                      <p className="text-xl font-black text-serta-navy">{product.warranty} {t.product.years}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.product.height}</p>
                      <p className="text-xl font-black text-serta-navy">{product.height} {t.product.cm}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.product.firmnessLabel}</p>
                      <p className="text-xl font-black text-serta-navy">{product.firmness}/10</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.product.delivery}</p>
                      <p className="text-xl font-black text-serta-navy">{t.product.free}</p>
                    </div>
                 </div>
               </div>
             </div>
             
             <div className="mt-20 pt-20 border-t border-gray-200 text-center">
                <p className="text-2xl text-gray-500 leading-relaxed font-medium">
                  "{product.description[lang]}"
                </p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PDP;
