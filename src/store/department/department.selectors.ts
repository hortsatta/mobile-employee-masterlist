import { createSelector } from 'reselect';
import { AppState } from '../app';
import { departmentAdapter, DepartmentState } from './department.state';

const selectDepartmentState = (state: AppState): DepartmentState => state.department;

const { selectAll, selectTotal, selectEntities } = departmentAdapter.getSelectors();

const selectAllDepartments = createSelector(
  selectDepartmentState,
  selectAll
);

const selectAllDepartmentEntities = createSelector(
  selectDepartmentState,
  selectEntities
);

const selectTotalDepartmentCount = createSelector(
  selectDepartmentState,
  selectTotal
);

const selectDepartmentLoading = createSelector(
  selectDepartmentState,
  state => state.loading
);

export {
  selectAllDepartments,
  selectAllDepartmentEntities,
  selectTotalDepartmentCount,
  selectDepartmentLoading
};
