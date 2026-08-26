export interface AuditEventPayload {
  actorId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  requestId: string;
  metadata?: Record<string, any>;
}

export class AuditService {
  static async logEvent(payload: AuditEventPayload): Promise<void> {
    // In future phases, write to audit_logs table via Drizzle repository
    // For now, it logs the boundary correctly
    console.log(`[AUDIT] ${payload.action} on ${payload.resourceType} by ${payload.actorId} (ReqID: ${payload.requestId})`);
  }
}
