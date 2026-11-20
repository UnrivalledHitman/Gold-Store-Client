import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '@/data/products';
import { SafeProductImage } from '@/components/ui/SafeProductImage';

/**
 * Section 4: 4-Collection Editorial Grid showcasing Aarohi, Noor, Saanjh, and Solis.
 */
export function CollectionEditorialGrid() {
  return (
    <section
      aria-labelledby="collections-grid-heading"
      className="border-b border-[#E5DDD0] bg-[#F3ECE1]/55 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AE8439]">
              The Four PIXTACY Capsules
            </p>
            <h2
              id="collections-grid-heading"
              className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#1C1514] sm:text-4xl lg:text-[42px]"
            >
              From Ceremonial 22KT to Waterproof Vermeil
            </h2>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-2 rounded-[2px] border border-[#1C1514] bg-[#FFFFFF] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1C1514] transition-colors hover:bg-[#1C1514] hover:text-[#FAF7F2]"
          >
            <span>Compare All Houses</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {COLLECTIONS.map((collection) => {
            const skuCount = PRODUCTS.filter(
              (p) => p.collection === collection.slug
            ).length;

            return (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group flex flex-col overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] transition-colors hover:border-[#C69C4D]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden border-b border-[#E5DDD0] bg-[#F3ECE1]">
                  <SafeProductImage
                    src={collection.heroImage}
                    alt={`${collection.name} — ${collection.tagline}`}
                    categoryLabel={collection.tier}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="pointer-events-none absolute left-3 top-3">
                    <span className="inline-flex items-center rounded-full border border-[#E5DDD0] bg-[#FAF7F2]/95 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#1C1514] backdrop-blur-[2px]">
                      {collection.tier}
                    </span>
                  </div>

                  {collection.slug === 'solis' ? (
                    <div className="pointer-events-none absolute bottom-3 left-3">
                      <span className="inline-flex items-center rounded-full border border-[#C69C4D]/50 bg-[#1C1514]/90 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#E5C77A]">
                        Buy 2 · Save 15%
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#AE8439]">
                      {collection.subtitle}
                    </p>
                    <h3 className="mt-1 font-serif text-[26px] font-medium leading-tight text-[#1C1514] transition-colors group-hover:text-[#AE8439]">
                      {collection.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#5C504A]">
                      {collection.tagline}
                    </p>
                    <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#8C7E75]">
                      {collection.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-[#E5DDD0] pt-3.5">
                    <p className="text-[11px] font-medium text-[#5C504A]">
                      {collection.puritySummary}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1C1514] group-hover:text-[#AE8439]">
                      <span>Explore {collection.name}</span>
                      <span className="inline-flex items-center gap-1.5 tabular-nums text-[#8C7E75] group-hover:text-[#AE8439]">
                        <span>{skuCount} SKUs</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          strokeWidth={1.75}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
