'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusDot } from '@/components/ui/StatusDot';
import { imageAssets } from '@/lib/assets';

export default function HeroSection() {
  return (
    <section className="bg-background relative min-h-dvh overflow-hidden">
      <div
        className={cn(
          'bg-accent/25 absolute top-20 left-0 z-10 size-50 rounded-full blur-3xl',
        )}
      ></div>
      <div
        className={cn(
          'bg-primary/25 absolute right-0 bottom-50 z-10 size-50 rounded-full blur-3xl',
        )}
      ></div>
      <section
        className={cn(
          'absolute inset-x-0 top-22 mx-auto flex h-[75dvh] max-w-7xl flex-col px-5 sm:px-15',
          'z-20 lg:top-25 lg:flex-row 2xl:px-0',
        )}
      >
        <div className={cn('mb-10 flex flex-1 items-center justify-start')}>
          <section className={cn('flex flex-col')}>
            {' '}
            <div
              className={cn(
                'mb-6 flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold shadow-sm backdrop-blur-md',
                'border-primary/20 bg-primary/10 text-primary',
                'dark:border-accent/20 dark:bg-accent/10 dark:text-accent',
              )}
            >
              <StatusDot />
              <Award className="size-4" />
              <span>No.1 Institute in Telangana</span>
            </div>
            <div className={cn('flex flex-col')}>
              <h1
                className={cn(
                  'font-heading text-foreground mb-6 text-6xl leading-[0.85] tracking-tight',
                  'lg:text-[clamp(4rem,6vw,6rem)]',
                )}
              >
                SHAPE YOUR <br />
                <span className="text-primary">FUTURE</span> TODAY.
              </h1>
              {/* Subheading using Inter (font-sans default) */}
              <p className="text-muted-foreground mb-8 max-w-lg text-lg leading-relaxed md:text-xl">
                Join the premier academy for IIT, NEET, and Defence coaching.
                Experience expert guidance, top-tier study materials, and a
                proven track record.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={cn(
                  'bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary-hover flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium shadow-lg transition-all hover:scale-105',
                  'md:px-4 md:py-3 md:text-base md:font-bold',
                )}
              >
                Enroll Now <ArrowRight className="size-5" />
              </button>

              <button
                className={cn(
                  'border-border/50 bg-secondary text-secondary-foreground hover:border-primary/40 hover:bg-secondary-hover flex items-center justify-center gap-2 rounded-xl border px-3 py-2 font-medium transition-all',
                  'md:px-4 md:py-3 md:text-base md:font-bold',
                )}
              >
                View Courses
              </button>
            </div>
          </section>
        </div>
        <div
          className={cn(
            'border-accent relative flex h-full flex-1 border text-black lg:items-center lg:justify-center',
          )}
        >
          <section
            className={cn(
              'relative overflow-hidden rounded-4xl lg:h-[80%] lg:w-[80%]',
              'h-',
            )}
          >
            <div className={cn('')}>
              <Image
                src={imageAssets.Img_09.href}
                alt="Students succeeding"
                fill
                priority
                className="object-cover"
              />
              {/* Subtle dark gradient overlay at the bottom so the floating card pops */}
              <div className="from-background/80 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
            </div>
            <div className={cn('')}></div>
          </section>
        </div>
      </section>
    </section>
  );
}
