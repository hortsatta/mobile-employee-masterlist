import { ComponentProps, FC } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import { shadowElevations } from 'config/core';
import { PaperTheme } from 'models';
import { useAnimatedScale } from '../hooks';
import { Icon, IconName } from './icon.component';

type Props = ComponentProps<typeof Pressable> & {
  iconName: IconName | string;
  loading?: boolean;
}

export const FabButton: FC<Props> = ({ style, iconName, disabled, loading, onPress, ...moreProps }) => {
  const theme = useTheme();
  const { scaleAnimatedStyle, animateScale } = useAnimatedScale({ startScale: 0.85 });

  const handlePress = (event: GestureResponderEvent) => {
    animateScale();
    !loading && (onPress && onPress(event));
  };

  return (
    <Pressable
      style={[styles.pressable, style]}
      disabled={disabled}
      onPress={event => handlePress(event)}
      {...moreProps}
    >
      <Animated.View style={[styles.wrapper, scaleAnimatedStyle]}>
        <View style={styles.backdrop(theme, disabled)} />
        {
          loading
            ? <ActivityIndicator style={styles.elevation} color='#fff' />
            : <Icon style={styles.elevation} name={iconName} color='#fff' size={28} />
        }
      </Animated.View>
      <View style={styles.bandage(theme)} />
    </Pressable>
  );
};

const styles = StyleSheet.create<any>({
  pressable: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: 60,
    height: 60
  },
  wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  backdrop: ({ colors }: PaperTheme, disabled: boolean) => ({
    position: 'absolute',
    width: 46,
    height: 45,
    backgroundColor: disabled ? colors.disabled : colors.primary,
    borderRadius: 6,
    transform: [{ rotate: '45deg' }],
    ...shadowElevations[1]
  }),
  bandage: ({ colors }: PaperTheme) => ({
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    height: 8,
    width: 41,
    backgroundColor: colors.background
  }),
  elevation: {
    elevation: 1
  }
});
