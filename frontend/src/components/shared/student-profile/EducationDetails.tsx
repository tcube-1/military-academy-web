import { GraduationCap } from 'lucide-react';
import SectionCard from './SectionCard';
import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function EducationDetails({ student }: Props) {
  return (
    <SectionCard
      title="Education"
      icon={GraduationCap}
      className="overflow-hidden"
      contentClassName="p-0"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-[#102a4c] text-white">
            <tr>
              <th className="px-4 py-3 font-medium">Qualification</th>
              <th className="px-4 py-3 font-medium">Institution</th>
              <th className="px-4 py-3 font-medium">Passing Year</th>
              <th className="px-4 py-3 font-medium">Percentage</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {student.education.map((item) => (
              <tr key={item.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {item.qualification}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {item.institution}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {item.passingYear}
                </td>
                <td className="px-4 py-3 font-bold text-blue-700">
                  {item.percentage.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
