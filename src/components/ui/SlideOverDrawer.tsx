'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export interface SlideOverDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  side?: 'left' | 'right';
  maxWidthClass?: string;
  ariaLabel?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Shared slide-over drawer primitive handling ESC dismissal, body scroll lock,
 * backdrop click, and ZAVERA's crisp 0-2px architectural border system.
 */
export function SlideOverDrawer({
  open,
  onClose,
  title,
  subtitle,
  badge,
  side = 'right',
  maxWidthClass = 'max-w-md',
  ariaLabel,
  footer,
  children,
}: SlideOverDrawerProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const initialX = side === 'right' ? '100%' : '-100%';
  const alignmentClass = side === 'right' ? 'justify-end' : 'justify-start';
  const borderClass =
    side === 'right' ? 'border-l border-[#E5DDD0]' : 'border-r border-[#E5DDD0]';

  return (
    <AnimatePresence>
      {open ? (
        <div
          className={`fixed inset-0 z-50 flex ${alignmentClass}`}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel ?? title}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1514]/50 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: initialX }}
            animate={{ x: 0 }}
            exit={{ x: initialX }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            className={`relative z-10 flex h-full w-full ${maxWidthClass} flex-col bg-[#FAF7F2] text-[#1C1514] shadow-2xl ${borderClass}`}
          >
            <header className="flex items-start justify-between border-b border-[#E5DDD0] bg-[#FFFFFF] px-5 py-4 sm:px-6">
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-serif text-2xl font-medium tracking-tight text-[#1C1514]">
                    {title}
                  </h2>
                  {badge ? (
                    <span className="rounded-full border border-[#E5DDD0] bg-[#F3ECE1] px-2.5 py-0.5 text-[11px] font-medium text-[#5C504A] tabular-nums">
                      {badge}
                    </span>
                  ) : null}
                </div>
                {subtitle ? (
                  <p className="mt-0.5 text-xs text-[#8C7E75]">{subtitle}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${title}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#5C504A] transition-colors hover:border-[#1C1514] hover:text-[#1C1514]"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              {children}
            </div>

            {footer ? (
              <footer className="border-t border-[#E5DDD0] bg-[#FFFFFF] px-5 py-4 sm:px-6">
                {footer}
              </footer>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
