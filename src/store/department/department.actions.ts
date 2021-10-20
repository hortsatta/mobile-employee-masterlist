import { createAction } from '@reduxjs/toolkit';
import { Department } from 'models';

export enum DepartmentActionType {
  FETCH_ALL_DEPARTMENTS_START = '[Department] Fetch All Departments Start',
  FETCH_ALL_DEPARTMENTS_SUCCESS = '[Department] Fetch All Departments Success',
  FETCH_ALL_DEPARTMENTS_FAILURE = '[Department] Fetch All Departments Failure',
  SET_DEPARTMENT_FILTERS = '[Department] Set Department Filters',
}

const fetchAllDepartmentsStart = createAction(
  DepartmentActionType.FETCH_ALL_DEPARTMENTS_START,
  (callback?: () => void) => ({ payload: callback })
);

const fetchAllDepartmentsSuccess = createAction(
  DepartmentActionType.FETCH_ALL_DEPARTMENTS_SUCCESS,
  (departments: Department[]) => ({ payload: departments })
);

const fetchAllDepartmentsFailure = createAction(
  DepartmentActionType.FETCH_ALL_DEPARTMENTS_FAILURE
);

const setDepartmentFilters = createAction(
  DepartmentActionType.SET_DEPARTMENT_FILTERS,
  (searchKeyword: string) => ({ payload: searchKeyword })
);

export {
  fetchAllDepartmentsStart,
  fetchAllDepartmentsSuccess,
  fetchAllDepartmentsFailure,
  setDepartmentFilters
};
