import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './store';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import PDP from './pages/PDP';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ComparisonPage from './pages/ComparisonPage';
import AdminPage from './pages/AdminPage';

const AppContent: React.FC = () => {
  const context = useApp();
  
  if (!context) return null;

  const { loading, lang } = context;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-serta-navy border-t-serta-yellow rounded-full animate-spin mb-6"></div>
        <div className="bg-serta-navy text-white px-4 py-1 font-bold italic text-2xl tracking-tighter mb-4">Serta</div>
        <p className="text-gray-400 font-bold animate-pulse">
          {lang === 'ka' ? 'მონაცემები იტვირთება...' : 'Syncing with database...'}
        </p>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<PDP />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<div className="container mx-auto px-4 py-32"><h1 className="text-4xl font-black text-serta-navy">About Page</h1></div>} />
          <Route path="/warranty" element={<div className="container mx-auto px-4 py-32"><h1 className="text-4xl font-black text-serta-navy">Warranty Information</h1></div>} />
          <Route path="/blog" element={<div className="container mx-auto px-4 py-32"><h1 className="text-4xl font-black text-serta-navy">Serta Sleep Blog</h1></div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;