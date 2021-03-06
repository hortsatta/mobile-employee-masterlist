import { StatusBar } from 'expo-status-bar';
import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import { fontAssets, getNavTheme, getPaperTheme } from 'config/core';
import { selectDarkMode, selectNotificationMessages } from 'store/core';
import { fetchAllUserRolesStart } from 'store/user';
import { fetchAllDepartmentsStart } from 'store/department';
import { fetchAllJobTitlesStart } from 'store/job-title';
import { checkSignInSession, selectIsUserSignedIn } from 'store/auth';
import { AppNavigator } from '../core/navigation';
import { Icon } from '../core/components/icon.component';
import { NotificationManager } from '../core/components/notification-manager.component';

export const App: FC = () => {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts(fontAssets);
  const notificationMessages = useSelector(selectNotificationMessages);
  const isUserSignedIn = useSelector(selectIsUserSignedIn);

  // Get system color scheme and redux "dark" variable
  // to set light or dark mode for app theme.
  const colorScheme = useColorScheme();
  const darkMode = useSelector(selectDarkMode);

  // Define final color mode for the app's theme;
  // Apply result to react-native-paper and react-navigation theme.
  const isDark = useMemo(() => (
    (darkMode == null)
      ? !colorScheme || colorScheme === 'dark'
      : darkMode
  ), [darkMode, colorScheme]);

  const paperTheme = useMemo(() => getPaperTheme(isDark), [isDark]);
  const navTheme = useMemo(() => getNavTheme(isDark), [isDark]);

  useEffect(() => {
    dispatch(checkSignInSession());
  }, [dispatch]);

  useEffect(() => {
    if (!isUserSignedIn) { return; }
    dispatch(fetchAllUserRolesStart());
    dispatch(fetchAllDepartmentsStart());
    dispatch(fetchAllJobTitlesStart());
  }, [dispatch, isUserSignedIn]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <PaperProvider
          settings={{ icon: props => <Icon {...props} /> }}
          theme={paperTheme}
        >
          <NavigationContainer theme={navTheme}>
            <AppNavigator />
          </NavigationContainer>
          <NotificationManager notificationMessages={notificationMessages} />
        </PaperProvider>
        <StatusBar
          backgroundColor={paperTheme.colors.background}
          style={isDark ? 'light' : 'dark'}
        />
      </>
    );
  }
};
