'use client';

import React, { useEffect, useState } from 'react';
import {
  Award,
  Maximize2,
  RotateCcw,
  ShieldCheck,
  Truck,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CollectionInfo, Product } from '@/types/store';
import { CertificationBadge } from '@/components/ui/CertificationBadge';
import { SafeProductImage } from '@/components/ui/SafeProductImage';

export interface ProductGalleryProps {
  product: Product;
  collection?: CollectionInfo;
}

interface GalleryView {
  id: string;
  label: string;
  src: string;
  alt: string;
  isMacroCrop?: boolean;
}

/**
 * Sticky 4:5 luxury studio gallery with multi-view thumbnails,
 * interactive lightbox zoom modal, certification badges, and house guarantees.
 */
export function ProductGallery({ product, collection }: ProductGalleryProps) {
  const views: GalleryView[] = [
    {
      id: 'studio',
      label: 'Studio View',
      src: product.images[0],
      alt: `${product.name} — studio view`,
    },
    {
      id: 'macro',
      label: 'Craft Detail',
      src: product.images[0],
      alt: `${product.name} — macro craftsmanship detail`,
      isMacroCrop: true,
    },
    ...(collection?.heroImage
      ? [
          {
            id: 'editorial',
            label: `${collection.name} Mood`,
            src: collection.heroImage,
            alt: `${collection.name} collection campaign styling`,
          },
        ]
      : []),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<1 | 1.8 | 2.5>(1.8);
  const [panOrigin, setPanOrigin] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  const activeView = views[activeIndex] ?? views[0];

  useEffect(() => {
    if (!zoomOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomOpen(false);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomOpen]);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.max(
      0,
      Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)
    );
    setPanOrigin({ x, y });
  };

  const openZoomModal = () => {
    setZoomLevel(1.8);
    setPanOrigin({ x: 50, y: 50 });
    setZoomOpen(true);
  };

  const isSolis = product.collection === 'solis';

  return (
    <>
      <div className="lg:sticky lg:top-28">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
          {/* Multi-View Thumbnails */}
          <div
            className="flex gap-2.5 sm:w-20 sm:flex-col"
            role="tablist"
            aria-label="Product gallery views"
          >
            {views.map((view, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={view.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-[2px] border bg-[#F3ECE1] transition-colors sm:w-full ${
                    isSelected
                      ? 'border-[#C69C4D] ring-1 ring-[#C69C4D]'
                      : 'border-[#E5DDD0] opacity-80 hover:border-[#8C7E75] hover:opacity-100'
                  }`}
                >
                  <div
                    className={`h-full w-full ${
                      view.isMacroCrop ? 'scale-150' : ''
                    }`}
                  >
                    <SafeProductImage
                      src={view.src}
                      alt={view.alt}
                      categoryLabel={view.label}
                    />
                  </div>
                  <span className="absolute inset-x-0 bottom-0 bg-[#1C1514]/75 px-1 py-0.5 text-center text-[9px] font-medium uppercase tracking-[0.08em] text-[#FAF7F2]">
                    {view.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Primary 4:5 Showcase Frame */}
          <div className="relative flex-1">
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#F3ECE1]">
              <button
                type="button"
                onClick={openZoomModal}
                aria-label={`Zoom into ${product.name}`}
                className="block h-full w-full cursor-zoom-in text-left focus:outline-none"
              >
                <div
                  className={`h-full w-full transition-transform duration-700 ease-out ${
                    activeView.isMacroCrop
                      ? 'scale-[1.38] group-hover:scale-[1.45]'
                      : 'group-hover:scale-[1.03]'
                  }`}
                >
                  <SafeProductImage
                    key={activeView.src}
                    src={activeView.src}
                    alt={activeView.alt}
                    categoryLabel={product.category}
                    priority
                  />
                </div>
              </button>

              {/* Top-left Certification Pills */}
              <div className="pointer-events-none absolute left-3 top-3 flex max-w-[calc(100%-5rem)] flex-wrap gap-1.5">
                {product.certifications.map((cert) => (
                  <CertificationBadge key={cert} label={cert} size="sm" />
                ))}
              </div>

              {/* Zoom Trigger Button */}
              <button
                type="button"
                onClick={openZoomModal}
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF]/95 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#1C1514] shadow-sm backdrop-blur-sm transition-colors hover:border-[#C69C4D] hover:bg-[#FAF7F2]"
              >
                <Maximize2
                  className="h-3.5 w-3.5 text-[#C69C4D]"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span>Inspect</span>
              </button>

              {/* Active View Caption */}
              <div className="pointer-events-none absolute bottom-3 left-3">
                <span className="rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2]/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#5C504A] backdrop-blur-sm">
                  {activeView.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hallmark & House Guarantee Highlights */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <div className="flex items-start gap-2.5 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3">
            <ShieldCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-[#2E6B4E]"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-[#1C1514]">
                {isSolis ? '1-Yr Anti-Tarnish' : 'Assay & HUID Verified'}
              </p>
              <p className="mt-0.5 text-[11px] text-[#8C7E75]">
                {isSolis
                  ? 'Waterproof 2.5-micron 18K vermeil'
                  : '100% certified purity dossier'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3">
            <Truck
              className="mt-0.5 h-4 w-4 shrink-0 text-[#C69C4D]"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-[#1C1514]">
                Insured Sequel Transit
              </p>
              <p className="mt-0.5 text-[11px] text-[#8C7E75]">
                Complimentary armoured delivery
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-3">
            <Award
              className="mt-0.5 h-4 w-4 shrink-0 text-[#C69C4D]"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-[#1C1514]">
                {isSolis ? '15-Day Easy Returns' : '100% Lifetime Exchange'}
              </p>
              <p className="mt-0.5 text-[11px] text-[#8C7E75]">
                {isSolis
                  ? 'Hassle-free exchange or refund'
                  : 'Full prevailing metal rate credit'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Zoom Lightbox Modal */}
      <AnimatePresence>
        {zoomOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} Zoom Inspector`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setZoomOpen(false)}
              className="fixed inset-0 bg-[#1C1514]/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] shadow-2xl"
            >
              <header className="flex items-center justify-between border-b border-[#E5DDD0] bg-[#FFFFFF] px-4 py-3 sm:px-6">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#8C7E75]">
                    Atelier Zoom Loupe · {activeView.label}
                  </p>
                  <h3 className="font-serif text-xl font-medium text-[#1C1514]">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden items-center gap-1 rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] p-0.5 sm:flex">
                    {([1, 1.8, 2.5] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setZoomLevel(level)}
                        className={`rounded-[2px] px-2.5 py-1 text-xs font-medium tabular-nums transition-colors ${
                          zoomLevel === level
                            ? 'bg-[#1C1514] text-[#FAF7F2]'
                            : 'text-[#5C504A] hover:text-[#1C1514]'
                        }`}
                      >
                        {level}×
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setZoomLevel((prev) =>
                        prev === 1 ? 1.8 : prev === 1.8 ? 2.5 : 1
                      )
                    }
                    aria-label="Cycle magnification"
                    className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#1C1514] hover:border-[#C69C4D] sm:hidden"
                  >
                    {zoomLevel > 1 ? (
                      <ZoomOut className="h-4 w-4" />
                    ) : (
                      <ZoomIn className="h-4 w-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setZoomLevel(1);
                      setPanOrigin({ x: 50, y: 50 });
                    }}
                    aria-label="Reset zoom"
                    className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#5C504A] hover:border-[#1C1514] hover:text-[#1C1514]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setZoomOpen(false)}
                    aria-label="Close zoom inspector"
                    className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#5C504A] hover:border-[#1C1514] hover:text-[#1C1514]"
                  >
                    <X className="h-4 w-4" strokeWidth={1.6} />
                  </button>
                </div>
              </header>

              <div
                onMouseMove={handlePointerMove}
                onClick={() =>
                  setZoomLevel((prev) =>
                    prev === 1 ? 1.8 : prev === 1.8 ? 2.5 : 1
                  )
                }
                className={`relative aspect-[4/5] max-h-[74vh] w-full overflow-hidden bg-[#F3ECE1] ${
                  zoomLevel > 1 ? 'cursor-move' : 'cursor-zoom-in'
                }`}
              >
                <div
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: `${panOrigin.x}% ${panOrigin.y}%`,
                  }}
                  className="h-full w-full transition-transform duration-150 ease-out"
                >
                  <SafeProductImage
                    key={`zoom-${activeView.src}`}
                    src={activeView.src}
                    alt={activeView.alt}
                    categoryLabel={product.category}
                  />
                </div>
              </div>

              <footer className="flex items-center justify-between border-t border-[#E5DDD0] bg-[#FFFFFF] px-4 py-2.5 text-[11px] text-[#8C7E75] sm:px-6">
                <span>
                  Move cursor to inspect craft details · Click canvas to cycle
                  magnification
                </span>
                <span className="font-medium text-[#1C1514] tabular-nums">
                  {zoomLevel}× Loupe
                </span>
              </footer>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
