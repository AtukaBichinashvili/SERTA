import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store.tsx';
import { TRANSLATIONS } from '../constants.tsx';
import { ShieldCheck, Truck, RotateCcw, Ruler, Wind, Activity, Heart, Layers, ArrowLeft, Info } from 'lucide-react';

const PDP: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, addToCart, toggleWishlist, wishlist, toggleComparison, comparisonList, products } = useApp();
  const t = TRANSLATIONS[lang];
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState(product?.sizePrices[0]?.size || 160);

  if (!product) return <div className="py-40 text-center">Product not found</div>;

  const currentPrice = product.sizePrices.find(sp => sp.size === selectedSize)?.price || 0;

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="py-8 lg:py-20 animate-in fade-in duration-500">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-400 hover:text-serta-navy transition-all mb-8 lg:mb-12 font-bold uppercase text-[10px] tracking-widest"
        >
          <ArrowLeft size={16} />
          {t.product.back}
        </button>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16 lg:mb-24">
          <div className="flex-1 space-y-6">
            <div className="aspect-[4/3] rounded-3xl lg:rounded-[48px] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl">
              <img src={product.image} alt={product.name[lang]} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3 lg:gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[4/3] rounded-xl lg:rounded-[24px] overflow-hidden bg-gray-50 cursor-pointer hover:ring-4 ring-serta-yellow transition-all shadow-md">
                  <img src={`https://picsum.photos/seed/serta${product.id}${i}/400/300`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 lg:py-8">
            <div className="mb-8 lg:mb-10">
              <div className="flex items-center gap-2 mb-4 lg:mb-6">
                <span className="bg-serta-navy text-white text-[9px] lg:text-[10px] font-black px-3 py-1 lg:px-4 lg:py-1.5 rounded-full uppercase tracking-widest shadow-sm">{product.category}</span>
                {product.isBestSeller && <span className="bg-serta-yellow text-serta-navy text-[9px] lg:text-[10px] font-black px-3 py-1 lg:px-4 lg:py-1.5 rounded-full uppercase tracking-widest shadow-sm">{t.product.bestSeller}</span>}
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-serta-navy mb-4 lg:mb-6 leading-tight tracking-tight">{product.name[lang]}</h1>
              <div className="text-3xl lg:text-4xl font-black text-blue-700">{currentPrice} <span className="text-lg lg:text-xl font-medium">₾</span></div>
            </div>

            <div className="mb-10">
              <h3 className="font-black text-serta-navy mb-5 text-[10px] uppercase tracking-widest">{t.filter.size}</h3>
              <div className="flex flex-wrap gap-2 lg:gap-4">
                {product.sizePrices.map(sp => (
                  <button 
                    key={sp.size}
                    onClick={() => setSelectedSize(sp.size)}
                    className={`px-5 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl border-2 font-black text-xs transition-all transform active:scale-95 ${selectedSize === sp.size ? 'border-serta-navy bg-serta-navy text-white shadow-xl scale-105' : 'border-gray-100 hover:border-serta-yellow text-gray-400 bg-gray-50/50'}`}
                  >
                    {sp.size} {t.product.cm}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-10 lg:mb-16">
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-serta-yellow text-serta-navy py-5 lg:py-6 px-8 lg:px-10 rounded-2xl lg:rounded-[24px] font-black text-lg lg:text-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg"
              >
                {t.product.addToCart}
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 sm:flex-none p-5 lg:p-6 border-2 rounded-2xl lg:rounded-[24px] transition-all transform hover:scale-105 shadow-sm ${wishlist.includes(product.id) ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white hover:bg-gray-50 border-gray-100 text-serta-navy'}`}
                >
                  <Heart fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} size={24} />
                </button>
                <button 
                  onClick={() => toggleComparison(product.id)}
                  className={`flex-1 sm:flex-none p-5 lg:p-6 border-2 rounded-2xl lg:rounded-[24px] transition-all transform hover:scale-105 shadow-sm ${comparisonList.includes(product.id) ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-white hover:bg-gray-50 border-gray-100 text-serta-navy'}`}
                >
                  <Layers size={24} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8 py-8 border-y border-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-50 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3">
                   <ShieldCheck className="text-serta-navy" size={24} />
                </div>
                <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">{t.product.warranty}</div>
                <div className="font-black text-serta-navy text-sm">{product.warranty} {t.product.years}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-50 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3">
                   <Ruler className="text-serta-navy" size={24} />
                </div>
                <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">{t.product.height}</div>
                <div className="font-black text-serta-navy text-sm">{product.height} {t.product.cm}</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-50 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3">
                   <Activity className="text-serta-navy" size={24} />
                </div>
                <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">{t.product.firmnessLabel}</div>
                <div className="font-black text-serta-navy text-sm">{product.firmness}/10</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-50 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3">
                   <Truck className="text-serta-navy" size={24} />
                </div>
                <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">{t.product.delivery}</div>
                <div className="font-black text-serta-navy text-sm">{t.product.free}</div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-serta-gray/50 rounded-3xl lg:rounded-[64px] p-8 lg:p-24 shadow-inner">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-black text-serta-navy mb-10 lg:mb-16 text-center uppercase tracking-tight">{t.product.specifications}</h2>
            
            <div className="mb-16 lg:mb-24 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-serta-navy/5 px-4 py-2 rounded-xl mb-6">
                <Info size={16} className="text-serta-navy" />
                <span className="text-[10px] font-black uppercase text-serta-navy tracking-widest">
                  {lang === 'ka' ? 'პროდუქტის აღწერა' : 'Product Description'}
                </span>
              </div>
              <p className="text-lg lg:text-2xl text-gray-600 leading-relaxed font-medium">
                {product.description[lang]}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h3 className="text-xl lg:text-2xl font-black mb-6 lg:mb-10 flex items-center gap-4 text-serta-navy">
                  <Wind className="text-blue-500" size={28} />
                  {t.product.tech}
                </h3>
                <ul className="space-y-4 lg:space-y-6">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-600 group">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-serta-yellow flex-shrink-0 flex items-center justify-center text-[9px] lg:text-[10px] font-black group-hover:scale-125 transition-transform">✓</div>
                      <span className="font-bold text-base lg:text-lg">{f[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-black mb-6 lg:mb-10 flex items-center gap-4 text-serta-navy">
                  <RotateCcw className="text-blue-500" size={28} />
                  {t.product.care}
                </h3>
                <div className="bg-white p-8 lg:p-10 rounded-2xl lg:rounded-[32px] shadow-sm border border-gray-100">
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-lg font-medium">
                    {product.careInstructions?.[lang] || (lang === 'ka' 
                      ? 'მოვლის ინსტრუქცია მალე დაემატება.' 
                      : 'Care instructions will be added soon.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PDP;