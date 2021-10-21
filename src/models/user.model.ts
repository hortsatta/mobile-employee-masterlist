import { AuditTrail } from './core.model';

type User = AuditTrail & {
  id: string;
  employeeId: string;
  userRole: number;
  email: string;
  displayName?: string;
}

type UserRole = AuditTrail & {
  id: string;
  name: string;
  value: number;
  isActive: boolean;
}

export type { User, UserRole };
