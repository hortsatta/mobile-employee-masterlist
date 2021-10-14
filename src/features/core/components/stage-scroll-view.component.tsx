import React, { ComponentProps, FC, ReactNode, useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';

import { HEADER_HEIGHT, SUB_HEADER_HEIGHT } from 'config/core';
import { PaperTheme } from 'models';
import { HeaderContext } from '../context';

type Props = ComponentProps<typeof KeyboardAwareScrollView> & {
  floatingChildren?: ReactNode;
  keyboardAware?: boolean,
  withSubHeader?: boolean
}

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView);

export const StageScrollView: FC<Props> = ({
  contentContainerStyle,
  floatingChildren,
  keyboardAware,
  withSubHeader,
  children,
  ...moreProps
}) => {

  const theme = useTheme();
  const { onScroll } = useContext(HeaderContext);

  const topOffset = useMemo(
    () => withSubHeader ? HEADER_HEIGHT + SUB_HEADER_HEIGHT : HEADER_HEIGHT,
    [withSubHeader]
  );

  const ScrollView = useMemo(
    () => keyboardAware ? AnimatedKeyboardAwareScrollView : Animated.ScrollView,
    [keyboardAware]
  );

  return (
    <View style={styles.wrapper(theme)}>
      <ScrollView
        contentContainerStyle={[
          styles.contentWrapper(topOffset),
          floatingChildren && styles.floating,
          contentContainerStyle
        ]}
        scrollEventThrottle={16}
        onScroll={onScroll}
        {...moreProps}
      >
        {children}
      </ScrollView>
      {floatingChildren}
    </View>
  );

};

const styles = StyleSheet.create<any>({
  wrapper: ({ colors }: PaperTheme) => ({
    flex: 1,
    backgroundColor: colors.background
  }),
  contentWrapper: (topOffset: number) => ({
    paddingTop: topOffset,
    paddingBottom: 16,
    paddingHorizontal: 16
  }),
  floating: {
    paddingBottom: 75
  }
});
