import { createSelector } from 'reselect';
import { AppState } from '../app';
import { jobTitleAdapter, JobTitleState } from './job-title.state';

const selectJobTitleState = (state: AppState): JobTitleState => state.jobTitle;

const { selectAll, selectEntities, selectTotal } = jobTitleAdapter.getSelectors();

const selectAllJobTitles = createSelector(
  selectJobTitleState,
  selectAll
);

const selectAllJobTitleEntities = createSelector(
  selectJobTitleState,
  selectEntities
);

const selectTotalJobTitleCount = createSelector(
  selectJobTitleState,
  selectTotal
);

const selectJobTitleLoading = createSelector(
  selectJobTitleState,
  state => state.loading
);

export {
  selectAllJobTitles,
  selectAllJobTitleEntities,
  selectTotalJobTitleCount,
  selectJobTitleLoading
};
