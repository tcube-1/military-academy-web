import { cn } from '@/lib/utils';
import { Users, ShieldCheck, Trophy, Target } from 'lucide-react';

// Stat Item kosam TypeScript Interface
interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
}

// Reusable Sub-component for individual stats
const StatItem = ({ icon: Icon, value, label }: StatItemProps) => {
  return (
    <div className="group flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-primary-foreground/5 group-hover:bg-primary-foreground/10 ring-primary-foreground/10 mb-4 rounded-full p-4 ring-1 transition-colors duration-300">
        <Icon className="text-accent h-8 w-8" aria-hidden="true" />
      </div>
      {/* value (numbers) */}
      <dd className="text-primary-foreground mb-2 text-4xl font-bold tracking-tight md:text-5xl">
        {value}
      </dd>
      {/* label (description) */}
      <dt className="text-primary-foreground/80 text-sm font-medium tracking-widest uppercase md:text-base">
        {label}
      </dt>
    </div>
  );
};

export default function SuccessStats({ className }: { className?: string }) {
  // Stats data array - ease of maintenance
  const statsData = [
    {
      id: 1,
      icon: Trophy,
      value: '2000+',
      label: 'NDA & CDS Selections',
    },
    {
      id: 2,
      icon: ShieldCheck,
      value: '15+',
      label: 'Years of Excellence',
    },
    {
      id: 3,
      icon: Target,
      value: '94%',
      label: 'Success Rate',
    },
    {
      id: 4,
      icon: Users,
      value: '50+',
      label: 'Ex-Defence Mentors',
    },
  ];

  return (
    <section
      className={cn(
        'bg-primary border-border w-full border-y py-16 md:py-20',
        className,
      )}
      aria-labelledby="stats-heading"
    >
      {/* Screen readers kosam hidden heading */}
      <h2 id="stats-heading" className="sr-only">
        Our Success Statistics
      </h2>

      <div className="container mx-auto px-4 md:px-6">
        {/* Definition List (dl) ni vadatam valla accessibility (semantic HTML) perugutundi */}
        <dl className="lg:divide-primary-foreground/20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          {statsData.map((stat) => (
            <StatItem
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
