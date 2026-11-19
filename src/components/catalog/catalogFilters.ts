import type {
  CollectionSlug,
  GoldRates,
  Occasion,
  Product,
  ProductCategory,
  PurityOption,
  Recipient,
} from '@/types/store';
import { calculateProductPrice } from '@/lib/pricing';

export type PriceBracketId =
  | 'under-10k'
  | '10k-35k'
  | '35k-100k'
  | '100k-plus';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export interface CatalogFilterState {
  collections: CollectionSlug[];
  categories: ProductCategory[];
  purities: PurityOption[];
  occasions: Occasion[];
  recipients: Recipient[];
  priceBrackets: PriceBracketId[];
  inStockOnly: boolean;
  sort: SortOption;
}

export interface PriceBracketOption {
  id: PriceBracketId;
  label: string;
  min: number;
  max: number;
}

export const COLLECTION_FILTER_OPTIONS: {
  slug: CollectionSlug;
  label: string;
  subtitle: string;
}[] = [
  { slug: 'aarohi', label: 'Aarohi', subtitle: '22KT Heritage' },
  { slug: 'noor', label: 'Noor', subtitle: 'Lab Diamonds' },
  { slug: 'saanjh', label: 'Saanjh', subtitle: 'Everyday 18KT' },
  { slug: 'solis', label: 'Solis', subtitle: 'Waterproof Vermeil' },
];

export const CATEGORY_OPTIONS: ProductCategory[] = [
  'Necklaces',
  'Rings',
  'Earrings',
  'Bracelets & Bangles',
  'Mangalsutra',
];

export const PURITY_OPTIONS: PurityOption[] = [
  '22KT',
  '18KT',
  '14KT',
  '18K Vermeil / 925 Silver',
];

export const OCCASION_OPTIONS: Occasion[] = [
  'Bridal & Festive',
  'Daily Wear',
  'Work & Minimal',
  'Gifting',
  'Date & Cocktail',
];

export const RECIPIENT_OPTIONS: Recipient[] = [
  'For Her',
  'Bridal Trousseau',
  'Anniversary',
  'Self-Purchase',
];

