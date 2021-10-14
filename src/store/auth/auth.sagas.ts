import { SagaIterator } from 'redux-saga';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { ErrorMessage } from 'helpers';
import {
  getAuthUser,
  getEmployeeById,
  getUserById,
  signInWithEmailAndPassword,
  signOut
} from 'services';
import { selectCurrentAuthEmployee } from 'store/employee';
import { DEBOUNCE_DURATION } from 'features/core/hooks';
import { appendNotificationMessages } from '../core';
import {
  AuthActionType,
  signInFailure,
  signInSuccess,
  signOutSuccess
} from './auth.actions';

function* signIn(id: string): SagaIterator<void> {
  const user = yield call(getUserById, id);
  const employee = yield select(selectCurrentAuthEmployee);
  const authEmployee = !employee
    ? yield call(getEmployeeById, user.employeeId)
    : employee;

  yield delay(DEBOUNCE_DURATION);
  yield put(signInSuccess(user, authEmployee));
}

function* checkSignInSessionWorker(): SagaIterator<void> {
  try {
    const authUser = yield call(getAuthUser);

    if (!authUser) {
      yield put(signInFailure());
      return;
    }

    yield call(signIn, authUser.uid);
  } catch (error: any) {
    yield put(signInFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* signInWorker(action: any): SagaIterator<void> {
  try {
    const authUser = yield call(signInWithEmailAndPassword, action.payload);

    if (!authUser) {
      throw new Error(ErrorMessage.SIGN_IN);
    }

    yield call(signIn, authUser.uid);
  } catch (error: any) {
    yield put(signInFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* signOutWorker(): SagaIterator<void> {
  try {
    yield call(signOut);
    yield delay(DEBOUNCE_DURATION);
    yield put(signOutSuccess());
  } catch (error: any) {
    yield put(signInFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* checkSignInSession() {
  yield takeLatest(
    AuthActionType.CHECK_SIGN_IN_SESSION,
    checkSignInSessionWorker
  );
}

function* signInStart() {
  yield takeLatest(
    AuthActionType.SIGN_IN_START,
    signInWorker
  );
}

function* signOutStart() {
  yield takeLatest(
    AuthActionType.SIGN_OUT_START,
    signOutWorker
  );
}

export function* authSagas(): unknown {
  yield all([
    call(checkSignInSession),
    call(signInStart),
    call(signOutStart)
  ]);
}
