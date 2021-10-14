import React, { ComponentProps, FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

export const Text: FC<ComponentProps<typeof PaperText>> = ({ style, children, ...moreProps }) => (
  <PaperText style={[styles.text, style]} {...moreProps}>
    {children}
  </PaperText>
);

const styles = StyleSheet.create({
  text: { letterSpacing: 0 }
});
