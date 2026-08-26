import * as React from 'react';
import { ribbonMessages } from '@/lib/assets';

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import RibbonWrapper from './RibbonWrapper';

interface RibbonProps {
  className?: string;
}

export default function Ribbon({ className }: RibbonProps) {
  return (
    <header
      className={cn(
        'fixed',
        'bg-primary text-primary-foreground inset-x-0 z-100 flex h-7 items-center overflow-hidden text-xs',
        className,
      )}
      role="region"
      aria-label="Announcement Ribbon"
    >
      <div className="flex h-full w-full items-center">
        <RibbonWrapper>
          {/* Duplicate set for seamless looping - hidden from screen readers */}
          {[...ribbonMessages, ...ribbonMessages].map(
            (msg: string, index: number) => (
              <div
                key={`duplicate-${index}-${msg}`}
                aria-hidden="true"
                className="flex h-full shrink-0 justify-center px-6 font-medium whitespace-nowrap select-none"
              >
                <ChevronRight
                  size={15}
                  className={cn('bg-tertiary mr-2 rounded-full')}
                />
                <span>{msg}</span>
              </div>
            ),
          )}
        </RibbonWrapper>
      </div>
    </header>
  );
}
