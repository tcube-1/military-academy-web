'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/provider/ThemeToggle';
import Image from 'next/image';
import { authClient } from '@/components/auth/AuthClient';
import { Button } from '@/components/ui/button';

interface NavLinkItem {
  name: string;
  href: string;
}

const NAV_LINKS: readonly NavLinkItem[] = [
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Notifications', href: '/notifications' },
  { name: 'Career', href: '/career' },
  { name: 'Contact', href: '/contact' },
];

export default function NavigationMenu({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setisMounted] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const isUserLoggedIn: boolean = Boolean(session?.user);
  const handleSignOut = async (): Promise<void> => {
    setIsSigningOut(true); // Loading start
    try {
      await authClient.signOut();
      router.refresh();
    } catch (error: unknown) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false); // Loading stop
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto">
      {children}

      {/*_______________________ NAVBAR MAIN CONTAINER _______________________*/}
      <div
        className={cn(
          'border-border/50 bg-background/60 flex h-26 w-full items-end shadow-black/5 backdrop-blur-md transition-all',
        )}
      >
        <section
          className={cn(
            'relative mx-auto flex h-18 w-full items-center justify-between shadow-lg lg:px-20',
          )}
        >
          {/*_______________________ LOGO _______________________*/}
          <div className="relative z-30 flex h-full shrink-0 items-center">
            <Link
              href="/"
              className="relative flex h-full items-center gap-0.5 rounded-sm px-2 text-red-600"
            >
              <div className="relative flex h-[85%] w-fit shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Tejas Educational Institution Logo"
                  width={80}
                  height={80}
                  priority
                  className="size-full object-contain p-2 md:p-0"
                />
              </div>

              <div className="flex h-full flex-col items-center justify-center px-2">
                <span className="text-4xl leading-none font-black whitespace-nowrap">
                  DELHI
                </span>

                <span className="bg-accent text-background w-full p-1 text-center text-[10px] font-medium">
                  NEET | IIT | DEFENCE
                </span>
              </div>
            </Link>
          </div>

          {/*_______________________ DESKTOP LINKS (MIDDLE) _______________________*/}
          <div className="relative z-20 hidden h-full flex-1 items-center justify-center gap-8 lg:flex">
            {NAV_LINKS.map((link: NavLinkItem) => {
              const isActive: boolean = pathname === link.href;
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
          <div className="relative z-30 flex shrink-0 items-center gap-4">
            {!isMounted || isSessionLoading ? (
              <div className="hidden h-9 w-18 items-center justify-center lg:flex">
                <Loader2 className="text-muted-foreground size-4 animate-spin" />
              </div>
            ) : isUserLoggedIn ? (
              <Button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut} // Loading apudu button disable avvali
                className={cn(
                  'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                  'hidden cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:shadow-md lg:flex',
                  // items-center and gap-2 add chesam so icon and text side-by-side ostayi
                  'items-center gap-2 disabled:cursor-not-allowed disabled:opacity-70',
                )}
              >
                {isSigningOut ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  'Logout'
                )}
              </Button>
            ) : (
              <Link
                href="/auth/signup"
                className={cn(
                  'bg-primary text-primary-foreground hover:bg-primary/90',
                  'hidden cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:shadow-md lg:flex',
                )}
              >
                Login
              </Link>
            )}

            {/* DARK/LIGHT MODE */}
            <ThemeToggle />

            {/* MOBILE MENU TOGGLE (HAMBURGER) */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground hover:bg-secondary flex cursor-pointer rounded-md p-2 transition-colors lg:hidden"
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
      </div>

      {/*_______________________ MOBILE DROP-DOWN MENU _______________________*/}
      {mobileOpen && (
        <div className="border-border bg-card relative z-50 mt-3 flex w-full flex-col overflow-hidden rounded-2xl border shadow-xl lg:hidden">
          <div className="flex flex-col space-y-2 p-4">
            {NAV_LINKS.map((link: NavLinkItem) => {
              const isActive: boolean = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
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

            {!isMounted || isSessionLoading ? (
              <div className="flex w-full items-center justify-center py-3">
                <Loader2 className="text-muted-foreground size-5 animate-spin" />
              </div>
            ) : isUserLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  void handleSignOut();
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 mt-2 flex w-full cursor-pointer justify-center rounded-lg px-4 py-3 text-sm font-bold transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/signup"
                onClick={() => setMobileOpen(false)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex w-full cursor-pointer justify-center rounded-lg px-4 py-3 text-sm font-bold transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
