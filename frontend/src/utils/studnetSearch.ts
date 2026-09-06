import { studentDataType } from '@/utils/types';

/**
 * Helper function for abbreviation/fuzzy matching.
 * Checks if all characters of `search` appear in `text` in the exact same order.
 * Example: 'kmngr' in 'karimnagar' -> true
 */
function isSubsequence(search: string, text: string): boolean {
  if (search.length > text.length) return false;

  let searchIndex = 0;
  for (let textIndex = 0; textIndex < text.length; textIndex++) {
    // If characters match, move to the next character in the search string
    if (
      searchIndex < search.length &&
      search[searchIndex] === text[textIndex]
    ) {
      searchIndex++;
    }
  }

  // Return true if we found all characters of the search string
  return searchIndex === search.length;
}

export function searchStudents(
  students: studentDataType[],
  query: string,
): studentDataType[] {
  const normalizedQuery = query.trim().toLowerCase();

  // Empty search -> return all students
  if (!normalizedQuery) {
    return students;
  }

  // Split query into multiple terms by spaces (e.g., "karimnagar army" -> ["karimnagar", "army"])
  const searchTerms = normalizedQuery.split(/\s+/);

  return students.filter((student) => {
    // Prepare all fields as an array of lowercase strings to avoid repeated conversions
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
    ].map((field) => String(field ?? '').toLowerCase());

    // `.every` ensures that EVERY term typed by the user must match AT LEAST one field.
    return searchTerms.every((term) => {
      // `.some` checks if the current term matches any of the student's fields.
      return searchableFields.some((field) => {
        // 1. Direct string match (faster, exact matches like "karim")
        if (field.includes(term)) return true;

        // 2. Fallback to Subsequence match (abbreviations like "kmngr" for "karimnagar")
        if (isSubsequence(term, field)) return true;

        return false;
      });
    });
  });
}
