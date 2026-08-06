import LandingPage from '@/components/shared/LandingPage';
import Navbar from '@/components/shared/NavBar';
import Ribbon from '@/components/shared/Ribbon';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="relative">
      <Ribbon />
      <Navbar />

      <main className="bg-background">
        <LandingPage />
        <div>hello</div>
      </main>
    </div>
  );
}
