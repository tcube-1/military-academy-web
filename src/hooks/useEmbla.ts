'use client';

import * as React from 'react';
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from 'embla-carousel';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';

export type EmblaViewportRefType = UseEmblaCarouselType[0];
export type EmblaApiType = UseEmblaCarouselType[1];

export interface UseEmblaReturn {
  emblaRef: EmblaViewportRefType;
  emblaApi: EmblaApiType;
  scrollProgress: number;
  totalSlides: number;
  selectedIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number, jump?: boolean) => void;
}

export default function useEmbla(
  options?: EmblaOptionsType,
  plugins?: EmblaPluginType[]
): UseEmblaReturn {
  // Pass plugins directly without inline default array to avoid reference instability
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const [scrollProgress, setScrollProgress] = React.useState<number>(0);
  const [totalSlides, setTotalSlides] = React.useState<number>(0);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = React.useState<boolean>(false);

  // Sync all states in one single callback
  const syncCarouselState = React.useCallback((api: EmblaCarouselType): void => {
    // Math bounds check to prevent negative or > 100 values
    const progress = Math.max(0, Math.min(1, api.scrollProgress()));
    setScrollProgress(Math.round(progress * 100));
    setSelectedIndex(api.selectedScrollSnap());
    setTotalSlides(api.scrollSnapList().length);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    // Full state update handler for init and slide changes
    const onSelectOrInit = (): void => {
      syncCarouselState(emblaApi);
    };

    // Lightweight handler for continuous scroll progress
    const onScroll = (): void => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      setScrollProgress(Math.round(progress * 100));
    };

    // Subscriptions setup
    emblaApi.on('init', onSelectOrInit);
    emblaApi.on('reInit', onSelectOrInit);
    emblaApi.on('select', onSelectOrInit);
    emblaApi.on('scroll', onScroll);

    // Initial trigger when API mounts
    onSelectOrInit();

    return () => {
      emblaApi.off('init', onSelectOrInit);
      emblaApi.off('reInit', onSelectOrInit);
      emblaApi.off('select', onSelectOrInit);
      emblaApi.off('scroll', onScroll);
    };
  }, [emblaApi, syncCarouselState]);

  // Navigation handlers with null checks
  const scrollPrev = React.useCallback((): void => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback((): void => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number, jump?: boolean): void => {
      if (emblaApi) emblaApi.scrollTo(index, jump);
    },
    [emblaApi]
  );

  return {
    emblaRef,
    emblaApi,
    scrollProgress,
    totalSlides,
    selectedIndex,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}