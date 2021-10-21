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

const selectDepartmentsByKeyword = createSelector(
  selectDepartmentState,
  selectAllDepartments,
  (state, departments) => {
    const keyword = state.searchKeyword?.toLocaleUpperCase() || '';
    return departments.filter(d => (
      d.name.toLowerCase().includes(keyword)
      || d.alias.toLowerCase().includes(keyword)
    ));
  }
);

const selectTotalDepartmentCount = createSelector(
  selectDepartmentState,
  selectTotal
);

const selectDepartmentSearchKeyword = createSelector(
  selectDepartmentState,
  state => state.searchKeyword
);

const selectDepartmentLoading = createSelector(
  selectDepartmentState,
  state => state.loading
);

export {
  selectAllDepartments,
  selectAllDepartmentEntities,
  selectDepartmentsByKeyword,
  selectTotalDepartmentCount,
  selectDepartmentSearchKeyword,
  selectDepartmentLoading
};
