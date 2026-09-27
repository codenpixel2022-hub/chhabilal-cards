import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  Sparkles, 
  FileText, 
  Calculator, 
  Gift, 
  Search,
  Menu,
  X,
  MessageCircle,
  Award,
  Heart
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/reviews';
import { QuoteItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  quoteItems: QuoteItem[];
  setIsQuoteDrawerOpen: (open: boolean) => void;
  setIsSampleModalOpen: (open: boolean) => void;
  wishlistCount: number;
  setIsWishlistOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  quoteItems,
  setIsQuoteDrawerOpen,
  setIsSampleModalOpen,
  wishlistCount,
  setIsWishlistOpen,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalQuoteCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'wedding-cards', label: 'Wedding Cards', icon: Sparkles },
    { id: 'stationery', label: 'Office & School Stationery', icon: FileText },
    { id: 'customizer', label: 'Live Card Designer', icon: Gift },
    { id: 'calculator', label: 'Price & Bulk Estimator', icon: Calculator },
    { id: 'about', label: 'About & Store Location', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E1DA] shadow-xs">
      {/* Top utility bar */}
      <div className="bg-[#8B0000] text-[#FAF9F6] text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#F2EDE4]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              Rajpur, Brajarajnagar, Jharsuguda, Odisha
            </span>
            <span className="hidden sm:flex items-center gap-1 text-[#F2EDE4]/90">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              Open Daily: 8:30 AM – 9:00 PM
            </span>
            <span className="hidden md:inline-flex items-center gap-1 bg-black/20 text-[#F2EDE4] px-2.5 py-0.5 rounded-full text-[11px] font-sans tracking-wide">
              <Award className="w-3 h-3 text-[#D4AF37]" />
              GST Registered Since 2017 • 4.8★ Justdial
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:${BUSINESS_INFO.phone1}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span className="font-medium">{BUSINESS_INFO.phone1}</span>
            </a>
            <span className="text-[#D4AF37]/50">|</span>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('Hello Chhabilal Cards, I would like to inquire about wedding cards and stationery catalog.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#FAF9F6] hover:text-[#D4AF37] transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo / Name */}
          <button 
            id="nav-brand-btn"
            onClick={() => setActiveTab('wedding-cards')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#8B0000] flex items-center justify-center text-white shadow-xs border border-[#6D0000] group-hover:bg-[#6D0000] transition-colors">
              <span className="font-royal font-bold text-lg sm:text-xl text-[#FAF9F6]">CC</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-royal font-bold text-xl sm:text-2xl tracking-tighter text-[#8B0000]">
                  CHHABILAL
                </span>
                <span className="text-xs sm:text-sm tracking-widest uppercase font-sans text-[#A69076] font-semibold">
                  Cards & Stationery
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#8C847C] font-sans">
                Manufacturers & Designers • Jharsuguda
              </p>
            </div>
          </button>

          {/* Search bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                id="search-input-desktop"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 10/5 UK cards, 3D mandap, box files, ID cards..."
                className="w-full bg-[#F2EDE4] border border-[#E5E1DA] focus:border-[#A69076] focus:bg-white text-[#2D2926] placeholder-[#8C847C] text-xs rounded-full pl-10 pr-4 py-2.5 outline-none transition-all font-sans"
              />
              <Search className="w-4 h-4 text-[#8C847C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C847C] hover:text-[#2D2926]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs uppercase tracking-wider font-sans font-medium text-[#4A443F] bg-[#F2EDE4] border border-[#D1CABF] hover:bg-[#E5E1DA] hover:text-[#8B0000] rounded-lg transition-colors relative"
              title="View Saved Favorites"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'text-[#8B0000] fill-[#8B0000]' : 'text-[#8B0000]'}`} />
              <span className="hidden md:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-[#8B0000] text-white font-bold px-1.5 py-0.2 rounded-full text-[10px] min-w-[18px] text-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              id="sample-kit-btn"
              onClick={() => setIsSampleModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider font-sans font-medium text-[#4A443F] bg-[#F2EDE4] border border-[#D1CABF] hover:bg-[#E5E1DA] rounded-lg transition-colors"
            >
              <Gift className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>Sample Kit</span>
            </button>

            <button
              id="quote-cart-btn"
              onClick={() => setIsQuoteDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs uppercase tracking-wider font-sans font-medium text-white bg-[#8B0000] hover:bg-[#6D0000] rounded-lg shadow-xs transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#F2EDE4]" />
              <span className="hidden sm:inline">Inquiry Bag</span>
              {totalQuoteCount > 0 && (
                <span className="bg-[#FAF9F6] text-[#8B0000] font-bold px-1.5 py-0.2 rounded-full text-[11px] min-w-[20px] text-center">
                  {totalQuoteCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A443F] hover:bg-[#F2EDE4] rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#4A443F]" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-2 pt-3 border-t border-[#E5E1DA] mt-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => {
                  setActiveTab(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-sans font-medium transition-all ${
                  isActive
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'text-[#4A443F] hover:text-[#8B0000] hover:bg-[#F2EDE4]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FAF9F6]' : 'text-[#A69076]'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E1DA] bg-[#FAF9F6] px-4 py-4 space-y-3 shadow-lg">
          {/* Mobile search */}
          <div className="relative w-full">
            <input
              id="search-input-mobile"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wedding cards, box files, ID cards..."
              className="w-full bg-[#F2EDE4] border border-[#E5E1DA] focus:bg-white text-[#2D2926] text-xs rounded-lg pl-9 pr-3 py-2 outline-none font-sans"
            />
            <Search className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => {
                    setActiveTab(link.id);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-sans font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-[#8B0000] text-white'
                      : 'text-[#4A443F] hover:bg-[#F2EDE4]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#A69076]'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}

            <button
              id="mobile-wishlist-btn"
              onClick={() => {
                setIsWishlistOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-sans font-medium text-[#8B0000] bg-[#FAF9F6] border border-[#D1CABF] text-left"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-[#8B0000] fill-[#8B0000]" />
                <span>My Saved Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="bg-[#8B0000] text-white font-bold px-2 py-0.5 rounded-full text-[11px]">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              id="mobile-sample-kit-btn"
              onClick={() => {
                setIsSampleModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-sans font-medium text-[#4A443F] bg-[#F2EDE4] border border-[#D1CABF] text-left"
            >
              <Gift className="w-4 h-4 text-[#8B0000]" />
              <span>Order Physical Sample Swatch Kit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
