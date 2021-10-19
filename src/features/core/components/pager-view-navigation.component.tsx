import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';

import { PaperTheme } from 'models';

type Props = {
  currentPage: number;
  pageCount: number;
  style?: ViewStyle;
}

export const PagerViewNavigation: FC<Props> = ({ style, currentPage, pageCount }) => {
  const theme = useTheme();

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.indicatorWrapper(pageCount)}>
        <Divider style={styles.line(theme)} />
        {
          [...Array(pageCount)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator(theme),
                (currentPage === index) && styles.active(theme)
              ]}
            />
          ))
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: {
    paddingVertical: 16
  },
  indicatorWrapper: (pageCount: number) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 28 * pageCount
  }),
  indicator: ({ colors }: PaperTheme) => ({
    width: 14,
    height: 14,
    backgroundColor: colors.background,
    borderColor: colors.accent,
    borderWidth: 2,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }]
  }),
  active: ({ colors }: PaperTheme) => ({
    backgroundColor: colors.accent
  }),
  line: ({ colors }: PaperTheme) => ({
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: colors.accent
  })
});
