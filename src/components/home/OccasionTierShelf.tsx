'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { calculateProductPrice, formatINR } from '@/lib/pricing';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Product } from '@/types/store';

type OccasionTabId =
  | 'bridal-festive'
  | 'work-minimal'
  | 'gifting-under-15k'
  | 'everyday-luxe';

interface OccasionTabConfig {
  id: OccasionTabId;
  label: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
}

const OCCASION_TABS: OccasionTabConfig[] = [
  {
    id: 'bridal-festive',
    label: 'Bridal & Festive',
    description:
      'Ceremonial 22KT nakshi, Bikaneri polki, and heirloom lab-grown solitaires curated for wedding trousseaus.',
    ctaHref: '/collections?occasion=Bridal+%26+Festive',
    ctaLabel: 'Explore Bridal & Festive',
  },
  {
    id: 'work-minimal',
    label: 'Work & Minimal',
    description:
      'Featherlight 18KT chains, sculpted ear huggies, and tailored solitaire pendants engineered for the weekday.',
    ctaHref: '/collections?occasion=Work+%26+Minimal',
    ctaLabel: 'Explore Work & Minimal',
  },
  {
    id: 'gifting-under-15k',
    label: 'Gifting Under ₹15,000',
    description:
      'Ready-to-gift keepsakes dynamically evaluated against live gold rates—complimentary vault box & note included.',
    ctaHref: '/collections?occasion=Gifting',
    ctaLabel: 'Explore Gifting Edit',
  },
  {
    id: 'everyday-luxe',
    label: 'Everyday Luxe',
    description:
      'Solid 18KT Italian links and sweatproof 18K gold vermeil stacks crafted for sunlit, dawn-to-dusk wear.',
    ctaHref: '/collections?occasion=Daily+Wear',
    ctaLabel: 'Explore Everyday Luxe',
  },
];

/**
 * Section 6: GIVA-inspired "Shop by Occasion & Price Tier" tabbed shelf
 * powered by live StoreContext goldRates so price-capped tiers react immediately.
 */
export function OccasionTierShelf() {
  const { goldRates } = useStore();
  const [activeTab, setActiveTab] = useState<OccasionTabId>('bridal-festive');

  const activeConfig =
    OCCASION_TABS.find((t) => t.id === activeTab) ?? OCCASION_TABS[0];

  const matchingProducts = useMemo<Product[]>(() => {
    const withPrice = PRODUCTS.map((product) => ({
      product,
      livePrice: calculateProductPrice(
        product,
        product.purityOptions[0],
        goldRates
      ).finalPrice,
    }));

    switch (activeTab) {
      case 'bridal-festive':
        return withPrice
          .filter(({ product }) => product.occasions.includes('Bridal & Festive'))
          .map(({ product }) => product)
          .slice(0, 8);
      case 'work-minimal':
        return withPrice
          .filter(({ product }) => product.occasions.includes('Work & Minimal'))
          .map(({ product }) => product)
          .slice(0, 8);
      case 'gifting-under-15k':
        return withPrice
          .filter(({ livePrice }) => livePrice <= 15000)
          .sort((a, b) => a.livePrice - b.livePrice)
          .map(({ product }) => product)
          .slice(0, 8);
      case 'everyday-luxe':
        return withPrice
          .filter(
            ({ product }) =>
              product.occasions.includes('Daily Wear') ||
              product.collection === 'saanjh' ||
              product.collection === 'solis'
          )
          .map(({ product }) => product)
          .slice(0, 8);
      default:
        return [];
    }
  }, [activeTab, goldRates]);

  return (
    <section
      aria-labelledby="occasion-shelf-heading"
      className="border-b border-[#E5DDD0] bg-[#FFFFFF] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AE8439]">
              Curated by Moment &amp; Budget
            </p>
            <h2
              id="occasion-shelf-heading"
              className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#1C1514] sm:text-4xl lg:text-[42px]"
            >
              Shop by Occasion &amp; Price Tier
            </h2>
          </div>

          {/* Interactive rounded-full filter/tab pills */}
          <div
            role="tablist"
            aria-label="Occasion and price tier filters"
            className="flex flex-wrap items-center gap-2"
          >
            {OCCASION_TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium tracking-[0.04em] transition-colors ${
                    isSelected
                      ? 'border-[#1C1514] bg-[#1C1514] text-[#FAF7F2]'
                      : 'border-[#E5DDD0] bg-[#FAF7F2] text-[#5C504A] hover:border-[#C69C4D] hover:text-[#1C1514]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Strip */}
        <div className="mt-6 flex flex-col justify-between gap-3 border-y border-[#E5DDD0] bg-[#FAF7F2]/70 px-4 py-3 sm:flex-row sm:items-center">
          <div className="flex items-start gap-2.5 sm:items-center">
            <Sparkles
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C69C4D] sm:mt-0"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <p className="text-xs text-[#5C504A]">{activeConfig.description}</p>
          </div>

          <div className="flex shrink-0 items-center gap-4 text-xs">
            <span className="rounded-full border border-[#E5DDD0] bg-[#FFFFFF] px-2.5 py-0.5 text-[11px] font-medium text-[#1C1514] tabular-nums">
              {matchingProducts.length}{' '}
              {matchingProducts.length === 1 ? 'piece' : 'pieces'}
              {activeTab === 'gifting-under-15k'
                ? ` · 22KT @ ${formatINR(goldRates['22KT'])}/g`
                : ''}
            </span>
            <Link
              href={activeConfig.ctaHref}
              className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.12em] text-[#1C1514] hover:text-[#AE8439]"
            >
              <span>{activeConfig.ctaLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        {matchingProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {matchingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-10 text-center">
            <p className="font-serif text-2xl text-[#1C1514]">
              No pieces currently fall below ₹15,000 at this simulated gold rate.
            </p>
            <p className="mt-1.5 text-xs text-[#5C504A]">
              Explore our full collection or adjust the 22KT rate inside Pitch Mode.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
