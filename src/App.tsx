import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { StationerySection } from './components/StationerySection';
import { CardCustomizer } from './components/CardCustomizer';
import { PriceCalculator } from './components/PriceCalculator';
import { AboutContact } from './components/AboutContact';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteInquiryDrawer } from './components/QuoteInquiryDrawer';
import { SampleKitModal } from './components/SampleKitModal';
import { WishlistDrawer } from './components/WishlistDrawer';

// New Feature Modules & Contexts
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WebsiteCmsProvider, useWebsiteCms } from './context/WebsiteCmsContext';
import { AuthModal } from './components/auth/AuthModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { CustomerDashboard } from './components/account/CustomerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SeoHead } from './components/seo/SeoHead';

import { ProductItem, QuoteItem, Order } from './types';
import { WEDDING_CARDS_DATA, ALL_PRODUCTS } from './data/products';
import { generateOrderWhatsappUrl } from './services/whatsapp';

const WISHLIST_STORAGE_KEY = 'chhabilal_cards_wishlist_ids';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('wedding-cards');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [customizerProduct, setCustomizerProduct] = useState<ProductItem | null>(null);

  // Overlay States
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState<boolean>(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState<boolean>(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<{ order: Order; whatsappUrl?: string } | null>(null);

  const { isSectionEnabled } = useWebsiteCms();

  // Local Storage initialized Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.error('Failed to read wishlist from localStorage:', err);
    }
    return ['wc-01', 'wc-03'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (err) {
      console.error('Failed to persist wishlist to localStorage:', err);
    }
  }, [wishlistIds]);

  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    {
      product: WEDDING_CARDS_DATA[0],
      quantity: 200,
      customizationNotes: 'Need Odia script & Gold Foil text',
      selectedColor: 'Deep Crimson & Gold'
    }
  ]);

  const handleToggleWishlist = (product: ProductItem) => {
    setWishlistIds(prev => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
  };

  const wishlistProducts = useMemo(() => {
    return wishlistIds
      .map(id => ALL_PRODUCTS.find(p => p.id === id))
      .filter((p): p is ProductItem => !!p);
  }, [wishlistIds]);

  const handleAddToQuote = (
    product: ProductItem, 
    quantity: number, 
    notes: string, 
    color: string
  ) => {
    setQuoteItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.selectedColor === color);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        if (notes) updated[existingIdx].customizationNotes = notes;
        return updated;
      }
      return [...prev, {
        product,
        quantity,
        customizationNotes: notes,
        selectedColor: color
      }];
    });
    setIsQuoteDrawerOpen(true);
  };

  const handleUpdateQuoteQuantity = (productId: string, newQty: number) => {
    setQuoteItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const handleRemoveQuoteItem = (productId: string) => {
    setQuoteItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearAllQuotes = () => {
    setQuoteItems([]);
  };

  const handleOpenCustomizerWithProduct = (product: ProductItem) => {
    setCustomizerProduct(product);
    setActiveTab('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2926] font-sans antialiased flex flex-col selection:bg-[#F2EDE4] selection:text-[#8B0000]">
      
      {/* SEO & Structured Data Head Injector */}
      <SeoHead product={selectedProduct || undefined} />

      {/* Sticky Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        quoteItems={quoteItems}
        setIsQuoteDrawerOpen={setIsQuoteDrawerOpen}
        setIsSampleModalOpen={setIsSampleModalOpen}
        wishlistCount={wishlistIds.length}
        setIsWishlistOpen={setIsWishlistDrawerOpen}
        setIsCartOpen={setIsCartDrawerOpen}
        setIsAuthOpen={setIsAuthModalOpen}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* Render Hero if enabled in CMS and on main catalog tabs */}
        {(activeTab === 'wedding-cards' || activeTab === 'stationery') && !searchQuery && isSectionEnabled('sec-hero') && (
          <Hero 
            onExploreCards={() => {
              setActiveTab('wedding-cards');
              const el = document.getElementById('wedding-cards-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenCustomizer={() => {
              setActiveTab('customizer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreStationery={() => {
              setActiveTab('stationery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCalculator={() => {
              setActiveTab('calculator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSampleModal={() => setIsSampleModalOpen(true)}
            onAddToQuote={handleAddToQuote}
          />
        )}

        {/* Dynamic Views */}
        {activeTab === 'wedding-cards' && isSectionEnabled('sec-wedding') && (
          <CatalogSection 
            searchQuery={searchQuery}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenCustomizerWithProduct={handleOpenCustomizerWithProduct}
            onAddToQuote={handleAddToQuote}
            onOpenSampleModal={() => setIsSampleModalOpen(true)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'stationery' && (
          <StationerySection 
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToQuote={handleAddToQuote}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'customizer' && (
          <CardCustomizer 
            initialProduct={customizerProduct}
            onAddToQuote={handleAddToQuote}
            isWishlisted={customizerProduct ? wishlistIds.includes(customizerProduct.id) : wishlistIds.includes(WEDDING_CARDS_DATA[0].id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'calculator' && (
          <PriceCalculator />
        )}

        {activeTab === 'about' && (
          <AboutContact />
        )}

        {/* Customer Account Portal */}
        {activeTab === 'account' && (
          <CustomerDashboard 
            onExploreCards={() => {
              setActiveTab('wedding-cards');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCustomizer={() => {
              setActiveTab('customizer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Admin SaaS Dashboard */}
        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={handleAddToQuote}
        onOpenCustomizerWithProduct={handleOpenCustomizerWithProduct}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <WishlistDrawer 
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onClearWishlist={handleClearWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenCustomizerWithProduct={handleOpenCustomizerWithProduct}
        onAddToQuote={handleAddToQuote}
        onExploreCards={() => {
          setActiveTab('wedding-cards');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <QuoteInquiryDrawer 
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuoteQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearAll={handleClearAllQuotes}
      />

      <CartDrawer 
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        onOpenCheckout={() => {
          setIsCartDrawerOpen(false);
          setIsCheckoutModalOpen(true);
        }}
        onOpenAuth={() => {
          setIsCartDrawerOpen(false);
          setIsAuthModalOpen(true);
        }}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsCheckoutModalOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onOrderSuccess={(order, whatsappUrl) => {
          setCompletedOrder({ order, whatsappUrl });
        }}
      />

      {/* Order Success Confirmation Modal */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-[#FAF9F6] border border-[#D4AF37]/50 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
              ✓
            </div>
            <h3 className="font-royal text-2xl font-bold text-[#8B0000]">Order Request Received!</h3>
            <p className="text-xs text-[#2D2926] font-semibold">
              Order Number: <span className="font-mono text-[#8B0000]">{completedOrder.order.orderNumber}</span>
            </p>
            <p className="text-xs text-[#4A443F]">
              Your wholesale order request has been logged. Chhabilal Cards team in Brajarajnagar will generate your digital proof and invoice within 12 hours.
            </p>

            <div className="space-y-2 pt-2">
              {completedOrder.whatsappUrl && (
                <a
                  href={completedOrder.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#8B0000] text-white text-xs uppercase tracking-wider font-semibold rounded-xl"
                >
                  <span>Notify Shop Directly on WhatsApp</span>
                </a>
              )}

              <button
                onClick={() => {
                  setCompletedOrder(null);
                  setActiveTab('account');
                }}
                className="w-full py-2 bg-[#F2EDE4] hover:bg-[#E5E1DA] text-[#2D2926] text-xs uppercase tracking-wider font-semibold rounded-xl"
              >
                View Order in My Account
              </button>
            </div>
          </div>
        </div>
      )}

      <SampleKitModal 
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WebsiteCmsProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </WebsiteCmsProvider>
    </AuthProvider>
  );
}
