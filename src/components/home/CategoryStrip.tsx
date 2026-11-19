import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { SafeProductImage } from '@/components/ui/SafeProductImage';
import type { ProductCategory } from '@/types/store';

interface CategoryCardConfig {
  label: string;
  eyebrow: string;
  href: string;
  image: string;
  category?: ProductCategory;
  isGifting?: boolean;
}

const CATEGORY_CARDS: CategoryCardConfig[] = [
  {
    label: 'Rings',
    eyebrow: 'Solitaires & Signets',
    href: '/collections?category=Rings',
    image: '/images/products/zav-noo-01.png',
    category: 'Rings',
  },
  {
    label: 'Necklaces',
    eyebrow: 'Chokers & Chains',
    href: '/collections?category=Necklaces',
    image: '/images/products/zav-aar-01.png',
    category: 'Necklaces',
  },
  {
    label: 'Earrings',
    eyebrow: 'Jhumkas & Huggies',
    href: '/collections?category=Earrings',
    image: '/images/products/zav-aar-02.png',
    category: 'Earrings',
  },
  {
    label: 'Bracelets & Bangles',
    eyebrow: 'Kadas & Tennis Links',
    href: '/collections?category=Bracelets+%26+Bangles',
    image: '/images/products/zav-aar-03.png',
    category: 'Bracelets & Bangles',
  },
  {
    label: 'Mangalsutra',
    eyebrow: 'Modern Vati & Onyx',
    href: '/collections?category=Mangalsutra',
    image: '/images/products/zav-aar-04.png',
    category: 'Mangalsutra',
  },
  {
    label: 'Gifting',
    eyebrow: 'Signature Vault Box',
    href: '/collections?occasion=Gifting',
    image: '/images/collections/noor.png',
    isGifting: true,
  },
];

function getCategoryCount(config: CategoryCardConfig): number {
  if (config.isGifting) {
    return PRODUCTS.filter((p) => p.occasions.includes('Gifting')).length;
  }
  if (config.category) {
    return PRODUCTS.filter((p) => p.category === config.category).length;
  }
  return PRODUCTS.length;
}

/**
 * Section 3: Visual Category Strip linking directly to filtered PLP views.
 */
export function CategoryStrip() {
  return (
    <section
      aria-labelledby="category-strip-heading"
      className="border-b border-[#E5DDD0] bg-[#FAF7F2] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AE8439]">
              Shop by Silhouette
            </p>
            <h2
              id="category-strip-heading"
              className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#1C1514] sm:text-4xl"
            >
              Crafted for Every Gesture
            </h2>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[#5C504A] underline decoration-[#C69C4D]/50 underline-offset-4 transition-colors hover:text-[#1C1514]"
          >
            <span>Browse Full Catalogue</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {CATEGORY_CARDS.map((item) => {
            const count = getCategoryCount(item);
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] transition-colors hover:border-[#C69C4D]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[2px] border-b border-[#E5DDD0] bg-[#F3ECE1]">
                  <SafeProductImage
                    src={item.image}
                    alt={`${item.label} jewellery collection`}
                    categoryLabel={item.label}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#8C7E75]">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-0.5 font-serif text-lg font-medium leading-tight text-[#1C1514] transition-colors group-hover:text-[#AE8439]">
                      {item.label}
                    </h3>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between border-t border-[#E5DDD0]/80 pt-2 text-[11px] text-[#5C504A]">
                    <span className="tabular-nums">{count} pieces</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-[#8C7E75] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#AE8439]"
                      strokeWidth={1.6}
                    />
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
