import firebase from 'firebase';
import dayjs from 'dayjs';

import {
  storage,
  firestore,
  FirestoreCollectionName,
  FirestoreSubCollectionName
} from 'config/firebase';
import { ErrorMessage } from 'helpers';
import {
  Employee,
  EmployeePersonalInfo,
  PageCursor,
  PageMode,
  PersonalInfo,
  Salary,
  SortBy
} from 'models';
import { getDateFromTimestamp } from './firebase.service';
import { getEmployeeJobTitles } from './job-title.service';
import { getEmployeeDepartments } from './department.service';

type Snapshot = firebase.firestore.DocumentSnapshot;

const IS_ACTIVE = 'isActive';
const PAGE_SIZE = 10;

const getEmployeeFullPicture = (url: string): Promise<string | null> => (
  storage.child(`${url}`).getDownloadURL()
);

const transformEmployeeSnapshot = async (snapshot: Snapshot, subCollections: any): Promise<Employee | null> => {
  const { salary, department, jobTitle } = subCollections;

  const data = snapshot.data();
  // If employee does not exist return null
  if (!data) { return null; }

  const { hireDate, pageKey, isActive } = data;

  const { firstName, lastName, middleInitial, gender, birthDate, currentAddress,
    homeAddress, phones, emails, picture } = data.personalInfo;

  // Get full path for employee picture (full resolution and thumb size).
  const pictureThumb = picture
    ? await storage.child(`${picture}_thumb`).getDownloadURL() : null;

  // Transform data in proper employee personal info
  const personalInfo: PersonalInfo = new EmployeePersonalInfo(
    firstName,
    lastName,
    middleInitial,
    gender,
    birthDate,
    currentAddress,
    homeAddress,
    phones,
    emails,
    picture,
    pictureThumb
  );
  // Finalise employee and return
  const employee: Employee = {
    id: snapshot.id,
    hireDate: {
      ...hireDate,
      date: dayjs(getDateFromTimestamp(hireDate.date)).format('MMMM DD, YYYY')
    },
    personalInfo,
    pageKey,
    salary,
    department,
    jobTitle,
    isActive
  };

  return employee;
};

const getEmployeeSalaries = async (id: string, limit?: number): Promise<Salary[] | null> => {
  const docRef = firestore
    .collection(FirestoreCollectionName.EMPLOYEES)
    .doc(id)
    .collection(FirestoreSubCollectionName.SALARY)
    .orderBy('createdAt', 'desc');

  const snapshots = await (limit ? docRef.limit(limit) : docRef).get();

  const salaries = snapshots.docs.map(snapshot => {
    const { dateFrom, dateTo, ...otherData } = snapshot.data();
    return {
      ...otherData,
      id: snapshot.id,
      dateFrom: dayjs(getDateFromTimestamp(dateFrom)).format('MMMM DD, YYYY'),
      ...dateTo && { dateTo: dayjs(getDateFromTimestamp(dateTo)).format('MMMM DD, YYYY') }
    };
  });

  return salaries;
};

const getEmployeeSubCollections = async (snapshot: Snapshot): Promise<any> => {
  const salaries = await getEmployeeSalaries(snapshot.id);
  const departments = await getEmployeeDepartments(snapshot.id);
  const jobTitles = await getEmployeeJobTitles(snapshot.id);

  return {
    salary: salaries ? salaries[0] : undefined,
    department: departments ? departments[0] : undefined,
    jobTitle: jobTitles ? jobTitles[0] : undefined
  };
};

const getAllEmployees = async (isActive = true): Promise<Employee[] | null> => {
  try {
    const snapshots = await firestore
      .collection(FirestoreCollectionName.EMPLOYEES)
      .where(IS_ACTIVE, '==', isActive)
      .orderBy('pageKey.fullName', 'asc')
      .get();

    const employees: any = snapshots.docs
      .map(async snapshot => {
        const subCollections = await getEmployeeSubCollections(snapshot);
        const employee = await transformEmployeeSnapshot(snapshot, subCollections);
        return employee; })
      .filter(e => !!e);

    return Promise.all(employees);
  } catch (error) {
    throw new Error(ErrorMessage.SERVER);
  }
};

