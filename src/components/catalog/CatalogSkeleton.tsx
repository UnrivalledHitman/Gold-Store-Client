import React from 'react';

export interface CatalogSkeletonProps {
  hasCollectionBanner?: boolean;
}

/**
 * Hydration-safe Suspense fallback skeleton matching the PIXTACY PLP layout.
 */
export function CatalogSkeleton({
  hasCollectionBanner = false,
}: CatalogSkeletonProps) {
  return (
    <div className="min-h-[70vh] bg-[#FAF7F2]">
      <div className="border-b border-[#E5DDD0] bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-3 w-36 bg-[#E5DDD0]/60" />
          <div
            className={`mt-4 grid grid-cols-1 gap-8 ${
              hasCollectionBanner ? 'lg:grid-cols-12' : ''
            }`}
          >
            <div className="space-y-3 lg:col-span-6">
              <div className="h-10 w-72 bg-[#E5DDD0]/70" />
              <div className="h-4 w-full max-w-lg bg-[#E5DDD0]/50" />
              <div className="h-4 w-2/3 max-w-md bg-[#E5DDD0]/40" />
            </div>
            {hasCollectionBanner ? (
              <div className="aspect-[16/10] w-full rounded-[2px] bg-[#F3ECE1] lg:col-span-6" />
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-12 w-full rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF]" />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-[2px] border border-[#E5DDD0] bg-[#FFFFFF]"
            >
              <div className="aspect-[4/5] w-full bg-[#F3ECE1]" />
              <div className="space-y-2.5 p-4">
                <div className="h-3 w-28 bg-[#E5DDD0]/60" />
                <div className="h-5 w-44 bg-[#E5DDD0]/70" />
                <div className="h-9 w-full bg-[#F3ECE1]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
