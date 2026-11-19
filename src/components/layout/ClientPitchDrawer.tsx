'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ExternalLink,
  Figma,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { FIGMA_PITCH_URL } from '@/lib/siteConfig';
import { formatINR } from '@/lib/pricing';
import { UX_BENCHMARKS, UX_DIRECTION_NOTES } from '@/data/uxBenchmarks';
import { SlideOverDrawer } from '@/components/ui/SlideOverDrawer';

const WALKTHROUGH_JUMPS = [
  {
    label: 'PDP Price Breakup',
    caption: 'Aarohi 22KT Choker · Live GST & Making Split',
    href: '/product/aarohi-temple-nakshi-choker',
  },
  {
    label: 'Multi-Facet Filters',
    caption: 'URL-synced PLP across purity, occasion & price',
    href: '/collections',
  },
  {
    label: 'Shop the Look',
    caption: 'Interactive hotspot lookbook scenes on Home',
    href: '/#shop-the-look',
  },
  {
    label: 'Demo Checkout',
    caption: 'Sequel courier, salon pickup & order confirmation',
    href: '/checkout',
  },
] as const;

/**
 * Subtle Pitch Mode floating toggle + drawer exposing live 22KT gold-rate
 * simulator, Figma deliverable link status, UX benchmarks, and walkthrough jumps.
 */
