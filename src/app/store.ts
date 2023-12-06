import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import playersReducer from '../features/players/playersSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
  },
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
