<<<<<<< HEAD
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-copper-400 flex flex-col flex-1 items-center justify-center  font-sans  dark:bg-ink-black-950">
      <div>hello</div>
=======
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
>>>>>>> f8f9d381b405553a7e809ea9c45df5ce7bbb8e15
    </div>
  );
}
