'use client';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { cn } from '@/lib/utils';

gsap.registerPlugin(Draggable);

const breakpoints = [
  { name: '7xl', min: 2816 },
  { name: '6xl', min: 2560 },
  { name: '5xl', min: 2304 },
  { name: '4xl', min: 2048 },
  { name: '3xl', min: 1792 },
  { name: '2xl', min: 1536 },
  { name: 'xl', min: 1280 },
  { name: 'lg', min: 1024 },
  { name: 'md', min: 768 },
  { name: 'sm', min: 640 },
  { name: 'xs', min: 0 },
];

export function BreakpointIndicator() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    Draggable.create(ref.current, { bounds: window });

    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const current =
    breakpoints.find((bp) => size.width >= bp.min) ??
    breakpoints[breakpoints.length - 1];
  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-99999 rounded-md bg-black px-3 py-2 font-mono text-xs text-white shadow-lg',
        `top-20 right-20`,
      )}
    >
      <div>
        {size.width}px × {size.height}px
      </div>
      <div className="text-center text-green-400">
        {current.name}
        <span>
          {current?.name === 'xs' ? '(<640px)' : `(<${current?.min})px`}
        </span>
      </div>
    </div>
  );
}
