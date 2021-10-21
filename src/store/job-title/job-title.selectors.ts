import { createSelector } from 'reselect';
import * as d3 from 'd3-array';

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

const selectAllJobTitlesGroupedByDepartment = createSelector(
  selectAllJobTitles,
  jobTitles => {
    const groups = d3.groups(jobTitles, d => d.departmentId);
    return groups.map(group => ({ departmentId: group[0], data: group[1] }));
  }
);

const selectFilteredJobTitlesGroupedByDepartment = createSelector(
  selectJobTitleState,
  selectAllJobTitlesGroupedByDepartment,
  (state, jobTitlesByDepartment) => {
    const keyword = state.searchKeyword?.toLowerCase() || '';
    let isEmpty = true;

    const items = jobTitlesByDepartment
      .filter(item => state.filterDepartment?.trim()
        ? item.departmentId === state.filterDepartment
        : true)
      .map(item2 => {
        const data = item2.data.filter(jt => jt.name.toLowerCase().includes(keyword));
        isEmpty = !data.length;
        return { ...item2, data };
      });

    return isEmpty ? [] : items;
  }
);

const selectJobTitleFilters = createSelector(
  selectJobTitleState,
  state => ({
    searchKeyword: state.searchKeyword,
    filterDepartment: state.filterDepartment
  })
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
  selectAllJobTitlesGroupedByDepartment,
  selectFilteredJobTitlesGroupedByDepartment,
  selectJobTitleFilters,
  selectTotalJobTitleCount,
  selectJobTitleLoading
};
