import React from 'react';
import { HeroBanner } from '@/components/home/HeroBanner';
import { TrustRibbon } from '@/components/home/TrustRibbon';
import { CategoryStrip } from '@/components/home/CategoryStrip';
import { CollectionEditorialGrid } from '@/components/home/CollectionEditorialGrid';
import { BestsellersShowcase } from '@/components/home/BestsellersShowcase';
import { OccasionTierShelf } from '@/components/home/OccasionTierShelf';
import { ShopTheLookSection } from '@/components/home/ShopTheLookSection';
import { AtelierConciergeBanner } from '@/components/home/AtelierConciergeBanner';

/**
 * PIXTACY Luxury Jewellery Storefront Homepage combining editorial storytelling,
 * live gold-rate merchandising, occasion filtering, and Shop the Look hotspots.
 */
export default function HomePage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1C1514]">
      <HeroBanner />
      <TrustRibbon />
      <CategoryStrip />
      <CollectionEditorialGrid />
      <BestsellersShowcase />
      <OccasionTierShelf />
      <ShopTheLookSection />
      <AtelierConciergeBanner />
    </div>
  );
}
