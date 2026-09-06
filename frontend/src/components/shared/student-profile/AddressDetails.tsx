import { MapPin } from 'lucide-react';
import InfoRow from './InfoRow';
import SectionCard from './SectionCard';
import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function AddressDetails({ student }: Props) {
  return (
    <SectionCard title="Address Details" icon={MapPin}>
      <InfoRow label="House No." value={student.address.houseNo} />
      <InfoRow label="Village" value={student.address.village.name} />
      <InfoRow
        label="Village LGD Code"
        value={student.address.village.lgdCode}
      />
      <InfoRow label="Mandal" value={student.address.mandal.name} />
      <InfoRow
        label="Mandal LGD Code"
        value={student.address.mandal.lgdCode}
      />
      <InfoRow label="District" value={student.address.district.name} />
      <InfoRow
        label="District LGD Code"
        value={student.address.district.lgdCode}
      />
      <InfoRow label="State" value={student.address.state.name} />
      <InfoRow label="PIN Code" value="—" valueClassName="text-slate-400" />
    </SectionCard>
  );
}
