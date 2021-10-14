import { createSelector } from 'reselect';
import { AppState } from '../app';
import { CoreState } from './core.state';

const selectCoreState = (state: AppState): CoreState => state.core;

const selectDarkMode = createSelector(
  selectCoreState,
  state => state.darkMode
);

const selectNotificationMessages = createSelector(
  selectCoreState,
  (state: CoreState) => state.notificationMessages
);

export { selectDarkMode, selectNotificationMessages };
