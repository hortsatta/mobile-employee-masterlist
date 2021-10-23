import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring
} from 'react-native-reanimated';

type Curtain = {
  curtainAnimatedStyle: any;
  opacity: any;
}

export const useCurtain = (): Curtain => {
  const opacity = useSharedValue(0);

  const curtainAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      opacity.value = withDelay(150, withSpring(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return { curtainAnimatedStyle, opacity };
};
