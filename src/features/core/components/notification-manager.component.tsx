import React, { ComponentProps, FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

import { darkColors, shadowElevations } from 'config/core';
import { NotificationMessage } from 'models';
import { Text } from './text.component';

type Props = Omit<ComponentProps<typeof Snackbar>, 'visible' | 'onDismiss' | 'children'>  & {
  notificationMessages: NotificationMessage[];
  visible?: boolean;
  onDismiss?: () => void;
}

export const NotificationManager: FC<Props> = ({ notificationMessages, visible, onDismiss, ...moreProps }) => {
  const [show, setShow] = useState(false);

  const showSnackBar = () => setShow(true);

  const hideSnackBar = () => setShow(false);

  const getLatestMessage = () => {
    if (!notificationMessages.length) { return; }

    const { message } = notificationMessages[notificationMessages.length - 1];
    return message;
  };

  useEffect(() => {
    if (!notificationMessages.length) { return; }

    hideSnackBar();

    const delay = setTimeout(showSnackBar, 0);

    return () => clearTimeout(delay);
  }, [notificationMessages]);

  return (
    <Snackbar
      style={styles.snackbar}
      visible={visible || show}
      onDismiss={onDismiss || hideSnackBar}
      {...moreProps}
    >
      <Text style={styles.message}>{getLatestMessage()}</Text>
    </Snackbar>
  );
};

const styles = StyleSheet.create<any>({
  snackbar: {
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'center',
    backgroundColor: darkColors.accent,
    ...shadowElevations[1]
  },
  message: {
    fontSize: 12
  }
});
