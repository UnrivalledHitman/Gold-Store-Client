'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

/**
 * Global storefront toast notification synced to StoreContext toastMessage.
 */
export function ToastBanner() {
  const { toastMessage } = useStore();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex justify-center px-4 sm:bottom-6"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toastMessage ? (
          <motion.div
            key={toastMessage}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="pointer-events-auto flex items-center gap-2.5 rounded-[2px] border border-[#C69C4D]/45 bg-[#1C1514] px-4 py-2.5 text-xs font-medium tracking-wide text-[#FAF7F2] shadow-xl sm:px-5 sm:text-[13px]"
          >
            <CheckCircle2
              className="h-4 w-4 shrink-0 text-[#C69C4D]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span>{toastMessage}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
