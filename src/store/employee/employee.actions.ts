import { createAction } from '@reduxjs/toolkit';
import { Employee, EmployeePageKey, SortBy } from 'models';

export enum EmployeeActionType {
  FETCH_ALL_EMPLOYEES_START = '[Employee] Fetch All Employees Start',
  FETCH_ALL_EMPLOYEES_SUCCESS = '[Employee] Fetch All Employees Success',
  FETCH_ALL_EMPLOYEES_FAILURE = '[Employee] Fetch All Employees Failure',
  // For newly hired employee
  FETCH_NEWEST_EMPLOYEE_START = '[Employee] Fetch Newest Employee Start',
  FETCH_NEWEST_EMPLOYEE_SUCCESS = '[Employee] Fetch Newest Employee Success',
  FETCH_NEWEST_EMPLOYEE_FAILURE = '[Employee] Fetch Newest Employee Failure',
  // For pagination
  FETCH_INITIAL_PAGE_EMPLOYEES_START = '[Employee] Fetch Initial Page Employees Start',
  FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS = '[Employee] Fetch Initial Page Employees Success',
  FETCH_PREVIOUS_PAGE_EMPLOYEES_START = '[Employee] Fetch Previous Page Employees Start',
  FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS = '[Employee] Fetch Previous Page Employees Success',
  FETCH_NEXT_PAGE_EMPLOYEES_START = '[Employee] Fetch Next Page Employees Start',
  FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS = '[Employee] Fetch Next Page Employees Success',
  FETCH_PAGE_EMPLOYEES_FAILURE = '[Employee] Fetch Next Page Employees Failure',
  // Update employee
  REFRESH_EMPLOYEE_START = '[Employee] Refresh Employee Start',
  REFRESH_EMPLOYEE_SUCCESS = '[Employee] Refresh Employee Success',
  REFRESH_EMPLOYEE_FAILURE = '[Employee] Refresh Employee Failure',
  // Set selected Employee
  SET_SELECTED_EMPLOYEE = '[Employee] Set Selected Employee'
}

const fetchAllEmployeesStart = createAction(
  EmployeeActionType.FETCH_ALL_EMPLOYEES_START
);

const fetchAllEmployeesSuccess = createAction(
  EmployeeActionType.FETCH_ALL_EMPLOYEES_SUCCESS,
  (employees: Employee[], totalCount: number) => ({ payload: { employees, totalCount } })
);

const fetchAllEmployeesFailure = createAction(
  EmployeeActionType.FETCH_ALL_EMPLOYEES_FAILURE
);

const fetchNewestEmployeeStart = createAction(
  EmployeeActionType.FETCH_NEWEST_EMPLOYEE_START
);

const fetchNewestEmployeeSuccess = createAction(
  EmployeeActionType.FETCH_NEWEST_EMPLOYEE_SUCCESS,
  (employee: Employee) => ({ payload: employee })
);

const fetchNewestEmployeeFailure = createAction(
  EmployeeActionType.FETCH_NEWEST_EMPLOYEE_FAILURE
);

const fetchInitialPageEmployeesStart = createAction(
  EmployeeActionType.FETCH_INITIAL_PAGE_EMPLOYEES_START,
  (fieldKey: EmployeePageKey, sortBy: SortBy, isActive: boolean) =>
    ({ payload: { fieldKey, sortBy, isActive } })
);

const fetchPreviousPageEmployeesStart = createAction(
  EmployeeActionType.FETCH_PREVIOUS_PAGE_EMPLOYEES_START,
  (fieldKey: EmployeePageKey, sortBy: SortBy, isActive: boolean) =>
    ({ payload: { fieldKey, sortBy, isActive } })
);

const fetchNextPageEmployeesStart = createAction(
  EmployeeActionType.FETCH_NEXT_PAGE_EMPLOYEES_START,
  (fieldKey: EmployeePageKey, sortBy: SortBy, isActive: boolean) =>
    ({ payload: { fieldKey, sortBy, isActive } })
);

const fetchInitialPageEmployeesSuccess = createAction(
  EmployeeActionType.FETCH_INITIAL_PAGE_EMPLOYEES_SUCCESS,
  (employees: Employee[], totalCount: number) => ({ payload: { employees, totalCount } })
);

const fetchPreviousPageEmployeesSuccess = createAction(
  EmployeeActionType.FETCH_PREVIOUS_PAGE_EMPLOYEES_SUCCESS,
  (employees: Employee[]) => ({ payload: employees })
);

const fetchNextPageEmployeesSuccess = createAction(
  EmployeeActionType.FETCH_NEXT_PAGE_EMPLOYEES_SUCCESS,
  (employees: Employee[]) => ({ payload: employees })
);

const fetchPageEmployeesFailure = createAction(
  EmployeeActionType.FETCH_PAGE_EMPLOYEES_FAILURE
);

const refreshEmployeeStart = createAction(
  EmployeeActionType.REFRESH_EMPLOYEE_START,
  (id: string) => ({ payload: id })
);

const refreshEmployeeSuccess = createAction(
  EmployeeActionType.REFRESH_EMPLOYEE_SUCCESS,
  (id: string, changes: Record<string, any>) =>({ payload: { id, changes } })
);

const refreshEmployeeFailure = createAction(
  EmployeeActionType.REFRESH_EMPLOYEE_FAILURE
);

const setSelectedEmployee = createAction(
  EmployeeActionType.SET_SELECTED_EMPLOYEE,
  (id: string) =>({ payload: id })
);

export {
  fetchAllEmployeesStart,
  fetchAllEmployeesSuccess,
  fetchAllEmployeesFailure,
  fetchNewestEmployeeStart,
  fetchNewestEmployeeSuccess,
  fetchNewestEmployeeFailure,
  fetchInitialPageEmployeesStart,
  fetchInitialPageEmployeesSuccess,
  fetchPreviousPageEmployeesStart,
  fetchPreviousPageEmployeesSuccess,
  fetchNextPageEmployeesStart,
  fetchNextPageEmployeesSuccess,
  fetchPageEmployeesFailure,
  refreshEmployeeStart,
  refreshEmployeeSuccess,
  refreshEmployeeFailure,
  setSelectedEmployee
};
