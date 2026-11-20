'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Ruler, X } from 'lucide-react';

export interface RingSizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  selectedSize?: number;
  onSelectSize?: (size: number) => void;
}

const INDIAN_RING_SIZE_CHART: {
  indianSize: number;
  diameterMm: string;
  circumferenceMm: string;
  fitNote: string;
}[] = [
  { indianSize: 10, diameterMm: '15.9', circumferenceMm: '50.0', fitNote: 'Petite' },
  { indianSize: 11, diameterMm: '16.2', circumferenceMm: '50.9', fitNote: 'Petite' },
  { indianSize: 12, diameterMm: '16.5', circumferenceMm: '51.9', fitNote: 'Standard S' },
  { indianSize: 13, diameterMm: '16.8', circumferenceMm: '52.8', fitNote: 'Standard S/M' },
  { indianSize: 14, diameterMm: '17.2', circumferenceMm: '54.0', fitNote: 'Most Popular' },
  { indianSize: 15, diameterMm: '17.5', circumferenceMm: '55.0', fitNote: 'Standard M' },
  { indianSize: 16, diameterMm: '17.8', circumferenceMm: '55.9', fitNote: 'Standard M/L' },
  { indianSize: 17, diameterMm: '18.1', circumferenceMm: '56.9', fitNote: 'Standard L' },
  { indianSize: 18, diameterMm: '18.5', circumferenceMm: '58.1', fitNote: 'Relaxed' },
  { indianSize: 19, diameterMm: '18.8', circumferenceMm: '59.1', fitNote: 'Extended' },
  { indianSize: 20, diameterMm: '19.1', circumferenceMm: '60.0', fitNote: 'Extended' },
];

/**
 * Interactive Indian Ring Size (10-20) guide modal with diameter & circumference
 * conversion table and one-click size selection.
 */
export function RingSizeGuideModal({
  open,
  onClose,
  selectedSize,
  onSelectSize,
}: RingSizeGuideModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Indian Ring Size Guide"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1514]/55 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#1C1514] shadow-2xl"
          >
            <header className="flex items-start justify-between border-b border-[#E5DDD0] bg-[#FFFFFF] px-5 py-4 sm:px-6">
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#AE8439]">
                  <Ruler className="h-3.5 w-3.5" strokeWidth={1.7} />
                  <span>PIXTACY Salon Sizing Standard</span>
                </p>
                <h2 className="mt-1 font-serif text-2xl font-medium text-[#1C1514]">
                  Indian Ring Size Guide (10–20)
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close ring size guide"
                className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#5C504A] hover:border-[#1C1514] hover:text-[#1C1514]"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="mb-4 grid grid-cols-1 gap-3 rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF] p-4 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                    1. Existing Ring Method
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#5C504A]">
                    Place a comfortable ring on a ruler and measure the internal
                    edge-to-edge diameter in millimetres.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1C1514]">
                    2. Ribbon / Strip Method
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#5C504A]">
                    Wrap a non-stretch paper strip around your finger base at
                    room temperature, mark the overlap, and match circumference.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF]">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5DDD0] bg-[#F3ECE1]/60 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5C504A]">
                      <th className="px-4 py-3">Indian Size</th>
                      <th className="px-4 py-3">Inner Diameter</th>
                      <th className="px-4 py-3">Circumference</th>
                      <th className="px-4 py-3">Notes</th>
                      {onSelectSize ? (
                        <th className="px-4 py-3 text-right">Select</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DDD0]">
                    {INDIAN_RING_SIZE_CHART.map((row) => {
                      const isCurrent = selectedSize === row.indianSize;
                      return (
                        <tr
                          key={row.indianSize}
                          className={
                            isCurrent
                              ? 'bg-[#F3ECE1]/70 font-medium text-[#1C1514]'
                              : 'hover:bg-[#FAF7F2]'
                          }
                        >
                          <td className="px-4 py-2.5 font-semibold text-[#1C1514] tabular-nums">
                            Size {row.indianSize}
                          </td>
                          <td className="px-4 py-2.5 text-[#5C504A] tabular-nums">
                            {row.diameterMm} mm
                          </td>
                          <td className="px-4 py-2.5 text-[#5C504A] tabular-nums">
                            {row.circumferenceMm} mm
                          </td>
                          <td className="px-4 py-2.5 text-[11px] text-[#8C7E75]">
                            {row.fitNote}
                          </td>
                          {onSelectSize ? (
                            <td className="px-4 py-2.5 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  onSelectSize(row.indianSize);
                                  onClose();
                                }}
                                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors tabular-nums ${
                                  isCurrent
                                    ? 'border-[#C69C4D] bg-[#1C1514] text-[#FAF7F2]'
                                    : 'border-[#E5DDD0] bg-[#FAF7F2] text-[#1C1514] hover:border-[#C69C4D]'
                                }`}
                              >
                                {isCurrent ? 'Selected' : `Choose ${row.indianSize}`}
                              </button>
                            </td>
                          ) : null}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-[11px] text-[#8C7E75]">
                Complimentary first resizing within 30 days on 18KT &amp; 22KT
                solitaire and signet rings (excluding 360° full-eternity bands).
              </p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
