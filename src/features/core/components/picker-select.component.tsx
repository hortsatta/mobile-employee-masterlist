import React, { ComponentProps, FC } from 'react';
import { useSelector } from 'react-redux';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import { PaperTheme } from 'models';
import { selectDarkMode } from 'store/core';
import { IconName } from './icon.component';

type Props = ComponentProps<typeof RNPickerSelect> & {
  containerStyle?: StyleProp<ViewStyle>;
  error?: any;
}

export const PickerSelect: FC<Props> = ({ style, containerStyle, error, ...moreProps }) => {
  const theme = useTheme();
  const darkMode = useSelector(selectDarkMode);

  return (
    <View style={[styles.wrapper(darkMode, theme), containerStyle, error && styles.error(theme)]}>
      <RNPickerSelect
        Icon={(props: any) => (
          <IconButton {...props} style={styles.icon} icon={IconName.CARET_DOWN} />
        )}
        style={{
          viewContainer: styles.viewWrapper,
          placeholder: styles.placeholder(error, theme),
          inputIOS: styles.input(theme),
          inputAndroid: styles.input(theme),
          ...style
        }}
        {...moreProps}
      />
    </View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: (isDark: boolean, { colors }: PaperTheme) => ({
    backgroundColor: colors.surface,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255,255,255,0.33)' : 'rgba(0,0,0,0.2)'
  }),
  viewWrapper: {
    paddingVertical: 12,
    paddingLeft: 4,
    height: 50
  },
  placeholder: (error: boolean, { colors }: PaperTheme) => ({
    color: error ? colors.error : colors.placeholder
  }),
  input: ({ colors }: PaperTheme) =>  ({
    color: colors.text
  }),
  error: ({ colors }: PaperTheme) =>  ({
    borderBottomWidth: 2,
    borderBottomColor: colors.error
  }),
  icon: {
    opacity: 0.7
  }
});
