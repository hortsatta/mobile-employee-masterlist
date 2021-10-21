import React, { ComponentProps, FC, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Animated as RNAnimated, StyleSheet, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { appRoutes, HEADER_HEIGHT } from 'config/core';
import { PaperTheme } from 'models';
import { selectIsUserSignedIn } from 'store/auth';
import { HeaderContext } from '../context';
import { Icon } from './icon.component';
import { AvatarButton } from './avatar-button.component';
import { HeaderUserInfo } from './header-user-info.component';

type IconButtonProps =  Omit<ComponentProps<typeof IconButton>, 'icon'> & {
  icon?: any;
}

type Props = {
  route: any;
  navigation: any;
  progress?: any;
  options?: any;
  leftIcon?: any;
  rightIcon?: any;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const ICON_SIZE = 34;
const ICON_BUTTON_SIZE = 32;

const LeftButton: FC<IconButtonProps> = ({ icon, onPress }) => (
  <IconButton
    icon={props => <Icon {...props} name={icon} size={ICON_SIZE} />}
    size={ICON_BUTTON_SIZE}
    onPress={onPress}
  />
);

const RightButton: FC<IconButtonProps> = ({ icon, onPress }) => (
  <IconButton
    icon={props => <Icon {...props} name={icon} size={ICON_SIZE} />}
    size={ICON_BUTTON_SIZE}
    onPress={onPress}
  />
);

export const Header: FC<Props> = ({
  route,
  navigation,
  progress,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress
}) => {

  const { name: routeName } = route;
  const { top: insetTop } = useSafeAreaInsets();
  const theme = useTheme();
  const { headerY } = useContext(HeaderContext);
  const isUserSignedIn = useSelector(selectIsUserSignedIn);
  const showUserInfo = useMemo(() => (
    (routeName === appRoutes.menuNavigator.path)
    || (routeName === appRoutes.userAccount.path)
  ), [routeName]);

  const userInfoAnimatedStyle = {
    opacity: RNAnimated
      .add(progress.current, progress.next || 0)
      .interpolate({ inputRange: [0, 1, 2], outputRange: [0, 1, 0] })
  };

  const wrapperAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -headerY.value }]
  }));

  const toggleMainMenu = () => {
    const { canGoBack, navigate, pop } = navigation;
    const menuPath = appRoutes.menuNavigator.path;

    (route.name === menuPath)
      ? canGoBack() && pop()
      : navigate(menuPath, {
        screen: isUserSignedIn
          ? appRoutes.menu.path
          : appRoutes.signIn.path
      });
  };

  return (
    <Animated.View style={[styles.header(theme, insetTop), wrapperAnimatedStyle]}>
      {
        leftIcon
          ? <LeftButton icon={leftIcon} onPress={onLeftPress} />
          : (
            <View style={styles.avatarWrapper}>
              <AvatarButton onPress={onLeftPress || toggleMainMenu} />
              <HeaderUserInfo style={[styles.userInfo, showUserInfo ? userInfoAnimatedStyle : styles.hidden]} />
            </View>
          )
      }
      {rightIcon && <RightButton icon={rightIcon} onPress={onRightPress} />}
    </Animated.View>
  );

};

const styles = StyleSheet.create<any>({
  header: ({ colors }: PaperTheme, top: number) => ({
    paddingTop: top,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: HEADER_HEIGHT,
    backgroundColor: colors.background
  }),
  avatarWrapper: {
    flexDirection: 'row'
  },
  userInfo: {
    paddingTop: 18
  },
  hidden: {
    opacity: 0
  }
});
