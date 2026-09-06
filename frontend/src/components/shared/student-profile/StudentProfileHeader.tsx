'use client';

import Image from 'next/image';
import { CheckCircle2, IdCard, Pencil, Share2, Star } from 'lucide-react';

import type { StudentProfile } from './studentProfile.sample';

type Props = {
  student: StudentProfile;
};

export default function StudentProfileHeader({ student }: Props) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.07)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_280px]">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="relative size-40 shrink-0 overflow-hidden rounded-full border-[5px] border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src={student.avatarUrl}
              alt={student.fullName}
              fill
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-3xl font-bold text-[#102a4c]">
              {student.fullName}
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <Star size={20} className="fill-[#c99a2e] text-[#c99a2e]" />
              <span className="text-xl font-bold text-slate-700">
                {student.studentCode}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-lg font-medium text-slate-700">
              <span>{student.job.title}</span>
              <span className="text-[#c99a2e]">•</span>
              <span>{student.force.name}</span>
            </div>

            <p className="mt-2 text-base text-slate-600">
              Service Year: {student.job.joiningYear}
            </p>

            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wide text-emerald-700 uppercase">
                <CheckCircle2 size={14} />
                {student.status}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden bg-slate-200 lg:block" />

        <div className="flex flex-col items-center justify-center border-t border-slate-200 p-6 text-center lg:border-t-0">
          <div className="relative size-24">
            <Image
              src={student.force.logoUrl}
              alt={`${student.force.name} logo`}
              fill
              className="object-contain"
            />
          </div>

          <h2 className="mt-3 text-lg font-bold text-[#102a4c]">
            {student.force.name}
          </h2>

          <p className="mt-1 font-medium text-[#b48622]">{student.job.title}</p>
          <p className="text-sm text-slate-600">
            Since {student.job.joiningYear}
          </p>

          <p className="mt-2 text-xs font-medium tracking-wide text-slate-400 uppercase">
            Blood Group: {student.bloodGroup}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 px-6 pb-6">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-[#102a4c] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#162f55] active:scale-[0.98]"
        >
          <IdCard size={18} />
          Download ID Card
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-[#d9bd79] bg-[#fffdf7] px-6 py-3 text-sm font-semibold text-[#a87817] transition hover:bg-[#fff8e7] active:scale-[0.98]"
        >
          <Pencil size={18} />
          Edit Profile
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
        >
          <Share2 size={18} />
          Share Profile
        </button>
      </div>
    </section>
  );
}
