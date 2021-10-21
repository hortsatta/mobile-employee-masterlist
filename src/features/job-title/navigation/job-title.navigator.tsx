import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { appRoutes } from 'config/core';
import { SubHeader } from 'features/core/components';
import { JobTitleListScene, UpsertJobTitleScene } from '../scenes';

const Stack = createStackNavigator();

export const JobTitleNavigator: FC = () => (
  <Stack.Navigator
    initialRouteName={appRoutes.jobTitleList.path}
    screenOptions={{
      headerTransparent: true,
      header: props => <SubHeader {...props} />
    }}
  >
    <Stack.Screen
      name={appRoutes.jobTitleList.path}
      component={JobTitleListScene}
      options={{ title: appRoutes.jobTitleList.name }}
    />
    <Stack.Screen
      name={appRoutes.upsertJobTitle.path}
      component={UpsertJobTitleScene}
      options={{ title: appRoutes.upsertJobTitle.name }}
    />
  </Stack.Navigator>
);
