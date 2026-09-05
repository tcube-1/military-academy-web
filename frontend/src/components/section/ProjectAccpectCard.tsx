import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  Code2,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowUpRight,
  Cpu,
  Lock,
} from 'lucide-react';

interface ProjectStatusBadgeProps {
  // Destination route path
  targetUrl?: string;
  projectName?: string;
}

export const ProjectAcceptedCard: React.FC<ProjectStatusBadgeProps> = ({
  targetUrl = '/',
}) => {
  return (
    <Link
      href={targetUrl}
      className="group relative flex h-screen items-center justify-between gap-4 overflow-hidden border border-emerald-500/30 bg-emerald-950/20 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-900/30 hover:shadow-emerald-900/20"
    >
      <div className="bg-muted relative -top-12 mx-auto h-[60%] w-full max-w-4xl overflow-hidden p-5 shadow-2xl transition-all duration-500">
        {/* 1. Outer Linear Gradient Border */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-emerald-400/40 via-slate-700/20 to-teal-500/30" />

        {/* 2. Main Card Body */}
        <div className="relative h-full w-full rounded-3xl bg-linear-to-b from-slate-900 via-slate-950 to-[#070b14] p-7 sm:p-9">
          {/* Top subtle linear ambient beam */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-36 w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent blur-2xl" />

          {/* Top Badges Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Milestone: Client Acceptance Phase
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Full Development Ready</span>
            </div>
          </div>

          {/* Heading & Pitch */}
          <div className="mt-6 space-y-3">
            <h2 className="text-muted-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
              Project Accepted &rarr;{' '}
              <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Full-Scale Architecture
              </span>
            </h2>

            <p className="text-sm leading-relaxed font-normal text-slate-300 sm:text-base">
              Once you approve this milestone, we will transform this prototype
              into your academy&apos;s complete digital command center—managing
              student enrollments, batches, physical training scores, and live
              alerts.
            </p>
          </div>

          {/* High-Contrast Linear Highlights Grid */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 transition-colors duration-300 hover:border-emerald-500/40 hover:bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-100">
                    Live Defense Portal
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Real-time sync & batch automation
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 transition-colors duration-300 hover:border-teal-500/40 hover:bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10 text-teal-400">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-100">
                    Strict Data Security
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    RBAC permissions & audit trails
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-800/80 pt-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>Click below to review verified prototype features</span>
            </div>

            <Link
              href={targetUrl}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:opacity-95 hover:shadow-emerald-500/40 sm:w-auto"
            >
              <span>Explore Live Features</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};
