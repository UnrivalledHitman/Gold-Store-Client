'use client';

import React, { useState } from 'react';
import { Award, Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import type { CollectionInfo, Product, PurityOption } from '@/types/store';

export interface SpecsAndCareTabsProps {
  product: Product;
  collection?: CollectionInfo;
  selectedPurity: PurityOption;
}

type TabKey = 'specs' | 'hallmark' | 'care';

const TAB_ITEMS: { key: TabKey; label: string }[] = [
  { key: 'specs', label: 'Specifications' },
  { key: 'hallmark', label: 'Hallmark & Exchange' },
  { key: 'care', label: 'Jewellery Care' },
];

/**
 * Editorial hairline-divided tabs presenting technical specs,
 * BIS/IGI/Exchange guarantees, and tailored jewellery care guidance.
 */
export function SpecsAndCareTabs({
  product,
  collection,
  selectedPurity,
}: SpecsAndCareTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('specs');
  const isSolis = product.collection === 'solis';

  return (
    <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF]">
      <div
        role="tablist"
        aria-label="Product details and guarantees"
        className="flex border-b border-[#E5DDD0] bg-[#FAF7F2]/70"
      >
        {TAB_ITEMS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-1 px-4 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] transition-colors sm:flex-none sm:px-6 ${
                active
                  ? 'bg-[#FFFFFF] text-[#1C1514]'
                  : 'text-[#8C7E75] hover:text-[#1C1514]'
              }`}
            >
              <span>{tab.label}</span>
              {active ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-[#C69C4D]"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="p-5 sm:p-6">
        {activeTab === 'specs' ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <SpecRow label="Style SKU" value={product.id} tabular />
            <SpecRow
              label="Collection House"
              value={collection ? `${collection.name} · ${collection.tier}` : product.tier}
            />
            <SpecRow label="Category" value={product.category} />
            <SpecRow
              label="Gross Metal Weight"
              value={`${product.weightGrams} g`}
              tabular
            />
            <SpecRow
              label="Selected Purity"
              value={selectedPurity}
            />
            <SpecRow
              label="Available Finishes"
              value={product.metalVariants.join(' · ')}
            />
            <SpecRow
              label="Stone / Craft Detail"
              value={product.stoneSpec}
              fullWidth
            />
            <SpecRow
              label="Ideal Occasions"
              value={product.occasions.join(', ')}
            />
            <SpecRow
              label="Dispatch Timeline"
              value={
                product.inStock
                  ? `In Stock · Dispatches in ${product.dispatchDays} business ${
                      product.dispatchDays === 1 ? 'day' : 'days'
                    }`
                  : `Made to Order · Crafts in ${product.dispatchDays} business days`
              }
            />
          </div>
        ) : null}

        {activeTab === 'hallmark' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4">
              <div className="flex items-center gap-2 text-[#2E6B4E]">
                <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.7} />
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em]">
                  {isSolis ? 'Waterproof Anti-Tarnish' : 'BIS HUID & Assay'}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#5C504A]">
                {isSolis
                  ? 'Plated with 2.5 microns of genuine 18K gold over hypoallergenic 925 sterling silver and backed by PIXTACY’s 1-year waterproof warranty.'
                  : 'Every fine gold piece carries a Government-approved BIS 916 or 750 laser HUID hallmark verifiable on the BIS Care portal.'}
              </p>
            </div>

            <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4">
              <div className="flex items-center gap-2 text-[#C69C4D]">
                <Award className="h-4 w-4 shrink-0" strokeWidth={1.7} />
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                  {product.collection === 'noor'
                    ? 'IGI EF-VVS Dossier'
                    : '100% Lifetime Exchange'}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#5C504A]">
                {product.collection === 'noor'
                  ? 'Accompanied by an independent International Gemological Institute (IGI) certificate detailing EF colour, VVS clarity, and cut precision.'
                  : isSolis
                  ? '15-day effortless exchange or store credit on unworn Solis demi-fine pieces across all 4 PIXTACY salons.'
                  : 'Upgrade or exchange your PIXTACY fine gold creation at 100% of the prevailing bullion value at any PIXTACY salon.'}
              </p>
            </div>

            <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4">
              <div className="flex items-center gap-2 text-[#1C1514]">
                <Sparkles className="h-4 w-4 shrink-0 text-[#C69C4D]" strokeWidth={1.7} />
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Complimentary Salon Care
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#5C504A]">
                Enjoy complimentary ultrasonic lustre restoration, clasp tension
                checks, and prong inspections at Mumbai, New Delhi, Bengaluru,
                and Kolkata salons.
              </p>
            </div>
          </div>
        ) : null}

        {activeTab === 'care' ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4">
              {isSolis ? (
                <Droplets
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#2E6B4E]"
                  strokeWidth={1.6}
                />
              ) : (
                <Sparkles
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#C69C4D]"
                  strokeWidth={1.6}
                />
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                  Atelier Care Guidance
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5C504A]">
                  {product.careInstructions}
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-1 gap-2.5 text-xs text-[#5C504A] sm:grid-cols-2">
              <li className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3.5 py-2.5">
                • Store individually inside the suede-lined PIXTACY pouch to
                prevent metal-on-metal micro-abrasions.
              </li>
              <li className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3.5 py-2.5">
                • Apply fragrances, hairspray, and lotions before fastening
                earrings, necklaces, or cuffs.
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function SpecRow({
  label,
  value,
  tabular = false,
  fullWidth = false,
}: {
  label: string;
  value: string;
  tabular?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`border-b border-[#E5DDD0]/70 pb-3 ${
        fullWidth ? 'sm:col-span-2' : ''
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8C7E75]">
        {label}
      </p>
      <p
        className={`mt-1 text-sm text-[#1C1514] ${
          tabular ? 'tabular-nums' : ''
        }`}
      >
        {value}
      </p>
    </div>
  );
}
