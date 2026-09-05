import { cn } from '@/lib/utils';
import { ArrowRight, Phone, Shield } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTA({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'bg-background w-full px-4 py-16 md:px-6 md:py-24',
        className,
      )}
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto max-w-6xl">
        {/* CTA Banner Container */}
        <div className="bg-primary border-primary-hover relative overflow-hidden rounded-3xl border px-6 py-12 text-center shadow-xl md:px-12 md:py-16 lg:p-20">
          {/* Subtle Background Glow / Graphic Effect */}
          <div
            className="bg-accent/10 pointer-events-none absolute top-0 left-1/2 h-100 w-200 -translate-x-1/2 rounded-full blur-[100px]"
            aria-hidden="true"
          />

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Top Badge */}
            <div className="bg-primary-foreground/10 border-primary-foreground/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
              <Shield className="text-accent h-4 w-4" />
              <span className="text-primary-foreground text-sm font-semibold tracking-widest uppercase">
                Admissions Open for 2026-2027
              </span>
            </div>

            {/* Main Heading */}
            <h2
              id="cta-heading"
              className="text-primary-foreground mx-auto mb-6 max-w-3xl text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl"
            >
              Your Journey to Serve the Nation Starts Here.
            </h2>

            {/* Subheading */}
            <p className="text-primary-foreground/80 mx-auto mb-10 max-w-2xl text-base md:text-lg">
              Join the ranks of 2000+ successful cadets. Get expert guidance,
              rigorous physical training, and comprehensive SSB interview
              preparation.
            </p>

            {/* Action Buttons */}
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
              {/* Primary Button (Gold) */}
              <Link href={`auth/signin`}>
                <button className="bg-accent text-accent-foreground hover:bg-accent-hover inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-bold shadow-md transition-all duration-300 hover:scale-105 sm:w-auto">
                  Enroll Now
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </Link>

              {/* Secondary Button (Outline) */}
              <Link href={`contact`}>
                <button className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 bg-transparent px-8 py-4 text-lg font-semibold transition-colors duration-300 sm:w-auto">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Request a Callback
                </button>
              </Link>
            </div>

            {/* Trust Indicator / Disclaimer */}
            <p className="text-primary-foreground/60 mt-8 text-sm font-medium">
              Seats are strictly limited to maintain training quality and
              discipline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
