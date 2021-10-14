import { EmployeePageKey } from './employee.model';

export enum PageMode {
  NEXT = 'next',
  PREVIOUS = 'previous'
}

export enum SortBy {
  ASC = 'asc',
  DESC = 'desc'
}

type PageKey = {
  [x: string]: string;
}

type PageCursor = {
  pageMode?: PageMode;
  fieldKey: EmployeePageKey;
  docKey: string;
}

export type { PageKey, PageCursor };
