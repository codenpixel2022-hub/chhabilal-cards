import { 
  ProductItem, 
  CategoryItem, 
  Order, 
  Enquiry, 
  Quotation, 
  Promotion, 
  Banner, 
  WebsiteSectionConfig, 
  FaqItem, 
  AuditLog, 
  BusinessSettings,
  PresetType
} from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { WEDDING_CARDS_DATA, STATIONERY_DATA } from '../data/products';
import { BUSINESS_INFO } from '../data/reviews';

// Initial Storage Keys
const STORAGE_KEYS = {
  PRODUCTS: 'chb_products_v1',
  CATEGORIES: 'chb_categories_v1',
  ORDERS: 'chb_orders_v1',
  ENQUIRIES: 'chb_enquiries_v1',
  QUOTATIONS: 'chb_quotations_v1',
  PROMOTIONS: 'chb_promotions_v1',
  BANNERS: 'chb_banners_v1',
  SECTIONS: 'chb_sections_v1',
  FAQS: 'chb_faqs_v1',
  SETTINGS: 'chb_settings_v1',
  AUDIT_LOGS: 'chb_audit_logs_v1',
};

// Seed Categories
export const SEED_CATEGORIES: CategoryItem[] = [
  { id: 'cat-01', slug: 'wedding-cards', name: 'Wedding Cards', description: 'Opulent wedding invitations, 3D mandap pop-ups, Farman scrolls, and metallic pearl series', active: true, featured: true, homepageVisible: true, navVisible: true, displayOrder: 1 },
  { id: 'cat-02', slug: 'birthday-cards', name: 'Birthday Cards', description: 'Vibrant kids & milestone celebration cards', active: true, featured: false, homepageVisible: true, navVisible: true, displayOrder: 2 },
  { id: 'cat-03', slug: 'engagement-cards', name: 'Engagement Cards', description: 'Elegant ring ceremony and Roka invitations', active: true, featured: false, homepageVisible: true, navVisible: true, displayOrder: 3 },
  { id: 'cat-04', slug: 'anniversary-cards', name: 'Anniversary Cards', description: 'Silver, Golden, and Diamond milestone wedding anniversary cards', active: true, featured: false, homepageVisible: true, navVisible: true, displayOrder: 4 },
  { id: 'cat-05', slug: 'event-cards', name: 'Event & Ceremonial Cards', description: 'Griha Pravesh, Thread Ceremony, and corporate event cards', active: true, featured: false, homepageVisible: true, navVisible: true, displayOrder: 5 },
  { id: 'cat-06', slug: 'office-stationery', name: 'Office Stationery', description: 'Commercial files, letterheads, invoice books, and custom registers', active: true, featured: true, homepageVisible: true, navVisible: true, displayOrder: 6 },
  { id: 'cat-07', slug: 'school-stationery', name: 'School Supplies', description: 'Durable school notebooks, practical files, and report card covers', active: true, featured: true, homepageVisible: true, navVisible: true, displayOrder: 7 },
  { id: 'cat-08', slug: 'notebooks', name: 'Notebooks & Registers', description: 'Hardcover bound registers and spiraled notebooks', active: true, featured: false, homepageVisible: true, navVisible: true, displayOrder: 8 },
  { id: 'cat-09', slug: 'diaries', name: 'Corporate Diaries', description: 'Executive leatherette & faux velvet 2026 planner diaries', active: true, featured: false, homepageVisible: true, navVisible: true, displayOrder: 9 },
  { id: 'cat-10', slug: 'files-folders', name: 'Files & Folders', description: 'Laminated board files, spring files, and cobra folders', active: true, featured: false, homepageVisible: true, navVisible: true, displayOrder: 10 },
  { id: 'cat-11', slug: 'id-cards', name: 'ID Cards & Lanyards', description: 'Custom PVC ID cards with printed school/company lanyards', active: true, featured: false, homepageVisible: true, navVisible: true, displayOrder: 11 },
  { id: 'cat-12', slug: 'bags', name: 'Eco Carry Bags', description: 'Custom screen-printed non-woven and paper carry bags', active: true, featured: false, homepageVisible: true, navVisible: true, displayOrder: 12 },
  { id: 'cat-13', slug: 'customized-printing', name: 'Customized Printing', description: 'Hot foil stamping, thermography, and embossing services', active: true, featured: true, homepageVisible: true, navVisible: true, displayOrder: 13 },
];

