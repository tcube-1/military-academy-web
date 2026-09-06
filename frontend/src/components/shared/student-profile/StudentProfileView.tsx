'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import Achievements from './Achievements';
import AddressDetails from './AddressDetails';
import EducationDetails from './EducationDetails';
import FamilyDetails from './FamilyDetails';
import PersonalInformation from './PersonalInformation';
import ProfileHistory from './ProfileHistory';
import ServiceDetails from './ServiceDetails';
import StudentDocuments from './StudentDocuments';
import StudentProfileHeader from './StudentProfileHeader';
import StudentQuickInfo from './StudentQuickInfo';
import { studentProfile } from './studentProfile.sample';

export default function StudentProfileView() {
  const student = studentProfile;

  return (
    <main className="min-h-full bg-[#f5f6f8] px-4 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-363">
        <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#102a4c]"
          >
            <ArrowLeft size={17} />
            Back to Students
          </Link>

          <span className="text-xs font-medium break-all text-slate-400 sm:break-normal">
            Profile ID: {student.id}
          </span>
        </div>

        <StudentProfileHeader student={student} />

        <StudentQuickInfo student={student} />

        <div className="mt-3 flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <PersonalInformation student={student} />
            <ServiceDetails student={student} />
          </div>

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <EducationDetails student={student} />
            <FamilyDetails student={student} />
          </div>

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <AddressDetails student={student} />
            <StudentDocuments student={student} />
          </div>

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <Achievements student={student} />
            <ProfileHistory student={student} />
          </div>
        </div>
      </div>
    </main>
  );
}
