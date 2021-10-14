import { createReducer } from '@reduxjs/toolkit';

import {
  appendNotificationMessages,
  clearNotificationMessages,
  toggleDarkMode
} from './core.actions';
import { initialState } from './core.state';

export const coreReducer = createReducer(initialState, builder => (
  builder
    .addCase(toggleDarkMode, state => {
      state.darkMode = !state.darkMode;
    })
    .addCase(appendNotificationMessages, (state, action) => {
      if (state.notificationMessages.length >= 5) {
        state.notificationMessages.shift();
      }

      state.notificationMessages.push(action.payload);
    })
    .addCase(clearNotificationMessages, state => {
      state.notificationMessages = [];
    })
    .addDefaultCase(state => state)
));
