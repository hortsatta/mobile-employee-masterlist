export enum EmployeeRbacType {
  READ = 'employee:read',
  CREATE = 'employee:create',
  UPDATE = 'employee:update',
  DELETE = 'employee:delete',
  DETAIL_READ = 'employee-detail:read'
}

export enum DepartmeRbacType {
  READ = 'department:read',
  CREATE = 'department:create',
  UPDATE = 'department:update',
  DELETE = 'department:delete'
}

export enum JobTitleRbacType {
  READ = 'job-title:read',
  CREATE = 'job-title:create',
  UPDATE = 'job-title:update',
  DELETE = 'job-title:delete'
}

export enum HomeRbacType {
  READ = 'home:read'
}
