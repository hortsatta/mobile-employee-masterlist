import { createAction } from '@reduxjs/toolkit';
import { Department } from 'models';

export enum DepartmentActionType {
  FETCH_ALL_DEPARTMENTS_START = '[Department] Fetch All Departments Start',
  FETCH_ALL_DEPARTMENTS_SUCCESS = '[Department] Fetch All Departments Success',
  FETCH_ALL_DEPARTMENTS_FAILURE = '[Department] Fetch All Departments Failure',
}

const fetchAllDepartmentsStart = createAction(
  DepartmentActionType.FETCH_ALL_DEPARTMENTS_START
);

const fetchAllDepartmentsSuccess = createAction(
  DepartmentActionType.FETCH_ALL_DEPARTMENTS_SUCCESS,
  (departments: Department[]) => ({ payload: departments })
);

const fetchAllDepartmentsFailure = createAction(
  DepartmentActionType.FETCH_ALL_DEPARTMENTS_FAILURE
);

export {
  fetchAllDepartmentsStart,
  fetchAllDepartmentsSuccess,
  fetchAllDepartmentsFailure
};
