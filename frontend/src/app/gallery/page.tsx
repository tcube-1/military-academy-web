'use client';

import { useMemo, useState } from 'react';

import studentsData from '../../../data/Defence_Academy_1000_Student_Objects.json';

import CardGallery from '@/components/section/Cards/CardGallery';
import { authClient } from '@/components/auth/AuthClient';

import { cn } from '@/lib/utils';
import { studentDataType } from '@/utils/types';

import { searchStudents } from '@/utils/studnetSearch';

const students = studentsData as studentDataType[];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: session } = authClient.useSession();

  const isUserLoggedIn = Boolean(session?.user);

  const filteredStudents = useMemo(() => {
    return searchStudents(students, searchQuery);
  }, [searchQuery]);

  const hasSearch = searchQuery.trim().length > 0;

  return (
    <main className="container mx-auto min-h-screen px-4">
      <section className="py-8">
        {/* Search Header */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
              }}
              placeholder="Search student, code, job, district..."
              className={cn(
                'w-full rounded-xl border px-4 py-3',
                'bg-background text-sm',
                'outline-none',
                'transition',
                'focus:ring-accent/40 focus:ring-2',
              )}
              aria-label="Search students"
            />
          </div>

          {/* Search Result Info */}
          <div className="mt-2 flex items-center justify-between px-1">
            <p className="text-muted-foreground text-xs">
              {hasSearch
                ? `Total: ${filteredStudents.length} students found`
                : `Total: ${students.length} students`}
            </p>

            {hasSearch && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={cn(
                  'text-accent text-xs font-medium',
                  'transition-opacity hover:opacity-70',
                )}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Gallery */}
        {filteredStudents.length > 0 ? (
          <div
            className={cn(
              'grid gap-6',
              'grid-cols-1',
              'sm:grid-cols-2',
              'lg:grid-cols-3',
              'xl:grid-cols-4',
            )}
          >
            {filteredStudents.map((student) => (
              <CardGallery
                key={student.id}
                student={student}
                isUserLoggedIn={isUserLoggedIn}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-80 items-center justify-center">
            <div className="max-w-md text-center">
              <p className="text-lg font-semibold">No students found</p>

              <p className="text-muted-foreground mt-2 text-sm">
                No students matched your search. Try a different name, student
                code, job, force, or district.
              </p>

              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={cn(
                  'mt-4 rounded-lg px-4 py-2',
                  'bg-primary text-primary-foreground',
                  'text-sm font-medium',
                  'transition hover:opacity-90',
                )}
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
