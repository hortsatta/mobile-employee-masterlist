import React, { ComponentProps, FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { HEADER_HEIGHT, SUB_HEADER_HEIGHT } from 'config/core';

type Props = ComponentProps<typeof View> & {
  withSubHeader?: boolean
}

export const StageView: FC<Props> = ({ style, withSubHeader, children, ...moreProps }) => (
  <View style={[styles.wrapper(withSubHeader), style]} {...moreProps}>
    {children}
  </View>
);

const styles = StyleSheet.create<any>({
  wrapper: (withSubHeader: boolean) => ({
    flex: 1,
    paddingTop: withSubHeader ? HEADER_HEIGHT + SUB_HEADER_HEIGHT : HEADER_HEIGHT,
    paddingHorizontal: 16
  })
});
