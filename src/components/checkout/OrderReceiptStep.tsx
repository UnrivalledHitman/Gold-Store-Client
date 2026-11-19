'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Gift,
  Home,
  MapPin,
  Printer,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
} from 'lucide-react';
import type { DemoOrder } from '@/types/store';
import { BOUTIQUES } from '@/lib/siteConfig';
import { formatINR } from '@/lib/pricing';
import { SafeProductImage } from '@/components/ui/SafeProductImage';
import {
  COLLECTION_LABELS,
  formatOrderTimestamp,
} from '@/components/checkout/checkoutTypes';

export interface OrderReceiptStepProps {
  order: DemoOrder;
  isHistoricalView?: boolean;
  cartCount?: number;
  onReturnToBagCheckout?: () => void;
  onExitHistoricalView?: () => void;
}

const PAYMENT_METHOD_LABELS: Record<DemoOrder['paymentMethod'], string> = {
  upi: 'UPI Simulated Authorization',
  card: 'Demo Credit / Debit Card',
  netbanking: 'Simulated Partner NetBanking',
};

/**
 * Step 3: Editorial Luxury Order Confirmed Receipt rendering generated orderId,
 * timestamp, delivery/salon pickup ETA, itemized pieces with custom finishes/engraving,
 * Complimentary Luxury Gift Box & Handwritten Note Preview, and itemized savings.
 */
