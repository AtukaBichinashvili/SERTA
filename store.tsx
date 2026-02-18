import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, CartItem, Product, LocalizedString } from './types.ts';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants.tsx';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://omlxshxfovwiceoqshle.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tbHhzaHhmb3Z3aWNlb3FzaGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDEzNzUsImV4cCI6MjA4NjU3NzM3NX0.LHo5l68dDG9win824vfBUMig1_4APbYk2mRRhec-nsw';

let supabase: SupabaseClient | null = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (e) {
  console.error("Supabase initialization error:", e);
}

export interface Slide {
  image: string;
  title: LocalizedString;
  subtitle: LocalizedString;
}

export interface MenuItem {
  name: LocalizedString;
  iconName: string;
  path: string;
}

export interface SiteSettings {
  logoUrl: string;
  heroTitle: LocalizedString;
  heroSubtitle: LocalizedString;
  contactPhone: string;
  contactEmail: string;
  address: string;
  slides: Slide[];
  menuItems: MenuItem[];
}

const DEFAULT_SETTINGS: SiteSettings = {
  logoUrl: 'https://seeklogo.com/images/S/serta-logo-2B056E6173-seeklogo.com.png',
  heroTitle: { ka: 'აღმოაჩინეთ იდეალური ძილი Serta-სთან ერთად', en: 'Discover the Perfect Sleep with Serta' },
  heroSubtitle: { ka: 'ამერიკული ხარისხი და შეუდარებელი კომფორტი თქვენი საძინებლისთვის.', en: 'American quality and unparalleled comfort for your bedroom.' },
  contactPhone: '+995 555 123 456',
  contactEmail: 'info@serta.ge',
  address: 'Tbilisi, Chavchavadze Ave. 12',
  slides: [
    {
      image: "https://images.unsplash.com/photo-1505693333510-5d93f4ef4c7d?q=80&w=2070&auto=format&fit=crop",
      title: { ka: "საგაზაფხულო ფასდაკლებები", en: "Spring Sales" },
      subtitle: { ka: "მიიღეთ 30%-მდე ფასდაკლება შერჩეულ მოდელებზე", en: "Get up to 30% off on selected models" }
    },
    {
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
      title: { ka: "პრემიუმ ხარისხი", en: "Premium Quality" },
      subtitle: { ka: "ამერიკული ძილის ტექნოლოგია თქვენს საძინებელში", en: "American sleep technology in your bedroom" }
    }
  ],
  menuItems: [
    { name: { ka: 'მატრასები', en: 'Mattresses' }, iconName: 'Layers', path: '/shop' },
    { name: { ka: 'საწოლები', en: 'Beds' }, iconName: 'Bed', path: '/shop' },
    { name: { ka: 'ორთოპედიული ბალიშები', en: 'Orthopedic Pillows' }, iconName: 'Cloud', path: '/shop' },
    { name: { ka: 'პლედები', en: 'Blankets' }, iconName: 'Wind', path: '/shop' },
  ]
};

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  cart: CartItem[];
  addToCart: (productId: string, size: number) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, delta: number) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  comparisonList: string[];
  toggleComparison: (productId: string) => void;
  clearCart: () => void;
  products: Product[];
  setProducts: (products: Product[]) => Promise<boolean>;
  settings: SiteSettings;
  updateSettings: (s: SiteSettings) => Promise<boolean>;
  loading: boolean;
  dbStatus: 'connected' | 'error' | 'local';
  fetchData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('ka');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<'connected' | 'error' | 'local'>('local');
  
  const [products, setProductsState] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettingsState] = useState<SiteSettings>(DEFAULT_SETTINGS);

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (!supabase) {
      setDbStatus('error');
      setLoading(false);
      return;
    }

    try {
      const [pResponse, sResponse] = await Promise.all([
        supabase.from('products').select('*').order('id'),
        supabase.from('settings').select('*').eq('id', 1).maybeSingle()
      ]);

      if (!pResponse.error && pResponse.data && pResponse.data.length > 0) {
        setProductsState(pResponse.data);
      }

      if (!sResponse.error && sResponse.data) {
        // Ensure that fetched settings have arrays if expected, fallback to defaults
        const mergedSettings = { ...DEFAULT_SETTINGS, ...sResponse.data };
        if (!Array.isArray(mergedSettings.slides)) mergedSettings.slides = DEFAULT_SETTINGS.slides;
        if (!Array.isArray(mergedSettings.menuItems)) mergedSettings.menuItems = DEFAULT_SETTINGS.menuItems;
        setSettingsState(mergedSettings);
      }
      
      setDbStatus('connected');
    } catch (e) {
      console.error("Fetch error:", e);
      setDbStatus('error');
    } finally {
      setLoading(false);
    }
  }, []);

  const setProducts = async (newProducts: Product[]): Promise<boolean> => {
    setProductsState(newProducts);
    if (supabase && dbStatus === 'connected') {
      try {
        const { error } = await supabase.from('products').upsert(newProducts);
        return !error;
      } catch (e) {
        return false;
      }
    }
    return true;
  };

  const updateSettings = async (newSettings: SiteSettings): Promise<boolean> => {
    setSettingsState(newSettings);
    if (supabase && dbStatus === 'connected') {
      try {
        const payload = { id: 1, ...newSettings };
        const { error } = await supabase.from('settings').upsert(payload);
        return !error;
      } catch (e) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addToCart = (productId: string, size: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.productId === productId && item.selectedSize === size) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { productId, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, size: number) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId && item.selectedSize === size) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const toggleComparison = (productId: string) => {
    setComparisonList(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      lang, setLang, cart, addToCart, removeFromCart, updateQuantity, 
      wishlist, toggleWishlist, comparisonList, toggleComparison, clearCart,
      products, setProducts, settings, updateSettings, loading, dbStatus, fetchData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};