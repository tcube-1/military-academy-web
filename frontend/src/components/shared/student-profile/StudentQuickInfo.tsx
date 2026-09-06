import { Home, MapPin, Phone } from 'lucide-react';
import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function StudentQuickInfo({ student }: Props) {
  const items = [
    {
      label: 'Mobile Number',
      value: student.mobile,
      icon: Phone,
    },
    {
      label: 'House No.',
      value: student.address.houseNo,
      icon: Home,
    },
    {
      label: 'Village',
      value: student.address.village.name,
      icon: MapPin,
    },
  ];

  return (
    <section className="mt-3 grid grid-cols-1 rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-3">
      {items.map(({ label, value, icon: Icon }, index) => (
        <div
          key={label}
          className={[
            'flex items-center gap-4 px-7 py-4',
            index < items.length - 1
              ? 'border-b border-slate-200 md:border-r md:border-b-0'
              : '',
          ].join(' ')}
        >
          <Icon size={24} className="shrink-0 text-[#102a4c]" />
          <div className="min-w-0">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="truncate font-semibold text-slate-800">{value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
