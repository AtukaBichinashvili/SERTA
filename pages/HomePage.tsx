import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store.tsx';
import { TRANSLATIONS } from '../constants.tsx';
import ProductCard from '../components/ProductCard.tsx';
import { 
  Truck, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  Layers,
  Bed,
  Cloud,
  Wind,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';

const GemIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 3 3 18h6l3-18Z"/>
    <path d="M12 3v18"/>
  </svg>
);

const IconMap: Record<string, any> = {
  Layers: Layers,
  Bed: Bed,
  Cloud: Cloud,
  Wind: Wind,
};

const ProductRow: React.FC<{ title: string; products: any[] }> = ({ title, products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 lg:py-16">
      <div className="flex items-center justify-between mb-6 lg:mb-8 px-4">
        <h2 className="text-xl lg:text-3xl font-black text-serta-navy tracking-tight">{title}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 text-serta-navy transition-all">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll('right')} className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 text-serta-navy transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-4 lg:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map(product => (
          <div key={product.id} className="min-w-[260px] lg:min-w-[320px] snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const { lang, products, settings } = useApp();
  const t = TRANSLATIONS[lang];

  const bestSellers = products.filter(p => p.isBestSeller);
  const mattresses = products.filter(p => p.type?.[lang]?.toLowerCase().includes(lang === 'ka' ? 'მატრასი' : 'mattress'));
  const beds = products.filter(p => p.type?.[lang]?.toLowerCase().includes(lang === 'ka' ? 'საწოლი' : 'bed'));
  const pillows = products.filter(p => p.type?.[lang]?.toLowerCase().includes(lang === 'ka' ? 'ბალიში' : 'pillow'));
  const blankets = products.filter(p => p.type?.[lang]?.toLowerCase().includes(lang === 'ka' ? 'პლედი' : 'blanket'));

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = settings?.slides && Array.isArray(settings.slides) ? settings.slides : [];
  const menuItems = settings?.menuItems && Array.isArray(settings.menuItems) ? settings.menuItems : [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const benefits = [
    { icon: <Truck size={28} />, title: { ka: 'უფასო მიწოდება', en: 'Free Delivery' }, desc: { ka: 'თბილისის მასშტაბით', en: 'Across Tbilisi area' } },
    { icon: <ShieldCheck size={28} />, title: { ka: '10 წლიანი გარანტია', en: '10 Year Warranty' }, desc: { ka: 'ამერიკული ხარისხი', en: 'Uncompromising quality' } },
    { icon: <GemIcon size={28} />, title: { ka: 'პრემიუმ მასალები', en: 'Premium Materials' }, desc: { ka: 'ინოვაციური მასალები', en: 'Innovative sleep tech' } },
    { icon: <UserCheck size={28} />, title: { ka: 'ენდობა მილიონობით', en: 'Trusted by Millions' }, desc: { ka: 'მსოფლიო ბრენდი', en: 'Global industry leader' } }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="container mx-auto px-4 py-4 lg:py-8">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          {/* ვერტიკალური მენიუ - Sidebar */}
          <aside className="w-full md:w-64 lg:w-72 flex flex-col bg-white rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
            <div className="bg-serta-navy text-white p-4 lg:p-5 flex items-center gap-3">
              <Menu size={18} className="text-serta-yellow" />
              <span className="font-black uppercase text-[10px] lg:text-xs tracking-widest">
                {lang === 'ka' ? 'კატეგორიები' : 'Categories'}
              </span>
            </div>
            <nav className="flex-1 py-2">
              {menuItems.map((cat, idx) => {
                const Icon = IconMap[cat.iconName] || Layers;
                return (
                  <Link 
                    key={idx} 
                    to={cat.path}
                    className="flex items-center justify-between px-5 py-4 lg:px-6 lg:py-4.5 hover:bg-gray-50 transition-all group border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3 lg:gap-4 overflow-hidden">
                      <div className="text-serta-navy opacity-60 group-hover:opacity-100 transition-all">
                        <Icon size={20} />
                      </div>
                      <span className="font-bold text-xs lg:text-sm text-serta-navy group-hover:translate-x-1 transition-transform truncate">
                        {cat.name?.[lang]}
                      </span>
                    </div>
                    <ChevronRightIcon size={14} className="text-gray-300 group-hover:text-serta-navy transition-colors" />
                  </Link>
                );
              })}
            </nav>
            <div className="hidden lg:block p-6 border-t border-gray-50 bg-gray-50/20">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-300 tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                Premium Quality
              </div>
            </div>
          </aside>

          {/* სლაიდერი გვერდით */}
          <div className="flex-1 relative group rounded-2xl lg:rounded-3xl overflow-hidden bg-serta-navy h-[250px] sm:h-[400px] lg:h-[480px] shadow-lg">
            {slides.length > 0 ? slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img 
                  src={slide.image} 
                  alt={slide.title?.[lang]} 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center px-8 sm:px-16 lg:px-20">
                  <div className="max-w-md lg:max-w-xl text-white">
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-6 leading-tight tracking-tight">
                      {slide.title?.[lang]}
                    </h2>
                    <p className="text-xs sm:text-base lg:text-lg opacity-90 mb-6 sm:mb-10 font-medium leading-relaxed hidden sm:block">
                      {slide.subtitle?.[lang]}
                    </p>
                    <Link 
                      to="/shop" 
                      className="inline-flex items-center gap-3 bg-serta-yellow text-serta-navy px-6 py-3 sm:px-10 sm:py-4 rounded-xl lg:rounded-2xl font-black text-xs sm:text-sm hover:bg-white transition-all transform hover:scale-105 shadow-xl"
                    >
                      {t.hero.cta}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="w-full h-full flex items-center justify-center text-white/50 font-bold uppercase tracking-widest text-xs">
                No active slides
              </div>
            )}
            
            {slides.length > 1 && (
              <>
                <button onClick={prevSlide} className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40"><ChevronLeft size={24} /></button>
                <button onClick={nextSlide} className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40"><ChevronRight size={24} /></button>
                
                <div className="absolute bottom-6 right-10 flex gap-2">
                  {slides.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-10 bg-serta-yellow' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 lg:py-12 bg-white container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-5 lg:p-6 bg-gray-50/50 rounded-2xl lg:rounded-3xl transition-all hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-50">
              <div className="text-serta-navy shrink-0">{b.icon}</div>
              <div className="overflow-hidden">
                <h3 className="font-black text-xs lg:text-sm text-serta-navy mb-1 truncate">{b.title[lang]}</h3>
                <p className="text-gray-400 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest leading-none truncate">{b.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto">
        <ProductRow title={t.home.popular} products={bestSellers} />
        <ProductRow title={t.home.mattresses} products={mattresses} />
        <ProductRow title={t.home.beds} products={beds} />
        <ProductRow title={t.home.pillows} products={pillows} />
        <ProductRow title={t.home.blankets} products={blankets} />
      </div>
    </div>
  );
};

export default HomePage;