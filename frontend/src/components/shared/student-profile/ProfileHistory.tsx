import { History } from 'lucide-react';
import SectionCard from './SectionCard';
import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function ProfileHistory({ student }: Props) {
  return (
    <SectionCard title="Profile History" icon={History}>
      <div className="relative ml-2 mt-1 space-y-7 border-l border-slate-200 pb-2 pl-5">
        {student.history.map((item, index) => (
          <div key={item.id} className="relative">
            <span
              className={[
                'absolute -left-[25px] top-1.5 size-2.5 rounded-full ring-4 ring-white',
                index === 0 ? 'bg-emerald-500' : 'bg-slate-300',
              ].join(' ')}
            />

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                {item.date}
              </span>

              <span
                className={[
                  'rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                  item.type === 'Updated'
                    ? 'border-blue-100 bg-blue-50 text-blue-600'
                    : 'border-emerald-100 bg-emerald-50 text-emerald-600',
                ].join(' ')}
              >
                {item.type}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
