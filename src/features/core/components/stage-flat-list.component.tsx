import { ComponentProps, FC, ReactNode, useContext, useMemo } from 'react';
import { FlatList as RNFlatList, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';

import { HEADER_HEIGHT, SUB_HEADER_HEIGHT } from 'config/core';
import { PaperTheme } from 'models';
import { HeaderContext } from '../context';
import { useCurtain } from '../hooks';

type Props = ComponentProps<typeof KeyboardAwareFlatList> & {
  floatingChildren?: ReactNode;
  keyboardAware?: boolean;
  withSubHeader?: boolean;
  curtainAnimatedDisabled?: boolean;
}

const AnimatedKeyboardAwareFlatList = Animated.createAnimatedComponent(KeyboardAwareFlatList);
const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList);

export const StageFlatList: FC<Props> = ({
  contentContainerStyle,
  floatingChildren,
  keyboardAware,
  withSubHeader,
  curtainAnimatedDisabled,
  ...moreProps
}) => {

  const theme = useTheme();
  const { onScroll } = useContext(HeaderContext);
  const { curtainAnimatedStyle } = useCurtain();

  const topOffset = useMemo(
    () => withSubHeader ? HEADER_HEIGHT + SUB_HEADER_HEIGHT : HEADER_HEIGHT,
    [withSubHeader]
  );

  const FlatList = useMemo(
    () => keyboardAware ? AnimatedKeyboardAwareFlatList : AnimatedFlatList,
    [keyboardAware]
  );

  return (
    <Animated.View style={[
      styles.wrapper(theme),
      !curtainAnimatedDisabled && curtainAnimatedStyle
    ]}>
      <FlatList
        contentContainerStyle={[
          styles.contentWrapper(topOffset),
          floatingChildren && styles.floating,
          contentContainerStyle
        ]}
        scrollEventThrottle={16}
        onScroll={onScroll}
        {...moreProps}
      />
      {floatingChildren}
    </Animated.View>
  );

};

const styles = StyleSheet.create<any>({
  wrapper: ({ colors }: PaperTheme) => ({
    flex: 1,
    backgroundColor: colors.background
  }),
  contentWrapper: (topOffset: number) => ({
    paddingTop: topOffset + 16,
    paddingBottom: 16,
    paddingHorizontal: 16
  }),
  floating: {
    paddingBottom: 75
  }
});
