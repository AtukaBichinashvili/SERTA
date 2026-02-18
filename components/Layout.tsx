import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store.tsx';
import { TRANSLATIONS } from '../constants.tsx';
import { ShoppingCart, Heart, Layers, Menu, X, Search, Globe, Settings, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const { lang, setLang, cart, wishlist, comparisonList, settings } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const t = TRANSLATIONS[lang];

  // Reset error state if logoUrl changes
  useEffect(() => {
    setLogoError(false);
  }, [settings.logoUrl]);

  const Logo = () => (
    <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
      {settings.logoUrl && !logoError ? (
        <img 
          src={settings.logoUrl} 
          alt="Serta Logo" 
          className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-all group-hover:brightness-110" 
          onError={() => setLogoError(true)}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="bg-serta-navy text-white px-3 py-1 lg:px-4 lg:py-1.5 font-bold italic text-xl lg:text-3xl tracking-tighter shadow-sm">Serta</div>
          <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-serta-yellow flex-shrink-0 animate-pulse"></div>
        </div>
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 backdrop-blur-md bg-white/90">
      <div className="max-w-[1140px] mx-auto px-4 lg:px-6 h-20 lg:h-28 flex items-center justify-between">
        <Logo />

        {/* Search Bar - Desktop only */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder={lang === 'ka' ? 'ძიება...' : 'Search...'} 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 pl-11 focus:ring-2 ring-serta-navy/5 focus:bg-white outline-none font-medium transition-all"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Navigation - Tablet/Desktop only */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 font-bold text-[10px] lg:text-xs text-serta-navy uppercase tracking-tight">
          <Link to="/shop" className="hover:text-blue-700 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-serta-yellow hover:after:w-full after:transition-all">{t.nav.shop}</Link>
          <Link to="/about" className="hover:text-blue-700 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-serta-yellow hover:after:w-full after:transition-all">{t.nav.about}</Link>
          <Link to="/warranty" className="hover:text-blue-700 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-serta-yellow hover:after:w-full after:transition-all">{t.nav.warranty}</Link>
        </nav>

        <div className="flex items-center gap-2 lg:gap-3 ml-2 lg:ml-4">
          {/* Comparison - Tablet/Desktop only */}
          <Link to="/comparison" className="relative p-2 text-serta-navy hover:bg-gray-100 rounded-xl transition-all">
            <Layers size={20} />
            {comparisonList.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-serta-yellow text-serta-navy text-[9px] font-black flex items-center justify-center rounded-full shadow-sm">
                {comparisonList.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative flex items-center gap-2 bg-serta-navy text-white px-3 py-2 lg:px-5 lg:py-3 rounded-2xl hover:bg-blue-900 transition-all shadow-lg shadow-serta-navy/10 active:scale-95">
            <ShoppingCart size={18} />
            <span className="font-bold text-xs hidden sm:inline">{lang === 'ka' ? 'კალათა' : 'Cart'}</span>
            {cart.length > 0 && (
              <span className="w-4 h-4 bg-serta-yellow text-serta-navy text-[9px] font-black flex items-center justify-center rounded-full">
                {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            )}
          </Link>

          <div className="hidden sm:block h-8 w-[1px] bg-gray-100 mx-1 lg:mx-2"></div>

          {/* Lang Toggle - Desktop or specifically styled for mobile */}
          <button 
            onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}
            className="flex items-center gap-1 px-2 py-1.5 lg:px-3 lg:py-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-[9px] lg:text-[10px] font-black uppercase text-serta-navy"
          >
            <Globe size={14} className="text-gray-400" />
            {lang === 'ka' ? 'EN' : 'KA'}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-serta-navy"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top duration-300">
          <Link to="/shop" className="text-xl font-bold text-serta-navy" onClick={() => setIsMenuOpen(false)}>{t.nav.shop}</Link>
          <Link to="/about" className="text-xl font-bold text-serta-navy" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</Link>
          <Link to="/warranty" className="text-xl font-bold text-serta-navy" onClick={() => setIsMenuOpen(false)}>{t.nav.warranty}</Link>
          <Link to="/comparison" className="text-xl font-bold text-serta-navy" onClick={() => setIsMenuOpen(false)}>{t.nav.comparison}</Link>
          <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder={lang === 'ka' ? 'ძიება...' : 'Search...'} 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 pl-11 outline-none"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  const { lang, settings } = useApp();
  const [footerLogoError, setFooterLogoError] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    setFooterLogoError(false);
  }, [settings.logoUrl]);

  return (
    <footer className="bg-white text-serta-navy pt-16 lg:pt-24 pb-12 border-t border-gray-50">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 lg:mb-20">
          <div>
            <Link to="/" className="inline-block mb-6 lg:mb-8 transition-transform hover:scale-105">
              {settings.logoUrl && !footerLogoError ? (
                <img 
                  src={settings.logoUrl} 
                  alt="Serta Logo" 
                  className="h-10 lg:h-12 w-auto object-contain" 
                  onError={() => setFooterLogoError(true)}
                />
              ) : (
                <div className="bg-serta-navy text-white px-4 py-1.5 font-bold italic text-2xl lg:text-3xl tracking-tighter inline-block">Serta</div>
              )}
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {lang === 'ka' ? 'მატრასების ინოვაციების ლიდერი 90 წელზე მეტია. კომფორტი და ხარისხი, რომელსაც ენდობით.' : 'Leading the way in mattress innovation for over 90 years. Comfort and quality you can trust.'}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] lg:text-xs font-black mb-6 lg:mb-8 text-gray-300 uppercase tracking-widest">{t.nav.shop}</h4>
            <ul className="space-y-3 lg:space-y-4 font-bold text-sm">
              <li><Link to="/shop" className="hover:text-blue-700 transition-colors">{lang === 'ka' ? 'ყველა მატრასი' : 'All Mattresses'}</Link></li>
              <li><Link to="/shop" className="hover:text-blue-700 transition-colors">{lang === 'ka' ? 'ჰიბრიდული მოდელები' : 'Hybrid Models'}</Link></li>
              <li><Link to="/shop" className="hover:text-blue-700 transition-colors">{lang === 'ka' ? 'მეხსიერების ქაფი' : 'Memory Foam'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] lg:text-xs font-black mb-6 lg:mb-8 text-gray-300 uppercase tracking-widest">{lang === 'ka' ? 'მხარდაჭერა' : 'Support'}</h4>
            <ul className="space-y-3 lg:space-y-4 font-bold text-sm">
              <li><Link to="/warranty" className="hover:text-blue-700 transition-colors">{t.nav.warranty}</Link></li>
              <li><Link to="/shop" className="hover:text-blue-700 transition-colors">{lang === 'ka' ? 'მიწოდება და დაბრუნება' : 'Delivery & Returns'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] lg:text-xs font-black mb-6 lg:mb-8 text-gray-300 uppercase tracking-widest">{lang === 'ka' ? 'კონტაქტი' : 'Contact'}</h4>
            <div className="space-y-4 lg:space-y-5 font-bold text-sm">
              <p className="flex items-center gap-4"><Phone size={18} className="text-serta-navy" /> {settings.contactPhone}</p>
              <p className="text-gray-400 font-medium break-all">{settings.contactEmail}</p>
              <Link to="/admin" className="flex items-center gap-2 text-serta-navy/30 hover:text-serta-navy transition-colors text-[10px] uppercase font-black tracking-widest pt-4">
                <Settings size={14} /> {t.nav.admin}
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-8 text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-gray-400">
          <p className="text-center md:text-left">© 2024 Serta Georgia. {lang === 'ka' ? 'ყველა უფლება დაცულია.' : 'All rights reserved.'}</p>
          <div className="flex gap-10">
            <span className="hover:text-serta-navy cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-serta-navy cursor-pointer transition-colors">Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="min-h-[70vh] bg-white max-w-[1140px] mx-auto overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;