import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CatalogClient } from '@/components/catalog/CatalogClient';
import { CatalogSkeleton } from '@/components/catalog/CatalogSkeleton';

export const metadata: Metadata = {
  title: 'All Collections — ZAVERA',
  description:
    'Browse ZAVERA’s complete curation of BIS 916 Heritage 22KT gold, IGI-certified EF-VVS lab-grown diamonds, everyday 18KT gold, and waterproof 18K gold vermeil.',
};

export default function CollectionsPage() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogClient />
    </Suspense>
  );
}
