import { ComponentProps, FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Button as ButtonPaper } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import { useAnimatedScale } from '../hooks';
import { Icon } from './icon.component';

type Props = ComponentProps<typeof ButtonPaper> & {
  iconSize?: number;
};

export const Button: FC<Props> = ({
  labelStyle,
  icon,
  iconSize,
  loading,
  disabled,
  onPress,
  children,
  ...moreProps
}) => {

  const { scaleAnimatedStyle, animateScale } = useAnimatedScale();

  const ButtonIcon = useCallback((props: any) => (
    <Icon {...props} name={icon} size={iconSize} />
  ), [icon, iconSize]);

  const handlePress = () => {
    animateScale();
    onPress && onPress();
  };

  return (
    <Animated.View style={[styles.wrapper, scaleAnimatedStyle]}>
      <ButtonPaper
        labelStyle={[styles.label, labelStyle]}
        icon={(typeof icon === 'string') ? ButtonIcon : icon}
        disabled={disabled || loading}
        onPress={handlePress}
        {...moreProps}
      >
        {children}
      </ButtonPaper>
    </Animated.View>
  );

};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center'
  },
  label: {
    textTransform: 'none',
    letterSpacing: 0
  }
});
