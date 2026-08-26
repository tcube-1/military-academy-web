import React from 'react';
import { GraduationCap } from 'lucide-react';

function Degree({ title }: { title: string }) {
  return (
    <div className="group border-border bg-card hover:border-primary/30 relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Soft glow */}
      <div
        aria-hidden
        className="bg-accent/10 group-hover:bg-accent/20 pointer-events-none absolute -top-10 -right-10 size-28 rounded-full blur-2xl transition-opacity duration-300"
      />

      <div className="relative z-10 flex items-center gap-4">
        {/* Icon */}
        <div className="border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105">
          <GraduationCap className="size-6" strokeWidth={1.8} />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <p className="text-accent text-xs font-semibold tracking-wider uppercase">
            Degree Program
          </p>

          <h3 className="text-card-foreground group-hover:text-primary mt-1 truncate text-lg font-semibold transition-colors duration-300">
            {title}
          </h3>
        </div>
      </div>

      {/* Bottom accent */}
      <span
        aria-hidden
        className="via-accent absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-linear-to-r from-transparent to-transparent transition-all duration-300 group-hover:w-20"
      />
    </div>
  );
}

export default Degree;
