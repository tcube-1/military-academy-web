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

import { cn } from '@/lib/utils';
import { polygon, ribbonMessages, socialIcons } from '@/lib/assets';
import { useMarqueeEngine } from '@/hooks/useMarqueeEngine';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(useGSAP);

interface SocialIcon {
  name: string;
  link: string;
  href: string;
}

function Ribbon() {
  const iconSize: number = 18;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRef = useRef<HTMLSpanElement>(null);
  const dragIconsRef = useRef<HTMLDivElement | null>(null);
  const gripHandleRef = useRef<SVGSVGElement | null>(null);
  const [paused, setPaused] = useState(false);

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
      if (!iconRef.current) return;

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

      if (dragIconsRef.current) {
        Draggable.create(dragIconsRef.current, {
          type: 'x,y',
          trigger: gripHandleRef.current || undefined,
          bounds: typeof window !== 'undefined' ? window : undefined,
          edgeResistance: 0.65,
          inertia: true,
        });
      }
    },
    { dependencies: [paused] },
  );

  const handlePause = () => {
    if (!iconRef.current) return;

    gsap.to(iconRef.current, {
      scale: 0,
      opacity: 0,
      rotate: 90,
      duration: 0.12,
      ease: 'power2.in',
      onComplete: () => {
        setPaused((prev) => {
          const next = !prev;

          if (next) {
            Imarquee.pause();
          } else {
            Imarquee.resume();
          }

          return next;
        });
      },
    });
  };

  return (
    /* 
      FIX 1: Changed `bg-primary` on main tag and removed hover:bg-background.
      This ensures that any slant polygon cuts show primary blue behind them instead of white!
    */
    <main
      className={cn(
        'bg-primary text-primary-foreground h-7 overflow-hidden shadow-md md:h-9',
      )}
    >
      <section
        className={cn('bg-primary flex h-full items-center justify-between')}
      >
        <div
          className={cn(
            'relative flex h-full min-w-0 flex-1 items-center justify-between overflow-hidden',
          )}
        >
          {/* _______________________ PAUSE / PLAY BUTTON _______________________ */}
          <button
            type="button"
            onClick={handlePause}
            className={cn(
              'bg-primary hover:bg-primary-hover text-primary-foreground shadow-md',
              'z-30 flex h-full w-7 shrink-0 items-center justify-center border-r border-white/10 transition-colors duration-200',
            )}
          >
            <span ref={iconRef} className="flex items-center justify-center">
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </span>
          </button>

          {/* 
            FIX 2: PREVIOUS OVERLAY BUTTON 
            Replaced w-20 with a controlled size (w-8) so it won't block center marquee text.
          */}
          <button
            type="button"
            onClick={Imarquee.prev}
            className={cn(
              'absolute left-7 z-20 flex h-full w-8 items-center justify-center',
              'from-primary/80 text-primary-foreground/70 hover:text-primary-foreground border-none bg-linear-to-r to-transparent transition-all duration-200',
            )}
          >
            <ChevronLeft className="size-4 shrink-0" />
          </button>

          {/* 
            FIX 3: NEXT OVERLAY BUTTON
            Replaced w-20 with controlled w-8 floating overlay.
          */}
          <button
            type="button"
            onClick={Imarquee.next}
            className={cn(
              'absolute right-0 z-20 flex h-full w-8 items-center justify-center',
              'from-primary/80 text-primary-foreground/70 hover:text-primary-foreground border-none bg-linear-to-l to-transparent transition-all duration-200',
            )}
          >
            <ChevronRight className="size-4 shrink-0" />
          </button>

          {/* _______________________ VIEWPORT _______________________ */}
          <div
            className={cn(
              'flex h-full min-w-0 flex-1 items-center overflow-hidden bg-transparent',
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
              {[...ribbonMessages, ...ribbonMessages].map((message, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="flex items-center text-xs font-medium md:text-sm"
                >
                  <ChevronRight className="bg-destructive text-destructive-foreground mx-2 size-3 shrink-0 rounded-full p-px md:size-4" />
                  <span>{message}</span>

                  {/* FIX 4: Removed invalid `rel="stylesheet"` from Next.js Link */}
                  <Link
                    href={'/courses'}
                    className={cn(
                      'text-primary-foreground hover:text-accent mx-1 cursor-pointer font-semibold underline',
                    )}
                  >
                    click here
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 
          FIX 5: LOCATION CONTAINER 
          Added `bg-primary` and `text-primary-foreground` explicitly so slants won't reveal underlying white backgrounds.
        */}
        <div
          className={cn(
            'bg-primary text-primary-foreground hidden h-full max-w-3xl min-w-xl flex-1 shrink-0 items-center justify-between space-x-2.5 font-sans text-xs lg:flex',
          )}
        >
          <div
            className={cn('flex h-full items-center justify-center space-x-2')}
          >
            <MapPin className={cn('ml-4 size-4 shrink-0 text-red-400')} />
            <span className={cn('cursor-pointer underline md:block')}>
              H.No. 3-4-90, Suryanagar, Karimnagar, Telangana, PIN-505001
            </span>
          </div>

          {/* _______________________ Social Icons Desktop _______________________ */}
          <div className={cn('relative z-50 hidden h-full min-w-xs lg:flex')}>
            <div
              className={cn(
                'bg-accent absolute inset-x-0 -z-10 flex h-full rotate-180 rotate-x-180',
                polygon['right-nav'],
              )}
            ></div>
            <span
              className={cn(
                'text-accent-foreground flex w-full items-center justify-center gap-3 px-4 text-sm',
              )}
            >
              <span className="font-semibold">follow us:</span>
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
                      className="flex size-5 rounded-full bg-white p-px shadow-sm"
                    />
                  </a>
                ))}
            </span>
          </div>
        </div>
      </section>

      {/* _______________________ Mobile Social Icons _______________________ */}
      <div
        ref={dragIconsRef}
        className="fixed right-5 bottom-20 z-50 lg:hidden"
      >
        <div className="bg-sidebar flex flex-col items-center gap-3 rounded-2xl border p-2.5 shadow-2xl backdrop-blur-sm">
          <GripHorizontal
            className={cn(
              'text-foreground size-5 cursor-grab active:cursor-grabbing',
            )}
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
  );
}

export default Ribbon;
