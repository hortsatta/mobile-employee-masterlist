import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { JobTitle } from 'models';

export type JobTitleState = EntityState<JobTitle> & {
  loading: boolean;
  searchKeyword?: string;
  filterDepartment?: string;
};

const jobTitleAdapter = createEntityAdapter<JobTitle>({
  selectId: jobTitle => jobTitle.id || '',
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState: JobTitleState = jobTitleAdapter.getInitialState({
  loading: false
});

export { jobTitleAdapter, initialState };
