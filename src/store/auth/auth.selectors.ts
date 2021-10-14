import { createSelector } from 'reselect';
import { AppState } from '../app';
import { AuthState } from './auth.state';

const selectAuthState = (state: AppState): AuthState => state.auth;

const selectCurrentUser = createSelector(
  selectAuthState,
  state => state.currentUser
);

const selectCurrentEmployee = createSelector(
  selectAuthState,
  state => state.currentEmployee
);

const selectIsUserSignedIn = createSelector(
  selectAuthState,
  state => !!state.currentUser
);

const selectAuthLoading = createSelector(
  selectAuthState,
  state => state.loading
);

export {
  selectAuthState,
  selectCurrentUser,
  selectCurrentEmployee,
  selectIsUserSignedIn,
  selectAuthLoading
};
