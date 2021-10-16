import React, { ComponentProps, FC } from 'react';
import { StyleSheet } from 'react-native';
import { Menu, useTheme } from 'react-native-paper';

import { PaperTheme } from 'models';

export const ContextMenuItem: FC<ComponentProps<typeof Menu.Item>> = ({
  contentStyle,
  titleStyle,
  ...moreProps
}) => {

  const theme = useTheme();

  return (
    <Menu.Item
      contentStyle={[styles.menuItem, contentStyle]}
      titleStyle={[styles.menuTitle(theme), titleStyle]}
      {...moreProps}
    />
  );

};

const styles = StyleSheet.create<any>({
  menuItem: {
    marginLeft: -12
  },
  menuTitle: ({ fontSizes }: PaperTheme) => ({
    fontSize: fontSizes.menuTitle
  })
});
