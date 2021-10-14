import { all, call } from 'redux-saga/effects';

import { authSagas } from '../auth/auth.sagas';
import { departmentSagas } from '../department/department.sagas';
import { jobTitleSagas } from '../job-title/job-title.sagas';
import { employeeSagas } from '../employee/employee.sagas';

export function* appSagas(): Generator {
  yield all([
    call(authSagas),
    call(departmentSagas),
    call(jobTitleSagas),
    call(employeeSagas)
  ]);
}
