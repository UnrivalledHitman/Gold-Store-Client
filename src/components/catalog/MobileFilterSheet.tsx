'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
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
  type CatalogFilterState,
  type PriceBracketId,
} from '@/components/catalog/catalogFilters';

export interface MobileFilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: CatalogFilterState;
  lockedCollectionSlug?: CollectionSlug;
  resultCount: number;
  onToggleCollection: (slug: CollectionSlug) => void;
  onToggleCategory: (category: ProductCategory) => void;
  onTogglePurity: (purity: PurityOption) => void;
  onToggleOccasion: (occasion: Occasion) => void;
  onToggleRecipient: (recipient: Recipient) => void;
  onTogglePriceBracket: (bracket: PriceBracketId) => void;
  onToggleInStock: () => void;
  onClearAll: () => void;
}

/**
 * Slide-up mobile filter bottom sheet for multi-facet jewellery filtering.
 */
export function MobileFilterSheet({
  open,
  onClose,
  filters,
  lockedCollectionSlug,
  resultCount,
  onToggleCollection,
  onToggleCategory,
  onTogglePurity,
  onToggleOccasion,
  onToggleRecipient,
  onTogglePriceBracket,
  onToggleInStock,
  onClearAll,
}: MobileFilterSheetProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filter PIXTACY Catalogue"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1514]/50 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.section
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            className="relative z-10 flex max-h-[86vh] w-full flex-col rounded-t-[2px] border-t border-[#E5DDD0] bg-[#FAF7F2] text-[#1C1514] shadow-2xl"
          >
            {/* Drag / Sheet Header */}
            <header className="flex items-center justify-between border-b border-[#E5DDD0] bg-[#FFFFFF] px-5 py-4">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#1C1514]">
                  Filter Pieces
                </h2>
                <p className="text-xs text-[#8C7E75] tabular-nums">
                  {resultCount} {resultCount === 1 ? 'piece' : 'pieces'} matching
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#5C504A] hover:border-[#1C1514] hover:text-[#1C1514]"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </header>

            {/* Scrollable Facets */}
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              {/* Availability Toggle */}
              <div className="flex items-center justify-between rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3.5">
                <div>
                  <p className="text-xs font-semibold text-[#1C1514]">
                    In-Stock Ready to Ship
                  </p>
                  <p className="text-[11px] text-[#8C7E75]">
                    Dispatches within 1–5 business days
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={filters.inStockOnly}
                  onClick={onToggleInStock}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
                    filters.inStockOnly
                      ? 'border-[#2E6B4E] bg-[#2E6B4E]'
                      : 'border-[#E5DDD0] bg-[#F3ECE1]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-[#FFFFFF] shadow transition-transform ${
                      filters.inStockOnly ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {!lockedCollectionSlug ? (
                <FacetPillGroup
                  title="Collection"
                  options={COLLECTION_FILTER_OPTIONS.map((c) => ({
                    value: c.slug,
                    label: `${c.label} · ${c.subtitle}`,
                  }))}
                  selected={filters.collections}
                  onToggle={(val) => onToggleCollection(val as CollectionSlug)}
                />
              ) : null}

              <FacetPillGroup
                title="Category"
                options={CATEGORY_OPTIONS.map((c) => ({ value: c, label: c }))}
                selected={filters.categories}
                onToggle={(val) => onToggleCategory(val as ProductCategory)}
              />

              <FacetPillGroup
                title="Metal & Purity"
                options={PURITY_OPTIONS.map((p) => ({
                  value: p,
                  label: p,
                }))}
                selected={filters.purities}
                onToggle={(val) => onTogglePurity(val as PurityOption)}
              />

              <FacetPillGroup
                title="Price Bracket"
                options={PRICE_BRACKETS.map((b) => ({
                  value: b.id,
                  label: b.label,
                }))}
                selected={filters.priceBrackets}
                onToggle={(val) => onTogglePriceBracket(val as PriceBracketId)}
              />

              <FacetPillGroup
                title="Occasion"
                options={OCCASION_OPTIONS.map((o) => ({ value: o, label: o }))}
                selected={filters.occasions}
                onToggle={(val) => onToggleOccasion(val as Occasion)}
              />

              <FacetPillGroup
                title="Recipient"
                options={RECIPIENT_OPTIONS.map((r) => ({ value: r, label: r }))}
                selected={filters.recipients}
                onToggle={(val) => onToggleRecipient(val as Recipient)}
              />
            </div>

            {/* Sticky Bottom Footer */}
            <footer className="flex items-center gap-3 border-t border-[#E5DDD0] bg-[#FFFFFF] px-5 py-4">
              <button
                type="button"
                onClick={onClearAll}
                className="w-1/3 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#5C504A] hover:border-[#1C1514] hover:text-[#1C1514]"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-[2px] bg-[#1C1514] px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439] tabular-nums"
              >
                View {resultCount} {resultCount === 1 ? 'Piece' : 'Pieces'}
              </button>
            </footer>
          </motion.section>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

interface FacetPillGroupProps {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}

function FacetPillGroup({
  title,
  options,
  selected,
  onToggle,
}: FacetPillGroupProps) {
  return (
    <div>
      <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C7E75]">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                active
                  ? 'border-[#C69C4D] bg-[#1C1514] font-medium text-[#FAF7F2]'
                  : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#C69C4D] hover:text-[#1C1514]'
              }`}
            >
              {active ? (
                <Check className="h-3 w-3 text-[#C69C4D]" strokeWidth={2.2} />
              ) : null}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
