import type { UxBenchmark } from '@/types/store';

export interface UxDirectionNotes {
  plpSummary: string;
  pdpSummary: string;
}

export const UX_BENCHMARKS: UxBenchmark[] = [
  {
    id: 'plp-tanishq',
    screenType: 'PLP',
    appName: 'Tanishq',
    platform: 'web',
    mobbinUrl: 'https://www.tanishq.co.in/',
    patternSummary:
      'Fine-jewellery collection header paired with structured multi-facet filtering across purity (22KT/18KT/14KT), category, occasion, and price brackets, reinforced by BIS hallmark cues and net metal weight context on cards.',
    zaveraApplication:
      'Powers /collections and /collections/[slug] with a URL-synced multi-facet filter bar (Collection, Category, Metal/Purity, Occasion, Recipient, Price Bracket, In-Stock), live result count, sort dropdown, and crisp BIS 916 / IGI / Waterproof trust tags on Soft Champagne #F3ECE1 cards.',
  },
  {
    id: 'plp-giva',
    screenType: 'PLP',
    appName: 'GIVA',
    platform: 'web',
    mobbinUrl: 'https://www.giva.co/',
    patternSummary:
      'High-velocity gifting and recipient discovery driven by scannable facet chips, a removable active filter pill bar, sort controls, and cards with interactive finish swatches, wishlist heart, and frictionless Quick-Add.',
    zaveraApplication:
      'Implements a removable active filter pill row (9999px pills with 1px #E5DDD0 hairlines), mobile filter bottom sheet, interactive MetalFinish swatch dots on ProductCard, wishlist toggle, and one-click Quick-Add while preserving Cormorant Garamond titles and tabular-nums INR pricing.',
  },
  {
    id: 'plp-palmonas',
    screenType: 'PLP',
    appName: 'Palmonas',
    platform: 'web',
    mobbinUrl: 'https://www.palmonas.com/',
    patternSummary:
      'Editorial restraint featuring airy 4:5 portrait product imagery, generous grid whitespace, concise 3-line card metadata, and clean demi-fine waterproof/stacking cues that communicate bundle value without clutter.',
    zaveraApplication:
      'Locks a 4:5 portrait ProductCard ratio with 0px-2px editorial radii on #FAF7F2 canvas and #F3ECE1 image grounds, limiting card text to title, purity/tier caption, and live ₹ price, plus a subtle "Buy 2 Save 15%" indicator on Solis waterproof pieces.',
  },
  {
    id: 'pdp-tanishq',
    screenType: 'PDP',
    appName: 'Tanishq',
    platform: 'web',
    mobbinUrl: 'https://www.tanishq.co.in/',
    patternSummary:
      'High-trust fine-jewellery PDP combining a sticky multi-view gallery with zoom, purity and ring-size selectors, an expandable itemized Price Breakup accordion (metal weight x live rate, stone, making, 3% GST), and 6-digit pincode delivery check.',
    zaveraApplication:
      'Structures /product/[slug] with a sticky lg:col-span-7 gallery (zoom toggle + certification badge), Purity (22KT/18KT/14KT) and Indian Ring Size (10-20 + Size Guide modal) pills, a live-repricing Price Breakup accordion synced to StoreContext 22KT gold rate, and 6-digit Indian pincode delivery ETA + boutique pickup lookup.',
  },
  {
    id: 'pdp-giva',
    screenType: 'PDP',
    appName: 'GIVA',
    platform: 'web',
    mobbinUrl: 'https://www.giva.co/',
    patternSummary:
      'Conversion-oriented variant and gifting ergonomics with tactile metal-finish pills, optional custom engraving input with live preview, concise shipping/warranty reassurances beside the primary CTA, and a sticky mobile Add to Bag bar.',
    zaveraApplication:
      'Guides the right-hand PDP buy box on #FFFFFF / #FAF7F2: MetalFinish + Purity pill groups with Burnished Gold #C69C4D active borders, optional 15-character Custom Engraving input with live preview tag, Deep Espresso #1C1514 Add to Bag CTA (Royal Garnet #7A1E2C hover option), and persistent sticky mobile Add to Bag bar.',
  },
  {
    id: 'pdp-palmonas',
    screenType: 'PDP',
    appName: 'Palmonas',
    platform: 'web',
    mobbinUrl: 'https://www.palmonas.com/',
    patternSummary:
      'Compact editorial storytelling paired with clean hairline Specifications & Care tabs (highlighting waterproof/anti-tarnish assurance) and a curated "Complete the Look" cross-sell strip directly below the fold for stack building.',
    zaveraApplication:
      'Organizes ZAVERA’s lower PDP fold into crisp #E5DDD0 hairline Specifications & Care Guarantee tabs (BIS/IGI/1-Year Waterproof badges in #2E6B4E) followed by a "Complete the Look" paired-SKU row driven by completeTheLookIds.',
  },
];

export const UX_DIRECTION_NOTES: UxDirectionNotes = {
  plpSummary:
    'ZAVERA PLP (/collections and /collections/[slug]) pairs Tanishq-level purity/hallmark clarity with GIVA gifting speed and Palmonas editorial restraint: a URL-synced multi-facet filter bar (Collection, Category, Metal/Purity, Occasion, Recipient, Price Bracket, In-Stock) with a collapsible mobile bottom sheet, removable 9999px active filter pills, live count + sort control, and airy 4:5 portrait cards (0px-2px radii on Soft Champagne #F3ECE1 over Warm Ivory #FAF7F2) featuring interactive MetalFinish swatch dots, wishlist toggle, Quick-Add, and Cormorant Garamond titles over tabular-nums Plus Jakarta Sans ₹ prices.',
  pdpSummary:
    'ZAVERA PDP (/product/[slug]) uses an asymmetrical 7/5 desktop split on Warm Ivory #FAF7F2 with Deep Espresso #1C1514 typography and Burnished Gold #C69C4D active states: a sticky left gallery with zoom toggle and BIS/IGI/Waterproof assurance badge, paired with a high-clarity right buy column offering MetalFinish, Purity (22KT/18KT/14KT/Vermeil), and Indian Ring Size (10-20 + Size Guide modal) pills, optional 15-char Custom Engraving preview, a Tanishq-inspired live Price Breakup accordion (Metal + Stone + Making + 3% GST recalculated from the live 22KT gold rate), 6-digit Indian pincode delivery + boutique pickup checker, hairline Specifications & Care tabs, Complete the Look cross-sell cards, and a sticky mobile Add to Bag bar.',
};
