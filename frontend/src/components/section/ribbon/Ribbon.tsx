import * as React from 'react';
import { RibbonMessage, RibbonMessages } from '@/lib/assets';

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import RibbonWrapper from './RibbonWrapper';
import Link from 'next/link';

export default function Ribbon({ className }: RibbonMessage) {
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
          {[...RibbonMessages, ...RibbonMessages].map(
            (item: RibbonMessage, index: number) => (
              <div
                key={`duplicate-${index}-${index}`}
                aria-hidden="true"
                className="flex h-full shrink-0 justify-center px-6 font-medium whitespace-nowrap select-none"
              >
                <ChevronRight
                  size={15}
                  className={cn('bg-tertiary mr-2 rounded-full')}
                />
                <span>{item.message}</span>
                <Link
                  href={item.link}
                  className="ml-3 text-green-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here{' '}
                </Link>
              </div>
            ),
          )}
        </RibbonWrapper>
      </div>
    </header>
  );
}
