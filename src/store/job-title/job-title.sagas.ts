import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getAllJobTitles } from 'services';
import { appendNotificationMessages } from 'store/core';
import {
  JobTitleActionType,
  fetchAllJobTitlesFailure,
  fetchAllJobTitlesSuccess
} from './job-title.actions';

function* allJobTitlesStartWorker(action: PayloadAction<any>): SagaIterator<void> {
  try {
    const jobTitles = yield call(getAllJobTitles);
    yield put(fetchAllJobTitlesSuccess(jobTitles));
    // Invoke callback
    action.payload && action.payload();
  } catch (error: any) {
    yield put(fetchAllJobTitlesFailure());
    yield put(appendNotificationMessages({
      status: error.name.toLowerCase(),
      message: error.message
    }));
  }
}

function* onFetchAllJobTitlesStart() {
  yield takeLatest(
    JobTitleActionType.FETCH_ALL_JOB_TITLES_START,
    allJobTitlesStartWorker
  );
}

export function* jobTitleSagas(): unknown {
  yield all([
    call(onFetchAllJobTitlesStart)
  ]);
}
