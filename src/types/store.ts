export type CollectionSlug = 'aarohi' | 'noor' | 'saanjh' | 'solis';

export type ProductCategory =
  | 'Necklaces'
  | 'Rings'
  | 'Earrings'
  | 'Bracelets & Bangles'
  | 'Mangalsutra';

export type ProductTier =
  | 'Fine Heritage'
  | 'Lab-Grown Diamond'
  | 'Everyday 18KT'
  | 'Demi-Fine Waterproof';

export type Occasion =
  | 'Bridal & Festive'
  | 'Daily Wear'
  | 'Work & Minimal'
  | 'Gifting'
  | 'Date & Cocktail';

export type Recipient =
  | 'For Her'
  | 'Bridal Trousseau'
  | 'Anniversary'
  | 'Self-Purchase';

export type MetalFinish =
  | 'Yellow Gold'
  | 'Rose Gold'
  | 'White Gold'
  | '18K Gold Vermeil'
  | 'Rhodium Silver';

export type PurityOption =
  | '22KT'
  | '18KT'
  | '14KT'
  | '18K Vermeil / 925 Silver';

export interface GoldRates {
  '24KT': number;
  '22KT': number;
  '18KT': number;
  '14KT': number;
  '925 Silver': number;
}

export interface PriceBreakup {
  purity: PurityOption;
  ratePerGram: number;
  weightGrams: number;
  metalValue: number;
  stoneValue: number;
  makingChargePct: number;
  makingCharges: number;
  subtotalBeforeTax: number;
  gstRatePct: number;
  gst: number;
  finalPrice: number;
  isFixedDemiFine: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  collection: CollectionSlug;
  category: ProductCategory;
  tier: ProductTier;
  occasions: Occasion[];
  recipients: Recipient[];
  metalVariants: MetalFinish[];
  purityOptions: PurityOption[];
  ringSizes?: number[];
  weightGrams: number;
  stoneValueInr: number;
  stoneSpec: string;
  certifications: string[];
  makingChargePct: number;
  fixedBasePriceInr?: number;
  inStock: boolean;
  dispatchDays: number;
  images: string[];
  completeTheLookIds: string[];
  description: string;
  careInstructions: string;
  isBestseller?: boolean;
}

export interface CollectionInfo {
  slug: CollectionSlug;
  name: string;
  tagline: string;
  subtitle: string;
  tier: ProductTier;
  puritySummary: string;
  description: string;
  heroImage: string;
  accentNote: string;
}

export interface LookbookHotspot {
  id: string;
  productId: string;
  xPct: number;
  yPct: number;
  label: string;
}

export interface LookbookScene {
  id: string;
  title: string;
  subtitle: string;
  collection: CollectionSlug;
  image: string;
  description: string;
  hotspots: LookbookHotspot[];
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  slug: string;
  name: string;
  collection: CollectionSlug;
  category: ProductCategory;
  image: string;
  selectedMetal: MetalFinish;
  selectedPurity: PurityOption;
  ringSize?: number;
  engraving?: string;
  quantity: number;
}

export interface BoutiqueInfo {
  id: string;
  name: string;
  city: string;
  shortLabel: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  services: string[];
}

export interface PromoCodeConfig {
  code: 'PIXTACY10' | 'FIRST500';
  label: string;
  description: string;
  type: 'percentage' | 'flat';
  value: number;
}

export interface BoutiqueBooking {
  id: string;
  mode: 'boutique' | 'video';
  boutiqueId: string;
  boutiqueName: string;
  city: string;
  date: string;
  timeSlot: string;
  collectionInterest: CollectionSlug | 'all';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  createdAt: string;
}

export interface DemoOrderItem {
  productId: string;
  name: string;
  collection: CollectionSlug;
  image: string;
  selectedMetal: MetalFinish;
  selectedPurity: PurityOption;
  ringSize?: number;
  engraving?: string;
  quantity: number;
  unitPriceInr: number;
  lineTotalInr: number;
}

export interface DemoOrder {
  orderId: string;
  createdAt: string;
  deliveryMethod: 'courier' | 'boutique_pickup';
  boutiqueName?: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'upi' | 'card' | 'netbanking';
  items: DemoOrderItem[];
  subtotalInr: number;
  solisBundleDiscountInr: number;
  promoCode?: string;
  promoDiscountInr: number;
  totalInr: number;
  giftBox: boolean;
  giftNote?: string;
  estimatedDelivery: string;
}

export interface UxBenchmark {
  id: string;
  screenType: 'PLP' | 'PDP';
  appName: string;
  platform: 'web' | 'ios';
  mobbinUrl: string;
  patternSummary: string;
  pixtacyApplication: string;
}
