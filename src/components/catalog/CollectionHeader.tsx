'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import type { CollectionInfo } from '@/types/store';
import { COLLECTIONS } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/lib/pricing';
import { CertificationBadge } from '@/components/ui/CertificationBadge';
import { SafeProductImage } from '@/components/ui/SafeProductImage';

export interface CollectionHeaderProps {
  collection?: CollectionInfo;
  totalCollectionCount: number;
}

/**
 * Dynamic editorial header: renders either the bespoke collection campaign banner
 * (/collections/[slug]) or the full-house PIXTACY capsule header (/collections).
 */
export function CollectionHeader({
  collection,
  totalCollectionCount,
}: CollectionHeaderProps) {
  const { goldRates } = useStore();

  if (collection) {
    const isSolis = collection.slug === 'solis';

    return (
      <section className="border-b border-[#E5DDD0] bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
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
            <span className="font-medium text-[#1C1514]">{collection.name}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Editorial Copy */}
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <CertificationBadge
                  label={collection.tier}
                  variant={isSolis ? 'emerald' : 'gold'}
                  size="sm"
                />
                <span className="rounded-full border border-[#E5DDD0] bg-[#FFFFFF] px-2.5 py-1 text-[11px] font-medium tracking-[0.06em] text-[#5C504A]">
                  {collection.puritySummary}
                </span>
              </div>

              <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.24em] text-[#AE8439]">
                {collection.subtitle}
              </p>
              <h1 className="mt-1.5 font-serif text-4xl font-medium tracking-tight text-[#1C1514] sm:text-5xl">
                {collection.name}{' '}
                <span className="italic font-normal text-[#5C504A]">
                  Collection
                </span>
              </h1>
              <p className="mt-2 font-serif text-xl text-[#5C504A]">
                {collection.tagline}
              </p>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5C504A]">
                {collection.description}
              </p>

              <div className="mt-6 flex flex-col gap-2.5 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2.5">
                  {isSolis ? (
                    <Sparkles
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#C69C4D]"
                      strokeWidth={1.7}
                    />
                  ) : (
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#2E6B4E]"
                      strokeWidth={1.7}
                    />
                  )}
                  <p className="text-xs leading-relaxed text-[#1C1514]">
                    {collection.accentNote}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8C7E75] tabular-nums">
                  {totalCollectionCount} Pieces
                </span>
              </div>

              {/* House Switcher Pills */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-1 rounded-full border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#5C504A] transition-colors hover:border-[#1C1514] hover:text-[#1C1514]"
                >
                  <span>All Houses</span>
                </Link>
                {COLLECTIONS.map((col) => {
                  const isCurrent = col.slug === collection.slug;
                  return (
                    <Link
                      key={col.slug}
                      href={`/collections/${col.slug}`}
                      className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors ${
                        isCurrent
                          ? 'border-[#C69C4D] bg-[#1C1514] text-[#FAF7F2]'
                          : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#C69C4D] hover:text-[#1C1514]'
                      }`}
                    >
                      {col.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Collection Campaign Image Frame */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]">
                <SafeProductImage
                  src={collection.heroImage}
                  alt={`${collection.name} — ${collection.tagline}`}
                  categoryLabel={collection.tier}
                  priority
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1514]/35 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="rounded-[2px] border border-[#FAF7F2]/25 bg-[#1C1514]/75 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#FAF7F2] backdrop-blur-sm">
                    {collection.name} Atelier Edit
                  </span>
                  {!isSolis ? (
                    <span className="rounded-[2px] border border-[#FAF7F2]/25 bg-[#1C1514]/75 px-3 py-1 text-[10px] text-[#FAF7F2] tabular-nums backdrop-blur-sm">
                      Live 22KT {formatINR(goldRates['22KT'])}/g · 18KT{' '}
                      {formatINR(goldRates['18KT'])}/g
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full-house PIXTACY capsule header on /collections
  return (
    <section className="border-b border-[#E5DDD0] bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#8C7E75]"
        >
          <Link href="/" className="transition-colors hover:text-[#1C1514]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-[#1C1514]">All Collections</span>
        </nav>

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#AE8439]">
              The PIXTACY House Catalogue
            </p>
            <h1 className="mt-1.5 font-serif text-4xl font-medium tracking-tight text-[#1C1514] sm:text-5xl">
              Curated Fine &amp; Demi-Fine{' '}
              <span className="italic font-normal text-[#5C504A]">
                Creations
              </span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#5C504A]">
              Explore {totalCollectionCount} signature pieces spanning BIS 916
              heritage 22KT gold, IGI-certified EF-VVS lab-grown diamonds,
              everyday 18KT fine gold, and waterproof 18K vermeil stacks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-4 py-2.5">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8C7E75]">
                Live House Reference Rate
              </p>
              <p className="mt-0.5 text-xs font-semibold text-[#1C1514] tabular-nums">
                22KT {formatINR(goldRates['22KT'])}/g · 18KT{' '}
                {formatINR(goldRates['18KT'])}/g
              </p>
            </div>
          </div>
        </div>

        {/* 4 House Capsule Cards */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group flex items-center gap-3.5 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3 transition-colors hover:border-[#C69C4D]"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]">
                <SafeProductImage
                  src={col.heroImage}
                  alt={col.name}
                  categoryLabel={col.name}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-serif text-lg font-medium text-[#1C1514] group-hover:text-[#AE8439]">
                    {col.name}
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-[#8C7E75] transition-transform group-hover:translate-x-0.5 group-hover:text-[#C69C4D]"
                    strokeWidth={1.6}
                  />
                </div>
                <p className="truncate text-[11px] text-[#5C504A]">
                  {col.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
