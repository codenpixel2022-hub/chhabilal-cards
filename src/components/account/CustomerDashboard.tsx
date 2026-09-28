import React, { useState, useEffect } from 'react';
import { 
  User, 
  ShoppingBag, 
  MessageCircle, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Printer, 
  Clock, 
  CheckCircle2, 
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DataStore } from '../../services/store';
import { Order, Enquiry, ProductItem } from '../../types';
import { generatePrintableQuotation } from '../../services/pdf';
import { generateOrderWhatsappUrl } from '../../services/whatsapp';

interface CustomerDashboardProps {
  onExploreCards?: () => void;
  onOpenCustomizer?: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onExploreCards,
  onOpenCustomizer,
}) => {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'enquiries' | 'wishlist' | 'addresses' | 'privacy'>('orders');

  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Profile Form States
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [gstNumber, setGstNumber] = useState(user?.gstNumber || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [allOrders, allEnquiries] = await Promise.all([
        DataStore.getOrders(),
        DataStore.getEnquiries(),
      ]);
      // Filter customer specific items
      if (user) {
        setOrders(allOrders.filter(o => o.customerId === user.id || o.customerEmail === user.email));
        setEnquiries(allEnquiries.filter(e => e.customerId === user.id || e.customerEmail === user.email));
      }
      setIsLoading(false);
    };
    fetchData();
  }, [user]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name, phone, businessName, gstNumber });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ user, orders, enquiries }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `chhabilal_data_${user?.email || 'customer'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <User className="w-12 h-12 text-[#8B0000] mx-auto" />
        <h2 className="font-royal text-2xl font-bold text-[#8B0000]">Customer Account Access</h2>
        <p className="text-xs text-[#4A443F]">Please log in to view your orders, saved addresses, and wholesale quotations.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 font-sans space-y-8">
      
      {/* Customer Header Banner */}
      <div className="bg-[#58141C] text-[#FAF9F6] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[#D4AF37] font-royal font-bold text-xs uppercase tracking-widest">
            Customer Portal
          </span>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#F2EDE4]">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-[#E5E1DA]/80">
            {user.email} • {user.phone || 'No phone added'} {user.businessName ? `• ${user.businessName}` : ''}
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-[#FAF9F6]/10 hover:bg-white/20 text-[#FAF9F6] border border-[#D4AF37]/40 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4 text-[#D4AF37]" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E5E1DA] pb-3">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === 'orders' ? 'bg-[#8B0000] text-white shadow-xs' : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order Requests ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === 'enquiries' ? 'bg-[#8B0000] text-white shadow-xs' : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA]'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Quotations & Enquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === 'profile' ? 'bg-[#8B0000] text-white shadow-xs' : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & GST Details</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === 'privacy' ? 'bg-[#8B0000] text-white shadow-xs' : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Data Export & Privacy</span>
        </button>
      </div>

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="font-royal text-xl font-bold text-[#2D2926]">Your Order Requests</h3>
          {orders.length === 0 ? (
            <div className="bg-[#FAF9F6] border border-[#E5E1DA] rounded-2xl p-12 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#8B0000] mx-auto" />
              <h4 className="font-royal text-base font-bold text-[#2D2926]">No Orders Submitted Yet</h4>
              <p className="text-xs text-[#4A443F]">Browse our wedding collection and wholesale products to place your first order request.</p>
              {onExploreCards && (
                <button
                  onClick={onExploreCards}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-white text-xs uppercase tracking-wider font-semibold rounded-xl"
                >
                  Browse Cards Catalog
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(ord => (
                <div key={ord.id} className="bg-[#FAF9F6] border border-[#E5E1DA] rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between border-b border-[#E5E1DA] pb-3 gap-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#8B0000]">{ord.orderNumber}</span>
                      <span className="text-xs text-[#8C847C] ml-3">Date: {ord.createdAt.substring(0, 10)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#F2EDE4] text-[#8B0000] border border-[#D1CABF] rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Status: {ord.orderStatus}
                      </span>
                      <span className="px-2.5 py-1 bg-[#F2EDE4] text-[#4A443F] border border-[#D1CABF] rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Payment: {ord.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-[#2D2926]">
                        <span><strong>{it.productName}</strong> ({it.productCode}) × {it.quantity} pcs</span>
                        <span className="font-semibold text-[#8B0000]">₹{it.subtotal.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#E5E1DA] gap-2">
                    <div>
                      <span className="text-xs text-[#8C847C]">Grand Total: </span>
                      <span className="font-royal text-lg font-bold text-[#8B0000]">₹{ord.grandTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => generatePrintableQuotation(ord)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D1CABF] text-[#2D2926] text-xs font-semibold rounded-lg"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#8B0000]" />
                        <span>Print Order Invoice</span>
                      </button>

                      <a
                        href={generateOrderWhatsappUrl(ord)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs font-semibold rounded-lg"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#F2EDE4]" />
                        <span>Notify Shop on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ENQUIRIES TAB */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <h3 className="font-royal text-xl font-bold text-[#2D2926]">Your Customization Enquiries</h3>
          {enquiries.length === 0 ? (
            <div className="bg-[#FAF9F6] border border-[#E5E1DA] rounded-2xl p-12 text-center space-y-3">
              <MessageCircle className="w-10 h-10 text-[#8B0000] mx-auto" />
              <h4 className="font-royal text-base font-bold text-[#2D2926]">No Customization Enquiries Logged</h4>
              <p className="text-xs text-[#4A443F]">When you submit an enquiry form or sample kit request, tracking history will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {enquiries.map(enq => (
                <div key={enq.id} className="bg-[#FAF9F6] border border-[#E5E1DA] rounded-2xl p-4 shadow-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-xs text-[#8B0000]">{enq.enquiryNumber}</span>
                    <span className="bg-[#F2EDE4] text-[#8B0000] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#2D2926] font-semibold">{enq.productName || 'General Invitation Inquiry'}</p>
                  <p className="text-xs text-[#4A443F] italic">"{enq.message}"</p>
                  <span className="text-[10px] text-[#8C847C] block">Submitted on: {enq.createdAt.substring(0, 10)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSave} className="bg-[#FAF9F6] border border-[#E5E1DA] rounded-2xl p-6 space-y-4 max-w-2xl">
          <h3 className="font-royal text-xl font-bold text-[#2D2926]">Edit Customer & GST Profile</h3>

          {saveSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#2D2926]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs outline-none focus:border-[#8B0000]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#2D2926]">Phone / WhatsApp</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs outline-none focus:border-[#8B0000]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#2D2926]">School / Business Name (For GST Tax Invoicing)</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs outline-none focus:border-[#8B0000]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#2D2926]">GSTIN Registration Number</label>
              <input
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs outline-none focus:border-[#8B0000]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold rounded-xl shadow-xs transition-all"
          >
            Save Profile Changes
          </button>
        </form>
      )}

      {/* PRIVACY & DATA EXPORT TAB */}
      {activeTab === 'privacy' && (
        <div className="bg-[#FAF9F6] border border-[#E5E1DA] rounded-2xl p-6 space-y-4 max-w-2xl font-sans">
          <h3 className="font-royal text-xl font-bold text-[#2D2926]">Data Privacy & Export Center</h3>
          <p className="text-xs text-[#4A443F] leading-relaxed">
            In accordance with digital data privacy regulations, you have full ownership over your account information, order histories, and saved records.
          </p>

          <div className="pt-2 space-y-3">
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#2D2926] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
            >
              <Download className="w-4 h-4 text-[#8B0000]" />
              <span>Export All Account Data (JSON)</span>
            </button>

            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2 text-xs text-red-800">
              <strong className="block">Request Account Deletion:</strong>
              <p>You can request to delete your customer profile. Retained accounting records for completed invoices will be anonymized in compliance with GST guidelines.</p>
              <button
                onClick={() => alert('Account deletion request received. Chhabilal Cards admin will process within 24 hours.')}
                className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold"
              >
                Submit Account Deletion Request
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
