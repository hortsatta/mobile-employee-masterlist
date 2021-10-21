import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, IconButton, useTheme } from 'react-native-paper';

import { JobTitleRbacType } from 'config/rbac';
import { PaperTheme } from 'models';
import { useGuard } from 'features/core/hooks';
import {
  Button,
  ContextMenu,
  ContextMenuItem,
  Icon,
  IconName,
  Text
} from 'features/core/components';

type Props = {
  isBatchMode: boolean;
  jobTitleIdCount: number;
  onCancelBatchPress: () => void;
  onBatchPress: () => void;
  onFilterPress: () => void;
}

const ICON_SIZE = 22;

export const JobTitleListHeaderRight: FC<Props> = ({
  isBatchMode,
  jobTitleIdCount,
  onCancelBatchPress,
  onBatchPress,
  onFilterPress
}) => {

  const theme = useTheme();
  const { canActivate } = useGuard();
  const [showMenu, setShowMenu] = useState(false);

  const handleDismiss = () => setShowMenu(false);

  const handleBatchPress = () => {
    handleDismiss();
    onBatchPress();
  };

  return (
    <>
      {
        isBatchMode
          ? (
            <>
              <Button
                style={styles.cancelButton}
                contentStyle={styles.cancelButtonWrapper}
                mode='text'
                color={theme.colors.primary}
                onPress={onCancelBatchPress}
              >
                <Text style={styles.cancelText(theme)}>Cancel</Text>
              </Button>
              <View>
                <Icon name={IconName.GEM} size={ICON_SIZE} />
                <Badge style={styles.jobTitleCountBadge(theme)} size={18}>
                  {jobTitleIdCount}
                </Badge>
              </View>
            </>
          )
          : (
            <IconButton
              icon={IconName.FILTER}
              size={ICON_SIZE}
              onPress={onFilterPress}
            />
          )
      }
      {
        canActivate([JobTitleRbacType.CREATE, JobTitleRbacType.UPDATE])
          && (
            <ContextMenu
              visible={showMenu}
              onShow={() => setShowMenu(true)}
              onDismiss={handleDismiss}
            >
              <ContextMenuItem
                contentStyle={styles.menuItem}
                titleStyle={styles.menuTitle(theme)}
                icon={IconName.SQUARE_CHECK}
                title='Multiple Selection'
                onPress={handleBatchPress}
              />
            </ContextMenu>
          )
      }
    </>
  );

};

const styles = StyleSheet.create<any>({
  cancelButton: {
    marginRight: 8
  },
  cancelButtonWrapper: {
    paddingTop: 2,
    height: 30
  },
  cancelText: ({ colors, fonts }: PaperTheme) => ({
    color: colors.primary,
    fontFamily: fonts.medium.fontFamily
  }),
  jobTitleCountBadge: ({ colors }: PaperTheme) => ({
    position: 'absolute',
    left: -8,
    backgroundColor: colors.accent
  }),
  menuItem: {
    marginLeft: 0
  },
  menuTitle: ({ fontSizes }: PaperTheme) => ({
    fontSize: fontSizes.menuTitle
  })
});