export const PRICE_BRACKETS: PriceBracketOption[] = [
  { id: 'under-10k', label: 'Under ₹10,000', min: 0, max: 9999 },
  { id: '10k-35k', label: '₹10,000–₹35,000', min: 10000, max: 35000 },
  { id: '35k-100k', label: '₹35,000–₹1,00,000', min: 35001, max: 100000 },
  { id: '100k-plus', label: '₹1,00,000+', min: 100001, max: Number.POSITIVE_INFINITY },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

const MANAGED_FILTER_PARAM_KEYS = new Set([
  'collection',
  'category',
  'purity',
  'occasion',
  'recipient',
  'price',
  'inStock',
  'sort',
]);

function parseMultiValueParam<T extends string>(
  searchParams: Pick<URLSearchParams, 'getAll'>,
  key: string,
  allowedValues: readonly T[]
): T[] {
  const allowed = new Set<string>(allowedValues);
  const rawTokens = searchParams
    .getAll(key)
    .flatMap((chunk) => chunk.split(','))
    .map((item) => item.trim())
    .filter(Boolean);

  const unique: T[] = [];
  for (const token of rawTokens) {
    if (allowed.has(token) && !unique.includes(token as T)) {
      unique.push(token as T);
    }
  }
  return unique;
}

export function parseCatalogSearchParams(
  searchParams: Pick<URLSearchParams, 'get' | 'getAll'>,
  lockedCollectionSlug?: CollectionSlug
): CatalogFilterState {
  const sortRaw = searchParams.get('sort') ?? 'featured';
  const validSorts: SortOption[] = ['featured', 'price-asc', 'price-desc', 'newest'];
  const sort: SortOption = validSorts.includes(sortRaw as SortOption)
    ? (sortRaw as SortOption)
    : 'featured';

  const inStockRaw = searchParams.get('inStock');
  const inStockOnly = inStockRaw === '1' || inStockRaw === 'true';

  const collections = lockedCollectionSlug
    ? [lockedCollectionSlug]
    : parseMultiValueParam(
        searchParams,
        'collection',
        COLLECTION_FILTER_OPTIONS.map((c) => c.slug)
      );

  return {
    collections,
    categories: parseMultiValueParam(searchParams, 'category', CATEGORY_OPTIONS),
    purities: parseMultiValueParam(searchParams, 'purity', PURITY_OPTIONS),
    occasions: parseMultiValueParam(searchParams, 'occasion', OCCASION_OPTIONS),
    recipients: parseMultiValueParam(searchParams, 'recipient', RECIPIENT_OPTIONS),
    priceBrackets: parseMultiValueParam(
      searchParams,
      'price',
      PRICE_BRACKETS.map((b) => b.id)
    ),
    inStockOnly,
    sort,
  };
}

export function buildCatalogUrl(
  pathname: string,
  state: CatalogFilterState,
  existingParams?: Pick<URLSearchParams, 'entries'>,
  lockedCollectionSlug?: CollectionSlug
): string {
  const params = new URLSearchParams();

  if (existingParams) {
    for (const [k, v] of existingParams.entries()) {
      if (!MANAGED_FILTER_PARAM_KEYS.has(k)) {
        params.append(k, v);
      }
    }
  }

  if (!lockedCollectionSlug && state.collections.length > 0) {
    params.set('collection', state.collections.join(','));
  }
  if (state.categories.length > 0) {
    params.set('category', state.categories.join(','));
  }
  if (state.purities.length > 0) {
    params.set('purity', state.purities.join(','));
  }
  if (state.occasions.length > 0) {
    params.set('occasion', state.occasions.join(','));
  }
  if (state.recipients.length > 0) {
    params.set('recipient', state.recipients.join(','));
  }
  if (state.priceBrackets.length > 0) {
    params.set('price', state.priceBrackets.join(','));
  }
  if (state.inStockOnly) {
    params.set('inStock', '1');
  }
  if (state.sort !== 'featured') {
    params.set('sort', state.sort);
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function createEmptyFilterState(
  lockedCollectionSlug?: CollectionSlug,
  keepSort: SortOption = 'featured'
): CatalogFilterState {
  return {
    collections: lockedCollectionSlug ? [lockedCollectionSlug] : [],
    categories: [],
    purities: [],
    occasions: [],
    recipients: [],
    priceBrackets: [],
    inStockOnly: false,
    sort: keepSort,
  };
}

export function getLiveProductPrice(
  product: Product,
  goldRates: GoldRates
): number {
  return calculateProductPrice(product, product.purityOptions[0], goldRates)
    .finalPrice;
}

export function filterAndSortProducts(
  products: Product[],
  state: CatalogFilterState,
  goldRates: GoldRates,
  lockedCollectionSlug?: CollectionSlug
): Product[] {
  const indexed = products.map((product, index) => ({
    product,
    index,
    livePrice: getLiveProductPrice(product, goldRates),
  }));

  const activeCollections = lockedCollectionSlug
    ? [lockedCollectionSlug]
    : state.collections;

  const filtered = indexed.filter(({ product, livePrice }) => {
    if (
      activeCollections.length > 0 &&
      !activeCollections.includes(product.collection)
    ) {
      return false;
    }

    if (
      state.categories.length > 0 &&
      !state.categories.includes(product.category)
    ) {
      return false;
    }

    if (
      state.purities.length > 0 &&
      !product.purityOptions.some((p) => state.purities.includes(p))
    ) {
      return false;
    }

    if (
      state.occasions.length > 0 &&
      !product.occasions.some((occ) => state.occasions.includes(occ))
    ) {
      return false;
    }

    if (
      state.recipients.length > 0 &&
      !product.recipients.some((rec) => state.recipients.includes(rec))
    ) {
      return false;
    }

    if (state.priceBrackets.length > 0) {
      const matchesAnyBracket = state.priceBrackets.some((bracketId) => {
        const bracket = PRICE_BRACKETS.find((b) => b.id === bracketId);
        if (!bracket) return false;
        return livePrice >= bracket.min && livePrice <= bracket.max;
      });
      if (!matchesAnyBracket) {
        return false;
      }
    }

    if (state.inStockOnly && !product.inStock) {
      return false;
    }

    return true;
  });

  filtered.sort((a, b) => {
    switch (state.sort) {
      case 'price-asc':
        return a.livePrice - b.livePrice || a.index - b.index;
      case 'price-desc':
        return b.livePrice - a.livePrice || a.index - b.index;
      case 'newest':
        return b.index - a.index;
      case 'featured':
      default: {
        const aBest = a.product.isBestseller ? 0 : 1;
        const bBest = b.product.isBestseller ? 0 : 1;
        if (aBest !== bBest) return aBest - bBest;
        return a.index - b.index;
      }
    }
  });

  return filtered.map((entry) => entry.product);
}

export interface ActiveFilterChip {
  id: string;
  facet:
    | 'collection'
    | 'category'
    | 'purity'
    | 'occasion'
    | 'recipient'
    | 'price'
    | 'inStock';
  facetLabel: string;
  value: string;
  displayLabel: string;
}

export function getActiveFilterChips(
  state: CatalogFilterState,
  lockedCollectionSlug?: CollectionSlug
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  if (!lockedCollectionSlug) {
    for (const slug of state.collections) {
      const meta = COLLECTION_FILTER_OPTIONS.find((c) => c.slug === slug);
      chips.push({
        id: `collection:${slug}`,
        facet: 'collection',
        facetLabel: 'Collection',
        value: slug,
        displayLabel: meta?.label ?? slug,
      });
    }
  }

  for (const cat of state.categories) {
    chips.push({
      id: `category:${cat}`,
      facet: 'category',
      facetLabel: 'Category',
      value: cat,
      displayLabel: cat,
    });
  }

  for (const purity of state.purities) {
    chips.push({
      id: `purity:${purity}`,
      facet: 'purity',
      facetLabel: 'Purity',
      value: purity,
      displayLabel: purity === '18K Vermeil / 925 Silver' ? '18K Vermeil' : purity,
    });
  }

  for (const occasion of state.occasions) {
    chips.push({
      id: `occasion:${occasion}`,
      facet: 'occasion',
      facetLabel: 'Occasion',
      value: occasion,
      displayLabel: occasion,
    });
  }

  for (const recipient of state.recipients) {
    chips.push({
      id: `recipient:${recipient}`,
      facet: 'recipient',
      facetLabel: 'Recipient',
      value: recipient,
      displayLabel: recipient,
    });
  }

  for (const bracketId of state.priceBrackets) {
    const bracket = PRICE_BRACKETS.find((b) => b.id === bracketId);
    chips.push({
      id: `price:${bracketId}`,
      facet: 'price',
      facetLabel: 'Price',
      value: bracketId,
      displayLabel: bracket?.label ?? bracketId,
    });
  }

  if (state.inStockOnly) {
    chips.push({
      id: 'inStock:1',
      facet: 'inStock',
      facetLabel: 'Availability',
      value: '1',
      displayLabel: 'In-Stock Ready to Ship',
    });
  }

  return chips;
}

export function toggleArrayValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}
