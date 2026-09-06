'use client';

import Image from 'next/image';
import { Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface ForceCategory {
  name: string;
  count: string | number;
}

export interface DefenceForceCardProps {
  forceName: string;
  logoUrl: string;
  description: string;
  totalStudents: string | number;
  categories: ForceCategory[];
  isActive?: boolean;
  jobLink?: string;
}

export default function DefenceForceCard({
  forceName,
  logoUrl,
  description,
  totalStudents,
  categories,
  isActive = false,
  jobLink = '#',
}: DefenceForceCardProps) {
  return (
    <article
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-4xl bg-white transition-all duration-300 ease-in-out',
        // Active aithe blue border & shadow, Inactive aithe normal border (No opacity drop)
        isActive
          ? 'border-primary scale-100 border-2 shadow-xl md:scale-105'
          : 'scale-100 border border-gray-200 shadow-sm hover:shadow-md',
      )}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center px-2 pt-5 pb-2 text-center">
        {/* Logo Box - Yellow Border from Screenshot */}
        <div className="mb-2 flex size-20 items-center justify-center rounded-2xl border-[1.5px] border-amber-300 bg-white p-2">
          <div className="relative size-full">
            <Image
              src={logoUrl}
              alt={forceName}
              fill
              className="object-contain"
              sizes="80px"
            />
          </div>
        </div>

        {/* Text Details */}
        <span className="mb-1 text-[11px] font-bold tracking-widest text-amber-500 uppercase">
          Defence Force
        </span>
        <h2 className="mb-1 text-xl font-extrabold text-gray-900 md:text-2xl">
          {forceName}
        </h2>
        <p className="mx-auto max-w-60 text-xs leading-relaxed text-gray-500 md:text-sm">
          {description}
        </p>
      </div>

      {/* Middle Section: Total Students */}
      <div className="mt-auto flex flex-col items-center justify-center border-t border-gray-100 bg-gray-50/50 py-5">
        <div className="mb-1 flex items-center justify-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Users size={16} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl">
            {totalStudents}
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
          Successful Students
        </span>
      </div>

      {/* Bottom Section: Categories Grid */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center py-5">
            <ShieldCheck
              size={20}
              className="mb-2 text-emerald-500"
              strokeWidth={2}
            />
            <span className="mb-1 text-[11px] font-bold text-gray-600 uppercase">
              {category.name}
            </span>
            <span className="text-lg font-extrabold text-gray-900 md:text-xl">
              {category.count}
            </span>
          </div>
        ))}
      </div>

      {/* Button Section (Only visible when Active) */}
      <div
        className={cn(
          'grid overflow-hidden bg-gray-50 transition-all duration-300',
          isActive
            ? 'grid-rows-[1fr] border-t border-gray-200'
            : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <div className="p-4">
            <Link
              href={jobLink}
              className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95"
            >
              Go to Job Card
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
