import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { socialIcons } from '@/lib/assets'; // Mee imports

export default function SocialIconsMoblie() {
  // Default ga menu close ayi undali anukunte 'false' pettandi
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div
      className={cn(
        'fixed right-0 bottom-50 z-100 flex items-center transition-transform duration-500 ease-in-out lg:hidden',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault(); // Background clicks ni aputhundi
          setIsOpen((prev) => !prev);
        }}
        className="absolute -left-8 flex h-14 w-8 cursor-pointer items-center justify-center rounded-l-lg border border-r-0 border-white/50 bg-white/40 shadow-lg backdrop-blur-md transition-colors hover:bg-white/60"
        aria-label="Toggle Social Menu"
      >
        {isOpen ? (
          <ChevronRight className="size-5 text-gray-800" /> // Open unte Right Arrow
        ) : (
          <ChevronLeft className="size-5 text-gray-800" /> // Close unte Left Arrow
        )}
      </button>

      {/* ✅ Social Icons Container */}
      <div className="flex flex-col items-center gap-3 rounded-l-2xl border border-r-0 border-white/20 bg-white/30 px-2 py-3 shadow-2xl backdrop-blur-md">
        {socialIcons &&
          socialIcons.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <Image
                src={social.href}
                alt={social.name}
                width={24}
                height={24}
                className="size-7 rounded-full bg-white p-0.5 shadow-sm"
              />
            </a>
          ))}
      </div>
    </div>
  );
}
