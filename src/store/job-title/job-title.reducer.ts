import { createReducer } from '@reduxjs/toolkit';

import {
  fetchAllJobTitlesFailure,
  fetchAllJobTitlesStart,
  fetchAllJobTitlesSuccess
} from './job-title.actions';
import { jobTitleAdapter, initialState } from './job-title.state';

export const jobTitleReducer = createReducer(initialState, builder => (
  builder
    .addCase(fetchAllJobTitlesStart, state => {
      state.loading = true;
    })
    .addCase(fetchAllJobTitlesSuccess, (state, action) => {
      state.loading = false;
      return jobTitleAdapter.setAll(state, action.payload);
    })
    .addCase(fetchAllJobTitlesFailure, state => {
      state.loading = false;
    })
    .addDefaultCase(state => state)
));
