import FeatureCard from '@/components/shared/home/FeatureCard';
import { cn } from '@/lib/utils';
import React from 'react';

function page() {
  return (
    <div className={cn('container mx-auto min-h-screen')}>
      <section className={cn('')}>
        <FeatureCard />
      </section>
    </div>
  );
}

export default page;
