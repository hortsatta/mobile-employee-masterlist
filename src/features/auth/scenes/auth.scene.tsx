import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider, Modal, Surface, useTheme } from 'react-native-paper';

import { appRoutes, darkColors, fonts, fontSizes } from 'config/core';
import { AuthCredential, PaperTheme } from 'models';
import { selectAuthLoading, selectIsUserSignedIn, signInStart } from 'store/auth';
import { Button, StageView, Text } from 'features/core/components';
import { SignInForm } from '../components';

import VSvg from 'assets/svgs/v.svg';

export const AuthScene: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const authLoading = useSelector(selectAuthLoading);
  const isUserSignedIn = useSelector(selectIsUserSignedIn);
  const [showHelp, setShowHelp] = useState(false);

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
            <Button
              style={styles.helpButton}
              contentStyle={styles.helpButtonContent}
              labelStyle={styles.helpButtonLabel}
              onPress={() => setShowHelp(true)}
            >
              <Text style={styles.helpText}>Use the following credentials.</Text>
            </Button>
            <SignInForm loading={authLoading} onSubmit={handleSubmit} />
          </KeyboardAwareScrollView>
        </View>
      </View>
      <Modal
        style={styles.helpModal(theme)}
        visible={showHelp}
        onDismiss={() => setShowHelp(false)}
      >
        <Surface style={styles.help}>
          <Text style={styles.helpTitle}>Sign in using the following credentials.</Text>
          <Text style={styles.helpCredentialsText1}>
            un—<Text style={styles.helpCredentialsText2}>admin@gmail.com</Text>{'\n'}
            pw—<Text style={styles.helpCredentialsText2}>adminqweasdzxc</Text>
          </Text>
          <Divider style={styles.helpDivider} />
          <Text style={styles.helpCredentialsText1}>
            un—<Text style={styles.helpCredentialsText2}>user1@gmail.com</Text>{'\n'}
            pw—<Text style={styles.helpCredentialsText2}>user1qweasdzxc</Text>
          </Text>
          <Text style={styles.helpCredentialsText1}>
            un—<Text style={styles.helpCredentialsText2}>user2@gmail.com</Text>{'\n'}
            pw—<Text style={styles.helpCredentialsText2}>user2qweasdzxc</Text>
          </Text>
        </Surface>
      </Modal>
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
    paddingTop: height * 0.06,
    width: 270
  }),
  signInText: {
    color: darkColors.text,
    fontSize: fontSizes.text
  },
  helpButton: {
    marginBottom: 20
  },
  helpButtonContent: {
    justifyContent: 'flex-start'
  },
  helpButtonLabel: {
    marginLeft: 0
  },
  helpText: {
    color: darkColors.text,
    fontSize: fontSizes.text,
    textDecorationLine: 'underline'
  },
  helpModal: ({ colors }: PaperTheme) => ({
    backgroundColor: colors.background
  }),
  help: {
    alignSelf: 'center',
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
    width: 300,
    borderRadius: 16
  },
  helpTitle: {
    marginBottom:8,
    fontSize: fontSizes.text
  },
  helpCredentialsText1: {
    marginVertical: 8,
    fontSize: fontSizes.text
  },
  helpCredentialsText2: {
    fontFamily: fonts.medium.fontFamily,
    fontSize: fontSizes.text
  },
  helpDivider: {
    marginVertical: 8
  }
});
