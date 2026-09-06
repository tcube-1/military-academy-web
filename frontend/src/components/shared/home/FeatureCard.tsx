'use client';

import studentsData from '../../../../data/Defence_Academy_1000_Student_Objects.json';

import { studentDataType } from '@/utils/types';
import { cn } from '@/lib/utils';

import WebAchieverCard from '@/components/section/Cards/WebAchieverCard';

import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import { ScrollWrapperProps } from '@/components/section/ribbon/RibbonWrapper';
import { authClient } from '@/components/auth/AuthClient';

interface FeatureCardProps extends ScrollWrapperProps {
  students?: studentDataType[];
}

const allStudents = studentsData as studentDataType[];

// Homepage featured students
export const featuredStudents = allStudents.slice(6, 50);

export default function FeatureCard({
  students,
  children,
  className,
  scrollSpeed = 1,
  ...options
}: FeatureCardProps) {
  // If students are passed, use them.
  // Otherwise use homepage featured students.
  const studentsToRender = students ?? featuredStudents;

  const [emblaRef] = useEmblaCarousel(
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

  // Don't render until auth state is known.
  if (isPending) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        ref={emblaRef}
        className={cn('relative w-full overflow-hidden py-5', className)}
      >
        <div className="flex touch-pan-y">
          {studentsToRender.map((student) => (
            <div
              key={student.id}
              className={cn(
                'flex min-w-0 shrink-0',
                'cursor-grab px-3',
                'active:cursor-grabbing',
              )}
            >
              <WebAchieverCard
                student={student}
                isUserLoggedIn={isUserLoggedIn}
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
