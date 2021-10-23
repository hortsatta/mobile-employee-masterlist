import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';

import { appRoutes, darkColors, fontSizes } from 'config/core';
import { AuthCredential, PaperTheme } from 'models';
import { selectAuthLoading, selectIsUserSignedIn, signInStart } from 'store/auth';
import { StageView, Text } from 'features/core/components';
import { SignInForm } from '../components';

import VSvg from 'assets/svgs/v.svg';

export const AuthScene: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const authLoading = useSelector(selectAuthLoading);
  const isUserSignedIn = useSelector(selectIsUserSignedIn);

  useEffect(() => {
    if (!isUserSignedIn || authLoading) { return; }
    navigation.navigate(appRoutes.home.path);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserSignedIn, authLoading]);

  const handleSubmit = (credential: AuthCredential) => {
    dispatch(signInStart(credential));
  };

  return (
    <StageView style={styles.screen} curtainAnimatedDisabled>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Hello, Stranger</Text>
        <View style={styles.signInWrapper(theme)}>
          <VSvg width={47} height={18} fill={theme.colors.background} />
          <KeyboardAwareScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContentWrapper(height)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            overScrollMode='never'
          >
            <Text style={styles.signInText}>
              You are not signed in.{'\n'}Sign in to gain full access.
            </Text>
            <SignInForm loading={authLoading} onSubmit={handleSubmit} />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </StageView>
  );
};

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
  signInWrapper: ({ colors }: PaperTheme) => ({
    flex: 1,
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: colors.secondary
  }),
  scrollView: {
    width: '100%'
  },
  scrollViewContentWrapper: (height: number) => ({
    alignSelf: 'center',
    paddingTop: height * 0.08,
    width: 270
  }),
  signInText: {
    marginBottom: 28,
    color: darkColors.text,
    fontSize: fontSizes.text
  }
});
