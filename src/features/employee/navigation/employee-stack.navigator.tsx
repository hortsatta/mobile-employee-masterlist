import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { appRoutes, shadowElevations } from 'config/core';
import { EmployeeDetailScene } from '../scenes';

const Stack = createStackNavigator();

export const EmployeeStackNavigator: FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: '',
      headerTransparent: true,
      headerMode: 'screen',
      headerStyle: { ...shadowElevations[0] }
    }}
  >
    <Stack.Screen
      name={appRoutes.employeeDetail.path}
      component={EmployeeDetailScene}
    />
  </Stack.Navigator>
);
