import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import { coreReducer } from '../core/core.reducer';
import { authReducer } from '../auth/auth.reducer';
import { userReducer } from '../user/user.reducer';
import { departmentReducer } from '../department/department.reducer';
import { jobTitleReducer } from '../job-title/job-title.reducer';
import { employeeReducer } from '../employee/employee.reducer';

// Configure redux-persist to keep store data in storage,
// specific config if you want to blacklist specific property.
const appPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'core',
    'auth',
    'user',
    'department',
    'jobTitle',
    'employee'
  ]
};

const corePersistConfig = {
  key: 'core',
  storage: AsyncStorage,
  whitelist: ['darkMode']
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['userRole.ids', 'userRole.entities']
};

const departmentPersistConfig = {
  key: 'department',
  storage: AsyncStorage,
  whitelist: ['ids', 'entities']
};

const jobTitlePersistConfig = {
  key: 'jobTitle',
  storage: AsyncStorage,
  whitelist: ['ids', 'entities']
};

// Combine all reducers.
const appReducer = combineReducers({
  core: persistReducer(corePersistConfig, coreReducer),
  auth: authReducer,
  user: persistReducer(userPersistConfig, userReducer),
  department: persistReducer(departmentPersistConfig, departmentReducer),
  jobTitle: persistReducer(jobTitlePersistConfig, jobTitleReducer),
  employee: employeeReducer
});

const persistedReducer = persistReducer(appPersistConfig, appReducer);

export { appReducer,  persistedReducer };
