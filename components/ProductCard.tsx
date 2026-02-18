import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types.ts';
import { useApp } from '../store.tsx';
import { TRANSLATIONS } from '../constants.tsx';
import { Heart, Layers, Star, ShoppingCart } from 'lucide-react';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { lang, toggleWishlist, wishlist, toggleComparison, comparisonList, addToCart } = useApp();
  const t = TRANSLATIONS[lang];
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = comparisonList.includes(product.id);

  // Get lowest price for display with safety checks
  const sizePrices = Array.isArray(product?.sizePrices) ? product.sizePrices : [];
  const minPrice = sizePrices.length > 0 ? Math.min(...sizePrices.map(sp => sp.price)) : 0;
  const defaultSize = sizePrices.length > 0 ? sizePrices[0].size : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (defaultSize > 0) {
      addToCart(product.id, defaultSize);
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden custom-shadow transition-all hover:-translate-y-2 flex flex-col h-full border border-gray-50">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name?.[lang]} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 bg-serta-yellow text-serta-navy text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm">
            {t.product.bestSeller}
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 z-10">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-serta-navy hover:text-red-500'}`}
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleComparison(product.id); }}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${isCompared ? 'bg-serta-navy text-white' : 'bg-white text-serta-navy hover:text-blue-600'}`}
          >
            <Layers size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-serta-yellow">
            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase ml-1">{t.product.verified}</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-serta-navy mb-2 leading-tight group-hover:text-blue-700 transition-colors">
            {product.name?.[lang]}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-6 flex-grow">{product.type?.[lang]}</p>
        
        <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black text-serta-navy">
              <span className="text-xs font-bold text-gray-400 mr-1">{t.product.from}</span>
              {minPrice} <span className="text-sm font-medium">₾</span>
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {defaultSize} {t.product.cm}
            </div>
          </div>
          
          <button 
            onClick={handleQuickAdd}
            className="flex items-center justify-center gap-2 bg-serta-navy text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all transform active:scale-95 shadow-lg shadow-serta-navy/10"
          >
            <ShoppingCart size={16} />
            {t.product.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;