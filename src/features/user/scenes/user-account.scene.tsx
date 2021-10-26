import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { appRoutes, fontSizes } from 'config/core';
import { Gender, PaperTheme } from 'models';
import {
  selectAuthLoading,
  selectCurrentEmployee,
  selectCurrentUserRole,
  selectIsUserSignedIn,
  signOutStart
} from 'store/auth';
import { selectAdminUserRole } from 'store/user';
import { setSelectedEmployee } from 'store/employee';
import { StageView, Text, withHeaderResetter } from 'features/core/components';
import { UserAccount } from '../components';

import VSvg from 'assets/svgs/v.svg';

export const UserAccountSceneComponent: FC = () => {
  const theme = useTheme();
  const { dispatch: navigationDispatch, navigate } = useNavigation() as any;
  const dispatch = useDispatch();
  const isUserSignedIn = useSelector(selectIsUserSignedIn);
  const adminUserRole = useSelector(selectAdminUserRole);
  const currentUserRole = useSelector(selectCurrentUserRole);
  const currentEmployee = useSelector(selectCurrentEmployee);
  const loading = useSelector(selectAuthLoading);

  const titleText = useMemo(() => {
    const isAdmin = currentUserRole?.value === adminUserRole?.value;
    const isFemale = currentEmployee?.personalInfo
      .gender.toLowerCase() === Gender.FEMALE;

    const title = isAdmin
      ? (isFemale ? 'Milady' : 'Milord')
      : (isFemale ? 'Plain Jane' : 'Average Joe');

    return `Aloha, ${title}!`;
  }, [adminUserRole, currentUserRole, currentEmployee]);

  const clearRoutes = useCallback(() => {
    navigationDispatch(() => (
      CommonActions.reset({
        index: 0,
        routes: [{ name: appRoutes.home.path }]
      })
    ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isUserSignedIn || loading) { return; }
    clearRoutes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isUserSignedIn]);

  const navigateEmployeeDetail = () => {
    if (!currentEmployee) { return;}

    dispatch(setSelectedEmployee(currentEmployee.id));
    navigate(appRoutes.employeeStack.path, {
      screen: appRoutes.employeeDetail.path,
      params: { id: currentEmployee.id }
    });
  };

  const handleSignOut = () => {
    dispatch(signOutStart());
  };

  return (
    <StageView style={styles.screen} curtainAnimatedDisabled>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{isUserSignedIn && titleText}</Text>
        <View style={styles.contentWrapper(theme)}>
          <VSvg width={47} height={18} fill={theme.colors.background} />
          {(currentUserRole && adminUserRole) && <UserAccount
            style={styles.userAccount}
            adminUserRole={adminUserRole}
            currentUserRole={currentUserRole}
            onEmployeeDetailPress={navigateEmployeeDetail}
            onSignOut={handleSignOut}
            loading={loading}
          />}
        </View>
      </View>
    </StageView>
  );
};

export const UserAccountScene = withHeaderResetter(UserAccountSceneComponent);

const styles = StyleSheet.create<any>({
  screen: {
    paddingHorizontal: 0
  },
  wrapper: {
    flex: 1
  },
  title: {
    marginTop: 4,
    paddingHorizontal: 16,
    fontSize: fontSizes.sceneTitle,
    letterSpacing: -1
  },
  contentWrapper: ({ colors }: PaperTheme) => ({
    flex: 1,
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: colors.secondary
  }),
  userAccount: {
    paddingTop: 36,
    paddingHorizontal: 24
  }
});
