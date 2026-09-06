import Link from 'next/link';
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { JobNotifications } from './JobNotification';

type NotificationPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function NotificationPage({
  searchParams,
}: NotificationPageProps) {
  const params = await searchParams;

  const notification = JobNotifications.find((item) => item.id === params.id);

  if (!notification) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#102a4c]"
          >
            <ArrowLeft size={17} />
            Back
          </Link>

          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">
              Notification Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The requested job notification does not exist.
            </p>

            <Link
              href="/notification"
              className="mt-5 inline-flex rounded-md bg-[#102a4c] px-5 py-2.5 text-sm font-semibold text-white"
            >
              View All Notifications
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#102a4c]"
          >
            <ArrowLeft size={17} />
            Back
          </Link>
        </div>

        <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.07)]">
          {/* Header */}
          <div className="border-b border-slate-200 bg-[#102a4c] px-6 py-7 text-white sm:px-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                <ShieldCheck size={14} />
                {notification.category}
              </span>

              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                {notification.status}
              </span>
            </div>

            <h1 className="max-w-4xl text-2xl leading-tight font-bold sm:text-3xl">
              {notification.title}
            </h1>

            <p className="mt-3 text-sm text-slate-300">
              {notification.organization}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CalendarDays size={17} className="text-[#102a4c]" />
                Published: {notification.publishedDate}
              </div>
            </div>

            <div className="py-7">
              <h2 className="text-lg font-bold text-[#102a4c]">
                Job Notification
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {notification.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
              <a
                href={notification.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#102a4c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#18385f]"
              >
                View Full Notification
                <ExternalLink size={16} />
              </a>

              <Link
                href="/notification"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                All Notifications
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