export function ClientPitchDrawer() {
  const {
    rate22K,
    goldRates,
    setRate22K,
    resetGoldRates,
    isPitchOpen,
    openPitchDrawer,
    closePitchDrawer,
  } = useStore();

  const [customFigmaUrl, setCustomFigmaUrl] = useState(FIGMA_PITCH_URL);
  const [editingFigma, setEditingFigma] = useState(false);

  const activeFigmaUrl = customFigmaUrl.trim();
  const hasFigmaUrl = activeFigmaUrl.length > 0;

  return (
    <>
      {!isPitchOpen ? (
        <button
          type="button"
          onClick={openPitchDrawer}
          aria-label="Open Client Pitch Console"
          className="fixed bottom-20 right-4 md:bottom-5 md:right-5 z-40 inline-flex items-center gap-2 rounded-full border border-[#C69C4D]/60 bg-[#1C1514]/95 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#FAF7F2] shadow-lg backdrop-blur-sm transition-colors hover:border-[#C69C4D] hover:bg-[#1C1514]"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#C69C4D]"
            aria-hidden="true"
          />
          <span>Pitch Mode</span>
        </button>
      ) : null}

      <SlideOverDrawer
        open={isPitchOpen}
        onClose={closePitchDrawer}
        title="Client Pitch Console"
        subtitle="Live rate simulator, Figma link & UX benchmarks"
        badge="Demo"
        maxWidthClass="max-w-lg"
      >
        <div className="space-y-6">
          {/* 1. Live 22KT Gold Rate Simulator */}
          <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514]">
                  <SlidersHorizontal
                    className="h-3.5 w-3.5 text-[#C69C4D]"
                    strokeWidth={1.7}
                  />
                  <span>Live 22KT Gold Rate Simulator</span>
                </h3>
                <p className="mt-1 text-xs text-[#5C504A]">
                  Slide to reprice every SKU, Search result, PDP Breakup, and
                  Bag total in real time.
                </p>
              </div>
              <button
                type="button"
                onClick={resetGoldRates}
                className="inline-flex shrink-0 items-center gap-1 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-2.5 py-1 text-[11px] font-medium text-[#5C504A] transition-colors hover:border-[#1C1514] hover:text-[#1C1514]"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#8C7E75]">Simulated 22KT Rate</span>
                <span className="font-serif text-2xl font-semibold text-[#1C1514] tabular-nums">
                  {formatINR(rate22K)}
                  <span className="font-sans text-xs font-normal text-[#8C7E75]">
                    /gram
                  </span>
                </span>
              </div>

              <input
                type="range"
                min={6500}
                max={8200}
                step={5}
                value={rate22K}
                onChange={(e) => setRate22K(Number(e.target.value))}
                aria-label="Simulate 22KT gold rate per gram"
                className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#E5DDD0] accent-[#C69C4D]"
              />

              <div className="mt-1 flex justify-between text-[10px] text-[#8C7E75] tabular-nums">
                <span>₹6,500/g</span>
                <span>Default ₹7,195/g</span>
                <span>₹8,200/g</span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#E5DDD0] pt-3 text-center">
                <div className="rounded-[2px] bg-[#FAF7F2] p-2">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-[#8C7E75]">
                    24KT
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#1C1514] tabular-nums">
                    {formatINR(goldRates['24KT'])}/g
                  </p>
                </div>
                <div className="rounded-[2px] bg-[#FAF7F2] p-2">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-[#8C7E75]">
                    18KT
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#1C1514] tabular-nums">
                    {formatINR(goldRates['18KT'])}/g
                  </p>
                </div>
                <div className="rounded-[2px] bg-[#FAF7F2] p-2">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-[#8C7E75]">
                    14KT
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#1C1514] tabular-nums">
                    {formatINR(goldRates['14KT'])}/g
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Editable Figma Deliverable Link */}
          <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514]">
                <Figma className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.7} />
                <span>Figma Design Deliverable</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingFigma((prev) => !prev)}
                className="text-[11px] font-medium text-[#5C504A] underline underline-offset-4 hover:text-[#1C1514]"
              >
                {editingFigma ? 'Done' : 'Edit Link'}
              </button>
            </div>

            {editingFigma ? (
              <div className="mt-3 space-y-2">
                <input
                  type="url"
                  value={customFigmaUrl}
                  onChange={(e) => setCustomFigmaUrl(e.target.value)}
                  placeholder="https://www.figma.com/design/..."
                  aria-label="Figma Deliverable URL"
                  className="w-full rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-2 text-xs text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                />
                <p className="text-[10px] text-[#8C7E75]">
                  Reads <code className="text-[#5C504A]">FIGMA_PITCH_URL</code>{' '}
                  from <code className="text-[#5C504A]">src/lib/siteConfig.ts</code>
                  .
                </p>
              </div>
            ) : null}

            <div className="mt-3">
              {hasFigmaUrl ? (
                <a
                  href={activeFigmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#1C1514] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
                >
                  <span>Open Figma Prototype</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <div className="flex items-center justify-between gap-2 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C69C4D]/45 bg-[#F3ECE1] px-2.5 py-0.5 text-[11px] font-medium text-[#8A6623]">
                    Figma Sync Pending
                  </span>
                  <span className="text-[11px] text-[#8C7E75]">
                    Set FIGMA_PITCH_URL when ready
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* 3. One-Click Walkthrough Jumps */}
          <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-4">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514]">
              <Compass
                className="h-3.5 w-3.5 text-[#C69C4D]"
                strokeWidth={1.7}
              />
              <span>One-Click Walkthrough Jumps</span>
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {WALKTHROUGH_JUMPS.map((jump) => (
                <Link
                  key={jump.href}
                  href={jump.href}
                  onClick={closePitchDrawer}
                  className="group rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-3 transition-colors hover:border-[#C69C4D] hover:bg-[#FFFFFF]"
                >
                  <p className="text-xs font-semibold text-[#1C1514] group-hover:text-[#AE8439]">
                    {jump.label} →
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#5C504A]">
                    {jump.caption}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* 4. UX Architecture Benchmarks */}
          <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-4">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514]">
              <Sparkles
                className="h-3.5 w-3.5 text-[#C69C4D]"
                strokeWidth={1.7}
              />
              <span>UX Architecture Benchmarks (Tanishq · GIVA · Palmonas)</span>
            </h3>

            <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-[#5C504A]">
              <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                  PLP Direction
                </p>
                <p className="mt-1">{UX_DIRECTION_NOTES.plpSummary}</p>
              </div>
              <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                  PDP Direction
                </p>
                <p className="mt-1">{UX_DIRECTION_NOTES.pdpSummary}</p>
              </div>
            </div>

            <div className="mt-3 space-y-2.5">
              {UX_BENCHMARKS.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2]/60 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-[#E5DDD0] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1C1514]">
                        {item.screenType}
                      </span>
                      <span className="font-serif text-base font-medium text-[#1C1514]">
                        {item.appName}
                      </span>
                    </div>
                    <a
                      href={item.mobbinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#AE8439] hover:underline"
                    >
                      <span>Reference</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#5C504A]">
                    {item.patternSummary}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#1C1514]">
                    <span className="font-semibold text-[#AE8439]">
                      ZAVERA:{' '}
                    </span>
                    {item.zaveraApplication}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </SlideOverDrawer>
    </>
  );
}
