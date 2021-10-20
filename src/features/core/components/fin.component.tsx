import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './text.component';

type Props = {
  show: boolean;
}

export const Fin: FC<Props> = ({ show }) => (
  show ? <Text style={styles.text}>fin.</Text> : null
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


