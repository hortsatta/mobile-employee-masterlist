import { AuditTrail } from './core.model';

type User = AuditTrail & {
  id: string;
  employeeId: string;
  userRole: number;
  email: string;
  displayName?: string;
}

type UserRole = AuditTrail & {
  name: string;
  value: number;
}

export type { User, UserRole };
