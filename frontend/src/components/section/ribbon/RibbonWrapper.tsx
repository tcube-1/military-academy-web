'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmbla from '@/hooks/useEmbla';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';

interface RibbonScrollWrapperProps extends EmblaOptionsType {
  children?: React.ReactNode;
  className?: string;
}

function RibbonScrollWrapper({
  children,
  className,
  ...options
}: RibbonScrollWrapperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({}, []);

  return (
    <section className={cn('relative w-full overflow-hidden', className)}>
      <div className={cn('flex touch-pan-y items-center gap-2')}>
        {/*_______________________ BUTTON PREV _______________________*/}

        {/*_______________________ wrapper _______________________*/}
        <div
          className={cn(
            'flex-1 cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing',
          )}
          ref={emblaRef}
        >
          <div className={cn('flex')}>{children}</div>
        </div>

        {/*_______________________ BUTTON NEXT _______________________*/}
      </div>
    </section>
  );
}

export default RibbonScrollWrapper;
