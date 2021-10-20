import React, { FC } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { appRoutes, shadowElevations } from 'config/core';
import { PaperTheme } from 'models';
import { DepartmentNavigator } from 'features/department/navigation';
import { SubHeader } from 'features/core/components';
import { EmployeeListScene, UpsertEmployeeScene } from '../scenes';

import EmployeesSvg from 'assets/svgs/employees.svg';
import EmployeesGrayscaleSvg from 'assets/svgs/employees-grayscale.svg';
import HierarchySvg from 'assets/svgs/hierarchy.svg';
import HierarchyGrayscaleSvg from 'assets/svgs/hierarchy-grayscale.svg';
import KingSvg from 'assets/svgs/king.svg';
import KingGrayscaleSvg from 'assets/svgs/king-grayscale.svg';
import TabVSvg from 'assets/svgs/tab-v.svg';
import WandSvg from 'assets/svgs/wand.svg';
import WandGrayscaleSvg from 'assets/svgs/wand-grayscale.svg';

const TAB_BAR_ICON_SIZE = 30;

const getSvg = (name: string) => {
  switch (name) {
    case appRoutes.employeeList.path:
      return EmployeesSvg;
    case appRoutes.department.path:
      return HierarchySvg;
    case appRoutes.jobTitleList.path:
      return KingSvg;
    case appRoutes.upsertEmployee.path:
      return WandSvg;
    case `${appRoutes.employeeList.path}_grayscale`:
      return EmployeesGrayscaleSvg;
    case `${appRoutes.department.path}_grayscale`:
      return HierarchyGrayscaleSvg;
    case `${appRoutes.jobTitleList.path}_grayscale`:
      return KingGrayscaleSvg;
    case `${appRoutes.upsertEmployee.path}_grayscale`:
      return WandGrayscaleSvg;
    default:
      return EmployeesSvg;
  }
};

const Tab = createBottomTabNavigator();

export const EmployeeTabNavigator: FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={appRoutes.employeeList.path}
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        headerTransparent: true,
        header: props => <SubHeader {...props} />,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          const name = `${route.name}${focused ? '' : '_grayscale'}`;
          const Svg = getSvg(name);

          return (
            <Svg width={TAB_BAR_ICON_SIZE} height={TAB_BAR_ICON_SIZE} />
          );
        },
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <View style={styles.wall(theme)} />
            <TabVSvg width={41} height={57} fill={theme.colors.background} />
            <View style={styles.wall(theme)} />
          </View>
        )
      })}
    >
      <Tab.Screen
        name={appRoutes.employeeList.path}
        component={EmployeeListScene}
        options={{ title: appRoutes.employeeList.name }}
      />
      <Tab.Screen
        name={appRoutes.upsertEmployee.path}
        component={UpsertEmployeeScene}
        options={{
          title: appRoutes.upsertEmployee.name,
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name={appRoutes.department.path}
        component={DepartmentNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={appRoutes.jobTitleList.path}
        component={JobTitleList}
        options={{ title: appRoutes.jobTitleList.name }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create<any>({
  tabBar: {
    paddingBottom: 8,
    height: 46,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    ...shadowElevations[0]
  },
  tabBarBackground: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 56,
    backgroundColor: 'transparent',
    ...shadowElevations[0]
  },
  wall: ({ colors }: PaperTheme) => ({
    width: '100%',
    height: 56,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)'
  })
});

// TEMPO
const JobTitleList: FC = () => null;
