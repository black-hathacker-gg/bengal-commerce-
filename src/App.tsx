import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { StorefrontHome } from '@/components/StorefrontHome';
import { ProductDetail } from '@/components/ProductDetail';
import { RetailEnginePOS } from '@/components/RetailEnginePOS';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ToastContainer } from '@/components/ToastContainer';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans antialiased text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      <main className="flex-1">
        {currentScreen === 'storefront' && <StorefrontHome />}
        {currentScreen === 'product-detail' && <ProductDetail />}
        {currentScreen === 'retail-pos' && <RetailEnginePOS />}
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
