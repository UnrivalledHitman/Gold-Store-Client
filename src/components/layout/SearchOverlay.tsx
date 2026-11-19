'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Plus, Search, Sparkles, X } from 'lucide-react';
import type { GoldRates, Product } from '@/types/store';
import { PRODUCTS } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { calculateProductPrice, formatINR } from '@/lib/pricing';
import { SafeProductImage } from '@/components/ui/SafeProductImage';

const TRENDING_PILLS = [
  'Solitaire',
  'Waterproof',
  'Mangalsutra',
  'Under ₹15,000',
] as const;

function isSubsequenceMatch(needle: string, haystack: string): boolean {
  if (!needle) return true;
  let ni = 0;
  for (let hi = 0; hi < haystack.length && ni < needle.length; hi += 1) {
    if (haystack[hi] === needle[ni]) {
      ni += 1;
    }
  }
  return ni === needle.length;
}

function searchProducts(
  rawQuery: string,
  goldRates: GoldRates
): Product[] {
  const trimmed = rawQuery.trim();
  if (!trimmed) {
    return PRODUCTS.filter((p) => p.isBestseller).slice(0, 6);
  }

  const normalized = trimmed.toLowerCase();

  // Support "Under ₹15,000" / "under 15000" / "under 15k"
  const underMatch = normalized.match(
    /under\s*₹?\s*(\d[\d,]*)(k)?/i
  );
  if (underMatch) {
    const rawNum = Number(underMatch[1].replace(/,/g, ''));
    const ceiling = underMatch[2] ? rawNum * 1000 : rawNum;
    if (Number.isFinite(ceiling) && ceiling > 0) {
      return PRODUCTS.filter((product) => {
        const price = calculateProductPrice(
          product,
          product.purityOptions[0],
          goldRates
        ).finalPrice;
        return price <= ceiling;
      });
    }
  }

  const tokens = normalized.split(/\s+/).filter(Boolean);

  const scored = PRODUCTS.map((product) => {
    const searchable = [
      product.id,
      product.name,
      product.subtitle ?? '',
      product.collection,
      product.category,
      product.tier,
      product.stoneSpec,
      ...product.metalVariants,
      ...product.purityOptions,
      ...product.occasions,
      ...product.certifications,
    ]
      .join(' ')
      .toLowerCase();

    const exactAllTokens = tokens.every((tok) => searchable.includes(tok));
    if (exactAllTokens) {
      const nameBoost = product.name.toLowerCase().includes(normalized) ? 3 : 2;
      return { product, score: nameBoost };
    }

    const compactQuery = normalized.replace(/[^a-z0-9]/g, '');
    const compactName = product.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (compactQuery.length >= 3 && isSubsequenceMatch(compactQuery, compactName)) {
      return { product, score: 1 };
    }

    return { product, score: 0 };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((entry) => entry.product);
}

/**
 * Instant fuzzy search overlay across all 18 ZAVERA SKUs with trending pills,
 * live gold-rate pricing, Quick Add, and PDP navigation.
 */
export function SearchOverlay() {
  const { isSearchOpen, closeSearch, goldRates, addToCart } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSearchOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 60);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, closeSearch]);

  const results = useMemo(
    () => searchProducts(query, goldRates),
    [query, goldRates]
  );

  const isDefaultView = query.trim().length === 0;

  return (
    <AnimatePresence>
      {isSearchOpen ? (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search ZAVERA Jewellery"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-[#1C1514]/55 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 mx-auto w-full max-w-4xl border-b border-x border-[#E5DDD0] bg-[#FAF7F2] shadow-2xl sm:mt-8 sm:rounded-[2px]"
          >
            {/* Search Input Header */}
            <div className="flex items-center gap-3 border-b border-[#E5DDD0] bg-[#FFFFFF] px-4 py-3.5 sm:px-6">
              <Search
                className="h-5 w-5 shrink-0 text-[#8C7E75]"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by piece, SKU (ZAV-AAR-01), metal, occasion, or 'Under ₹15,000'..."
                className="w-full bg-transparent text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:outline-none sm:text-base"
                aria-label="Search ZAVERA products"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="rounded-[2px] px-2 py-1 text-xs font-medium text-[#5C504A] hover:text-[#1C1514]"
                >
                  Clear
                </button>
              ) : null}
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#5C504A] transition-colors hover:border-[#1C1514] hover:text-[#1C1514]"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Trending Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#E5DDD0] bg-[#FAF7F2] px-4 py-3 sm:px-6">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8C7E75]">
                <Sparkles className="h-3 w-3 text-[#C69C4D]" strokeWidth={1.7} />
                Trending
              </span>
              {TRENDING_PILLS.map((pill) => {
                const active = query.trim().toLowerCase() === pill.toLowerCase();
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setQuery(pill)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      active
                        ? 'border-[#C69C4D] bg-[#1C1514] text-[#FAF7F2]'
                        : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#C69C4D] hover:text-[#1C1514]'
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>

            {/* Results Body */}
            <div className="max-h-[68vh] overflow-y-auto px-4 py-5 sm:px-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8C7E75]">
                  {isDefaultView
                    ? 'Curated House Bestsellers'
                    : `${results.length} ${
                        results.length === 1 ? 'Piece' : 'Pieces'
                      } Found`}
                </p>
                <Link
                  href="/collections"
                  onClick={closeSearch}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1C1514] underline decoration-[#C69C4D] underline-offset-4 hover:text-[#AE8439]"
                >
                  <span>Browse Full Catalogue</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {results.length === 0 ? (
                <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-6 py-12 text-center">
                  <p className="font-serif text-2xl text-[#1C1514]">
                    No pieces matched &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-1.5 text-sm text-[#5C504A]">
                    Try searching for Solitaire, Waterproof, Mangalsutra, 22KT, or
                    Under ₹15,000.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {results.map((product) => {
                    const breakup = calculateProductPrice(
                      product,
                      product.purityOptions[0],
                      goldRates
                    );
                    return (
                      <div
                        key={product.id}
                        className="flex items-center gap-3.5 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3 transition-colors hover:border-[#C69C4D]"
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeSearch}
                          className="aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1] sm:w-20"
                        >
                          <SafeProductImage
                            src={product.images[0]}
                            alt={product.name}
                            categoryLabel={product.category}
                          />
                        </Link>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#8C7E75]">
                            <span>{product.collection}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{product.id}</span>
                          </div>

                          <Link
                            href={`/product/${product.slug}`}
                            onClick={closeSearch}
                            className="mt-0.5 block truncate font-serif text-lg font-medium text-[#1C1514] hover:text-[#AE8439]"
                          >
                            {product.name}
                          </Link>

                          <p className="mt-0.5 text-xs text-[#5C504A]">
                            {product.purityOptions[0]} · {product.metalVariants[0]}
                          </p>

                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-[#1C1514] tabular-nums">
                              {formatINR(breakup.finalPrice)}
                            </span>

                            <div className="flex items-center gap-2">
                              <Link
                                href={`/product/${product.slug}`}
                                onClick={closeSearch}
                                className="text-[11px] font-medium text-[#5C504A] underline underline-offset-4 hover:text-[#1C1514]"
                              >
                                View
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  addToCart(product, {
                                    selectedMetal: product.metalVariants[0],
                                    selectedPurity: product.purityOptions[0],
                                    openDrawer: true,
                                  });
                                }}
                                className="inline-flex items-center gap-1 rounded-[2px] border border-[#1C1514] bg-[#1C1514] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#FAF7F2] transition-colors hover:border-[#AE8439] hover:bg-[#AE8439]"
                              >
                                <Plus className="h-3 w-3" />
                                <span>Add</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
