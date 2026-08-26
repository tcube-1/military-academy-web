export const PERMISSIONS = {
  // Users
  USERS_READ: "users.read",
  USERS_CREATE: "users.create",
  USERS_UPDATE: "users.update",
  USERS_DELETE: "users.delete",

  // Roles
  ROLES_READ: "roles.read",
  ROLES_MANAGE: "roles.manage",

  // Permissions
  PERMISSIONS_READ: "permissions.read",
  PERMISSIONS_MANAGE: "permissions.manage",

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

export const PermissionRegistry = new Set<string>(Object.values(PERMISSIONS));
