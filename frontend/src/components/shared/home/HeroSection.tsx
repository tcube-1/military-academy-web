'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Award, ChevronsRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { StatusDot } from '@/components/ui/StatusDot';
import StudentTestimonials from '../achievements/StudentTestimonials';

export default function HeroSection(): React.JSX.Element {
  return (
    /* 
      1. Main Wrapper:
      - Fixed `h-screen` valla mobile lo overflow cut avthundi, so `min-h-[calc(100vh-4rem)]` or `min-h-screen` vaduthunnam.
      - Smooth background gradient & padding handle chestundi.
    */
    <section className="bg-background relative flex w-full justify-center px-2 pt-20 pb-12 sm:pt-28 sm:pb-16 lg:px-10">
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,var(--accent),transparent_60%)] opacity-10"
      />

      {/* 
        2. Hero Container:
        - Max-width constraint to maintain clean margins on ultrawide screens.
      */}
      <div className="relative top-10 z-10 mx-auto w-full max-w-7xl 2xl:top-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* ================================================================
              LEFT: TEXT CONTENT & ACTIONS
          ================================================================= */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Top Badge: Floating Pill */}
            <div
              className={cn(
                'mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-300',
                'border-border/60 bg-accent text-foreground',
                'text-xs font-semibold sm:text-sm',
              )}
            >
              <StatusDot />
              <Award className="text-primary size-4 shrink-0" />
              <span>No.1 Institute in Telangana</span>
            </div>

            {/* Main Headline */}
            <div className={cn('relative w-full max-w-2xl')}>
              <h1
                className={cn(
                  'font-heading text-foreground font-extrabold tracking-tight',
                  // Fluid scaling across Mobile, Tablet, and Desktop without breaking
                  'text-[clamp(3rem,10vw,8rem)] leading-[clamp(2.5rem,8vw,7rem)]',
                )}
              >
                <span className={cn('block')}>SHAPE YOUR </span>
                <span className={cn('block')}>
                  <span
                    className={cn(
                      'inline-block',
                      'from-primary via-primary/90 to-primary/60 bg-linear-to-r bg-clip-text text-transparent',
                    )}
                  >
                    FUTURE
                  </span>{' '}
                  TODAY.
                </span>
              </h1>
            </div>

            {/* Subheading / Description */}
            <p
              className={cn(
                'text-muted-foreground mt-4 max-w-xl',
                'text-sm leading-relaxed sm:text-base md:text-lg',
              )}
            >
              Join the premier academy for IIT, NEET, and Defence coaching.
              Experience expert guidance, top-tier study materials, and a proven
              track record.
            </p>

            {/* Social Proof / Student Avatars */}
            <div className="mt-6 flex w-full items-center justify-center lg:justify-start">
              <ChevronsRight className={cn('animate-pulse')} />
              <StudentTestimonials />
            </div>

            {/* CTA Buttons: Full width on tiny screens, inline on tablet/desktop */}
            <div className="mt-5 flex w-full justify-center gap-3.5 sm:w-auto sm:flex-row sm:items-center">
              <button
                type="button"
                className={cn(
                  'group flex items-center justify-center gap-2 rounded-xl px-6 py-3.5',
                  'bg-primary text-primary-foreground text-sm font-semibold sm:text-base',
                  'shadow-primary/25 shadow-lg transition-all duration-200',
                  'hover:bg-primary/90 hover:shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0',
                )}
              >
                <span>Enroll Now</span>
                <ArrowRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                className={cn(
                  'border-border/80 flex items-center justify-center rounded-xl border px-6 py-3.5',
                  'bg-secondary/60 text-secondary-foreground text-sm font-semibold backdrop-blur-sm sm:text-base',
                  'hover:bg-secondary hover:border-primary/40 transition-all duration-200 active:scale-[0.98]',
                )}
              >
                View Courses
              </button>
            </div>
          </div>
          {/* ================================================================
              RIGHT: HERO IMAGE CONTAINER
          ================================================================= */}
          <div
            className={cn(
              'relative mx-auto flex w-full max-w-md items-center justify-center sm:max-w-lg lg:max-w-none',
            )}
          >
            <div
              className={cn(
                'border-border/40 relative aspect-4/3 w-full overflow-hidden rounded-3xl border shadow-2xl md:aspect-video lg:aspect-square',
                'bg-card/40 backdrop-blur-sm',
              )}
            >
              <Image
                src={'/images/Img-50.avif'}
                alt={'collage photo'}
                fill
                sizes="100"
                className={cn('')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
