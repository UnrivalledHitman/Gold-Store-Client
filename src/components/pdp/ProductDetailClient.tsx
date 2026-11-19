'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Heart,
  PenLine,
  Ruler,
  ShoppingBag,
  Sparkles,
  Video,
} from 'lucide-react';
import type {
  CollectionInfo,
  MetalFinish,
  Product,
  PurityOption,
} from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { calculateProductPrice, formatINR } from '@/lib/pricing';
import { METAL_SWATCH_STYLES } from '@/components/ui/metalStyles';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductGallery } from '@/components/pdp/ProductGallery';
import { PriceBreakupAccordion } from '@/components/pdp/PriceBreakupAccordion';
import { RingSizeGuideModal } from '@/components/pdp/RingSizeGuideModal';
import { PincodeChecker } from '@/components/pdp/PincodeChecker';
import { SpecsAndCareTabs } from '@/components/pdp/SpecsAndCareTabs';

export interface ProductDetailClientProps {
  product: Product;
  collection?: CollectionInfo;
  completeTheLookProducts: Product[];
}

/**
 * Interactive 7/5 desktop Product Detail Page with live bullion-rate price breakup,
 * Metal/Purity/Indian Ring Size switchers, custom engraving preview, pincode lookup,
 * sticky mobile CTA bar, and Complete the Look curation.
 */
