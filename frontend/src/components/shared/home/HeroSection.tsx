'use client';

import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { StatusDot } from '@/components/ui/StatusDot';
import { imageAssets } from '@/lib/assets';
import StudentTestimonials from '../achievements/StudentTestimonials';
import { ArrowRight, Award } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-background relative overflow-hidden">
      {/*_______________________ HERO CONTAINER _______________________*/}
      <div
        className={cn(
          'relative z-0 mx-auto flex w-full max-w-7xl flex-col gap-10 pt-20 md:pt-20',
          'xl:grid xl:grid-cols-2 xl:items-center xl:gap-12',
        )}
      >
        {/* ================================================================
            LEFT CONTENT
        ================================================================= */}
        <div className="relative inset-x-0 flex justify-center rounded-sm xl:bg-transparent">
          <div className="flex w-fit max-w-full flex-col">
            {/* Badge */}
            <div
              className={cn(
                'mb-6 flex w-fit items-center gap-2 rounded-full',
                'border px-3 py-1 shadow-xl backdrop-blur-md',
                'border-accent/20 bg-accent/90 text-background',
                'text-[clamp(0.75rem,1vw,1.25rem)] font-semibold',
                'dark:border-accent/20 dark:bg-accent/10 dark:text-accent',
                '',
              )}
            >
              <StatusDot />
              <Award className="size-4 shrink-0" />
              <span>No.1 Institute in Telangana</span>
            </div>

            {/* Heading + description */}
            <div>
              <h1
                className={cn(
                  'font-heading text-foreground mb-6',
                  'text-5xl leading-[0.88] tracking-tight',
                  'sm:text-6xl',
                  'lg:text-[clamp(4rem,6vw,6rem)]',
                )}
              >
                SHAPE YOUR
                <br />
                <span className="text-primary">FUTURE</span> TODAY.
              </h1>

              <p
                className={cn(
                  'xl:text-muted-foreground mb-2 max-w-lg',
                  'text-base leading-relaxed',
                  'sm:text-lg md:text-xl',
                )}
              >
                Join the premier academy for IIT, NEET, and Defence coaching.
                Experience expert guidance, top-tier study materials, and a
                proven track record.
              </p>
            </div>
            {/* Actions */}
            <div className={cn('flex h-20 w-fit shrink-0 items-center')}>
              <StudentTestimonials />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl',
                  'bg-primary text-primary-foreground px-3 py-2 text-xs font-medium',
                  'shadow-primary/30 shadow-lg',
                  'transition-transform duration-200',
                  'hover:bg-primary-hover hover:scale-105',
                  'md:px-4 md:py-3 md:text-base md:font-bold',
                )}
              >
                Enroll Now
                <ArrowRight className="size-5" />
              </button>

              <button
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl border',
                  'border-border/50 bg-secondary px-3 py-2 text-xs',
                  'text-secondary-foreground font-medium',
                  'transition-colors duration-200',
                  'hover:border-primary/40 hover:bg-secondary-hover',
                  'md:px-4 md:py-3 md:text-base md:font-bold',
                )}
              >
                View Courses
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================
            RIGHT IMAGE
        ================================================================= */}
        <div className="hidden justify-center xl:flex">
          <div
            className={cn(
              'relative aspect-square w-full max-w-xl overflow-hidden',
              'rounded-4xl',
            )}
          >
            <Image
              src={imageAssets.Img_09.href}
              alt="Students succeeding"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />

            {/* Bottom gradient */}
            <div className="from-background/80 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
