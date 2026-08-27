'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ZoomWrapperProps {
  src: string;
  alt: string;
  zoomScale?: number;
  lensSize?: number;
  className?: string;
  previewSide?: 'left' | 'right';
}

export default function ZoomWrapper({
  src,
  alt,
  zoomScale = 2.5,
  lensSize = 130,
  className,
  previewSide = 'left',
}: ZoomWrapperProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [containerDim, setContainerDim] = useState<{ w: number; h: number }>({
    w: 450,
    h: 450,
  });

  const handlePosition = useCallback(
    (clientX: number, clientY: number): void => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const currentX = clientX - rect.left;
      const currentY = clientY - rect.top;

      // Keep lens inside boundary
      const minX = lensSize / 2;
      const maxX = rect.width - lensSize / 2;
      const minY = lensSize / 2;
      const maxY = rect.height - lensSize / 2;

      const clampedX = Math.max(minX, Math.min(maxX, currentX));
      const clampedY = Math.max(minY, Math.min(maxY, currentY));

      setContainerDim({ w: rect.width, h: rect.height });
      setLensPos({ x: clampedX, y: clampedY });
    },
    [lensSize],
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDim({ w: rect.width, h: rect.height });
    }
    setIsActive(true);
    handlePosition(e.clientX, e.clientY);
  };

  return (
    <div className="relative w-full max-w-lg">
      {/* Main Base Image */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsActive(false)}
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) =>
          handlePosition(e.clientX, e.clientY)
        }
        onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {
          setIsActive(true);
          if (e.touches[0])
            handlePosition(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {
          if (e.cancelable) e.preventDefault();
          if (e.touches[0])
            handlePosition(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={() => setIsActive(false)}
        onTouchCancel={() => setIsActive(false)}
        className={cn(
          'relative aspect-square w-full overflow-hidden rounded-3xl',
          'border-border/60 bg-muted/30 cursor-crosshair touch-none border shadow-2xl select-none',
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 500px"
          className="pointer-events-none object-cover"
        />

        {/* Floating Lens Box */}
        {isActive && (
          <div
            aria-hidden="true"
            style={{
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              left: `${lensPos.x - lensSize / 2}px`,
              top: `${lensPos.y - lensSize / 2}px`,
            }}
            className="border-primary bg-primary/20 pointer-events-none absolute border-2 backdrop-blur-[1px]"
          />
        )}
      </div>

      {/* Side Zoom Preview (Opens Left on Desktop) */}
      {isActive && (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 z-50 hidden lg:block',
            previewSide === 'left'
              ? 'right-[calc(100%+24px)]'
              : 'left-[calc(100%+24px)]',
            'border-border aspect-square w-100 overflow-hidden rounded-3xl border',
            'bg-background shadow-2xl',
          )}
        >
          <div
            style={{
              position: 'relative',
              width: `${containerDim.w * zoomScale}px`,
              height: `${containerDim.h * zoomScale}px`,
              transform: `translate(-${
                lensPos.x * zoomScale - 420 / 2
              }px, -${lensPos.y * zoomScale - 420 / 2}px)`,
            }}
          >
            <Image
              src={src}
              alt={`${alt} zoomed preview`}
              fill
              sizes="900px"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
