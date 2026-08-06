'use client';

import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';
import { polygon } from '@/lib/assets';

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        'bg-background text-foreground relative h-16 w-full min-w-lg shadow',
      )}
    >
      <div
        className={cn(
          'bg-accent-3 text-foreground absolute -left-58 h-full w-full flex-1',
          polygon['right-nav'],
        )}
      ></div>
      <section className="">hello</section>
    </header>
  );
}
