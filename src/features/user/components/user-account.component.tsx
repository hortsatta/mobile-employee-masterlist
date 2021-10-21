import React, { FC, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';

import { darkColors, fontSizes } from 'config/core';
import { UserRole } from 'models';
import { Button, Icon, IconName, Text } from 'features/core/components';

type Props = {
  adminUserRole: UserRole;
  currentUserRole: UserRole;
  style?: ViewProps;
  loading?: boolean;
  onEmployeeDetailPress?: () => void;
  onSignOut?: () => void;
}

const ICON_SIZE = 28;

export const UserAccount: FC<Props> = ({
  style,
  adminUserRole,
  currentUserRole,
  loading,
  onEmployeeDetailPress,
  onSignOut
}) => {
  const detailsText = useMemo(() => (
    (currentUserRole.value >= adminUserRole.value)
      ? `You are signed in as an ${currentUserRole.name}.\nFull access is granted.`
      : 'You are signed in on a regular account.\nAccess is limited, peon.'
  ), [currentUserRole, adminUserRole]);

  return (
    <View style={[styles.wrapper, style]}>
      {
        loading
          ? (
            <ActivityIndicator
              style={styles.loading}
              size={60}
              color={darkColors.text}
            />
          )
          : (
            <>
              <Text style={styles.detailsText}>{detailsText}</Text>
              <Button
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                mode='outlined'
                icon={() => <Icon
                  name={IconName.USER_TIE}
                  color={darkColors.text}
                  size={ICON_SIZE}
                />}
                onPress={onEmployeeDetailPress}
              >
                <Text style={styles.buttonText}>My Employee Profile</Text>
              </Button>
              <Divider style={styles.divider} />
              <Button
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                mode='outlined'
                icon={() => <Icon
                  name={IconName.DOOR_OPEN}
                  color={darkColors.text}
                  size={ICON_SIZE}
                />}
                onPress={onSignOut}
              >
                <Text style={styles.buttonText}>Sign Out</Text>
              </Button>
            </>
          )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  loading: {
    paddingTop: 60
  },
  detailsText: {
    marginBottom: 36,
    color: darkColors.text,
    fontSize: fontSizes.text
  },
  divider: {
    alignSelf: 'center',
    marginVertical: 16,
    width: '70%',
    backgroundColor: darkColors.text,
    opacity: 0.3
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(0,0,0,0.03)',
    borderWidth: 1,
    borderRadius: 8
  },
  buttonLabel: {
    paddingTop: 2,
    marginVertical: 0,
    marginLeft: 20
  },
  buttonContent: {
    padding: 5,
    paddingVertical: 13,
    justifyContent: 'flex-start'
  },
  buttonText: {
    color: darkColors.text
  }
});
