import { cn } from '@/lib/utils';
import Navbar from '@/components/shared/navbar/NavBar';
import Ribbon from '@/components/shared/navbar/Ribbon';
import { imageAssets } from '@/lib/assets';
import Image from 'next/image';
import HeroSection from '@/components/shared/hero/HeroSection';
import OurMilestones from '@/components/shared/achievements/OurMilestones';

export default function Home() {
  return (
    <div className={cn('relative h-screen w-screen')}>
      <div className={cn('fixed h-screen w-screen')}>
        <Image
          src={imageAssets.Img_48.href}
          alt={imageAssets.Img_48.name}
          fill
          className={cn('-z-20 h-screen w-screen object-cover')}
        />
      </div>

      <div className="bg-background/20 absolute inset-0 -z-10 h-screen" />

      <Ribbon />
      <Navbar />
      <HeroSection />
      <section>
        <OurMilestones />
      </section>
    </div>
  );
}
