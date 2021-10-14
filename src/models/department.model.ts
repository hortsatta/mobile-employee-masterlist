import firebase from 'firebase';
import { AuditTrail } from './core.model';

type Department = AuditTrail & {
  id: string;
  name: string;
  alias: string;
  isActive: boolean;
}

type EmployeeDepartment = AuditTrail & {
  id: string;
  departmentId: string;
  dateFrom: firebase.firestore.Timestamp | string;
  dateTo?: firebase.firestore.Timestamp | string;
}

export type { Department, EmployeeDepartment };
