import Image from 'next/image';
import { Shield, Award, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { imageAssets } from '@/lib/assets';

// Reusable Feature Item Component
// Chinna components ga divide cheyadam valla maintainability perugutundi
const FeatureItem = ({ text }: { text: string }) => (
  <li className="text-muted-foreground flex items-center gap-3">
    <CheckCircle2 className="text-accent h-5 w-5 shrink-0" aria-hidden="true" />
    <span className="text-foreground text-sm font-medium md:text-base">
      {text}
    </span>
  </li>
);

export default function AboutSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'bg-background relative w-full overflow-hidden py-16 md:py-24',
        className,
      )}
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content Area */}
          <div className="flex flex-col gap-6">
            <div className="bg-primary/10 border-primary/20 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5">
              <Shield className="text-primary h-4 w-4" />
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                About The Academy
              </span>
            </div>

            <h2
              id="about-heading"
              className="text-foreground text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            >
              Building The Nation&apos;s{' '}
              <span className="text-primary">Finest Leaders</span>
            </h2>

            <p className="text-muted-foreground max-w-xl text-base leading-relaxed md:text-lg">
              With a legacy of excellence, our academy has been at the forefront
              of preparing dedicated individuals for prestigious careers in the
              Defence Forces. We combine rigorous academic training with
              physical endurance to shape tomorrow&apos;s warriors.
            </p>

            <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FeatureItem text="Expert Ex-Defence Faculty" />
              <FeatureItem text="Comprehensive Study Material" />
              <FeatureItem text="Rigorous Physical Training" />
              <FeatureItem text="SSB Interview Mentorship" />
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <button className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium shadow-sm transition-colors">
                Discover Our Legacy
              </button>
            </div>
          </div>

          {/* Right Image & Floating Stats Area */}
          <div className="border-border relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-2xl border shadow-lg md:aspect-video lg:ml-auto lg:aspect-square">
            {/* Using the reference image precisely as requested */}
            <Image
              src={'images/img/Img_20.png'}
              alt="Defence Academy Cadets in Training"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              unoptimized
            />

            {/* Gradient Overlay for better contrast */}
            <div className="from-background/80 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />

            {/* Floating Stats Card - Positioned at bottom left */}
            <div className="bg-card/95 border-border absolute right-6 bottom-6 left-6 rounded-xl border p-5 shadow-md backdrop-blur-sm md:right-auto md:w-72">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 shrink-0 rounded-lg p-3">
                  <Award className="text-accent h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-foreground text-2xl font-bold">2000+</h3>
                  <p className="text-muted-foreground mt-1 text-sm font-medium">
                    Successful Selections in NDA, CDS & AFCAT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
