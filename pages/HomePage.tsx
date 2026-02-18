
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store.tsx';
import { TRANSLATIONS } from '../constants.tsx';
import ProductCard from '../components/ProductCard.tsx';
import { 
  Truck, ShieldCheck, UserCheck, ArrowRight, ChevronLeft, ChevronRight,
  Menu, Layers, Bed, Cloud, Wind, ChevronRight as ChevronRightIcon,
  Award, Sparkles, Moon
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
  if (!products || products.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 lg:py-20">
      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-black text-serta-navy tracking-tight uppercase">{title}</h2>
          <div className="h-1.5 w-20 bg-serta-yellow mt-2 rounded-full"></div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => scroll('left')} className="p-3 rounded-2xl border border-gray-100 hover:bg-serta-navy hover:text-white transition-all shadow-sm">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scroll('right')} className="p-3 rounded-2xl border border-gray-100 hover:bg-serta-navy hover:text-white transition-all shadow-sm">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-6 lg:gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map(product => (
          <div key={product.id} className="min-w-[280px] lg:min-w-[360px] snap-start">
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = settings?.slides || [];
  const menuItems = settings?.menuItems || [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-72 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 hidden md:flex flex-col">
            <div className="bg-serta-navy text-white p-6 flex items-center gap-3">
              <Menu size={18} className="text-serta-yellow" />
              <span className="font-black uppercase text-[10px] tracking-widest">{lang === 'ka' ? 'კატეგორიები' : 'Categories'}</span>
            </div>
            <nav className="flex-1 py-4">
              {menuItems.map((cat, idx) => {
                const Icon = IconMap[cat.iconName] || Layers;
                return (
                  <Link key={idx} to={cat.path} className="flex items-center justify-between px-8 py-5 hover:bg-gray-50 transition-all group border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-4">
                      <Icon size={20} className="text-serta-navy opacity-40 group-hover:opacity-100 transition-all" />
                      <span className="font-bold text-sm text-serta-navy group-hover:translate-x-1 transition-transform">{cat.name?.[lang]}</span>
                    </div>
                    <ChevronRightIcon size={14} className="text-gray-300 group-hover:text-serta-navy transition-colors" />
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="flex-1 relative rounded-[40px] overflow-hidden bg-serta-navy h-[300px] sm:h-[450px] lg:h-[550px] shadow-2xl group">
            {slides.map((slide, index) => (
              <div key={index} className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
                <img src={slide.image} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center px-10 sm:px-20">
                  <div className="max-w-2xl text-white">
                    <div className="flex items-center gap-3 mb-6 animate-in slide-in-from-left duration-700">
                       <Award size={24} className="text-serta-yellow" />
                       <span className="text-xs font-black uppercase tracking-widest text-serta-yellow">World's Best Mattress</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
                      {slide.title?.[lang]}
                    </h2>
                    <p className="text-sm sm:text-lg lg:text-xl opacity-80 mb-10 font-medium leading-relaxed hidden sm:block">
                      {slide.subtitle?.[lang]}
                    </p>
                    <Link to="/shop" className="inline-flex items-center gap-4 bg-serta-yellow text-serta-navy px-10 py-5 rounded-[24px] font-black text-sm hover:bg-white transition-all transform hover:scale-105 shadow-2xl active:scale-95">
                      {t.hero.cta}
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Truck size={32} />, title: { ka: 'უფასო მიწოდება', en: 'Free Delivery' }, desc: { ka: 'საქართველოს მასშტაბით', en: 'Nationwide' } },
            { icon: <ShieldCheck size={32} />, title: { ka: '10 წლიანი გარანტია', en: '10 Year Warranty' }, desc: { ka: 'ავთენტური ხარისხი', en: 'Authentic Quality' } },
            { icon: <Sparkles size={32} />, title: { ka: 'პრემიუმ მასალები', en: 'Premium Materials' }, desc: { ka: 'NASA-ს ტექნოლოგია', en: 'NASA Technology' } },
            { icon: <Moon size={32} />, title: { ka: 'მშვიდი ძილი', en: 'Deep Sleep' }, desc: { ka: 'იდეალური მხარდაჭერა', en: 'Perfect Support' } }
          ].map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 p-8 bg-gray-50/50 rounded-[32px] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
              <div className="text-serta-navy bg-white p-4 rounded-2xl shadow-sm">{b.icon}</div>
              <div>
                <h3 className="font-black text-sm text-serta-navy mb-1 uppercase tracking-tight">{b.title[lang]}</h3>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{b.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto">
        <ProductRow title={t.home.popular} products={bestSellers} />
        
        {/* Banner Section */}
        <section className="px-4 py-12">
          <div className="bg-serta-navy rounded-[48px] overflow-hidden relative p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-serta-yellow/5 -skew-x-12 translate-x-1/2"></div>
            <div className="relative z-10 text-white max-w-xl text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl font-black mb-6 uppercase tracking-tighter leading-none">Healthy Spine, <br/><span className="text-serta-yellow">Better Life.</span></h2>
              <p className="text-lg opacity-70 mb-10 font-medium">ჩვენი ორთოპედიული სისტემები სპეციალურად შექმნილია ხერხემლის მაქსიმალური მხარდაჭერისთვის.</p>
              <Link to="/shop" className="bg-white text-serta-navy px-12 py-5 rounded-[24px] font-black uppercase text-xs tracking-widest hover:bg-serta-yellow transition-all">Learn More</Link>
            </div>
            <div className="relative z-10 flex-1">
               <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop" className="rounded-[32px] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700" />
            </div>
          </div>
        </section>

        <ProductRow title={t.home.mattresses} products={mattresses} />
      </div>
    </div>
  );
};

export default HomePage;
