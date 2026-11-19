import type {
  BoutiqueInfo,
  GoldRates,
  PriceBreakup,
  Product,
  PurityOption,
} from '@/types/store';
import { BOUTIQUES } from '@/lib/siteConfig';

export const DEFAULT_GOLD_RATES: GoldRates = {
  '24KT': 7850,
  '22KT': 7195,
  '18KT': 5890,
  '14KT': 4580,
  '925 Silver': 98,
};

export function deriveRatesFrom22K(rate22k: number): GoldRates {
  const safe22k = Number.isFinite(rate22k) && rate22k > 0 ? rate22k : DEFAULT_GOLD_RATES['22KT'];
  const ratio = safe22k / DEFAULT_GOLD_RATES['22KT'];

  return {
    '24KT': Math.round(DEFAULT_GOLD_RATES['24KT'] * ratio),
    '22KT': Math.round(safe22k),
    '18KT': Math.round(DEFAULT_GOLD_RATES['18KT'] * ratio),
    '14KT': Math.round(DEFAULT_GOLD_RATES['14KT'] * ratio),
    '925 Silver': DEFAULT_GOLD_RATES['925 Silver'],
  };
}

function getRateForPurity(purity: PurityOption, rates: GoldRates): number {
  switch (purity) {
    case '22KT':
      return rates['22KT'];
    case '18KT':
      return rates['18KT'];
    case '14KT':
      return rates['14KT'];
    case '18K Vermeil / 925 Silver':
      return rates['925 Silver'];
    default:
      return rates['18KT'];
  }
}

export function calculateProductPrice(
  product: Product,
  purity: PurityOption,
  rates: GoldRates
): PriceBreakup {
  const isDemiFine =
    purity === '18K Vermeil / 925 Silver' ||
    typeof product.fixedBasePriceInr === 'number';

  if (isDemiFine) {
    const finalPrice =
      typeof product.fixedBasePriceInr === 'number'
        ? product.fixedBasePriceInr
        : Math.round(product.weightGrams * rates['925 Silver'] * 6.5);
    const subtotalBeforeTax = Math.round(finalPrice / 1.03);
    const gst = finalPrice - subtotalBeforeTax;
    const metalValue = Math.round(product.weightGrams * rates['925 Silver']);
    const stoneValue = product.stoneValueInr;
    const makingCharges = Math.max(0, subtotalBeforeTax - metalValue - stoneValue);

    return {
      purity,
      ratePerGram: rates['925 Silver'],
      weightGrams: product.weightGrams,
      metalValue,
      stoneValue,
      makingChargePct: product.makingChargePct,
      makingCharges,
      subtotalBeforeTax,
      gstRatePct: 3,
      gst,
      finalPrice,
      isFixedDemiFine: true,
    };
  }

  const ratePerGram = getRateForPurity(purity, rates);
  const metalValue = Math.round(product.weightGrams * ratePerGram);
  const stoneValue = product.stoneValueInr;
  const makingCharges = Math.round(metalValue * (product.makingChargePct / 100));
  const subtotalBeforeTax = metalValue + stoneValue + makingCharges;
  const gst = Math.round(subtotalBeforeTax * 0.03);
  const finalPrice = subtotalBeforeTax + gst;

  return {
    purity,
    ratePerGram,
    weightGrams: product.weightGrams,
    metalValue,
    stoneValue,
    makingChargePct: product.makingChargePct,
    makingCharges,
    subtotalBeforeTax,
    gstRatePct: 3,
    gst,
    finalPrice,
    isFixedDemiFine: false,
  };
}

export function formatINR(amount: number): string {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? '-' : '';
  return `${sign}₹${Math.abs(rounded).toLocaleString('en-IN')}`;
}

export interface PincodeCheckResult {
  valid: boolean;
  pincode: string;
  message: string;
  city?: string;
  state?: string;
  estimatedDaysMin?: number;
  estimatedDaysMax?: number;
  etaText?: string;
  nearestBoutique?: BoutiqueInfo;
  boutiquePickupAvailable: boolean;
}

interface RegionSpec {
  city: string;
  state: string;
  minDays: number;
  maxDays: number;
  boutiqueId: BoutiqueInfo['id'];
  pickup: boolean;
}

