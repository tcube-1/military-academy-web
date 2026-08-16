import { cn } from '@/lib/utils';
import React from 'react';

function OurMilestones() {
  return (
    <section className={cn('relative h-screen')}>
      <div
        className={cn(
          'absolute top-[-10%] flex w-screen items-center justify-center space-x-2',
        )}
      >
        <div className={cn('size-50 border-2')}> 1</div>
        <div className={cn('size-50 border-2')}> 2</div>
        <div className={cn('size-50 border-2')}> 3</div>
      </div>
    </section>
  );
}

export default OurMilestones;
