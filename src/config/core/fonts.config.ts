import { Fonts } from 'react-native-paper/lib/typescript/types';
import {
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

const fontAssets = {
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
};

const fontConfig: { [platform: string]: Fonts } = {
  default: {
    thin: {
      fontFamily: 'Poppins_200ExtraLight',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'Poppins_300Light',
      fontWeight: 'normal'
    },
    regular: {
      fontFamily: 'Poppins_400Regular',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'Poppins_500Medium',
      fontWeight: 'normal'
    }
  }
};

const fontSizes = {
  sceneTitle: 20,
  text: 12,
  menuTitle: 13,
  label: 14,
  button: 15
};

export { fontAssets, fontConfig, fontSizes };
