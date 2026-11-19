import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import type { CollectionSlug, Product } from '@/types/store';

function getCuratedBestsellers(): Product[] {
  const allBestsellers = PRODUCTS.filter((p) => p.isBestseller);
  const collectionOrder: CollectionSlug[] = ['aarohi', 'noor', 'saanjh', 'solis'];
  const byCollection = new Map<CollectionSlug, Product[]>();

  for (const slug of collectionOrder) {
    byCollection.set(
      slug,
      allBestsellers.filter((p) => p.collection === slug)
    );
  }

  const balanced: Product[] = [];
  for (let round = 0; round < 3 && balanced.length < 8; round += 1) {
    for (const slug of collectionOrder) {
      const list = byCollection.get(slug) ?? [];
      if (list[round] && balanced.length < 8) {
        balanced.push(list[round]);
      }
    }
  }

  return balanced;
}

/**
 * Section 5: Bestsellers Showcase featuring 8 top-performing pieces across all
 * four ZAVERA houses with interactive metal swatches, wishlist, and Quick Add.
 */
export function BestsellersShowcase() {
  const bestsellers = getCuratedBestsellers();

  return (
    <section
      aria-labelledby="bestsellers-heading"
      className="border-b border-[#E5DDD0] bg-[#FAF7F2] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AE8439]">
              Most Coveted Pieces
            </p>
            <h2
              id="bestsellers-heading"
              className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#1C1514] sm:text-4xl lg:text-[42px]"
            >
              House Bestsellers
            </h2>
            <p className="mt-2 text-sm text-[#5C504A]">
              Live-priced against bullion rates with interactive finish previews
              and complimentary insured courier pan-India.
            </p>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514] underline decoration-[#C69C4D] underline-offset-4 transition-colors hover:text-[#AE8439]"
          >
            <span>View All 18 Pieces</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
