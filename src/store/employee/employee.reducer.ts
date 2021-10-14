import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import {
  fetchAllEmployeesFailure,
  fetchAllEmployeesSuccess,
  fetchAllEmployeesStart,
  fetchInitialPageEmployeesStart,
  fetchNextPageEmployeesStart,
  fetchNextPageEmployeesSuccess,
  fetchPreviousPageEmployeesStart,
  fetchPreviousPageEmployeesSuccess,
  fetchInitialPageEmployeesSuccess,
  fetchNewestEmployeeSuccess,
  fetchNewestEmployeeStart,
  fetchNewestEmployeeFailure,
  fetchPageEmployeesFailure,
  updateEmployeeSuccess,
  setSelectedEmployee
} from './employee.actions';
import { employeeAdapter, initialState } from './employee.state';

export const employeeReducer = createReducer(initialState, builder => (
  builder
    .addCase(setSelectedEmployee, (state, action) => {
      state.selectedEmployeeId = action.payload;
    })
    .addCase(updateEmployeeSuccess, (state, action) => {
      const { id, changes } = action.payload;
      employeeAdapter.updateOne(state, { id, changes });
    })
    .addCase(fetchNewestEmployeeSuccess, (state, action) => {
      state.loading = false;
      state.newestEmployee = action.payload;
    })
    .addCase(fetchAllEmployeesSuccess, (state, action) => {
      const { employees, totalCount } = action.payload;

      state.loading = false;
      state.totalCount = totalCount;

      return employeeAdapter.setAll(state, employees);
    })
    .addCase(fetchInitialPageEmployeesSuccess, (state, action) => {
      const { employees, totalCount } = action.payload;

      state.loading = false;
      state.totalCount = totalCount;
      state.currentPage = 0;

      return employeeAdapter.setAll(state, employees);
    })
    .addCase(fetchPreviousPageEmployeesSuccess, (state, action) => {
      state.pageLoading = false;
      state.currentPage && --state.currentPage;
      return employeeAdapter.upsertMany(state, action.payload);
    })
    .addCase(fetchNextPageEmployeesSuccess, (state, action) => {
      state.pageLoading = false;
      state.currentPage && ++state.currentPage;
      return employeeAdapter.upsertMany(state, action.payload);
    })
    .addCase(fetchInitialPageEmployeesStart, state => {
      state.loading = true;
      state.currentPage = undefined;
    })
    .addCase(fetchPageEmployeesFailure, state => {
      state.pageLoading = false;
    })
    .addMatcher(
      isAnyOf(fetchNewestEmployeeStart, fetchAllEmployeesStart),
      state => { state.loading = true; }
    )
    .addMatcher(
      isAnyOf(fetchPreviousPageEmployeesStart, fetchNextPageEmployeesStart),
      state => { state.pageLoading = true; }
    )
    .addMatcher(
      isAnyOf(fetchAllEmployeesFailure, fetchNewestEmployeeFailure),
      state => { state.loading = false; }
    )
    .addDefaultCase(state => state)
));
