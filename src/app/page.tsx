import HeaderWrapper from '@/components/shared/navbar/HeaderWrapper';
import LandingPage from '@/components/shared/hero/LandingPage';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className={cn('relative')}>
      <HeaderWrapper />
      <main className="bg-background mt-1">
        <LandingPage />
      </main>
    </div>
  );
}
