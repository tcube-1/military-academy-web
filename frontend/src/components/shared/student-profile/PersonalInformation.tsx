import { User } from 'lucide-react';
import InfoRow from './InfoRow';
import SectionCard from './SectionCard';
import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function PersonalInformation({ student }: Props) {
  return (
    <SectionCard title="Personal Information" icon={User}>
      <div>
        <InfoRow label="Full Name" value={student.fullName} />
        <InfoRow label="Student Code" value={student.studentCode} />
        <InfoRow label="Mobile Number" value={student.mobile} />
        <InfoRow label="Blood Group" value={student.bloodGroup} />
        <InfoRow label="Slug" value={student.slug} />
        <InfoRow
          label="Status"
          value={
            <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold capitalize text-emerald-700">
              {student.status}
            </span>
          }
        />
        <InfoRow label="Date Created" value={student.createdAtLabel} />
        <InfoRow label="Last Updated" value={student.updatedAtLabel} />
      </div>
    </SectionCard>
  );
}
