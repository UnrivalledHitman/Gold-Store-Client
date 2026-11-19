import React from 'react';
import {
  Droplets,
  Gem,
  RefreshCw,
  ShieldCheck,
  Truck,
} from 'lucide-react';

interface AssuranceItem {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const ASSURANCES: AssuranceItem[] = [
  {
    title: 'BIS 916 Hallmarked',
    subtitle: 'HUID Laser-Verified Purity',
    icon: ShieldCheck,
  },
  {
    title: 'IGI Certified Lab-Grown',
    subtitle: 'EF-VVS Type IIa Diamonds',
    icon: Gem,
  },
  {
    title: '100% Lifetime Exchange',
    subtitle: 'Transparent Bullion Buyback',
    icon: RefreshCw,
  },
  {
    title: 'Waterproof Guarantee',
    subtitle: '1-Yr Anti-Tarnish Vermeil',
    icon: Droplets,
  },
  {
    title: 'Insured Express Delivery',
    subtitle: 'Complimentary Pan-India Sequel',
    icon: Truck,
  },
];

/**
 * Section 2: 5-column Luxury Trust Assurance Ribbon separated by #E5DDD0 hairlines.
 */
export function TrustRibbon() {
  return (
    <section
      aria-label="ZAVERA House Guarantees"
      className="border-b border-[#E5DDD0] bg-[#FFFFFF]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 md:divide-x md:divide-[#E5DDD0]">
          {ASSURANCES.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === ASSURANCES.length - 1;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-2.5 border-b border-[#E5DDD0] py-4 md:border-b-0 md:px-3 md:py-5 lg:gap-3 lg:px-5 ${
                  idx % 2 === 0 ? 'border-r pr-3 md:border-r-0 md:pr-3' : 'pl-3 md:pl-3 lg:pl-5'
                } ${isLast ? 'col-span-2 border-b-0 border-r-0 md:col-span-1' : ''}`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-[#E5DDD0] bg-[#FAF7F2] text-[#C69C4D]">
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.02em] text-[#1C1514]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-[#8C7E75]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
