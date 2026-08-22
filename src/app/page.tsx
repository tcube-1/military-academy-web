import { cn } from '@/lib/utils';

import Ribbon from '@/components/shared/ribbon/Ribbon';
import NavigationMenu from '@/components/shared/navbar/NavigationMenu';

import HeroSection from '@/components/shared/home/HeroSection';
import DefenceForces from '@/components/shared/home/DefenceForces';
import OurMilestones from '@/components/shared/home/OurMilestones';
import AboutSection from '@/components/shared/home/AboutSection';
import SuccessStats from '@/components/shared/home/SuccessStats';
import FeaturedAchievers from '@/components/shared/home/FeaturedAchievers';
import WhyChooseUs from '@/components/shared/home/WhyChooseUs';
import CampusSection from '@/components/shared/home/CampusSection';
import FinalCTA from '@/components/shared/home/FinalCTA';

// Future homepage sections
// import AboutSection from '@/components/shared/home/AboutSection';
// import SuccessStats from '@/components/shared/home/SuccessStats';
// import FeaturedAchievers from '@/components/shared/home/FeaturedAchievers';
// import AcademyJourney from '@/components/shared/home/AcademyJourney';
// import WhyChooseUs from '@/components/shared/home/WhyChooseUs';
// import CampusSection from '@/components/shared/home/CampusSection';
// import FinalCTA from '@/components/shared/home/FinalCTA';

export default function Home() {
  return (
    <div
      className={cn(
        'relative min-h-screen max-w-dvw overflow-x-hidden',
        'scrollbar-none',
      )}
    >
      {/* Decorative highlights */}
      <div
        className={cn(
          'absolute left-0 z-0 size-100 rounded-full',
          'bg-accent/10 blur-3xl',
        )}
      />{' '}
      <div
        className={cn(
          'absolute top-[30%] left-0 z-0 size-100 rounded-full',
          'bg-accent/10 blur-3xl',
        )}
      />
      <div
        className={cn(
          'absolute right-0 bottom-[70%] z-0 size-50 rounded-full',
          'bg-primary/10 blur-3xl',
        )}
      />
      <div
        className={cn(
          'absolute right-0 bottom-100 z-0 size-50 rounded-full',
          'bg-primary/10 blur-3xl',
        )}
      />
      <Ribbon />
      <NavigationMenu />
      <main className="relative mx-auto w-full max-w-7xl">
        {/* Section 1 — Hero */}
        <HeroSection /> HeroSection
        {/* Section 2 — About Academy */}
        <AboutSection /> AboutSection
        {/* Section 3 — Success Statistics */}
        <SuccessStats /> SuccessStats
        {/* Section 4 — Defence Forces */}
        <DefenceForces /> DefenceForces
        {/* Section 5 — Featured Achievers */}
        <FeaturedAchievers /> FeaturedAchievers
        {/* Section 6 — Explore Achievers */}
        {/* <ExploreAchievers /> ExploreAchievers */}
        {/* Section 7 — Academy Journey / Milestones */}
        <OurMilestones /> OurMilestones
        {/* Section 8 — Why Choose Us */}
        <WhyChooseUs /> WhyChooseUs
        {/* Section 9 — Campus / Academy Life */}
        <CampusSection /> CampusSection
        {/* Section 10 — Final CTA */}
        <FinalCTA /> FinalCTA
      </main>
    </div>
  );
}
