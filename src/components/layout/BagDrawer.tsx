'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Gift,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/lib/pricing';
import { SlideOverDrawer } from '@/components/ui/SlideOverDrawer';
import { SafeProductImage } from '@/components/ui/SafeProductImage';

/**
 * Slide-over Shopping Bag drawer with quantity steppers, live Solis 2+ bundle
 * tracker, Luxury Gift Box & handwritten note, ZAVERA10/FIRST500 promo codes,
 * and itemized totals synced to live gold rates.
 */
export function BagDrawer() {
  const {
    mounted,
    cart,
    cartCount,
    solisItemCount,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getCartItemBreakup,
    giftBox,
    setGiftBox,
    giftNote,
    setGiftNote,
    promoCode,
    applyPromoCode,
    removePromoCode,
    subtotal,
    solisBundleDiscount,
    promoDiscount,
    total,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const items = mounted ? cart : [];
  const itemCount = mounted ? cartCount : 0;

  const handleApplyPromo = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = promoInput.trim();
    if (!trimmed) {
      setPromoFeedback({
        ok: false,
        message: 'Enter ZAVERA10 or FIRST500 to apply a privilege.',
      });
      return;
    }
    const result = applyPromoCode(trimmed);
    setPromoFeedback(result);
    if (result.ok) {
      setPromoInput('');
    }
  };

  const solisProgressPct = Math.min(100, Math.round((solisItemCount / 2) * 100));
  const solisUnlocked = solisItemCount >= 2;

  return (
    <SlideOverDrawer
      open={isCartOpen}
      onClose={closeCart}
      title="Your Bag"
      subtitle="Insured pan-India delivery · BIS & IGI certified"
      badge={`${itemCount}`}
      footer={
        items.length > 0 ? (
          <div className="space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C504A]">
              <div className="flex items-center justify-between">
                <span>Subtotal (Incl. 3% GST)</span>
                <span className="font-medium text-[#1C1514] tabular-nums">
                  {formatINR(subtotal)}
                </span>
              </div>

              {solisBundleDiscount > 0 ? (
                <div className="flex items-center justify-between text-[#2E6B4E]">
                  <span>Solis Demi-Fine: Buy 2, Save 15%</span>
                  <span className="font-medium tabular-nums">
                    -{formatINR(solisBundleDiscount)}
                  </span>
                </div>
              ) : null}

              {promoDiscount > 0 && promoCode ? (
                <div className="flex items-center justify-between text-[#2E6B4E]">
                  <span>Privilege ({promoCode})</span>
                  <span className="font-medium tabular-nums">
                    -{formatINR(promoDiscount)}
                  </span>
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <span>Insured Sequel Courier</span>
                <span className="font-medium text-[#2E6B4E]">Complimentary</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between border-t border-[#E5DDD0] pt-2.5">
              <span className="font-serif text-lg font-medium text-[#1C1514]">
                Estimated Total
              </span>
              <span className="font-sans text-lg font-semibold text-[#1C1514] tabular-nums">
                {formatINR(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#1C1514] px-5 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </Link>
          </div>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5DDD0] bg-[#FFFFFF] text-[#8C7E75]">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <h3 className="mt-4 font-serif text-2xl font-medium text-[#1C1514]">
            Your ZAVERA Bag is Empty
          </h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#5C504A]">
            Discover heirloom 22KT gold, IGI-certified lab solitaires, or stack
            any 2 waterproof Solis pieces for an automatic 15% off.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/collections"
              onClick={closeCart}
              className="rounded-[2px] bg-[#1C1514] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
            >
              Explore All Pieces
            </Link>
            <Link
              href="/collections/solis"
              onClick={closeCart}
              className="rounded-[2px] border border-[#C69C4D] bg-[#FFFFFF] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#1C1514] transition-colors hover:bg-[#F3ECE1]"
            >
              Shop Solis Bundle
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Solis Demi-Fine: Buy 2, Save 15% Tracker */}
          <div
            className={`rounded-[2px] border p-3.5 ${
              solisUnlocked
                ? 'border-[#2E6B4E]/40 bg-[#2E6B4E]/[0.06]'
                : 'border-[#C69C4D]/45 bg-[#F3ECE1]/70'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <Sparkles
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    solisUnlocked ? 'text-[#2E6B4E]' : 'text-[#AE8439]'
                  }`}
                  strokeWidth={1.7}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#1C1514]">
                    Solis Demi-Fine: Buy 2, Save 15%
                  </p>
                  <p className="mt-0.5 text-xs text-[#5C504A]">
                    {solisUnlocked ? (
                      <span className="font-medium text-[#2E6B4E]">
                        Unlocked — saving{' '}
                        <span className="tabular-nums">
                          {formatINR(solisBundleDiscount)}
                        </span>{' '}
                        on{' '}
                        <span className="tabular-nums">{solisItemCount}</span> Solis
                        pieces.
                      </span>
                    ) : solisItemCount === 1 ? (
                      'Add 1 more waterproof Solis piece to unlock 15% off your Solis stack.'
                    ) : (
                      'Add any 2 Solis waterproof pieces to unlock an automatic 15% stack saving.'
                    )}
                  </p>
                </div>
              </div>
              {!solisUnlocked ? (
                <Link
                  href="/collections/solis"
                  onClick={closeCart}
                  className="shrink-0 text-[11px] font-medium text-[#1C1514] underline decoration-[#C69C4D] underline-offset-4 hover:text-[#AE8439]"
                >
                  Shop Solis
                </Link>
              ) : null}
            </div>

            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#E5DDD0]">
              <div
                style={{ width: `${solisProgressPct}%` }}
                className={`h-full rounded-full transition-all duration-300 ${
                  solisUnlocked ? 'bg-[#2E6B4E]' : 'bg-[#C69C4D]'
                }`}
              />
            </div>
          </div>

          {/* Bag Line Items */}
          <div className="space-y-3.5">
            {items.map((item) => {
              const breakup = getCartItemBreakup(item);
              const unitPrice = breakup ? breakup.finalPrice : 0;
              const lineTotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.cartItemId}
                  className="flex gap-3.5 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]"
                  >
                    <SafeProductImage
                      src={item.image}
                      alt={item.name}
                      categoryLabel={item.category}
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="block truncate font-serif text-lg font-medium text-[#1C1514] hover:text-[#AE8439]"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-[#5C504A]">
                          {item.selectedMetal} · {item.selectedPurity}
                        </p>
                        {item.ringSize !== undefined ? (
                          <p className="mt-0.5 text-[11px] text-[#8C7E75] tabular-nums">
                            Ring Size: Indian {item.ringSize}
                          </p>
                        ) : null}
                        {item.engraving ? (
                          <p className="mt-0.5 text-[11px] italic text-[#5C504A]">
                            Engraving: &ldquo;{item.engraving}&rdquo;
                          </p>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        aria-label={`Remove ${item.name} from bag`}
                        className="p-1 text-[#8C7E75] transition-colors hover:text-[#7A1E2C]"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.6} />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity - 1)
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center text-[#5C504A] transition-colors hover:bg-[#F3ECE1] hover:text-[#1C1514]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[26px] text-center text-xs font-medium text-[#1C1514] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity + 1)
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center text-[#5C504A] transition-colors hover:bg-[#F3ECE1] hover:text-[#1C1514]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#1C1514] tabular-nums">
                          {formatINR(lineTotal)}
                        </p>
                        {item.quantity > 1 ? (
                          <p className="text-[10px] text-[#8C7E75] tabular-nums">
                            {formatINR(unitPrice)} each
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complimentary Luxury Gift Box & Handwritten Note */}
          <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3.5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={giftBox}
                onChange={(e) => setGiftBox(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded-[2px] border-[#E5DDD0] accent-[#1C1514]"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#1C1514]">
                    <Gift className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.6} />
                    <span>Luxury Gift Box & Handwritten Note</span>
                  </span>
                  <span className="text-[11px] font-medium text-[#2E6B4E]">
                    Complimentary
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#5C504A]">
                  Velvet presentation box with wax-sealed ivory keepsake card.
                </p>
              </div>
            </label>

            {giftBox ? (
              <div className="mt-3 border-t border-[#E5DDD0] pt-3">
                <label
                  htmlFor="bag-gift-note"
                  className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#5C504A]"
                >
                  Handwritten Card Message
                </label>
                <textarea
                  id="bag-gift-note"
                  rows={2}
                  maxLength={180}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Write a personal note for our boutique calligrapher..."
                  className="mt-1.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-2 text-xs text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                />
                <p className="mt-1 text-right text-[10px] text-[#8C7E75] tabular-nums">
                  {giftNote.length}/180
                </p>
              </div>
            ) : null}
          </div>

          {/* Promo Code */}
          <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#1C1514]">
                <Tag className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.6} />
                <span>Privilege / Promo Code</span>
              </span>
              <span className="text-[10px] text-[#8C7E75]">
                ZAVERA10 · FIRST500
              </span>
            </div>

            {promoCode ? (
              <div className="mt-2.5 flex items-center justify-between rounded-[2px] border border-[#2E6B4E]/35 bg-[#2E6B4E]/[0.06] px-3 py-2">
                <div>
                  <p className="text-xs font-semibold text-[#2E6B4E]">
                    {promoCode} Applied
                  </p>
                  <p className="text-[11px] text-[#5C504A] tabular-nums">
                    Saving {formatINR(promoDiscount)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removePromoCode();
                    setPromoFeedback(null);
                  }}
                  aria-label="Remove promo code"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#5C504A] hover:text-[#7A1E2C]"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="mt-2.5 flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    if (promoFeedback) setPromoFeedback(null);
                  }}
                  placeholder="Enter code (e.g. ZAVERA10)"
                  aria-label="Promo code"
                  className="flex-1 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-2 text-xs uppercase text-[#1C1514] placeholder:normal-case placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-[2px] border border-[#1C1514] bg-[#1C1514] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:border-[#AE8439] hover:bg-[#AE8439]"
                >
                  Apply
                </button>
              </form>
            )}

            {promoFeedback && !promoCode ? (
              <p
                className={`mt-2 text-xs ${
                  promoFeedback.ok ? 'text-[#2E6B4E]' : 'text-[#7A1E2C]'
                }`}
              >
                {promoFeedback.message}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </SlideOverDrawer>
  );
}
