import React, { FC } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';

import { PaperTheme } from 'models';
import { useAnimatedScale } from '../hooks';
import { Icon, IconName } from './icon.component';
import { Text } from './text.component';

type Props = {
  icon?: any;
  iconName?: IconName | string;
  containerStyle?: ViewStyle;
  label?: string;
  onPress?: () => void;
}

export const MenuButton: FC<Props> = ({ containerStyle, icon, iconName, label, onPress }) => {
  const theme = useTheme();
  const { scaleAnimatedStyle, animateScale } = useAnimatedScale();

  const handlePress = () => {
    animateScale();
    onPress && onPress();
  };

  return (
    <Animated.View style={[styles.wrapper(theme), containerStyle, scaleAnimatedStyle]}>
      <Pressable style={styles.pressable} onPress={handlePress}>
        {
          icon
            ? icon()
            : (
              <Icon
                style={styles.icon}
                name={iconName || ''}
                size={70}
                color={theme.colors.primary}
              />
            )
        }
        <Text style={styles.label(theme)}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: ({ colors }: PaperTheme) => ({
    width: '50%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  }),
  pressable: {
    paddingVertical: 24,
    alignItems: 'center'
  },
  icon: {
    marginBottom: 12
  },
  label: ({ colors, fontSizes }: PaperTheme) => ({
    color: colors.text,
    fontSize: fontSizes.label,
    letterSpacing: -0.5
  })
});
