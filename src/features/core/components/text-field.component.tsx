import { FC } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { Text } from './text.component';

type Props = {
  label?: string;
  uppercase?: boolean;
  style?: TextStyle;
  wrapperStyle?: TextStyle;
}

export const TextField: FC<Props> = ({ style, wrapperStyle, label, uppercase, children }) => (
  <View style={wrapperStyle}>
    <Text style={[styles.text, uppercase && styles.uppercase, style]}>
      {children}
    </Text>
    <Divider />
    {label && <Text style={styles.label}>{label}</Text>}
  </View>
);

const styles = StyleSheet.create({
  uppercase: {
    textTransform: 'uppercase'
  },
  text: {
    fontSize: 14,
    letterSpacing: -0.5,
    lineHeight: 22
  },
  label: {
    fontSize: 12,
    opacity: 0.5,
    lineHeight: 22
  }
});
