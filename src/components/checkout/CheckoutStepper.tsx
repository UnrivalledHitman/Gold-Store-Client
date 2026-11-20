'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Lock,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import {
  CHECKOUT_STEPS,
  type CheckoutStep,
} from '@/components/checkout/checkoutTypes';

export interface CheckoutStepperProps {
  currentStep: CheckoutStep;
  onSelectStep: (step: CheckoutStep) => void;
  showProgress?: boolean;
  onOpenBag?: () => void;
}

/**
 * Top editorial client-demo notice banner paired with PIXTACY's Sequel insured
 * transit & BIS/IGI guarantees and 3-step luxury progress indicator.
 */
export function CheckoutStepper({
  currentStep,
  onSelectStep,
  showProgress = true,
  onOpenBag,
}: CheckoutStepperProps) {
  return (
    <div className="space-y-6">
      {/* Top Editorial Notice Banner */}
      <div className="rounded-[2px] border border-[#C69C4D]/45 bg-[#F3ECE1] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-2.5 sm:items-center">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C69C4D] bg-[#FFFFFF] text-[#AE8439] sm:mt-0">
              <Lock className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                Interactive Client Demo Checkout — No Real Payment Charged
              </p>
              <p className="mt-0.5 text-[11px] text-[#5C504A]">
                Simulated walkthrough for client presentation · Live gold rates &amp; local receipt storage
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] font-medium text-[#5C504A]">
            <span className="inline-flex items-center gap-1.5">
              <Truck
                className="h-3.5 w-3.5 text-[#C69C4D]"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <span>Sequel Insured Transit</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck
                className="h-3.5 w-3.5 text-[#2E6B4E]"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <span>BIS 916 HUID &amp; IGI Certified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Page Header + 3-Step Progress Indicator */}
      <div className="flex flex-col gap-5 border-b border-[#E5DDD0] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5C504A] transition-colors hover:text-[#1C1514]"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
              <span>Continue Shopping</span>
            </Link>

            {onOpenBag && currentStep < 3 ? (
              <>
                <span className="text-[#E5DDD0]" aria-hidden="true">
                  |
                </span>
                <button
                  type="button"
                  onClick={onOpenBag}
                  className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#AE8439] underline decoration-[#C69C4D]/60 underline-offset-4 transition-colors hover:text-[#1C1514]"
                >
                  Edit Bag Items
                </button>
              </>
            ) : null}
          </div>

          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#1C1514] sm:text-4xl">
            {currentStep === 3
              ? 'Your PIXTACY Dossier & Receipt'
              : 'Private Client Checkout'}
          </h1>
        </div>

        {showProgress ? (
          <nav aria-label="Checkout progress" className="w-full md:w-auto">
            <ol className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              {CHECKOUT_STEPS.map((item, idx) => {
                const isCompleted = currentStep > item.step;
                const isCurrent = currentStep === item.step;
                const canJumpBack = currentStep === 2 && item.step === 1;

                return (
                  <React.Fragment key={item.step}>
                    <li className="flex items-center">
                      {canJumpBack ? (
                        <button
                          type="button"
                          onClick={() => onSelectStep(item.step)}
                          className="group flex items-center gap-2.5 text-left"
                        >
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2E6B4E] bg-[#2E6B4E] text-[11px] font-semibold text-[#FAF7F2] transition-colors group-hover:bg-[#1C1514]">
                            <Check className="h-3.5 w-3.5" strokeWidth={2} />
                          </span>
                          <span className="text-xs font-medium text-[#1C1514] underline decoration-[#C69C4D]/60 underline-offset-4 group-hover:text-[#AE8439]">
                            {item.label}
                          </span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <span
                            aria-current={isCurrent ? 'step' : undefined}
                            className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums transition-colors ${
                              isCompleted
                                ? 'border-[#2E6B4E] bg-[#2E6B4E] text-[#FAF7F2]'
                                : isCurrent
                                  ? 'border-[#1C1514] bg-[#1C1514] text-[#FAF7F2]'
                                  : 'border-[#E5DDD0] bg-[#FFFFFF] text-[#8C7E75]'
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="h-3.5 w-3.5" strokeWidth={2} />
                            ) : (
                              item.step
                            )}
                          </span>
                          <span
                            className={`text-xs transition-colors ${
                              isCurrent
                                ? 'font-semibold text-[#1C1514]'
                                : isCompleted
                                  ? 'font-medium text-[#2E6B4E]'
                                  : 'font-normal text-[#8C7E75]'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      )}
                    </li>

                    {idx < CHECKOUT_STEPS.length - 1 ? (
                      <li
                        aria-hidden="true"
                        className={`hidden h-px w-6 sm:block lg:w-8 ${
                          currentStep > item.step
                            ? 'bg-[#2E6B4E]/60'
                            : 'bg-[#E5DDD0]'
                        }`}
                      />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </ol>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
