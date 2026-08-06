'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { polygon, ribbonMessages, socialIcons } from '@/lib/assets';
import { Bell, MapPin } from 'lucide-react';

function Ribbon() {
  const iconSize = 10;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ribbonMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={cn('bg-accent-3 relative h-8 w-full min-w-lg text-xs')}>
      {/* Large scale */}
      <section
        className={cn(
          'bg-background absolute -left-70 h-full w-full flex-1',
          polygon['right-slant-left-flat'],
        )}
      ></section>
      <section
        className={cn('text-foreground relative z-20 flex h-full items-center')}
      >
        <div
          className={cn(
            'flex h-full w-full items-center justify-between lg:w-9/12 xl:w-10/12',
          )} //here width has separate corner lg:9 xl:10 by 12
        >
          <div className={cn('flex w-screen items-center space-x-3 pl-50')}>
            <span>
              <Bell size={18} />
            </span>
            <span>{`${ribbonMessages[currentIndex]}`}</span>
          </div>
          <div
            className={cn('flex w-screen items-center justify-end space-x-3')}
          >
            <span className={cn('')}>
              <MapPin size={16} />
            </span>

            <span className={cn('underline')}>
              H.No. 3-4-90, Suryanagar, Karimnagar, Telangana, PIN-505001
            </span>
          </div>
        </div>
        <div className={cn('hidden lg:flex lg:flex-1')}>
          <span
            className={cn(
              'flex w-full items-center justify-center gap-2 text-sm',
            )}
          >
            <span>follow us:</span>
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={social.href}
                  alt={social.name}
                  width={iconSize}
                  height={iconSize}
                  className="size-4"
                />
              </a>
            ))}
          </span>
        </div>
      </section>
      {/* Mobile Social */}
      <div className="fixed right-5 bottom-20 z-50 lg:hidden">
        <div className="flex flex-col gap-2 rounded-xl p-2 shadow-lg">
          {socialIcons.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={social.href}
                alt={social.name}
                width={20}
                height={20}
                className="size-8"
              />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Ribbon;
