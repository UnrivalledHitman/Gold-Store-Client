import type { DemoOrder } from '@/types/store';
import { checkPincodeDelivery } from '@/lib/pricing';

export type CheckoutStep = 1 | 2 | 3;

export type DeliveryMethod = DemoOrder['deliveryMethod'];
export type PaymentMethod = DemoOrder['paymentMethod'];
export type ShippingAddress = DemoOrder['shippingAddress'];

export type ShippingFormErrors = Partial<Record<keyof ShippingAddress, string>>;

export interface CardPaymentState {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export interface NetBankingBankOption {
  id: 'hdfc' | 'icici' | 'sbi' | 'axis';
  shortCode: string;
  name: string;
  subtitle: string;
}

export const INITIAL_SHIPPING_ADDRESS: ShippingAddress = {
  fullName: '',
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

export const DEMO_SHIPPING_ADDRESS: ShippingAddress = {
  fullName: 'Ananya Deshmukh',
  phone: '+91 98204 51916',
  email: 'ananya.deshmukh@pixtacy-client.in',
  addressLine1: 'Suite 402, Heritage House, 18 Rope Walk Lane',
  addressLine2: 'Kala Ghoda, Fort',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
};

export const DEMO_UPI_ID = 'ananya@okhdfcbank';

export const DEMO_CARD_DETAILS: CardPaymentState = {
  cardNumber: '4532 8812 3409 8910',
  cardHolder: 'Ananya Deshmukh',
  expiry: '09 / 28',
  cvv: '412',
};

export const NETBANKING_BANKS: NetBankingBankOption[] = [
  {
    id: 'hdfc',
    shortCode: 'HDFC',
    name: 'HDFC Bank',
    subtitle: 'Imperia & Preferred NetBanking',
  },
  {
    id: 'icici',
    shortCode: 'ICICI',
    name: 'ICICI Bank',
    subtitle: 'Wealth & Retail Internet Banking',
  },
  {
    id: 'sbi',
    shortCode: 'SBI',
    name: 'State Bank of India',
    subtitle: 'OnlineSBI Secure Portal',
  },
  {
    id: 'axis',
    shortCode: 'AXIS',
    name: 'Axis Bank',
    subtitle: 'Burgundy & Retail NetBanking',
  },
];

export const COLLECTION_LABELS: Record<
  DemoOrder['items'][number]['collection'],
  string
> = {
  aarohi: 'Aarohi · 22KT Heritage',
  noor: 'Noor · Lab-Grown Diamonds',
  saanjh: 'Saanjh · Everyday 18KT',
  solis: 'Solis · Waterproof Demi-Fine',
};

export const CHECKOUT_STEPS: {
  step: CheckoutStep;
  label: string;
  shortLabel: string;
}[] = [
  {
    step: 1,
    label: '1. Delivery & Boutique Pickup',
    shortLabel: 'Delivery',
  },
  {
    step: 2,
    label: '2. Payment Simulator',
    shortLabel: 'Payment',
  },
  {
    step: 3,
    label: '3. Order Confirmed',
    shortLabel: 'Confirmed',
  },
];

/**
 * Validates Indian shipping & contact details required for BIS/IGI invoicing
 * and Sequel insured dispatch.
 */
export function validateShippingForm(
  address: ShippingAddress
): ShippingFormErrors {
  const errors: ShippingFormErrors = {};

  if (address.fullName.trim().length < 2) {
    errors.fullName = 'Please enter the recipient full name.';
  }

  const digitsOnly = address.phone.replace(/\D/g, '');
  const phoneCore =
    digitsOnly.length === 12 && digitsOnly.startsWith('91')
      ? digitsOnly.slice(2)
      : digitsOnly;
  if (!/^[6-9]\d{9}$/.test(phoneCore)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email.trim())) {
    errors.email = 'Enter a valid email address for the demo dossier.';
  }

  if (address.addressLine1.trim().length < 5) {
    errors.addressLine1 = 'Please enter building, street, or suite details.';
  }

  if (address.city.trim().length < 2) {
    errors.city = 'Please enter city.';
  }

  if (address.state.trim().length < 2) {
    errors.state = 'Please enter state.';
  }

  const pinCheck = checkPincodeDelivery(address.pincode);
  if (!pinCheck.valid) {
    errors.pincode = pinCheck.message;
  }

  return errors;
}

/**
 * Formats an ISO timestamp into a refined Indian luxury invoice timestamp.
 */
export function formatOrderTimestamp(isoDate: string): string {
  try {
    const parsed = new Date(isoDate);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(parsed);
  } catch {
    return isoDate;
  }
}

/**
 * Formats a 16-digit demo card input into clean spaced groups of 4.
 */
export function formatCardNumberDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

/**
 * Formats MM / YY card expiry cleanly as digits are typed.
 */
export function formatCardExpiryInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}
