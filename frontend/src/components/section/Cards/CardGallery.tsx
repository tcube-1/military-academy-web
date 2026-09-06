'use client';

import { cn } from '@/lib/utils';
import { studentDataType } from '@/utils/types';
import { MapPinHouse } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CardGalleryProps {
  student: studentDataType;
  isUserLoggedIn: boolean;
}

export default function CardGallery({
  student,
  isUserLoggedIn,
}: CardGalleryProps) {
  if (!student) return null;

  return (
    <section className="group relative w-full max-w-sm">
      <div
        className={cn(
          'bg-card relative flex flex-col overflow-hidden rounded-3xl',
          'border-border/50 border shadow-lg shadow-black/5',
          'transition-all duration-300 ease-out',
          'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10',
        )}
      >
        {/* Top Banner with Gradient */}
        <div className="from-accent/80 to-accent/20 relative h-28 w-full bg-linear-to-br px-5 pt-4">
          <div className="flex w-full items-start justify-between">
            {/* DDA Logo */}
            <div className="bg-background/30 relative size-10 rounded-full p-1 backdrop-blur-md">
              <Image
                src="/images/dda-logo-1.png"
                alt="Defence Academy"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>

            {/* Student Code Badge */}
            <div className="bg-background/30 text-foreground rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
              {student.studentCode}
            </div>

            {/* Force Logo */}
            <div className="bg-background/30 relative size-10 rounded-full p-1 backdrop-blur-md">
              <Image
                src={student.force.logoUrl}
                alt={student.force.name}
                fill
                sizes="40px"
                className="object-contain p-1"
              />
            </div>
          </div>
        </div>

        {/* Avatar Overlapping the Banner */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <div
            className={cn(
              'border-card bg-muted relative size-24 overflow-hidden rounded-full border-4',
              'shadow-sm transition-transform duration-500 group-hover:scale-105',
            )}
          >
            <Image
              src={student.avatarUrl}
              alt={student.fullName}
              fill
              sizes="96px"
              className={cn(
                'object-cover transition-all duration-500',
                'grayscale group-hover:grayscale-0',
              )}
            />
          </div>
        </div>

        {/* Card Content Body */}
        <div className="flex flex-col items-center px-6 pt-12 pb-6 text-center">
          {/* Force Name */}
          <span className="text-muted-foreground mb-1 text-[10px] font-bold tracking-widest uppercase">
            {student.force.name}
          </span>

          {/* Name & Job */}
          <h3 className="text-foreground text-xl font-bold tracking-tight">
            {student.fullName}
          </h3>

          <div className="mt-1 flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium">
              {student.job.title}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-foreground bg-chart-2 flex items-center justify-center gap-2 rounded-xs px-1 py-1 font-medium">
              {' '}
              <MapPinHouse className={cn('size-3')} />
              {student.address?.district.name}
            </span>
          </div>

          {/* Details Box */}
          <div className="bg-muted/40 mt-5 flex w-full flex-col gap-2.5 rounded-2xl p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Batch</span>
              <span className="text-foreground font-semibold">
                {student.job.joiningYear}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Village</span>
              <span className="text-foreground truncate font-medium">
                {student.address?.village.name ?? '—'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Mandal</span>
              <span className="text-foreground truncate font-medium">
                {student.address?.mandal.name ?? '—'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="text-foreground font-mono font-medium">
                +91{' '}
                {!isUserLoggedIn
                  ? `xxxxx ${student.mobile?.slice(-5) ?? '—'}`
                  : (student.mobile ?? '—')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Parent</span>
              <span className="text-foreground truncate font-medium">
                {student.family?.[0]?.occupation ?? '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Login Overlay (Blurred Bottom) */}
        {!isUserLoggedIn && (
          <div
            className={cn(
              'absolute right-0 bottom-0 left-0',
              'flex h-55 flex-col items-center justify-end pb-6',
              'from-background via-background bg-linear-to-t to-transparent',
              '',
            )}
          >
            <Link
              href="/auth/signup"
              className={cn(
                'text-primary rounded-xl px-6 py-2.5 text-sm font-semibold',
                'shadow-primary/20 hover:bg-primary/90 shadow-lg transition-all hover:scale-105',
              )}
            >
              Login to view details
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
