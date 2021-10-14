import firebase from 'firebase';
import { AuditTrail } from './core.model';

type JobTitle = AuditTrail & {
  id: string;
  name: string;
  departmentId: string;
  isActive: boolean;
}

type EmployeeJobTitle = AuditTrail & {
  id: string;
  titleId: string;
  dateFrom: firebase.firestore.Timestamp | string;
  dateTo?: firebase.firestore.Timestamp | string;
}

export type { JobTitle, EmployeeJobTitle };
