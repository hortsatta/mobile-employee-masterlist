import React, { FC, useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated,{
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { lightColors } from 'config/core';
import { useAnimatedScale } from 'features/core/hooks';
import { Icon, IconName } from 'features/core/components';

type Props = {
  isBatchMode: boolean;
  onPress?: () => void;
  onLongPress?: (isSelected: boolean) => void;
}

export const EmployeeListItem: FC<Props> = ({ isBatchMode, onPress, onLongPress, children }) => {
  const { scaleAnimatedStyle, animateScale } = useAnimatedScale();
  const marginLeft = useSharedValue(-36);
  const [isSelected, setIsSelected] = useState(false);

  const selectedAnimatedStyle = useAnimatedStyle(() => ({
    marginLeft: marginLeft.value
  }));

  useEffect(() => {
    'worklet';
    marginLeft.value = isSelected
      ? withTiming(0, { duration: 100 })
      : withTiming(-36, { duration: 150 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  useEffect(() => {
    !isBatchMode && setIsSelected(false);
  }, [isBatchMode]);

  const handlePress = () => {
    if (isBatchMode) {
      setIsSelected(!isSelected);
      onLongPress && onLongPress(!isSelected);
    } else {
      if (!onPress) { return; }
      animateScale();
      onPress();
    }
  };

  const handleLongPress = () => {
    setIsSelected(!isSelected);
    onLongPress && onLongPress(!isSelected);
  };

  return (
    <Pressable onPress={handlePress} onLongPress={handleLongPress}>
      <Animated.View style={[styles.wrapper, scaleAnimatedStyle]}>
        <Animated.View style={[styles.check, selectedAnimatedStyle]}>
          <Icon name={IconName.SQUARE_CHECK} color='#fff' size={21} />
        </Animated.View>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  check: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    backgroundColor: lightColors.primary,
    borderColor: '#e5e5e5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    overflow: 'hidden'
  }
});
