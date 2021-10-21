import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import {
  fetchAllUserRolesCanceled,
  fetchAllUserRolesFailure,
  fetchAllUserRolesStart,
  fetchAllUserRolesSuccess
} from './user.actions';
import { userRoleAdapter, initialState } from './user.state';

export const userReducer = createReducer(initialState, builder => (
  builder
    .addCase(fetchAllUserRolesStart, state => {
      state.userRole.loading = true;
    })
    .addCase(fetchAllUserRolesSuccess, (state, action) => {
      state.userRole.loading = false;
      state.userRole = userRoleAdapter.setAll(state.userRole, action.payload);
    })
    .addMatcher(
      isAnyOf(fetchAllUserRolesFailure, fetchAllUserRolesCanceled),
      state => {
        state.userRole.loading = false;
      }
    )
    .addDefaultCase(state => state)
));
