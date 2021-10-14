import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/core';

import { selectAuthLoading, selectIsUserSignedIn, signOutStart } from 'store/auth';
import { Button, StageView, Text, withHeaderResetter } from 'features/core/components';
import { appRoutes } from 'config/core';

export const UserAccountSceneComponent: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isUserSignedIn = useSelector(selectIsUserSignedIn);
  const loading = useSelector(selectAuthLoading);

  const clearRoutes = useCallback(() => {
    navigation.dispatch(() => (
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

  const handleSignOut = () => {
    dispatch(signOutStart());
  };

  return (
    <StageView>
      <Button onPress={handleSignOut} loading={loading}>
        <Text>Sign Out</Text>
      </Button>
    </StageView>
  );
};

export const UserAccountScene = withHeaderResetter(UserAccountSceneComponent);
