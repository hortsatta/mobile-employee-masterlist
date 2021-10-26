import { ComponentProps, FC, useMemo } from 'react';
import { RefreshControl as RNRefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';

import { HEADER_HEIGHT, SUB_HEADER_HEIGHT } from 'config/core';

type Props = ComponentProps<typeof RNRefreshControl> & {
  isStage?: boolean;
  withSubHeader?: boolean;
}

export const RefreshControl: FC<Props> = ({ isStage, withSubHeader, ...moreProps }) => {
  const theme = useTheme();

  const topOffset = useMemo(
    () => withSubHeader ? HEADER_HEIGHT + SUB_HEADER_HEIGHT : HEADER_HEIGHT,
    [withSubHeader]
  );

  return (
    <RNRefreshControl
      progressViewOffset={isStage ? topOffset : 0}
      progressBackgroundColor={theme.colors.surface}
      colors={[theme.colors.primary]}
      tintColor={theme.colors.primary}
      {...moreProps}
    />
  );
};
