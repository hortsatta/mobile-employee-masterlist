import { ComponentProps, FC } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FilledTextField } from 'rn-material-ui-textfield';

import { PaperTheme } from 'models';
import { selectDarkMode } from 'store/core';

type Props = ComponentProps<typeof FilledTextField> & {
  errorColorOnly?: boolean;
}

export const TextInput: FC<Props> = ({
  style,
  containerStyle,
  labelTextStyle,
  inputContainerStyle,
  errorColorOnly,
  ...moreProps
}) => {

  const theme = useTheme();
  const darkMode = useSelector(selectDarkMode);

  return (
    <FilledTextField
      style={[styles.input(theme), style]}
      containerStyle={[errorColorOnly && styles.errorTextHidden, containerStyle]}
      inputContainerStyle={[styles.inputContainer(darkMode, theme), inputContainerStyle]}
      labelTextStyle={[styles.label, labelTextStyle]}
      baseColor={darkMode ? 'rgba(255,255,255,0.3)' : theme.colors.placeholder}
      textColor={theme.colors.text}
      tintColor={theme.colors.primary}
      lineWidth={1}
      {...moreProps}
    />
  );

};

const styles = StyleSheet.create<any>({
  inputContainer: (isDark: boolean, { colors }: PaperTheme) => ({
    paddingBottom: 4,
    height: 50,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'
  }),
  errorTextHidden: {
    width: '100%',
    height: 50,
    overflow: 'hidden'
  },
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
