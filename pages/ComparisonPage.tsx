import React from 'react';
import { useApp } from '../store.tsx';
import { PRODUCTS, TRANSLATIONS } from '../constants.tsx';
import { X, Ruler, Shield, Layers, Wind, Activity, ArrowRight, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComparisonPage: React.FC = () => {
  const { lang, comparisonList, toggleComparison, products } = useApp();
  const t = TRANSLATIONS[lang];

  const compareItems = comparisonList.map(id => {
    return products.find(p => p.id === id) || PRODUCTS.find(p => p.id === id);
  }).filter(Boolean);

  if (compareItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-40 text-center animate-in fade-in duration-500">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 text-gray-200">
          <Layers size={64} />
        </div>
        <h2 className="text-4xl font-black text-serta-navy mb-6">
          {lang === 'ka' ? 'შესადარებელი სია ცარიელია' : 'Comparison list is empty'}
        </h2>
        <Link to="/shop" className="inline-flex items-center gap-2 text-blue-600 font-black text-lg hover:underline transition-all">
          {lang === 'ka' ? 'დაამატეთ მოდელები' : 'Add models to compare'}
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 animate-in fade-in duration-500">
      <h1 className="text-5xl font-black text-serta-navy mb-20">{t.nav.comparison}</h1>
      
      <div className="overflow-x-auto pb-12 custom-scrollbar">
        <div className="min-w-[1000px] bg-white rounded-[56px] shadow-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-10 w-1/5 border-b border-gray-100 bg-gray-50/50">
                  <div className="text-xs font-black uppercase tracking-widest text-gray-400">Features</div>
                </th>
                {compareItems.map(item => (
                  <th key={item!.id} className="p-10 border-b border-gray-100 group relative">
                    <div className="relative mb-10">
                      <button 
                        onClick={() => toggleComparison(item!.id)}
                        className="absolute -top-4 -right-4 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 z-20"
                      >
                        <X size={18} />
                      </button>
                      <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all border border-gray-50">
                        <img src={item!.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    </div>
                    <h3 className="font-black text-serta-navy text-2xl leading-tight mb-3 group-hover:text-blue-700 transition-colors">{item!.name[lang]}</h3>
                    {/* Fix: Property 'price' does not exist on type 'Product'. Use minimum price. */}
                    <div className="text-3xl font-black text-blue-700">{Math.min(...item!.sizePrices.map(sp => sp.price))} <span className="text-sm font-medium">₾</span></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-8 bg-gray-50/50 font-black text-serta-navy flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <Layers size={20} />
                  </div>
                  <span className="uppercase text-xs tracking-widest">{t.filter.type}</span>
                </td>
                {compareItems.map(item => (
                  <td key={item!.id} className="p-8 text-lg font-bold text-gray-600 uppercase tracking-tight">{item!.category}</td>
                ))}
              </tr>
              <tr>
                <td className="p-8 bg-gray-50/50 font-black text-serta-navy flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <Activity size={20} />
                  </div>
                  <span className="uppercase text-xs tracking-widest">{t.product.firmnessLabel}</span>
                </td>
                {compareItems.map(item => (
                  <td key={item!.id} className="p-8">
                    <div className="flex flex-col gap-3">
                      <span className="font-black text-2xl text-serta-navy">{item!.firmness}<span className="text-xs text-gray-400 font-medium">/10</span></span>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full max-w-[150px] overflow-hidden">
                        <div className="h-full bg-serta-yellow rounded-full shadow-sm" style={{ width: `${item!.firmness * 10}%` }}></div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-8 bg-gray-50/50 font-black text-serta-navy flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <Ruler size={20} />
                  </div>
                  <span className="uppercase text-xs tracking-widest">{t.product.height}</span>
                </td>
                {compareItems.map(item => (
                  <td key={item!.id} className="p-8 font-black text-2xl text-serta-navy">{item!.height} {t.product.cm}</td>
                ))}
              </tr>
              <tr>
                <td className="p-8 bg-gray-50/50 font-black text-serta-navy flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <Shield size={20} />
                  </div>
                  <span className="uppercase text-xs tracking-widest">{t.product.warranty}</span>
                </td>
                {compareItems.map(item => (
                  <td key={item!.id} className="p-8 font-black text-2xl text-serta-navy">{item!.warranty} {t.product.years}</td>
                ))}
              </tr>
              <tr>
                <td className="p-8 bg-gray-50/50 font-black text-serta-navy flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <Wind size={20} />
                  </div>
                  <span className="uppercase text-xs tracking-widest">Key Features</span>
                </td>
                {compareItems.map(item => (
                  <td key={item!.id} className="p-8">
                    <div className="flex flex-wrap gap-2">
                      {item!.features.map((f, i) => (
                        <span key={i} className="text-[10px] uppercase font-black bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100">
                          {f[lang]}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-10 bg-gray-50/50"></td>
                {compareItems.map(item => (
                  <td key={item!.id} className="p-10">
                    <Link 
                      to={`/product/${item!.id}`} 
                      className="block text-center bg-serta-navy text-white py-5 px-8 rounded-[24px] font-black text-lg hover:bg-blue-800 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-serta-navy/20"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;