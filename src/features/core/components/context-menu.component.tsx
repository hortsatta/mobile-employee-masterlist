import React, { ComponentProps, FC } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { IconName } from './icon.component';

type Props = Omit<ComponentProps<typeof Menu>, 'anchor'> & {
  onShow: () => void;
  anchor?: React.ReactNode | {
    x: number;
    y: number;
  };
}

export const ContextMenu: FC<Props> = ({ onShow, anchor, children, ...moreProps }) => (
  <Menu
    anchor={anchor || (
      <IconButton
        icon={IconName.ELLIPSIS_STROKE_VERTICAL}
        size={19}
        onPress={onShow}
      />
    )}
    {...moreProps}
  >
    {children}
  </Menu>
);
