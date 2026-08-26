'use client';

import { useState } from 'react';
import { Shield, Plane, Anchor } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define TypeScript interfaces
interface ForceData {
  id: string;
  name: string;
  motto: string;
  description: string;
  icon: React.ElementType;
}

const forces: ForceData[] = [
  {
    id: 'army',
    name: 'INDIAN ARMY',
    motto: 'Strength • Discipline • Service',
    description:
      'Explore our achievements and student success stories connected with the Indian Army.',
    icon: Shield,
  },
  {
    id: 'airforce',
    name: 'INDIAN AIR FORCE',
    motto: 'Touch the Sky with Glory',
    description:
      'Discover how our cadets are trained to soar high and protect the aerospace of our nation.',
    icon: Plane,
  },
  {
    id: 'navy',
    name: 'INDIAN NAVY',
    motto: 'Sham No Varunah',
    description:
      'Learn about our rigorous preparation for those aspiring to conquer the seas with the Indian Navy.',
    icon: Anchor,
  },
];

export default function DefenceForces({ className }: { className?: string }) {
  const [activeForce, setActiveForce] = useState<string>('army');

  const activeData = forces.find((f) => f.id === activeForce) || forces[0];

  return (
    // 'dark' class ni explicitly vadatam valla ee section deep dark navy look loki velthundi
    <section
      className={cn(
        'dark bg-background text-foreground flex w-full flex-col items-center py-16 text-center md:py-24',
        className,
      )}
      aria-labelledby="forces-heading"
    >
      <div className="container mx-auto flex flex-col items-center px-4 md:px-6">
        {/* Badges Selector Container */}
        <div
          className="bg-card/40 border-border mb-8 flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm md:gap-8"
          role="tablist"
          aria-label="Select Defence Force"
        >
          {forces.map((force) => {
            const Icon = force.icon;
            const isActive = activeForce === force.id;

            return (
              <button
                key={force.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveForce(force.id)}
                className={cn(
                  'rounded-xl p-3 transition-all duration-300 md:p-4',
                  isActive
                    ? 'bg-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : 'hover:bg-secondary/50 opacity-60 hover:opacity-100',
                )}
              >
                <Icon
                  className={cn(
                    'h-8 w-8 transition-colors duration-300 md:h-10 md:w-10',
                    isActive ? 'text-accent' : 'text-muted-foreground',
                  )}
                />
                <span className="sr-only">{force.name}</span>
              </button>
            );
          })}
        </div>

        {/* Heading Section */}
        <h2
          id="forces-heading"
          className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
        >
          Serving With <span className="text-primary">Pride</span>
        </h2>

        <p className="text-muted-foreground mb-8 max-w-2xl text-sm md:text-base">
          Our students have earned recognition across India&apos;s prestigious
          defence forces.
        </p>

        {/* Milestones Badge */}
        <div className="border-accent bg-accent/5 mb-10 inline-flex items-center justify-center rounded-full border px-4 py-1.5">
          <span className="text-accent text-xs font-bold tracking-widest uppercase">
            Our Milestones
          </span>
        </div>

        {/* Active Content Card */}
        <div className="bg-card border-border animate-in fade-in slide-in-from-bottom-4 w-full max-w-3xl rounded-2xl border p-8 shadow-lg transition-all duration-500 md:p-10">
          <h3 className="text-primary mb-3 text-sm font-bold tracking-widest uppercase">
            {activeData.name}
          </h3>
          <p className="text-foreground mb-4 text-2xl font-semibold md:text-3xl">
            {activeData.motto}
          </p>
          <p className="text-muted-foreground mx-auto max-w-xl text-sm md:text-base">
            {activeData.description}
          </p>
        </div>
      </div>
    </section>
  );
}
