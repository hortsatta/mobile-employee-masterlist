import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring
} from 'react-native-reanimated';

import { selectDarkMode } from 'store/core';
import { Icon, IconName } from 'features/core/components';

type Props = {
  delay?: number;
}

export const Xmark: FC<Props> = ({ delay }) => {
  const darkMode = useSelector(selectDarkMode);
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  useEffect(() => {
    scale.value = withDelay(delay || 0, withSpring(1));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Icon name={IconName.XMARK} size={50} color={darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)'} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 8
  }
});
