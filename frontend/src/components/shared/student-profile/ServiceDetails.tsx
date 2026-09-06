import { CalendarDays, ShieldCheck, UserRound } from 'lucide-react';
import Image from 'next/image';

import InfoRow from './InfoRow';
import SectionCard from './SectionCard';
import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function ServiceDetails({ student }: Props) {
  return (
    <SectionCard title="Service Details" icon={ShieldCheck}>
      <div className="relative">
        <InfoRow label="Force" value={student.force.name} />
        <InfoRow label="Force ID" value={student.force.code} />
        <InfoRow label="Rank / Role" value={student.job.title} />
        <InfoRow label="Joining Year" value={student.job.joiningYear} />
        <InfoRow
          label="Service Status"
          value={
            <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
              Active
            </span>
          }
        />
        <InfoRow
          label="Service Category"
          value={
            <span className="text-slate-600">{student.job.category}</span>
          }
        />
        <div className="mt-3 flex justify-end">
          <div className="relative size-16">
            <Image
              src={student.force.logoUrl}
              alt={`${student.force.name} logo`}
              fill
              className="object-contain opacity-90"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
