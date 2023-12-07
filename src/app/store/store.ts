import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import playersReducer from './playersSlice';
import snackbarReducer from './snackbarSlice';
import { debounce } from 'lodash';

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage whenever the store changes
const saveState = debounce((state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (err) {
    console.warn('Issue saving state to local storage', err);
  }
}, 3000);

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    players: playersReducer,
    snackbar: snackbarReducer
  },
  preloadedState: persistedState, // Set initial state from local storage
});

// Subscribe to changes in the store and save them to local storage
store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const getState = store.getState;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
