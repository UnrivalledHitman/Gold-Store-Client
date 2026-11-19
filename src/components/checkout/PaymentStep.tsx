'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  CreditCard,
  Gift,
  Lock,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/lib/pricing';
import { BOUTIQUES, PROMO_CODES } from '@/lib/siteConfig';
import {
  DEMO_CARD_DETAILS,
  DEMO_UPI_ID,
  NETBANKING_BANKS,
  formatCardExpiryInput,
  formatCardNumberDisplay,
  type CardPaymentState,
  type DeliveryMethod,
  type PaymentMethod,
  type ShippingAddress,
} from '@/components/checkout/checkoutTypes';

export interface PaymentStepProps {
  deliveryMethod: DeliveryMethod;
  selectedBoutiqueId: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  onChangePaymentMethod: (method: PaymentMethod) => void;
  onBackToDelivery: () => void;
  onSubmitDemoOrder: () => void;
  isSubmitting: boolean;
}

/**
 * Deterministic luxury QR pattern SVG for the UPI demo simulator.
 */
function SimulatedUpiQrGraphic() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-28 w-28 shrink-0 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-2 text-[#1C1514]"
      role="img"
      aria-label="Simulated ZAVERA UPI QR code"
    >
      {/* Top-left finder */}
      <rect x="6" y="6" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="14" y="14" width="12" height="12" fill="currentColor" />
      {/* Top-right finder */}
      <rect x="86" y="6" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="94" y="14" width="12" height="12" fill="currentColor" />
      {/* Bottom-left finder */}
      <rect x="6" y="86" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="14" y="94" width="12" height="12" fill="currentColor" />
      {/* Data modules */}
      <rect x="44" y="8" width="6" height="6" fill="currentColor" />
      <rect x="56" y="8" width="6" height="6" fill="currentColor" />
      <rect x="68" y="14" width="6" height="6" fill="currentColor" />
      <rect x="44" y="20" width="12" height="6" fill="currentColor" />
      <rect x="68" y="26" width="6" height="6" fill="currentColor" />
      <rect x="8" y="44" width="6" height="6" fill="currentColor" />
      <rect x="20" y="44" width="12" height="6" fill="currentColor" />
      <rect x="44" y="44" width="6" height="12" fill="#C69C4D" />
      <rect x="56" y="44" width="12" height="12" fill="#C69C4D" />
      <rect x="74" y="44" width="6" height="6" fill="currentColor" />
      <rect x="92" y="44" width="14" height="6" fill="currentColor" />
      <rect x="14" y="56" width="6" height="12" fill="currentColor" />
      <rect x="32" y="56" width="6" height="6" fill="currentColor" />
      <rect x="44" y="62" width="12" height="6" fill="#C69C4D" />
      <rect x="62" y="62" width="12" height="6" fill="currentColor" />
      <rect x="86" y="56" width="6" height="12" fill="currentColor" />
      <rect x="104" y="56" width="8" height="6" fill="currentColor" />
      <rect x="8" y="74" width="14" height="6" fill="currentColor" />
      <rect x="44" y="74" width="6" height="6" fill="currentColor" />
      <rect x="56" y="74" width="12" height="6" fill="currentColor" />
      <rect x="74" y="74" width="6" height="14" fill="currentColor" />
      <rect x="92" y="74" width="6" height="6" fill="currentColor" />
      <rect x="104" y="74" width="8" height="14" fill="currentColor" />
      <rect x="44" y="88" width="12" height="6" fill="currentColor" />
      <rect x="62" y="88" width="6" height="12" fill="currentColor" />
      <rect x="86" y="88" width="12" height="6" fill="currentColor" />
      <rect x="44" y="102" width="6" height="10" fill="currentColor" />
      <rect x="56" y="106" width="14" height="6" fill="currentColor" />
      <rect x="80" y="102" width="12" height="10" fill="currentColor" />
      <rect x="100" y="104" width="12" height="8" fill="currentColor" />
    </svg>
  );
}

/**
 * Step 2: Interactive payment simulator (UPI QR/ID, masked demo Card, NetBanking),
 * preserved Gift Box & handwritten note controls, ZAVERA10 / FIRST500 promo
 * manager, and demo order submission.
 */
