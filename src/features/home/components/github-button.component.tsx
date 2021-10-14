import React, { ComponentProps, FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as Linking from 'expo-linking';

import { fontSizes } from 'config/core';
import { PaperTheme } from 'models';
import { Button, IconName, Text } from 'features/core/components';

export const GithubButton: FC<ComponentProps<typeof View>> = (props) => {
  const theme = useTheme();

  const handlePress = () => {
    Linking.openURL('https://github.com/hortsatta/mobile-employee-masterlist');
  };

  return (
    <View {...props}>
      <Button
        contentStyle={styles.buttonWrapper}
        style={styles.button(theme)}
        labelStyle={[styles.label]}
        icon={IconName.GITHUB}
        iconSize={24}
        color={theme.colors.text}
        mode='outlined'
        onPress={handlePress}
      >
        <Text>mobile-employee-masterlist</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  buttonWrapper: {
    height: 35
  },
  button: ({ colors }: PaperTheme) => ({
    width: 245,
    borderColor: colors.text,
    borderRadius: 999
  }),
  label: {
    fontSize: fontSizes.text,
    textTransform: 'lowercase'
  }
});
