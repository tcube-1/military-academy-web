import React from 'react';
import { cn } from '@/lib/utils';

export const StatusDot = () => {
  return (
    <span
      className={cn(
        'relative flex size-3 items-center justify-center rounded-full',
      )}
    >
      <span
        className={cn(
          'absolute inline-flex size-full animate-ping rounded-full opacity-75 duration-1000',
          'bg-quaternary dark:bg-lime-500',
        )}
      />

      {/* 2. Solid center dot (Emerald-600 with white ring border) */}
      <span
        className={cn(
          'relative inline-flex size-2 rounded-full ring-1 ring-white',
          'bg-quaternary dark:bg-lime-500',
        )}
      />
    </span>
  );
};
