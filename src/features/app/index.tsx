import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { LogBox } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { persistor, store } from 'store';
import { HeaderContextProvider } from 'features/core/context';
import { App } from './app';

LogBox.ignoreLogs([
  'Setting a timer for a long period of time',
  'AsyncStorage has been extracted from react-native core'
]);

export const Root: FC = () => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <HeaderContextProvider>
          <App />
        </HeaderContextProvider>
      </SafeAreaProvider>
    </PersistGate>
  </ReduxProvider>
);
