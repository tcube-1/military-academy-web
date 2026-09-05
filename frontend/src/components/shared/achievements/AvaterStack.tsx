'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChevronsRight } from 'lucide-react';
import { featuredStudents } from '../home/FeatureCard';

// Dummy interface, adjust according to your project
interface Student {
  id: string;
  fullName: string;
  avatarUrl: string;
}

const UP_MOVE_THRESHOLD = 25; // Minimum px to move UP for navigation

export default function AvatarStack() {
  const router = useRouter();
  const students = featuredStudents.slice(0, 10) as Student[];
  const containerRef = useRef<HTMLDivElement>(null);

  // UI states
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [intentToNavigate, setIntentToNavigate] = useState<boolean>(false);

  // References for logic (to avoid re-renders during drag)
  const touchState = useRef({
    isActive: false, // Long press theesesi immediate activation ki idi vadutunnam
    rafId: null as number | null,
    startX: 0,
    startY: 0,
    currentStudentId: null as string | null,
    hasMovedUp: false,
  });

  // 1. Browser Back & Cleanup Fix
  const forceReset = () => {
    setActiveStudent(null);
    setIntentToNavigate(false);
    touchState.current.isActive = false;
    touchState.current.hasMovedUp = false;
    touchState.current.currentStudentId = null;
    if (touchState.current.rafId) {
      cancelAnimationFrame(touchState.current.rafId);
      touchState.current.rafId = null;
    }
  };

  // 2. Scroll Locking (Disable vertical scroll when touching avatars)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeTouchMove = (e: TouchEvent) => {
      // Touch interaction active unnapudu native page scrolling block chestundi
      if (touchState.current.isActive) {
        e.preventDefault();
      }
    };

    // passive: false is strictly required for e.preventDefault() to work on touchmove
    container.addEventListener('touchmove', handleNativeTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener('touchmove', handleNativeTouchMove);
      forceReset(); // Component unmount ayyaka antha clear chestundi
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const target = e.target as HTMLElement;
    const studentEl = target.closest('[data-student-id]');
    if (!studentEl) return;

    // Pointer capture chesi event track miss avvakunda chestham
    e.currentTarget.setPointerCapture(e.pointerId);

    const id = studentEl.getAttribute('data-student-id');
    const student = students.find((s) => s.id === id) || null;
    const state = touchState.current;

    // 3. Immediate Activation (No delay)
    state.isActive = true;
    state.startX = e.clientX;
    state.startY = e.clientY;
    state.currentStudentId = id;
    state.hasMovedUp = false;

    setActiveStudent(student);
    setIntentToNavigate(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = touchState.current;

    // Touch start avvakapothte em cheyoddu
    if (!state.isActive) return;

    // 4. Check Navigation Intent (Moved UP)
    const movedUpDistance = state.startY - e.clientY;
    if (movedUpDistance > UP_MOVE_THRESHOLD) {
      state.hasMovedUp = true;
      setIntentToNavigate(true);
    } else {
      state.hasMovedUp = false;
      setIntentToNavigate(false);
    }

    // Performance tracking kosam RAF
    if (state.rafId) return;
    const { clientX, clientY } = e;

    state.rafId = requestAnimationFrame(() => {
      const elementUnderPointer = document.elementFromPoint(clientX, clientY);
      const studentNode = elementUnderPointer?.closest('[data-student-id]');
      const hoveredId = studentNode?.getAttribute('data-student-id') || null;

      if (hoveredId && hoveredId !== state.currentStudentId) {
        state.currentStudentId = hoveredId;
        const student = students.find((s) => s.id === hoveredId) || null;
        setActiveStudent(student);
      }

      state.rafId = null;
    });
  };

  const resetInteraction = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = touchState.current;

    if (
      containerRef.current &&
      containerRef.current.hasPointerCapture(e.pointerId)
    ) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    // Capture values before resetting
    const shouldNavigate =
      state.isActive && state.hasMovedUp && state.currentStudentId;
    const targetId = state.currentStudentId;

    // Browser back click chesinappudu clean state undadaniki ventane UI reset chestunnam
    forceReset();

    // 5. Navigate avvali anukunte route push chestham
    if (shouldNavigate && targetId) {
      router.push(`/students/${targetId}`);
    }
  };

  return (
    <div className="relative flex items-center justify-end gap-3">
      <ChevronsRight className="animate-pulse" />

      {/* Touch Area Container */}
      <div
        ref={containerRef}
        // touch-none completely browser level touch handling theesestundi
        className="flex touch-none select-none"
        style={{
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={resetInteraction}
        onPointerCancel={resetInteraction}
      >
        {students.map((student) => {
          const isActive = activeStudent?.id === student.id;

          return (
            <div
              key={student.id}
              data-student-id={student.id}
              className={cn(
                'relative -ml-3 transition-all duration-200 ease-out first:ml-0',
                isActive ? 'z-30 -translate-y-3' : 'z-10',
              )}
            >
              <Avatar
                className={cn(
                  'border-background size-10 cursor-pointer border-2 transition-transform duration-200',
                  isActive
                    ? 'ring-primary scale-150 shadow-lg ring-2'
                    : 'scale-100',
                )}
              >
                <AvatarImage
                  src={student.avatarUrl}
                  alt={student.fullName}
                  draggable={false}
                  className="pointer-events-none"
                />
                <AvatarFallback className="pointer-events-none select-none">
                  {student.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          );
        })}
      </div>

      {/* Popup */}
      <div
        className={cn(
          'absolute bottom-full left-1/2 z-50 mb-4',
          'w-64 -translate-x-1/2',
          'pointer-events-none',
          'bg-background rounded-xl border p-4 shadow-xl transition-all duration-200 ease-out',
          activeStudent
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-4 scale-95 opacity-0',
        )}
      >
        <p className="font-semibold">{activeStudent?.fullName}</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Drag left/right to browse
        </p>

        <p
          className={cn(
            'mt-2 text-xs font-semibold transition-colors duration-200',
            intentToNavigate ? 'animate-pulse text-green-500' : 'text-primary',
          )}
        >
          {intentToNavigate
            ? 'Release to view profile ↗'
            : 'Swipe UP to view profile'}
        </p>
      </div>
    </div>
  );
}
