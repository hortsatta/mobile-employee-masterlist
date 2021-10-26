import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_API_AUTH_DOMAIN,
  REACT_APP_FIREBASE_API_DATABASE_URL,
  REACT_APP_FIREBASE_API_PROJECT_ID,
  REACT_APP_FIREBASE_API_STORAGE_BUCKET,
  REACT_APP_FIREBASE_API_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_API_APP_ID,
  REACT_APP_FIREBASE_API_MEASUREMENT_ID
} from '@env';

export enum FirestoreCollectionName {
  DEPARTMENTS = 'departments',
  EMPLOYEES = 'employees',
  JOB_TITLES = 'titles',
  USERS = 'users',
  USER_ROLES = 'userRoles'
}

export enum FirestoreSubCollectionName {
  SALARY = 'salary',
  DEPARTMENT = 'department',
  JOB_TITLE = 'title'
}

// Set firebase config from dotenv
const config = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_API_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_API_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_API_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_API_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_API_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_API_APP_ID,
  measurementId: REACT_APP_FIREBASE_API_MEASUREMENT_ID
};

// Initialise firebase app.
firebase.initializeApp(config);
firebase.firestore().settings({ experimentalForceLongPolling: true });
// Declare firebase authentication and database.
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage().ref();

export { firebase, firestore, auth, storage };
