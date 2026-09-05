import { cn } from '@/lib/utils';

import HeroSection from '@/components/shared/home/HeroSection';
import OurMilestones from '@/components/shared/home/OurMilestones';
import AboutSection from '@/components/shared/home/AboutSection';
import SuccessStats from '@/components/shared/home/SuccessStats';

import WhyChooseUs from '@/components/shared/home/WhyChooseUs';
import CampusSection from '@/components/shared/home/CampusSection';
import FinalCTA from '@/components/shared/home/FinalCTA';
import FeatureCard from '@/components/shared/home/FeatureCard';

export default function Home() {
  return (
    <div
      className={cn(
        'relative w-full flex-1 overflow-x-hidden',
        'scrollbar-none',
      )}
    >
      {/* Decorative highlights */}
      <div
        className={cn(
          'absolute left-0 z-0 size-100 rounded-full',
          'bg-accent/10 blur-3xl',
        )}
      />
      <div
        className={cn(
          'absolute right-0 bottom-[70%] z-0 size-50 rounded-full',
          'bg-primary/10 blur-3xl',
        )}
      />

      <main className={cn('relative container mx-auto w-full')}>
        {/* Section 1 — Hero */}
        <HeroSection />

        {/* Section 2 — Academy Journey / Milestones */}
        <OurMilestones />

        {/* Section 3 — Defence Forces (Commented out) */}
        {/* <ForcesSection /> */}

        {/* Section 4 — Featured Achievers */}
        <FeatureCard />

        {/* Section 5 — About Academy */}
        <AboutSection />

        {/* Section 6 — Success Statistics */}
        <SuccessStats />

        {/* Section 7 — Explore Achievers (Commented out) */}
        {/* <ExploreAchievers /> */}

        {/* Section 8 — Why Choose Us */}
        <WhyChooseUs />

        {/* Section 9 — Campus / Academy Life */}
        <CampusSection />

        {/* Section 10 — Final CTA */}
        <FinalCTA />
      </main>
    </div>
  );
}
