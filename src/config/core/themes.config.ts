import { configureFonts, DefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavDefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

import { PaperTheme } from 'models';
import { darkColors, lightColors } from './colors.config';
import { fontConfig, fontSizes } from './fonts.config';

const HEADER_HEIGHT = 96;
const SUB_HEADER_HEIGHT = 42;

const getPaperTheme = (dark = false): PaperTheme => ({
  ...DefaultTheme,
  dark,
  colors: {
    ...DefaultTheme.colors,
    ...dark ? darkColors : lightColors
  },
  fonts: configureFonts(fontConfig),
  fontSizes
});

const getNavTheme = (dark = false): Theme => ({
  ...dark ? DarkTheme : NavDefaultTheme,
  colors: {
    ...dark ? DarkTheme.colors : NavDefaultTheme.colors,
    primary: dark ? darkColors.primary : lightColors.primary,
    background: dark ? darkColors.background : lightColors.background,
    card: dark ? darkColors.background : lightColors.background,
    text: dark ? darkColors.text : lightColors.text
  }
});

const shadowElevations = [
  {
    shadowOpacity: 0,
    elevation: 0
  }, {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1
  }, {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  }, {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }, {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  }, {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
];

export {
  HEADER_HEIGHT,
  SUB_HEADER_HEIGHT,
  getPaperTheme,
  getNavTheme,
  shadowElevations
};
