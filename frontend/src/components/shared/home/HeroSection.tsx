'use client';

import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { StatusDot } from '@/components/ui/StatusDot';
import AvaterStack from '../achievements/AvaterStack';
import { ArrowRight, Award, ShieldCheck } from 'lucide-react';
import SignupPage from '@/app/auth/signup/page';
import Link from 'next/link';

export default function HeroSection(): React.JSX.Element {
  return (
    /* 
      1. Main Wrapper:
      - Fixed `h-screen` valla mobile lo overflow cut avthundi, so `min-h-[calc(100vh-4rem)]` or `min-h-screen` vaduthunnam.
      - Smooth background linear & padding handle chestundi.
    */
    <section className="bg-background relative flex w-full justify-center px-2 py-2">
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-linear(circle_at_50%_10%,var(--accent),transparent_60%)] opacity-10"
      />

      {/* 
        2. Hero Container:
        - Max-width constraint to maintain clean margins on ultrawide screens.
      */}
      <div className="relative top-4 z-10 mx-auto w-full max-w-7xl 2xl:top-0">
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
              <AvaterStack />
            </div>

            {/* CTA Buttons: Full width on tiny screens, inline on tablet/desktop */}
            <div className="mt-5 flex w-full justify-center gap-3.5 sm:w-auto sm:flex-row sm:items-center">
              <Link href={'/auth/signup'}>
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
              </Link>
              <Link href={`contact`}>
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
              </Link>
            </div>
          </div>
          {/* ================================================================
              RIGHT: HERO IMAGE CONTAINER
          ================================================================= */}
          <div
            className={cn(
              'relative mx-auto flex h-full w-full max-w-md items-center justify-center py-5 sm:max-w-lg lg:max-w-none',
            )}
          >
            <div
              className={cn(
                'border-border/40 relative aspect-4/3 w-full overflow-hidden rounded-3xl border shadow-2xl md:aspect-video lg:aspect-video',
                'bg-card/40 backdrop-blur-sm',
              )}
            >
              <Image
                src={'/images/campus.jpeg'}
                alt={'collage photo'}
                loading="eager"
                fill
                sizes="100"
                className={cn('object-cover')}
              />
            </div>
            {/* ================================================================
              floting                                   
              ================================================================= */}

            <div
              className={cn(
                'absolute bottom-6 left-1 z-20 sm:bottom-15 sm:-left-15',
                'group flex cursor-pointer items-center gap-3.5 rounded-2xl p-3 sm:p-3.5',
                'border border-white/10 bg-slate-950/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl',
                'ring-1 ring-white/5 transition-all duration-200 ease-out select-none',
                // Hover styles
                'hover:-translate-y-0.5 hover:border-amber-500/30 hover:shadow-amber-500/10',
                // Active styles (Press/Touch feedback)
                'active:translate-y-0 active:scale-95 active:border-amber-500/60 active:bg-slate-950/95 active:shadow-inner',
                'max-w-50 sm:max-w-60',
              )}
            >
              {/* Amber Accent Icon Box with Subtle Glow & active bounce */}
              <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-linear-to-br from-amber-400/20 to-amber-600/10 text-amber-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-transform duration-200 group-active:scale-90">
                <Award className="size-6 transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-amber-500" />
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col text-left">
                <span className="bg-linear-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-xl font-black tracking-tight text-transparent sm:text-2xl">
                  2000+
                </span>
                <span className="text-[10px] leading-snug font-medium text-slate-300/90 sm:text-xs">
                  Successful Selections in{' '}
                  <strong className="font-semibold text-white">
                    NDA, CDS & AFCAT
                  </strong>
                </span>
              </div>
            </div>

            {/**
             * _______________________ FLOATING BADGE 2: TOP RIGHT _______________________
             * Positions untouched. Added active click/press micro-interactions.
             */}
            <div
              className={cn(
                'absolute -top-4 right-4 z-20 sm:top-15 sm:-right-10',
                'group flex cursor-pointer items-center gap-3 rounded-2xl p-2.5 sm:px-4 sm:py-3',
                'border border-white/10 bg-slate-950/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl',
                'ring-1 ring-white/5 transition-all duration-200 ease-out select-none',
                // Hover styles
                'hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-emerald-500/10',
                // Active styles (Press/Touch feedback)
                'active:translate-y-0 active:scale-95 active:border-emerald-500/60 active:bg-slate-950/95 active:shadow-inner',
              )}
            >
              {/* Emerald Accent Icon Box with active feedback */}
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-linear-to-br from-emerald-400/20 to-emerald-600/10 text-emerald-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-transform duration-200 group-active:scale-90 sm:size-9">
                <ShieldCheck className="size-4.5 transition-transform duration-300 group-hover:scale-110 sm:size-5" />
              </div>

              {/* Content */}
              <div className="flex flex-col text-left">
                <span className="bg-linear-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-xs font-bold tracking-wide text-transparent sm:text-sm">
                  Qualified Mentorship
                </span>
                <span className="text-[9px] font-medium text-emerald-400/90 sm:text-[10px]">
                  By Retd. Defence Officers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
