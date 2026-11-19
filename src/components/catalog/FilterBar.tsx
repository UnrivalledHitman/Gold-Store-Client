'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import type {
  CollectionSlug,
  Occasion,
  ProductCategory,
  PurityOption,
  Recipient,
} from '@/types/store';
import {
  CATEGORY_OPTIONS,
  COLLECTION_FILTER_OPTIONS,
  OCCASION_OPTIONS,
  PRICE_BRACKETS,
  PURITY_OPTIONS,
  RECIPIENT_OPTIONS,
  SORT_OPTIONS,
  type CatalogFilterState,
  type PriceBracketId,
  type SortOption,
} from '@/components/catalog/catalogFilters';

type FacetPopoverKey =
  | 'collection'
  | 'category'
  | 'purity'
  | 'occasion'
  | 'recipient'
  | 'price';

export interface FilterBarProps {
  filters: CatalogFilterState;
  lockedCollectionSlug?: CollectionSlug;
  activeFilterCount: number;
  resultCount: number;
  totalCount: number;
  onToggleCollection: (slug: CollectionSlug) => void;
  onToggleCategory: (category: ProductCategory) => void;
  onTogglePurity: (purity: PurityOption) => void;
  onToggleOccasion: (occasion: Occasion) => void;
  onToggleRecipient: (recipient: Recipient) => void;
  onTogglePriceBracket: (bracket: PriceBracketId) => void;
  onToggleInStock: () => void;
  onChangeSort: (sort: SortOption) => void;
  onClearFacet: (facet: FacetPopoverKey) => void;
  onOpenMobileSheet: () => void;
}

interface FacetOptionItem {
  value: string;
  label: string;
  sublabel?: string;
}

/**
 * Desktop multi-facet dropdown filter bar + mobile compact filter & sort toolbar.
 */
