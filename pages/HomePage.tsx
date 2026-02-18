
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store';
import { TRANSLATIONS } from '../constants';
import ProductCard from '../components/ProductCard';
// Added Activity to the imports to fix "Cannot find name 'Activity'" error on line 83
import { 
  Truck, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight,
  Layers, Bed, Cloud, Wind, Award, Sparkles, Moon, Clock, Search,
  Zap, Heart, Star, LayoutGrid, ChevronRight as ChevronIcon,
  Activity
} from 'lucide-react';

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
    <section className="py-12 lg:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl lg:text-4xl font-black text-serta-navy uppercase tracking-tight">{title}</h2>
            <div className="h-1 w-16 bg-serta-yellow mt-3 rounded-full"></div>
          </div>
          <div className="hidden sm:flex gap-3">
            <button onClick={() => scroll('left')} className="p-3 rounded-full border border-gray-200 hover:bg-serta-navy hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="p-3 rounded-full border border-gray-200 hover:bg-serta-navy hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 -mx-6 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => (
            <div key={product.id} className="min-w-[300px] lg:min-w-[400px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const { lang, products, settings } = useApp();
  const t = TRANSLATIONS[lang];

  const bestSellers = products.filter(p => p.isBestSeller);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fix: Ensure slides are never an empty array even if settings.slides exists but is empty
  const slides = (settings?.slides && settings.slides.length > 0) ? settings.slides : [
    {
      image: 'https://images.unsplash.com/photo-1505693419148-ad3b17692df5?q=80&w=2070&auto=format&fit=crop',
      title: { ka: 'შეიცანით სრულყოფილი ძილი', en: 'Experience Ultimate Comfort' },
      subtitle: { ka: 'Serta-ს 90 წლიანი ამერიკული გამოცდილება ახლა საქართველოშია.', en: '90 years of American sleep expertise, now available in Georgia.' }
    },
    {
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop',
      title: { ka: 'iComfort Eco™ კოლექცია', en: 'iComfort Eco™ Collection' },
      subtitle: { ka: 'ეკოლოგიურად სუფთა მასალები და გამაგრილებელი ტექნოლოგია.', en: 'Eco-friendly materials and advanced cooling technology.' }
    }
  ];

  const categories = [
    { name: { ka: 'ჰიბრიდული', en: 'Hybrid' }, icon: <Layers size={18} />, path: '/shop?category=Hybrid' },
    { name: { ka: 'მეხსიერების ქაფი', en: 'Memory Foam' }, icon: <Cloud size={18} />, path: '/shop?category=Memory Foam' },
    { name: { ka: 'ზამბარებიანი', en: 'Spring' }, icon: <Bed size={18} />, path: '/shop?category=Spring' },
    { name: { ka: 'ორთოპედიული', en: 'Orthopedic' }, icon: <Activity size={18} />, path: '/shop?category=Orthopedic' },
    { name: { ka: 'აქსესუარები', en: 'Accessories' }, icon: <Sparkles size={18} />, path: '/shop' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-white">
      {/* Hero Section with Vertical Category Menu */}
      <section className="bg-white lg:py-6">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px]">
            
            {/* Vertical Category Sidebar (Desktop Only) */}
            <aside className="hidden lg:flex flex-col w-72 bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-serta-navy/5 overflow-hidden">
              <div className="p-6 bg-serta-navy text-white flex items-center gap-3">
                <LayoutGrid size={20} className="text-serta-yellow" />
                <span className="font-black uppercase text-xs tracking-widest">{lang === 'ka' ? 'კატეგორიები' : 'Categories'}</span>
              </div>
              <nav className="flex-1 py-4">
                {categories.map((cat, idx) => (
                  <Link 
                    key={idx} 
                    to={cat.path} 
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 text-serta-navy transition-all group border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                        {cat.icon}
                      </div>
                      <span className="font-bold text-sm">{cat.name[lang]}</span>
                    </div>
                    <ChevronIcon size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </nav>
              <div className="p-6 mt-auto">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                  <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">{lang === 'ka' ? 'ცხელი ხაზი' : 'Hotline'}</p>
                  <p className="font-black text-serta-navy text-sm">{settings.contactPhone}</p>
                </div>
              </div>
            </aside>

            {/* Slider Component */}
            <div className="flex-1 relative rounded-[32px] lg:rounded-[40px] bg-serta-navy overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                >
                  <img 
                    src={slide.image} 
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ${index === currentSlide ? 'scale-110' : 'scale-100'}`} 
                    alt="Serta Hero" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-serta-navy/90 via-serta-navy/40 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center px-8 lg:px-20">
                    <div className="max-w-xl text-white">
                      <div className="inline-flex items-center gap-2 bg-serta-yellow text-serta-navy px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-serta-yellow/20">
                        <Award size={14} />
                        #1 America's Mattress Brand
                      </div>
                      <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
                        {slide.title?.[lang]}
                      </h1>
                      <p className="text-base lg:text-lg opacity-80 mb-10 font-medium leading-relaxed max-w-lg">
                        {slide.subtitle?.[lang]}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/shop" className="inline-flex items-center justify-center gap-3 bg-serta-yellow text-serta-navy px-10 py-5 rounded-full font-black text-xs hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl active:scale-95 uppercase tracking-widest">
                          {t.hero.cta}
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Slider Dots */}
              <div className="absolute bottom-8 left-8 lg:left-20 flex gap-2">
                {slides.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 transition-all rounded-full ${i === currentSlide ? 'w-8 bg-serta-yellow' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>

              {/* Slider Arrows (Desktop) */}
              <div className="absolute right-10 bottom-10 hidden lg:flex gap-3">
                 <button onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)} className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-serta-yellow hover:text-serta-navy transition-all">
                    <ChevronLeft size={20} />
                 </button>
                 <button onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)} className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-serta-yellow hover:text-serta-navy transition-all">
                    <ChevronRight size={20} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="py-12 border-b border-gray-100 bg-gray-50/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Truck size={24} />, title: t.product.delivery, desc: { ka: 'უფასო 2000₾-დან', en: 'Free over 2000₾' } },
              { icon: <Clock size={24} />, title: t.product.trial, desc: { ka: 'გარანტირებული', en: 'Guaranteed' } },
              { icon: <ShieldCheck size={24} />, title: { ka: '10-15 წელი', en: '10-15 Years' }, desc: { ka: 'გარანტია', en: 'Warranty' } },
              { icon: <Moon size={24} />, title: { ka: 'პრემიუმ ძილი', en: 'Deep Sleep' }, desc: { ka: 'NASA-ს ტექნოლოგია', en: 'NASA Technology' } }
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-serta-navy group-hover:bg-serta-yellow transition-all duration-300">
                  {b.icon}
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-tight text-serta-navy">{b.title[lang] || b.title}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{b.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <ProductRow title={t.home.popular} products={bestSellers} />

      {/* Interactive Sleep Finder Callout */}
      <section className="py-12 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="bg-serta-navy rounded-[40px] lg:rounded-[64px] overflow-hidden relative min-h-[400px] flex items-center p-8 lg:p-20 group">
            <img 
              src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110" 
              alt="Background"
            />
            <div className="relative z-10 max-w-2xl text-white">
              <h2 className="text-3xl lg:text-6xl font-black mb-6 uppercase tracking-tighter leading-none">
                {t.home.quizTitle}
              </h2>
              <p className="text-lg lg:text-xl opacity-70 mb-10 font-medium">
                {t.home.quizSubtitle}
              </p>
              <button className="bg-serta-yellow text-serta-navy px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3">
                <Search size={18} />
                {t.home.quizButton}
              </button>
            </div>
            <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2">
                <div className="w-80 h-80 border-4 border-serta-yellow/20 rounded-full flex items-center justify-center animate-pulse">
                   <Bed size={80} className="text-serta-yellow" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid at bottom */}
      <section className="py-12 lg:py-24 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-serta-navy uppercase tracking-tighter mb-4">{t.home.trustTitle}</h2>
          <p className="text-gray-500 font-medium">{lang === 'ka' ? 'აღმოაჩინეთ რატომ არის Serta ყველაზე სანდო ბრენდი ამერიკაში' : 'Discover why Serta is the most trusted mattress brand in America'}</p>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: { ka: 'ჰიბრიდული სისტემები', en: 'Hybrid Systems' }, desc: { ka: 'ზამბარებისა და ქაფის საუკეთესო კომბინაცია', en: 'The best combination of coils and foam' }, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop' },
             { title: { ka: 'გაგრილების ტექნოლოგია', en: 'Cooling Technology' }, desc: { ka: 'აქტიური თერმორეგულაცია Reactex®-ით', en: 'Active thermoregulation with Reactex®' }, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop' },
             { title: { ka: 'ორთოპედიული მხარდაჭერა', en: 'Orthopedic Support' }, desc: { ka: 'ექიმების მიერ რეკომენდებული ძილი', en: 'Doctor recommended sleep systems' }, img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop' }
           ].map((c, i) => (
             <div key={i} className="group relative h-96 rounded-[32px] overflow-hidden shadow-xl cursor-pointer">
               <img src={c.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={c.title[lang]} />
               <div className="absolute inset-0 bg-gradient-to-t from-serta-navy/90 via-serta-navy/20 to-transparent p-10 flex flex-col justify-end">
                 <h3 className="text-white text-2xl font-black mb-3">{c.title[lang]}</h3>
                 <p className="text-white/60 text-sm font-medium mb-6">{c.desc[lang]}</p>
                 <Link to="/shop" className="text-serta-yellow font-black uppercase text-[10px] tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore <ArrowRight size={14} />
                 </Link>
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
