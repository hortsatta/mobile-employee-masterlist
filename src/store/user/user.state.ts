import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { UserRole } from 'models';

export type UserState = {
  userRole: EntityState<UserRole> & {
    loading: boolean;
  }
};

const userRoleAdapter = createEntityAdapter<UserRole>({
  selectId: userRole => userRole.id || '',
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState: UserState = {
  userRole: userRoleAdapter.getInitialState({
    loading: false
  })
};

export { userRoleAdapter, initialState };
