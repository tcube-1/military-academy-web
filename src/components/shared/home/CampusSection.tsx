import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MapPin, Dumbbell, BookOpen, Home, Utensils } from 'lucide-react';

// Facility data structure kosam TypeScript interface
interface Facility {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  imageUrl: string;
  className?: string; // For bento grid spanning
}

// Campus facilities data
const facilitiesData: Facility[] = [
  {
    id: 'c1',
    title: 'Tactical Training Ground',
    description:
      'Our 10-acre expansive ground features complete obstacle courses designed exactly to SSB testing standards.',
    icon: Dumbbell,
    imageUrl: '/placeholder-campus-1.jpg', // Replace with real image
    // Make the first item larger on large screens for the bento effect
    className: 'lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-[500px]',
  },
  {
    id: 'c2',
    title: 'Digital Library',
    description:
      '24/7 access to defence journals, previous papers, and reference materials.',
    icon: BookOpen,
    imageUrl: '/placeholder-campus-2.jpg',
    className: 'min-h-[250px]',
  },
  {
    id: 'c3',
    title: 'Cadet Hostels',
    description:
      'Disciplined, secure, and hygienic living quarters ensuring a proper routine.',
    icon: Home,
    imageUrl: '/placeholder-campus-3.jpg',
    className: 'min-h-[250px]',
  },
  {
    id: 'c4',
    title: 'Nutritional Mess',
    description:
      'Dietician-planned meals to build stamina and maintain optimal physical fitness.',
    icon: Utensils,
    imageUrl: '/placeholder-campus-4.jpg',
    className: 'lg:col-span-3 min-h-[250px]', // Spans full width on bottom row
  },
];

// Reusable component for each facility card
const FacilityCard = ({ facility }: { facility: Facility }) => {
  const Icon = facility.icon;

  return (
    <div
      className={cn(
        'group border-border bg-muted relative flex flex-col justify-end overflow-hidden rounded-2xl border',
        facility.className,
      )}
    >
      {/* Background Image - Absolute positioned to fill the card */}
      <Image
        src={facility.imageUrl}
        alt={facility.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay - ensures text is readable regardless of image brightness */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

      {/* Content positioning */}
      <div className="relative z-10 flex translate-y-4 transform flex-col gap-3 p-6 transition-transform duration-300 group-hover:translate-y-0 md:p-8">
        <div className="bg-primary/90 mb-2 w-fit rounded-lg p-2.5 shadow-sm backdrop-blur-sm">
          <Icon
            className="text-primary-foreground h-5 w-5"
            aria-hidden="true"
          />
        </div>

        <h3 className="text-xl font-bold text-white md:text-2xl">
          {facility.title}
        </h3>

        {/* Description fades in and slides up on hover */}
        <p className="line-clamp-2 text-sm text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-base">
          {facility.description}
        </p>
      </div>
    </div>
  );
};

export default function CampusSection({ className }: { className?: string }) {
  return (
    <section
      className={cn('bg-background w-full py-16 md:py-24', className)}
      aria-labelledby="campus-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="bg-primary/10 border-primary/20 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
              <MapPin className="text-primary h-4 w-4" />
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                World-Class Infrastructure
              </span>
            </div>
            <h2
              id="campus-heading"
              className="text-foreground text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            >
              Train In Our{' '}
              <span className="text-primary">State-of-the-Art Campus</span>
            </h2>
          </div>

          <p className="text-muted-foreground max-w-sm text-sm md:text-right md:text-base">
            Every inch of our campus is designed to simulate the rigorous
            environment of Indian Armed Forces training academies.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {facilitiesData.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </div>
    </section>
  );
}
