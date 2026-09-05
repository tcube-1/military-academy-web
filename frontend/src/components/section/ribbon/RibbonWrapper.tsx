'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';

export interface ScrollWrapperProps extends EmblaOptionsType {
  children?: React.ReactNode;
  className?: string;
  scrollSpeed?: number;
}

function RibbonScrollWrapper({
  children,
  className,
  scrollSpeed = 1,
  ...options
}: ScrollWrapperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
      align: 'start',
      duration: 3000,
      loop: true,
      ...options,
    },
    [
      AutoScroll({
        speed: scrollSpeed,
        startDelay: 500, // Load ayina 500ms ki start avuthundi
        stopOnInteraction: false, // User drag chesinappudu automatic ga handle avvadaniki
        stopOnFocusIn: true,
        stopOnMouseEnter: true,
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
