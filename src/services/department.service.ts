import firebase from 'firebase';
import dayjs from 'dayjs';

import {
  firestore,
  FirestoreCollectionName,
  FirestoreSubCollectionName
} from 'config/firebase';
import { ErrorMessage } from 'helpers';
import { Department, EmployeeDepartment } from 'models';
import { getDateFromTimestamp } from './firebase.service';

type Snapshot = firebase.firestore.DocumentSnapshot;

const IS_ACTIVE = 'isActive';

const transformDepartmentSnapshot = async (snapshot: Snapshot): Promise<Department | null> => {
  const data = snapshot.data();

  if (!data) { return null; }

  const { name, alias, isActive } = data;
  const department: Department = {
    id: snapshot.id,
    name,
    alias,
    isActive
  };
  return department;
};

const getAllDepartments = async (isActive = true): Promise<Department[] | null> => {
  try {
    const snapshots = await firestore
      .collection(FirestoreCollectionName.DEPARTMENTS)
      .where(IS_ACTIVE, '==', isActive)
      .get();

    const departments: any = snapshots.docs
      .map(async snapshot => await transformDepartmentSnapshot(snapshot))
      .filter(e => !!e);

    return Promise.all(departments);
  } catch (error) {
    throw new Error(ErrorMessage.SERVER);
  }
};

const getEmployeeDepartments = async (id: string, limit?: number): Promise<EmployeeDepartment[] | null> => {
  const docRef = firestore
    .collection(FirestoreCollectionName.EMPLOYEES)
    .doc(id)
    .collection(FirestoreSubCollectionName.DEPARTMENT)
    .orderBy('createdAt', 'desc');

  const snapshots = await (limit ? docRef.limit(limit) : docRef).get();

  const departments = snapshots.docs.map(snapshot => {
    const { dateFrom, dateTo, departmentId } = snapshot.data();
    return {
      id: snapshot.id,
      departmentId,
      dateFrom: dayjs(getDateFromTimestamp(dateFrom)).format('MMMM DD, YYYY'),
      ...dateTo && { dateTo: dayjs(getDateFromTimestamp(dateTo)).format('MMMM DD, YYYY') }
    };
  });

  return departments;
};

export { getAllDepartments, getEmployeeDepartments };
