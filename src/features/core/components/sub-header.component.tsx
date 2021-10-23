import React, { FC, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import { fontSizes, HEADER_HEIGHT, SUB_HEADER_HEIGHT } from 'config/core';
import { PaperTheme } from 'models';
import { selectDarkMode } from 'store/core';
import { HeaderContext } from '../context';
import { Text } from './text.component';

type Props = {
  options?: any;
}

export const SubHeader: FC<Props> = ({ options }) => {
  const theme = useTheme();
  const { headerY } = useContext(HeaderContext);
  const darkMode = useSelector(selectDarkMode);
  const { title, headerRight } = options;

  const wrapperAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: HEADER_HEIGHT - headerY.value
  }));

  return (
    <Animated.View style={[styles.wrapper(darkMode, theme), wrapperAnimatedStyle]}>
      <Text style={styles.title}>{title}</Text>
      {headerRight && <View style={styles.right}>{headerRight()}</View>}
    </Animated.View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: (isDark: boolean, { colors }: PaperTheme) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingHorizontal: 16,
    width: '100%',
    height: SUB_HEADER_HEIGHT,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)'
  }),
  title: {
    fontSize: fontSizes.sceneTitle,
    textTransform: 'uppercase',
    letterSpacing: -1
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
