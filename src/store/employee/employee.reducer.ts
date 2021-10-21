import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import {
  addNewEmployeeStart,
  addNewEmployeeSuccess,
  addNewEmployeeFailure,
  fetchAllEmployeesFailure,
  fetchAllEmployeesSuccess,
  fetchEmployeeByIdStart,
  fetchEmployeeByIdFailure,
  fetchEmployeeByIdSuccess,
  fetchEmployeesByKeywordFailure,
  fetchEmployeesByKeywordStart,
  fetchEmployeesByKeywordSuccess,
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
  fetchEmployeesCanceled,
  refreshEmployeeSuccess,
  setSelectedEmployee
} from './employee.actions';
import { employeeAdapter, initialState } from './employee.state';

export const employeeReducer = createReducer(initialState, builder => (
  builder
    .addCase(setSelectedEmployee, (state, action) => {
      state.selectedEmployeeId = action.payload;
    })
    .addCase(refreshEmployeeSuccess, (state, action) => {
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
    .addCase(fetchEmployeesByKeywordSuccess, (state, action) => {
      state.loading = false;
      state.currentPage = 0;
      return employeeAdapter.setAll(state, action.payload);
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
    .addCase(fetchPageEmployeesFailure, state => {
      state.pageLoading = false;
    })
    .addCase(fetchEmployeesCanceled, state => {
      state.pageLoading = false;
      state.loading = false;
    })
    .addMatcher(
      isAnyOf(addNewEmployeeSuccess, fetchEmployeeByIdSuccess),
      (state, action) => {
        state.loading = false;
        employeeAdapter.addOne(state, action.payload);
      }
    )
    .addMatcher(
      isAnyOf(fetchInitialPageEmployeesStart, fetchEmployeesByKeywordStart),
      state => {
        state.loading = true;
        state.currentPage = undefined;
      }
    )
    .addMatcher(
      isAnyOf(
        addNewEmployeeStart,
        fetchEmployeeByIdStart,
        fetchNewestEmployeeStart,
        fetchAllEmployeesStart
      ),
      state => { state.loading = true; }
    )
    .addMatcher(
      isAnyOf(fetchPreviousPageEmployeesStart, fetchNextPageEmployeesStart),
      state => { state.pageLoading = true; }
    )
    .addMatcher(
      isAnyOf(
        addNewEmployeeFailure,
        fetchEmployeeByIdFailure,
        fetchAllEmployeesFailure,
        fetchEmployeesByKeywordFailure,
        fetchNewestEmployeeFailure
      ),
      state => { state.loading = false; }
    )
    .addDefaultCase(state => state)
));
