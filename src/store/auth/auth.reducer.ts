import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import {
  checkSignInSession,
  signInFailure,
  signInStart,
  signInSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess
} from './auth.actions';
import { initialState } from './auth.state';

export const authReducer = createReducer(initialState, builder => (
  builder
    .addCase(signOutSuccess, state => {
      state.loading = false;
      state.currentUser = undefined;
      state.currentEmployee = undefined;
    })
    .addCase(signInSuccess, (state, action) => {
      const { user, employee } = action.payload;
      state.loading = false;
      state.currentUser = user;
      state.currentEmployee = employee;
    })
    .addMatcher(isAnyOf(checkSignInSession, signInStart, signOutStart), state => {
      state.loading = true;
    })
    .addMatcher(isAnyOf(signInFailure, signOutFailure), state => {
      state.loading = false;
    })
    .addDefaultCase(state => state)
));
