'use client';

import Image from 'next/image';
import React, { useRef } from 'react';

import { cn } from '@/lib/utils';
import { polygon, ribbonMessages, socialIcons } from '@/lib/assets';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useMarqueeEngine } from '@/hooks/useMarqueeEngine';

interface SocialIcon {
  name: string;
  link: string;
  href: string;
}

function Ribbon() {
  const iconSize: number = 16;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const axis = 'x';
  const direction = 'x';
  const Imarquee = useMarqueeEngine(
    { viewportRef, trackRef, itemRefs },
    {
      axis,
      enableDrag: true,
      enableWheel: true,
      loop: true,
      pauseOnHover: true,
      resumeDelay: 1,
      speed: 0.2,
      stepDuration: 0.5,
    },
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 overflow-hidden bg-[#0a1930] text-white shadow-md',
      )}
    >
      <main className={cn('h-7 overflow-hidden text-xs md:h-9')}>
        <section
          className={cn(
            'relative flex h-full items-center justify-between px-4',
          )}
        >
          <div
            className={cn(
              'flex h-full items-center justify-center gap-4 md:justify-between lg:w-9/12 xl:w-10/12',
            )}
          >
            {/* Scroller Container */}
            <div className="relative flex h-full w-full cursor-grab items-center overflow-hidden bg-[#e6b432] active:cursor-grabbing">
              {/* Previous Button */}
              <ChevronLeft
                onClick={Imarquee.prev}
                className="absolute left-0 z-20 h-full cursor-pointer bg-[#0a1930] p-0.5 text-white transition-colors hover:bg-gray-800"
              />

              {/* Marquee Viewport — the clipping window the engine measures
                  and attaches wheel/drag listeners to */}
              <div
                ref={viewportRef}
                className="flex w-full touch-none items-center overflow-hidden px-8"
              >
                {/* Marquee Track — the element quickSetter actually
                    transforms; must render content twice for loop:true */}
                <div
                  ref={trackRef}
                  className={cn(
                    'flex font-bold text-[#0a1930] will-change-transform',
                    axis === direction
                      ? 'w-max flex-row whitespace-nowrap'
                      : 'h-max flex-col whitespace-normal',
                  )}
                >
                  {[...ribbonMessages, ...ribbonMessages].map(
                    (message: string, index: number) => (
                      <div
                        ref={(ele) => {
                          itemRefs.current[index] = ele;
                        }}
                        key={index}
                        className="mx-4 flex items-center"
                      >
                        <ChevronRight
                          className={cn(
                            'mx-2 size-4 shrink-0 rounded-full bg-red-600 p-px text-white',
                          )}
                        />
                        {message}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Next Button */}
              <ChevronRight
                onClick={Imarquee.next}
                className="absolute right-0 z-20 h-full cursor-pointer rounded-r-none bg-[#0a1930] p-0.5 text-white transition-colors hover:bg-gray-800"
              />
            </div>

            {/* Location */}
            <div
              className={cn(
                'mr-5 hidden h-full shrink-0 items-center-safe justify-end-safe space-x-2.5 lg:flex',
              )}
            >
              <MapPin className={cn('size-4 text-red-500')} />
              <span
                className={cn(
                  'cursor-pointer text-gray-200 underline hover:text-white md:block',
                )}
              >
                H.No. 3-4-90, Suryanagar, Karimnagar, Telangana, PIN-505001
              </span>
            </div>
          </div>

          {/* Social Icons (Desktop) */}
          <div className={cn('relative hidden h-full min-w-xs lg:flex')}>
            <div
              className={cn(
                'absolute inset-x-0 -z-1 flex h-full rotate-180 rotate-x-180',
                polygon['right-nav'],
              )}
            ></div>
            <span
              className={cn(
                'flex w-full items-center justify-center gap-3 px-4 text-sm',
              )}
            >
              <span className="font-medium text-gray-300">follow us:</span>
              {socialIcons &&
                socialIcons.map((social: SocialIcon) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110"
                  >
                    <Image
                      src={social.href}
                      alt={social.name}
                      width={iconSize}
                      height={iconSize}
                      className="flex size-4 rounded-full bg-white p-px shadow-sm"
                    />
                  </a>
                ))}
            </span>
          </div>
        </section>

        {/* Mobile Social Icons */}
        <div className="fixed right-5 bottom-20 z-50 lg:hidden">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0a1930]/90 p-2.5 shadow-2xl backdrop-blur-sm">
            {socialIcons &&
              socialIcons.map((social: SocialIcon) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform active:scale-95"
                >
                  <Image
                    src={social.href}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="size-7 rounded-full bg-white p-0.5 shadow"
                  />
                </a>
              ))}
          </div>
        </div>
      </main>
    </header>
  );
}

export default Ribbon;
