import { FC } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Text } from './text.component';

type Props = {
  show: boolean;
  style?: TextStyle;
}

export const Fin: FC<Props> = ({ style, show }) => (
  show ? <Text style={[styles.text, style]}>fin.</Text> : null
);

const styles = StyleSheet.create({
  text: {
    marginTop: 4,
    marginRight: 16,
    textAlign: 'right',
    fontStyle: 'italic',
    opacity: 0.4
  }
});


