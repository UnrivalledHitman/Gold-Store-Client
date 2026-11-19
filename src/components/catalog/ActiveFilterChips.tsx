'use client';

import React from 'react';
import { X } from 'lucide-react';
import type { ActiveFilterChip } from '@/components/catalog/catalogFilters';

export interface ActiveFilterChipsProps {
  chips: ActiveFilterChip[];
  onRemoveChip: (chip: ActiveFilterChip) => void;
  onClearAll: () => void;
}

/**
 * Removable active filter pill bar + Clear All control.
 */
export function ActiveFilterChips({
  chips,
  onRemoveChip,
  onClearAll,
}: ActiveFilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div
      aria-label="Active filters"
      className="flex flex-wrap items-center gap-2 border-b border-[#E5DDD0] bg-[#FAF7F2] py-3"
    >
      <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8C7E75]">
        Active:
      </span>

      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => onRemoveChip(chip)}
          className="group inline-flex items-center gap-1.5 rounded-full border border-[#E5DDD0] bg-[#FFFFFF] px-3 py-1 text-xs text-[#1C1514] transition-colors hover:border-[#C69C4D] hover:bg-[#F3ECE1]/60"
          aria-label={`Remove ${chip.facetLabel} filter ${chip.displayLabel}`}
        >
          <span className="text-[10px] uppercase tracking-[0.08em] text-[#8C7E75]">
            {chip.facetLabel}:
          </span>
          <span className="font-medium">{chip.displayLabel}</span>
          <X
            className="h-3 w-3 text-[#8C7E75] transition-colors group-hover:text-[#7A1E2C]"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="ml-1 text-xs font-medium text-[#7A1E2C] underline decoration-[#7A1E2C]/40 underline-offset-4 transition-colors hover:text-[#1C1514]"
      >
        Clear All
      </button>
    </div>
  );
}
