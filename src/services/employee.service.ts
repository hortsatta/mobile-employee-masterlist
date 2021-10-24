import firebase from 'firebase';
import dayjs from 'dayjs';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import {
  storage,
  firestore,
  FirestoreCollectionName,
  FirestoreSubCollectionName
} from 'config/firebase';
import { createId, ErrorMessage } from 'helpers';
import {
  Employee,
  EmployeeDepartment,
  EmployeeJobTitle,
  EmployeePageKey,
  EmployeePersonalInfo,
  PageCursor,
  PageMode,
  PersonalInfo,
  Salary,
  SortBy
} from 'models';
import { EmployeeFormData } from 'features/employee/scenes';
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

const getEmployeesByKeyword = async (
  keyword: string,
  fieldKey: EmployeePageKey,
  sortBy: SortBy,
  isActive = true
): Promise<Employee[] | null> => {

  try {
    const FIRST_NAME = 'personalInfo.firstName';
    const snapshots = await firestore
      .collection(FirestoreCollectionName.EMPLOYEES)
      .where(IS_ACTIVE, '==', isActive)
      .where(FIRST_NAME, '>=', keyword)
      .orderBy(FIRST_NAME, SortBy.ASC)
      .orderBy(fieldKey, sortBy)
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

const createLocalEmployee = async (formData: EmployeeFormData): Promise<Employee> => {
  const {
    isActive,
    hireDate,
    department: departmentId,
    jobTitle: jobTitleId,
    salary: salaryAmount,
    firstName,
    lastName,
    middleInitial,
    gender,
    birthDate,
    currentAddress,
    homeAddress,
    phones,
    emails,
    picture
  } = formData;

  const employeeId = await createId();

  const department: EmployeeDepartment = {
    id: await createId(),
    departmentId,
    dateFrom: hireDate.toISOString()
  };

  const jobTitle: EmployeeJobTitle = {
    id: await createId(),
    titleId: jobTitleId,
    dateFrom: hireDate.toISOString()
  };

  const salary: Salary = {
    id: await createId(),
    salary: salaryAmount || 0,
    dateFrom: hireDate.toISOString()
  };

  const pictures = picture
    ? await generateEmployeePortait(picture)
    : {
      picture: null,
      pictureFull: null,
      pictureThumb: null
    };

  const personalInfo: PersonalInfo = new EmployeePersonalInfo(
    firstName,
    lastName,
    middleInitial,
    gender,
    {
      date: dayjs(birthDate).format('MMMM DD, YYYY'),
      shortDate: dayjs(birthDate).format('MM-DD')
    },
    currentAddress,
    homeAddress,
    phones.map(phone => phone.value),
    emails.map(phone => phone.value),
    pictures.picture,
    pictures.pictureThumb,
    pictures.pictureFull,
    true
  );

  const employee: Employee = {
    isActive,
    id: `${employeeId}-local`,
    hireDate: {
      date: dayjs(hireDate).format('MMMM DD, YYYY'),
      shortDate: dayjs(hireDate).format('MM-DD')
    },
    department,
    jobTitle,
    salary,
    personalInfo,
    pageKey: {
      fullName: `${firstName}_${middleInitial}_${lastName}_${employeeId}`,
      hireDate: `${dayjs(hireDate).format('YYYY-MM-DD')}_${employeeId}`
    }
  };

  return employee;
};

const generateEmployeePortait = async (uri: string) => {
  const FULL_SIZE = 600;
  const THUMB_SIZE = 300;

  const fullSize = { width: FULL_SIZE, height: FULL_SIZE };
  const thumbSize = { width: THUMB_SIZE, height: THUMB_SIZE };
  const saveOptions = { compress: 1, format: SaveFormat.JPEG };

  const imageFull = await manipulateAsync(uri, [{ resize: fullSize }], saveOptions);
  const imageThumb = await manipulateAsync(uri, [{ resize: thumbSize }], saveOptions);

  return {
    picture: imageFull.uri,
    pictureFull: imageFull.uri,
    pictureThumb: imageThumb.uri
  };
};

export {
  getEmployeeFullPicture,
  getAllEmployees,
  getPageEmployees,
  getEmployeesByKeyword,
  getNewestEmployee,
  getEmployeeById,
  getTotalEmployeeCount,
  createLocalEmployee
};
