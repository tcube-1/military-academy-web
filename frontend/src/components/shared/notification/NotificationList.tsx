import Link from 'next/link';
import { JobNotifications } from './JobNotification';
import { ExternalLink } from 'lucide-react';

function NotificationList() {
  return (
    <div className="grid gap-3">
      {JobNotifications.map((item) => (
        <Link
          key={item.id}
          href={`/notification?id=${item.id}`}
          className="rounded-lg border border-slate-200 bg-white p-5 transition hover:border-[#c99a2e] hover:shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[#102a4c]">{item.title}</h2>

              <p className="mt-1 text-sm text-slate-500">{item.organization}</p>

              <p className="mt-2 text-xs text-slate-400">
                {item.publishedDate}
              </p>
            </div>

            <ExternalLink size={18} className="shrink-0 text-slate-400" />
          </div>
        </Link>
      ))}
    </div>
  );
}
