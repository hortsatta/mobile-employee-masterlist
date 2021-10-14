import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getAllDepartments } from 'services';
import { appendNotificationMessages } from 'store/core';
import {
  DepartmentActionType,
  fetchAllDepartmentsFailure,
  fetchAllDepartmentsSuccess
} from './department.actions';

function* allDepartmentsStartWorker(): SagaIterator<void> {
  try {
    const departments = yield call(getAllDepartments);
    yield put(fetchAllDepartmentsSuccess(departments));
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
