// third-party
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from 'redux-persist';
import playersSilceReducer from './playersSlice';
import snackbarSliceReducer from './snackbarSlice';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';


const persistConfig = {
  key: 'appData', // Change this key to suit your app
  storage: createWebStorage('local'),
};

const playersReducer = persistReducer(persistConfig, playersSilceReducer);

const store = configureStore({
  reducer: {
    players: playersReducer,
    snackbar: snackbarSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

const persister = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, persister, useSelector, useDispatch };


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const getState = store.getState;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
