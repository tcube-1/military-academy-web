export const PERMISSIONS = {
  // Students
  STUDENTS_READ: "students.read",
  STUDENTS_CREATE: "students.create",
  STUDENTS_UPDATE: "students.update",
  STUDENTS_DELETE: "students.delete",

  // Documents
  DOCUMENTS_READ: "documents.read",
  DOCUMENTS_VERIFY: "documents.verify",

  // Reports
  REPORTS_READ: "reports.read",
  REPORTS_EXPORT: "reports.export",
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Centralized permission registry interface
export const PermissionRegistry = new Set<string>(Object.values(PERMISSIONS));
