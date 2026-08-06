import { imageAssets, polygon } from '@/lib/assets';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

function LandingPage() {
  return (
    <div className={cn('relative h-dvh overflow-hidden')}>
      <div
        className={cn(
          'bg-secondary-foreground absolute -top-75 h-screen w-screen rotate-180',
          polygon['landingPage-xl-1'],
        )}
      ></div>
      <div
        className={cn(
          'bg-secondary absolute -top-75 h-screen w-screen rotate-180',
          polygon['landingPage-xl-2'],
        )}
      >
        <span
          className={cn(
            'bg-accent-2 absolute -top-30 flex rotate-180 items-end justify-center',
          )}
        >
          <span>
            <Image
              src={imageAssets.Img_02.href}
              alt={imageAssets.Img_02.name}
              width={800}
              height={800}
            />
          </span>
          <span className={cn('')}>
            <Image
              src={imageAssets.Img_20.href}
              alt={imageAssets.Img_20.name}
              width={800}
              height={800}
            />
          </span>

          <span className={cn('')}>
            <Image
              src={imageAssets.Img_15.href}
              alt={imageAssets.Img_15.name}
              width={800}
              height={800}
            />
          </span>
        </span>
      </div>
      <section className={cn('relative container mx-auto')}></section>
    </div>
  );
}

export default LandingPage;
