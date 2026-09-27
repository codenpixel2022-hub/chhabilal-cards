import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  MessageCircle, 
  MapPin, 
  FileText, 
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { SAMPLE_TRACKING_ORDERS, TrackedOrder } from '../data/orders';
import { BUSINESS_INFO } from '../data/reviews';

export const OrderTracker: React.FC = () => {
  const [inputOrderId, setInputOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<TrackedOrder | null>(SAMPLE_TRACKING_ORDERS['CC-8821']);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = inputOrderId.trim().toUpperCase();
    if (!cleanId) {
      setSearchError('Please enter a valid Order ID (e.g., CC-8821).');
      return;
    }

    setHasSearched(true);
    if (SAMPLE_TRACKING_ORDERS[cleanId]) {
      setSearchedOrder(SAMPLE_TRACKING_ORDERS[cleanId]);
      setSearchError(null);
    } else {
      // If it looks like a standard format, generate realistic tracking
      if (cleanId.startsWith('CC-') || cleanId.startsWith('ORD-') || cleanId.length >= 4) {
        setSearchedOrder({
          orderId: cleanId,
          customerName: 'Valued Patron',
          productName: 'Custom Offset & Foil Wedding Stationery',
          productCode: 'CUSTOM-PRINT',
          quantity: 200,
          orderDate: 'Recent',
          expectedDelivery: 'In 3–4 business days',
          currentStage: 'printing_press',
          destinationCity: 'Western Odisha / Pan-India',
          notes: 'Multilingual printing proof verified by workshop.',
          steps: [
            {
              title: 'Order & Proof Verified',
              description: 'Customer manuscript confirmed on WhatsApp.',
              date: 'Completed',
              completed: true
            },
            {
              title: 'Die & Screen Processing',
              description: 'Embossing dies and screen frames aligned.',
              date: 'Completed',
              completed: true
            },
            {
              title: 'Manufacturing & Heidelberg Pressing',
              description: 'Gold hot-foil stamping and paper scoring in progress at Brajarajnagar.',
              date: 'Current Stage',
              completed: false,
              current: true
            },
            {
              title: 'Finishing & Strict Quality Audit',
              description: 'Counting, ribbon/accessories placement, moisture-proof seal.',
              date: 'Pending',
              completed: false
            },
            {
              title: 'Regional Courier Dispatch / Pickup',
              description: 'DTDC / Speed Post / Direct delivery handover.',
              date: 'Upcoming',
              completed: false
            }
          ]
        });
        setSearchError(null);
      } else {
        setSearchedOrder(null);
        setSearchError(`No active manufacturing record found for "${cleanId}". Please check your order invoice or contact WhatsApp support.`);
      }
    }
  };

  const loadSampleOrder = (id: string) => {
    setInputOrderId(id);
    setSearchedOrder(SAMPLE_TRACKING_ORDERS[id]);
    setHasSearched(true);
    setSearchError(null);
  };

  const getStageBadge = (stage: TrackedOrder['currentStage']) => {
    switch (stage) {
      case 'dispatched':
        return { label: 'Dispatched & In-Transit', bg: 'bg-blue-900 text-blue-100 border-blue-700' };
      case 'delivered':
        return { label: 'Successfully Delivered', bg: 'bg-emerald-800 text-emerald-100 border-emerald-600' };
      case 'printing_press':
        return { label: 'In Press & Gold Foil Stamping', bg: 'bg-[#8B0000] text-white border-[#D4AF37]' };
      case 'finishing_binding':
        return { label: 'Hand Crafting & Box Binding', bg: 'bg-amber-900 text-amber-100 border-amber-700' };
      default:
        return { label: 'Proof Design & Die Setup', bg: 'bg-stone-800 text-stone-100 border-stone-600' };
    }
  };

  return (
    <div id="order-tracking-module" className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 border border-[#E5E1DA] shadow-xs space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E1DA] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B0000]">
            <Truck className="w-4 h-4 text-[#8B0000]" />
            <span>Real-Time Production & Dispatch Tracking</span>
          </div>
          <h3 className="font-royal text-2xl font-bold text-[#2D2926]">
            Track Your Order Status
          </h3>
          <p className="text-xs text-[#4A443F] max-w-xl leading-relaxed">
            Check the live progress of your wedding invitations, legal files, or institutional stationery from our Brajarajnagar manufacturing facility to your doorstep.
          </p>
        </div>

        {/* Sample Quick IDs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-[#8C847C] font-medium mr-1">Demo IDs:</span>
          {Object.keys(SAMPLE_TRACKING_ORDERS).map((id) => (
            <button
              key={id}
              onClick={() => loadSampleOrder(id)}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#8B0000] font-bold transition-colors"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C847C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="order-tracking-input"
              type="text"
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
              placeholder="Enter your Order ID (e.g. CC-8821, CC-9042)"
              className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-[#D1CABF] rounded-xl text-sm font-medium text-[#2D2926] placeholder-[#8C847C] focus:outline-hidden focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] uppercase font-mono tracking-wider"
            />
          </div>
          <button
            id="track-order-submit-btn"
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8B0000] hover:bg-[#6D0000] text-white rounded-xl font-semibold text-xs uppercase tracking-wider shadow-xs transition-all shrink-0"
          >
            <Search className="w-4 h-4 text-[#FAF9F6]" />
            <span>Track Order</span>
          </button>
        </div>

        {searchError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{searchError}</span>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(`Hello Chhabilal Cards, I need help checking the status of my order ID: ${inputOrderId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 font-bold underline text-red-900 hover:text-black"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        )}
      </form>

      {/* Order Status Display Card */}
      {searchedOrder && (
        <div className="bg-[#FAF9F6] border border-[#E5E1DA] rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
          {/* Top Order Meta Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F2EDE4] p-4 rounded-xl border border-[#D1CABF]">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono font-bold text-base text-[#8B0000]">
                  #{searchedOrder.orderId}
                </span>
                <span className={`text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getStageBadge(searchedOrder.currentStage).bg}`}>
                  {getStageBadge(searchedOrder.currentStage).label}
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#2D2926]">
                {searchedOrder.productName}
              </h4>
              <p className="text-xs text-[#4A443F]">
                Customer: <span className="font-medium text-[#2D2926]">{searchedOrder.customerName}</span> • Qty: <span className="font-semibold text-[#8B0000]">{searchedOrder.quantity} Units</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-3 text-xs border-t md:border-t-0 md:border-l border-[#D1CABF] pt-3 md:pt-0 md:pl-4">
              <div>
                <div className="text-[10px] text-[#8C847C] uppercase tracking-wider">Destination:</div>
                <div className="font-semibold text-[#2D2926] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>{searchedOrder.destinationCity}</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-[#8C847C] uppercase tracking-wider">Est. Delivery:</div>
                <div className="font-semibold text-[#8B0000] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>{searchedOrder.expectedDelivery}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Courier & Tracking Meta info if dispatched */}
          {searchedOrder.courierPartner && (
            <div className="bg-[#FAF9F6] border border-[#D1CABF] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8B0000]" />
                <span className="text-[#4A443F]">
                  Shipped via: <strong className="text-[#2D2926]">{searchedOrder.courierPartner}</strong>
                </span>
                {searchedOrder.trackingNumber && (
                  <span className="font-mono bg-[#F2EDE4] px-2 py-0.5 rounded border border-[#E5E1DA] text-[#2D2926]">
                    Docket: {searchedOrder.trackingNumber}
                  </span>
                )}
              </div>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(`Hello Chhabilal Cards, inquiring about dispatch update for order ${searchedOrder.orderId} (${searchedOrder.courierPartner})`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#8B0000] hover:underline font-semibold text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>Ask Dispatch Desk on WhatsApp</span>
              </a>
            </div>
          )}

          {/* Stepper Timeline */}
          <div className="space-y-4 pt-2">
            <h5 className="text-xs font-bold text-[#2D2926] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>Manufacturing & Milestone Progress</span>
            </h5>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E1DA]">
              {searchedOrder.steps.map((step, idx) => {
                const isDone = step.completed;
                const isCurrent = step.current;

                return (
                  <div key={idx} className="relative group">
                    {/* Node Dot / Icon */}
                    <div className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                      isDone 
                        ? 'bg-[#8B0000] border-[#8B0000] text-white shadow-xs' 
                        : isCurrent 
                          ? 'bg-[#D4AF37] border-[#8B0000] text-[#2D2926] animate-pulse ring-4 ring-[#D4AF37]/20'
                          : 'bg-[#FAF9F6] border-[#D1CABF] text-[#8C847C]'
                    }`}>
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FAF9F6]" />
                      ) : isCurrent ? (
                        <Clock className="w-3.5 h-3.5 text-[#2D2926]" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D1CABF]" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className={`text-xs font-bold ${isCurrent ? 'text-[#8B0000]' : isDone ? 'text-[#2D2926]' : 'text-[#8C847C]'}`}>
                          {step.title}
                          {isCurrent && (
                            <span className="ml-2 text-[10px] uppercase font-sans font-bold bg-[#8B0000] text-white px-2 py-0.2 rounded-full">
                              In Progress Now
                            </span>
                          )}
                        </span>
                        {step.date && (
                          <span className="text-[10px] text-[#8C847C] font-mono">
                            {step.date}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#4A443F] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Assistance & Warranty Bar */}
          <div className="border-t border-[#E5E1DA] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#4A443F]">
              <ShieldCheck className="w-4 h-4 text-[#8B0000]" />
              <span>Chhabilal Quality Assurance: Pre-dispatch proof inspection completed.</span>
            </div>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(`Hello Chhabilal Cards, inquiring for update regarding my order ID: ${searchedOrder.orderId}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] rounded-lg text-[#8B0000] font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>Need Changes? WhatsApp Studio</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
