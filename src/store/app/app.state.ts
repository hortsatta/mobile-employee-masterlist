import { CoreState } from '../core/core.state';
import { AuthState } from '../auth/auth.state';
import { UserState } from '../user/user.state';
import { DepartmentState } from '../department/department.state';
import { JobTitleState } from '../job-title/job-title.state';
import { EmployeeState } from '../employee/employee.state';

export type AppState = {
  core: CoreState;
  auth: AuthState;
  user: UserState;
  department: DepartmentState;
  jobTitle: JobTitleState;
  employee: EmployeeState;
};
