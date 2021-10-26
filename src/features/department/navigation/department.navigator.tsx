import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { appRoutes } from 'config/core';
import { SubHeader } from 'features/core/components';
import { DepartmentListScene, UpsertDepartmentScene } from '../scenes';

const Stack = createStackNavigator();

export const DepartmentNavigator: FC = () => (
  <Stack.Navigator
    initialRouteName={appRoutes.departmentList.path}
    screenOptions={{
      headerTransparent: true,
      header: props => <SubHeader {...props} />
    }}
  >
    <Stack.Screen
      name={appRoutes.departmentList.path}
      component={DepartmentListScene}
      options={{ title: appRoutes.departmentList.name }}
    />
    <Stack.Screen
      name={appRoutes.upsertDepartment.path}
      component={UpsertDepartmentScene}
      options={{ title: appRoutes.upsertDepartment.name }}
    />
  </Stack.Navigator>
);