// Seed Section Config
export const SEED_SECTIONS: WebsiteSectionConfig[] = [
  { id: 'sec-hero', name: 'Hero Banner & Interactive Viewer', enabled: true, displayOrder: 1 },
  { id: 'sec-categories', name: 'Category Grid Navigation', enabled: true, displayOrder: 2 },
  { id: 'sec-wedding', name: 'Wedding Cards Showcase', enabled: true, displayOrder: 3 },
  { id: 'sec-offers', name: 'Special Promotions & Bulk Offers', enabled: true, displayOrder: 4 },
  { id: 'sec-featured', name: 'Featured Products Section', enabled: true, displayOrder: 5 },
  { id: 'sec-office', name: 'Office Stationery Section', enabled: true, displayOrder: 6 },
  { id: 'sec-school', name: 'School Supplies Section', enabled: true, displayOrder: 7 },
  { id: 'sec-bulk', name: 'Wholesale Bulk Order Banner', enabled: true, displayOrder: 8 },
  { id: 'sec-testimonials', name: 'Customer Reviews & Ratings', enabled: true, displayOrder: 9 },
  { id: 'sec-about', name: 'About Workshop & Location', enabled: true, displayOrder: 10 },
  { id: 'sec-whatsapp', name: 'Floating WhatsApp CTA', enabled: true, displayOrder: 11 },
];

// Seed Promotions
export const SEED_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-01',
    name: 'Wedding Season Special — 10% Off Wholesale',
    type: 'PERCENTAGE',
    discountValue: 10,
    categorySlug: 'wedding-cards',
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    placement: 'HERO',
    active: true,
    priority: 1,
    bannerText: '✨ Wedding Season Offer: Flat 10% Extra Discount on Bulk Orders Over 500 Pcs!',
    ctaLink: '#wedding-cards-catalog'
  },
  {
    id: 'promo-02',
    name: 'Free Gold Foil Customization',
    type: 'FREE_CUSTOMIZATION',
    discountValue: 0,
    categorySlug: 'wedding-cards',
    startDate: '2026-09-01',
    endDate: '2026-11-30',
    placement: 'ANNOUNCEMENT',
    active: true,
    priority: 2,
    bannerText: '🔥 Free Ganesha Emblem & Multilingual Gold Foil Stamping in Odia & Hindi!',
    ctaLink: '#customizer'
  }
];

// Seed FAQs
export const SEED_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is the standard turnaround time for wedding card printing?',
    answer: 'Digital proofing is completed within 12–24 hours via WhatsApp. Once approved, printing and dispatch take 2–4 business days across Western Odisha.',
    category: 'Ordering',
    active: true,
    displayOrder: 1,
  },
  {
    id: 'faq-2',
    question: 'What is the Minimum Order Quantity (MOQ)?',
    answer: 'For wedding cards, the MOQ is 100 pieces. For custom office filing and school notebooks, MOQs start from 50 units.',
    category: 'Ordering',
    active: true,
    displayOrder: 2,
  },
  {
    id: 'faq-3',
    question: 'Can we print in Odia, Hindi, and English languages?',
    answer: 'Yes! We specialize in multilingual wedding typography including pure Odia scripts, Hindi Devanagari, English, and bilingual combined layouts.',
    category: 'Customization',
    active: true,
    displayOrder: 3,
  },
  {
    id: 'faq-4',
    question: 'Do you offer GST tax invoices for corporate and educational institutions?',
    answer: 'Yes, Chhabilal Cards has been fully GST registered since 2017. All corporate, school, and government orders receive official GST tax invoices.',
    category: 'Billing',
    active: true,
    displayOrder: 4,
  }
];

