import React from 'react';
import Link from 'next/link';
import { Compass, Home, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFound(): React.JSX.Element {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden px-4 py-16">
      {/* Tactical Radar Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.08),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md">
          <ShieldAlert className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
          <span>Coordinates Not Found</span>
        </div>

        {/* 404 Visual Number */}
        <div className="relative mt-6 select-none">
          <span className="font-heading text-8xl font-black tracking-widest text-slate-800/60 sm:text-9xl">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
              <Compass className="h-8 w-8 animate-spin text-emerald-400 [animation-duration:10s]" />
            </div>
          </div>
        </div>

        {/* Heading & Pitch */}
        <div className="mt-6 space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Mission Route Off-Grid
          </h1>
          <p className="mx-auto max-w-sm text-sm text-slate-400 sm:text-base">
            Meeru vethukuthunna page ledu leda coordinate path change ayindi.
            Base station ki return avvandi.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-400 hover:shadow-emerald-500/30 active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            <span>Return to HQ</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all duration-200 hover:border-slate-700 hover:bg-slate-800 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
