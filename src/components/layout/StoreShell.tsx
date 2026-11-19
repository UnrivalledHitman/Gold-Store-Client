'use client';

import React from 'react';
import { GoldRateTicker } from '@/components/layout/GoldRateTicker';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { WishlistDrawer } from '@/components/layout/WishlistDrawer';
import { BagDrawer } from '@/components/layout/BagDrawer';
import { BoutiqueBookingModal } from '@/components/layout/BoutiqueBookingModal';
import { ClientPitchDrawer } from '@/components/layout/ClientPitchDrawer';
import { ToastBanner } from '@/components/ui/ToastBanner';

/**
 * Global storefront layout shell enclosing all App Router pages with
 * ticker, sticky header, footer, drawers, modals, Pitch console, and toasts.
 */
export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <GoldRateTicker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <SearchOverlay />
      <WishlistDrawer />
      <BagDrawer />
      <BoutiqueBookingModal />
      <ClientPitchDrawer />
      <ToastBanner />
    </div>
  );
}