export function OrderReceiptStep({
  order,
  isHistoricalView = false,
  cartCount = 0,
  onReturnToBagCheckout,
  onExitHistoricalView,
}: OrderReceiptStepProps) {
  const matchedBoutique =
    order.deliveryMethod === 'boutique_pickup' && order.boutiqueName
      ? BOUTIQUES.find((b) => b.name === order.boutiqueName)
      : undefined;

  const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {isHistoricalView && cartCount > 0 && onReturnToBagCheckout ? (
        <div className="flex flex-col justify-between gap-3 rounded-[2px] border border-[#C69C4D]/50 bg-[#F3ECE1] px-4 py-3 sm:flex-row sm:items-center sm:px-5">
          <p className="text-xs text-[#1C1514]">
            Viewing saved receipt{' '}
            <span className="font-semibold tabular-nums">{order.orderId}</span>
            . You have{' '}
            <span className="font-semibold tabular-nums">{cartCount}</span>{' '}
            {cartCount === 1 ? 'piece' : 'pieces'} in your active bag.
          </p>
          <button
            type="button"
            onClick={onReturnToBagCheckout}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-[2px] bg-[#1C1514] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
          >
            <span>Resume Active Checkout</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}

      {/* Editorial Confirmation Hero Banner */}
      <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-6 sm:p-8">
        <div className="flex flex-col gap-5 border-b border-[#E5DDD0] pb-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2E6B4E]/30 bg-[#2E6B4E]/10 text-[#2E6B4E]">
              <CheckCircle2 className="h-6 w-6" strokeWidth={1.7} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-[#2E6B4E]/35 bg-[#2E6B4E]/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2E6B4E]">
                  Client Demo Order Confirmed
                </span>
                {isHistoricalView ? (
                  <span className="rounded-full border border-[#E5DDD0] bg-[#FAF7F2] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#5C504A]">
                    Saved LocalStorage Receipt
                  </span>
                ) : null}
              </div>

              <h2 className="mt-2 font-serif text-3xl font-medium text-[#1C1514] sm:text-4xl">
                Thank you, {order.shippingAddress.fullName}.
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#5C504A]">
                Your ZAVERA client demo order dossier is prepared with BIS &amp;
                IGI certification records. No real payment was charged.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-4 py-3 md:items-end">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C7E75]">
              Order Reference
            </p>
            <p className="font-serif text-2xl font-semibold tracking-wide text-[#1C1514] tabular-nums">
              {order.orderId}
            </p>
            <p className="flex items-center gap-1.5 text-[11px] text-[#5C504A] tabular-nums">
              <CalendarClock className="h-3.5 w-3.5 text-[#C69C4D]" />
              <span>{formatOrderTimestamp(order.createdAt)}</span>
            </p>
          </div>
        </div>

        {/* Fulfillment, Address & Payment Metadata Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Delivery / Boutique ETA */}
          <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C69C4D]">
              {order.deliveryMethod === 'boutique_pickup' ? (
                <Store className="h-3.5 w-3.5" />
              ) : (
                <Truck className="h-3.5 w-3.5" />
              )}
              <span>
                {order.deliveryMethod === 'boutique_pickup'
                  ? 'Salon Pickup ETA'
                  : 'Insured Courier ETA'}
              </span>
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#1C1514]">
              {order.estimatedDelivery}
            </p>
            {order.deliveryMethod === 'boutique_pickup' && order.boutiqueName ? (
              <div className="mt-2 space-y-1 text-xs text-[#5C504A]">
                <p className="font-medium text-[#1C1514]">
                  {order.boutiqueName}
                </p>
                {matchedBoutique ? (
                  <>
                    <p>{matchedBoutique.address}</p>
                    <p className="text-[11px] text-[#8C7E75] tabular-nums">
                      {matchedBoutique.hours} · {matchedBoutique.phone}
                    </p>
                  </>
                ) : null}
              </div>
            ) : (
              <p className="mt-2 text-xs text-[#5C504A]">
                Tamper-proof Sequel vault parcel with OTP delivery verification.
              </p>
            )}
          </div>

          {/* Client & Address */}
          <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C69C4D]">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {order.deliveryMethod === 'boutique_pickup'
                  ? 'Guest & Invoicing Address'
                  : 'Delivery Address'}
              </span>
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#1C1514]">
              {order.shippingAddress.fullName}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#5C504A]">
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2
                ? `, ${order.shippingAddress.addressLine2}`
                : ''}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} –{' '}
              <span className="tabular-nums">
                {order.shippingAddress.pincode}
              </span>
            </p>
            <p className="mt-1.5 text-[11px] text-[#8C7E75] tabular-nums">
              {order.shippingAddress.phone} · {order.shippingAddress.email}
            </p>
          </div>

          {/* Payment Simulator Status */}
          <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C69C4D]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Payment Record</span>
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#1C1514]">
              {PAYMENT_METHOD_LABELS[order.paymentMethod]}
            </p>
            <p className="mt-1 text-xs text-[#2E6B4E]">
              Demo Status: Authorized (Simulated)
            </p>
            <p className="mt-2 text-xs font-semibold text-[#1C1514] tabular-nums">
              Demo Total: {formatINR(order.totalInr)}
            </p>
          </div>
        </div>
      </section>

      {/* Main Split: Itemized Pieces + Gift Box Preview + Totals */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Itemized Pieces & Gift Note Preview */}
        <div className="space-y-6 lg:col-span-7">
          <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-5 sm:p-6">
            <div className="flex items-baseline justify-between border-b border-[#E5DDD0] pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
                  Itemized Dossier
                </p>
                <h3 className="mt-0.5 font-serif text-2xl font-medium text-[#1C1514]">
                  Pieces Confirmed{' '}
                  <span className="text-base font-normal text-[#8C7E75] tabular-nums">
                    ({totalUnits})
                  </span>
                </h3>
              </div>
              <span className="text-[11px] text-[#5C504A]">
                BIS / IGI Certificate Included
              </span>
            </div>

            <div className="mt-4 divide-y divide-[#E5DDD0]">
              {order.items.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.selectedMetal}-${item.selectedPurity}-${idx}`}
                  className="flex gap-4 py-4 first:pt-1 last:pb-1"
                >
                  <div className="aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]">
                    <SafeProductImage
                      src={item.image}
                      alt={item.name}
                      categoryLabel={item.collection}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8C7E75]">
                          {COLLECTION_LABELS[item.collection]}
                        </p>
                        <h4 className="mt-0.5 font-serif text-lg font-medium text-[#1C1514]">
                          {item.name}
                        </h4>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-semibold text-[#1C1514] tabular-nums">
                          {formatINR(item.lineTotalInr)}
                        </p>
                        {item.quantity > 1 ? (
                          <p className="text-[11px] text-[#8C7E75] tabular-nums">
                            {formatINR(item.unitPriceInr)} × {item.quantity}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#5C504A]">
                      <span>{item.selectedMetal}</span>
                      <span className="text-[#E5DDD0]">·</span>
                      <span>{item.selectedPurity}</span>
                      <span className="text-[#E5DDD0]">·</span>
                      <span className="tabular-nums">Qty {item.quantity}</span>
                      {item.ringSize !== undefined ? (
                        <>
                          <span className="text-[#E5DDD0]">·</span>
                          <span className="tabular-nums">
                            Ring Size: Indian {item.ringSize}
                          </span>
                        </>
                      ) : null}
                    </div>

                    {item.engraving ? (
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#C69C4D]/45 bg-[#FAF7F2] px-3 py-0.5 text-[11px] italic text-[#5C504A]">
                        <Sparkles className="h-3 w-3 text-[#C69C4D]" />
                        <span>Custom Engraving: &ldquo;{item.engraving}&rdquo;</span>
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Complimentary Luxury Gift Box & Handwritten Note Preview */}
          {order.giftBox ? (
            <section
              aria-label="Luxury Gift Box and Handwritten Note Preview"
              className="rounded-[2px] border border-[#C69C4D]/55 bg-[#F3ECE1] p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#C69C4D] bg-[#FFFFFF] text-[#AE8439]">
                    <Gift className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#AE8439]">
                      Complimentary Luxury Gift Box
                    </p>
                    <h3 className="font-serif text-xl font-medium text-[#1C1514]">
                      Handwritten Keepsake Card Preview
                    </h3>
                  </div>
                </div>
                <span className="rounded-full border border-[#2E6B4E]/30 bg-[#FFFFFF] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#2E6B4E]">
                  Complimentary
                </span>
              </div>

              {/* Wax-Sealed Ivory Card Preview */}
              <div className="mt-4 rounded-[2px] border border-[#C69C4D]/40 bg-[#FAF7F2] p-5">
                <div className="flex items-center justify-between border-b border-[#E5DDD0] pb-3">
                  <span className="font-serif text-xs uppercase tracking-[0.35em] text-[#8C7E75]">
                    ZAVERA ATELIER
                  </span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#7A1E2C] font-serif text-[10px] font-semibold text-[#FAF7F2]">
                    Z
                  </span>
                </div>

                <p className="mt-4 font-serif text-xl italic leading-relaxed text-[#1C1514]">
                  {order.giftNote
                    ? `“${order.giftNote}”`
                    : '“With timeless warmth from ZAVERA — crafted to be cherished across generations.”'}
                </p>

                <p className="mt-3 text-[11px] text-[#8C7E75]">
                  {order.giftNote
                    ? 'Hand-calligraphed on textured cotton-ivory card inside our champagne velvet presentation box.'
                    : 'Presented with a wax-sealed ivory keepsake card inside our champagne velvet box.'}
                </p>
              </div>
            </section>
          ) : null}
        </div>

        {/* Right: Itemized Totals & CTAs */}
        <div className="space-y-6 lg:col-span-5">
          <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-5 sm:p-6">
            <div className="border-b border-[#E5DDD0] pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
                Invoice Summary
              </p>
              <h3 className="mt-0.5 font-serif text-2xl font-medium text-[#1C1514]">
                Itemized Totals &amp; Savings
              </h3>
            </div>

            <div className="mt-4 space-y-2.5 text-xs text-[#5C504A]">
              <div className="flex items-center justify-between">
                <span>Subtotal (Incl. 3% GST)</span>
                <span className="font-medium text-[#1C1514] tabular-nums">
                  {formatINR(order.subtotalInr)}
                </span>
              </div>

              {order.solisBundleDiscountInr > 0 ? (
                <div className="flex items-center justify-between text-[#2E6B4E]">
                  <span>Solis Demi-Fine Buy 2 Save 15%</span>
                  <span className="font-semibold tabular-nums">
                    -{formatINR(order.solisBundleDiscountInr)}
                  </span>
                </div>
              ) : null}

              {order.promoDiscountInr > 0 ? (
                <div className="flex items-center justify-between text-[#2E6B4E]">
                  <span>
                    Promo Privilege {order.promoCode ? `(${order.promoCode})` : ''}
                  </span>
                  <span className="font-semibold tabular-nums">
                    -{formatINR(order.promoDiscountInr)}
                  </span>
                </div>
              ) : null}

              {order.giftBox ? (
                <div className="flex items-center justify-between">
                  <span>Luxury Velvet Gift Box &amp; Card</span>
                  <span className="font-medium text-[#2E6B4E]">
                    Complimentary
                  </span>
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <span>
                  {order.deliveryMethod === 'boutique_pickup'
                    ? 'Boutique Pickup Service'
                    : 'Sequel Insured Express Courier'}
                </span>
                <span className="font-medium text-[#2E6B4E]">Complimentary</span>
              </div>
            </div>

            {(order.solisBundleDiscountInr > 0 || order.promoDiscountInr > 0) ? (
              <div className="mt-4 flex items-center justify-between rounded-[2px] border border-[#2E6B4E]/30 bg-[#2E6B4E]/[0.06] px-3 py-2 text-xs text-[#2E6B4E]">
                <span className="font-medium">Total Client Savings</span>
                <span className="font-semibold tabular-nums">
                  {formatINR(
                    order.solisBundleDiscountInr + order.promoDiscountInr
                  )}
                </span>
              </div>
            ) : null}

            <div className="mt-4 flex items-baseline justify-between border-t border-[#E5DDD0] pt-4">
              <div>
                <span className="font-serif text-xl font-medium text-[#1C1514]">
                  Total Paid (Demo)
                </span>
                <p className="text-[10px] text-[#8C7E75]">
                  Zero real funds debited
                </p>
              </div>
              <span className="font-sans text-xl font-semibold text-[#1C1514] tabular-nums">
                {formatINR(order.totalInr)}
              </span>
            </div>

            {/* Required Primary CTAs */}
            <div className="mt-6 space-y-2.5 border-t border-[#E5DDD0] pt-5">
              <Link
                href="/collections"
                className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#1C1514] px-5 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
              >
                <span>Continue Exploring</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </Link>

              <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-[2px] border border-[#1C1514] bg-[#FFFFFF] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#1C1514] transition-colors hover:bg-[#F3ECE1]"
              >
                <Home className="h-3.5 w-3.5" strokeWidth={1.6} />
                <span>Return Home</span>
              </Link>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#5C504A] transition-colors hover:text-[#1C1514]"
                >
                  <Printer className="h-3.5 w-3.5 text-[#C69C4D]" />
                  <span>Print Receipt</span>
                </button>

                {isHistoricalView &&
                cartCount === 0 &&
                onExitHistoricalView ? (
                  <button
                    type="button"
                    onClick={onExitHistoricalView}
                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#AE8439] underline decoration-[#C69C4D]/60 underline-offset-4 hover:text-[#1C1514]"
                  >
                    Back to Empty Bag View
                  </button>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
