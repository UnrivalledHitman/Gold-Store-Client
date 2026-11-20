'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { DemoOrder } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { BOUTIQUES } from '@/lib/siteConfig';
import { checkPincodeDelivery } from '@/lib/pricing';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper';
import { DeliveryStep } from '@/components/checkout/DeliveryStep';
import { PaymentStep } from '@/components/checkout/PaymentStep';
import { OrderSummaryRail } from '@/components/checkout/OrderSummaryRail';
import { OrderReceiptStep } from '@/components/checkout/OrderReceiptStep';
import { EmptyCheckoutState } from '@/components/checkout/EmptyCheckoutState';
import {
  INITIAL_SHIPPING_ADDRESS,
  type CheckoutStep,
  type DeliveryMethod,
  type PaymentMethod,
  type ShippingAddress,
  type ShippingFormErrors,
} from '@/components/checkout/checkoutTypes';

/**
 * Interactive 3-step client demo checkout flow backed by StoreContext
 * (live gold rates, Solis 2+ bundle savings, Gift Box/Note, PIXTACY10/FIRST500,
 * and localStorage DemoOrder persistence).
 */
export function CheckoutExperience() {
  const {
    mounted,
    cart,
    cartCount,
    orders,
    placeDemoOrder,
    openCart,
  } = useStore();

  const [step, setStep] = useState<CheckoutStep>(1);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>('courier');
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string>(
    BOUTIQUES[0].id
  );
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    INITIAL_SHIPPING_ADDRESS
  );
  const [shippingErrors, setShippingErrors] = useState<ShippingFormErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [confirmedOrder, setConfirmedOrder] = useState<DemoOrder | null>(null);
  const [isHistoricalView, setIsHistoricalView] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const selectedBoutique =
    BOUTIQUES.find((b) => b.id === selectedBoutiqueId) ?? BOUTIQUES[0];

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContinueToPayment = () => {
    setStep(2);
    scrollToTop();
  };

  const handleBackToDelivery = () => {
    setStep(1);
    scrollToTop();
  };

  const handleSelectStep = (targetStep: CheckoutStep) => {
    if (targetStep === 1 && step === 2) {
      setStep(1);
      scrollToTop();
    }
  };

  const handleSubmitDemoOrder = () => {
    if (cart.length === 0 || isSubmitting) return;
    setIsSubmitting(true);

    const cleanedAddress: ShippingAddress = {
      fullName: shippingAddress.fullName.trim(),
      phone: shippingAddress.phone.trim(),
      email: shippingAddress.email.trim(),
      addressLine1: shippingAddress.addressLine1.trim(),
      addressLine2: shippingAddress.addressLine2?.trim() || undefined,
      city: shippingAddress.city.trim(),
      state: shippingAddress.state.trim(),
      pincode: shippingAddress.pincode.trim(),
    };

    const pinResult = checkPincodeDelivery(cleanedAddress.pincode);
    const estimatedDelivery =
      deliveryMethod === 'boutique_pickup'
        ? `Ready for Salon Pickup within 24 hours (${selectedBoutique.shortLabel})`
        : pinResult.valid && pinResult.etaText && pinResult.city
          ? `Complimentary Sequel Insured Courier (${pinResult.etaText} to ${pinResult.city})`
          : 'Complimentary Insured Courier in 2–4 business days';

    submitTimerRef.current = setTimeout(() => {
      submitTimerRef.current = null;
      const created = placeDemoOrder({
        deliveryMethod,
        boutiqueName:
          deliveryMethod === 'boutique_pickup'
            ? selectedBoutique.name
            : undefined,
        shippingAddress: cleanedAddress,
        paymentMethod,
        estimatedDelivery,
      });
      setConfirmedOrder(created);
      setIsHistoricalView(false);
      setStep(3);
      setIsSubmitting(false);
      scrollToTop();
    }, 350);
  };

  const handleViewLatestOrder = (order: DemoOrder) => {
    setConfirmedOrder(order);
    setIsHistoricalView(true);
    setStep(3);
    scrollToTop();
  };

  const handleReturnToBagCheckout = () => {
    setConfirmedOrder(null);
    setIsHistoricalView(false);
    setStep(1);
    scrollToTop();
  };

  const handleExitHistoricalView = () => {
    setConfirmedOrder(null);
    setIsHistoricalView(false);
    setStep(1);
    scrollToTop();
  };

  const isViewingReceipt = step === 3 && confirmedOrder !== null;
  const showProgress = mounted && (cart.length > 0 || isViewingReceipt);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <CheckoutStepper
        currentStep={step}
        onSelectStep={handleSelectStep}
        showProgress={showProgress}
        onOpenBag={openCart}
      />

      <div className="mt-8">
        {!mounted ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="h-56 animate-pulse rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF]" />
              <div className="h-72 animate-pulse rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF]" />
            </div>
            <div className="lg:col-span-5">
              <div className="h-80 animate-pulse rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF]" />
            </div>
          </div>
        ) : isViewingReceipt && confirmedOrder ? (
          <OrderReceiptStep
            order={confirmedOrder}
            isHistoricalView={isHistoricalView}
            cartCount={cartCount}
            onReturnToBagCheckout={handleReturnToBagCheckout}
            onExitHistoricalView={handleExitHistoricalView}
          />
        ) : cart.length === 0 ? (
          <EmptyCheckoutState
            latestOrder={orders[0] ?? null}
            ordersCount={orders.length}
            onViewLatestOrder={handleViewLatestOrder}
          />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              {step === 1 ? (
                <DeliveryStep
                  deliveryMethod={deliveryMethod}
                  onChangeDeliveryMethod={setDeliveryMethod}
                  selectedBoutiqueId={selectedBoutiqueId}
                  onSelectBoutiqueId={setSelectedBoutiqueId}
                  shippingAddress={shippingAddress}
                  onChangeShippingAddress={setShippingAddress}
                  errors={shippingErrors}
                  onSetErrors={setShippingErrors}
                  onContinue={handleContinueToPayment}
                />
              ) : (
                <PaymentStep
                  deliveryMethod={deliveryMethod}
                  selectedBoutiqueId={selectedBoutiqueId}
                  shippingAddress={shippingAddress}
                  paymentMethod={paymentMethod}
                  onChangePaymentMethod={setPaymentMethod}
                  onBackToDelivery={handleBackToDelivery}
                  onSubmitDemoOrder={handleSubmitDemoOrder}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>

            <div className="lg:col-span-5">
              <OrderSummaryRail
                deliveryMethod={deliveryMethod}
                selectedBoutiqueLabel={selectedBoutique.shortLabel}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
