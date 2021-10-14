import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Surface } from 'react-native-paper';

import { appRoutes, shadowElevations } from 'config/core';
import { selectDarkMode } from 'store/core';
import { Icon, IconName } from 'features/core/components';
import { EmployeeDetailScene } from '../scenes';

const Stack = createStackNavigator();

const HeaderLeft: FC<any> = ({ onPress }) => {
  const isDark = useSelector(selectDarkMode);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Surface style={styles.surface(isDark)}>
          <Icon name={IconName.LEFT} size={22} />
        </Surface>
      </View>
    </TouchableOpacity>
  );
};

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
      options={{
        headerLeft: props => <HeaderLeft {...props} />
      }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create<any>({
  wrapper: {
    padding: 16
  },
  surface: (isDark: boolean) => ({
    padding: 4,
    borderWidth: 1,
    borderColor: isDark ? '#fff' : '#000',
    borderRadius: 99,
    overflow: 'hidden'
  })
});
