import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Award, House, IdCardLanyard, MapPin, Phone, Star } from 'lucide-react';
import type { studentDataType } from '@/utils/types';

import React from 'react';
import { SectionTitle } from './SectionTitle';
import { InfoRow } from './InfoRow';
import { DetailBox } from './DetailBox';
import { TechnicalValue } from './TechnicalValue';

export interface AchieverCardProps {
  student: studentDataType;
}
export const AchieverCard = ({ student }: AchieverCardProps) => {
  return (
    <section className={cn('bg-accent w-full p-4 sm:p-6')}>
      <div
        className={cn(
          'mx-auto w-full max-w-6xl',
          'overflow-hidden rounded-2xl',
          'bg-background shadow-xl',
          'border-border border',
        )}
      >
        {/* =====================================================
        HEADER
    ====================================================== */}

        <header
          className={cn(
            'relative overflow-hidden',
            'bg-blue-950 text-white',
            'px-5 py-5 sm:px-7',
          )}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Force */}
            <div className="flex items-center gap-4">
              <div className="size-16 shrink-0 sm:size-20">
                <Image
                  src={student.force.logoUrl}
                  alt={student.force.name}
                  width={600}
                  height={600}
                  className="size-full object-contain"
                />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-wide sm:text-2xl">
                  {student.force.name}
                </h1>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-yellow-400">
                  <span>{student.job.title}</span>

                  <span>•</span>

                  <span>{student.job.joiningYear}</span>

                  <span>•</span>

                  <span>{student.job.category}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div
              className={cn(
                'w-fit rounded-full px-1.5 py-1.5',
                'bg-green-600 text-[10px] font-semibold',
                'tracking-wide uppercase',
              )}
            >
              ✓ {student.status}
            </div>
          </div>
        </header>

        {/* =====================================================
        MAIN BODY
    ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
          {/* ===================================================
          LEFT / IDENTITY
      ==================================================== */}

          <aside
            className={cn(
              'border-border border-b',
              'p-5 sm:p-7',
              'lg:border-r lg:border-b-0',
            )}
          >
            {/* Avatar */}
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  'size-32 overflow-hidden rounded-full',
                  'border-muted border-4',
                  'bg-muted',
                )}
              >
                <Image
                  src={student.avatarUrl}
                  alt={student.fullName}
                  width={600}
                  height={600}
                  sizes="128px"
                  className="size-full object-cover"
                />
              </div>

              {/* Name */}
              <h2
                className={cn(
                  'mt-4 text-xl font-bold',
                  'text-blue-950 dark:text-white',
                )}
              >
                {student.fullName}
              </h2>

              {/* Student Code */}
              <div
                className={cn(
                  'mt-2 inline-flex items-center gap-2',
                  'rounded-md bg-blue-950 px-3 py-1.5',
                  'text-sm font-semibold text-white',
                )}
              >
                <IdCardLanyard className="size-4" />
                {student.studentCode}
              </div>
            </div>

            {/* ===============================================
            CONTACT
        ================================================ */}

            <div className="mt-8">
              <SectionTitle title="CONTACT & ADDRESS" />

              <div className="divide-border border-border mt-3 divide-y rounded-lg border">
                <InfoRow label="Mobile" value={`+91 ` + `${student.mobile}`} />
                <InfoRow label="House No" value={student.address?.houseNo} />
                <InfoRow
                  label="Village"
                  value={student.address?.village?.name}
                />
                <InfoRow label="Mandal" value={student.address?.mandal?.name} />
                <InfoRow
                  label="District"
                  value={student.address?.district?.name}
                />

                <InfoRow label="State" value={student.address?.state?.name} />
              </div>
            </div>

            {/* Blood Group */}

            <div className="mt-5">
              <InfoRow label="Blood Group" value={student.bloodGroup} />
            </div>
          </aside>

          {/* ===================================================
          RIGHT CONTENT
      ==================================================== */}

          <main className="min-w-0">
            {/* =================================================
            SERVICE INFORMATION
        ================================================== */}

            <section className="border-border border-b p-5 sm:p-7">
              <SectionTitle title="SERVICE INFORMATION" />

              <div
                className={cn(
                  'mt-4 grid grid-cols-1',
                  'sm:grid-cols-2 xl:grid-cols-4',
                  'divide-y sm:divide-y-0',
                  'divide-border sm:divide-x',
                  'border-border rounded-lg border',
                )}
              >
                <DetailBox label="Force" value={student.force.name} />

                <DetailBox label="Role" value={student.job.title} />

                <DetailBox label="Category" value={student.job.category} />

                <DetailBox
                  label="Joining Year"
                  value={student.job.joiningYear}
                />
              </div>

              {/* IDs */}

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <TechnicalValue label="Force ID" value={student.force.id} />

                <TechnicalValue label="Force Code" value={student.force.code} />

                <TechnicalValue label="Job ID" value={student.job.id} />
              </div>
            </section>

            {/* =================================================
            EDUCATION
        ================================================== */}

            <section className="border-border border-b p-5 sm:p-7">
              <SectionTitle title="EDUCATION" />

              <div className="border-border mt-4 overflow-hidden rounded-lg border">
                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-blue-950 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left">Qualification</th>

                        <th className="px-4 py-3 text-left">Institution</th>

                        <th className="px-4 py-3 text-center">Passing Year</th>

                        <th className="px-4 py-3 text-center">Percentage</th>

                        <th className="px-4 py-3 text-center">Grade</th>

                        <th className="px-4 py-3 text-left">ID</th>
                      </tr>
                    </thead>

                    <tbody>
                      {student.education.map((education) => (
                        <tr
                          key={education.id}
                          className="border-border border-t"
                        >
                          <td className="px-4 py-3 font-medium">
                            {education.qualification}
                          </td>

                          <td className="px-4 py-3">{education.institution}</td>

                          <td className="px-4 py-3 text-center">
                            {education.passingYear}
                          </td>

                          <td className="px-4 py-3 text-center font-semibold text-blue-900 dark:text-blue-300">
                            {education.percentage}%
                          </td>

                          <td className="px-4 py-3 text-center">
                            {education.grade ?? '—'}
                          </td>

                          <td className="text-muted-foreground px-4 py-3 text-xs">
                            {education.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="divide-border divide-y md:hidden">
                  {student.education.map((education) => (
                    <div key={education.id} className="space-y-2 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          {education.qualification}
                        </span>

                        <span className="font-semibold text-blue-900 dark:text-blue-300">
                          {education.percentage}%
                        </span>
                      </div>

                      <p className="text-sm">{education.institution}</p>

                      <div className="text-muted-foreground flex justify-between text-xs">
                        <span>Passing Year: {education.passingYear}</span>

                        <span>Grade: {education.grade ?? '—'}</span>
                      </div>

                      <p className="text-muted-foreground text-xs break-all">
                        ID: {education.id}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* =================================================
            FAMILY
        ================================================== */}

            <section className="border-border border-b p-5 sm:p-7">
              <SectionTitle title="PARENTS / FAMILY DETAILS" />

              <div className="border-border mt-4 overflow-hidden rounded-lg border">
                <div className="hidden md:block">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-blue-950 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left">Name</th>

                        <th className="px-4 py-3 text-left">Relation</th>

                        <th className="px-4 py-3 text-left">Occupation</th>

                        <th className="px-4 py-3 text-left">Contact</th>

                        <th className="px-4 py-3 text-left">ID</th>
                      </tr>
                    </thead>

                    <tbody>
                      {student.family.map((member) => (
                        <tr key={member.id} className="border-border border-t">
                          <td className="px-4 py-3 font-medium">
                            {member.name}
                          </td>

                          <td className="px-4 py-3">{member.relationType}</td>

                          <td className="px-4 py-3">
                            {member.occupation ?? '—'}
                          </td>

                          <td className="px-4 py-3">
                            {member.contactNumber ?? '—'}
                          </td>

                          <td className="text-muted-foreground px-4 py-3 text-xs">
                            {member.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile */}
                <div className="divide-border divide-y md:hidden">
                  {student.family.map((member) => (
                    <div key={member.id} className="space-y-2 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{member.name}</span>

                        <span className="text-xs font-medium">
                          {member.relationType}
                        </span>
                      </div>

                      <p className="text-sm">
                        Occupation: {member.occupation ?? '—'}
                      </p>

                      <p className="text-sm">
                        Contact: {member.contactNumber ?? '—'}
                      </p>

                      <p className="text-muted-foreground text-xs break-all">
                        ID: {member.id}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* =================================================
            COMPLETE ADDRESS DATA
        ================================================== */}

            <section className="border-border border-b p-5 sm:p-7">
              <SectionTitle title="COMPLETE ADDRESS INFORMATION" />

              <div className="border-border divide-border mt-4 divide-y overflow-hidden rounded-lg border text-sm">
                <div className="flex items-center gap-2 px-2 py-1">
                  <Phone className="size-4 shrink-0" />:
                  <span>{student.mobile}</span>
                </div>

                <div className="flex items-start gap-2 px-2 py-1">
                  <House className="size-4 shrink-0" />:
                  <div className={cn('flex h-full flex-col')}>
                    <span>House No: {student.address?.houseNo}</span>
                    <span>Village: {student.address?.village?.name}</span>
                    <span>Mandal: {student.address?.mandal?.name}</span>
                    <span>District: {student.address?.district?.name}</span>
                    <span>State: {student.address?.state?.name}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
            SYSTEM INFORMATION
        ================================================== */}

            <section className="p-5 sm:p-7">
              <SectionTitle title="SYSTEM INFORMATION" />

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <TechnicalValue label="Student ID" value={student.id} />

                <TechnicalValue
                  label="Student Code"
                  value={student.studentCode}
                />

                <TechnicalValue label="Slug" value={student.slug} />

                <TechnicalValue label="Status" value={student.status} />

                <TechnicalValue label="Created At" value={student.createdAt} />

                <TechnicalValue label="Updated At" value={student.updatedAt} />

                <TechnicalValue
                  label="Deleted At"
                  value={student.deletedAt ?? 'Not deleted'}
                />
              </div>
            </section>
          </main>
        </div>

        {/* =====================================================
        FOOTER
    ====================================================== */}

        <footer
          className={cn(
            'flex flex-col gap-3',
            'bg-blue-950 px-5 py-4',
            'text-white sm:flex-row sm:items-center sm:justify-between',
          )}
        >
          <span className="text-sm font-medium">{student.studentCode}</span>

          <button
            type="button"
            className={cn(
              'rounded-md border border-yellow-400',
              'px-5 py-2',
              'text-sm font-semibold text-yellow-400',
              'transition hover:bg-yellow-400 hover:text-blue-950',
            )}
          >
            View Full Profile →
          </button>
        </footer>
      </div>
    </section>
  );
};
