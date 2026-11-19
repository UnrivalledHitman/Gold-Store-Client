'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import type { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { getProductById } from '@/data/products';
import { calculateProductPrice, formatINR } from '@/lib/pricing';
import { SlideOverDrawer } from '@/components/ui/SlideOverDrawer';
import { SafeProductImage } from '@/components/ui/SafeProductImage';

/**
 * Slide-over Wishlist vault showing saved pieces with live INR pricing,
 * Move to Bag, and Remove controls.
 */
export function WishlistDrawer() {
  const {
    mounted,
    wishlist,
    isWishlistOpen,
    closeWishlist,
    goldRates,
    toggleWishlist,
    addToCart,
  } = useStore();

  const savedProducts: Product[] = mounted
    ? wishlist
        .map((id) => getProductById(id))
        .filter((p): p is Product => Boolean(p))
    : [];

  const handleMoveToBag = (product: Product) => {
    toggleWishlist(product.id);
    addToCart(product, {
      selectedMetal: product.metalVariants[0],
      selectedPurity: product.purityOptions[0],
      openDrawer: true,
    });
  };

  return (
    <SlideOverDrawer
      open={isWishlistOpen}
      onClose={closeWishlist}
      title="Saved Vault"
      subtitle="Pieces curated for your personal collection"
      badge={mounted ? `${savedProducts.length}` : '0'}
      footer={
        savedProducts.length > 0 ? (
          <Link
            href="/collections"
            onClick={closeWishlist}
            className="flex w-full items-center justify-center rounded-[2px] border border-[#1C1514] bg-[#FAF7F2] px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#1C1514] transition-colors hover:bg-[#1C1514] hover:text-[#FAF7F2]"
          >
            Continue Exploring Catalogue
          </Link>
        ) : undefined
      }
    >
      {savedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5DDD0] bg-[#FFFFFF] text-[#8C7E75]">
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <h3 className="mt-4 font-serif text-2xl font-medium text-[#1C1514]">
            Your Saved Vault is Empty
          </h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#5C504A]">
            Tap the heart icon on any 22KT heirloom, lab-grown solitaire, or
            waterproof vermeil staple to save it here.
          </p>
          <Link
            href="/collections"
            onClick={closeWishlist}
            className="mt-6 inline-flex items-center justify-center rounded-[2px] bg-[#1C1514] px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedProducts.map((product) => {
            const breakup = calculateProductPrice(
              product,
              product.purityOptions[0],
              goldRates
            );
            return (
              <div
                key={product.id}
                className="flex gap-3.5 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3"
              >
                <Link
                  href={`/product/${product.slug}`}
                  onClick={closeWishlist}
                  className="aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]"
                >
                  <SafeProductImage
                    src={product.images[0]}
                    alt={product.name}
                    categoryLabel={product.category}
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#8C7E75]">
                      {product.tier} · {product.purityOptions[0]}
                    </p>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeWishlist}
                      className="mt-0.5 block truncate font-serif text-lg font-medium text-[#1C1514] hover:text-[#AE8439]"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm font-semibold text-[#1C1514] tabular-nums">
                      {formatINR(breakup.finalPrice)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleMoveToBag(product)}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-[2px] bg-[#1C1514] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="inline-flex items-center justify-center gap-1 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-2.5 py-2 text-[11px] font-medium text-[#5C504A] transition-colors hover:border-[#7A1E2C] hover:text-[#7A1E2C]"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.6} />
                      <span className="sr-only sm:not-sr-only">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SlideOverDrawer>
  );
}
