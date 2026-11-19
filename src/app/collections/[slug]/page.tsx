import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COLLECTIONS } from '@/data/products';
import { CatalogClient } from '@/components/catalog/CatalogClient';
import { CatalogSkeleton } from '@/components/catalog/CatalogSkeleton';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    return {
      title: 'Collection Not Found — ZAVERA',
    };
  }

  return {
    title: `${collection.name} Collection — ${collection.tagline} | ZAVERA`,
    description: collection.description,
  };
}

export default async function CollectionSlugPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  return (
    <Suspense fallback={<CatalogSkeleton hasCollectionBanner />}>
      <CatalogClient lockedCollection={collection} />
    </Suspense>
  );
}
