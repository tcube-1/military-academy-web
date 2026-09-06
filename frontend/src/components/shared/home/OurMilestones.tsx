'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { defencelogo, DefenceLogos } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import DefenceForceCard from '@/components/section/Cards/DefenceForceCard';

interface MilestoneTabItem {
  id: string;
  name: string;
  searchKey: string;
}

const MILESTONE_TABS: MilestoneTabItem[] = [
  { id: 'army', name: 'Indian Army', searchKey: 'Army' },
  { id: 'navy', name: 'Indian Navy', searchKey: 'Navy' },
  { id: 'airforce', name: 'Indian Air Force', searchKey: 'airforce' },
];

const forcesData = [
  {
    id: 'army',
    forceName: 'Indian Army',
    logoUrl: '/logos/army-logo.png',
    description: 'Serving with courage, discipline and dedication',
    totalStudents: '1,040+',
    jobLink: '/auth/signup', // Example Link
    categories: [
      { name: 'GD', count: '780+' },
      { name: 'NURSING', count: '260+' },
    ],
  },
  {
    id: 'navy',
    forceName: 'Indian Navy',
    logoUrl: '/logos/navy-logo.png',
    description: 'Building careers with courage and commitment',
    totalStudents: '610+',
    jobLink: '/auth/signup', // Example Link
    categories: [
      { name: 'MR', count: '320+' },
      { name: 'SSR', count: '290+' },
    ],
  },
  {
    id: 'airforce',
    forceName: 'Indian Air Force',
    logoUrl: '/logos/airforce-logo.png',
    description: 'Preparing aspirants to rise above the ordinary',
    totalStudents: '350+',
    jobLink: '/auth/signup', // Example Link
    categories: [
      { name: 'GD', count: '180+' },
      { name: 'AIRMEN', count: '170+' },
    ],
  },
];

const getLogo = (name: string): defencelogo | undefined =>
  DefenceLogos.find(
    (item: defencelogo) => item.name.toLowerCase() === name.toLowerCase(),
  );

export default function OurMilestones(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const activeTab = searchParams.get('tab') ?? 'army';

  const handleTabChange = (val: string) => {
    router.replace(`?tab=${val}`, { scroll: false });
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  const triggerClass = cn(
    'group relative flex flex-col size-28 md:size-30 items-center justify-center overflow-hidden',
    'rounded-xl border border-transparent',
    'transition-all duration-300',
    'text-muted-foreground',
    'hover:bg-muted/60 hover:text-foreground',
    'data-[state=active]:border-primary/30',
    'data-[state=active]:bg-primary/10',
    'data-[state=active]:text-primary',
    'data-[state=active]:shadow-md',
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex min-h-fit justify-center',
        'overflow-hidden px-4 py-16',
        'text-foreground',
      )}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-[radial-gradient(circle_at_50%_20%,var(--accent),transparent_50%)]',
          'opacity-[0.08]',
        )}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        {/* Navigation Tabs (Top) */}
        <Tabs
          defaultValue="army"
          value={activeTab}
          onValueChange={handleTabChange}
          className="flex w-full flex-col items-center"
        >
          <div className="flex w-full justify-center">
            <TabsList
              className={cn(
                'inline-flex h-auto items-center gap-2 md:gap-4',
                'border-border rounded-2xl border',
                'bg-card/90 p-2 shadow-md backdrop-blur-sm',
              )}
            >
              {MILESTONE_TABS.map((tab: MilestoneTabItem) => {
                const logo = getLogo(tab.searchKey);

                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    aria-label={tab.name}
                    className={triggerClass}
                  >
                    <div className="relative size-20 md:size-22">
                      {logo?.href && (
                        <Image
                          src={logo.href}
                          alt={logo.name}
                          priority={true}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          className={cn(
                            'object-contain p-1',
                            'transition-transform duration-300',
                            'group-hover:scale-105',
                          )}
                        />
                      )}
                    </div>
                    {/* Active highlight bar */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute bottom-0 left-1/2 h-1.5 w-4/5',
                        '-translate-x-1/2 rounded-full',
                        'via-primary bg-gradient-to-r from-transparent to-transparent',
                        'opacity-0 transition-opacity duration-300',
                        'group-data-[state=active]:opacity-100',
                      )}
                    />
                    <span className="pb-1 text-[10px] leading-tight font-semibold tracking-wider uppercase">
                      {tab.name}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </Tabs>
        {/* Heading Section */}
        <div className="mx-auto my-4 max-w-2xl text-center lg:my-8">
          <h2
            className={cn(
              'text-3xl font-extrabold tracking-tight',
              'sm:text-4xl md:text-5xl',
            )}
          >
            Serving With <span className="text-primary">Pride</span>
          </h2>
          {/* <p
            className={cn('mt-1 text-sm', 'text-muted-foreground sm:text-base')}
          >
            Our students have earned recognition across India&apos;s prestigious
            defence forces.
          </p> */}
        </div>
        {/* 3 Cards Grid Layout */}
        <div className="grid w-full grid-cols-1 place-items-center gap-6 md:grid-cols-3 md:items-stretch lg:gap-8">
          {forcesData.map((force) => {
            const isActive = activeTab === force.id;
            return (
              <div
                key={force.id}
                className={cn(
                  'w-full transition-all duration-500',
                  // isActive true ayithe mobile/desktop renditlo kanipisthundi.
                  // isActive false ayithe mobile lo hidden, kani md (desktop) size lo kanipisthundi.
                  isActive ? 'block' : 'hidden md:block',
                )}
              >
                <DefenceForceCard
                  id={force.id}
                  forceName={force.forceName}
                  logoUrl={force.logoUrl}
                  description={force.description}
                  totalStudents={force.totalStudents}
                  categories={force.categories}
                  isActive={isActive}
                  jobLink={force.jobLink}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
