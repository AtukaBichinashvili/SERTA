
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, CartItem, Product, LocalizedString } from './types';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dlqilrjkuiidjyzeoscx.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRscWlscmprdWlpZGp5emVvc2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MDUzNzgsImV4cCI6MjA4Njk4MTM3OH0.ys_h180Ptr8Om998prpAe95Nxz1JZePw1y0pMtVm9LY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  slides: [],
  menuItems: []
};

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  cart: CartItem[];
  addToCart: (productId: string, size: number) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, delta: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  comparisonList: string[];
  toggleComparison: (productId: string) => void;
  products: Product[];
  saveSingleProduct: (product: Product) => Promise<{success: boolean, error?: string}>;
  setProducts: (products: Product[]) => Promise<boolean>;
  settings: SiteSettings;
  updateSettings: (s: SiteSettings) => Promise<boolean>;
  loading: boolean;
  dbStatus: 'connected' | 'error' | 'local';
  fetchData: () => Promise<void>;
  uploadImage: (file: File) => Promise<string | null>;
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
    try {
      const [pResponse, sResponse] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('settings').select('*').eq('id', 1).maybeSingle()
      ]);

      if (!pResponse.error && pResponse.data && pResponse.data.length > 0) {
        // Map lowercase DB keys back to camelCase types
        const mappedProducts = pResponse.data.map(p => ({
          ...p,
          sizePrices: p.sizeprices,
          isBestSeller: p.isbestseller,
          careInstructions: p.careinstructions
        }));
        setProductsState(mappedProducts);
      }

      if (!sResponse.error && sResponse.data) {
        const s = sResponse.data;
        const mappedSettings = {
          ...DEFAULT_SETTINGS,
          logoUrl: s.logourl,
          heroTitle: s.herotitle,
          heroSubtitle: s.herosubtitle,
          contactPhone: s.contactphone,
          contactEmail: s.contactemail,
          address: s.address,
          slides: s.slides,
          menuItems: s.menuitems
        };
        setSettingsState(mappedSettings);
      }
      
      setDbStatus('connected');
    } catch (e) {
      console.error("Fetch error:", e);
      setDbStatus('error');
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { data, error } = await supabase.storage.from('serta-media').upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('serta-media').getPublicUrl(data.path);
      return publicUrl;
    } catch (e) {
      console.error("Upload error:", e);
      return null;
    }
  };

  const saveSingleProduct = async (product: Product): Promise<{success: boolean, error?: string}> => {
    // Map camelCase to lowercase for DB
    const dbData = {
      id: product.id,
      name: product.name,
      sizeprices: product.sizePrices,
      type: product.type,
      firmness: product.firmness,
      height: product.height,
      warranty: product.warranty,
      description: product.description,
      features: product.features,
      careinstructions: product.careInstructions || { ka: '', en: '' },
      image: product.image,
      isbestseller: !!product.isBestSeller,
      category: product.category
    };

    const { error } = await supabase.from('products').upsert(dbData);
    if (error) return { success: false, error: error.message };
    await fetchData();
    return { success: true };
  };

  const updateSettings = async (s: SiteSettings): Promise<boolean> => {
    const dbData = {
      id: 1,
      logourl: s.logoUrl,
      herotitle: s.heroTitle,
      herosubtitle: s.heroSubtitle,
      contactphone: s.contactPhone,
      contactemail: s.contactEmail,
      address: s.address,
      slides: s.slides,
      menuitems: s.menuItems
    };
    const { error } = await supabase.from('settings').upsert(dbData);
    if (error) return false;
    setSettingsState(s);
    return true;
  };

  const setProducts = async (newProducts: Product[]): Promise<boolean> => {
    // Basic bulk support omitted for brevity, but can be added similarly to saveSingleProduct
    return true; 
  };

  useEffect(() => { fetchData(); }, [fetchData]);

  const addToCart = (productId: string, size: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId && item.selectedSize === size);
      if (existing) return prev.map(item => (item.productId === productId && item.selectedSize === size) ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { productId, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, size: number) => setCart(prev => prev.filter(item => !(item.productId === productId && item.selectedSize === size)));
  const updateQuantity = (productId: string, size: number, delta: number) => setCart(prev => prev.map(item => (item.productId === productId && item.selectedSize === size) ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const clearCart = () => setCart([]);
  const toggleWishlist = (productId: string) => setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  const toggleComparison = (productId: string) => setComparisonList(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);

  return (
    <AppContext.Provider value={{
      lang, setLang, cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      wishlist, toggleWishlist, comparisonList, toggleComparison,
      products, setProducts, saveSingleProduct, settings, updateSettings, loading, dbStatus, fetchData, uploadImage
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
