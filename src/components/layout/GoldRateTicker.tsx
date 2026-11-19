'use client';

import React from 'react';
import { ShieldCheck, Truck, Video } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/lib/pricing';

/**
 * Top bar displaying live 22KT & 18KT rates synced to StoreContext,
 * hallmark/delivery assurances, and Video Consultation trigger.
 */
export function GoldRateTicker() {
  const { goldRates, openBookingModal } = useStore();

  return (
    <div className="border-b border-[#FAF7F2]/10 bg-[#1C1514] text-[#FAF7F2]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1.5 px-4 py-2 text-[11px] sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-1.5 font-medium uppercase tracking-[0.12em] text-[#C69C4D]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#C69C4D]"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Live Gold Rate</span>
            <span className="sm:hidden">Rates</span>
          </span>

          <div className="flex items-center gap-2.5 text-[#FAF7F2]/90 tabular-nums">
            <span>
              22KT{' '}
              <strong className="font-semibold text-[#FAF7F2]">
                {formatINR(goldRates['22KT'])}/g
              </strong>
            </span>
            <span className="text-[#FAF7F2]/30" aria-hidden="true">
              ·
            </span>
            <span>
              18KT{' '}
              <strong className="font-semibold text-[#FAF7F2]">
                {formatINR(goldRates['18KT'])}/g
              </strong>
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-4 text-[#FAF7F2]/80 xl:flex">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck
              className="h-3.5 w-3.5 text-[#C69C4D]"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <span>BIS 916 Hallmarked</span>
          </span>
          <span className="text-[#FAF7F2]/30" aria-hidden="true">
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Truck
              className="h-3.5 w-3.5 text-[#C69C4D]"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <span>Complimentary Insured Pan-India Delivery</span>
          </span>
        </div>

        <button
          type="button"
          onClick={openBookingModal}
          className="inline-flex items-center gap-1.5 font-medium tracking-[0.06em] text-[#C69C4D] transition-colors hover:text-[#FAF7F2]"
        >
          <Video className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          <span className="underline decoration-[#C69C4D]/50 underline-offset-4">
            Book Video Consultation
          </span>
        </button>
      </div>
    </div>
  );
}
