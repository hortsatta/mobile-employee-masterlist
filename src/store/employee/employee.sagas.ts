import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';
import produce from 'immer';

import { Employee, EmployeePageKey, PageCursor, PageMode } from 'models';
import {
  getAllEmployees,
  getTotalEmployeeCount,
  getNewestEmployee,
  getPageEmployees,
  getEmployeeFullPicture,
  getEmployeeById,
  getEmployeesByKeyword
} from 'services';
import { appendNotificationMessages } from 'store/core';
import { DEBOUNCE_DURATION } from 'features/core/hooks';
import {
  EmployeeActionType,
  fetchAllEmployeesFailure,
  fetchAllEmployeesSuccess,
  fetchEmployeesByKeywordFailure,
  fetchEmployeesByKeywordSuccess,
  fetchNewestEmployeeFailure,
  fetchNewestEmployeeSuccess,
  fetchNextPageEmployeesSuccess,
  fetchPreviousPageEmployeesSuccess,
  fetchInitialPageEmployeesSuccess,
  fetchPageEmployeesFailure,
  refreshEmployeeFailure,
  refreshEmployeeSuccess
} from './employee.actions';
import { selectLastLoadedEmployee } from './employee.selectors';

const fetchPageEmployees = (payload: any, pageMode?: PageMode, docKey?: string) => {
  const { fieldKey, isActive, sortBy } = payload;
  const pageCursor: PageCursor = { pageMode, fieldKey, docKey: docKey || '' };
  return getPageEmployees(pageCursor, sortBy, isActive);
};

function* refreshEmployeeWorker(action: PayloadAction<string>): SagaIterator<void> {
  try {
    const employee = yield call(getEmployeeById, action.payload);
    const picture = employee?.personalInfo.picture || null;

    const pictureFull = picture
      ? yield call(getEmployeeFullPicture, picture)
      : null;

    const updatedEmployee = produce(employee, (draft: Employee) => {
      draft.personalInfo.pictureFull = pictureFull;
    });

    yield put(refreshEmployeeSuccess(employee.id, updatedEmployee));
  } catch (error: any) {
    yield put(refreshEmployeeFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* allEmployeesStartWorker(): SagaIterator<void> {
  try {
    const totalCount = yield call(getTotalEmployeeCount);
    const employees = yield call(getAllEmployees);

    yield delay(DEBOUNCE_DURATION);
    yield put(fetchAllEmployeesSuccess(employees, totalCount));
  } catch (error: any) {
    yield put(fetchAllEmployeesFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* employeesByKeywordStartWorker(action: PayloadAction<Record<string, any>>): SagaIterator<void> {
  try {
    const { keyword, fieldKey, sortBy, isActive } = action.payload;
    const employees = yield call(getEmployeesByKeyword, keyword, fieldKey, sortBy, isActive);

    yield delay(DEBOUNCE_DURATION);
    yield put(fetchEmployeesByKeywordSuccess(employees));
  } catch (error: any) {
    yield put(fetchEmployeesByKeywordFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* initialPageEmployeesStartWorker(action: PayloadAction<Record<string, any>>): SagaIterator<void> {
  try {
    const totalCount = yield call(getTotalEmployeeCount);
    const employees = yield call(fetchPageEmployees, action.payload);

    yield delay(DEBOUNCE_DURATION);
    yield put(fetchInitialPageEmployeesSuccess(employees, totalCount));
  } catch (error: any) {
    yield put(fetchPageEmployeesFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* previousPageEmployeesStartWorker(action: PayloadAction<Record<string, any>>): SagaIterator<void> {
  try {
    const employees = yield call(fetchPageEmployees, action.payload);
    yield delay(DEBOUNCE_DURATION);
    yield put(fetchPreviousPageEmployeesSuccess(employees));
  } catch (error: any) {
    yield put(fetchPageEmployeesFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* nextPageEmployeesStartWorker(action: PayloadAction<Record<string, any>>): SagaIterator<void> {
  try {
    const lastEmployee = yield select(selectLastLoadedEmployee);

    const docKey = action.payload.fieldKey === EmployeePageKey.FULL_NAME
      ? lastEmployee.pageKey.fullName
      : lastEmployee.pageKey.hireDate;

    const employees = yield call(
      fetchPageEmployees,
      action.payload, PageMode.NEXT, docKey
    );

    yield delay(DEBOUNCE_DURATION);
    yield put(fetchNextPageEmployeesSuccess(employees));
  } catch (error: any) {
    yield put(fetchPageEmployeesFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* newestEmployeeStartWorker(): SagaIterator<void> {
  try {
    const employee = yield call(getNewestEmployee);
    const picture = employee?.personalInfo.picture || null;

    const pictureFull = picture
      ? yield call(getEmployeeFullPicture, picture)
      : null;

    const newestEmployee = produce<Employee>(employee, (draft: Employee) => {
      if (pictureFull) {
        draft.personalInfo.pictureFull = pictureFull;
      }
    });

    yield put(fetchNewestEmployeeSuccess(newestEmployee));
  } catch (error: any) {
    yield put(fetchNewestEmployeeFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* onFetchAllEmployeesStart() {
  yield takeLatest(
    EmployeeActionType.FETCH_ALL_EMPLOYEES_START,
    allEmployeesStartWorker
  );
}

function* onFetchEmployeesByKeywordStart() {
  yield takeLatest(
    EmployeeActionType.FETCH_EMPLOYEES_BY_KEYWORD_START,
    employeesByKeywordStartWorker
  );
}

function* onFetchInitialPageEmployeesStart() {
  yield takeLatest(
    EmployeeActionType.FETCH_INITIAL_PAGE_EMPLOYEES_START,
    initialPageEmployeesStartWorker
  );
}

function* onFetchPreviousPageEmployeesStart() {
  yield takeLatest(
    EmployeeActionType.FETCH_PREVIOUS_PAGE_EMPLOYEES_START,
    previousPageEmployeesStartWorker
  );
}

function* onFetchNextPageEmployeesStart() {
  yield takeLatest(
    EmployeeActionType.FETCH_NEXT_PAGE_EMPLOYEES_START,
    nextPageEmployeesStartWorker
  );
}

function* onFetchNewestEmployeeStart() {
  yield takeLatest(
    EmployeeActionType.FETCH_NEWEST_EMPLOYEE_START,
    newestEmployeeStartWorker
  );
}

function* onRefreshEmployeeStart() {
  yield takeLatest(
    EmployeeActionType.REFRESH_EMPLOYEE_START,
    refreshEmployeeWorker
  );
}

export function* employeeSagas(): unknown {
  yield all([
    call(onFetchAllEmployeesStart),
    call(onFetchEmployeesByKeywordStart),
    call(onFetchInitialPageEmployeesStart),
    call(onFetchPreviousPageEmployeesStart),
    call(onFetchNextPageEmployeesStart),
    call(onFetchNewestEmployeeStart),
    call(onRefreshEmployeeStart)
  ]);
}
