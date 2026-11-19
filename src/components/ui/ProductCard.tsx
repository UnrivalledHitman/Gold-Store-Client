'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Plus } from 'lucide-react';
import type { MetalFinish, Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { calculateProductPrice, formatINR } from '@/lib/pricing';
import { CertificationBadge } from '@/components/ui/CertificationBadge';
import { SafeProductImage } from '@/components/ui/SafeProductImage';
import { METAL_SWATCH_STYLES } from '@/components/ui/metalStyles';

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

/**
 * Editorial 4:5 luxury jewellery card with interactive metal swatches,
 * wishlist toggle, live gold-rate pricing, and one-click Quick Add.
 */
export function ProductCard({
  product,
  priority = false,
  className = '',
}: ProductCardProps) {
  const { mounted, goldRates, addToCart, toggleWishlist, isInWishlist } =
    useStore();

  const [selectedMetal, setSelectedMetal] = useState<MetalFinish>(
    product.metalVariants[0]
  );

  const primaryPurity = product.purityOptions[0];
  const priceBreakup = calculateProductPrice(product, primaryPurity, goldRates);
  const wishlisted = mounted ? isInWishlist(product.id) : false;
  const primaryCertification = product.certifications[0];

  const handleQuickAdd = () => {
    addToCart(product, {
      selectedMetal,
      selectedPurity: primaryPurity,
    });
  };

  return (
    <article
      className={`group flex flex-col rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] transition-colors hover:border-[#C69C4D]/70 ${className}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[2px] border-b border-[#E5DDD0] bg-[#F3ECE1]">
        <Link
          href={`/product/${product.slug}`}
          className="block h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <SafeProductImage
            src={product.images[0]}
            alt={product.name}
            categoryLabel={product.category}
            priority={priority}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Link>

        {primaryCertification ? (
          <div className="pointer-events-none absolute left-2.5 top-2.5 max-w-[calc(100%-3.75rem)]">
            <CertificationBadge
              label={primaryCertification}
              size="xs"
              className="max-w-full"
            />
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          aria-pressed={wishlisted}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5DDD0] bg-[#FAF7F2]/90 text-[#1C1514] backdrop-blur-[2px] transition-colors hover:border-[#C69C4D] hover:bg-[#FFFFFF]"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${
              wishlisted
                ? 'fill-[#7A1E2C] text-[#7A1E2C]'
                : 'text-[#1C1514]'
            }`}
            strokeWidth={1.6}
          />
        </button>

        {product.collection === 'solis' ? (
          <div className="pointer-events-none absolute bottom-2.5 left-2.5">
            <span className="inline-flex items-center rounded-full border border-[#C69C4D]/45 bg-[#FAF7F2]/95 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#8A6623] backdrop-blur-[2px]">
              Buy 2 · Save 15%
            </span>
          </div>
        ) : !product.inStock ? (
          <div className="pointer-events-none absolute bottom-2.5 left-2.5">
            <span className="inline-flex items-center rounded-full border border-[#E5DDD0] bg-[#FAF7F2]/95 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#5C504A] backdrop-blur-[2px]">
              Made to Order · {product.dispatchDays}d
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8C7E75]">
            {product.tier} · {primaryPurity}
          </p>

          <Link href={`/product/${product.slug}`} className="mt-1 block">
            <h3 className="line-clamp-1 font-serif text-[19px] font-medium leading-snug text-[#1C1514] transition-colors group-hover:text-[#AE8439]">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2.5 flex items-center gap-2">
            <div
              className="flex items-center gap-1.5"
              role="group"
              aria-label={`Select metal finish for ${product.name}`}
            >
              {product.metalVariants.map((finish) => {
                const style = METAL_SWATCH_STYLES[finish];
                const isActive = selectedMetal === finish;
                return (
                  <button
                    key={finish}
                    type="button"
                    onClick={() => setSelectedMetal(finish)}
                    aria-label={`${finish} finish`}
                    aria-pressed={isActive}
                    title={finish}
                    style={{
                      background: style.background,
                      borderColor: style.borderColor,
                    }}
                    className={`h-3.5 w-3.5 rounded-full border transition-transform ${
                      isActive
                        ? 'scale-110 ring-1 ring-[#1C1514] ring-offset-2 ring-offset-[#FFFFFF]'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>
            <span className="truncate text-[11px] text-[#5C504A]">
              {selectedMetal}
            </span>
          </div>
        </div>

        <div className="mt-3.5 border-t border-[#E5DDD0] pt-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-sans text-[15px] font-semibold text-[#1C1514] tabular-nums">
              {formatINR(priceBreakup.finalPrice)}
            </span>
            <span className="text-[10px] text-[#8C7E75]">
              {priceBreakup.isFixedDemiFine
                ? 'Incl. 3% GST'
                : `${product.weightGrams}g · Incl. GST`}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-[2px] border border-[#1C1514] bg-[#FAF7F2] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1C1514] transition-colors hover:bg-[#1C1514] hover:text-[#FAF7F2]"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