const getPageEmployees = async (
  pageCursor: PageCursor,
  sortBy: SortBy,
  isActive = true
): Promise<Employee[] | null> => {

  const { pageMode, fieldKey, docKey } = pageCursor;

  const getPageEmployeesSnapshots = () => {
    switch (pageMode) {
      case PageMode.NEXT:
        return firestore
          .collection(FirestoreCollectionName.EMPLOYEES)
          .where(IS_ACTIVE, '==', isActive)
          .orderBy(fieldKey, sortBy)
          .startAfter(docKey)
          .limit(PAGE_SIZE)
          .get();
      case PageMode.PREVIOUS:
        return firestore
          .collection(FirestoreCollectionName.EMPLOYEES)
          .where(IS_ACTIVE, '==', isActive)
          .orderBy(fieldKey, sortBy)
          .endBefore(docKey)
          .limit(PAGE_SIZE)
          .get();
      default:
        return firestore
          .collection(FirestoreCollectionName.EMPLOYEES)
          .where(IS_ACTIVE, '==', isActive)
          .orderBy(fieldKey, sortBy)
          .limit(PAGE_SIZE)
          .get();
    }
  };

  try {
    const snapshots = await getPageEmployeesSnapshots();

    const employees: any = snapshots.docs
      .map(async snapshot => {
        const subCollections = await getEmployeeSubCollections(snapshot);
        const employee = await transformEmployeeSnapshot(snapshot, subCollections);
        return employee; })
      .filter(e => !!e);

    return Promise.all(employees);
  } catch (error) {
    throw new Error(ErrorMessage.SERVER);
  }

};

const getEmployeesByKeyword = async (keyword: string, isActive = true): Promise<Employee[] | null> => {
  try {
    const snapshots = await firestore
      .collection(FirestoreCollectionName.EMPLOYEES)
      .where(IS_ACTIVE, '==', isActive)
      .where('personalInfo.firstName', '>=', keyword)
      .get();

    const employees: any = snapshots.docs
      .map(async snapshot => {
        const subCollections = await getEmployeeSubCollections(snapshot);
        const employee = await transformEmployeeSnapshot(snapshot, subCollections);
        return employee; })
      .filter(e => !!e);

    return Promise.all(employees);
  } catch (error) {
    throw new Error(ErrorMessage.SERVER);
  }
};

const getNewestEmployee = async (): Promise<Employee | null> => {
  try {
    const snapshots = await firestore
      .collection(FirestoreCollectionName.EMPLOYEES)
      .where(IS_ACTIVE, '==', true)
      .orderBy('hireDate.date', 'desc')
      .limit(1)
      .get();

    const employees: any = snapshots.docs.map(async snapshot => {
      const subCollections = await getEmployeeSubCollections(snapshot);
      const employee = await transformEmployeeSnapshot(snapshot, subCollections);
      return employee;
    });

    return employees.length ? employees[0] : null;
  } catch (error) {
    throw new Error(ErrorMessage.SERVER);
  }
};

const getEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    const snapshot = await firestore
      .collection(FirestoreCollectionName.EMPLOYEES)
      .doc(id)
      .get();

    const subCollections = await getEmployeeSubCollections(snapshot);
    const employee = await transformEmployeeSnapshot(snapshot, subCollections);

    return employee;
  } catch (error) {
    throw new Error(ErrorMessage.SERVER);
  }
};

const getTotalEmployeeCount = async (isActive = true): Promise<number> => {
  const snapshots = await firestore
    .collection(FirestoreCollectionName.EMPLOYEES)
    .where(IS_ACTIVE, '==', isActive)
    .get();

  return snapshots.size;
};

export {
  getEmployeeFullPicture,
  getAllEmployees,
  getPageEmployees,
  getEmployeesByKeyword,
  getNewestEmployee,
  getEmployeeById,
  getTotalEmployeeCount
};
