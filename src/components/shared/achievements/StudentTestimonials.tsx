'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Trophy } from 'lucide-react';

import { studentImages, StudentImageItem } from '@/lib/assets';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

type ScaleSetter = {
  x: gsap.QuickToFunc;
  y: gsap.QuickToFunc;
};

type ActiveTarget = number | 'students' | null;

export default function OverlappingAvatarsWithText() {
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scaleSetters = useRef<(ScaleSetter | null)[]>([]);

  const pointerIdRef = useRef<number | null>(null);
  const activeTargetRef = useRef<ActiveTarget>(null);

  const [activeTarget, setActiveTarget] = useState<ActiveTarget>(null);

  useGSAP(() => {
    scaleSetters.current = avatarRefs.current.map((element) => {
      if (!element) {
        return null;
      }

      return {
        x: gsap.quickTo(element, 'scaleX', {
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto',
        }),

        y: gsap.quickTo(element, 'scaleY', {
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto',
        }),
      };
    });

    return () => {
      scaleSetters.current = [];
    };
  }, []);

  const updateAvatarScale = (activeIndex: number | null) => {
    scaleSetters.current.forEach((setter, index) => {
      if (!setter) {
        return;
      }

      const scale = index === activeIndex ? 1.1 : 1;

      setter.x(scale);
      setter.y(scale);
    });
  };

  const setPointerTarget = (target: ActiveTarget) => {
    if (activeTargetRef.current === target) {
      return;
    }

    activeTargetRef.current = target;
    setActiveTarget(target);

    if (typeof target === 'number') {
      updateAvatarScale(target);
      return;
    }

    // +2000 or outside → avatars return to normal.
    updateAvatarScale(null);
  };

  const getPointerTarget = (element: Element): ActiveTarget => {
    const avatar = element.closest<HTMLElement>('[data-avatar-index]');

    if (avatar) {
      const index = Number(avatar.dataset.avatarIndex);

      return Number.isNaN(index) ? null : index;
    }

    const students = element.closest<HTMLElement>(
      '[data-pointer-target="students"]',
    );

    if (students) {
      return 'students';
    }

    return null;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerIdRef.current = event.pointerId;

    event.currentTarget.setPointerCapture(event.pointerId);

    const target = document.elementFromPoint(event.clientX, event.clientY);

    if (target) {
      setPointerTarget(getPointerTarget(target));
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = document.elementFromPoint(event.clientX, event.clientY);

    if (!target) {
      setPointerTarget(null);
      return;
    }

    setPointerTarget(getPointerTarget(target));
  };

  const resetPointer = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (
      event &&
      pointerIdRef.current !== null &&
      event.currentTarget.hasPointerCapture(pointerIdRef.current)
    ) {
      event.currentTarget.releasePointerCapture(pointerIdRef.current);
    }

    pointerIdRef.current = null;
    setPointerTarget(null);
  };

  return (
    <div className="flex items-center">
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={resetPointer}
        onPointerCancel={resetPointer}
        onPointerLeave={(event) => {
          // Don't reset while an active pointer is captured.
          if (pointerIdRef.current === null) {
            resetPointer(event);
          }
        }}
        onContextMenu={(event) => {
          event.preventDefault();
        }}
        className={cn(
          'flex items-center -space-x-4 overflow-visible',
          'touch-none select-none',
          '[-webkit-user-select:none]',
          '[-webkit-touch-callout:none]',
        )}
      >
        {studentImages.map((student: StudentImageItem, index: number) => {
          const isActive = activeTarget === index;

          return (
            <div
              key={student.id}
              ref={(element) => {
                avatarRefs.current[index] = element;
              }}
              data-avatar-index={index}
              style={{
                zIndex: index + 1,
              }}
              className={cn(
                'group relative size-10 shrink-0',
                'overflow-visible rounded-full md:size-14',
                'cursor-pointer',
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  'relative size-full overflow-hidden rounded-full',
                  'border-background border-2 shadow-md',
                )}
              >
                <Image
                  src={student.image}
                  alt={student.name}
                  loading="eager"
                  placeholder="blur"
                  sizes="56px"
                  draggable={false}
                  className="pointer-events-none size-full object-cover"
                />

                {/* Rank */}
                <div className="absolute inset-x-0 bottom-0 flex h-4 items-start justify-center bg-black/50 backdrop-blur-xs">
                  <span className="mt-1 text-[8px] leading-none font-bold text-white">
                    Army
                  </span>
                </div>
              </div>

              {/* Student link */}
              <Link
                href={`/students/${student.id}`}
                draggable={false}
                data-avatar-link={index}
                className={cn(
                  'absolute left-1/2 -translate-x-1/2',
                  'bg-foreground rounded-md px-2 py-1',
                  'text-[11px] font-semibold whitespace-nowrap',
                  'text-background shadow-lg',
                  'transition-[top,opacity] duration-200',

                  isActive
                    ? 'pointer-events-auto -top-10 opacity-100'
                    : 'pointer-events-none -top-9 opacity-0',

                  'group-hover:pointer-events-auto',
                  'group-hover:-top-10',
                  'group-hover:opacity-100',
                )}
              >
                {student.name}

                <span className="border-t-foreground absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" />
              </Link>
            </div>
          );
        })}

        {/* +2000 Students */}
        <div
          data-pointer-target="students"
          style={{
            zIndex: studentImages.length + 1,
          }}
          className={cn(
            'group relative flex size-12 shrink-0',
            'items-center justify-center',
            '',
            'rounded-full text-center md:size-18',
            'border-background border-2',
            'bg-primary text-secondary shadow-md',
            'text-[12px] font-bold',

            'transition-transform duration-200 ease-out',

            activeTarget === 'students' && 'scale-105',
          )}
        >
          +2000
          {/* Success stories */}
          <span
            className={cn(
              // Positioning & Layout (Mobile lo right-2, Desktop lo left-full)
              'pointer-events-none absolute -top-9 left-5 z-10 flex h-auto w-auto items-center gap-1 md:left-10',

              // Background, Padding & Typography
              'bg-accent px-2.5 py-1 text-[clamp(0.75rem,1vw,1rem)] font-medium shadow-md',

              // Corners: Mobile lo bottom-right sharp, sm/desktop lo bottom-left sharp
              'rounded-2xl rounded-bl-none',

              'opacity-0 transition-[transform,opacity] duration-200',
              activeTarget === 'students'
                ? 'translate-x-0 opacity-100'
                : '-translate-x-2 opacity-0',
              'group-hover:translate-x-0 group-hover:opacity-100',
            )}
          >
            <Trophy size={20} className="h-auto w-auto break-all" />
            success stories
          </span>
        </div>

        {/* Arrow indicator */}
      </div>
    </div>
  );
}