export function FilterBar({
  filters,
  lockedCollectionSlug,
  activeFilterCount,
  resultCount,
  totalCount,
  onToggleCollection,
  onToggleCategory,
  onTogglePurity,
  onToggleOccasion,
  onToggleRecipient,
  onTogglePriceBracket,
  onToggleInStock,
  onChangeSort,
  onClearFacet,
  onOpenMobileSheet,
}: FilterBarProps) {
  const [openPopover, setOpenPopover] = useState<FacetPopoverKey | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openPopover) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setOpenPopover(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenPopover(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openPopover]);

  const facetConfigs: {
    key: FacetPopoverKey;
    label: string;
    selectedValues: string[];
    options: FacetOptionItem[];
    onToggle: (value: string) => void;
  }[] = [
    ...(!lockedCollectionSlug
      ? [
          {
            key: 'collection' as const,
            label: 'Collection',
            selectedValues: filters.collections,
            options: COLLECTION_FILTER_OPTIONS.map((c) => ({
              value: c.slug,
              label: c.label,
              sublabel: c.subtitle,
            })),
            onToggle: (val: string) =>
              onToggleCollection(val as CollectionSlug),
          },
        ]
      : []),
    {
      key: 'category',
      label: 'Category',
      selectedValues: filters.categories,
      options: CATEGORY_OPTIONS.map((cat) => ({ value: cat, label: cat })),
      onToggle: (val) => onToggleCategory(val as ProductCategory),
    },
    {
      key: 'purity',
      label: 'Purity',
      selectedValues: filters.purities,
      options: PURITY_OPTIONS.map((purity) => ({
        value: purity,
        label:
          purity === '18K Vermeil / 925 Silver'
            ? '18K Vermeil / 925 Silver'
            : purity,
      })),
      onToggle: (val) => onTogglePurity(val as PurityOption),
    },
    {
      key: 'occasion',
      label: 'Occasion',
      selectedValues: filters.occasions,
      options: OCCASION_OPTIONS.map((occ) => ({ value: occ, label: occ })),
      onToggle: (val) => onToggleOccasion(val as Occasion),
    },
    {
      key: 'recipient',
      label: 'Recipient',
      selectedValues: filters.recipients,
      options: RECIPIENT_OPTIONS.map((rec) => ({ value: rec, label: rec })),
      onToggle: (val) => onToggleRecipient(val as Recipient),
    },
    {
      key: 'price',
      label: 'Price',
      selectedValues: filters.priceBrackets,
      options: PRICE_BRACKETS.map((b) => ({ value: b.id, label: b.label })),
      onToggle: (val) => onTogglePriceBracket(val as PriceBracketId),
    },
  ];

  return (
    <div
      ref={barRef}
      className="border-b border-[#E5DDD0] bg-[#FAF7F2]"
    >
      {/* Desktop Multi-Facet Bar */}
      <div className="hidden items-center justify-between gap-4 py-3.5 lg:flex">
        <div className="flex flex-wrap items-center gap-2">
          {facetConfigs.map((facet) => {
            const isOpen = openPopover === facet.key;
            const selectedCount = facet.selectedValues.length;

            return (
              <div key={facet.key} className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenPopover((prev) =>
                      prev === facet.key ? null : facet.key
                    )
                  }
                  aria-expanded={isOpen}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    selectedCount > 0 || isOpen
                      ? 'border-[#C69C4D] bg-[#FFFFFF] text-[#1C1514]'
                      : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#C69C4D] hover:text-[#1C1514]'
                  }`}
                >
                  <span>{facet.label}</span>
                  {selectedCount > 0 ? (
                    <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#1C1514] px-1 text-[10px] font-semibold text-[#FAF7F2] tabular-nums">
                      {selectedCount}
                    </span>
                  ) : null}
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#8C7E75] transition-transform ${
                      isOpen ? 'rotate-180 text-[#1C1514]' : ''
                    }`}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </button>

                {isOpen ? (
                  <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3 shadow-xl">
                    <div className="mb-2 flex items-center justify-between border-b border-[#E5DDD0] pb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8C7E75]">
                        {facet.label}
                      </span>
                      {selectedCount > 0 ? (
                        <button
                          type="button"
                          onClick={() => onClearFacet(facet.key)}
                          className="text-[11px] font-medium text-[#7A1E2C] hover:underline"
                        >
                          Reset
                        </button>
                      ) : null}
                    </div>

                    <div className="max-h-64 space-y-1 overflow-y-auto">
                      {facet.options.map((option) => {
                        const checked = facet.selectedValues.includes(
                          option.value
                        );
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => facet.onToggle(option.value)}
                            aria-pressed={checked}
                            className={`flex w-full items-center justify-between rounded-[2px] px-2.5 py-2 text-left text-xs transition-colors ${
                              checked
                                ? 'bg-[#F3ECE1] font-medium text-[#1C1514]'
                                : 'text-[#5C504A] hover:bg-[#FAF7F2] hover:text-[#1C1514]'
                            }`}
                          >
                            <span className="min-w-0 pr-2">
                              <span className="block truncate">
                                {option.label}
                              </span>
                              {option.sublabel ? (
                                <span className="block text-[10px] text-[#8C7E75]">
                                  {option.sublabel}
                                </span>
                              ) : null}
                            </span>
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border transition-colors ${
                                checked
                                  ? 'border-[#1C1514] bg-[#1C1514] text-[#FAF7F2]'
                                  : 'border-[#E5DDD0] bg-[#FFFFFF]'
                              }`}
                            >
                              {checked ? (
                                <Check className="h-3 w-3" strokeWidth={2.2} />
                              ) : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* In-Stock Toggle */}
          <button
            type="button"
            onClick={onToggleInStock}
            aria-pressed={filters.inStockOnly}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filters.inStockOnly
                ? 'border-[#2E6B4E] bg-[#2E6B4E] text-[#FAF7F2]'
                : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#2E6B4E]/60 hover:text-[#1C1514]'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                filters.inStockOnly ? 'bg-[#FAF7F2]' : 'bg-[#2E6B4E]'
              }`}
              aria-hidden="true"
            />
            <span>In-Stock Ready to Ship</span>
          </button>
        </div>

        {/* Live Count + Sort */}
        <div className="flex shrink-0 items-center gap-4">
          <span className="text-xs text-[#5C504A] tabular-nums">
            {resultCount === totalCount
              ? `${resultCount} ${resultCount === 1 ? 'Piece' : 'Pieces'}`
              : `${resultCount} of ${totalCount} Pieces`}
          </span>

          <div className="flex items-center gap-2">
            <label
              htmlFor="desktop-catalog-sort"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#8C7E75]"
            >
              Sort
            </label>
            <select
              id="desktop-catalog-sort"
              value={filters.sort}
              onChange={(e) => onChangeSort(e.target.value as SortOption)}
              className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-1.5 text-xs font-medium text-[#1C1514] focus:border-[#C69C4D] focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Compact Filter & Sort Toolbar */}
      <div className="flex items-center justify-between gap-2 py-3 lg:hidden">
        <button
          type="button"
          onClick={onOpenMobileSheet}
          className="inline-flex items-center gap-2 rounded-[2px] border border-[#1C1514] bg-[#FFFFFF] px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#1C1514] transition-colors hover:bg-[#F3ECE1]"
        >
          <SlidersHorizontal
            className="h-3.5 w-3.5 text-[#C69C4D]"
            strokeWidth={1.75}
          />
          <span>Filters</span>
          {activeFilterCount > 0 ? (
            <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#1C1514] px-1 text-[10px] font-semibold text-[#FAF7F2] tabular-nums">
              {activeFilterCount}
            </span>
          ) : null}
        </button>

        <span className="text-xs text-[#5C504A] tabular-nums">
          {resultCount} {resultCount === 1 ? 'Piece' : 'Pieces'}
        </span>

        <select
          aria-label="Sort pieces"
          value={filters.sort}
          onChange={(e) => onChangeSort(e.target.value as SortOption)}
          className="max-w-[155px] rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-2.5 py-2 text-xs font-medium text-[#1C1514] focus:border-[#C69C4D] focus:outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
