import { defencelogo, DefenceLogos } from '@/lib/assets';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'radix-ui/tabs';

const getLogo = (name: string) =>
  DefenceLogos.find(
    (item: defencelogo) => item.name.toLowerCase() === name.toLowerCase(),
  );

function OurMilestones() {
  const armyLogo = getLogo('Army');
  const navyLogo = getLogo('Navy');
  const airforceLogo = getLogo('airforce');

  const triggerClass = cn(
    'group relative flex size-24 items-center justify-center overflow-hidden',
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
    'bg-card/80 p-6 text-center shadow-md',
    'backdrop-blur-md outline-none',
  );

  return (
    <section
      className={cn(
        'relative flex min-h-fit justify-center',
        'overflow-hidden px-4 py-5',
        'bg-background text-foreground',
      )}
    >
      {/* Background accent */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-[radial-gradient(circle_at_50%_20%,var(--accent),transparent_35%)]',
          'opacity-[0.06]',
        )}
      />

      <div className="relative top-2 z-10 w-full max-w-4xl">
        <Tabs defaultValue="army" className="mt-4 w-full">
          {/* Heading */}
          {/* Logo Tabs */}
          <div className="flex justify-center">
            <TabsList
              className={cn(
                'inline-flex h-auto items-center gap-3',
                'border-border rounded-2xl border',
                'bg-card p-2 shadow-md',
              )}
            >
              {/* Army */}
              <TabsTrigger
                value="army"
                aria-label="Army"
                className={triggerClass}
              >
                <div className="relative size-20">
                  {armyLogo && (
                    <Image
                      src={armyLogo.href}
                      alt={armyLogo.name}
                      fill
                      sizes="80px"
                      className={cn(
                        'object-contain',
                        'transition-transform duration-300',
                        'group-hover:scale-105',
                      )}
                    />
                  )}
                </div>

                {/* Active indicator */}
                <span
                  className={cn(
                    'absolute bottom-0 left-1/2 h-2 w-full',
                    '-translate-x-1/2 rounded-full',
                    'from-primary/40 via-primary/15 bg-linear-0 to-transparent',
                    'opacity-0 transition-opacity duration-300',
                    'group-data-[state=active]:opacity-100',
                  )}
                />
              </TabsTrigger>

              {/* Navy */}
              <TabsTrigger
                value="navy"
                aria-label="Navy"
                className={triggerClass}
              >
                <div className="relative size-20">
                  {navyLogo && (
                    <Image
                      src={navyLogo.href}
                      alt={navyLogo.name}
                      fill
                      sizes="80px"
                      className={cn(
                        'object-contain',
                        'transition-transform duration-300',
                        'group-hover:scale-105',
                      )}
                    />
                  )}
                </div>

                <span
                  className={cn(
                    'absolute bottom-0 left-1/2 h-2 w-full',
                    '-translate-x-1/2 rounded-full',
                    'from-primary/40 via-primary/15 bg-linear-0 to-transparent',
                    'opacity-0 transition-opacity duration-300',
                    'group-data-[state=active]:opacity-100',
                  )}
                />
              </TabsTrigger>

              {/* Air Force */}
              <TabsTrigger
                value="airforce"
                aria-label="Air Force"
                className={triggerClass}
              >
                <div className="relative size-20">
                  {airforceLogo && (
                    <Image
                      src={airforceLogo.href}
                      alt={airforceLogo.name}
                      fill
                      sizes="80px"
                      className={cn(
                        'object-contain',
                        'transition-transform duration-300',
                        'group-hover:scale-105',
                      )}
                    />
                  )}
                </div>

                <span
                  className={cn(
                    'absolute bottom-0 left-1/2 h-2 w-full',
                    '-translate-x-1/2 rounded-full',
                    'from-primary/40 via-primary/15 bg-linear-0 to-transparent',
                    'opacity-0 transition-opacity duration-300',
                    'group-data-[state=active]:opacity-100',
                  )}
                />
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mx-auto my-10 max-w-2xl text-center">
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
                'mt-4 text-sm leading-6',
                'text-muted-foreground sm:text-base',
              )}
            >
              Our students have earned recognition across India&apos;s
              prestigious defence forces.
            </p>
          </div>
          <div className={cn('flex items-center justify-center')}>
            <span
              className={cn(
                'mb-4 inline-flex items-center rounded-full',
                'border-accent/30 bg-accent/10 border',
                'px-4 py-1.5 text-xs font-semibold tracking-wide',
                'text-accent',
              )}
            >
              OUR MILESTONES
            </span>
          </div>
          {/* Content */}
          <div className="mx-auto mt-8 max-w-2xl">
            <TabsContent value="army" className={contentClass}>
              <p className="text-primary text-sm font-semibold tracking-wider uppercase">
                Indian Army
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Strength • Discipline • Service
              </h3>

              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Explore our achievements and student success stories connected
                with the Indian Army.
              </p>
            </TabsContent>

            <TabsContent value="navy" className={contentClass}>
              <p className="text-primary text-sm font-semibold tracking-wider uppercase">
                Indian Navy
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Courage • Commitment • Excellence
              </h3>

              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Explore our achievements and student success stories connected
                with the Indian Navy.
              </p>
            </TabsContent>

            <TabsContent value="airforce" className={contentClass}>
              <p className="text-primary text-sm font-semibold tracking-wider uppercase">
                Indian Air Force
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Valor • Precision • Excellence
              </h3>

              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Explore our achievements and student success stories connected
                with the Indian Air Force.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

export default OurMilestones;
