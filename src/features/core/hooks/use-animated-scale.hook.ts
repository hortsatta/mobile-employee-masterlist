import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';

type Config = {
  initialScale?: number;
  startScale?: number;
  endScale?: number;
  startDuration?: number;
  endDuration?: number;
}

const defaultConfig = {
  initialScale: 1,
  startScale: 0.9,
  endScale: 1,
  startDuration: 150,
  endDuration: 100
};

export const useAnimatedScale = (config?: Config): {
  scaleAnimatedStyle: any;
  animateScale: () => void;
} => {

  const {
    initialScale,
    startScale,
    endScale,
    startDuration,
    endDuration
  } = {...defaultConfig, ...config};

  const scale = useSharedValue(initialScale);

  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const animateScale = () => {
    scale.value = withSequence(
      withTiming(startScale, { duration: startDuration }),
      withTiming(endScale, { duration: endDuration })
    );
  };

  return { scaleAnimatedStyle, animateScale };

};
