
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../store';
import { TRANSLATIONS } from '../constants';
import { ShoppingCart, Heart, Layers, Menu, X, Search, Globe, Settings, Phone, ArrowRight } from 'lucide-react';

const Header: React.FC = () => {
  const { lang, setLang, cart, wishlist, comparisonList, settings } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    setLogoError(false);
    setIsMenuOpen(false);
  }, [settings.logoUrl, location.pathname]);

  const Logo = () => (
    <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
      {settings.logoUrl && !logoError ? (
        <img 
          src={settings.logoUrl} 
          alt="Serta Logo" 
          className="h-8 sm:h-10 lg:h-12 w-auto object-contain transition-all group-hover:brightness-110" 
          onError={() => setLogoError(true)}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="bg-serta-navy text-white px-3 py-1 font-bold italic text-xl lg:text-2xl tracking-tighter shadow-sm">Serta</div>
          <div className="w-5 h-5 rounded-full border-2 border-serta-yellow animate-pulse"></div>
        </div>
      )}
    </Link>
  );

  return (
    <>
      <div className="bg-serta-navy text-white text-[10px] lg:text-xs py-2 text-center font-bold tracking-widest uppercase">
        {t.nav.promo}
      </div>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-16 lg:h-24 flex items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-10 font-bold text-[11px] text-serta-navy uppercase tracking-widest">
            <Link to="/shop" className={`hover:text-blue-700 transition-all ${location.pathname === '/shop' ? 'text-blue-700' : ''}`}>{t.nav.shop}</Link>
            <Link to="/comparison" className={`hover:text-blue-700 transition-all ${location.pathname === '/comparison' ? 'text-blue-700' : ''}`}>{t.nav.comparison}</Link>
            <Link to="/about" className="hover:text-blue-700 transition-all">{t.nav.about}</Link>
            <Link to="/warranty" className="hover:text-blue-700 transition-all">{t.nav.warranty}</Link>
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden sm:flex items-center gap-4 mr-4">
              <Link to="/comparison" className="relative p-2 text-serta-navy hover:bg-gray-100 rounded-full transition-all">
                <Layers size={18} />
                {comparisonList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-serta-yellow text-serta-navy text-[9px] font-black flex items-center justify-center rounded-full shadow-md border border-white">
                    {comparisonList.length}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-100 hover:bg-gray-50 transition-all text-[10px] font-black uppercase text-serta-navy"
              >
                <Globe size={14} />
                {lang === 'ka' ? 'EN' : 'KA'}
              </button>
            </div>

            <Link to="/cart" className="relative flex items-center gap-2.5 bg-serta-navy text-white px-4 py-2 lg:px-6 lg:py-3.5 rounded-full hover:bg-blue-950 transition-all shadow-xl shadow-serta-navy/10 active:scale-95">
              <ShoppingCart size={18} />
              <span className="font-bold text-xs hidden sm:inline">{lang === 'ka' ? 'კალათა' : 'Cart'}</span>
              {cart.length > 0 && (
                <span className="w-5 h-5 bg-serta-yellow text-serta-navy text-[10px] font-black flex items-center justify-center rounded-full border-2 border-serta-navy">
                  {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-serta-navy"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 lg:hidden bg-white z-[100] p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link to="/shop" className="text-2xl font-black text-serta-navy border-b border-gray-50 pb-4">{t.nav.shop}</Link>
            <Link to="/comparison" className="text-2xl font-black text-serta-navy border-b border-gray-50 pb-4">{t.nav.comparison}</Link>
            <Link to="/about" className="text-2xl font-black text-serta-navy border-b border-gray-50 pb-4">{t.nav.about}</Link>
            <Link to="/warranty" className="text-2xl font-black text-serta-navy border-b border-gray-50 pb-4">{t.nav.warranty}</Link>
            
            <div className="mt-auto flex flex-col gap-4">
               <button 
                onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl font-black text-xs uppercase"
              >
                <div className="flex items-center gap-2">
                  <Globe size={18} />
                  {lang === 'ka' ? 'Switch to English' : 'გადართვა ქართულზე'}
                </div>
                <span>{lang === 'ka' ? 'EN' : 'KA'}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-400 font-bold p-2">
                <Phone size={16} />
                {settings.contactPhone}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

const Footer: React.FC = () => {
  const { lang, settings } = useApp();
  const [footerLogoError, setFooterLogoError] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-gray-50 text-serta-navy pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link to="/">
              {settings.logoUrl && !footerLogoError ? (
                <img src={settings.logoUrl} alt="Serta" className="h-10 w-auto" onError={() => setFooterLogoError(true)} />
              ) : (
                <div className="bg-serta-navy text-white px-4 py-1.5 font-bold italic text-2xl tracking-tighter inline-block">Serta</div>
              )}
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
              {lang === 'ka' ? 'Serta მსოფლიო ლიდერია მატრასების წარმოებაში. ჩვენი მიზანია დაგეხმაროთ იდეალური ძილის პოვნაში.' : 'Serta is a world leader in sleep systems. Our mission is to help you find the perfect rest for a healthier life.'}
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-black mb-8 text-gray-400 uppercase tracking-widest">{t.nav.shop}</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link to="/shop" className="hover:text-blue-700 transition-all">{lang === 'ka' ? 'კოლექციები' : 'Collections'}</Link></li>
              <li><Link to="/comparison" className="hover:text-blue-700 transition-all">{t.nav.comparison}</Link></li>
              <li><Link to="/shop" className="hover:text-blue-700 transition-all">{lang === 'ka' ? 'აქსესუარები' : 'Accessories'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-black mb-8 text-gray-400 uppercase tracking-widest">{lang === 'ka' ? 'მხარდაჭერა' : 'Support'}</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link to="/warranty" className="hover:text-blue-700 transition-all">{t.nav.warranty}</Link></li>
              <li><Link to="/about" className="hover:text-blue-700 transition-all">{lang === 'ka' ? 'კონტაქტი' : 'Contact'}</Link></li>
              <li><Link to="/admin" className="hover:text-blue-700 transition-all">{t.nav.admin}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-black mb-8 text-gray-400 uppercase tracking-widest">{lang === 'ka' ? 'დაგვიკავშირდით' : 'Contact Us'}</h4>
            <div className="space-y-4">
              <a href={`tel:${settings.contactPhone}`} className="flex items-center gap-3 font-black text-lg hover:text-blue-700 transition-all">
                <Phone size={20} />
                {settings.contactPhone}
              </a>
              <p className="text-gray-400 font-medium text-sm">{settings.contactEmail}</p>
              <div className="pt-4 flex gap-4">
                {/* Social icons could go here */}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <p>© 2024 Serta Georgia. {lang === 'ka' ? 'ყველა უფლება დაცულია' : 'All Rights Reserved'}</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white selection:bg-serta-yellow selection:text-serta-navy">
      <Header />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
