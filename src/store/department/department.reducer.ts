import { createReducer } from '@reduxjs/toolkit';

import {
  fetchAllDepartmentsFailure,
  fetchAllDepartmentsStart,
  fetchAllDepartmentsSuccess
} from './department.actions';
import { departmentAdapter, initialState } from './department.state';

export const departmentReducer = createReducer(initialState, builder => (
  builder
    .addCase(fetchAllDepartmentsStart, state => {
      state.loading = true;
    })
    .addCase(fetchAllDepartmentsSuccess, (state, action) => {
      state.loading = false;
      return departmentAdapter.setAll(state, action.payload);
    })
    .addCase(fetchAllDepartmentsFailure, state => {
      state.loading = false;
    })
    .addDefaultCase(state => state)
));
