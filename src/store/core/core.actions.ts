import { createAction } from '@reduxjs/toolkit';
import { NotificationMessage } from 'models';

export enum CoreActionType {
  TOGGLE_DARK_MODE = '[Core] Toggle Dark Mode',
  // Messages for toast notification
  APPEND_NOTIFICATION_MESSAGES = '[Core] Append Notification Messages',
  CLEAR_NOTIFICATION_MESSAGES = '[Core] Clear Notification Messages'
}

const toggleDarkMode = createAction(
  CoreActionType.TOGGLE_DARK_MODE
);

const appendNotificationMessages = createAction(
  CoreActionType.APPEND_NOTIFICATION_MESSAGES,
  (notification: NotificationMessage) => ({ payload: notification })
);

const clearNotificationMessages = createAction(
  CoreActionType.CLEAR_NOTIFICATION_MESSAGES
);

export {
  toggleDarkMode,
  appendNotificationMessages,
  clearNotificationMessages
};