export const SEED_SETTINGS: BusinessSettings = {
  businessName: 'Chhabilal Cards',
  legalName: 'Chhabilal Cards & Stationery Hub',
  tagline: 'Western Odisha’s Most Trusted Wedding Cards & Stationery Manufacturer',
  phone1: BUSINESS_INFO.phone1,
  phone2: BUSINESS_INFO.phone2,
  whatsappNumber: BUSINESS_INFO.whatsapp,
  email: BUSINESS_INFO.email,
  address: BUSINESS_INFO.address,
  landmark: BUSINESS_INFO.landmark,
  city: 'Brajarajnagar (Jharsuguda)',
  state: 'Odisha',
  pincode: '768216',
  gstNumber: BUSINESS_INFO.gst,
  hours: BUSINESS_INFO.hours,
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Chhabilal Cards Brajarajnagar Jharsuguda Odisha')}`,
  ownerEmail: BUSINESS_INFO.email,
  isWhatsappApiEnabled: false,
};

// Local Storage Helper Utilities
function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

/**
 * Main Data Store Interface
 */
export class DataStore {
  // Initial seed products compilation
  private static initialProducts(): ProductItem[] {
    const all = [
      ...WEDDING_CARDS_DATA.map(p => ({ ...p, active: true, homepageVisible: true, enquiryEnabled: true, displayOrder: 1 })),
      ...STATIONERY_DATA.map(p => ({ ...p, active: true, homepageVisible: true, enquiryEnabled: true, displayOrder: 2 }))
    ];
    return all;
  }

