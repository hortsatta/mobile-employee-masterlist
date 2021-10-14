import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import { appSagas, persistedReducer } from './app';

// Initialise store side effects using redux saga.
const sagaMiddleware = createSagaMiddleware();
// Disable serializable value check for redux persist,
// and apply saga middleware for side effects.
const createMiddleware = (getDefaultMiddleware: any) => [
  ...getDefaultMiddleware({ serializableCheck: false }),
  sagaMiddleware
];
// Compose store from redux toolkit;
// Use persisted reducers, apply middlewares
// and enable devtools in development environment.
const store = configureStore({
  reducer: persistedReducer,
  middleware: createMiddleware
  // ENABLE DOTENV FIRST
  // devTools: process.env.NODE_ENV === 'development'
});
// Apply persist to store.
const persistor = persistStore(store);
// Initialise redux-saga (store middleware side effects)
sagaMiddleware.run(appSagas);

export { store, persistor };
