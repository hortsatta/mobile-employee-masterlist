import { createSelector } from 'reselect';
import { AuthState } from 'store/auth';
import { AppState } from '../app';
import { employeeAdapter, EmployeeState } from './employee.state';

const selectEmployeeState = (state: AppState): EmployeeState => state.employee;
const selectAuthState = (state: AppState): AuthState => state.auth;

const { selectAll, selectEntities, selectTotal } = employeeAdapter.getSelectors();

const selectAllEmployees = createSelector(
  selectEmployeeState,
  selectAll
);

const selectAllEmployeeEntities = createSelector(
  selectEmployeeState,
  selectEntities
);

const selectCurrentAuthEmployee = createSelector(
  selectAllEmployeeEntities,
  selectAuthState,
  (employeeEntities, authState) =>
    employeeEntities[authState.currentUser?.employeeId ||  '']
);

const selectNewestEmployee = createSelector(
  selectEmployeeState,
  state => state.newestEmployee
);

const selectSelectedEmployee = createSelector(
  selectEmployeeState,
  selectAllEmployeeEntities,
  (state, entities) => entities[state.selectedEmployeeId || '']
);

const selectLoadedEmployeeCount = createSelector(
  selectEmployeeState,
  selectTotal
);

const selectLastLoadedEmployee = createSelector(
  selectAllEmployees,
  selectLoadedEmployeeCount,
  (employees, count) => employees[count - 1]
);

const selectTotalEmployeeCount = createSelector(
  selectEmployeeState,
  state => state.totalCount
);

const selectIsAllEmployeesLoaded = createSelector(
  selectTotalEmployeeCount,
  selectLoadedEmployeeCount,
  (totalCount, loadedCount) => loadedCount >= totalCount
);

const selectCurrentPage = createSelector(
  selectEmployeeState,
  state => state.currentPage
);

const selectEmployeeLoading = createSelector(
  selectEmployeeState,
  state => state.loading
);

const selectEmployeePageLoading = createSelector(
  selectEmployeeState,
  state => state.pageLoading
);

export {
  selectAllEmployees,
  selectAllEmployeeEntities,
  selectCurrentAuthEmployee,
  selectNewestEmployee,
  selectSelectedEmployee,
  selectLoadedEmployeeCount,
  selectLastLoadedEmployee,
  selectTotalEmployeeCount,
  selectIsAllEmployeesLoaded,
  selectCurrentPage,
  selectEmployeeLoading,
  selectEmployeePageLoading
};
