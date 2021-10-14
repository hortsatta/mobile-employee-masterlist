import { EmployeePageKey } from 'models';

export enum PageMode {
  NEXT = 'next',
  PREVIOUS = 'previous'
}

export enum SortBy {
  ASC = 'asc',
  DESC = 'desc'
}

export type PageCursor = {
  fieldKey: EmployeePageKey;
  docKey: string;
  pageMode?: PageMode;
}
