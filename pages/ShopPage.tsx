import React, { useState, useMemo } from 'react';
import { useApp } from '../store.tsx';
import { TRANSLATIONS } from '../constants.tsx';
import ProductCard from '../components/ProductCard.tsx';
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';

const ShopPage: React.FC = () => {
  const { lang, products } = useApp();
  const t = TRANSLATIONS[lang];
  
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const types = Array.from(new Set(products.map(p => p.category)));
  const sizes = Array.from(new Set(products.flatMap(p => p.sizePrices.map(sp => sp.size)))).sort((a: number, b: number) => a - b);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchType = !activeType || p.category === activeType;
      const matchSize = !activeSize || p.sizePrices.some(sp => sp.size === activeSize);
      const matchSearch = !searchQuery || p.name[lang].toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSize && matchSearch;
    });
  }, [activeType, activeSize, searchQuery, lang, products]);

  return (
    <div className="container mx-auto px-4 py-10 lg:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* Mobile Search & Filter Button */}
        <div className="lg:hidden flex gap-3 mb-6">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder={t.filter.search}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 pl-12 outline-none font-bold text-serta-navy text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center justify-center bg-serta-navy text-white w-14 h-14 rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            <SlidersHorizontal size={24} />
          </button>
        </div>

        {/* Sidebar Filters - Responsive Drawer */}
        <aside className={`fixed lg:static inset-0 z-[60] bg-white p-8 lg:p-0 lg:w-80 transition-all duration-300 lg:translate-x-0 ${isFilterOpen ? 'translate-x-0 overflow-y-auto' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between lg:hidden mb-10">
            <h2 className="text-2xl font-black text-serta-navy">{t.filter.title}</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={24} /></button>
          </div>

          <div className="space-y-12">
            <div className="hidden lg:block">
              <h3 className="font-black text-serta-navy mb-5 text-[10px] uppercase tracking-widest flex items-center gap-2 text-gray-400">
                <Search size={14} className="text-serta-navy" />
                {t.filter.search}
              </h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={lang === 'ka' ? 'ძიება...' : 'Search...'}
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 ring-serta-navy/5 outline-none font-bold text-serta-navy text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="font-black text-gray-400 mb-6 text-[10px] uppercase tracking-widest">{t.filter.type}</h3>
              <div className="flex flex-col gap-2.5">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveType(activeType === type ? null : type)}
                    className={`text-left px-6 py-4 rounded-xl transition-all font-bold text-sm ${activeType === type ? 'bg-serta-navy text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-serta-navy'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-gray-400 mb-6 text-[10px] uppercase tracking-widest">{t.filter.size}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(activeSize === size ? null : size)}
                    className={`px-4 py-3.5 rounded-xl transition-all font-black text-[10px] lg:text-xs ${activeSize === size ? 'bg-serta-navy text-white shadow-md' : 'bg-gray-50 text-serta-navy opacity-60'}`}
                  >
                    {size} CM
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { setActiveSize(null); setActiveType(null); setSearchQuery(''); setIsFilterOpen(false); }}
              className="w-full py-4 text-[10px] font-black text-red-500/60 hover:text-red-500 transition-colors uppercase tracking-widest border-t border-gray-50 mt-6"
            >
              {t.filter.clear}
            </button>
          </div>
        </aside>

        {/* Main Product Display Area */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6 bg-gray-50/50 p-6 lg:p-8 rounded-3xl">
            <p className="text-gray-400 font-bold text-xs lg:text-sm text-center sm:text-left">
              {lang === 'ka' ? `ნაჩვენებია ${filteredProducts.length} მოდელი` : `Found ${filteredProducts.length} premium systems`}
            </p>
            <div className="flex items-center gap-4 text-[10px] lg:text-xs">
              <span className="hidden sm:inline text-gray-400 font-black uppercase tracking-widest">{t.filter.sortBy}</span>
              <div className="relative">
                <select className="appearance-none bg-white px-8 lg:px-10 py-3 lg:py-4 pr-12 lg:pr-14 rounded-xl lg:rounded-2xl font-black text-serta-navy outline-none cursor-pointer shadow-sm border-none text-[10px] lg:text-xs">
                  <option>{t.filter.bestSellers}</option>
                  <option>{t.filter.priceLow}</option>
                  <option>{t.filter.priceHigh}</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-serta-navy" />
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="py-24 lg:py-48 text-center flex flex-col items-center">
              <div className="w-24 h-24 lg:w-40 lg:h-40 bg-gray-50 rounded-full flex items-center justify-center mb-8 text-gray-200">
                <Search size={40} className="lg:size-80" />
              </div>
              <h2 className="text-2xl lg:text-4xl font-black text-serta-navy mb-4 tracking-tight">
                {lang === 'ka' ? 'პროდუქტები ვერ მოიძებნა' : 'No matches found'}
              </h2>
              <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed text-sm">
                {lang === 'ka' ? 'შეცვალეთ ფილტრები ძიების გასაგრძელებლად' : 'Adjust your filters or try different keywords to find your perfect sleep.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;