'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Heart, Menu, Search, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SlideOverDrawer } from '@/components/ui/SlideOverDrawer';

interface NavItem {
  label: string;
  href: string;
  subtitle?: string;
}

const PRIMARY_NAV: NavItem[] = [
  { label: 'Collections', href: '/collections', subtitle: 'All 18 Atelier Pieces' },
  {
    label: 'Heritage 22KT',
    href: '/collections/aarohi',
    subtitle: 'Aarohi · BIS 916 & Polki',
  },
  {
    label: 'Lab Diamonds',
    href: '/collections/noor',
    subtitle: 'Noor · IGI EF-VVS Diamonds',
  },
  {
    label: 'Everyday 18KT',
    href: '/collections/saanjh',
    subtitle: 'Saanjh · Solid Fine Gold',
  },
  {
    label: 'Demi-Fine',
    href: '/collections/solis',
    subtitle: 'Solis · Waterproof 18K Vermeil',
  },
  {
    label: 'Gifting',
    href: '/collections?occasion=Gifting',
    subtitle: 'Curated Keepsakes & Gift Boxes',
  },
];

/**
 * Sticky PIXTACY storefront header with centered serif wordmark,
 * primary collection nav, Cmd/Ctrl+K search, live Wishlist & Bag triggers,
 * and responsive Mobile Menu drawer.
 */
export function Header() {
  const pathname = usePathname();
  const {
    mounted,
    cartCount,
    wishlist,
    isSearchOpen,
    openSearch,
    closeSearch,
    openWishlist,
    openCart,
    openBookingModal,
    openPitchDrawer,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setMobileMenuOpen(false);
        if (isSearchOpen) {
          closeSearch();
        } else {
          openSearch();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isSearchOpen, openSearch, closeSearch]);

  const wishlistCount = mounted ? wishlist.length : 0;
  const bagCount = mounted ? cartCount : 0;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E5DDD0] bg-[#FAF7F2]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid h-16 grid-cols-3 items-center">
            {/* Left controls: Mobile menu + Desktop Search trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] text-[#1C1514] transition-colors hover:border-[#C69C4D] lg:hidden"
              >
                <Menu className="h-4 w-4" strokeWidth={1.6} />
              </button>

              <button
                type="button"
                onClick={openSearch}
                aria-label="Search jewellery (Ctrl+K)"
                className="flex h-9 items-center gap-2 rounded-[2px] border border-transparent px-2 text-[#1C1514] transition-colors hover:border-[#E5DDD0] hover:bg-[#FFFFFF] lg:border-[#E5DDD0] lg:bg-[#FFFFFF] lg:px-3"
              >
                <Search className="h-4 w-4 text-[#5C504A]" strokeWidth={1.6} />
                <span className="hidden text-xs text-[#5C504A] lg:inline">
                  Search pieces
                </span>
                <kbd className="hidden rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] px-1.5 py-0.5 font-sans text-[10px] text-[#8C7E75] lg:inline">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Center serif wordmark */}
            <div className="flex justify-center">
              <Link
                href="/"
                className="font-serif text-[23px] font-medium tracking-[0.38em] text-[#1C1514] transition-colors hover:text-[#AE8439] sm:text-[28px]"
                aria-label="PIXTACY Home"
              >
                PIXTACY
              </Link>
            </div>

            {/* Right utilities: Wishlist & Bag */}
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <button
                type="button"
                onClick={openBookingModal}
                className="hidden items-center gap-1.5 rounded-[2px] px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#5C504A] transition-colors hover:text-[#1C1514] xl:inline-flex"
              >
                <Calendar className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.6} />
                <span>Salons</span>
              </button>

              <button
                type="button"
                onClick={openWishlist}
                aria-label={`Open wishlist (${wishlistCount} saved)`}
                className="relative flex h-9 items-center gap-1.5 rounded-[2px] border border-transparent px-2 text-[#1C1514] transition-colors hover:border-[#E5DDD0] hover:bg-[#FFFFFF]"
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
                <span className="hidden text-xs font-medium text-[#5C504A] md:inline">
                  Wishlist
                </span>
                {wishlistCount > 0 ? (
                  <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#7A1E2C] px-1 text-[10px] font-semibold text-[#FAF7F2] tabular-nums">
                    {wishlistCount}
                  </span>
                ) : null}
              </button>

              <button
                type="button"
                onClick={openCart}
                aria-label={`Open shopping bag (${bagCount} items)`}
                className="relative flex h-9 items-center gap-1.5 rounded-[2px] border border-[#1C1514] bg-[#1C1514] px-2.5 text-[#FAF7F2] transition-colors hover:border-[#AE8439] hover:bg-[#AE8439] sm:px-3"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
                <span className="hidden text-xs font-medium tracking-wide sm:inline">
                  Bag
                </span>
                <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#C69C4D] px-1 text-[10px] font-semibold text-[#1C1514] tabular-nums">
                  {bagCount}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop secondary nav row */}
          <nav
            aria-label="Primary Collections"
            className="hidden items-center justify-center gap-7 border-t border-[#E5DDD0]/70 py-2.5 lg:flex xl:gap-9"
          >
            {PRIMARY_NAV.map((item) => {
              const baseHref = item.href.split('?')[0];
              const isActive =
                item.href === '/collections'
                  ? pathname === '/collections'
                  : item.href.includes('?')
                  ? false
                  : pathname === baseHref;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-0.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? 'text-[#1C1514]'
                      : 'text-[#5C504A] hover:text-[#1C1514]'
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <span
                      className="absolute inset-x-0 -bottom-2.5 h-[2px] bg-[#C69C4D]"
                      aria-hidden="true"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <SlideOverDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        side="left"
        title="Z A V E R A"
        subtitle="Heirloom Craft · Everyday Radiance"
        maxWidthClass="max-w-sm"
      >
        <div className="flex flex-col gap-6">
          <nav aria-label="Mobile Navigation" className="divide-y divide-[#E5DDD0] border-y border-[#E5DDD0]">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col py-3.5 transition-colors hover:bg-[#F3ECE1]/60"
              >
                <span className="font-serif text-xl font-medium text-[#1C1514]">
                  {item.label}
                </span>
                {item.subtitle ? (
                  <span className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-[#8C7E75]">
                    {item.subtitle}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#1C1514] px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-[#AE8439]"
            >
              <Calendar className="h-4 w-4 text-[#C69C4D]" strokeWidth={1.6} />
              <span>Book Salon / Video Call</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openSearch();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#1C1514] transition-colors hover:border-[#1C1514]"
            >
              <Search className="h-3.5 w-3.5" strokeWidth={1.6} />
              <span>Search Catalogue</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openPitchDrawer();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-[2px] border border-[#C69C4D]/40 bg-[#F3ECE1] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#5C504A] transition-colors hover:text-[#1C1514]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#C69C4D]" strokeWidth={1.6} />
              <span>Client Pitch Console</span>
            </button>
          </div>
        </div>
      </SlideOverDrawer>
    </>
  );
}
