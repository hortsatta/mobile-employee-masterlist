import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Employee } from 'models';

export type EmployeeState = EntityState<Employee> & {
  loading: boolean;
  pageLoading: boolean;
  totalCount: number;
  currentPage?: number;
  newestEmployee?: Employee;
  selectedEmployeeId?: string;
};

const employeeAdapter = createEntityAdapter<Employee>({
  selectId: employee => employee.id || '',
  sortComparer: (a, b) => {
    const aFullName = a.personalInfo.fullName || '';
    const bFullName = b.personalInfo.fullName || '';
    return aFullName.localeCompare(bFullName);
  }
});

const initialState: EmployeeState = employeeAdapter.getInitialState({
  loading: true,
  pageLoading: false,
  totalCount: 0
});

export { employeeAdapter, initialState };
