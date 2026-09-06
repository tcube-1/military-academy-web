import Link from 'next/link';
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { JobNotifications } from '@/components/shared/notification/JobNotification';

type NotificationPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function NotificationPage({
  searchParams,
}: NotificationPageProps) {
  const params = await searchParams;
  const notificationId = params.id;

  // -------------------------------------------------
  // CASE 1: /notification?id=xxxxx
  // Show selected notification details
  // -------------------------------------------------
  if (notificationId) {
    const notification = JobNotifications.find(
      (item) => item.id === notificationId,
    );

    // Invalid notification ID
    if (!notification) {
      return (
        <main className="min-h-screen bg-[#f5f6f8] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/notification"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#102a4c]"
            >
              <ArrowLeft size={17} />
              Back to Notifications
            </Link>

            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h1 className="text-xl font-bold text-slate-900">
                Notification Not Found
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                The requested job notification could not be found.
              </p>

              <Link
                href="/notification"
                className="mt-5 inline-flex rounded-md bg-[#102a4c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#18385f]"
              >
                View All Notifications
              </Link>
            </div>
          </div>
        </main>
      );
    }

    // -------------------------------------------------
    // Selected notification UI
    // -------------------------------------------------
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/notification"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#102a4c]"
          >
            <ArrowLeft size={17} />
            Back to Notifications
          </Link>

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

              <h1 className="text-2xl leading-tight font-bold sm:text-3xl">
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

  // -------------------------------------------------
  // CASE 2: /notification
  // Show all notifications
  // -------------------------------------------------
  return (
    <main className="min-h-screen bg-[#f5f6f8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#102a4c]"
          >
            <ArrowLeft size={17} />
            Back
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-[#102a4c] sm:text-3xl">
              Defence Job Notifications
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Latest defence, police, aerospace and government job updates.
            </p>
          </div>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {JobNotifications.map((notification) => (
            <Link
              key={notification.id}
              href={`/notification?id=${notification.id}`}
              className="group block rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#c99a2e] hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {/* Category + Status */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#102a4c]/5 px-2.5 py-1 text-xs font-semibold text-[#102a4c]">
                      {notification.category}
                    </span>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 capitalize">
                      {notification.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-bold text-slate-900 transition group-hover:text-[#102a4c] sm:text-lg">
                    {notification.title}
                  </h2>

                  {/* Organization */}
                  <p className="mt-1 text-sm text-slate-500">
                    {notification.organization}
                  </p>

                  {/* Date */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays size={14} />
                    Published: {notification.publishedDate}
                  </div>
                </div>

                {/* Arrow */}
                <ExternalLink
                  size={18}
                  className="mt-1 shrink-0 text-slate-400 transition group-hover:text-[#c99a2e]"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
