import { studentDataType } from '@/utils/types';

export function searchStudents(
  students: studentDataType[],
  query: string,
): studentDataType[] {
  const normalizedQuery = query.trim().toLowerCase();

  // Empty search -> return all students
  if (!normalizedQuery) {
    return students;
  }

  return students.filter((student) => {
    const searchableFields = [
      student.studentCode,
      student.fullName,

      // Job
      student.job?.title,
      student.job?.category,
      student.job?.joiningYear?.toString(),

      // Force
      student.force?.name,
      student.force?.code,

      // Address
      student.address?.village?.name,
      student.address?.mandal?.name,
      student.address?.district?.name,
      student.address?.state?.name,

      // Other useful fields
      student.bloodGroup,
      student.mobile,
      student.family?.[0]?.occupation,
    ];

    return searchableFields.some((field) =>
      String(field ?? '')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  });
}
