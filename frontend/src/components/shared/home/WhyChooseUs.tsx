import { cn } from '@/lib/utils';
import {
  Medal,
  Target,
  Dumbbell,
  BookOpen,
  Users,
  ShieldCheck,
} from 'lucide-react';

// Feature data kosam TypeScript interface
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

// Features list
const featuresData: Feature[] = [
  {
    id: 'f1',
    title: 'Ex-Defence Faculty',
    description:
      'Learn directly from retired officers who bring real-world military experience and discipline to the classroom.',
    icon: Users,
  },
  {
    id: 'f2',
    title: 'Defence Ground Mastery',
    description:
      'Specialized training modules focused on psychological tests, GTO tasks, and personal interviews for SSB.',
    icon: Target,
  },
  {
    id: 'f3',
    title: 'Rigorous Physical Training',
    description:
      'State-of-the-art obstacle courses and daily physical conditioning routines to meet military standards.',
    icon: Dumbbell,
  },
  {
    id: 'f4',
    title: 'Comprehensive Study Material',
    description:
      'Regularly updated curriculum covering NDA, CDS, and AFCAT syllabi with extensive mock tests.',
    icon: BookOpen,
  },
  {
    id: 'f5',
    title: 'Proven Track Record',
    description:
      'Over 2000+ successful selections across various branches of the Indian Armed Forces.',
    icon: Medal,
  },
  {
    id: 'f6',
    title: 'Safe & Disciplined Campus',
    description:
      'A secure, distraction-free environment that fosters focus, camaraderie, and personal growth.',
    icon: ShieldCheck,
  },
];

// Reusable Feature Card Component
const FeatureCard = ({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;

  return (
    <div className="group bg-card border-border relative flex flex-col rounded-2xl border p-6 shadow-2xs transition-all duration-300 hover:shadow-md md:p-8">
      {/* Icon Container with Hover Effect */}
      <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-5 inline-flex w-fit rounded-xl p-3 transition-colors duration-300">
        <Icon className="h-6 w-6 md:h-8 md:w-8" aria-hidden="true" />
      </div>

      {/* Content */}
      <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-bold transition-colors">
        {feature.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
        {feature.description}
      </p>

      {/* Subtle bottom border accent on hover */}
      <div className="bg-accent absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-t-full opacity-0 transition-all duration-300 group-hover:w-1/2 group-hover:opacity-100" />
    </div>
  );
};

export default function WhyChooseUs({ className }: { className?: string }) {
  return (
    <section
      className={cn('bg-secondary/30 w-full py-16 md:py-24', className)}
      aria-labelledby="why-choose-us-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16">
          <div className="bg-accent/10 border-accent/20 mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
            <ShieldCheck className="text-accent h-4 w-4" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              The Academy Advantage
            </span>
          </div>

          <h2
            id="why-choose-us-heading"
            className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            Why Choose <span className="text-primary">Our Academy?</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg">
            We don&apos;t just teach; we transform. Discover the core pillars
            that make us the premier choice for defence aspirants.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
