'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  GripHorizontal,
  MapPin,
  Pause,
  Play,
} from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';

import { cn } from '@/lib/utils';
import { polygon, ribbonMessages, socialIcons } from '@/lib/assets';
import { useMarqueeEngine } from '@/hooks/useMarqueeEngine';

// Register GSAP plugins outside component lifecycle
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, Draggable);
}

interface SocialIcon {
  name: string;
  link: string;
  href: string;
}

export default function Ribbon() {
  const iconSize: number = 18;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRef = useRef<HTMLSpanElement>(null);
  const dragIconsRef = useRef<HTMLDivElement | null>(null);
  const gripHandleRef = useRef<SVGSVGElement | null>(null);

  const [paused, setPaused] = useState<boolean>(false);

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
      speed: 0.5,
      stepDuration: 2,
    },
  );

  useGSAP(
    () => {
      // 1. Play/Pause Icon Animation
      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          {
            scale: 0,
            opacity: 0,
            rotate: -90,
          },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.25,
            ease: 'back.out(2)',
          },
        );
      }

      // 2. Draggable Social Icons Setup
      let draggableInstance: Draggable[] | undefined;

      if (dragIconsRef.current) {
        draggableInstance = Draggable.create(dragIconsRef.current, {
          type: 'x,y',
          trigger: gripHandleRef.current || undefined,
          bounds: typeof window !== 'undefined' ? window : undefined,
          edgeResistance: 0.65,
          inertia: true,
        });
      }

      // Cleanup function to prevent memory leaks on unmount
      return () => {
        if (draggableInstance && draggableInstance.length > 0) {
          draggableInstance[0].kill();
        }
      };
    },
    { dependencies: [paused], scope: dragIconsRef },
  );

  // const handlePause = (): void => {
  //   if (!iconRef.current) return;

  //   gsap.to(iconRef.current, {
  //     scale: 0,
  //     opacity: 0,
  //     rotate: 90,
  //     duration: 0.12,
  //     ease: 'power2.in',
  //     onComplete: () => {
  //       setPaused((prev) => {
  //         const next = !prev;
  //         if (next) {
  //           Imarquee.pause();
  //         } else {
  //           Imarquee.resume();
  //         }
  //         return next;
  //       });
  //     },
  //   });
  // };

  return (
    <header className={cn('relative z-100 h-6 w-full')}>
      <main className={cn('bg-background fixed h-6 w-full text-gray-950')}>
        <section
          className={cn(
            // Base
            'flex h-6',
            // Visual
            'bg-primary text-primary-foreground',
            // Variants
            '',
          )}
        >
          <div
            className={cn(
              'relative flex h-full min-w-0 flex-1 items-center justify-between overflow-hidden',
            )}
          >
            {/*_______________________ PREVIOUS OVERLAY BUTTON _______________________*/}
            <button
              type="button"
              onClick={Imarquee.prev}
              className={cn(
                'absolute left-0 z-100 flex h-full w-6 items-center justify-center',
                'bg-primary bg-linear-to-r to-transparent transition-all duration-200',
                'shadow-lg shadow-black/20',
              )}
              aria-label="Previous Item"
            >
              <ChevronLeft className="size-4 shrink-0" />
            </button>
            {/*_______________________ NEXT OVERLAY BUTTON _______________________*/}
            <button
              type="button"
              onClick={Imarquee.next}
              className={cn(
                'absolute right-0 z-100 flex h-full w-6 items-center justify-center',
                'lg:right-50 lg:w-15 lg:justify-start',
                'bg-primary bg-linear-to-l to-transparent transition-all duration-200',
              )}
              aria-label="Next Item"
            >
              <ChevronRight className="size-4 shrink-0 lg:ml-2" />
            </button>
            {/*_______________________  VIEWPORT _______________________*/}
            <div
              className={cn(
                // Base
                'flex min-w-0 items-center justify-start overflow-hidden',

                // Visual {scroll start at marginleft-5}
                'ml-4',
                // Variants
                '',
              )}
              ref={viewportRef}
            >
              <div
                ref={trackRef}
                className={cn(
                  'flex shrink cursor-grab touch-none',
                  axis === direction
                    ? 'w-max flex-row whitespace-nowrap'
                    : 'h-max flex-col whitespace-normal',
                )}
              >
                {[...ribbonMessages, ...ribbonMessages].map(
                  (message: string, index: number) => (
                    <div
                      key={`${message}-${index}`}
                      ref={(el: HTMLDivElement | null) => {
                        itemRefs.current[index] = el;
                      }}
                      className={cn(
                        // Base
                        'flex items-center text-xs font-medium',

                        // Visual
                        '',
                        // Variants
                        '',
                      )}
                    >
                      <ChevronRight className="mx-1 size-3 shrink-0 rounded-full md:size-4" />
                      <span>{message}</span>
                      <Link
                        href="/courses"
                        className={cn(
                          'hover:text-accent mx-1 cursor-pointer font-semibold underline',
                        )}
                      >
                        click here
                      </Link>
                    </div>
                  ),
                )}
              </div>
            </div>
            {/*_______________________ SCOIAL ICONS _______________________*/}

            <div
              className={cn(
                'absolute top-0 right-0 z-100 hidden h-full max-w-75 min-w-60 lg:flex',
              )}
            >
              <div
                className={cn(
                  'bg-accent absolute inset-x-0 -z-100 flex h-full rotate-180 rotate-x-180',
                  polygon['right-nav'],
                )}
              ></div>
              <span
                className={cn(
                  'text-accent-foreground mr-5 flex w-full items-center justify-end gap-2 text-sm',
                )}
              >
                <span className="text-xs font-semibold">follow us:</span>
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
                        className="flex size-4.5 rounded-full bg-white p-px shadow-sm"
                      />
                    </a>
                  ))}
              </span>
            </div>

            {/*_______________________ PAUSE / PLAY BUTTON _______________________*/}
            {/* <button
              type="button"
              onClick={handlePause}
              className={cn(
                // Base
                'absolute z-100 flex h-full w-8 shrink-0 items-center justify-center',
                // Visual
                'bg-card/20 border-border/50',
                // Variants
                'transition-colors duration-200',
              )}
              aria-label={paused ? 'Play Marquee' : 'Pause Marquee'}
            >
              <span ref={iconRef} className="flex items-center justify-center">
                {paused ? <Pause size={14} /> : <Play size={14} />}
              </span>
            </button> */}
          </div>
        </section>

        {/* Mobile Social Icons */}
        <div
          ref={dragIconsRef}
          className="fixed right-5 bottom-20 z-100 lg:hidden"
        >
          <div className="flex flex-col items-center gap-3 rounded-2xl border p-2.5 shadow-2xl backdrop-blur-sm">
            <GripHorizontal
              className={cn('size-5 cursor-grab active:cursor-grabbing')}
              ref={gripHandleRef}
            />
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
