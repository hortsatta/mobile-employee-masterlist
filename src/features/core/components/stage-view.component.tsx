import React, { ComponentProps, FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { HEADER_HEIGHT, SUB_HEADER_HEIGHT } from 'config/core';
import { useCurtain } from '../hooks';

type Props = ComponentProps<typeof View> & {
  withSubHeader?: boolean,
  curtainAnimatedDisabled?: boolean;
}

export const StageView: FC<Props> = ({ style, withSubHeader, curtainAnimatedDisabled, children, ...moreProps }) => {
  const { curtainAnimatedStyle } = useCurtain();

  return (
    <Animated.View
      style={[
        styles.wrapper(withSubHeader),
        style,
        !curtainAnimatedDisabled && curtainAnimatedStyle
      ]}
      {...moreProps}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: (withSubHeader: boolean) => ({
    flex: 1,
    paddingTop: withSubHeader ? HEADER_HEIGHT + SUB_HEADER_HEIGHT : HEADER_HEIGHT,
    paddingHorizontal: 16
  })
});
