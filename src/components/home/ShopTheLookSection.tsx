'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { LOOKBOOK_SCENES, getProductById } from '@/data/products';
import { calculateProductPrice, formatINR } from '@/lib/pricing';
import { useStore } from '@/context/StoreContext';
import { SafeProductImage } from '@/components/ui/SafeProductImage';
import type { LookbookHotspot, Product } from '@/types/store';

interface ResolvedHotspot {
  hotspot: LookbookHotspot;
  product: Product;
  livePrice: number;
}

function getPopoverPositionClasses(xPct: number, yPct: number): string {
  const horizontal = xPct > 55 ? 'sm:right-4 sm:left-auto' : 'sm:left-4 sm:right-auto';
  const vertical = yPct > 58 ? 'sm:bottom-4 sm:top-auto' : 'sm:top-4 sm:bottom-auto';
  return `inset-x-3 bottom-3 sm:inset-x-auto sm:w-80 ${horizontal} ${vertical}`;
}

/**
 * Section 7: Palmonas-inspired "Shop the Look" Interactive Hotspot Lookbook
 * with calibrated jewel pins, live inline popover, and side piece selector.
 */
export function ShopTheLookSection() {
  const { goldRates, addToCart } = useStore();
  const [activeSceneId, setActiveSceneId] = useState<string>(LOOKBOOK_SCENES[0].id);
  const [openHotspotId, setOpenHotspotId] = useState<string | null>(null);

  const activeScene =
    LOOKBOOK_SCENES.find((s) => s.id === activeSceneId) ?? LOOKBOOK_SCENES[0];

  const resolvedItems = useMemo<ResolvedHotspot[]>(() => {
    const items: ResolvedHotspot[] = [];
    for (const hotspot of activeScene.hotspots) {
      const product = getProductById(hotspot.productId);
      if (!product) continue;
      const livePrice = calculateProductPrice(
        product,
        product.purityOptions[0],
        goldRates
      ).finalPrice;
      items.push({ hotspot, product, livePrice });
    }
    return items;
  }, [activeScene, goldRates]);

  const activePopoverItem =
    resolvedItems.find((entry) => entry.hotspot.id === openHotspotId) ?? null;

  const combinedLookTotal = resolvedItems.reduce(
    (sum, entry) => sum + entry.livePrice,
    0
  );

  const handleSceneChange = (sceneId: string) => {
    setActiveSceneId(sceneId);
    setOpenHotspotId(null);
  };

  const handleAddSingle = (product: Product) => {
    addToCart(product, {
      selectedMetal: product.metalVariants[0],
      selectedPurity: product.purityOptions[0],
    });
  };

  const handleAddCompleteLook = () => {
    resolvedItems.forEach((entry, index) => {
      addToCart(entry.product, {
        selectedMetal: entry.product.metalVariants[0],
        selectedPurity: entry.product.purityOptions[0],
        openDrawer: index === resolvedItems.length - 1,
      });
    });
  };

  return (
    <section
      id="shop-the-look"
      aria-labelledby="shop-the-look-heading"
      className="scroll-mt-24 border-b border-[#E5DDD0] bg-[#FAF7F2] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Scene Switcher */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AE8439]">
              Interactive Editorial Lookbook
            </p>
            <h2
              id="shop-the-look-heading"
              className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#1C1514] sm:text-4xl lg:text-[42px]"
            >
              Shop the Look
            </h2>
            <p className="mt-2 text-sm text-[#5C504A]">
              Tap any pulsing gold pin directly on the portrait—or select from
              the styled breakdown beside it—to inspect live pricing and add to
              your bag.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Lookbook scenes"
            className="flex flex-wrap items-center gap-2"
          >
            {LOOKBOOK_SCENES.map((scene) => {
              const isSelected = scene.id === activeScene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSceneChange(scene.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium tracking-[0.04em] transition-colors ${
                    isSelected
                      ? 'border-[#1C1514] bg-[#1C1514] text-[#FAF7F2]'
                      : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#C69C4D] hover:text-[#1C1514]'
                  }`}
                >
                  {scene.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lookbook Frame + Styled Breakdown Split */}
        <div className="mt-9 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: Interactive Hotspot Canvas */}
          <div className="min-w-0 lg:col-span-6">
            <div className="relative w-full overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]">
              <img
                src={activeScene.image}
                alt={`${activeScene.title} — ${activeScene.subtitle}`}
                className="block h-auto w-full select-none"
              />

              {/* Subtle top badge */}
              <div className="pointer-events-none absolute left-3 top-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5DDD0] bg-[#FAF7F2]/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1C1514] backdrop-blur-[2px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C69C4D]" aria-hidden="true" />
                  <span>{resolvedItems.length} Styled Pieces</span>
                </span>
              </div>

              {/* Calibrated Pulsing Hotspot Pins */}
              {resolvedItems.map((entry, idx) => {
                const isOpen = openHotspotId === entry.hotspot.id;
                return (
                  <div
                    key={entry.hotspot.id}
                    style={{
                      left: `${entry.hotspot.xPct}%`,
                      top: `${entry.hotspot.yPct}%`,
                    }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -m-1.5 animate-ping rounded-full bg-[#C69C4D]/55"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setOpenHotspotId((prev) =>
                          prev === entry.hotspot.id ? null : entry.hotspot.id
                        )
                      }
                      aria-label={`Inspect ${entry.product.name}`}
                      aria-expanded={isOpen}
                      title={entry.hotspot.label}
                      className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#FAF7F2] text-[11px] font-semibold shadow-lg transition-transform ${
                        isOpen
                          ? 'scale-110 bg-[#1C1514] text-[#FAF7F2] ring-4 ring-[#C69C4D]/50'
                          : 'bg-[#C69C4D] text-[#1C1514] hover:scale-110 hover:bg-[#AE8439]'
                      }`}
                    >
                      <span className="tabular-nums">{idx + 1}</span>
                    </button>
                  </div>
                );
              })}

              {/* Inline Luxury Product Popover */}
              {activePopoverItem ? (
                <div
                  role="dialog"
                  aria-label={activePopoverItem.product.name}
                  className={`absolute z-20 rounded-[2px] border border-[#C69C4D]/60 bg-[#FAF7F2]/98 p-3.5 shadow-2xl backdrop-blur-md ${getPopoverPositionClasses(
                    activePopoverItem.hotspot.xPct,
                    activePopoverItem.hotspot.yPct
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    <Link
                      href={`/product/${activePopoverItem.product.slug}`}
                      className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]"
                    >
                      <SafeProductImage
                        src={activePopoverItem.product.images[0]}
                        alt={activePopoverItem.product.name}
                        categoryLabel={activePopoverItem.product.category}
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#AE8439]">
                          {activePopoverItem.product.tier}
                        </p>
                        <button
                          type="button"
                          onClick={() => setOpenHotspotId(null)}
                          aria-label="Close piece preview"
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] text-[#5C504A] hover:border-[#1C1514] hover:text-[#1C1514]"
                        >
                          <X className="h-3.5 w-3.5" strokeWidth={1.6} />
                        </button>
                      </div>

                      <Link
                        href={`/product/${activePopoverItem.product.slug}`}
                        className="mt-0.5 block font-serif text-lg font-medium leading-snug text-[#1C1514] hover:text-[#AE8439]"
                      >
                        {activePopoverItem.product.name}
                      </Link>

                      <p className="mt-1 text-sm font-semibold text-[#1C1514] tabular-nums">
                        {formatINR(activePopoverItem.livePrice)}
                        <span className="ml-1.5 text-[10px] font-normal text-[#8C7E75]">
                          {activePopoverItem.product.purityOptions[0]}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#E5DDD0] pt-2.5">
                    <Link
                      href={`/product/${activePopoverItem.product.slug}`}
                      className="inline-flex items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1C1514] transition-colors hover:border-[#1C1514]"
                    >
                      View Piece
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleAddSingle(activePopoverItem.product)}
                      className="inline-flex items-center justify-center gap-1 rounded-[2px] bg-[#1C1514] px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
                    >
                      <Plus className="h-3 w-3" strokeWidth={1.8} />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: Editorial Narrative + Styled Pieces Breakdown */}
          <div className="flex min-w-0 flex-col justify-between lg:col-span-6">
            <div className="border-b border-[#E5DDD0] pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AE8439]">
                  {activeScene.subtitle}
                </p>
                <Link
                  href={`/collections/${activeScene.collection}`}
                  className="shrink-0 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.12em] text-[#5C504A] underline decoration-[#C69C4D]/60 underline-offset-4 hover:text-[#1C1514]"
                >
                  Explore House →
                </Link>
              </div>
              <h3 className="mt-1.5 font-serif text-2xl font-medium text-[#1C1514] sm:text-3xl">
                {activeScene.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C504A]">
                {activeScene.description}
              </p>

              {activeScene.collection === 'solis' ? (
                <div className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#2E6B4E]/30 bg-[#FFFFFF] px-3 py-1 text-[11px] font-medium text-[#2E6B4E]">
                  <Sparkles className="h-3 w-3 shrink-0" strokeWidth={1.7} />
                  <span>
                    Includes Solis pieces — automatic 15% savings when 2+ Solis
                    pieces are in Bag
                  </span>
                </div>
              ) : null}
            </div>

            {/* Clickable Side List of Styled Pieces */}
            <div className="mt-5 min-w-0 space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C7E75]">
                Styled Pieces in This Edit
              </p>

              {resolvedItems.map((entry, idx) => {
                const isSelected = openHotspotId === entry.hotspot.id;
                return (
                  <div
                    key={entry.hotspot.id}
                    className={`flex min-w-0 flex-col gap-3 overflow-hidden rounded-[2px] border p-3.5 transition-colors xl:flex-row xl:items-center xl:justify-between ${
                      isSelected
                        ? 'border-[#C69C4D] bg-[#FFFFFF] ring-1 ring-[#C69C4D]/60'
                        : 'border-[#E5DDD0] bg-[#FFFFFF] hover:border-[#C69C4D]/70'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenHotspotId((prev) =>
                          prev === entry.hotspot.id ? null : entry.hotspot.id
                        )
                      }
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums transition-colors ${
                          isSelected
                            ? 'bg-[#1C1514] text-[#FAF7F2]'
                            : 'bg-[#F3ECE1] text-[#1C1514]'
                        }`}
                      >
                        {idx + 1}
                      </span>

                      <div className="relative aspect-[4/5] w-12 shrink-0 overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]">
                        <SafeProductImage
                          src={entry.product.images[0]}
                          alt={entry.product.name}
                          categoryLabel={entry.product.category}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[10px] font-medium uppercase tracking-[0.12em] text-[#8C7E75]">
                          {entry.product.category} · {entry.product.purityOptions[0]}
                        </p>
                        <p className="truncate font-serif text-[17px] font-medium leading-snug text-[#1C1514]">
                          {entry.product.name}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-[#1C1514] tabular-nums">
                          {formatINR(entry.livePrice)}
                        </p>
                      </div>
                    </button>

                    <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[#E5DDD0] pt-2.5 xl:shrink-0 xl:flex-nowrap xl:border-t-0 xl:pt-0">
                      <Link
                        href={`/product/${entry.product.slug}`}
                        className="whitespace-nowrap rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1514] transition-colors hover:border-[#1C1514]"
                      >
                        View Piece
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleAddSingle(entry.product)}
                        className="inline-flex items-center gap-1 whitespace-nowrap rounded-[2px] bg-[#1C1514] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
                      >
                        {isSelected ? (
                          <Check className="h-3 w-3 text-[#C69C4D]" />
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Complete Look Action Bar */}
            <div className="mt-6 flex min-w-0 flex-col items-start justify-between gap-4 rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]/80 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5C504A]">
                  Complete Ensemble Total ({resolvedItems.length} pieces)
                </p>
                <p className="mt-0.5 font-serif text-2xl font-medium text-[#1C1514] tabular-nums">
                  {formatINR(combinedLookTotal)}
                  <span className="ml-2 font-sans text-[11px] font-normal text-[#8C7E75]">
                    Incl. 3% GST
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddCompleteLook}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[2px] bg-[#1C1514] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439] sm:w-auto"
              >
                <ShoppingBag className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.7} />
                <span>Add Complete Look</span>
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
