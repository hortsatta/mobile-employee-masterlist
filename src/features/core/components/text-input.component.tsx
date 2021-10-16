import React, { ComponentProps, FC } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FilledTextField } from 'rn-material-ui-textfield';

import { PaperTheme } from 'models';

export const TextInput: FC<ComponentProps<typeof FilledTextField>> = ({ style, labelTextStyle, inputContainerStyle, ...moreProps }) => {
  const theme = useTheme();

  return (
    <FilledTextField
      style={[styles.input(theme), style]}
      inputContainerStyle={[styles.inputContainer(theme), inputContainerStyle]}
      labelTextStyle={[styles.label, labelTextStyle]}
      tintColor={theme.colors.primary}
      baseColor={theme.colors.placeholder}
      lineWidth={1}
      {...moreProps}
    />
  );
};

const styles = StyleSheet.create<any>({
  inputContainer: ({ colors }: PaperTheme) => ({
    paddingBottom: 4,
    height: 50,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  }),
  input: ({ fonts, fontSizes }: PaperTheme) => ({
    fontFamily: fonts.regular.fontFamily,
    fontSize: fontSizes.text,
    letterSpacing: 0
  }),
  label: ({ colors, fonts }: PaperTheme) => ({
    color: colors.placeholder,
    fontFamily: fonts.regular.fontFamily,
    letterSpacing: 0
  })
});
