import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store.tsx';
import { PRODUCTS, TRANSLATIONS } from '../constants.tsx';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage: React.FC = () => {
  const { lang, cart, updateQuantity, removeFromCart, products } = useApp();
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();

  const cartDetails = cart.map(item => {
    const product = products.find(prod => prod.id === item.productId) || PRODUCTS.find(prod => prod.id === item.productId);
    const sizeData = product?.sizePrices.find(sp => sp.size === item.selectedSize);
    return { ...item, product: product!, price: sizeData?.price || 0 };
  });

  const subtotal = cartDetails.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 lg:py-40 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 lg:mb-10 text-gray-200">
          <ShoppingBag size={48} className="lg:size-64" />
        </div>
        <h2 className="text-2xl lg:text-4xl font-black text-serta-navy mb-4 lg:mb-6">{t.cart.empty}</h2>
        <Link to="/shop" className="inline-flex items-center gap-2 text-blue-600 font-black text-base lg:text-lg hover:underline transition-all">
          {t.cart.returnToShop}
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:py-20 animate-in fade-in duration-500">
      <h1 className="text-3xl lg:text-5xl font-black text-serta-navy mb-10 lg:mb-16">{t.cart.title}</h1>
      
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <div className="flex-1 space-y-6 lg:space-y-8">
          {cartDetails.map((item) => (
            <div key={`${item.productId}-${item.selectedSize}`} className="flex flex-col sm:flex-row items-center gap-6 lg:gap-8 p-6 lg:p-8 border border-gray-100 rounded-3xl lg:rounded-[32px] bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="w-32 h-24 lg:w-40 lg:h-32 rounded-xl lg:rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                <img src={item.product.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-black text-serta-navy text-lg lg:text-2xl mb-1 lg:mb-2">{item.product.name[lang]}</h3>
                <p className="text-[10px] lg:text-sm text-gray-400 font-bold uppercase tracking-widest">{item.selectedSize} {t.product.cm} • {item.product.type[lang]}</p>
              </div>
              <div className="flex items-center gap-4 lg:gap-6 bg-gray-100 p-2 rounded-xl lg:rounded-2xl">
                <button 
                  onClick={() => updateQuantity(item.productId, item.selectedSize, -1)}
                  className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-lg lg:rounded-xl shadow-sm flex items-center justify-center hover:bg-serta-yellow transition-all transform active:scale-90"
                >
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center font-black text-base lg:text-lg">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.productId, item.selectedSize, 1)}
                  className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-lg lg:rounded-xl shadow-sm flex items-center justify-center hover:bg-serta-yellow transition-all transform active:scale-90"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="font-black text-serta-navy text-xl lg:text-2xl w-24 lg:w-32 text-center sm:text-right">
                {item.price * item.quantity} ₾
              </div>
              <button 
                onClick={() => removeFromCart(item.productId, item.selectedSize)}
                className="p-3 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))}
          
          <div className="bg-blue-50/50 p-6 lg:p-8 rounded-3xl lg:rounded-[32px] flex items-start gap-4 lg:gap-6 border border-blue-100/50">
            <div className="bg-serta-navy text-white w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg lg:rounded-xl flex-shrink-0 font-black text-xs lg:text-base">!</div>
            <p className="text-sm lg:text-lg font-bold text-serta-navy opacity-80">{t.cart.info}</p>
          </div>
        </div>

        <aside className="lg:w-[400px]">
          <div className="bg-serta-navy text-white p-8 lg:p-12 rounded-[32px] lg:rounded-[48px] shadow-2xl border border-white/5 overflow-hidden">
            <h2 className="text-xl lg:text-2xl font-black mb-8 lg:mb-12 uppercase tracking-tight">{t.cart.summary}</h2>
            <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-12">
              <div className="flex justify-between font-bold text-base lg:text-lg opacity-60">
                <span>{t.cart.subtotal}</span>
                <span>{subtotal} ₾</span>
              </div>
              <div className="flex justify-between font-bold text-base lg:text-lg">
                <span className="opacity-60">{t.cart.delivery}</span>
                <span className="text-serta-yellow uppercase font-black">FREE</span>
              </div>
              <div className="h-[1px] lg:h-[2px] bg-white/10 my-6 lg:my-8"></div>
              <div className="flex justify-between items-end">
                <span className="text-sm lg:text-lg font-bold opacity-60 mb-1">{t.cart.total}</span>
                <span className="text-3xl lg:text-5xl font-black text-white">{subtotal} <span className="text-lg lg:text-2xl font-medium text-serta-yellow">₾</span></span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-serta-yellow text-serta-navy py-5 lg:py-7 rounded-2xl lg:rounded-[28px] font-black text-xl lg:text-2xl hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 shadow-xl"
            >
              {t.cart.checkout}
              <ArrowRight size={24} className="lg:size-28" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;