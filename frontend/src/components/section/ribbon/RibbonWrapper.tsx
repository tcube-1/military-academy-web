'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';

interface RibbonScrollWrapperProps extends EmblaOptionsType {
  children?: React.ReactNode;
  className?: string;
  scrollSpeed?: number;
}

function RibbonScrollWrapper({
  children,
  className,
  scrollSpeed = 1,
  ...options
}: RibbonScrollWrapperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
      align: 'start',
      duration: 3000,
      ...options,
    },
    [
      AutoScroll({
        speed: scrollSpeed,
        stopOnInteraction: true,
      }),
      WheelGesturesPlugin(),
    ],
  );

  return (
    <section className={cn('relative w-full flex-1', className)}>
      <div
        className={cn(
          'cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing',
        )}
        ref={emblaRef}
      >
        <div className={cn('flex')}>{children}</div>
      </div>
    </section>
  );
}

export default RibbonScrollWrapper;
