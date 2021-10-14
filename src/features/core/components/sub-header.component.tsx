import React, { FC, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { fontSizes, HEADER_HEIGHT, SUB_HEADER_HEIGHT } from 'config/core';
import { PaperTheme } from 'models';
import { HeaderContext } from '../context';
import { Text } from './text.component';

type Props = {
  options?: any;
}

export const SubHeader: FC<Props> = ({ options }) => {
  const { title } = options;
  const theme = useTheme();
  const { headerY } = useContext(HeaderContext);

  const wrapperAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: HEADER_HEIGHT - headerY.value }]
  }));

  return (
    <Animated.View style={[styles.wrapper(theme), wrapperAnimatedStyle]}>
      <Text style={styles.title}>
        {title}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: ({ colors }: PaperTheme) => ({
    paddingTop: 4,
    paddingHorizontal: 16,
    width: '100%',
    height: SUB_HEADER_HEIGHT,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  }),
  title: {
    fontSize: fontSizes.sceneTitle,
    textTransform: 'uppercase',
    letterSpacing: -1
  }
});
