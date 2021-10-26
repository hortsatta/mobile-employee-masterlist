import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { persistor, store } from 'store';
import { HeaderContextProvider } from 'features/core/context';
import { App } from './app.component';

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
