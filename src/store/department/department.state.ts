import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Department } from 'models';

export type DepartmentState = EntityState<Department> & {
  loading: boolean;
  searchKeyword?: string;
};

const departmentAdapter = createEntityAdapter<Department>({
  selectId: department => department.id || '',
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState: DepartmentState = departmentAdapter.getInitialState({
  loading: false
});

export { departmentAdapter, initialState };
