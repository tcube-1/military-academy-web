'use client';

import { cn } from '@/lib/utils';
import { Users, ShieldCheck, Trophy, Target } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
}

const StatItem = ({ icon: Icon, value, suffix = '', label }: StatItemProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counterElement = counterRef.current;

    if (!counterElement) return;

    const counter = { value: 0 };

    const animation = gsap.to(counter, {
      value,
      duration: 2,
      ease: 'power2.out',

      scrollTrigger: {
        trigger: counterElement,
        start: 'top 90%',
        once: true,
      },

      onUpdate: () => {
        counterElement.textContent = `${Math.floor(counter.value)}${suffix}`;
      },
    });

    return () => {
      animation.kill();
    };
  }, [value, suffix]);

  return (
    <div className="group flex flex-col items-center justify-center p-6 text-center">
      <div
        className={cn(
          'mb-4 rounded-full p-4',
          'bg-primary-foreground/5',
          'ring-primary-foreground/10 ring-1',
          'transition-colors duration-300',
          'group-hover:bg-primary-foreground/10',
        )}
      >
        <Icon className="text-accent h-8 w-8" aria-hidden="true" />
      </div>

      <dd className="text-primary-foreground mb-2 text-4xl font-bold tracking-tight md:text-5xl">
        <span ref={counterRef}>10{suffix}</span>
      </dd>

      <dt className="text-primary-foreground/80 text-sm font-medium tracking-widest uppercase md:text-base">
        {label}
      </dt>
    </div>
  );
};

export default function SuccessStats({ className }: { className?: string }) {
  const statsData = [
    {
      id: 1,
      icon: Trophy,
      value: 2000,
      suffix: '+',
      label: 'NDA & CDS Selections',
    },
    {
      id: 2,
      icon: ShieldCheck,
      value: 15,
      suffix: '+',
      label: 'Years of Excellence',
    },
    {
      id: 3,
      icon: Target,
      value: 94,
      suffix: '%',
      label: 'Success Rate',
    },
    {
      id: 4,
      icon: Users,
      value: 50,
      suffix: '+',
      label: 'Ex-Defence Mentors',
    },
  ];

  return (
    <section
      className={cn(
        'bg-primary border-border w-full border-y py-16 md:py-20',
        className,
      )}
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">
        Our Success Statistics
      </h2>

      <div className="container mx-auto px-4 md:px-6">
        <dl className="lg:divide-primary-foreground/20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          {statsData.map((stat) => (
            <StatItem
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
