'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import type {
  CollectionInfo,
  CollectionSlug,
  Occasion,
  ProductCategory,
  PurityOption,
  Recipient,
} from '@/types/store';
import { PRODUCTS } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ui/ProductCard';
import { CollectionHeader } from '@/components/catalog/CollectionHeader';
import { FilterBar } from '@/components/catalog/FilterBar';
import { ActiveFilterChips } from '@/components/catalog/ActiveFilterChips';
import { MobileFilterSheet } from '@/components/catalog/MobileFilterSheet';
import {
  buildCatalogUrl,
  createEmptyFilterState,
  filterAndSortProducts,
  getActiveFilterChips,
  parseCatalogSearchParams,
  toggleArrayValue,
  type ActiveFilterChip,
  type CatalogFilterState,
  type PriceBracketId,
  type SortOption,
} from '@/components/catalog/catalogFilters';

export interface CatalogClientProps {
  lockedCollection?: CollectionInfo;
}

/**
 * Interactive URL-synced PIXTACY Product Listing Page (PLP) client view.
 * Must be rendered inside a <Suspense> boundary by parent route pages.
 */
export function CatalogClient({ lockedCollection }: CatalogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { goldRates } = useStore();

  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const lockedSlug = lockedCollection?.slug;

  const filters = useMemo(
    () => parseCatalogSearchParams(searchParams, lockedSlug),
    [searchParams, lockedSlug]
  );

  const commitFilters = useCallback(
    (nextState: CatalogFilterState) => {
      const nextUrl = buildCatalogUrl(
        pathname,
        nextState,
        searchParams,
        lockedSlug
      );
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams, lockedSlug]
  );

  const baseCollectionProducts = useMemo(
    () =>
      lockedSlug
        ? PRODUCTS.filter((p) => p.collection === lockedSlug)
        : PRODUCTS,
    [lockedSlug]
  );

  const filteredProducts = useMemo(
    () => filterAndSortProducts(PRODUCTS, filters, goldRates, lockedSlug),
    [filters, goldRates, lockedSlug]
  );

  const activeChips = useMemo(
    () => getActiveFilterChips(filters, lockedSlug),
    [filters, lockedSlug]
  );

  const handleToggleCollection = (slug: CollectionSlug) => {
    commitFilters({
      ...filters,
      collections: toggleArrayValue(filters.collections, slug),
    });
  };

  const handleToggleCategory = (category: ProductCategory) => {
    commitFilters({
      ...filters,
      categories: toggleArrayValue(filters.categories, category),
    });
  };

  const handleTogglePurity = (purity: PurityOption) => {
    commitFilters({
      ...filters,
      purities: toggleArrayValue(filters.purities, purity),
    });
  };

  const handleToggleOccasion = (occasion: Occasion) => {
    commitFilters({
      ...filters,
      occasions: toggleArrayValue(filters.occasions, occasion),
    });
  };

  const handleToggleRecipient = (recipient: Recipient) => {
    commitFilters({
      ...filters,
      recipients: toggleArrayValue(filters.recipients, recipient),
    });
  };

  const handleTogglePriceBracket = (bracket: PriceBracketId) => {
    commitFilters({
      ...filters,
      priceBrackets: toggleArrayValue(filters.priceBrackets, bracket),
    });
  };

  const handleToggleInStock = () => {
    commitFilters({
      ...filters,
      inStockOnly: !filters.inStockOnly,
    });
  };

  const handleChangeSort = (sort: SortOption) => {
    commitFilters({
      ...filters,
      sort,
    });
  };

  const handleClearFacet = (
    facet:
      | 'collection'
      | 'category'
      | 'purity'
      | 'occasion'
      | 'recipient'
      | 'price'
  ) => {
    const next = { ...filters };
    switch (facet) {
      case 'collection':
        next.collections = lockedSlug ? [lockedSlug] : [];
        break;
      case 'category':
        next.categories = [];
        break;
      case 'purity':
        next.purities = [];
        break;
      case 'occasion':
        next.occasions = [];
        break;
      case 'recipient':
        next.recipients = [];
        break;
      case 'price':
        next.priceBrackets = [];
        break;
    }
    commitFilters(next);
  };

  const handleRemoveChip = (chip: ActiveFilterChip) => {
    switch (chip.facet) {
      case 'collection':
        handleToggleCollection(chip.value as CollectionSlug);
        break;
      case 'category':
        handleToggleCategory(chip.value as ProductCategory);
        break;
      case 'purity':
        handleTogglePurity(chip.value as PurityOption);
        break;
      case 'occasion':
        handleToggleOccasion(chip.value as Occasion);
        break;
      case 'recipient':
        handleToggleRecipient(chip.value as Recipient);
        break;
      case 'price':
        handleTogglePriceBracket(chip.value as PriceBracketId);
        break;
      case 'inStock':
        handleToggleInStock();
        break;
    }
  };

  const handleClearAll = () => {
    commitFilters(createEmptyFilterState(lockedSlug, filters.sort));
  };

  return (
    <div className="min-h-[75vh] bg-[#FAF7F2]">
      <CollectionHeader
        collection={lockedCollection}
        totalCollectionCount={baseCollectionProducts.length}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FilterBar
          filters={filters}
          lockedCollectionSlug={lockedSlug}
          activeFilterCount={activeChips.length}
          resultCount={filteredProducts.length}
          totalCount={baseCollectionProducts.length}
          onToggleCollection={handleToggleCollection}
          onToggleCategory={handleToggleCategory}
          onTogglePurity={handleTogglePurity}
          onToggleOccasion={handleToggleOccasion}
          onToggleRecipient={handleToggleRecipient}
          onTogglePriceBracket={handleTogglePriceBracket}
          onToggleInStock={handleToggleInStock}
          onChangeSort={handleChangeSort}
          onClearFacet={handleClearFacet}
          onOpenMobileSheet={() => setMobileSheetOpen(true)}
        />

        <ActiveFilterChips
          chips={activeChips}
          onRemoveChip={handleRemoveChip}
          onClearAll={handleClearAll}
        />

        <div className="py-8 sm:py-10">
          {filteredProducts.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-6 py-14 text-center sm:px-10">
              <Sparkles
                className="mx-auto h-6 w-6 text-[#C69C4D]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="mt-4 font-serif text-3xl font-medium text-[#1C1514]">
                No creations match this selection
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5C504A]">
                Try clearing one or more filters—or reset all facets to explore
                our complete {lockedCollection ? `${lockedCollection.name} ` : ''}
                atelier collection.
              </p>
              <button
                type="button"
                onClick={handleClearAll}
                className="mt-6 inline-flex items-center justify-center rounded-[2px] bg-[#1C1514] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 min-[460px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={idx < 4}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileFilterSheet
        open={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
        filters={filters}
        lockedCollectionSlug={lockedSlug}
        resultCount={filteredProducts.length}
        onToggleCollection={handleToggleCollection}
        onToggleCategory={handleToggleCategory}
        onTogglePurity={handleTogglePurity}
        onToggleOccasion={handleToggleOccasion}
        onToggleRecipient={handleToggleRecipient}
        onTogglePriceBracket={handleTogglePriceBracket}
        onToggleInStock={handleToggleInStock}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
