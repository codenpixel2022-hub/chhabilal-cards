export type ProductCategory = 
  | 'all' 
  | 'wedding-cards' 
  | 'birthday-cards'
  | 'engagement-cards'
  | 'anniversary-cards'
  | 'event-cards'
  | 'office-stationery' 
  | 'school-stationery'
  | 'notebooks'
  | 'diaries'
  | 'files-folders'
  | 'id-cards'
  | 'bags'
  | 'educational-products'
  | 'customized-printing';

export type CardTheme = 
  | 'traditional-royal'
  | 'modern-floral'
  | 'scroll-farman'
  | 'velvet-box'
  | 'laser-cut'
  | '3d-popup'
  | 'metallic-pearl'
  | 'minimal-foil';

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN';

export interface UserAddress {
  id: string;
  title: string; // e.g. Home, Office, Store
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  businessName?: string;
  gstNumber?: string;
  addresses?: UserAddress[];
  createdAt: string;
  updatedAt: string;
  mustChangePassword?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subCategory?: string;
  theme?: CardTheme;
  code: string; // SKU
  pricePerPiece: number;
  minOrderQuantity: number;
  discountTiers?: { minQty: number; price: number }[];
  rating: number;
  reviewsCount: number;
  tags: string[];
  paperType?: string;
  gsm?: number;
  dimensions?: string;
  includedInserts?: number;
  features: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  description: string;
  shortDescription?: string;
  sampleAvailable: boolean;
  colorsAvailable: string[];
  imageUrl: string;
  additionalImages?: string[];
  active: boolean;
  homepageVisible: boolean;
  enquiryEnabled: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  relatedProductIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryItem {
  id: string;
  slug: ProductCategory;
  name: string;
  description: string;
  imageUrl?: string;
  active: boolean;
  featured: boolean;
  homepageVisible: boolean;
  navVisible: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedColor?: string;
  customizationNotes?: string;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  totalQuantity: number;
}

export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'IN_PRODUCTION'
  | 'READY'
  | 'DISPATCHED'
  | 'COMPLETED'
  | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'NOT_REQUIRED';

export interface OrderItem {
  productId: string;
  productName: string;
  productCode: string;
  unitPrice: number;
  quantity: number;
  selectedColor?: string;
  customizationNotes?: string;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. CHB-2026-000001
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  businessName?: string;
  gstNumber?: string;
  shippingAddress: UserAddress;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  estimatedTax: number;
  grandTotal: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paidAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  emailSent?: boolean;
  whatsappNotified?: boolean;
}

export type EnquiryStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'QUOTATION_SENT'
  | 'FOLLOW_UP'
  | 'NEGOTIATION'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'LOST';

export interface Enquiry {
  id: string;
  enquiryNumber: string; // e.g. ENQ-2026-000001
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  businessName?: string;
  productId?: string;
  productName?: string;
  productCode?: string;
  quantity: number;
  message: string;
  status: EnquiryStatus;
  followUpDate?: string; // YYYY-MM-DD
  followUpNotes?: string;
  source: 'WEBSITE_FORM' | 'DIRECT_WHATSAPP' | 'SAMPLE_KIT';
  createdAt: string;
  updatedAt: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string; // e.g. QUA-2026-000001
  enquiryId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  businessName?: string;
  gstNumber?: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  gstAmount: number;
  shippingAmount: number;
  grandTotal: number;
  validUntil: string;
  notes?: string;
  createdAt: string;
}

export interface Promotion {
  id: string;
  name: string;
  type: 'PERCENTAGE' | 'FLAT' | 'BULK' | 'SEASONAL' | 'FREE_CUSTOMIZATION';
  discountValue: number;
  categorySlug?: ProductCategory;
  productIds?: string[];
  startDate: string;
  endDate: string;
  placement: 'ANNOUNCEMENT' | 'HERO' | 'BANNER' | 'PRODUCT_PAGE' | 'POPUP';
  active: boolean;
  priority: number;
  bannerText?: string;
  ctaLink?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  desktopImageUrl: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  startDate?: string;
  endDate?: string;
  active: boolean;
  priority: number;
}

export interface WebsiteSectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  displayOrder: number;
}

export type PresetType = 'wedding-season' | 'school-season' | 'full-catalog';

export type EventName = 
  | 'page_view'
  | 'product_view'
  | 'category_view'
  | 'search'
  | 'cart_add'
  | 'cart_remove'
  | 'checkout_start'
  | 'login'
  | 'signup'
  | 'enquiry_start'
  | 'enquiry_submit'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'promotion_view'
  | 'promotion_click'
  | 'order_created'
  | 'order_completed';

export interface AnalyticsEvent {
  id: string;
  eventName: EventName;
  pageUrl: string;
  productId?: string;
  productName?: string;
  categoryId?: string;
  anonymousId: string;
  userId?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  active: boolean;
  displayOrder: number;
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  targetEntity: string;
  targetId?: string;
  details: string;
  timestamp: string;
}

export interface BusinessSettings {
  businessName: string;
  legalName: string;
  tagline: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber: string;
  hours: string;
  googleMapsUrl: string;
  resendApiKey?: string;
  ownerEmail: string;
  whatsappApiToken?: string;
  whatsappPhoneId?: string;
  isWhatsappApiEnabled: boolean;
  searchConsoleCode?: string;
}

export interface CardCustomizerState {
  cardTheme: 'crimson-gold' | 'royal-navy' | 'emerald-gold' | 'dusty-rose' | 'plum-gold' | 'pearl-champagne';
  fontStyle: 'royal-serif' | 'script-elegant' | 'modern-clean';
  auspiciousSymbol: 'ganesh' | 'om' | 'kalash' | 'ek-onkar' | 'bismillah' | 'cross' | 'swastika' | 'none';
  customSymbolText?: string;
  topBlessing: string;
  groomName: string;
  groomParents: string;
  groomGrandParents: string;
  groomNative: string;
  brideName: string;
  brideParents: string;
  brideGrandParents: string;
  brideNative: string;
  weddingDate: string;
  weddingTime: string;
  weddingVenue: string;
  weddingCity: string;
  receptionDate: string;
  receptionVenue: string;
  additionalEvents: { name: string; date: string; time: string; venue: string }[];
  rsvpName: string;
  rsvpPhone: string;
  welcomingFamily: string;
  specialNote: string;
  envelopeSeal: 'gold-wax' | 'floral-crest' | 'mandala' | 'royal-lion' | 'none';
  insertCount: number;
}

export interface QuoteItem {
  product: ProductItem;
  quantity: number;
  customizationNotes?: string;
  selectedColor?: string;
}

export interface SampleKitRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  eventType: string;
  expectedQuantity: number;
  interestedCategories: string[];
  notes?: string;
}
