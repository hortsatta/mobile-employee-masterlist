import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { appRoutes } from 'config/core';
import { AuthScene } from 'features/auth/scenes';
import { MainMenuScene } from '../scenes';

const Stack = createStackNavigator();

export const MenuNavigator: FC = () => (
  <Stack.Navigator
    initialRouteName={appRoutes.signIn.path}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={appRoutes.signIn.path} component={AuthScene} />
    <Stack.Screen name={appRoutes.menu.path} component={MainMenuScene} />
  </Stack.Navigator>
);
