'use client';

import React from 'react';
import Link from 'next/link';
import {
  Gift,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/lib/pricing';
import { SafeProductImage } from '@/components/ui/SafeProductImage';
import type { DeliveryMethod } from '@/components/checkout/checkoutTypes';

export interface OrderSummaryRailProps {
  deliveryMethod: DeliveryMethod;
  selectedBoutiqueLabel?: string;
}

/**
 * Right-hand sticky Order Summary Rail displaying live gold-rate-synced cart
 * items, Solis 2+ bundle savings, applied promo codes, gift packaging,
 * and final INR payable total.
 */
export function OrderSummaryRail({
  deliveryMethod,
  selectedBoutiqueLabel,
}: OrderSummaryRailProps) {
  const {
    cart,
    cartCount,
    solisItemCount,
    getCartItemBreakup,
    rate22K,
    giftBox,
    giftNote,
    promoCode,
    subtotal,
    solisBundleDiscount,
    promoDiscount,
    total,
  } = useStore();

  return (
    <aside
      aria-label="Order Summary"
      className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-5 sm:p-6 lg:sticky lg:top-24"
    >
      <div className="flex items-baseline justify-between border-b border-[#E5DDD0] pb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
            Order Summary
          </p>
          <h2 className="mt-0.5 font-serif text-2xl font-medium text-[#1C1514]">
            Selected Pieces{' '}
            <span className="text-base font-normal text-[#8C7E75] tabular-nums">
              ({cartCount})
            </span>
          </h2>
        </div>

        <span className="rounded-full border border-[#E5DDD0] bg-[#FAF7F2] px-2.5 py-1 text-[10px] font-medium text-[#5C504A] tabular-nums">
          22KT: {formatINR(rate22K)}/g
        </span>
      </div>

      {/* Cart Line Items */}
      <div className="mt-4 max-h-[380px] space-y-3.5 overflow-y-auto pr-1">
        {cart.map((item) => {
          const breakup = getCartItemBreakup(item);
          const unitPrice = breakup ? breakup.finalPrice : 0;
          const lineTotal = unitPrice * item.quantity;

          return (
            <div
              key={item.cartItemId}
              className="flex gap-3 border-b border-[#E5DDD0]/70 pb-3.5 last:border-b-0 last:pb-0"
            >
              <Link
                href={`/product/${item.slug}`}
                className="aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]"
              >
                <SafeProductImage
                  src={item.image}
                  alt={item.name}
                  categoryLabel={item.category}
                />
              </Link>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/product/${item.slug}`}
                    className="truncate font-serif text-base font-medium text-[#1C1514] hover:text-[#AE8439]"
                  >
                    {item.name}
                  </Link>
                  <p className="shrink-0 text-sm font-semibold text-[#1C1514] tabular-nums">
                    {formatINR(lineTotal)}
                  </p>
                </div>

                <p className="mt-0.5 text-xs text-[#5C504A]">
                  {item.selectedMetal} · {item.selectedPurity}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-[#8C7E75]">
                  <span className="tabular-nums">Qty: {item.quantity}</span>
                  {item.ringSize !== undefined ? (
                    <span className="tabular-nums">
                      Size: Indian {item.ringSize}
                    </span>
                  ) : null}
                  {item.quantity > 1 ? (
                    <span className="tabular-nums">
                      ({formatINR(unitPrice)} each)
                    </span>
                  ) : null}
                </div>

                {item.engraving ? (
                  <p className="mt-1.5 inline-flex items-center rounded-full border border-[#C69C4D]/40 bg-[#FAF7F2] px-2.5 py-0.5 text-[10px] italic text-[#5C504A]">
                    Engraving: &ldquo;{item.engraving}&rdquo;
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Solis Bundle Callout if close or unlocked */}
      {solisItemCount === 1 ? (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-[2px] border border-[#C69C4D]/40 bg-[#F3ECE1]/65 px-3 py-2 text-[11px] text-[#5C504A]">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#AE8439]" />
            <span>Add 1 more Solis piece for 15% off stack</span>
          </span>
          <Link
            href="/collections/solis"
            className="shrink-0 font-semibold text-[#1C1514] underline decoration-[#C69C4D] underline-offset-4 hover:text-[#AE8439]"
          >
            Add
          </Link>
        </div>
      ) : null}

      {/* Cost Breakdown */}
      <div className="mt-5 space-y-2.5 border-t border-[#E5DDD0] pt-4 text-xs text-[#5C504A]">
        <div className="flex items-center justify-between">
          <span>Subtotal (Incl. 3% GST)</span>
          <span className="font-medium text-[#1C1514] tabular-nums">
            {formatINR(subtotal)}
          </span>
        </div>

        {solisBundleDiscount > 0 ? (
          <div className="flex items-center justify-between text-[#2E6B4E]">
            <span>Solis Demi-Fine Buy 2 Save 15%</span>
            <span className="font-semibold tabular-nums">
              -{formatINR(solisBundleDiscount)}
            </span>
          </div>
        ) : null}

        {promoDiscount > 0 ? (
          <div className="flex items-center justify-between text-[#2E6B4E]">
            <span>Promo Discount {promoCode ? `(${promoCode})` : ''}</span>
            <span className="font-semibold tabular-nums">
              -{formatINR(promoDiscount)}
            </span>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5">
            <Gift className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.6} />
            <span>Complimentary Luxury Gift Box</span>
          </span>
          <span
            className={`font-medium ${
              giftBox ? 'text-[#2E6B4E]' : 'text-[#8C7E75]'
            }`}
          >
            {giftBox ? 'Included' : 'Optional (Free)'}
          </span>
        </div>

        {giftBox && giftNote.trim() ? (
          <p className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-2.5 py-1.5 text-[11px] italic text-[#5C504A]">
            Note: &ldquo;{giftNote.trim()}&rdquo;
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5">
            {deliveryMethod === 'boutique_pickup' ? (
              <Store
                className="h-3.5 w-3.5 text-[#C69C4D]"
                strokeWidth={1.6}
              />
            ) : (
              <Truck
                className="h-3.5 w-3.5 text-[#C69C4D]"
                strokeWidth={1.6}
              />
            )}
            <span>
              {deliveryMethod === 'boutique_pickup' && selectedBoutiqueLabel
                ? `Salon Pickup (${selectedBoutiqueLabel})`
                : 'Complimentary Insured Shipping'}
            </span>
          </span>
          <span className="font-medium text-[#2E6B4E]">Complimentary</span>
        </div>
      </div>

      {/* Total Payable */}
      <div className="mt-4 flex items-baseline justify-between border-t border-[#E5DDD0] pt-4">
        <div>
          <span className="font-serif text-xl font-medium text-[#1C1514]">
            Total Payable
          </span>
          <p className="text-[10px] text-[#8C7E75]">
            Inclusive of 3% GST &amp; transit insurance
          </p>
        </div>
        <span className="font-sans text-xl font-semibold text-[#1C1514] tabular-nums">
          {formatINR(total)}
        </span>
      </div>

      {/* Trust Micro-Footer */}
      <div className="mt-4 flex items-start gap-2 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-2.5 text-[11px] text-[#5C504A]">
        <ShieldCheck
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2E6B4E]"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <span>
          15-day complimentary returns · Lifetime PIXTACY gold exchange ·
          Tamper-proof sealed packaging.
        </span>
      </div>
    </aside>
  );
}
