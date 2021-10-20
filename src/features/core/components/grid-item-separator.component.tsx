import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

export const GridItemSeparator: FC = () => <Divider style={styles.divider}  />;

const styles = StyleSheet.create({
  divider: {
    height: 5,
    backgroundColor: 'transparent'
  }
});
