import { Check, Download, Eye, Folder } from 'lucide-react';
import SectionCard from './SectionCard';
import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function StudentDocuments({ student }: Props) {
  return (
    <SectionCard
      title="Documents"
      icon={Folder}
      contentClassName="p-0"
      className="overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Document Name
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {student.documents.map((document) => (
              <tr key={document.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-3.5 font-medium text-slate-900">
                  {document.name}
                </td>

                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <Check size={14} className="rounded-full bg-emerald-100 p-0.5" />
                    {document.status}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-4 font-medium text-blue-700">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 transition hover:text-blue-900"
                    >
                      <Eye size={14} />
                      View
                    </button>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 transition hover:text-blue-900"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center border-t border-slate-100 bg-slate-50/50 p-4">
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          View All Documents
        </button>
      </div>
    </SectionCard>
  );
}
