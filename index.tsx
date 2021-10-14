import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

import { persistor, store } from 'store';
import { HeaderContextProvider } from 'features/core/context';
import { App } from 'features/core/components/app.component';

const Root: FC = () => (
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

registerRootComponent(Root);
