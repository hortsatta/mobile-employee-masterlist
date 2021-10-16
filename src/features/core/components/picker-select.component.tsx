import React, { ComponentProps, FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import { PaperTheme } from 'models';

type Props = ComponentProps<typeof RNPickerSelect> & {
  containerStyle?: ViewStyle;
}

export const PickerSelect: FC<Props> = ({ style, containerStyle, ...moreProps }) => {
  const theme = useTheme();

  return (
    <View style={[styles.wrapper(theme), containerStyle]}>
      <RNPickerSelect
        style={{
          viewContainer: styles.viewWrapper,
          placeholder: styles.placeholder(theme),
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
  wrapper: ({ colors }: PaperTheme) => ({
    backgroundColor: colors.surface,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  }),
  viewWrapper: {
    paddingVertical: 12,
    paddingLeft: 4,
    height: 50
  },
  placeholder: ({ colors }: PaperTheme) => ({
    color: colors.placeholder
  }),
  input: ({ colors }: PaperTheme) =>  ({
    color: colors.text
  })
});
