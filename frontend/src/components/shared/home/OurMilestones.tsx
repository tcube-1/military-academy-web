'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { defencelogo, DefenceLogos } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface MilestoneTabItem {
  id: string;
  name: string;
  searchKey: string;
  tagline: string;
  description: string;
}

const MILESTONE_TABS: MilestoneTabItem[] = [
  {
    id: 'army',
    name: 'Indian Army',
    searchKey: 'Army',
    tagline: 'Strength • Discipline • Service',
    description:
      'Explore our achievements and student success stories connected with the Indian Army.',
  },
  {
    id: 'navy',
    name: 'Indian Navy',
    searchKey: 'Navy',
    tagline: 'Courage • Commitment • Excellence',
    description:
      'Explore our achievements and student success stories connected with the Indian Navy.',
  },
  {
    id: 'airforce',
    name: 'Indian Air Force',
    searchKey: 'airforce',
    tagline: 'Valor • Precision • Excellence',
    description:
      'Explore our achievements and student success stories connected with the Indian Air Force.',
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

  const contentClass = cn(
    'rounded-2xl border border-border',
    'bg-card/80 p-6 md:p-8 text-center shadow-md',
    'backdrop-blur-md outline-none transition-all duration-300',
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex min-h-fit justify-center',
        'overflow-hidden px-4 py-12',
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

      <div className="relative z-10 flex max-w-4xl">
        <Tabs
          defaultValue="army"
          value={activeTab}
          onValueChange={handleTabChange}
          className="flex w-full flex-col"
        >
          {/* Logo Tabs List */}
          <div className="flex justify-center">
            <TabsList
              className={cn(
                'inline-flex h-auto items-center gap-1 md:gap-2',
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
                    <div className="relative size-22">
                      {logo?.href && (
                        <Image
                          src={logo.href}
                          alt={logo.name}
                          fill
                          sizes="(max-width: 768px) 56px, 64px"
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
                        'via-primary bg-linear-to-r from-transparent to-transparent',
                        'opacity-0 transition-opacity duration-300',
                        'group-data-[state=active]:opacity-100',
                      )}
                    />
                    <span
                      className={cn(
                        'pb-2 text-[10px] leading-2.5 text-wrap uppercase',
                      )}
                    >
                      {tab.name}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Heading */}
          <div className="mx-auto my-8 max-w-2xl text-center">
            <h2
              className={cn(
                'text-3xl font-bold tracking-tight',
                'sm:text-4xl md:text-5xl',
              )}
            >
              Serving With <span className="text-primary">Pride</span>
            </h2>

            <p
              className={cn(
                'mt-3 text-sm leading-6',
                'text-muted-foreground sm:text-base',
              )}
            >
              Our students have earned recognition across India&apos;s
              prestigious defence forces.
            </p>
          </div>

          {/* Badge */}
          <div className="flex items-center justify-center">
            <span
              className={cn(
                'mb-6 inline-flex items-center rounded-full',
                'border-accent/30 bg-accent/10 border',
                'px-4 py-1.5 text-xs font-semibold tracking-wide',
                'text-accent',
              )}
            >
              OUR MILESTONES
            </span>
          </div>

          {/* Dynamic Content Sections */}
          <div className="mx-auto max-w-2xl">
            {MILESTONE_TABS.map((tab: MilestoneTabItem) => (
              <TabsContent key={tab.id} value={tab.id} className={contentClass}>
                <p className="text-primary text-xs font-semibold tracking-widest uppercase md:text-sm">
                  {tab.name}
                </p>

                <h3 className="mt-2 text-xl font-bold tracking-tight md:text-2xl">
                  {tab.tagline}
                </h3>

                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {tab.description}
                </p>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
