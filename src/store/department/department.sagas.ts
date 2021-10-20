import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getAllDepartments } from 'services';
import { appendNotificationMessages } from 'store/core';
import {
  DepartmentActionType,
  fetchAllDepartmentsFailure,
  fetchAllDepartmentsSuccess
} from './department.actions';

function* allDepartmentsStartWorker(action: PayloadAction<any>): SagaIterator<void> {
  try {
    const departments = yield call(getAllDepartments);
    yield put(fetchAllDepartmentsSuccess(departments));
    // Invoke callback
    action.payload && action.payload();
  } catch (error: any) {
    yield put(fetchAllDepartmentsFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* onFetchAllDepartmentsStart() {
  yield takeLatest(
    DepartmentActionType.FETCH_ALL_DEPARTMENTS_START,
    allDepartmentsStartWorker
  );
}

export function* departmentSagas(): unknown {
  yield all([
    call(onFetchAllDepartmentsStart)
  ]);
}
