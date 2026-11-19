'use client';

import React from 'react';
import { Calendar, Clock, MapPin, ShieldCheck, Video } from 'lucide-react';
import { BOUTIQUES } from '@/lib/siteConfig';
import { useStore } from '@/context/StoreContext';
import { SafeProductImage } from '@/components/ui/SafeProductImage';

/**
 * Section 8: Atelier Heritage & Video Concierge Split Banner highlighting
 * ZAVERA's 4 Indian salons and 1-on-1 live stylist appointments.
 */
export function AtelierConciergeBanner() {
  const { openBookingModal } = useStore();

  return (
    <section
      aria-labelledby="atelier-concierge-heading"
      className="bg-[#FAF7F2] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] lg:grid-cols-12">
          {/* Left Editorial Heritage Visual Panel */}
          <div className="relative flex flex-col justify-between bg-[#1C1514] p-6 text-[#FAF7F2] sm:p-8 lg:col-span-5 lg:p-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C69C4D]/45 bg-[#FAF7F2]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C69C4D]">
                <Video className="h-3 w-3" strokeWidth={1.7} />
                <span>Live 1-on-1 Stylist Concierge</span>
              </span>

              <h3 className="mt-4 font-serif text-3xl font-normal leading-snug text-[#FAF7F2]">
                Macro Viewing, Trousseau Curation &amp; Private Assays
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-[#FAF7F2]/75 sm:text-sm">
                Inspect diamond fire, kundan meenakari reverses, and real-life
                stack proportions live over HD video with our senior gemologists—or
                reserve a private champagne suite at any of our four Indian
                salons.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#FAF7F2]/15 pt-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] border border-[#FAF7F2]/15 bg-[#F3ECE1]">
                <SafeProductImage
                  src="/images/collections/aarohi.png"
                  alt="ZAVERA Heritage 22KT Salon Showcase"
                  categoryLabel="Aarohi Atelier"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] border border-[#FAF7F2]/15 bg-[#F3ECE1]">
                <SafeProductImage
                  src="/images/collections/solis.png"
                  alt="ZAVERA Waterproof Demi-Fine Styling Bar"
                  categoryLabel="Solis Bar"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#FAF7F2]/75">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.6} />
                <span>11:00 AM – 8:30 PM IST</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.6} />
                <span>GIA / IGI Certified Guidance</span>
              </span>
            </div>
          </div>

          {/* Right Salons & Booking Actions Panel */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AE8439]">
                Atelier Heritage &amp; Private Salons
              </p>
              <h2
                id="atelier-concierge-heading"
                className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#1C1514] sm:text-4xl"
              >
                Four Cities. One Bespoke Standard.
              </h2>
              <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#5C504A]">
                Whether you are commissioning a bridal choker in Kala Ghoda or
                comparing EF-VVS ovals from your study via video call, every
                session includes complimentary resizing, engraving advice, and
                same-day insured pickup.
              </p>

              {/* 4 Indian Salons Grid */}
              <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {BOUTIQUES.map((salon) => (
                  <div
                    key={salon.id}
                    className="flex flex-col justify-between rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2]/75 p-4 transition-colors hover:border-[#C69C4D]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-lg font-medium text-[#1C1514]">
                          {salon.shortLabel}
                        </h3>
                        <span className="rounded-full border border-[#E5DDD0] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#8C7E75]">
                          {salon.city}
                        </span>
                      </div>
                      <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-[#5C504A]">
                        <MapPin
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C69C4D]"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        <span>{salon.address}</span>
                      </p>
                    </div>

                    <div className="mt-3 border-t border-[#E5DDD0] pt-2.5">
                      <p className="text-[11px] font-medium text-[#1C1514]">
                        {salon.services[0]}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#8C7E75]">
                        {salon.hours}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dual Booking CTAs */}
            <div className="mt-8 flex flex-col gap-3 border-t border-[#E5DDD0] pt-6 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={openBookingModal}
                className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#1C1514] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
              >
                <Video className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.7} />
                <span>Book Video Styling</span>
              </button>

              <button
                type="button"
                onClick={openBookingModal}
                className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-[#1C1514] bg-[#FFFFFF] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1C1514] transition-colors hover:bg-[#1C1514] hover:text-[#FAF7F2]"
              >
                <Calendar className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.7} />
                <span>Visit a Boutique</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