function resolveRegionFromPrefix(prefix: number): RegionSpec {
  if (prefix === 40) {
    return {
      city: 'Mumbai',
      state: 'Maharashtra',
      minDays: 2,
      maxDays: 3,
      boutiqueId: 'mumbai-kala-ghoda',
      pickup: true,
    };
  }
  if (prefix >= 41 && prefix <= 44) {
    return {
      city: prefix === 41 ? 'Pune' : 'Maharashtra',
      state: 'Maharashtra',
      minDays: 2,
      maxDays: 4,
      boutiqueId: 'mumbai-kala-ghoda',
      pickup: false,
    };
  }
  if (prefix === 11) {
    return {
      city: 'New Delhi',
      state: 'Delhi NCR',
      minDays: 2,
      maxDays: 3,
      boutiqueId: 'delhi-mehrauli',
      pickup: true,
    };
  }
  if (prefix === 12 || prefix === 13) {
    return {
      city: 'Gurugram / NCR',
      state: 'Haryana',
      minDays: 2,
      maxDays: 4,
      boutiqueId: 'delhi-mehrauli',
      pickup: true,
    };
  }
  if (prefix >= 20 && prefix <= 28) {
    return {
      city: prefix === 20 ? 'Noida / NCR' : 'Uttar Pradesh',
      state: 'Uttar Pradesh',
      minDays: 3,
      maxDays: 4,
      boutiqueId: 'delhi-mehrauli',
      pickup: prefix === 20,
    };
  }
  if (prefix >= 14 && prefix <= 19) {
    return {
      city: prefix === 16 ? 'Chandigarh' : 'North India',
      state: 'Punjab & Chandigarh',
      minDays: 3,
      maxDays: 5,
      boutiqueId: 'delhi-mehrauli',
      pickup: false,
    };
  }
  if (prefix >= 30 && prefix <= 34) {
    return {
      city: prefix === 30 ? 'Jaipur' : 'Rajasthan',
      state: 'Rajasthan',
      minDays: 3,
      maxDays: 4,
      boutiqueId: 'delhi-mehrauli',
      pickup: false,
    };
  }
  if (prefix >= 36 && prefix <= 39) {
    return {
      city: prefix === 38 ? 'Ahmedabad' : prefix === 39 ? 'Surat' : 'Gujarat',
      state: 'Gujarat',
      minDays: 3,
      maxDays: 4,
      boutiqueId: 'mumbai-kala-ghoda',
      pickup: false,
    };
  }
  if (prefix >= 45 && prefix <= 49) {
    return {
      city: prefix === 45 ? 'Indore' : 'Central India',
      state: 'Madhya Pradesh',
      minDays: 3,
      maxDays: 5,
      boutiqueId: 'mumbai-kala-ghoda',
      pickup: false,
    };
  }
  if (prefix === 56) {
    return {
      city: 'Bengaluru',
      state: 'Karnataka',
      minDays: 2,
      maxDays: 3,
      boutiqueId: 'bengaluru-indiranagar',
      pickup: true,
    };
  }
  if (prefix >= 57 && prefix <= 59) {
    return {
      city: 'Mysuru / Karnataka',
      state: 'Karnataka',
      minDays: 3,
      maxDays: 4,
      boutiqueId: 'bengaluru-indiranagar',
      pickup: false,
    };
  }
  if (prefix >= 50 && prefix <= 53) {
    return {
      city: prefix === 50 ? 'Hyderabad' : 'Telangana & AP',
      state: 'Telangana',
      minDays: 3,
      maxDays: 4,
      boutiqueId: 'bengaluru-indiranagar',
      pickup: false,
    };
  }
  if (prefix >= 60 && prefix <= 64) {
    return {
      city: prefix === 60 ? 'Chennai' : 'Tamil Nadu',
      state: 'Tamil Nadu',
      minDays: 3,
      maxDays: 4,
      boutiqueId: 'bengaluru-indiranagar',
      pickup: false,
    };
  }
  if (prefix >= 67 && prefix <= 69) {
    return {
      city: prefix === 68 ? 'Kochi' : 'Kerala',
      state: 'Kerala',
      minDays: 3,
      maxDays: 5,
      boutiqueId: 'bengaluru-indiranagar',
      pickup: false,
    };
  }
  if (prefix === 70) {
    return {
      city: 'Kolkata',
      state: 'West Bengal',
      minDays: 2,
      maxDays: 3,
      boutiqueId: 'kolkata-park-street',
      pickup: true,
    };
  }
  if (prefix >= 71 && prefix <= 79) {
    return {
      city: 'East & North-East India',
      state: 'West Bengal & East',
      minDays: 3,
      maxDays: 5,
      boutiqueId: 'kolkata-park-street',
      pickup: false,
    };
  }
  return {
    city: 'East India',
    state: 'Bihar & Jharkhand',
    minDays: 4,
    maxDays: 5,
    boutiqueId: 'kolkata-park-street',
    pickup: false,
  };
}

export function checkPincodeDelivery(rawPincode: string): PincodeCheckResult {
  const pincode = rawPincode.trim();
  if (!/^[1-8]\d{5}$/.test(pincode)) {
    return {
      valid: false,
      pincode,
      boutiquePickupAvailable: false,
      message: 'Please enter a valid 6-digit Indian pincode (e.g. 400001).',
    };
  }

  const prefix = parseInt(pincode.slice(0, 2), 10);
  const region = resolveRegionFromPrefix(prefix);
  const nearestBoutique =
    BOUTIQUES.find((b) => b.id === region.boutiqueId) ?? BOUTIQUES[0];
  const etaText = `${region.minDays}–${region.maxDays} business days`;

  return {
    valid: true,
    pincode,
    city: region.city,
    state: region.state,
    estimatedDaysMin: region.minDays,
    estimatedDaysMax: region.maxDays,
    etaText,
    nearestBoutique,
    boutiquePickupAvailable: region.pickup,
    message: region.pickup
      ? `Complimentary Sequel insured delivery to ${region.city} in ${etaText}. Express pickup also available at ${nearestBoutique.shortLabel}.`
      : `Complimentary Sequel insured delivery to ${region.city} (${region.state}) in ${etaText}. Nearest salon: ${nearestBoutique.shortLabel}.`,
  };
}
