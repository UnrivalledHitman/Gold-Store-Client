import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Product } from '@/types/store';
import {
  COLLECTIONS,
  PRODUCTS,
  getProductById,
  getProductBySlug,
} from '@/data/products';
import { ProductDetailClient } from '@/components/pdp/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Piece Not Found — ZAVERA',
    };
  }

  return {
    title: `${product.name} — ${product.tier} | ZAVERA`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const collection = COLLECTIONS.find((c) => c.slug === product.collection);
  const completeTheLookProducts = product.completeTheLookIds
    .map((id) => getProductById(id))
    .filter((item): item is Product => Boolean(item));

  return (
    <ProductDetailClient
      product={product}
      collection={collection}
      completeTheLookProducts={completeTheLookProducts}
    />
  );
}
