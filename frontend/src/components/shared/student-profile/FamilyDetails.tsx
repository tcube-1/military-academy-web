import { Users } from 'lucide-react';
import InfoRow from './InfoRow';
import SectionCard from './SectionCard';
import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function FamilyDetails({ student }: Props) {
  const father = student.family.find((member) => member.relationType === 'FATHER');
  const mother = student.family.find((member) => member.relationType === 'MOTHER');

  return (
    <SectionCard title="Family Details" icon={Users}>
      <InfoRow label="Father Name" value={father?.name ?? '—'} />
      <InfoRow label="Mother Name" value={mother?.name ?? '—'} />
      <InfoRow label="Father Occupation" value={father?.occupation ?? '—'} />
      <InfoRow label="Mother Occupation" value={mother?.occupation ?? '—'} />
      <InfoRow
        label="Father Contact"
        value={father?.contactNumber ?? '—'}
        valueClassName="text-slate-400"
      />
      <InfoRow
        label="Mother Contact"
        value={mother?.contactNumber ?? '—'}
        valueClassName="text-slate-400"
      />
    </SectionCard>
  );
}
