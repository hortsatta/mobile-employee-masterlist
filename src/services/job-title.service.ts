import firebase from 'firebase';
import dayjs from 'dayjs';

import {
  firestore,
  FirestoreCollectionName,
  FirestoreSubCollectionName
} from 'config/firebase';
import { ErrorMessage } from 'helpers';
import { JobTitle, EmployeeJobTitle } from 'models';
import { getDateFromTimestamp } from './firebase.service';

type Snapshot = firebase.firestore.DocumentSnapshot;

const IS_ACTIVE = 'isActive';

const transformJobTitleSnapshot = async (snapshot: Snapshot): Promise<JobTitle | null> => {
  const data = snapshot.data();

  if (!data) { return null; }

  const { name, departmentId, isActive } = data;
  const jobTitle: JobTitle = {
    id: snapshot.id,
    name,
    departmentId,
    isActive
  };
  return jobTitle;
};

const getAllJobTitles = async (isActive = true): Promise<JobTitle[] | null> => {
  try {
    const snapshots = await firestore
      .collection(FirestoreCollectionName.JOB_TITLES)
      .where(IS_ACTIVE, '==', isActive)
      .get();

    const jobTitles: any = snapshots.docs
      .map(async snapshot => await transformJobTitleSnapshot(snapshot))
      .filter(e => !!e);

    return Promise.all(jobTitles);
  } catch (error) {
    throw new Error(ErrorMessage.SERVER);
  }
};

const getEmployeeJobTitles = async (id: string, limit?: number): Promise<EmployeeJobTitle[] | null> => {
  const docRef = firestore
    .collection(FirestoreCollectionName.EMPLOYEES)
    .doc(id)
    .collection(FirestoreSubCollectionName.JOB_TITLE)
    .orderBy('createdAt', 'desc');

  const snapshots = await (limit ? docRef.limit(limit) : docRef).get();

  const jobTitles = snapshots.docs.map(snapshot => {
    const { dateFrom, dateTo, titleId } = snapshot.data();
    return {
      id: snapshot.id,
      titleId,
      dateFrom: dayjs(getDateFromTimestamp(dateFrom)).format('MMMM DD, YYYY'),
      ...dateTo && { dateTo: dayjs(getDateFromTimestamp(dateTo)).format('MMMM DD, YYYY') }
    };
  });

  return jobTitles;
};

export { getAllJobTitles, getEmployeeJobTitles };