  // --- PRODUCTS ---
  public static async getProducts(): Promise<ProductItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('products').select('*').order('displayOrder', { ascending: true });
      if (!error && data && data.length > 0) return data as ProductItem[];
    }
    return getLocal(STORAGE_KEYS.PRODUCTS, this.initialProducts());
  }

  public static async saveProduct(product: ProductItem): Promise<ProductItem> {
    const products = await this.getProducts();
    const idx = products.findIndex(p => p.id === product.id);
    let updated: ProductItem[];
    if (idx > -1) {
      updated = [...products];
      updated[idx] = { ...product, updatedAt: new Date().toISOString() };
    } else {
      updated = [...products, { ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
    }

    if (isSupabaseConfigured && supabase) {
      await supabase.from('products').upsert(product);
    }
    setLocal(STORAGE_KEYS.PRODUCTS, updated);
    this.addAuditLog('System Admin', 'UPDATE_PRODUCT', 'Product', product.id, `Saved product ${product.name}`);
    return product;
  }

  public static async deleteProduct(id: string): Promise<void> {
    const products = await this.getProducts();
    const updated = products.filter(p => p.id !== id);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('products').delete().eq('id', id);
    }
    setLocal(STORAGE_KEYS.PRODUCTS, updated);
    this.addAuditLog('System Admin', 'DELETE_PRODUCT', 'Product', id, `Deleted product ${id}`);
  }

  // --- CATEGORIES ---
  public static async getCategories(): Promise<CategoryItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('categories').select('*').order('displayOrder', { ascending: true });
      if (data && data.length > 0) return data as CategoryItem[];
    }
    return getLocal(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
  }

  public static async saveCategory(cat: CategoryItem): Promise<CategoryItem> {
    const categories = await this.getCategories();
    const idx = categories.findIndex(c => c.id === cat.id);
    let updated = [...categories];
    if (idx > -1) updated[idx] = cat;
    else updated.push(cat);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('categories').upsert(cat);
    }
    setLocal(STORAGE_KEYS.CATEGORIES, updated);
    return cat;
  }

  // --- ORDERS ---
  public static async getOrders(): Promise<Order[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('orders').select('*').order('createdAt', { ascending: false });
      if (data) return data as Order[];
    }
    return getLocal(STORAGE_KEYS.ORDERS, []);
  }

  public static async createOrder(order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const orders = await this.getOrders();
    const orderCount = orders.length + 1;
    const year = new Date().getFullYear();
    const orderNumber = `CHB-${year}-${String(orderCount).padStart(6, '0')}`;
    const newOrder: Order = {
      ...order,
      id: 'ord-' + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...orders];
    if (isSupabaseConfigured && supabase) {
      await supabase.from('orders').insert(newOrder);
    }
    setLocal(STORAGE_KEYS.ORDERS, updated);
    this.addAuditLog('Customer', 'CREATE_ORDER', 'Order', newOrder.orderNumber, `Order placed by ${newOrder.customerName}`);
    return newOrder;
  }

  public static async updateOrderStatus(orderId: string, status: Order['orderStatus'], paymentStatus?: Order['paymentStatus']): Promise<Order | null> {
    const orders = await this.getOrders();
    const idx = orders.findIndex(o => o.id === orderId || o.orderNumber === orderId);
    if (idx === -1) return null;

    const updatedOrder = { 
      ...orders[idx], 
      orderStatus: status, 
      paymentStatus: paymentStatus || orders[idx].paymentStatus,
      updatedAt: new Date().toISOString() 
    };
    orders[idx] = updatedOrder;

    if (isSupabaseConfigured && supabase) {
      await supabase.from('orders').update({ orderStatus: status, paymentStatus: updatedOrder.paymentStatus }).eq('id', orderId);
    }
    setLocal(STORAGE_KEYS.ORDERS, orders);
    this.addAuditLog('System Admin', 'UPDATE_ORDER', 'Order', orderId, `Updated status to ${status}`);
    return updatedOrder;
  }

  // --- ENQUIRIES ---
  public static async getEnquiries(): Promise<Enquiry[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('enquiries').select('*').order('createdAt', { ascending: false });
      if (data) return data as Enquiry[];
    }
    return getLocal(STORAGE_KEYS.ENQUIRIES, []);
  }

  public static async createEnquiry(enquiry: Omit<Enquiry, 'id' | 'enquiryNumber' | 'createdAt' | 'updatedAt'>): Promise<Enquiry> {
    const enquiries = await this.getEnquiries();
    const count = enquiries.length + 1;
    const year = new Date().getFullYear();
    const enquiryNumber = `ENQ-${year}-${String(count).padStart(6, '0')}`;
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      enquiryNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newEnquiry, ...enquiries];
    if (isSupabaseConfigured && supabase) {
      await supabase.from('enquiries').insert(newEnquiry);
    }
    setLocal(STORAGE_KEYS.ENQUIRIES, updated);
    this.addAuditLog('Customer', 'CREATE_ENQUIRY', 'Enquiry', newEnquiry.enquiryNumber, `New enquiry from ${newEnquiry.customerName}`);
    return newEnquiry;
  }

  public static async updateEnquiryStatus(id: string, status: Enquiry['status'], followUpDate?: string, followUpNotes?: string): Promise<Enquiry | null> {
    const enquiries = await this.getEnquiries();
    const idx = enquiries.findIndex(e => e.id === id);
    if (idx === -1) return null;

    const updated = {
      ...enquiries[idx],
      status,
      followUpDate: followUpDate || enquiries[idx].followUpDate,
      followUpNotes: followUpNotes || enquiries[idx].followUpNotes,
      updatedAt: new Date().toISOString(),
    };
    enquiries[idx] = updated;

    if (isSupabaseConfigured && supabase) {
      await supabase.from('enquiries').update({ status, followUpDate, followUpNotes }).eq('id', id);
    }
    setLocal(STORAGE_KEYS.ENQUIRIES, enquiries);
    return updated;
  }

  // --- PROMOTIONS ---
  public static async getPromotions(): Promise<Promotion[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('promotions').select('*').order('priority', { ascending: true });
      if (data) return data as Promotion[];
    }
    return getLocal(STORAGE_KEYS.PROMOTIONS, SEED_PROMOTIONS);
  }

  public static async savePromotion(promo: Promotion): Promise<Promotion> {
    const promos = await this.getPromotions();
    const idx = promos.findIndex(p => p.id === promo.id);
    let updated = [...promos];
    if (idx > -1) updated[idx] = promo;
    else updated.push(promo);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('promotions').upsert(promo);
    }
    setLocal(STORAGE_KEYS.PROMOTIONS, updated);
    return promo;
  }

  // --- WEBSITE CONTROL CENTER (SECTIONS) ---
  public static async getSectionConfigs(): Promise<WebsiteSectionConfig[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('website_sections').select('*').order('displayOrder', { ascending: true });
      if (data && data.length > 0) return data as WebsiteSectionConfig[];
    }
    return getLocal(STORAGE_KEYS.SECTIONS, SEED_SECTIONS);
  }

  public static async saveSectionConfigs(configs: WebsiteSectionConfig[]): Promise<WebsiteSectionConfig[]> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('website_sections').upsert(configs);
    }
    setLocal(STORAGE_KEYS.SECTIONS, configs);
    this.addAuditLog('System Admin', 'UPDATE_SECTIONS', 'WebsiteCMS', 'homepage', 'Updated homepage section visibility');
    return configs;
  }

  // --- PRESETS ---
  public static async applyPreset(preset: PresetType): Promise<void> {
    const categories = await this.getCategories();
    const sections = await this.getSectionConfigs();

    if (preset === 'wedding-season') {
      const updatedCats = categories.map(c => ({
        ...c,
        homepageVisible: c.slug === 'wedding-cards' || c.slug === 'birthday-cards' || c.slug === 'customized-printing',
      }));
      await Promise.all(updatedCats.map(c => this.saveCategory(c)));

      const updatedSecs = sections.map(s => ({
        ...s,
        enabled: s.id !== 'sec-school' && s.id !== 'sec-office',
      }));
      await this.saveSectionConfigs(updatedSecs);
    } else if (preset === 'school-season') {
      const updatedCats = categories.map(c => ({
        ...c,
        homepageVisible: c.slug === 'school-stationery' || c.slug === 'office-stationery' || c.slug === 'notebooks' || c.slug === 'id-cards' || c.slug === 'files-folders',
      }));
      await Promise.all(updatedCats.map(c => this.saveCategory(c)));

      const updatedSecs = sections.map(s => ({
        ...s,
        enabled: s.id !== 'sec-wedding',
      }));
      await this.saveSectionConfigs(updatedSecs);
    } else {
      // Full Catalog
      const updatedCats = categories.map(c => ({ ...c, homepageVisible: true }));
      await Promise.all(updatedCats.map(c => this.saveCategory(c)));

      const updatedSecs = sections.map(s => ({ ...s, enabled: true }));
      await this.saveSectionConfigs(updatedSecs);
    }
  }

  // --- FAQS ---
  public static async getFaqs(): Promise<FaqItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('faqs').select('*').order('displayOrder', { ascending: true });
      if (data && data.length > 0) return data as FaqItem[];
    }
    return getLocal(STORAGE_KEYS.FAQS, SEED_FAQS);
  }

  // --- BUSINESS SETTINGS ---
  public static async getSettings(): Promise<BusinessSettings> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('business_settings').select('*').single();
      if (data) return data as BusinessSettings;
    }
    return getLocal(STORAGE_KEYS.SETTINGS, SEED_SETTINGS);
  }

  public static async saveSettings(settings: BusinessSettings): Promise<BusinessSettings> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('business_settings').upsert({ id: 'primary', ...settings });
    }
    setLocal(STORAGE_KEYS.SETTINGS, settings);
    this.addAuditLog('System Admin', 'UPDATE_SETTINGS', 'Settings', 'primary', 'Updated business settings');
    return settings;
  }

  // --- AUDIT LOGS ---
  public static getAuditLogs(): AuditLog[] {
    return getLocal(STORAGE_KEYS.AUDIT_LOGS, []);
  }

  public static addAuditLog(adminEmail: string, action: string, targetEntity: string, targetId: string | undefined, details: string): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: 'log-' + Date.now() + Math.random().toString(36).substring(2, 5),
      adminEmail,
      action,
      targetEntity,
      targetId,
      details,
      timestamp: new Date().toISOString(),
    };
    setLocal(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...logs.slice(0, 199)]);
  }
}
