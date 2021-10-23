import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions, useNavigation } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import { appRoutes, darkColors } from 'config/core';
import { Gender } from 'models';
import { selectDarkMode, toggleDarkMode } from 'store/core';
import { selectCurrentEmployee } from 'store/auth';
import { GithubButton } from 'features/home/components';
import { MenuButton, StageView } from '../components';

import HouseSvg from 'assets/svgs/house.svg';
import EmployeesSvg from 'assets/svgs/employees.svg';
import OfficeLadySvg from 'assets/svgs/office-lady.svg';
import OfficeGuySvg from 'assets/svgs/office-guy.svg';
import GhostSvg from 'assets/svgs/ghost.svg';

const ICON_SIZE = 70;

export const MainMenuScene: FC<StackScreenProps<any>> = () => {
  const { dispatch: navigationDispatch, navigate, getParent } = useNavigation();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const currentEmployee = useSelector(selectCurrentEmployee);

  const isFemale = useMemo(() => (
    currentEmployee?.personalInfo.gender.toLowerCase() === Gender.FEMALE
  ), [currentEmployee]);

  const smartNavigate = useCallback((routeName: string) => {
    const routes = getParent()?.getState().routes;
    const prevRoute = routes && routes[routes.length - 2];

    if (prevRoute && (routeName === prevRoute.name)) {
      navigate(routeName as any);
    } else {
      navigationDispatch(StackActions.replace(routeName));
    }
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StageView curtainAnimatedDisabled>
      <View style={styles.wrapper}>
        <View style={styles.buttonsWrapper}>
          <MenuButton
            containerStyle={styles.homeButton}
            label='Home'
            icon={() => (
              <View style={styles.icon}>
                <HouseSvg width={ICON_SIZE} height={ICON_SIZE} />
              </View>
            )}
            onPress={() => smartNavigate(appRoutes.home.path)}
          />
          <MenuButton
            containerStyle={styles.employeesButton}
            label='Employees'
            icon={() => (
              <View style={styles.icon}>
                <EmployeesSvg width={ICON_SIZE} height={ICON_SIZE} />
              </View>
            )}
            onPress={() => smartNavigate(appRoutes.employee.path)}
          />
          <MenuButton
            containerStyle={styles.accountButton}
            label='Account'
            icon={() => (
              <View style={styles.icon}>
                {
                  isFemale
                    ? <OfficeLadySvg width={ICON_SIZE} height={ICON_SIZE} />
                    : <OfficeGuySvg width={ICON_SIZE} height={ICON_SIZE} />
                }
              </View>
            )}
            onPress={() => smartNavigate(appRoutes.userAccount.path)}
          />
          <MenuButton
            containerStyle={[styles.darkButton, darkMode && styles.active]}
            label='Dark'
            icon={() => (
              <View style={styles.icon}>
                <GhostSvg width={ICON_SIZE} height={ICON_SIZE} />
              </View>
            )}
            onPress={() => dispatch(toggleDarkMode())}
          />
        </View>
        <GithubButton style={styles.github} />
      </View>
    </StageView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 24
  },
  buttonsWrapper: {
    flexDirection:'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18
  },
  icon: {
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70
  },
  homeButton: {
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 18
  },
  employeesButton: {
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopRightRadius: 18
  },
  accountButton: {
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomLeftRadius: 18
  },
  darkButton: {
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomRightRadius: 18
  },
  github: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30
  },
  active: {
    backgroundColor: darkColors.accent,
    borderColor: 'rgba(0,0,0,0.5)'
  }
});
