import { cn } from '@/lib/utils';
import { studentDataType } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface WebAchieverCardProps {
  student: studentDataType;
  isUserLoggedIn: boolean;
  isMounted?: boolean;
}

export default function WebAchieverCard({
  student,
  isUserLoggedIn,
}: WebAchieverCardProps) {
  if (!student) return null;

  const svgPathItem =
    'M 0.0333,0.0014 H 0.7303 C 0.7475,0.0014 0.7615,0.0107 0.7615,0.0222 V 0.1403 C 0.7615,0.1533 0.7774,0.1639 0.7969,0.1639 H 0.9667 C 0.9839,0.1639 0.9979,0.1732 0.9979,0.1847 V 0.9778 L 0.9979,0.9789 C 0.9970,0.9899 0.9834,0.9986 0.9667,0.9986 H 0.0333 C 0.0161,0.9986 0.0021,0.9893 0.0021,0.9778 V 0.0222 C 0.0021,0.0107 0.0161,0.0014 0.0333,0.0014 Z';

  return (
    <section className="group relative w-max">
      {/*_______________________ Shape SVG Defs _______________________*/}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="custom-folder-notch" clipPathUnits="objectBoundingBox">
            <path d={svgPathItem} />
          </clipPath>
        </defs>
      </svg>

      {/*_______________________ Force Logo (Rounded Square, NOT Circle) _______________________*/}

      {/*_______________________ Ultra-Thin Border Wrapper _______________________*/}
      <div
        // style={{ clipPath: 'url(#custom-folder-notch)' }}
        className={cn(
          'rounded-2xl px-0.5 py-2',
          'from-accent to-tertiary bg-linear-180',
          'from-20% to-95%',
          'transition-transform duration-200',
          'hover:scale-101',
          'active:scale-101',
        )}
      >
        {/*_______________________ Inner Card Body _______________________*/}
        <article
          // style={{ clipPath: 'url(#custom-folder-notch)' }}
          className={cn(
            'bg-card flex h-100 w-64 flex-col rounded-xl p-5 shadow-xs',
            'transition-all duration-300',
            'inset-50 shadow-md shadow-yellow-500',
            'items-center justify-center',
          )}
        >
          {/*_______________________ heading logo  _______________________*/}
          <div
            className={cn('relative flex w-full items-center justify-between')}
          >
            <div className={cn('relative size-10')}>
              <Image
                src={'images/dda-logo-1.png'}
                alt={student.force.name}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <div className={cn('flex flex-col items-center justify-between')}>
              <span className="text-accent text-sm font-extrabold tracking-wider uppercase">
                {student.studentCode}
              </span>
              <hr className={cn('border-muted-foreground/20 my-0.5 w-full')} />
              <div
                className={cn(
                  'text-[10px] font-medium tracking-widest text-white uppercase',
                )}
              >
                {' '}
                {student.force.name}
              </div>
            </div>

            <div className={cn('relative size-10')}>
              <Image
                src={student.force.logoUrl}
                alt={student.force.name}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
          {/*_______________________ avatar image and name  _______________________*/}
          <div className="mt-2 flex w-full justify-center">
            <div
              className={cn(
                'border-muted relative size-22 overflow-hidden rounded-2xl border',
                'bg-muted/30 shadow-inner transition-transform duration-500 group-hover:scale-[1.03]',
              )}
            >
              <Image
                src={student.avatarUrl}
                alt={student.fullName}
                fill
                unoptimized
                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
          </div>
          {/* Bottom: Classic Typography Section */}
          <div className="mt-2 flex w-full flex-col items-center text-center">
            <h3 className="text-card-foreground text-lg font-semibold tracking-wide">
              {student.fullName}
            </h3>

            {/* Job & Force neat inline display */}
            <div className="flex items-center justify-center gap-2 text-nowrap">
              <span className="text-foreground/80 text-sm font-medium">
                {student.job.title}
              </span>
              <span className="text-xs text-gray-400">|</span>
              <span className="bg-chart-4 rounded-xs px-1 py-0.5 text-xs font-medium text-white">
                {student.address?.district.name}
              </span>
            </div>

            {/*_______________________ badge and year _______________________*/}
            <div className="bg-secondary mt-2 flex items-center justify-center rounded-2xl px-3 py-1">
              <span className="text-secondary-foreground text-xs font-medium">
                Batch of {student.job.joiningYear}
              </span>
            </div>
          </div>
          <div
            className={cn(
              'divide-accent/50 mt-3 flex w-full flex-col justify-center gap-2 divide-y font-mono text-xs',
            )}
          >
            {/*_______________________ village _______________________*/}
            <div className={cn('flex items-center justify-evenly')}>
              <span className="flex-1">Village</span>
              <span className={cn('flex-2 text-end')}>
                {student.address?.village.name}
              </span>
            </div>
            {/*_______________________ mandal _______________________*/}
            <div className={cn('flex items-center justify-evenly')}>
              <span className="flex-1">Mandal</span>
              <span className={cn('flex-2 text-end')}>
                {student.address?.mandal.name}
              </span>
            </div>

            {/*_______________________ mandal _______________________*/}
            <div className={cn('flex items-center justify-evenly')}>
              <span className="flex-1">Phone</span>
              <span className={cn('flex-2 text-end')}>
                +91{' '}
                {!isUserLoggedIn
                  ? `xxxxx ${student.mobile.slice(-5)}`
                  : student.mobile}
              </span>
            </div>
            {/*_______________________ Occupation _______________________*/}
            <div className={cn('flex items-center justify-evenly')}>
              <span className="flex-1">Parent Occupation</span>
              <span className={cn('flex-2 text-end')}>
                {student.family[0]?.occupation}
              </span>
            </div>
            {/*_______________________ hide card _______________________*/}
            {
              <div
                className={cn(
                  isUserLoggedIn
                    ? 'hidden'
                    : 'via-muted from-muted to-muted/0 absolute inset-x-0.5 bottom-2 flex h-[50%] flex-col items-center justify-end rounded-2xl bg-linear-to-t pb-3',
                )}
              >
                {' '}
                <Link href={'/auth/signup'}>
                  <span className={cn('px-4 py-1')}>click to view</span>
                </Link>
              </div>
            }
          </div>
        </article>
      </div>
    </section>
  );
}
