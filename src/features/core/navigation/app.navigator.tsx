import { FC } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { appRoutes } from 'config/core';
import { EmployeeTabNavigator, EmployeeStackNavigator } from 'features/employee/navigation';
import { HomeScene } from 'features/home/scenes';
import { UserAccountScene } from 'features/user/scenes';
import { Header } from '../components';
import { MenuNavigator } from './menu.navigator';

const AppStack = createStackNavigator();
const MainStack = createStackNavigator();

export const AppNavigator: FC = () => (
  <AppStack.Navigator
    initialRouteName={appRoutes.home.path}
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS
    }}
  >
    <AppStack.Screen
      name={'mainNav'}
      component={MainNavigator}
    />
    <AppStack.Screen
      name={appRoutes.employeeStack.path}
      component={EmployeeStackNavigator}
    />
  </AppStack.Navigator>
);

const MainNavigator: FC = () => (
  <MainStack.Navigator
    initialRouteName={appRoutes.home.path}
    screenOptions={{
      headerMode: 'float',
      headerTransparent: true,
      header: (props: any) => <Header {...props} />
    }}
  >
    <MainStack.Screen
      name={appRoutes.home.path}
      component={HomeScene}
      options={{ title: appRoutes.home.name }}
    />
    <MainStack.Screen
      name={appRoutes.userAccount.path}
      component={UserAccountScene}
      options={{ title: appRoutes.userAccount.name }}
    />
    <MainStack.Screen
      name={appRoutes.employee.path}
      component={EmployeeTabNavigator}
      options={{ title: appRoutes.employee.name }}
    />
    <MainStack.Screen
      name={appRoutes.menuNavigator.path}
      component={MenuNavigator}
    />
  </MainStack.Navigator>
);
