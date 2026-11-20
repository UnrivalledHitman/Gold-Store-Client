'use client';

import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import type { PriceBreakup, Product } from '@/types/store';
import { formatINR } from '@/lib/pricing';

export interface PriceBreakupAccordionProps {
  product: Product;
  breakup: PriceBreakup;
}

/**
 * Tanishq-inspired transparent live price breakup accordion showing exact
 * Metal weight x live rate, Stone/Diamond value, Making Charges, and 3% GST.
 */
export function PriceBreakupAccordion({
  product,
  breakup,
}: PriceBreakupAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const metalLabel = breakup.isFixedDemiFine
    ? '18K Vermeil Base'
    : `Metal (${breakup.purity} Gold)`;

  const metalSubtext = breakup.isFixedDemiFine
    ? `${breakup.weightGrams} g on 925 Sterling Silver`
    : `${breakup.weightGrams} g × ${formatINR(breakup.ratePerGram)}/g`;

  const makingLabel = breakup.isFixedDemiFine
    ? 'Atelier Craft & Waterproof Plating'
    : `Making Charges (${breakup.makingChargePct}%)`;

  return (
    <section
      id="price-breakup"
      className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF]"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="price-breakup-panel"
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#FAF7F2]"
      >
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514]">
              Transparent Price Breakup
            </h2>
            <span className="rounded-full border border-[#E5DDD0] bg-[#FAF7F2] px-2 py-0.5 text-[10px] font-medium text-[#5C504A] tabular-nums">
              {breakup.isFixedDemiFine
                ? '18K Vermeil'
                : `${breakup.purity} · ${formatINR(breakup.ratePerGram)}/g`}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-[#8C7E75]">
            Live itemised valuation synced to PIXTACY bullion rate
          </p>
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#5C504A] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#1C1514]' : ''
          }`}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id="price-breakup-panel"
          className="border-t border-[#E5DDD0] bg-[#FAF7F2]/50 px-4 py-3.5"
        >
          <dl className="divide-y divide-[#E5DDD0]/80 text-xs">
            <div className="flex items-start justify-between gap-4 py-2.5 first:pt-0">
              <div>
                <dt className="font-medium text-[#1C1514]">{metalLabel}</dt>
                <dd className="mt-0.5 text-[11px] text-[#5C504A] tabular-nums">
                  {metalSubtext}
                </dd>
              </div>
              <dd className="shrink-0 font-medium text-[#1C1514] tabular-nums">
                {formatINR(breakup.metalValue)}
              </dd>
            </div>

            <div className="flex items-start justify-between gap-4 py-2.5">
              <div className="min-w-0">
                <dt className="font-medium text-[#1C1514]">
                  Stone / Diamond Value
                </dt>
                <dd className="mt-0.5 text-[11px] leading-snug text-[#5C504A]">
                  {product.stoneSpec}
                </dd>
              </div>
              <dd className="shrink-0 font-medium text-[#1C1514] tabular-nums">
                {formatINR(breakup.stoneValue)}
              </dd>
            </div>

            <div className="flex items-start justify-between gap-4 py-2.5">
              <div>
                <dt className="font-medium text-[#1C1514]">{makingLabel}</dt>
                <dd className="mt-0.5 text-[11px] text-[#8C7E75]">
                  {breakup.isFixedDemiFine
                    ? '2.5-micron seal & artisan finishing'
                    : 'Handcrafted atelier finishing'}
                </dd>
              </div>
              <dd className="shrink-0 font-medium text-[#1C1514] tabular-nums">
                {formatINR(breakup.makingCharges)}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-2.5 text-[#5C504A]">
              <dt>Subtotal (Excl. GST)</dt>
              <dd className="font-medium tabular-nums">
                {formatINR(breakup.subtotalBeforeTax)}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="font-medium text-[#1C1514]">
                GST ({breakup.gstRatePct}%)
              </dt>
              <dd className="font-medium text-[#1C1514] tabular-nums">
                {formatINR(breakup.gst)}
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 pt-3">
              <dt className="font-serif text-lg font-medium text-[#1C1514]">
                Final Price
              </dt>
              <dd className="font-sans text-base font-semibold text-[#1C1514] tabular-nums">
                {formatINR(breakup.finalPrice)}
              </dd>
            </div>
          </dl>

          <div className="mt-3 flex items-center gap-1.5 border-t border-[#E5DDD0] pt-2.5 text-[11px] text-[#2E6B4E]">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={1.7} />
            <span>
              Zero hidden fees · Rate guaranteed upon bag checkout
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
