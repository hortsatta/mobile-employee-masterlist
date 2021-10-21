import { createSelector } from 'reselect';

import { AppState } from '../app';
import { selectAllUserRoles } from '../user';
import { AuthState } from './auth.state';

const selectAuthState = (state: AppState): AuthState => state.auth;

const selectCurrentUser = createSelector(
  selectAuthState,
  state => state.currentUser
);

const selectCurrentUserRole = createSelector(
  selectAllUserRoles,
  selectAuthState,
  (userRoles, state) => (
    (userRoles && state.currentUser)
      ? userRoles.find(userRole => userRole.value === state.currentUser?.userRole)
      : null
  )
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
  selectCurrentUserRole,
  selectCurrentEmployee,
  selectIsUserSignedIn,
  selectAuthLoading
};
