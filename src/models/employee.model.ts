import dayjs from 'dayjs';
import firebase from 'firebase';

import { getDateFromTimestamp } from 'services/firebase.service';
import { AuditTrail } from './core.model';
import { EmployeeDepartment } from './department.model';
import { EmployeeJobTitle } from './job-title.model';

export enum EmployeePageKey {
  FULL_NAME = 'pageKey.fullName',
  HIRE_DATE = 'pageKey.hireDate'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

type Salary = AuditTrail & {
  id: string;
  salary: number;
  dateFrom: firebase.firestore.Timestamp | string;
  dateTo?: firebase.firestore.Timestamp | string;
}

type PersonalInfo = {
  firstName: string;
  lastName: string;
  middleInitial: string;
  gender: string;
  birthDate: {
    date: firebase.firestore.Timestamp | string;
    shortDate: string;
  };
  currentAddress: string;
  homeAddress: string;
  phones: string[];
  emails: string[];
  picture: string | null;
  pictureThumb?: string | null,
  pictureFull?: string | null
  fullName?: string;
}

type Employee = AuditTrail & {
  id: string;
  hireDate: {
    date: firebase.firestore.Timestamp | string;
    shortDate: string;
  }
  personalInfo: PersonalInfo;
  isActive: boolean;
  department?: EmployeeDepartment;
  jobTitle?: EmployeeJobTitle;
  salary?: Salary;
  pageKey?: {
    fullName: string;
    hireDate: string;
  };
}

export class EmployeePersonalInfo implements PersonalInfo {
  constructor(
    public firstName: string,
    public lastName: string,
    public middleInitial: string,
    public gender: string,
    public birthDate: PersonalInfo['birthDate'],
    public currentAddress: string,
    public homeAddress: string,
    public phones: string[],
    public emails: string[],
    public picture: string | null,
    public pictureThumb?: string | null,
    public pictureFull?: string | null,
    private isLocal?: boolean
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleInitial = middleInitial;
    this.gender = gender;
    this.birthDate = {
      date: isLocal
        ? birthDate.date
        : dayjs(getDateFromTimestamp(birthDate.date as any)).format('MMMM DD, YYYY'),
      shortDate: birthDate.shortDate
    };
    this.currentAddress = currentAddress;
    this.homeAddress = homeAddress;
    this.phones = phones;
    this.emails = emails;
    this.picture = picture;
    this.pictureThumb = pictureThumb;
    this.pictureFull = pictureFull;
  }

  get fullName(): string {
    return `${this.firstName} ${this.middleInitial}. ${this.lastName}`;
  }
}

export type { Employee, PersonalInfo, Salary };
