'use client';

import studentsData from '../../../../data/Defence_Academy_1000_Student_Objects.json';
import { studentDataType } from '@/utils/types';
import { cn } from '@/lib/utils';
import WebAchieverCard from '@/components/section/Cards/WebAchieverCard';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ScrollWrapperProps } from '@/components/section/ribbon/RibbonWrapper';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { authClient } from '@/components/auth/AuthClient';
import { useEffect, useState } from 'react';

const students = studentsData as studentDataType[];
export const featuredStudents = students.slice(6, 50);
export default function FeatureCard({
  children,
  className,
  scrollSpeed = 1,
  ...options
}: ScrollWrapperProps) {
  // Initialize Embla
  const [emblaRef1] = useEmblaCarousel(
    {
      dragFree: true,
      align: 'start',
      containScroll: 'trimSnaps',
      loop: true,
      ...options,
    },
    [
      AutoScroll({
        speed: scrollSpeed,
        stopOnInteraction: false,
        startDelay: 500,
      }),
      WheelGesturesPlugin(),
    ],
  );
  const { data: session, isPending } = authClient.useSession();

  const isUserLoggedIn = Boolean(session?.user);

  const [isMounted, setisMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (isPending) {
    return null;
  }

  return (
    <div className={cn('')}>
      <div
        className={cn('relative w-full overflow-hidden py-5', className)}
        ref={emblaRef1}
      >
        <div className="flex touch-pan-y">
          {featuredStudents.map((std) => (
            <div
              key={std.id}
              className={cn(
                'flex min-w-0 shrink-0 cursor-grab px-3 active:cursor-grabbing',
              )}
            >
              <WebAchieverCard
                student={std}
                isUserLoggedIn={isUserLoggedIn}
                isMounted={isMounted}
              />
            </div>
          ))}
        </div>
      </div>
      {children && (
        <div className="min-w-0 flex-[0_0_auto] shrink-0 px-2">{children}</div>
      )}
    </div>
  );
}
