import { createSelector } from 'reselect';
import { AppState } from '../app';
import { userRoleAdapter, UserState } from './user.state';

const selectUserState = (state: AppState): UserState => state.user;

const {
  selectAll: selectAllUserRolesSelector,
  selectEntities: selectUserRolesEntities
} = userRoleAdapter.getSelectors();

const selectUserRoleState = createSelector(
  selectUserState,
  state => state.userRole
);

const selectAllUserRoles = createSelector(
  selectUserRoleState,
  selectAllUserRolesSelector
);

const selectAllUserRolesEntities = createSelector(
  selectUserRoleState,
  selectUserRolesEntities
);

const selectAdminUserRole = createSelector(
  selectAllUserRoles,
  userRoles => userRoles.find(role => role.value === 2)
);

const selectUserRolesLoading = createSelector(
  selectUserRoleState,
  userRoleState => userRoleState.loading
);

export {
  selectAllUserRoles,
  selectAllUserRolesEntities,
  selectAdminUserRole,
  selectUserRolesLoading
};
