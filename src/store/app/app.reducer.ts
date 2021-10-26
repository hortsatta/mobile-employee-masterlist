import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import MMKVStorage from 'react-native-mmkv-storage';

import { coreReducer } from '../core/core.reducer';
import { authReducer } from '../auth/auth.reducer';
import { userReducer } from '../user/user.reducer';
import { departmentReducer } from '../department/department.reducer';
import { jobTitleReducer } from '../job-title/job-title.reducer';
import { employeeReducer } from '../employee/employee.reducer';

const storage = new MMKVStorage.Loader().initialize();

// Configure redux-persist to keep store data in storage,
// specific config if you want to blacklist specific property.
const appPersistConfig = {
  key: 'root',
  storage,
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
  storage,
  whitelist: ['darkMode']
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['userRole.ids', 'userRole.entities']
};

const departmentPersistConfig = {
  key: 'department',
  storage,
  whitelist: ['ids', 'entities']
};

const jobTitlePersistConfig = {
  key: 'jobTitle',
  storage,
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
