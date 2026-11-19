'use client';

import React, { useMemo } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Store,
  Truck,
} from 'lucide-react';
import { BOUTIQUES } from '@/lib/siteConfig';
import { checkPincodeDelivery } from '@/lib/pricing';
import {
  DEMO_SHIPPING_ADDRESS,
  validateShippingForm,
  type DeliveryMethod,
  type ShippingAddress,
  type ShippingFormErrors,
} from '@/components/checkout/checkoutTypes';

export interface DeliveryStepProps {
  deliveryMethod: DeliveryMethod;
  onChangeDeliveryMethod: (method: DeliveryMethod) => void;
  selectedBoutiqueId: string;
  onSelectBoutiqueId: (id: string) => void;
  shippingAddress: ShippingAddress;
  onChangeShippingAddress: (next: ShippingAddress) => void;
  errors: ShippingFormErrors;
  onSetErrors: (next: ShippingFormErrors) => void;
  onContinue: () => void;
}

/**
 * Step 1: Express Insured Courier vs Complimentary Boutique Pickup selector
 * over ZAVERA's 4 Indian salons, full validated Indian address form,
 * live Sequel pincode ETA lookup, and one-click "Fill Demo Address" walkthrough helper.
 */
export function DeliveryStep({
  deliveryMethod,
  onChangeDeliveryMethod,
  selectedBoutiqueId,
  onSelectBoutiqueId,
  shippingAddress,
  onChangeShippingAddress,
  errors,
  onSetErrors,
  onContinue,
}: DeliveryStepProps) {
  const selectedBoutique =
    BOUTIQUES.find((b) => b.id === selectedBoutiqueId) ?? BOUTIQUES[0];

  const pincodeStatus = useMemo(() => {
    const trimmed = shippingAddress.pincode.trim();
    if (trimmed.length < 6) return null;
    return checkPincodeDelivery(trimmed);
  }, [shippingAddress.pincode]);

  const updateField = (field: keyof ShippingAddress, value: string) => {
    onChangeShippingAddress({
      ...shippingAddress,
      [field]: value,
    });
    if (errors[field]) {
      const nextErrors = { ...errors };
      delete nextErrors[field];
      onSetErrors(nextErrors);
    }
  };

  const handleFillDemoAddress = () => {
    onChangeShippingAddress({ ...DEMO_SHIPPING_ADDRESS });
    onSetErrors({});
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateShippingForm(shippingAddress);
    if (Object.keys(validationErrors).length > 0) {
      onSetErrors(validationErrors);
      return;
    }
    onSetErrors({});
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Delivery Mode Selector */}
      <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-5 sm:p-6">
        <div className="border-b border-[#E5DDD0] pb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
            Step 1 · Fulfillment Method
          </p>
          <h2 className="mt-1 font-serif text-2xl font-medium text-[#1C1514]">
            Delivery &amp; Boutique Pickup
          </h2>
          <p className="mt-1 text-xs text-[#5C504A]">
            Choose insured doorstep courier across India or private collection at
            one of our four flagship salons.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onChangeDeliveryMethod('courier')}
            aria-pressed={deliveryMethod === 'courier'}
            className={`flex items-start gap-3.5 rounded-[2px] border p-4 text-left transition-colors ${
              deliveryMethod === 'courier'
                ? 'border-[#C69C4D] bg-[#FAF7F2] ring-1 ring-[#C69C4D]'
                : 'border-[#E5DDD0] bg-[#FFFFFF] hover:border-[#8C7E75]'
            }`}
          >
            <div
              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border ${
                deliveryMethod === 'courier'
                  ? 'border-[#C69C4D] bg-[#FFFFFF] text-[#AE8439]'
                  : 'border-[#E5DDD0] bg-[#FAF7F2] text-[#8C7E75]'
              }`}
            >
              <Truck className="h-4 w-4" strokeWidth={1.6} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[#1C1514]">
                  Express Insured Courier
                </p>
                <span className="rounded-full bg-[#2E6B4E]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#2E6B4E]">
                  Complimentary
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#5C504A]">
                Tamper-proof Sequel vault logistics with OTP handover in 2–4
                business days.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChangeDeliveryMethod('boutique_pickup')}
            aria-pressed={deliveryMethod === 'boutique_pickup'}
            className={`flex items-start gap-3.5 rounded-[2px] border p-4 text-left transition-colors ${
              deliveryMethod === 'boutique_pickup'
                ? 'border-[#C69C4D] bg-[#FAF7F2] ring-1 ring-[#C69C4D]'
                : 'border-[#E5DDD0] bg-[#FFFFFF] hover:border-[#8C7E75]'
            }`}
          >
            <div
              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border ${
                deliveryMethod === 'boutique_pickup'
                  ? 'border-[#C69C4D] bg-[#FFFFFF] text-[#AE8439]'
                  : 'border-[#E5DDD0] bg-[#FAF7F2] text-[#8C7E75]'
              }`}
            >
              <Store className="h-4 w-4" strokeWidth={1.6} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[#1C1514]">
                  Complimentary Boutique Pickup
                </p>
                <span className="rounded-full bg-[#C69C4D]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A6623]">
                  Within 24 Hrs
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#5C504A]">
                Private try-on &amp; fitting at Mumbai, Delhi, Bengaluru, or
                Kolkata salons.
              </p>
            </div>
          </button>
        </div>

        {/* 4-City Boutique Selector when Boutique Pickup is Active */}
        {deliveryMethod === 'boutique_pickup' ? (
          <div className="mt-6 border-t border-[#E5DDD0] pt-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C504A]">
                Select Pickup Salon (4 Cities)
              </p>
              <span className="text-[11px] text-[#2E6B4E]">
                Selected: {selectedBoutique.shortLabel}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BOUTIQUES.map((salon) => {
                const isSelected = salon.id === selectedBoutique.id;
                return (
                  <button
                    key={salon.id}
                    type="button"
                    onClick={() => onSelectBoutiqueId(salon.id)}
                    aria-pressed={isSelected}
                    className={`rounded-[2px] border p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-[#C69C4D] bg-[#FAF7F2] ring-1 ring-[#C69C4D]'
                        : 'border-[#E5DDD0] bg-[#FFFFFF] hover:border-[#8C7E75]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C69C4D]">
                          {salon.shortLabel}
                        </p>
                        <h3 className="mt-0.5 font-serif text-lg font-medium text-[#1C1514]">
                          {salon.name}
                        </h3>
                      </div>
                      {isSelected ? (
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-[#2E6B4E]"
                          strokeWidth={1.8}
                        />
                      ) : null}
                    </div>

                    <p className="mt-2 flex items-start gap-1.5 text-xs text-[#5C504A]">
                      <MapPin
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8C7E75]"
                        strokeWidth={1.5}
                      />
                      <span>{salon.address}</span>
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8C7E75]">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{salon.hours}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <Phone className="h-3 w-3" />
                        <span>{salon.phone}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>

      {/* Shipping / Client Address Form */}
      <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-5 sm:p-6">
        <div className="flex flex-col gap-3 border-b border-[#E5DDD0] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
              {deliveryMethod === 'boutique_pickup'
                ? 'Guest & Invoicing Details'
                : 'Recipient & Delivery Address'}
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-[#1C1514]">
              {deliveryMethod === 'boutique_pickup'
                ? 'Client Verification & Billing Address'
                : 'Where Should We Dispatch Your Order?'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleFillDemoAddress}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[2px] border border-[#C69C4D] bg-[#F3ECE1] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1C1514] transition-colors hover:bg-[#C69C4D] hover:text-[#FAF7F2]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#AE8439]" strokeWidth={1.7} />
            <span>Fill Demo Address</span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="checkout-fullName"
              className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
            >
              Full Name <span className="text-[#7A1E2C]">*</span>
            </label>
            <input
              id="checkout-fullName"
              type="text"
              autoComplete="name"
              value={shippingAddress.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="e.g. Ananya Deshmukh"
              className={`mt-1.5 w-full rounded-[2px] border bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:outline-none ${
                errors.fullName
                  ? 'border-[#7A1E2C] focus:border-[#7A1E2C]'
                  : 'border-[#E5DDD0] focus:border-[#C69C4D]'
              }`}
            />
            {errors.fullName ? (
              <p className="mt-1 text-xs text-[#7A1E2C]">{errors.fullName}</p>
            ) : null}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="checkout-phone"
              className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
            >
              Mobile Number (+91) <span className="text-[#7A1E2C]">*</span>
            </label>
            <input
              id="checkout-phone"
              type="tel"
              autoComplete="tel"
              value={shippingAddress.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+91 98204 51916"
              className={`mt-1.5 w-full rounded-[2px] border bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1C1514] tabular-nums placeholder:text-[#8C7E75] focus:outline-none ${
                errors.phone
                  ? 'border-[#7A1E2C] focus:border-[#7A1E2C]'
                  : 'border-[#E5DDD0] focus:border-[#C69C4D]'
              }`}
            />
            {errors.phone ? (
              <p className="mt-1 text-xs text-[#7A1E2C]">{errors.phone}</p>
            ) : null}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="checkout-email"
              className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
            >
              Email Address <span className="text-[#7A1E2C]">*</span>
            </label>
            <input
              id="checkout-email"
              type="email"
              autoComplete="email"
              value={shippingAddress.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="ananya@example.in"
              className={`mt-1.5 w-full rounded-[2px] border bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:outline-none ${
                errors.email
                  ? 'border-[#7A1E2C] focus:border-[#7A1E2C]'
                  : 'border-[#E5DDD0] focus:border-[#C69C4D]'
              }`}
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-[#7A1E2C]">{errors.email}</p>
            ) : null}
          </div>

          {/* Address Line 1 */}
          <div className="sm:col-span-2">
            <label
              htmlFor="checkout-addressLine1"
              className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
            >
              Address Line 1 <span className="text-[#7A1E2C]">*</span>
            </label>
            <input
              id="checkout-addressLine1"
              type="text"
              autoComplete="address-line1"
              value={shippingAddress.addressLine1}
              onChange={(e) => updateField('addressLine1', e.target.value)}
              placeholder="Apartment, House / Suite No., Building & Street"
              className={`mt-1.5 w-full rounded-[2px] border bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:outline-none ${
                errors.addressLine1
                  ? 'border-[#7A1E2C] focus:border-[#7A1E2C]'
                  : 'border-[#E5DDD0] focus:border-[#C69C4D]'
              }`}
            />
            {errors.addressLine1 ? (
              <p className="mt-1 text-xs text-[#7A1E2C]">
                {errors.addressLine1}
              </p>
            ) : null}
          </div>

          {/* Address Line 2 */}
          <div className="sm:col-span-2">
            <label
              htmlFor="checkout-addressLine2"
              className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
            >
              Address Line 2{' '}
              <span className="font-normal normal-case text-[#8C7E75]">
                (Optional · Landmark / Locality)
              </span>
            </label>
            <input
              id="checkout-addressLine2"
              type="text"
              autoComplete="address-line2"
              value={shippingAddress.addressLine2 ?? ''}
              onChange={(e) => updateField('addressLine2', e.target.value)}
              placeholder="e.g. Kala Ghoda, Fort"
              className="mt-1.5 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:border-[#C69C4D] focus:outline-none"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="checkout-city"
              className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
            >
              City <span className="text-[#7A1E2C]">*</span>
            </label>
            <input
              id="checkout-city"
              type="text"
              autoComplete="address-level2"
              value={shippingAddress.city}
              onChange={(e) => updateField('city', e.target.value)}
              placeholder="e.g. Mumbai"
              className={`mt-1.5 w-full rounded-[2px] border bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:outline-none ${
                errors.city
                  ? 'border-[#7A1E2C] focus:border-[#7A1E2C]'
                  : 'border-[#E5DDD0] focus:border-[#C69C4D]'
              }`}
            />
            {errors.city ? (
              <p className="mt-1 text-xs text-[#7A1E2C]">{errors.city}</p>
            ) : null}
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="checkout-state"
              className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
            >
              State <span className="text-[#7A1E2C]">*</span>
            </label>
            <input
              id="checkout-state"
              type="text"
              autoComplete="address-level1"
              value={shippingAddress.state}
              onChange={(e) => updateField('state', e.target.value)}
              placeholder="e.g. Maharashtra"
              className={`mt-1.5 w-full rounded-[2px] border bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1C1514] placeholder:text-[#8C7E75] focus:outline-none ${
                errors.state
                  ? 'border-[#7A1E2C] focus:border-[#7A1E2C]'
                  : 'border-[#E5DDD0] focus:border-[#C69C4D]'
              }`}
            />
            {errors.state ? (
              <p className="mt-1 text-xs text-[#7A1E2C]">{errors.state}</p>
            ) : null}
          </div>

          {/* Pincode */}
          <div className="sm:col-span-2">
            <label
              htmlFor="checkout-pincode"
              className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5C504A]"
            >
              6-Digit Indian Pincode <span className="text-[#7A1E2C]">*</span>
            </label>
            <input
              id="checkout-pincode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="postal-code"
              value={shippingAddress.pincode}
              onChange={(e) =>
                updateField(
                  'pincode',
                  e.target.value.replace(/\D/g, '').slice(0, 6)
                )
              }
              placeholder="e.g. 400001"
              className={`mt-1.5 w-full rounded-[2px] border bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1C1514] tabular-nums placeholder:text-[#8C7E75] focus:outline-none sm:max-w-xs ${
                errors.pincode
                  ? 'border-[#7A1E2C] focus:border-[#7A1E2C]'
                  : 'border-[#E5DDD0] focus:border-[#C69C4D]'
              }`}
            />
            {errors.pincode ? (
              <p className="mt-1 text-xs text-[#7A1E2C]">{errors.pincode}</p>
            ) : pincodeStatus?.valid ? (
              <p className="mt-1.5 flex items-start gap-1.5 text-xs text-[#2E6B4E]">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{pincodeStatus.message}</span>
              </p>
            ) : null}
          </div>
        </div>

        {/* Step 1 Submit */}
        <div className="mt-6 flex flex-col items-stretch justify-between gap-3 border-t border-[#E5DDD0] pt-5 sm:flex-row sm:items-center">
          <p className="text-[11px] text-[#8C7E75]">
            {deliveryMethod === 'boutique_pickup'
              ? `Pickup reservation will be held at ${selectedBoutique.shortLabel}.`
              : 'Insured transit dossier included with BIS & IGI certificates.'}
          </p>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#1C1514] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
          >
            <span>Continue to Payment Simulator</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
      </section>
    </form>
  );
}
