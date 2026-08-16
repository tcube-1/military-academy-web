'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/provider/ThemeToggle';

// 1. Array of links based on your app/ folder structure
const NAV_LINKS = [
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Notifications', href: '/notifications' },
  { name: 'Career', href: '/career' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname(); // Current URL path telusukovadaniki

  return (
    <nav className={cn('fixed inset-x-4 top-8 z-50 lg:inset-x-20')}>
      {children}

      {/*_______________________ NAVBAR MAIN CONTAINER _______________________*/}
      <section
        className={cn(
          'border-border/50 relative flex h-16 w-full items-center justify-between rounded-2xl px-6 shadow-lg shadow-black/5',
          'bg-background/60 backdrop-blur-md transition-all',
        )}
      >
        {/*_______________________ LOGO _______________________*/}
        <div className="flex h-full shrink-0 items-center">
          <Link
            href="/"
            className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center rounded-lg px-3 py-1.5 text-xl font-bold tracking-widest transition-colors"
          >
            SRU
          </Link>
        </div>

        {/*_______________________ DESKTOP LINKS (MIDDLE) _______________________*/}
        <div className="hidden h-full flex-1 items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex h-[80%] items-center px-1 text-sm font-medium transition-colors outline-none',
                  'hover:border-primary/20 hover:text-primary border-transparent hover:border-x',

                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground',
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/*_______________________ END ACTIONS (RIGHT) _______________________*/}
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground hover:bg-primary-hover hidden rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:shadow-md md:flex"
          >
            Get Started
          </Link>

          {/* DARK/LIGHT MODE */}
          <ThemeToggle />

          {/* MOBILE MENU TOGGLE (HAMBURGER) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground hover:bg-secondary flex rounded-md p-2 transition-colors md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </section>

      {/*_______________________ MOBILE DROP-DOWN MENU _______________________*/}
      {mobileOpen && (
        <div className="border-border bg-card absolute top-full left-0 mt-3 flex w-full flex-col overflow-hidden rounded-2xl border shadow-xl md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)} // Link click cheyagane menu close avvali
                  className={cn(
                    'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-secondary hover:text-primary',
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

            <hr className="border-border/50 my-2" />

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="bg-primary text-primary-foreground hover:bg-primary-hover mt-2 flex w-full justify-center rounded-lg px-4 py-3 text-sm font-bold transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
