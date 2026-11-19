'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, MapPin, Store, Truck } from 'lucide-react';
import { checkPincodeDelivery, type PincodeCheckResult } from '@/lib/pricing';
import { useStore } from '@/context/StoreContext';

const SAMPLE_PINCODES: { code: string; city: string }[] = [
  { code: '400001', city: 'Mumbai' },
  { code: '110001', city: 'New Delhi' },
  { code: '560038', city: 'Bengaluru' },
  { code: '700016', city: 'Kolkata' },
];

/**
 * 6-digit Indian pincode delivery & nearest ZAVERA salon pickup lookup.
 */
export function PincodeChecker() {
  const { openBookingModal } = useStore();
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<PincodeCheckResult | null>(null);

  const runCheck = (rawCode: string) => {
    const res = checkPincodeDelivery(rawCode);
    setResult(res);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    runCheck(pincode);
  };

  return (
    <section className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-4">
      <div className="flex items-center gap-2">
        <MapPin
          className="h-4 w-4 text-[#C69C4D]"
          strokeWidth={1.7}
          aria-hidden="true"
        />
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1514]">
          Delivery &amp; Salon Pickup Availability
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\s+/g, ''))}
          placeholder="Enter 6-digit Indian pincode (e.g. 400001)"
          aria-label="Enter 6-digit Indian pincode"
          className="min-w-0 flex-1 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-3 py-2 text-xs text-[#1C1514] placeholder:text-[#8C7E75] tabular-nums focus:border-[#C69C4D] focus:bg-[#FFFFFF] focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-[2px] border border-[#1C1514] bg-[#1C1514] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:border-[#AE8439] hover:bg-[#AE8439]"
        >
          Check
        </button>
      </form>

      {/* Quick Test City Pincodes */}
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-[0.1em] text-[#8C7E75]">
          Try:
        </span>
        {SAMPLE_PINCODES.map((sample) => (
          <button
            key={sample.code}
            type="button"
            onClick={() => {
              setPincode(sample.code);
              runCheck(sample.code);
            }}
            className="rounded-full border border-[#E5DDD0] bg-[#FAF7F2] px-2.5 py-0.5 text-[10px] text-[#5C504A] tabular-nums transition-colors hover:border-[#C69C4D] hover:text-[#1C1514]"
          >
            {sample.code} · {sample.city}
          </button>
        ))}
      </div>

      {result ? (
        result.valid ? (
          <div className="mt-3.5 space-y-2.5 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-3">
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-[#2E6B4E]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-[#1C1514]">
                  {result.city}
                  {result.state ? `, ${result.state}` : ''} ·{' '}
                  <span className="tabular-nums">{result.pincode}</span>
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#5C504A]">
                  {result.message}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 border-t border-[#E5DDD0] pt-2.5 sm:grid-cols-2">
              <div className="flex items-start gap-2 rounded-[2px] bg-[#FFFFFF] p-2.5">
                <Truck
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C69C4D]"
                  strokeWidth={1.7}
                />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8C7E75]">
                    Insured Courier ETA
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#1C1514] tabular-nums">
                    {result.etaText}
                  </p>
                </div>
              </div>

              {result.nearestBoutique ? (
                <div className="flex items-start gap-2 rounded-[2px] bg-[#FFFFFF] p-2.5">
                  <Store
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                      result.boutiquePickupAvailable
                        ? 'text-[#2E6B4E]'
                        : 'text-[#8C7E75]'
                    }`}
                    strokeWidth={1.7}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8C7E75]">
                      {result.boutiquePickupAvailable
                        ? 'Same-Day Salon Pickup'
                        : 'Nearest ZAVERA Salon'}
                    </p>
                    <p className="mt-0.5 truncate text-xs font-semibold text-[#1C1514]">
                      {result.nearestBoutique.shortLabel}
                    </p>
                    <button
                      type="button"
                      onClick={openBookingModal}
                      className="mt-0.5 text-[10px] font-medium text-[#AE8439] underline underline-offset-2 hover:text-[#1C1514]"
                    >
                      Schedule salon trial →
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div
            role="alert"
            className="mt-3 flex items-start gap-2 rounded-[2px] border border-[#7A1E2C]/30 bg-[#7A1E2C]/[0.05] px-3 py-2.5 text-xs text-[#7A1E2C]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span>{result.message}</span>
          </div>
        )
      ) : null}
    </section>
  );
}
