import React from 'react';
import { Award, Droplets, Gem, ShieldCheck } from 'lucide-react';

export interface CertificationBadgeProps {
  label: string;
  variant?: 'ivory' | 'dark' | 'emerald' | 'gold' | 'subtle';
  size?: 'xs' | 'sm';
  showIcon?: boolean;
  className?: string;
}

function getBadgeIcon(label: string) {
  const lower = label.toLowerCase();
  if (
    lower.includes('waterproof') ||
    lower.includes('sweatproof') ||
    lower.includes('anti-tarnish')
  ) {
    return Droplets;
  }
  if (lower.includes('igi') || lower.includes('diamond')) {
    return Gem;
  }
  if (lower.includes('heritage')) {
    return Award;
  }
  return ShieldCheck;
}

function resolveVariant(
  label: string,
  explicitVariant?: CertificationBadgeProps['variant']
): NonNullable<CertificationBadgeProps['variant']> {
  if (explicitVariant) return explicitVariant;
  const lower = label.toLowerCase();
  if (
    lower.includes('waterproof') ||
    lower.includes('sweatproof') ||
    lower.includes('anti-tarnish')
  ) {
    return 'emerald';
  }
  if (lower.includes('igi')) {
    return 'gold';
  }
  return 'ivory';
}

const VARIANT_CLASSES: Record<
  NonNullable<CertificationBadgeProps['variant']>,
  string
> = {
  ivory: 'border-[#E5DDD0] bg-[#FAF7F2]/95 text-[#1C1514]',
  dark: 'border-[#1C1514] bg-[#1C1514] text-[#FAF7F2]',
  emerald: 'border-[#2E6B4E]/30 bg-[#FAF7F2]/95 text-[#2E6B4E]',
  gold: 'border-[#C69C4D]/45 bg-[#FAF7F2]/95 text-[#8A6623]',
  subtle: 'border-[#E5DDD0] bg-[#F3ECE1] text-[#5C504A]',
};

/**
 * Editorial certification pill for BIS 916/750 hallmarks, IGI dossiers,
 * and Solis waterproof guarantees.
 */
export function CertificationBadge({
  label,
  variant,
  size = 'sm',
  showIcon = true,
  className = '',
}: CertificationBadgeProps) {
  const resolved = resolveVariant(label, variant);
  const Icon = getBadgeIcon(label);
  const sizeClass =
    size === 'xs'
      ? 'px-2 py-0.5 text-[10px] tracking-[0.06em]'
      : 'px-2.5 py-1 text-[11px] tracking-[0.08em]';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium uppercase backdrop-blur-[2px] ${sizeClass} ${VARIANT_CLASSES[resolved]} ${className}`}
    >
      {showIcon ? (
        <Icon
          className={size === 'xs' ? 'h-2.5 w-2.5 shrink-0' : 'h-3 w-3 shrink-0'}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      ) : null}
      <span className="truncate">{label}</span>
    </span>
  );
}
