'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  ReceiptText,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import type { DemoOrder } from '@/types/store';
import { formatINR } from '@/lib/pricing';
import { formatOrderTimestamp } from '@/components/checkout/checkoutTypes';

export interface EmptyCheckoutStateProps {
  latestOrder: DemoOrder | null;
  ordersCount: number;
  onViewLatestOrder: (order: DemoOrder) => void;
}

/**
 * Elegant empty-bag state linking back to ZAVERA collections, with a one-click
 * card to view the latest saved localStorage demo order receipt when present.
 */
export function EmptyCheckoutState({
  latestOrder,
  ordersCount,
  onViewLatestOrder,
}: EmptyCheckoutStateProps) {
  const latestOrderItemCount = latestOrder
    ? latestOrder.items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-4 sm:py-8">
      {/* Main Empty Bag Editorial Card */}
      <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-6 py-12 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#E5DDD0] bg-[#FAF7F2] text-[#8C7E75]">
          <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C69C4D]">
          ZAVERA Bag · Empty
        </p>
        <h2 className="mt-1.5 font-serif text-3xl font-medium text-[#1C1514] sm:text-4xl">
          Your Bag Awaits Its First Piece
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#5C504A]">
          Explore 22KT BIS-hallmarked heritage pieces, IGI-certified lab-grown
          solitaires, or pair any two waterproof Solis pieces for an automatic
          15% stack saving.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#1C1514] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
          >
            <span>Explore Collections</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>

          <Link
            href="/collections/solis"
            className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-[#C69C4D] bg-[#FFFFFF] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#1C1514] transition-colors hover:bg-[#F3ECE1]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#AE8439]" />
            <span>Shop Solis Buy 2 Save 15%</span>
          </Link>
        </div>
      </section>

      {/* One-Click Latest Demo Order Receipt Card (if orders exist in localStorage) */}
      {latestOrder ? (
        <section
          aria-label="Latest Saved Demo Order"
          className="rounded-[2px] border border-[#C69C4D]/50 bg-[#F3ECE1] p-5 sm:p-6"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C69C4D] bg-[#FFFFFF] text-[#AE8439]">
                <ReceiptText className="h-4 w-4" strokeWidth={1.6} />
              </span>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#AE8439]">
                    Recent Client Demo Order
                  </p>
                  {ordersCount > 1 ? (
                    <span className="rounded-full border border-[#E5DDD0] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-medium text-[#5C504A] tabular-nums">
                      {ordersCount} saved receipts
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-0.5 font-serif text-xl font-medium text-[#1C1514]">
                  Receipt{' '}
                  <span className="tabular-nums">{latestOrder.orderId}</span>
                </h3>

                <p className="mt-1 text-xs text-[#5C504A] tabular-nums">
                  {formatOrderTimestamp(latestOrder.createdAt)} ·{' '}
                  {latestOrderItemCount}{' '}
                  {latestOrderItemCount === 1 ? 'piece' : 'pieces'} ·{' '}
                  <span className="font-semibold text-[#1C1514]">
                    {formatINR(latestOrder.totalInr)}
                  </span>
                </p>

                <p className="mt-0.5 text-[11px] text-[#8C7E75]">
                  {latestOrder.deliveryMethod === 'boutique_pickup' &&
                  latestOrder.boutiqueName
                    ? `Boutique Pickup · ${latestOrder.boutiqueName}`
                    : `Express Insured Courier · ${latestOrder.shippingAddress.city}`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onViewLatestOrder(latestOrder)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[2px] border border-[#1C1514] bg-[#1C1514] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:border-[#AE8439] hover:bg-[#AE8439]"
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="tabular-nums">
                View Latest Receipt ({latestOrder.orderId})
              </span>
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
