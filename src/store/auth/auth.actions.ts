import { createAction } from '@reduxjs/toolkit';
import { AuthCredential, Employee, User } from 'models';

export enum AuthActionType {
  CHECK_SIGN_IN_SESSION = '[Auth] Check Sign In Session Start',
  // Sign in
  SIGN_IN_START = '[Auth] Sign In Start',
  SIGN_IN_SUCCESS = '[Auth] Sign In Success',
  SIGN_IN_FAILURE = '[Auth] Sign In Failure',
  // Sign out
  SIGN_OUT_START = '[Auth] Sign Out Start',
  SIGN_OUT_SUCCESS = '[Auth] Sign Out Success',
  SIGN_OUT_FAILURE = '[Auth] Sign Out Failure',
}

const checkSignInSession = createAction(
  AuthActionType.CHECK_SIGN_IN_SESSION
);

const signInStart = createAction(
  AuthActionType.SIGN_IN_START,
  (credential: AuthCredential) => ({ payload: credential })
);

const signInSuccess = createAction(
  AuthActionType.SIGN_IN_SUCCESS,
  (user: User, employee: Employee) => ({ payload: { user, employee } })
);

const signInFailure = createAction(
  AuthActionType.SIGN_IN_FAILURE
);

const signOutStart = createAction(
  AuthActionType.SIGN_OUT_START
);

const signOutSuccess = createAction(
  AuthActionType.SIGN_OUT_SUCCESS
);

const signOutFailure = createAction(
  AuthActionType.SIGN_OUT_FAILURE
);

export {
  checkSignInSession,
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure
};
