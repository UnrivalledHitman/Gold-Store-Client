'use client';

import React, { useState } from 'react';

export interface SafeProductImageProps {
  src?: string;
  alt: string;
  categoryLabel?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders product photography inside a #F3ECE1 champagne frame with an editorial
 * monogram fallback if the image asset is not yet available.
 */
export function SafeProductImage({
  src,
  alt,
  categoryLabel,
  priority = false,
  className = '',
}: SafeProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-[#F3ECE1] px-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-serif text-lg tracking-[0.3em] text-[#8C7E75]">
          PIXTACY
        </span>
        {categoryLabel ? (
          <span className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-[#8C7E75]/80">
            {categoryLabel}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setHasError(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
