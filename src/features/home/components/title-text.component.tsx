import { FC, useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { Text } from 'features/core/components';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';

type Props = {
  delay?: number;
}

export const TitleText: FC<Props> = ({ delay }) => {
  const { height } = useWindowDimensions();
  const opacity = useSharedValue(0);
  const transformY = useSharedValue(0);
  const startingTransformY = (height * 0.4) - 106; // 106 is header height

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{
      translateY: interpolate(
        transformY.value,
        [0, 1],
        [startingTransformY, 0]
      )
    }]
  }));

  useEffect(() => {
    opacity.value = withDelay(delay || 0, withTiming(1, { duration: 800 }, () => {
      transformY.value = withSpring(1, { mass: 1.2 });
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Text style={[styles.text, styles.employeeText]}>Employee</Text>
      <Text style={[styles.text, styles.masterlistText]}>Masterlist</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    alignItems: 'center'
  },
  text: {
    fontSize: 36
  },
  employeeText: {
    letterSpacing: -2,
    lineHeight: 41
  },
  masterlistText: {
    letterSpacing: -1.2,
    lineHeight: 41
  }
});
