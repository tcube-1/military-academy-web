import { Star, Trophy } from 'lucide-react';
import SectionCard from './SectionCard';
import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function Achievements({ student }: Props) {
  return (
    <SectionCard title="Achievements & Awards" icon={Trophy}>
      {student.achievements.length === 0 ? (
        <div className="flex min-h-[155px] flex-col items-center justify-center rounded-md border border-dashed border-slate-300 px-4 py-8 text-center">
          <div className="mb-4 rounded-full border border-dashed border-slate-300 p-4">
            <Star size={30} className="text-slate-300" />
          </div>

          <h3 className="font-semibold text-slate-900">
            No achievements added yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Achievements will appear here when added.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {student.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="rounded-md border border-slate-200 p-4"
            >
              <h3 className="font-semibold text-slate-900">
                {achievement.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
