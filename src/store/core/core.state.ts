import { NotificationMessage } from 'models';

export type CoreState = {
  notificationMessages: NotificationMessage[];
  darkMode?: boolean;
}

export const initialState: CoreState = {
  notificationMessages: []
};
