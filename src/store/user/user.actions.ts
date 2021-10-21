import { createAction } from '@reduxjs/toolkit';
import { UserRole } from 'models';

export enum UserActionType {
  FETCH_ALL_USER_ROLES_START = '[User] Fetch All User Roles Start',
  FETCH_ALL_USER_ROLES_SUCCESS = '[User] Fetch All User Roles Success',
  FETCH_ALL_USER_ROLES_FAILURE = '[User] Fetch All User Roles Failure',
  FETCH_ALL_USER_ROLES_CANCELED = '[User] Fetch All User Roles Canceled'
}

const fetchAllUserRolesStart = createAction(
  UserActionType.FETCH_ALL_USER_ROLES_START
);

const fetchAllUserRolesSuccess = createAction(
  UserActionType.FETCH_ALL_USER_ROLES_SUCCESS,
  (userRoles: UserRole[]) => ({ payload: userRoles })
);

const fetchAllUserRolesFailure = createAction(
  UserActionType.FETCH_ALL_USER_ROLES_FAILURE
);

const fetchAllUserRolesCanceled = createAction(
  UserActionType.FETCH_ALL_USER_ROLES_CANCELED
);

export {
  fetchAllUserRolesStart,
  fetchAllUserRolesSuccess,
  fetchAllUserRolesFailure,
  fetchAllUserRolesCanceled
};
