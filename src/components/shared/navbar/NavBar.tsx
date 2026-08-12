'use client';

import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import ThemeToggle from '../provider/ThemeToggle';
import { cn } from '@/lib/utils';
import { polygon } from '@/lib/assets';

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={cn(
        'bg-primary text-accent flex h-16 w-full items-center justify-between border border-white/20 px-6 backdrop-blur-md transition-colors duration-300 md:px-20',
      )}
    >
      {/* ------------------------------------------------------------- */}
      {/* >> logo  */}
      {/* ------------------------------------------------------------- */}
      <div className={cn('text-lg font-bold tracking-wide')}>
        <Link href="/">Defence Academy</Link>
      </div>
      {/* ------------------------------------------------------------- */}
      {/* >> middle  */}
      {/* ------------------------------------------------------------- */}
      <div className={cn('hidden items-center gap-6 md:flex')}>
        <Link href="/" className="transition-opacity hover:opacity-80">
          Home
        </Link>
        <Link href="/courses" className="transition-opacity hover:opacity-80">
          Courses
        </Link>
        <Link href="/about" className="transition-opacity hover:opacity-80">
          About Us
        </Link>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* >> end */}
      {/* ------------------------------------------------------------- */}
      <div className={cn('flex items-center gap-4')}>
        <ThemeToggle />

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 hover:bg-black/10 md:hidden dark:hover:bg-white/10"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
