import {
  HomeRbacType,
  DepartmeRbacType,
  EmployeeRbacType,
  JobTitleRbacType
} from './rbac.types';

export const rbacRules: any = {
  0: {
    roleName: 'Guest',
    static: [
      HomeRbacType.READ
    ]
  },
  1: {
    roleName: 'Regular',
    static: [
      HomeRbacType.READ,
      EmployeeRbacType.READ,
      DepartmeRbacType.READ,
      JobTitleRbacType.READ
    ]
  },
  2: {
    roleName: 'Administrator',
    static: [
      ...Object.values(HomeRbacType),
      ...Object.values(EmployeeRbacType),
      ...Object.values(DepartmeRbacType),
      ...Object.values(JobTitleRbacType)
    ]
  }
};
