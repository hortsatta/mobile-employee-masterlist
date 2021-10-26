import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Badge, IconButton, useTheme } from 'react-native-paper';

import { PaperTheme } from 'models';
import { EmployeeRbacType } from 'config/rbac';
import { appRoutes } from 'config/core';
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
  employeeIdCount: number;
  onCancelBatchPress: () => void;
  onBatchPress: () => void;
  onFilterPress: () => void;
}

const ICON_SIZE = 22;

export const EmployeeListHeaderRight: FC<Props> = ({
  isBatchMode,
  employeeIdCount,
  onCancelBatchPress,
  onBatchPress,
  onFilterPress
}) => {

  const { navigate } = useNavigation();
  const theme = useTheme();
  const { canActivate } = useGuard();
  const [showMenu, setShowMenu] = useState(false);

  const handleDismiss = () => setShowMenu(false);

  const handleNewEmployeePress = () => {
    handleDismiss();
    navigate(appRoutes.upsertEmployee.path);
  };

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
                <Badge style={styles.employeeCountBadge(theme)} size={18}>
                  {employeeIdCount}
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
        canActivate([EmployeeRbacType.CREATE, EmployeeRbacType.UPDATE]) && (
          <ContextMenu
            visible={showMenu}
            onShow={() => setShowMenu(true)}
            onDismiss={handleDismiss}
          >
            <ContextMenuItem
              contentStyle={styles.menuItem}
              titleStyle={styles.menuTitle(theme)}
              icon={IconName.SQUARE_PLUS}
              title='New Employee'
              onPress={handleNewEmployeePress}
            />
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
  employeeCountBadge: ({ colors }: PaperTheme) => ({
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
