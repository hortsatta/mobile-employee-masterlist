import { createAction } from '@reduxjs/toolkit';
import { JobTitle } from 'models';

export enum JobTitleActionType {
  FETCH_ALL_JOB_TITLES_START = '[JobTitle] Fetch All Job Titles Start',
  FETCH_ALL_JOB_TITLES_SUCCESS = '[JobTitle] Fetch All Job Titles Success',
  FETCH_ALL_JOB_TITLES_FAILURE = '[JobTitle] Fetch All Job Titles Failure',
  SET_JOB_TITLE_FILTERS = '[JobTitle] Set Job Title Filters',
}

const fetchAllJobTitlesStart = createAction(
  JobTitleActionType.FETCH_ALL_JOB_TITLES_START,
  (callback?: () => void) => ({ payload: callback })
);

const fetchAllJobTitlesSuccess = createAction(
  JobTitleActionType.FETCH_ALL_JOB_TITLES_SUCCESS,
  (jobTitles: JobTitle[]) => ({ payload: jobTitles })
);

const fetchAllJobTitlesFailure = createAction(
  JobTitleActionType.FETCH_ALL_JOB_TITLES_FAILURE
);

const setJobTitleFilters = createAction(
  JobTitleActionType.SET_JOB_TITLE_FILTERS,
  (searchKeyword?: string, filterDepartment?: string) =>
    ({ payload: { searchKeyword, filterDepartment } })
);

export {
  fetchAllJobTitlesStart,
  fetchAllJobTitlesSuccess,
  fetchAllJobTitlesFailure,
  setJobTitleFilters
};
