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
import { ProductItem, QuoteItem } from './types';
import { WEDDING_CARDS_DATA, ALL_PRODUCTS } from './data/products';

const WISHLIST_STORAGE_KEY = 'chhabilal_cards_wishlist_ids';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('wedding-cards');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [customizerProduct, setCustomizerProduct] = useState<ProductItem | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState<boolean>(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState<boolean>(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState<boolean>(false);

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
    // Default starter favorites
    return ['wc-01', 'wc-03'];
  });

  // Synchronize Wishlist changes with localStorage
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
      {/* Sticky Natural Tones Navbar */}
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
      />

      {/* Main View Area */}
      <main className="flex-1">
        {/* Render Hero if on main tabs */}
        {(activeTab === 'wedding-cards' || activeTab === 'stationery') && !searchQuery && (
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

        {/* Dynamic Section based on Active Tab or Search */}
        {activeTab === 'wedding-cards' && (
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
      </main>

      {/* Natural Tones Minimalist Dark Footer */}
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

      <SampleKitModal 
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </div>
  );
}

