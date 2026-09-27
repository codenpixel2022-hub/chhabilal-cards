export type ProductCategory = 'all' | 'wedding-cards' | 'office-stationery' | 'school-stationery' | 'printing-services';

export type CardTheme = 
  | 'traditional-royal'
  | 'modern-floral'
  | 'scroll-farman'
  | 'velvet-box'
  | 'laser-cut'
  | '3d-popup'
  | 'metallic-pearl'
  | 'minimal-foil';

export interface ProductItem {
  id: string;
  name: string;
  category: 'wedding-cards' | 'office-stationery' | 'school-stationery';
  subCategory?: string;
  theme?: CardTheme;
  code: string;
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
  description: string;
  sampleAvailable: boolean;
  colorsAvailable: string[];
  imageUrl: string;
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
