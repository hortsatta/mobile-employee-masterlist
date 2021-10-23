import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, IconButton, useTheme } from 'react-native-paper';

import { DepartmeRbacType } from 'config/rbac';
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
  departmentIdCount: number;
  onCancelBatchPress: () => void;
  onBatchPress: () => void;
  onFilterPress: () => void;
}

const ICON_SIZE = 22;

export const DepartmentListHeaderRight: FC<Props> = ({
  isBatchMode,
  departmentIdCount,
  onCancelBatchPress,
  onBatchPress,
  onFilterPress
}) => {

  // const { navigate } = useNavigation();
  const theme = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const { canActivate } = useGuard();

  const handleDismiss = () => setShowMenu(false);

  // const handleNewDepartmentPress = () => {
  //   handleDismiss();
  //   navigate(appRoutes.upsertDepartment.path);
  // };

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
                <Icon name={IconName.GEM} size={ICON_SIZE} color={theme.colors.text} />
                <Badge style={styles.departmentCountBadge(theme)} size={18}>
                  {departmentIdCount}
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
        canActivate([DepartmeRbacType.CREATE, DepartmeRbacType.UPDATE]) && (
          <ContextMenu
            visible={showMenu}
            onShow={() => setShowMenu(true)}
            onDismiss={handleDismiss}
          >
            {/* <ContextMenuItem
              contentStyle={styles.menuItem}
              titleStyle={styles.menuTitle(theme)}
              icon={IconName.SQUARE_PLUS}
              title='New Department'
              onPress={handleNewDepartmentPress}
            /> */}
            <ContextMenuItem
              contentStyle={styles.menuItem}
              titleStyle={styles.menuTitle(theme)}
              icon={IconName.SQUARE_CHECK}
              title='Multiple Selection'
              onPress={handleBatchPress}
            />
          </ContextMenu>)
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
  departmentCountBadge: ({ colors }: PaperTheme) => ({
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
