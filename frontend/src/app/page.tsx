import { cn } from '@/lib/utils';

import NavigationMenu from '@/components/shared/navbar/NavigationMenu';

import HeroSection from '@/components/shared/home/HeroSection';

import OurMilestones from '@/components/shared/home/OurMilestones';
import AboutSection from '@/components/shared/home/AboutSection';
import SuccessStats from '@/components/shared/home/SuccessStats';
import FeaturedAchievers from '@/components/shared/home/FeaturedAchievers';
import WhyChooseUs from '@/components/shared/home/WhyChooseUs';
import CampusSection from '@/components/shared/home/CampusSection';
import FinalCTA from '@/components/shared/home/FinalCTA';
import Ribbon from '@/components/section/ribbon/Ribbon';

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
          'absolute right-0 bottom-[70%] z-0 size-50 rounded-full',
          'bg-primary/10 blur-3xl',
        )}
      />
      <Ribbon />
      <NavigationMenu />
      <header className={cn('relative container mx-auto w-full border-2')}>
        {/* <StudentsPage></StudentsPage> */}
        {/* Section 1 — Hero */}
        <HeroSection />
        {/* Section 2 — Academy Journey / Milestones */}
        <OurMilestones />
        {/* Section 3 — Defence Forces */}
        {/* <ForcesSection /> DefenceForces */}
        FeaturedAchievers{/* Section 4 — Featured Achievers */}
        <FeaturedAchievers />
        AboutSection{/* Section 5 — About Academy */}
        <AboutSection />
        SuccessStats{/* Section 3 — Success Statistics */}
        <SuccessStats />
        ExploreAchievers{/* Section 6 — Explore Achievers */}
        {/* <ExploreAchievers />  */}
        WhyChooseUs{/* Section 8 — Why Choose Us */}
        <WhyChooseUs />
        CampusSection{/* Section 9 — Campus / Academy Life */}
        <CampusSection />
        {/* Section 10 — Final CTA */}
        <FinalCTA /> FinalCTA
      </header>
    </div>
  );
}