export function PaymentStep({
  deliveryMethod,
  selectedBoutiqueId,
  shippingAddress,
  paymentMethod,
  onChangePaymentMethod,
  onBackToDelivery,
  onSubmitDemoOrder,
  isSubmitting,
}: PaymentStepProps) {
  const {
    giftBox,
    setGiftBox,
    giftNote,
    setGiftNote,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
    total,
  } = useStore();

  const [upiId, setUpiId] = useState(DEMO_UPI_ID);
  const [cardState, setCardState] = useState<CardPaymentState>(() => ({
    ...DEMO_CARD_DETAILS,
    cardHolder: shippingAddress.fullName || DEMO_CARD_DETAILS.cardHolder,
  }));
  const [selectedBankId, setSelectedBankId] = useState<
    'hdfc' | 'icici' | 'sbi' | 'axis'
  >('hdfc');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const selectedBoutique =
    BOUTIQUES.find((b) => b.id === selectedBoutiqueId) ?? BOUTIQUES[0];

  const handlePromoSubmit = (event: React.FormEvent) => {
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

  const handleQuickApplyPromo = (code: 'ZAVERA10' | 'FIRST500') => {
    const result = applyPromoCode(code);
    setPromoFeedback(result);
    setPromoInput('');
  };

  const handlePaymentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPaymentError(null);

    if (paymentMethod === 'upi') {
      const cleanedUpi = upiId.trim();
      if (!cleanedUpi || !/^[\w.\-_]{2,}@[a-zA-Z]{2,}$/.test(cleanedUpi)) {
        setPaymentError(
          'Enter a valid demo UPI ID (e.g. ananya@okhdfcbank) to simulate UPI payment.'
        );
        return;
      }
    } else if (paymentMethod === 'card') {
      const rawDigits = cardState.cardNumber.replace(/\D/g, '');
      const expDigits = cardState.expiry.replace(/\D/g, '');
      if (rawDigits.length < 16) {
        setPaymentError('Demo card number must be 16 digits.');
        return;
      }
      if (cardState.cardHolder.trim().length < 2) {
        setPaymentError('Please enter cardholder name.');
        return;
      }
      if (expDigits.length !== 4) {
        setPaymentError('Enter demo expiry in MM / YY format.');
        return;
      }
      if (cardState.cvv.replace(/\D/g, '').length < 3) {
        setPaymentError('Enter 3-digit demo CVV.');
        return;
      }
    }

    onSubmitDemoOrder();
  };

  return (
    <div className="space-y-6">
      {/* Compact Step 1 Recap Card */}
      <div className="flex flex-col justify-between gap-3 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-4 sm:flex-row sm:items-center sm:px-5">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2E6B4E]">
            {deliveryMethod === 'boutique_pickup'
              ? `Boutique Pickup · ${selectedBoutique.shortLabel}`
              : 'Express Insured Courier'}
          </p>
          <p className="mt-0.5 text-sm font-medium text-[#1C1514]">
            {shippingAddress.fullName} ·{' '}
            <span className="tabular-nums">{shippingAddress.phone}</span>
          </p>
          <p className="mt-0.5 truncate text-xs text-[#5C504A]">
            {deliveryMethod === 'boutique_pickup'
              ? selectedBoutique.address
              : `${shippingAddress.addressLine1}${
                  shippingAddress.addressLine2
                    ? `, ${shippingAddress.addressLine2}`
                    : ''
                }, ${shippingAddress.city}, ${shippingAddress.state} ${
                  shippingAddress.pincode
                }`}
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToDelivery}
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#1C1514] transition-colors hover:border-[#C69C4D] sm:self-center"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Edit Delivery</span>
        </button>
      </div>

      {/* Gift Box & Promo Preservation Section */}
      <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-5 sm:p-6">
        <div className="border-b border-[#E5DDD0] pb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
            Gifting &amp; Privileges
          </p>
          <h2 className="mt-1 font-serif text-2xl font-medium text-[#1C1514]">
            Luxury Packaging &amp; Promo Code
          </h2>
          <p className="mt-1 text-xs text-[#5C504A]">
            Synced with your Bag Drawer — toggle complimentary velvet gifting or
            apply a client privilege code before completing your demo order.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Complimentary Luxury Gift Box & Handwritten Note */}
          <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4">
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
                    <Gift
                      className="h-3.5 w-3.5 text-[#C69C4D]"
                      strokeWidth={1.6}
                    />
                    <span>Luxury Gift Box</span>
                  </span>
                  <span className="text-[11px] font-medium text-[#2E6B4E]">
                    Complimentary
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#5C504A]">
                  Signature champagne velvet box with wax-sealed ivory card.
                </p>
              </div>
            </label>

            {giftBox ? (
              <div className="mt-3 border-t border-[#E5DDD0] pt-3">
                <label
                  htmlFor="checkout-gift-note"
                  className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#5C504A]"
                >
                  Handwritten Card Note
                </label>
                <textarea
                  id="checkout-gift-note"
                  rows={2}
                  maxLength={180}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Write a personal note for our boutique calligrapher..."
                  className="mt-1.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                />
                <p className="mt-1 text-right text-[10px] text-[#8C7E75] tabular-nums">
                  {giftNote.length}/180
                </p>
              </div>
            ) : null}
          </div>

          {/* Promo Code Control */}
          <div className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#1C1514]">
                <Tag
                  className="h-3.5 w-3.5 text-[#C69C4D]"
                  strokeWidth={1.6}
                />
                <span>Privilege / Promo Code</span>
              </span>
              <span className="text-[10px] text-[#8C7E75]">
                ZAVERA10 · FIRST500
              </span>
            </div>

            {promoCode ? (
              <div className="mt-3 flex items-center justify-between rounded-[2px] border border-[#2E6B4E]/35 bg-[#FFFFFF] px-3.5 py-2.5">
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
              <>
                <form onSubmit={handlePromoSubmit} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      if (promoFeedback) setPromoFeedback(null);
                    }}
                    placeholder="Enter ZAVERA10 or FIRST500"
                    aria-label="Promo code"
                    className="flex-1 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-2 text-xs uppercase text-[#1C1514] placeholder:normal-case placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-[2px] border border-[#1C1514] bg-[#1C1514] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:border-[#AE8439] hover:bg-[#AE8439]"
                  >
                    Apply
                  </button>
                </form>

                {/* Quick-apply walkthrough chips */}
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {(
                    Object.keys(PROMO_CODES) as Array<'ZAVERA10' | 'FIRST500'>
                  ).map((codeKey) => (
                    <button
                      key={codeKey}
                      type="button"
                      onClick={() => handleQuickApplyPromo(codeKey)}
                      className="inline-flex items-center gap-1 rounded-full border border-[#E5DDD0] bg-[#FFFFFF] px-2.5 py-1 text-[10px] font-medium text-[#5C504A] transition-colors hover:border-[#C69C4D] hover:text-[#1C1514]"
                    >
                      <Sparkles className="h-2.5 w-2.5 text-[#C69C4D]" />
                      <span className="tabular-nums">
                        {codeKey} (
                        {codeKey === 'ZAVERA10' ? '10% Off' : '₹500 Off'})
                      </span>
                    </button>
                  ))}
                </div>
              </>
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
      </section>

      {/* Payment Method Simulator Form */}
      <form
        onSubmit={handlePaymentSubmit}
        noValidate
        className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-5 sm:p-6"
      >
        <div className="flex flex-col gap-2 border-b border-[#E5DDD0] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
              Step 2 · Payment Simulator
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-[#1C1514]">
              Choose Simulated Payment Method
            </h2>
          </div>

          <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#2E6B4E]/30 bg-[#2E6B4E]/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#2E6B4E]">
            <Lock className="h-3 w-3" />
            <span>Zero Real Charge</span>
          </span>
        </div>

        {/* Payment Method Selector Tabs */}
        <div
          role="radiogroup"
          aria-label="Simulated payment method"
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <button
            type="button"
            role="radio"
            aria-checked={paymentMethod === 'upi'}
            onClick={() => {
              onChangePaymentMethod('upi');
              setPaymentError(null);
            }}
            className={`flex items-center gap-3 rounded-[2px] border p-3.5 text-left transition-colors ${
              paymentMethod === 'upi'
                ? 'border-[#C69C4D] bg-[#FAF7F2] ring-1 ring-[#C69C4D]'
                : 'border-[#E5DDD0] bg-[#FFFFFF] hover:border-[#8C7E75]'
            }`}
          >
            <Smartphone
              className={`h-4 w-4 shrink-0 ${
                paymentMethod === 'upi' ? 'text-[#AE8439]' : 'text-[#8C7E75]'
              }`}
              strokeWidth={1.6}
            />
            <div>
              <p className="text-sm font-semibold text-[#1C1514]">UPI</p>
              <p className="text-[11px] text-[#5C504A]">QR / UPI ID</p>
            </div>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={paymentMethod === 'card'}
            onClick={() => {
              onChangePaymentMethod('card');
              setPaymentError(null);
            }}
            className={`flex items-center gap-3 rounded-[2px] border p-3.5 text-left transition-colors ${
              paymentMethod === 'card'
                ? 'border-[#C69C4D] bg-[#FAF7F2] ring-1 ring-[#C69C4D]'
                : 'border-[#E5DDD0] bg-[#FFFFFF] hover:border-[#8C7E75]'
            }`}
          >
            <CreditCard
              className={`h-4 w-4 shrink-0 ${
                paymentMethod === 'card' ? 'text-[#AE8439]' : 'text-[#8C7E75]'
              }`}
              strokeWidth={1.6}
            />
            <div>
              <p className="text-sm font-semibold text-[#1C1514]">
                Credit / Debit Card
              </p>
              <p className="text-[11px] text-[#5C504A]">Masked Demo Form</p>
            </div>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={paymentMethod === 'netbanking'}
            onClick={() => {
              onChangePaymentMethod('netbanking');
              setPaymentError(null);
            }}
            className={`flex items-center gap-3 rounded-[2px] border p-3.5 text-left transition-colors ${
              paymentMethod === 'netbanking'
                ? 'border-[#C69C4D] bg-[#FAF7F2] ring-1 ring-[#C69C4D]'
                : 'border-[#E5DDD0] bg-[#FFFFFF] hover:border-[#8C7E75]'
            }`}
          >
            <Building2
              className={`h-4 w-4 shrink-0 ${
                paymentMethod === 'netbanking'
                  ? 'text-[#AE8439]'
                  : 'text-[#8C7E75]'
              }`}
              strokeWidth={1.6}
            />
            <div>
              <p className="text-sm font-semibold text-[#1C1514]">NetBanking</p>
              <p className="text-[11px] text-[#5C504A]">HDFC · ICICI · SBI · Axis</p>
            </div>
          </button>
        </div>

        {/* Selected Payment Simulator Panel */}
        <div className="mt-5 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-4 sm:p-5">
          {paymentMethod === 'upi' ? (
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex flex-col items-center gap-2 self-start sm:self-center">
                <SimulatedUpiQrGraphic />
                <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#5C504A]">
                  <QrCode className="h-3 w-3 text-[#C69C4D]" />
                  <span>Simulated QR</span>
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                    Instant UPI Demo Authorization
                  </p>
                  <p className="mt-0.5 text-xs text-[#5C504A]">
                    Simulated payment for{' '}
                    <span className="font-semibold text-[#1C1514] tabular-nums">
                      {formatINR(total)}
                    </span>{' '}
                    via GPay, PhonePe, Paytm, or BHIM.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="checkout-upi-id"
                      className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
                    >
                      UPI ID / VPA
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setUpiId(DEMO_UPI_ID);
                        setPaymentError(null);
                      }}
                      className="text-[11px] font-medium text-[#AE8439] underline decoration-[#C69C4D]/60 underline-offset-4 hover:text-[#1C1514]"
                    >
                      Reset Demo UPI
                    </button>
                  </div>
                  <input
                    id="checkout-upi-id"
                    type="text"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      if (paymentError) setPaymentError(null);
                    }}
                    placeholder="ananya@okhdfcbank"
                    className="mt-1.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : null}

          {paymentMethod === 'card' ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                    Masked Demo Card Simulator
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#5C504A]">
                    Pre-populated with non-transactional demo credentials for
                    client review.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCardState({
                      ...DEMO_CARD_DETAILS,
                      cardHolder:
                        shippingAddress.fullName ||
                        DEMO_CARD_DETAILS.cardHolder,
                    });
                    setPaymentError(null);
                  }}
                  className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1C1514] hover:border-[#C69C4D]"
                >
                  Reset Demo Card
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-card-number"
                    className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
                  >
                    Demo Card Number
                  </label>
                  <input
                    id="checkout-card-number"
                    type="text"
                    inputMode="numeric"
                    value={cardState.cardNumber}
                    onChange={(e) => {
                      setCardState((prev) => ({
                        ...prev,
                        cardNumber: formatCardNumberDisplay(e.target.value),
                      }));
                      if (paymentError) setPaymentError(null);
                    }}
                    placeholder="4532 8812 3409 8910"
                    className="mt-1.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#1C1514] tabular-nums placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-card-holder"
                    className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
                  >
                    Name on Card
                  </label>
                  <input
                    id="checkout-card-holder"
                    type="text"
                    value={cardState.cardHolder}
                    onChange={(e) => {
                      setCardState((prev) => ({
                        ...prev,
                        cardHolder: e.target.value,
                      }));
                      if (paymentError) setPaymentError(null);
                    }}
                    placeholder="Ananya Deshmukh"
                    className="mt-1.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-card-expiry"
                    className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
                  >
                    Expiry (MM / YY)
                  </label>
                  <input
                    id="checkout-card-expiry"
                    type="text"
                    inputMode="numeric"
                    value={cardState.expiry}
                    onChange={(e) => {
                      setCardState((prev) => ({
                        ...prev,
                        expiry: formatCardExpiryInput(e.target.value),
                      }));
                      if (paymentError) setPaymentError(null);
                    }}
                    placeholder="09 / 28"
                    className="mt-1.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#1C1514] tabular-nums placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-card-cvv"
                    className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
                  >
                    Security Code (CVV)
                  </label>
                  <input
                    id="checkout-card-cvv"
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={cardState.cvv}
                    onChange={(e) => {
                      setCardState((prev) => ({
                        ...prev,
                        cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                      }));
                      if (paymentError) setPaymentError(null);
                    }}
                    placeholder="•••"
                    className="mt-1.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#1C1514] tabular-nums placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : null}

          {paymentMethod === 'netbanking' ? (
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                  Select Indian Partner Bank
                </p>
                <p className="mt-0.5 text-[11px] text-[#5C504A]">
                  Simulated corporate &amp; retail NetBanking gateway — no
                  external redirect occurs.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {NETBANKING_BANKS.map((bank) => {
                  const active = bank.id === selectedBankId;
                  return (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedBankId(bank.id)}
                      aria-pressed={active}
                      className={`flex items-center justify-between rounded-[2px] border p-3 text-left transition-colors ${
                        active
                          ? 'border-[#C69C4D] bg-[#FFFFFF] ring-1 ring-[#C69C4D]'
                          : 'border-[#E5DDD0] bg-[#FFFFFF]/75 hover:border-[#8C7E75]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-12 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1] text-[10px] font-bold tracking-[0.1em] text-[#1C1514]">
                          {bank.shortCode}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-[#1C1514]">
                            {bank.name}
                          </p>
                          <p className="text-[10px] text-[#8C7E75]">
                            {bank.subtitle}
                          </p>
                        </div>
                      </div>
                      {active ? (
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-[#2E6B4E]"
                          strokeWidth={1.8}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {paymentError ? (
          <p className="mt-3 text-xs font-medium text-[#7A1E2C]">
            {paymentError}
          </p>
        ) : null}

        {/* Submit & Back Actions */}
        <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#E5DDD0] pt-5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onBackToDelivery}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-5 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-[#1C1514] transition-colors hover:border-[#1C1514] disabled:opacity-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Delivery</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#1C1514] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439] disabled:cursor-wait disabled:opacity-75"
          >
            <ShieldCheck className="h-4 w-4 text-[#C69C4D]" strokeWidth={1.7} />
            <span className="tabular-nums">
              {isSubmitting
                ? 'Confirming Demo Order...'
                : `Complete Demo Order · ${formatINR(total)}`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