export function ProductDetailClient({
  product,
  collection,
  completeTheLookProducts,
}: ProductDetailClientProps) {
  const {
    mounted,
    goldRates,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openBookingModal,
  } = useStore();

  const [selectedMetal, setSelectedMetal] = useState<MetalFinish>(
    product.metalVariants[0]
  );
  const [selectedPurity, setSelectedPurity] = useState<PurityOption>(
    product.purityOptions[0]
  );
  const [selectedRingSize, setSelectedRingSize] = useState<number | undefined>(
    product.ringSizes && product.ringSizes.length > 0
      ? product.ringSizes.includes(14)
        ? 14
        : product.ringSizes[0]
      : undefined
  );
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const [engravingEnabled, setEngravingEnabled] = useState(false);
  const [engravingText, setEngravingText] = useState('');

  const breakup = useMemo(
    () => calculateProductPrice(product, selectedPurity, goldRates),
    [product, selectedPurity, goldRates]
  );

  const wishlisted = mounted ? isInWishlist(product.id) : false;
  const cleanedEngraving = engravingEnabled
    ? engravingText.trim().slice(0, 15)
    : '';

  const handleAddToBag = () => {
    addToCart(product, {
      selectedMetal,
      selectedPurity,
      ringSize: selectedRingSize,
      engraving: cleanedEngraving || undefined,
      openDrawer: true,
    });
  };

  const getPurityRateHint = (purity: PurityOption): string => {
    switch (purity) {
      case '22KT':
        return `${formatINR(goldRates['22KT'])}/g`;
      case '18KT':
        return `${formatINR(goldRates['18KT'])}/g`;
      case '14KT':
        return `${formatINR(goldRates['14KT'])}/g`;
      case '18K Vermeil / 925 Silver':
        return '2.5-Micron Vermeil';
    }
  };

  return (
    <div className="bg-[#FAF7F2] pb-24 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#8C7E75]"
        >
          <Link href="/" className="transition-colors hover:text-[#1C1514]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/collections"
            className="transition-colors hover:text-[#1C1514]"
          >
            Collections
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/collections/${product.collection}`}
            className="transition-colors hover:text-[#1C1514]"
          >
            {collection?.name ?? product.collection}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate font-medium text-[#1C1514]">
            {product.name}
          </span>
        </nav>

        {/* 7 / 5 Split Gallery & Buy Column */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left: Sticky 7-col Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery product={product} collection={collection} />
          </div>

          {/* Right: 5-col Buy Column */}
          <div className="space-y-6 lg:col-span-5">
            {/* Title & Live Price Block */}
            <div className="border-b border-[#E5DDD0] pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/collections/${product.collection}`}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AE8439] hover:underline"
                >
                  {collection?.name ?? product.collection} · {product.tier}
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#8C7E75] tabular-nums">
                    {product.id}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${
                      product.inStock
                        ? 'border-[#2E6B4E]/30 bg-[#2E6B4E]/10 text-[#2E6B4E]'
                        : 'border-[#C69C4D]/50 bg-[#F3ECE1] text-[#5C504A]'
                    }`}
                  >
                    {product.inStock
                      ? `In Stock · ${product.dispatchDays}d Dispatch`
                      : `Made to Order · ${product.dispatchDays}d`}
                  </span>
                </div>
              </div>

              <h1 className="mt-2 font-serif text-3xl font-medium leading-tight text-[#1C1514] sm:text-4xl">
                {product.name}
              </h1>

              {product.subtitle ? (
                <p className="mt-1 font-serif text-lg text-[#5C504A]">
                  {product.subtitle}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-sans text-2xl font-semibold text-[#1C1514] tabular-nums sm:text-3xl">
                      {formatINR(breakup.finalPrice)}
                    </span>
                    <span className="text-xs text-[#5C504A]">
                      Inclusive of 3% GST
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#8C7E75] tabular-nums">
                    {breakup.weightGrams} g · {selectedPurity} · {selectedMetal}
                  </p>
                </div>

                <a
                  href="#price-breakup"
                  className="text-xs font-medium text-[#AE8439] underline decoration-[#C69C4D]/60 underline-offset-4 hover:text-[#1C1514]"
                >
                  View Price Breakup ↓
                </a>
              </div>

              {product.collection === 'solis' ? (
                <div className="mt-3.5 flex items-center gap-2 rounded-[2px] border border-[#C69C4D]/45 bg-[#F3ECE1]/80 px-3 py-2 text-xs text-[#1C1514]">
                  <Sparkles
                    className="h-3.5 w-3.5 shrink-0 text-[#C69C4D]"
                    strokeWidth={1.75}
                  />
                  <span>
                    <strong>Solis Stack Privilege:</strong> Buy any 2+ Solis
                    pieces &amp; save 15% automatically in your Bag.
                  </span>
                </div>
              ) : null}

              <p className="mt-4 text-sm leading-relaxed text-[#5C504A]">
                {product.description}
              </p>
            </div>

            {/* Interactive Metal Finish Switcher */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514]">
                  Metal Finish
                </span>
                <span className="text-xs text-[#5C504A]">{selectedMetal}</span>
              </div>

              <div
                className="mt-2.5 flex flex-wrap gap-2"
                role="radiogroup"
                aria-label="Select metal finish"
              >
                {product.metalVariants.map((finish) => {
                  const style = METAL_SWATCH_STYLES[finish];
                  const active = selectedMetal === finish;
                  return (
                    <button
                      key={finish}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelectedMetal(finish)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                        active
                          ? 'border-[#C69C4D] bg-[#FFFFFF] font-medium text-[#1C1514] ring-1 ring-[#C69C4D]'
                          : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#C69C4D] hover:text-[#1C1514]'
                      }`}
                    >
                      <span
                        style={{
                          background: style.background,
                          borderColor: style.borderColor,
                        }}
                        className="h-3.5 w-3.5 rounded-full border"
                        aria-hidden="true"
                      />
                      <span>{finish}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Purity Switcher */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514]">
                  Gold / Metal Purity
                </span>
                <span className="text-xs text-[#5C504A] tabular-nums">
                  {getPurityRateHint(selectedPurity)}
                </span>
              </div>

              <div
                className="mt-2.5 flex flex-wrap gap-2"
                role="radiogroup"
                aria-label="Select purity"
              >
                {product.purityOptions.map((purity) => {
                  const active = selectedPurity === purity;
                  const altBreakup = calculateProductPrice(
                    product,
                    purity,
                    goldRates
                  );
                  return (
                    <button
                      key={purity}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelectedPurity(purity)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                        active
                          ? 'border-[#C69C4D] bg-[#1C1514] font-medium text-[#FAF7F2]'
                          : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#C69C4D] hover:text-[#1C1514]'
                      }`}
                    >
                      <span>{purity}</span>
                      {product.purityOptions.length > 1 ? (
                        <span
                          className={`text-[11px] tabular-nums ${
                            active ? 'text-[#C69C4D]' : 'text-[#8C7E75]'
                          }`}
                        >
                          {formatINR(altBreakup.finalPrice)}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Indian Ring Size Selector (10-20) */}
            {product.ringSizes && product.ringSizes.length > 0 ? (
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514]">
                    Indian Ring Size:{' '}
                    <span className="text-[#AE8439] tabular-nums">
                      {selectedRingSize}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5C504A] underline decoration-[#C69C4D] underline-offset-4 transition-colors hover:text-[#1C1514]"
                  >
                    <Ruler className="h-3.5 w-3.5 text-[#C69C4D]" />
                    <span>Ring Size Guide</span>
                  </button>
                </div>

                <div
                  className="mt-2.5 flex flex-wrap gap-1.5"
                  role="radiogroup"
                  aria-label="Select Indian ring size"
                >
                  {product.ringSizes.map((size) => {
                    const active = selectedRingSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedRingSize(size)}
                        className={`flex h-9 min-w-[38px] items-center justify-center rounded-full border px-2.5 text-xs font-medium tabular-nums transition-colors ${
                          active
                            ? 'border-[#C69C4D] bg-[#1C1514] text-[#FAF7F2]'
                            : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#C69C4D] hover:text-[#1C1514]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Optional Custom Engraving */}
            <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <PenLine
                    className="h-4 w-4 text-[#C69C4D]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                      Complimentary Custom Engraving
                    </p>
                    <p className="text-[11px] text-[#8C7E75]">
                      Laser-inscribed initials, date, or milestone (up to 15
                      characters)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={engravingEnabled}
                  aria-label="Toggle custom engraving"
                  onClick={() => setEngravingEnabled((prev) => !prev)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
                    engravingEnabled
                      ? 'border-[#C69C4D] bg-[#1C1514]'
                      : 'border-[#E5DDD0] bg-[#F3ECE1]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-[#FFFFFF] shadow transition-transform ${
                      engravingEnabled ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {engravingEnabled ? (
                <div className="mt-3.5 space-y-3 border-t border-[#E5DDD0] pt-3.5">
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="pdp-engraving-input"
                        className="text-[11px] font-medium text-[#5C504A]"
                      >
                        Inscription Text
                      </label>
                      <span className="text-[11px] text-[#8C7E75] tabular-nums">
                        {engravingText.length}/15
                      </span>
                    </div>
                    <input
                      id="pdp-engraving-input"
                      type="text"
                      maxLength={15}
                      value={engravingText}
                      onChange={(e) =>
                        setEngravingText(e.target.value.slice(0, 15))
                      }
                      placeholder="e.g. A & R · 2026"
                      className="mt-1.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-2 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:bg-[#FFFFFF] focus:outline-none"
                    />
                  </div>

                  {/* Live Metallic Engraved Preview Tag */}
                  <div
                    aria-live="polite"
                    className="flex items-center justify-between gap-2 rounded-[2px] border border-[#C69C4D]/50 px-3.5 py-2.5"
                    style={{
                      background:
                        'linear-gradient(135deg, #FBF8F1 0%, #F3ECE1 55%, #EADBC0 100%)',
                    }}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A6623]">
                      Engraving Preview:
                    </span>
                    <span className="font-serif text-base italic tracking-[0.06em] text-[#1C1514]">
                      &ldquo;{cleanedEngraving || 'Your Inscription'}&rdquo;
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Primary CTAs */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleAddToBag}
                className="flex w-full items-center justify-center gap-2.5 rounded-[2px] bg-[#1C1514] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.7} />
                <span>Add to Bag</span>
                <span className="text-[#C69C4D]">·</span>
                <span className="tabular-nums">
                  {formatINR(breakup.finalPrice)}
                </span>
              </button>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-pressed={wishlisted}
                  className={`flex items-center justify-center gap-2 rounded-[2px] border px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                    wishlisted
                      ? 'border-[#7A1E2C] bg-[#7A1E2C]/[0.06] text-[#7A1E2C]'
                      : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#1C1514] hover:border-[#1C1514]'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlisted ? 'fill-[#7A1E2C] text-[#7A1E2C]' : ''
                    }`}
                    strokeWidth={1.6}
                  />
                  <span>{wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
                </button>

                <button
                  type="button"
                  onClick={openBookingModal}
                  className="flex items-center justify-center gap-2 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#1C1514] transition-colors hover:border-[#C69C4D] hover:bg-[#F3ECE1]/60"
                >
                  <Video
                    className="h-4 w-4 text-[#C69C4D]"
                    strokeWidth={1.6}
                  />
                  <span>Book Private Video View</span>
                </button>
              </div>
            </div>

            {/* 6-Digit Pincode Delivery Checker */}
            <PincodeChecker />

            {/* Tanishq-Inspired Transparent Price Breakup Accordion */}
            <PriceBreakupAccordion product={product} breakup={breakup} />
          </div>
        </div>

        {/* Specifications & Care Guarantee Tabs */}
        <div className="mt-12 lg:mt-16">
          <SpecsAndCareTabs
            product={product}
            collection={collection}
            selectedPurity={selectedPurity}
          />
        </div>

        {/* Complete the Look Paired SKU Row */}
        {completeTheLookProducts.length > 0 ? (
          <section className="mt-14 border-t border-[#E5DDD0] pt-12">
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#AE8439]">
                  Atelier Pairing
                </p>
                <h2 className="mt-1 font-serif text-3xl font-medium text-[#1C1514]">
                  Complete the Look
                </h2>
              </div>
              <Link
                href={`/collections/${product.collection}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[#1C1514] underline decoration-[#C69C4D] underline-offset-4 hover:text-[#AE8439]"
              >
                <Check className="h-3.5 w-3.5 text-[#C69C4D]" />
                <span>Explore {collection?.name ?? product.collection}</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 min-[460px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {completeTheLookProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="fixed inset-x-0 bottom-0 z-[41] border-t border-[#E5DDD0] bg-[#FFFFFF]/95 px-4 py-3 shadow-[0_-8px_24px_rgba(28,21,20,0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-base font-medium text-[#1C1514]">
              {product.name}
            </p>
            <p className="text-xs font-semibold text-[#1C1514] tabular-nums">
              {formatINR(breakup.finalPrice)}{' '}
              <span className="font-normal text-[#8C7E75]">
                · {selectedPurity}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-pressed={wishlisted}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#1C1514]"
          >
            <Heart
              className={`h-4 w-4 ${
                wishlisted ? 'fill-[#7A1E2C] text-[#7A1E2C]' : ''
              }`}
              strokeWidth={1.7}
            />
          </button>

          <button
            type="button"
            onClick={handleAddToBag}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[2px] bg-[#1C1514] px-5 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Ring Size Guide Modal */}
      {product.ringSizes && product.ringSizes.length > 0 ? (
        <RingSizeGuideModal
          open={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          selectedSize={selectedRingSize}
          onSelectSize={(size) => setSelectedRingSize(size)}
        />
      ) : null}
    </div>
  );
}
