'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { BOUTIQUES } from '@/lib/siteConfig';
import { useStore } from '@/context/StoreContext';

const FOOTER_COLLECTION_LINKS = [
  { label: 'All Jewellery', href: '/collections' },
  { label: 'Aarohi · Heritage 22KT', href: '/collections/aarohi' },
  { label: 'Noor · Lab Diamonds', href: '/collections/noor' },
  { label: 'Saanjh · Everyday 18KT', href: '/collections/saanjh' },
  { label: 'Solis · Waterproof Demi-Fine', href: '/collections/solis' },
  { label: 'Gifting Edit', href: '/collections?occasion=Gifting' },
  { label: 'Demo Checkout', href: '/checkout' },
];

const HOUSE_PROMISES = [
  'BIS 916 & 750 HUID Laser Hallmarked',
  'IGI Certified EF-VVS Lab-Grown Diamonds',
  'Complimentary Sequel Insured Pan-India Delivery',
  '15-Day No-Questions Returns & 100% Gold Exchange',
  '1-Year Anti-Tarnish Waterproof Warranty (Solis)',
];

/**
 * Deep Espresso luxury house footer with brand story, collections,
 * 4 Indian salons, trust guarantees, and discreet Pitch Mode toggle.
 */
export function Footer() {
  const { openBookingModal, togglePitchDrawer } = useStore();

  return (
    <footer className="border-t border-[#FAF7F2]/10 bg-[#1C1514] text-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Story */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block font-serif text-3xl font-medium tracking-[0.35em] text-[#FAF7F2]"
            >
              PIXTACY
            </Link>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#C69C4D]">
              Heirloom Craft. Everyday Radiance.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#FAF7F2]/75">
              A contemporary Indian luxury jewellery house bridging ceremonial
              22KT temple artistry, IGI-certified lab-grown brilliance, everyday
              18KT fine gold, and waterproof demi-fine layering.
            </p>
            <button
              type="button"
              onClick={openBookingModal}
              className="mt-6 inline-flex items-center gap-2 rounded-[2px] border border-[#C69C4D]/60 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#C69C4D] transition-colors hover:bg-[#C69C4D] hover:text-[#1C1514]"
            >
              Book Salon or Video Styling
            </button>
          </div>

          {/* Collections */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
              Collections
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_COLLECTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF7F2]/80 transition-colors hover:text-[#C69C4D]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 India Salons */}
          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
              Indian Salons
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {BOUTIQUES.map((boutique) => (
                <div
                  key={boutique.id}
                  className="rounded-[2px] border border-[#FAF7F2]/10 bg-[#FAF7F2]/[0.03] p-3"
                >
                  <p className="font-serif text-base font-medium text-[#FAF7F2]">
                    {boutique.shortLabel}
                  </p>
                  <p className="mt-1 flex items-start gap-1.5 text-xs leading-relaxed text-[#FAF7F2]/70">
                    <MapPin
                      className="mt-0.5 h-3 w-3 shrink-0 text-[#C69C4D]"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span>{boutique.address}</span>
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#FAF7F2]/65 tabular-nums">
                    <Phone
                      className="h-3 w-3 shrink-0 text-[#C69C4D]"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span>{boutique.phone}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Promises */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C69C4D]">
              House Promises
            </h3>
            <ul className="mt-4 space-y-3">
              {HOUSE_PROMISES.map((promise) => (
                <li
                  key={promise}
                  className="flex items-start gap-2 text-xs leading-relaxed text-[#FAF7F2]/80"
                >
                  <ShieldCheck
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C69C4D]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span>{promise}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#FAF7F2]/10 pt-6 text-xs text-[#FAF7F2]/60 sm:flex-row sm:items-center">
          <p>
            © 2026 PIXTACY Jewels Pvt. Ltd. · All prices inclusive of 3% GST.
            Complimentary insured courier pan-India.
          </p>

          <button
            type="button"
            onClick={togglePitchDrawer}
            className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F2]/70 underline decoration-[#C69C4D]/40 underline-offset-4 transition-colors hover:text-[#C69C4D]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.6} />
            <span>Pitch Mode & Live Rate Simulator</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
