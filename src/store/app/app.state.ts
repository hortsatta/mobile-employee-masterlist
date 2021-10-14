import { AuthState } from '../auth/auth.state';
import { CoreState } from '../core/core.state';
import { DepartmentState } from '../department/department.state';
import { JobTitleState } from '../job-title/job-title.state';
import { EmployeeState } from '../employee/employee.state';

export type AppState = {
  core: CoreState;
  auth: AuthState;
  department: DepartmentState;
  jobTitle: JobTitleState;
  employee: EmployeeState;
};
