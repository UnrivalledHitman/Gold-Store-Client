import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Section 1: Full-Bleed Editorial Hero Banner with art-directed desktop & mobile
 * imagery, legibility scrims, Cormorant Garamond headline, and dual CTAs.
 */
export function HeroBanner() {
  return (
    <section
      aria-label="ZAVERA Editorial Campaign"
      className="relative w-full overflow-hidden border-b border-[#E5DDD0] bg-[#F3ECE1]"
    >
      {/* Art-directed Photography Layer */}
      <div className="relative h-[580px] w-full sm:h-[640px] md:h-[580px] lg:h-[640px] xl:h-[690px]">
        {/* Desktop wide campaign image (1376x768) */}
        <img
          src="/images/hero-desktop.png"
          alt="ZAVERA 22KT heritage gold temple choker and lab-grown diamond solitaire pendant on warm linen"
          loading="eager"
          decoding="sync"
          className="hidden h-full w-full object-cover object-[72%_center] md:block"
        />

        {/* Mobile portrait campaign image (896x1200) */}
        <img
          src="/images/hero-mobile.png"
          alt="ZAVERA sculptural 22KT gold choker, diamond solitaire stud, and fine gold bangle on travertine stone"
          loading="eager"
          decoding="sync"
          className="h-full w-full object-cover object-center md:hidden"
        />

        {/* Legibility Scrim: bottom espresso wash on mobile, left warm ivory wash on desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1514]/92 via-[#1C1514]/55 via-45% to-transparent md:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#FAF7F2]/96 via-[#FAF7F2]/80 via-45% to-transparent md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-[#FAF7F2]/40 to-transparent md:block"
        />

        {/* Editorial Typography & Dual CTAs */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-9 sm:px-6 sm:pb-12 md:justify-center md:pb-0 lg:px-8">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E5C77A] md:text-[#AE8439]">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              <span>ZAVERA House of Fine &amp; Demi-Fine</span>
            </p>

            <h1 className="mt-3 font-serif text-[42px] font-normal leading-[1.04] tracking-tight text-[#FAF7F2] sm:text-5xl md:text-[58px] lg:text-[64px] md:text-[#1C1514]">
              Heirloom Craft.{' '}
              <span className="block italic text-[#E5C77A] md:text-[#7A1E2C]">
                Everyday Radiance.
              </span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#FAF7F2]/85 sm:text-[15px] md:text-[#5C504A]">
              Ceremonial BIS 916 gold nakshi, IGI-certified EF-VVS lab-grown
              diamonds, and 2.5-micron waterproof vermeil stacks—priced with
              live bullion transparency.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/collections/aarohi"
                className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#FAF7F2] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1C1514] transition-colors hover:bg-[#C69C4D] md:bg-[#1C1514] md:text-[#FAF7F2] md:hover:bg-[#AE8439]"
              >
                <span>Explore Fine Jewellery</span>
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              </Link>

              <Link
                href="/collections/solis"
                className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-[#FAF7F2]/60 bg-[#1C1514]/45 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] backdrop-blur-[2px] transition-colors hover:border-[#C69C4D] hover:bg-[#1C1514]/70 md:border-[#1C1514] md:bg-[#FFFFFF]/85 md:text-[#1C1514] md:hover:bg-[#1C1514] md:hover:text-[#FAF7F2]"
              >
                <span>Shop Demi-Fine Stacks</span>
              </Link>
            </div>
          </div>

          {/* Discreet Desktop Editorial Caption */}
          <div className="absolute bottom-5 right-6 hidden items-center gap-3 border border-[#E5DDD0] bg-[#FAF7F2]/90 px-3.5 py-2 backdrop-blur-sm lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C69C4D]" aria-hidden="true" />
            <Link
              href="/product/aarohi-temple-nakshi-choker"
              className="text-[11px] tracking-[0.06em] text-[#5C504A] transition-colors hover:text-[#1C1514]"
            >
              Featured Look: <strong className="font-medium text-[#1C1514]">Aarohi Nakshi Choker</strong> &amp;{' '}
              <strong className="font-medium text-[#1C1514]">Noor Solitaire</strong> →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
