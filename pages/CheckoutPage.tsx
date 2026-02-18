import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store.tsx';
import { PRODUCTS, TRANSLATIONS } from '../constants.tsx';
import { CheckCircle2, ChevronLeft, CreditCard, Banknote } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { lang, cart, clearCart, products } = useApp();
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (isOrdered) {
    return (
      <div className="container mx-auto px-4 py-16 lg:py-32 text-center max-w-3xl animate-in fade-in zoom-in-95 duration-700">
        <div className="w-24 h-24 lg:w-32 lg:h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 lg:mb-10 shadow-inner">
          <CheckCircle2 size={56} className="lg:size-72" />
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-serta-navy mb-6 lg:mb-8 leading-tight tracking-tight">
          {lang === 'ka' ? 'მადლობა შეკვეთისთვის!' : 'Thank you for your order!'}
        </h1>
        <p className="text-base lg:text-xl text-gray-500 mb-10 lg:mb-16 font-medium leading-relaxed">
          {t.checkout.confirmation}
        </p>
        
        <div className="bg-white p-8 lg:p-12 rounded-3xl lg:rounded-[48px] text-left mb-10 lg:mb-16 shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-serta-navy/5 hidden sm:block">
            <Banknote size={120} />
          </div>
          <h3 className="font-black text-serta-navy mb-8 lg:mb-10 text-xl lg:text-2xl flex items-center gap-3">
             <CreditCard className="text-blue-600" />
             {lang === 'ka' ? 'საბანკო რეკვიზიტები' : 'Bank Transfer Details'}
          </h3>
          <div className="space-y-4 lg:space-y-6 font-mono text-sm lg:text-lg">
            <div className="bg-gray-50 p-4 rounded-xl lg:rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center">
              <span className="text-[10px] font-black uppercase text-gray-400 mb-1 sm:mb-0">Receiver</span> 
              <span className="font-bold text-serta-navy">Serta Georgia LLC</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl lg:rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center">
              <span className="text-[10px] font-black uppercase text-gray-400 mb-1 sm:mb-0">IBAN</span> 
              <span className="font-bold text-serta-navy select-all tracking-tighter">GE00TB0000000000000000</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl lg:rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center">
              <span className="text-[10px] font-black uppercase text-gray-400 mb-1 sm:mb-0">Bank</span> 
              <span className="font-bold text-serta-navy">TBC Bank</span>
            </div>
            <div className="bg-blue-600 p-5 lg:p-6 rounded-xl lg:rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center text-white">
              <span className="text-[10px] font-black uppercase text-white/60 mb-1 sm:mb-0 tracking-widest">Order Reference</span> 
              <span className="font-black text-xl lg:text-2xl">{Math.random().toString(36).substring(7).toUpperCase()}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="bg-serta-navy text-white px-10 py-5 lg:px-16 lg:py-6 rounded-2xl lg:rounded-[28px] font-black text-lg lg:text-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl"
        >
          {lang === 'ka' ? 'მთავარზე დაბრუნება' : 'Back to Home'}
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:py-20 max-w-7xl animate-in fade-in duration-500">
      <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-gray-400 hover:text-serta-navy mb-10 lg:mb-16 transition-all font-black uppercase text-[10px] tracking-widest">
        <ChevronLeft size={16} />
        {lang === 'ka' ? 'უკან' : 'Back to Cart'}
      </button>

      <h1 className="text-3xl lg:text-5xl font-black text-serta-navy mb-12 lg:mb-20 leading-none tracking-tight">{t.checkout.title}</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-10 lg:gap-20">
        <div className="lg:col-span-8 space-y-10 lg:space-y-16">
          {/* Details */}
          <section className="bg-white rounded-3xl lg:rounded-[40px] p-6 lg:p-10 border border-gray-50 shadow-sm">
            <h2 className="text-xl lg:text-2xl font-black mb-8 lg:mb-10 flex items-center gap-4 text-serta-navy">
              <span className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-[14px] bg-serta-navy text-white flex items-center justify-center text-[10px] lg:text-sm font-black shadow-lg shadow-serta-navy/20">1</span>
              {t.checkout.details}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-2">
                <label className="text-[9px] lg:text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">{t.checkout.firstName}</label>
                <input required className="w-full bg-gray-50 rounded-xl lg:rounded-2xl px-5 lg:px-6 py-3 lg:py-4 focus:ring-4 ring-serta-yellow/20 outline-none transition-all font-bold text-sm" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] lg:text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">{t.checkout.lastName}</label>
                <input required className="w-full bg-gray-50 rounded-xl lg:rounded-2xl px-5 lg:px-6 py-3 lg:py-4 focus:ring-4 ring-serta-yellow/20 outline-none transition-all font-bold text-sm" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] lg:text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">{t.checkout.phone}</label>
                <input required className="w-full bg-gray-50 rounded-xl lg:rounded-2xl px-5 lg:px-6 py-3 lg:py-4 focus:ring-4 ring-serta-yellow/20 outline-none transition-all font-bold text-sm" type="tel" placeholder="+995" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] lg:text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">{t.checkout.email}</label>
                <input required className="w-full bg-gray-50 rounded-xl lg:rounded-2xl px-5 lg:px-6 py-3 lg:py-4 focus:ring-4 ring-serta-yellow/20 outline-none transition-all font-bold text-sm" type="email" />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="bg-white rounded-3xl lg:rounded-[40px] p-6 lg:p-10 border border-gray-50 shadow-sm">
            <h2 className="text-xl lg:text-2xl font-black mb-8 lg:mb-10 flex items-center gap-4 text-serta-navy">
              <span className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-[14px] bg-serta-navy text-white flex items-center justify-center text-[10px] lg:text-sm font-black shadow-lg shadow-serta-navy/20">2</span>
              {t.checkout.address}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-2">
                <label className="text-[9px] lg:text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">{t.checkout.city}</label>
                <input required className="w-full bg-gray-50 rounded-xl lg:rounded-2xl px-5 lg:px-6 py-3 lg:py-4 focus:ring-4 ring-serta-yellow/20 outline-none transition-all font-bold text-sm" type="text" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-[9px] lg:text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">{t.checkout.street}</label>
                <input required className="w-full bg-gray-50 rounded-xl lg:rounded-2xl px-5 lg:px-6 py-3 lg:py-4 focus:ring-4 ring-serta-yellow/20 outline-none transition-all font-bold text-sm" type="text" />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-white rounded-3xl lg:rounded-[40px] p-6 lg:p-10 border border-gray-50 shadow-sm">
            <h2 className="text-xl lg:text-2xl font-black mb-8 lg:mb-10 flex items-center gap-4 text-serta-navy">
              <span className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-[14px] bg-serta-navy text-white flex items-center justify-center text-[10px] lg:text-sm font-black shadow-lg shadow-serta-navy/20">3</span>
              {t.checkout.paymentMethod}
            </h2>
            <div className="border-2 lg:border-4 border-serta-navy p-6 lg:p-8 rounded-2xl lg:rounded-[32px] flex items-center gap-4 lg:gap-6 bg-blue-50/50 shadow-lg">
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-4 lg:border-8 border-serta-navy flex-shrink-0"></div>
              <div className="flex-1">
                <div className="font-black text-lg lg:text-2xl text-serta-navy mb-1">{t.checkout.bankTransfer}</div>
                <p className="text-[10px] lg:text-sm font-bold opacity-60 leading-relaxed">{t.cart.info}</p>
              </div>
              <div className="hidden sm:block text-serta-navy opacity-30">
                 <CreditCard size={40} />
              </div>
            </div>
          </section>
        </div>

        {/* Order Info Summary */}
        <aside className="lg:col-span-4">
          <div className="bg-serta-gray/50 p-8 lg:p-10 rounded-[32px] lg:rounded-[48px] sticky top-28 shadow-inner border border-gray-100">
            <h2 className="text-xl lg:text-2xl font-black text-serta-navy mb-8 lg:mb-10 uppercase tracking-tight">{lang === 'ka' ? 'შეკვეთის დეტალები' : 'Order Summary'}</h2>
            <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-10 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              {cart.map(item => {
                const p = products.find(prod => prod.id === item.productId) || PRODUCTS.find(prod => prod.id === item.productId);
                const currentPrice = p?.sizePrices.find(sp => sp.size === item.selectedSize)?.price || 0;
                return (
                  <div key={`${item.productId}-${item.selectedSize}`} className="flex justify-between items-start gap-4">
                    <div className="flex flex-col">
                       <span className="font-black text-serta-navy leading-tight text-sm">{p?.name[lang]}</span>
                       <span className="text-[9px] font-black uppercase text-gray-400 mt-1">{item.selectedSize} CM x{item.quantity}</span>
                    </div>
                    <span className="font-black text-serta-navy whitespace-nowrap text-sm">{currentPrice * item.quantity} ₾</span>
                  </div>
                );
              })}
            </div>
            <div className="h-[1px] bg-gray-200 my-6 lg:my-8"></div>
            <div className="flex justify-between items-end mb-8 lg:mb-10">
              <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">{t.cart.total}</span>
              <span className="text-3xl lg:text-4xl font-black text-serta-navy">
                {cart.reduce((acc, curr) => {
                  const p = products.find(prod => prod.id === curr.productId) || PRODUCTS.find(prod => prod.id === curr.productId);
                  const currentPrice = p?.sizePrices.find(sp => sp.size === curr.selectedSize)?.price || 0;
                  return acc + currentPrice * curr.quantity;
                }, 0)} <span className="text-lg lg:text-xl font-medium">₾</span>
              </span>
            </div>
            <button 
              type="submit"
              className="w-full bg-serta-navy text-white py-5 lg:py-6 rounded-xl lg:rounded-[24px] font-black text-lg lg:text-xl hover:bg-blue-800 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-serta-navy/20"
            >
              {t.checkout.submit}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default CheckoutPage;