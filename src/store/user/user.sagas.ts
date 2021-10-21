import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { getAllUserRoles } from 'services';
import { appendNotificationMessages } from '../core';
import {
  UserActionType,
  fetchAllUserRolesCanceled,
  fetchAllUserRolesFailure,
  fetchAllUserRolesSuccess
} from './user.actions';
import { selectAllUserRoles } from './user.selectors';

function* allUserRolesStartWorker(): SagaIterator<void> {
  const storedUserRoles = yield select(selectAllUserRoles);
  if (storedUserRoles && storedUserRoles.length) {
    yield put(fetchAllUserRolesCanceled());
    return;
  }

  try {
    const userRoles = yield call(getAllUserRoles);
    yield put(fetchAllUserRolesSuccess(userRoles));
  } catch (error: any) {
    yield put(fetchAllUserRolesFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* onFetchAllDepartmentsStart() {
  yield takeLatest(
    UserActionType.FETCH_ALL_USER_ROLES_START,
    allUserRolesStartWorker
  );
}

export function* userSagas(): unknown {
  yield all([
    call(onFetchAllDepartmentsStart)
  ]);
}
