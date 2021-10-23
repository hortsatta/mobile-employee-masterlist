import React, { ComponentProps, FC, ReactNode, useContext, useMemo } from 'react';
import { SectionList as RNSectionList, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';

import { HEADER_HEIGHT, SUB_HEADER_HEIGHT } from 'config/core';
import { PaperTheme } from 'models';
import { HeaderContext } from '../context';
import { useCurtain } from '../hooks';

type Props = Omit<
  ComponentProps<typeof KeyboardAwareSectionList>,
  'renderItem' | 'sections'
> & {
  sections: any;
  renderItem?: any;
  floatingChildren?: ReactNode;
  keyboardAware?: boolean;
  withSubHeader?: boolean;
  curtainAnimatedDisabled?: boolean;
}

const AnimatedKeyboardAwareSectionList = Animated.createAnimatedComponent(KeyboardAwareSectionList);
const AnimatedSectionList = Animated.createAnimatedComponent(RNSectionList);

export const StageSectionList: FC<Props> = ({
  contentContainerStyle,
  floatingChildren,
  keyboardAware,
  withSubHeader,
  curtainAnimatedDisabled,
  children,
  ...moreProps
}) => {

  const theme = useTheme();
  const { onScroll } = useContext(HeaderContext);
  const { curtainAnimatedStyle } = useCurtain();

  const topOffset = useMemo(
    () => withSubHeader ? HEADER_HEIGHT + SUB_HEADER_HEIGHT : HEADER_HEIGHT,
    [withSubHeader]
  );

  const SectionList = useMemo(
    () => keyboardAware ? AnimatedKeyboardAwareSectionList : AnimatedSectionList,
    [keyboardAware]
  );

  return (
    <Animated.View style={[
      styles.wrapper(theme),
      !curtainAnimatedDisabled && curtainAnimatedStyle
    ]}>
      <SectionList
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
      </SectionList>
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
