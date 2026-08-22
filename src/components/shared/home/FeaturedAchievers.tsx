import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Award, Star } from 'lucide-react';

// Types for strict type-checking
interface Achiever {
  id: string;
  name: string;
  rank: string;
  service: string;
  year: string;
  imageUrl: string;
}

// Dummy data (can be replaced with API fetch later)
const achieversData: Achiever[] = [
  {
    id: '1',
    name: 'Lt. Vikram Singh',
    rank: 'Lieutenant',
    service: 'Indian Army',
    year: '2023',
    imageUrl: '/placeholder-achiever.jpg', // Replace with actual image paths
  },
  {
    id: '2',
    name: 'Fg Offr. Ananya Sharma',
    rank: 'Flying Officer',
    service: 'Indian Air Force',
    year: '2024',
    imageUrl: '/placeholder-achiever.jpg',
  },
  {
    id: '3',
    name: 'SLt. Rahul Verma',
    rank: 'Sub Lieutenant',
    service: 'Indian Navy',
    year: '2023',
    imageUrl: '/placeholder-achiever.jpg',
  },
];

// Reusable Achiever Card Component
const AchieverCard = ({ achiever }: { achiever: Achiever }) => {
  return (
    <article className="group bg-card border-border relative flex flex-col items-center rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Prestige Icon Top Right */}
      <div className="absolute top-4 right-4">
        <Award className="text-accent h-5 w-5 opacity-80" aria-hidden="true" />
      </div>

      {/* Profile Image */}
      <div className="border-primary/20 group-hover:border-primary/50 relative mb-5 h-24 w-24 overflow-hidden rounded-full border-2 transition-colors">
        <Image
          src={achiever.imageUrl}
          alt={`Profile picture of ${achiever.name}`}
          fill
          className="bg-secondary object-cover" // fallback background
        />
      </div>

      {/* Details */}
      <div className="flex flex-col items-center text-center">
        {/* Service Badge */}
        <span className="text-primary bg-primary/10 mb-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
          {achiever.service}
        </span>

        <h3 className="text-foreground mb-1 text-lg font-bold">
          {achiever.name}
        </h3>
        <p className="text-muted-foreground text-sm font-medium">
          {achiever.rank}
        </p>

        {/* Stars / Rating Visual */}
        <div className="mt-3 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="fill-accent text-accent h-4 w-4"
              aria-hidden="true"
            />
          ))}
        </div>

        <p className="text-muted-foreground mt-4 text-xs font-semibold tracking-wider uppercase">
          Batch of {achiever.year}
        </p>
      </div>
    </article>
  );
};

export default function FeaturedAchievers({
  className,
}: {
  className?: string;
}) {
  return (
    <section
      className={cn('bg-muted/30 w-full py-16 md:py-24', className)} // slight off-white bg to distinguish from main section
      aria-labelledby="achievers-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2
            id="achievers-heading"
            className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            Our <span className="text-primary">Wall of Honor</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Meet our distinguished alumni who have successfully earned their
            stars and are now serving the nation with pride.
          </p>
        </div>

        {/* Achievers Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {achieversData.map((achiever) => (
            <AchieverCard key={achiever.id} achiever={achiever} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button className="border-primary text-primary hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center rounded-lg border-2 px-6 py-2.5 font-medium transition-colors">
            View All Achievers
          </button>
        </div>
      </div>
    </section>
  );
}
