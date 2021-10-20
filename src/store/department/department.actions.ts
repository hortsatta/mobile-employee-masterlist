import { createAction } from '@reduxjs/toolkit';
import { Department } from 'models';

export enum DepartmentActionType {
  FETCH_ALL_DEPARTMENTS_START = '[Department] Fetch All Departments Start',
  FETCH_ALL_DEPARTMENTS_SUCCESS = '[Department] Fetch All Departments Success',
  FETCH_ALL_DEPARTMENTS_FAILURE = '[Department] Fetch All Departments Failure',
  SET_SEARCH_KEYWORD = '[Department] Set Search Keyword',
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

const setDepartmentSearchKeyword = createAction(
  DepartmentActionType.SET_SEARCH_KEYWORD,
  (value: string) => ({ payload: value })
);

export {
  fetchAllDepartmentsStart,
  fetchAllDepartmentsSuccess,
  fetchAllDepartmentsFailure,
  setDepartmentSearchKeyword
};
