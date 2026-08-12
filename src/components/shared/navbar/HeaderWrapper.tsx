'use client';
import Ribbon from './Ribbon';
import Navbar from './NavBar';
import { cn } from '@/lib/utils';

function HeaderWrapper() {
  return (
    <header className="relative z-40">
      {/* Top Notification Ribbon */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Ribbon />
      </div>

      {/* Morphing Navbar Container */}
      <div
        className={cn(
          'fixed inset-0 transition-colors duration-300',
          'top-6 md:top-8',
        )}
      >
        <Navbar />
      </div>
    </header>
  );
}

export default HeaderWrapper;
