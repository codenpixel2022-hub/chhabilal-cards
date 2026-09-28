import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  MessageCircle, 
  Globe, 
  Search, 
  Settings, 
  Users, 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Printer, 
  Phone, 
  Sparkles, 
  AlertCircle, 
  Calendar,
  Layers,
  FileText,
  Lock,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWebsiteCms } from '../../context/WebsiteCmsContext';
import { DataStore } from '../../services/store';
import { ProductItem, CategoryItem, Order, Enquiry, Promotion, AuditLog, PresetType, BusinessSettings } from '../../types';
import { getAnalyticsEvents, getConversionFunnel } from '../../services/analytics';
import { generatePrintableQuotation } from '../../services/pdf';

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin, mustChangeAdminPassword, updateProfile } = useAuth();
  const { sections, categories, promotions, settings, toggleSection, applyPreset, refreshCms } = useWebsiteCms();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'orders' | 'crm' | 'marketing' | 'cms' | 'seo' | 'settings' | 'audit'>('overview');

  // Data States
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [analyticsEvents, setAnalyticsEvents] = useState(getAnalyticsEvents());
  const [timeFilter, setTimeFilter] = useState<'today' | '7days' | '30days'>('30days');

  // Selected Item Modals
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<CategoryItem> | null>(null);
  const [editingPromotion, setEditingPromotion] = useState<Partial<Promotion> | null>(null);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Bulk Operations State
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const loadAdminData = async () => {
    const [prods, ords, enqs] = await Promise.all([
      DataStore.getProducts(),
      DataStore.getOrders(),
      DataStore.getEnquiries(),
    ]);
    setProducts(prods);
    setOrders(ords);
    setEnquiries(enqs);
    setAuditLogs(DataStore.getAuditLogs());
    setAnalyticsEvents(getAnalyticsEvents());
  };

  useEffect(() => {
    if (isAdmin) loadAdminData();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-[#FAF9F6] border border-[#8B0000] rounded-3xl text-center space-y-4 font-sans">
        <Lock className="w-12 h-12 text-[#8B0000] mx-auto" />
        <h2 className="font-royal text-2xl font-bold text-[#8B0000]">Restricted Admin Access</h2>
        <p className="text-xs text-[#4A443F]">Please log in with administrator credentials (`admin@chhabilalcards.in`).</p>
      </div>
    );
  }

  const funnel = getConversionFunnel(analyticsEvents);
  const totalSales = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'PENDING').length;
  const followUpsDueToday = enquiries.filter(e => e.status === 'FOLLOW_UP').length;

  // Bulk product actions
  const handleBulkActivate = async (active: boolean) => {
    for (const id of selectedProductIds) {
      const prod = products.find(p => p.id === id);
      if (prod) await DataStore.saveProduct({ ...prod, active });
    }
    setSelectedProductIds([]);
    await loadAdminData();
  };

  // AI SEO Draft Generator Simulation based on verified business details
  const handleGenerateAiSeoDraft = (prod: Partial<ProductItem>) => {
    const title = `${prod.name} Wholesale Manufacturer | Chhabilal Cards Jharsuguda`;
    const desc = `Buy ${prod.name} (${prod.code}) at wholesale direct factory rates in Jharsuguda, Odisha. Craftsmanship by Chhabilal Cards with imported pearl paper & hot gold foil stamping. MOQ: ${prod.minOrderQuantity || 100} pcs.`;
    setEditingProduct(prev => ({
      ...prev,
      seoTitle: title,
      seoDescription: desc,
    }));
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPassword) return;
    await updateProfile({ mustChangePassword: false });
    setPasswordChangeSuccess(true);
    setTimeout(() => setPasswordChangeSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#2D2926] font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#58141C] text-[#FAF9F6] p-5 flex flex-col justify-between shrink-0 border-r border-[#D4AF37]/30">
        <div className="space-y-6">
          <div>
            <span className="text-[#D4AF37] font-royal font-bold text-[10px] uppercase tracking-widest block">
              Management Portal
            </span>
            <h1 className="font-royal text-xl font-bold text-[#F2EDE4]">
              CHHABILAL ADMIN
            </h1>
            <p className="text-[11px] text-[#E5E1DA]/70">{user?.email}</p>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'overview' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'products' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <Package className="w-4 h-4 text-[#D4AF37]" />
              <span>Products Catalog ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'categories' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <Tag className="w-4 h-4 text-[#D4AF37]" />
              <span>Categories ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'orders' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Wholesale Orders</span>
              </div>
              {pendingOrders > 0 && (
                <span className="bg-[#D4AF37] text-[#58141C] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('crm')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'crm' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Enquiry CRM</span>
              </div>
              {followUpsDueToday > 0 && (
                <span className="bg-amber-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {followUpsDueToday}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('marketing')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'marketing' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Promotions & Banners</span>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'cms' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <Globe className="w-4 h-4 text-[#D4AF37]" />
              <span>Website CMS & Controls</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'seo' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span>SEO & AI Optimizer</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'settings' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <Settings className="w-4 h-4 text-[#D4AF37]" />
              <span>Business Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'audit' ? 'bg-[#8B0000] text-white shadow-xs font-bold' : 'hover:bg-white/10 text-[#E5E1DA]'
              }`}
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>Audit Logs ({auditLogs.length})</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#D4AF37]/30 text-[11px] text-[#E5E1DA]/70 space-y-2">
          <div>Chhabilal Cards Admin v2.0</div>
          <a href="/" className="text-[#D4AF37] hover:underline block font-semibold">
            ← View Public Website
          </a>
        </div>
      </aside>

      {/* Main Admin Body */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">

        {/* Mandatory Security Warning if Default Credentials used */}
        {mustChangeAdminPassword && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>SECURITY NOTICE:</strong> You are using default bootstrap admin credentials. Please update your initial password under <strong>Business Settings</strong>.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('settings')}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold uppercase tracking-wider shrink-0"
            >
              Update Password
            </button>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-royal text-2xl font-bold text-[#8B0000]">Dashboard Overview</h2>
                <p className="text-xs text-[#4A443F]">Real-time business performance, sales analytics, and conversion funnels.</p>
              </div>

              {/* Time Filter */}
              <div className="flex items-center bg-[#FAF9F6] border border-[#D1CABF] rounded-xl p-1 text-xs">
                <button
                  onClick={() => setTimeFilter('today')}
                  className={`px-3 py-1 rounded-lg font-semibold ${timeFilter === 'today' ? 'bg-[#8B0000] text-white' : 'text-[#4A443F]'}`}
                >
                  Today
                </button>
                <button
                  onClick={() => setTimeFilter('7days')}
                  className={`px-3 py-1 rounded-lg font-semibold ${timeFilter === '7days' ? 'bg-[#8B0000] text-white' : 'text-[#4A443F]'}`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setTimeFilter('30days')}
                  className={`px-3 py-1 rounded-lg font-semibold ${timeFilter === '30days' ? 'bg-[#8B0000] text-white' : 'text-[#4A443F]'}`}
                >
                  30 Days
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E5E1DA] shadow-xs space-y-1">
                <span className="text-[11px] text-[#8C847C] uppercase font-bold tracking-wider">Total Sales</span>
                <div className="font-royal text-2xl font-bold text-[#8B0000]">₹{totalSales.toFixed(2)}</div>
                <span className="text-[10px] text-green-700 font-semibold">{orders.length} Wholesale Orders</span>
              </div>

              <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E5E1DA] shadow-xs space-y-1">
                <span className="text-[11px] text-[#8C847C] uppercase font-bold tracking-wider">Enquiries CRM</span>
                <div className="font-royal text-2xl font-bold text-[#2D2926]">{enquiries.length}</div>
                <span className="text-[10px] text-amber-700 font-semibold">{followUpsDueToday} Follow-ups Pending</span>
              </div>

              <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E5E1DA] shadow-xs space-y-1">
                <span className="text-[11px] text-[#8C847C] uppercase font-bold tracking-wider">Product Views</span>
                <div className="font-royal text-2xl font-bold text-[#2D2926]">{funnel.productViews}</div>
                <span className="text-[10px] text-[#8C847C]">{funnel.cartAdds} Cart Additions</span>
              </div>

              <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E5E1DA] shadow-xs space-y-1">
                <span className="text-[11px] text-[#8C847C] uppercase font-bold tracking-wider">Conversion Rate</span>
                <div className="font-royal text-2xl font-bold text-[#8B0000]">{funnel.conversionRate}</div>
                <span className="text-[10px] text-green-700 font-semibold">{funnel.whatsappClicks} WhatsApp Clicks</span>
              </div>
            </div>

            {/* Conversion Funnel Breakdown */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#E5E1DA] shadow-xs space-y-4">
              <h3 className="font-royal font-bold text-base text-[#8B0000]">Conversion Funnel & Channel Performance</h3>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center text-xs">
                <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF]">
                  <div className="font-bold text-base text-[#2D2926]">{funnel.pageViews}</div>
                  <div className="text-[10px] text-[#8C847C] uppercase font-semibold">Page Views</div>
                </div>
                <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF]">
                  <div className="font-bold text-base text-[#2D2926]">{funnel.productViews}</div>
                  <div className="text-[10px] text-[#8C847C] uppercase font-semibold">Product Views</div>
                </div>
                <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF]">
                  <div className="font-bold text-base text-[#2D2926]">{funnel.cartAdds}</div>
                  <div className="text-[10px] text-[#8C847C] uppercase font-semibold">Cart Adds</div>
                </div>
                <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF]">
                  <div className="font-bold text-base text-[#2D2926]">{funnel.checkouts}</div>
                  <div className="text-[10px] text-[#8C847C] uppercase font-semibold">Checkouts</div>
                </div>
                <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF]">
                  <div className="font-bold text-base text-[#8B0000]">{funnel.orders}</div>
                  <div className="text-[10px] text-[#8B0000] uppercase font-bold">Orders</div>
                </div>
                <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF]">
                  <div className="font-bold text-base text-green-700">{funnel.whatsappClicks}</div>
                  <div className="text-[10px] text-green-800 uppercase font-bold">WhatsApp</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-royal text-2xl font-bold text-[#8B0000]">Product Management</h2>
                <p className="text-xs text-[#4A443F]">Create, edit, archive, and set wholesale prices & minimum order quantities.</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct({
                    id: 'wc-' + Date.now(),
                    name: 'New Custom Card Model',
                    code: 'CC-NEW-01',
                    category: 'wedding-cards',
                    pricePerPiece: 15.00,
                    minOrderQuantity: 100,
                    active: true,
                    homepageVisible: true,
                    enquiryEnabled: true,
                    displayOrder: 1,
                    rating: 5.0,
                    reviewsCount: 1,
                    tags: ['New Arrival'],
                    features: ['Gold foil border', 'Linen sheet'],
                    colorsAvailable: ['Gold', 'Crimson'],
                    description: 'Opulent wedding invitation card handcrafted in Jharsuguda.',
                    imageUrl: '/assets/invitation/closed-reference.png',
                    sampleAvailable: true,
                  })}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold rounded-xl shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Bulk Toolbar */}
            {selectedProductIds.length > 0 && (
              <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF] flex items-center justify-between text-xs">
                <span>Selected {selectedProductIds.length} Products</span>
                <div className="flex gap-2">
                  <button onClick={() => handleBulkActivate(true)} className="px-3 py-1 bg-green-700 text-white rounded-lg font-bold">Activate Selected</button>
                  <button onClick={() => handleBulkActivate(false)} className="px-3 py-1 bg-gray-700 text-white rounded-lg font-bold">Deactivate Selected</button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-[#FAF9F6] rounded-2xl border border-[#E5E1DA] overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F2EDE4] text-[#8B0000] font-bold border-b border-[#D1CABF]">
                    <th className="p-3 w-8"><input type="checkbox" onChange={(e) => setSelectedProductIds(e.target.checked ? products.map(p => p.id) : [])} /></th>
                    <th className="p-3">Product Name & Code</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price / MOQ</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(prod => (
                    <tr key={prod.id} className="border-b border-[#E5E1DA] hover:bg-[#F2EDE4]/50">
                      <td className="p-3">
                        <input type="checkbox" checked={selectedProductIds.includes(prod.id)} onChange={(e) => setSelectedProductIds(e.target.checked ? [...selectedProductIds, prod.id] : selectedProductIds.filter(id => id !== prod.id))} />
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-[#2D2926]">{prod.name}</div>
                        <div className="text-[10px] text-[#8C847C] font-mono">Code: {prod.code}</div>
                      </td>
                      <td className="p-3 font-semibold text-[#4A443F] uppercase tracking-wider">{prod.category}</td>
                      <td className="p-3">
                        <div className="font-bold text-[#8B0000]">₹{prod.pricePerPiece.toFixed(2)}/pc</div>
                        <div className="text-[10px] text-[#8C847C]">MOQ: {prod.minOrderQuantity} pcs</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${prod.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {prod.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={() => setEditingProduct(prod)} className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => DataStore.deleteProduct(prod.id).then(loadAdminData)} className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EDIT PRODUCT MODAL */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FAF9F6] rounded-3xl p-6 w-full max-w-xl max-h-[85vh] overflow-y-auto space-y-4 border border-[#D4AF37]/40 shadow-2xl">
              <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-3">
                <h3 className="font-royal text-lg font-bold text-[#8B0000]">Edit Product Details</h3>
                <button onClick={() => setEditingProduct(null)}><XCircle className="w-5 h-5 text-[#8C847C]" /></button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold">Product Name</label>
                  <input type="text" value={editingProduct.name || ''} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full mt-1 p-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-lg" />
                </div>
                <div>
                  <label className="font-bold">SKU Code</label>
                  <input type="text" value={editingProduct.code || ''} onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })} className="w-full mt-1 p-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-lg" />
                </div>
                <div>
                  <label className="font-bold">Starting Price (₹/pc)</label>
                  <input type="number" step="0.5" value={editingProduct.pricePerPiece || 0} onChange={(e) => setEditingProduct({ ...editingProduct, pricePerPiece: parseFloat(e.target.value) })} className="w-full mt-1 p-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-lg" />
                </div>
                <div>
                  <label className="font-bold">Minimum Order Qty (MOQ)</label>
                  <input type="number" value={editingProduct.minOrderQuantity || 100} onChange={(e) => setEditingProduct({ ...editingProduct, minOrderQuantity: parseInt(e.target.value, 10) })} className="w-full mt-1 p-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-lg" />
                </div>
              </div>

              {/* AI SEO Generation Trigger */}
              <div className="p-3 bg-[#F2EDE4] rounded-xl border border-[#D1CABF] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#8B0000]">AI SEO Title & Description Draft</span>
                  <button type="button" onClick={() => handleGenerateAiSeoDraft(editingProduct)} className="px-2.5 py-1 bg-[#8B0000] text-white text-[10px] uppercase font-bold rounded-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Generate Draft
                  </button>
                </div>
                <input type="text" placeholder="SEO Title" value={editingProduct.seoTitle || ''} onChange={(e) => setEditingProduct({ ...editingProduct, seoTitle: e.target.value })} className="w-full p-2 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg text-xs" />
                <textarea placeholder="SEO Description" value={editingProduct.seoDescription || ''} onChange={(e) => setEditingProduct({ ...editingProduct, seoDescription: e.target.value })} className="w-full p-2 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg text-xs" rows={2} />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setEditingProduct(null)} className="px-4 py-2 bg-[#E5E1DA] rounded-xl text-xs font-semibold">Cancel</button>
                <button onClick={async () => {
                  if (editingProduct.id && editingProduct.name) {
                    await DataStore.saveProduct(editingProduct as ProductItem);
                    setEditingProduct(null);
                    await loadAdminData();
                  }
                }} className="px-4 py-2 bg-[#8B0000] text-white rounded-xl text-xs font-bold">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* WEBSITE CONTROL CENTER (CMS) TAB */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-royal text-2xl font-bold text-[#8B0000]">Website Control Center (CMS)</h2>
              <p className="text-xs text-[#4A443F]">Control public section visibility, category promotion presets, and navigation items.</p>
            </div>

            {/* Seasonal Presets */}
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E5E1DA] space-y-3 shadow-xs">
              <h3 className="font-royal font-bold text-sm text-[#2D2926]">1-Click Seasonal Presets</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => applyPreset('wedding-season')} className="px-4 py-2 bg-[#8B0000] text-white rounded-xl text-xs uppercase font-bold shadow-xs">
                  💒 Apply Wedding Season Preset
                </button>
                <button onClick={() => applyPreset('school-season')} className="px-4 py-2 bg-[#2D2926] text-white rounded-xl text-xs uppercase font-bold shadow-xs">
                  📚 Apply School Season Preset
                </button>
                <button onClick={() => applyPreset('full-catalog')} className="px-4 py-2 bg-[#FAF9F6] border border-[#D1CABF] text-[#2D2926] rounded-xl text-xs uppercase font-bold">
                  🌐 Apply Full Catalog Preset
                </button>
              </div>
            </div>

            {/* Homepage Section Visibility Toggles */}
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E5E1DA] space-y-3 shadow-xs">
              <h3 className="font-royal font-bold text-sm text-[#8B0000]">Homepage Section Visibility Toggles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {sections.map(sec => (
                  <div key={sec.id} className="flex items-center justify-between p-3 bg-[#F2EDE4] rounded-xl border border-[#D1CABF]">
                    <span className="font-bold text-[#2D2926]">{sec.name}</span>
                    <button
                      onClick={() => toggleSection(sec.id)}
                      className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                        sec.enabled ? 'bg-green-700 text-white' : 'bg-gray-400 text-white'
                      }`}
                    >
                      {sec.enabled ? 'VISIBLE' : 'HIDDEN'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl font-sans">
            <div>
              <h2 className="font-royal text-2xl font-bold text-[#8B0000]">Business Settings & Password Security</h2>
              <p className="text-xs text-[#4A443F]">Configure shop address, contact phones, GSTIN, and change initial admin password.</p>
            </div>

            {/* Password Update Form */}
            <form onSubmit={handlePasswordChange} className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E5E1DA] space-y-3 shadow-xs">
              <h3 className="font-royal font-bold text-sm text-[#8B0000]">Update Administrator Password</h3>
              {passwordChangeSuccess && <div className="p-2 bg-green-100 text-green-800 text-xs rounded-lg font-bold">Password updated successfully!</div>}
              <div>
                <label className="text-xs font-bold text-[#2D2926]">New Password</label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full mt-1 p-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs outline-none focus:border-[#8B0000]"
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-[#8B0000] text-white text-xs font-bold uppercase tracking-wider rounded-xl">
                Update Admin Password
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};
