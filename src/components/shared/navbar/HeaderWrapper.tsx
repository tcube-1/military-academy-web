'use client';
import Ribbon from './Ribbon';
import Navbar from './NavBar';
import { cn } from '@/lib/utils';

function HeaderWrapper() {
  return (
    <header className="relative">
      {/* Top Notification Ribbon */}
      <div className="fixed inset-x-0 top-0 z-50 overflow-hidden text-white shadow-md">
        <Ribbon />
      </div>

      {/* Morphing Navbar Container */}
      <div
        className={cn(
          'fixed inset-x-0 top-7 transition-colors duration-300 md:top-9',
          '',
        )}
      >
        <Navbar />
      </div>
    </header>
  );
}

export default HeaderWrapper;
