import type { BoutiqueInfo, PromoCodeConfig } from '@/types/store';

export const FIGMA_PITCH_URL: string =
  process.env.NEXT_PUBLIC_FIGMA_URL || 'https://www.figma.com/design/4NxZUeHWPPz9bpCQqW4nGW';

export const BOUTIQUES: BoutiqueInfo[] = [
  {
    id: 'mumbai-kala-ghoda',
    name: 'PIXTACY Kala Ghoda Flagship',
    city: 'Mumbai',
    shortLabel: 'Mumbai Flagship',
    address: '14 Rope Walk Lane, Kala Ghoda, Fort, Mumbai 400001',
    pincode: '400001',
    phone: '+91 22 4890 1916',
    hours: '11:00 AM – 8:30 PM Daily',
    services: [
      'Private Bridal Trousseau Suite',
      'Bespoke Solitaire Viewing',
      'Same-Day Insured Pickup',
    ],
  },
  {
    id: 'delhi-mehrauli',
    name: 'PIXTACY Mehrauli Atelier',
    city: 'New Delhi',
    shortLabel: 'Delhi Mehrauli',
    address: 'Ambawatta One, Seth Sarai, Mehrauli, New Delhi 110030',
    pincode: '110030',
    phone: '+91 11 4920 1916',
    hours: '11:00 AM – 8:00 PM Daily',
    services: [
      'Heritage Kundan & Polki Salon',
      'Custom Engraving Desk',
      'Chauffeur Drop-Off & Pickup',
    ],
  },
  {
    id: 'bengaluru-indiranagar',
    name: 'PIXTACY Indiranagar Salon',
    city: 'Bengaluru',
    shortLabel: 'Bengaluru Indiranagar',
    address: '748, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    pincode: '560038',
    phone: '+91 80 4120 1916',
    hours: '11:00 AM – 8:30 PM Daily',
    services: [
      'Lab-Grown Diamond Lounge',
      'Stacking & Styling Bar',
      'Express Boutique Pickup',
    ],
  },
  {
    id: 'kolkata-park-street',
    name: 'PIXTACY Park Street Maison',
    city: 'Kolkata',
    shortLabel: 'Kolkata Park Street',
    address: '24B Park Street, Celica Park, Kolkata 700016',
    pincode: '700016',
    phone: '+91 33 4060 1916',
    hours: '11:00 AM – 8:00 PM (Closed Mondays)',
    services: [
      '22KT Filigree Craft Archive',
      'Gold Exchange & Purity Assay',
      'Private Family Consultation',
    ],
  },
];

export const PROMO_CODES: Record<'PIXTACY10' | 'FIRST500', PromoCodeConfig> = {
  PIXTACY10: {
    code: 'PIXTACY10',
    label: '10% Client Pitch Privilege',
    description: '10% off your order total (applied after bundle savings)',
    type: 'percentage',
    value: 10,
  },
  FIRST500: {
    code: 'FIRST500',
    label: '₹500 First Purchase Privilege',
    description: 'Flat ₹500 instant privilege on your first PIXTACY order',
    type: 'flat',
    value: 500,
  },
};
