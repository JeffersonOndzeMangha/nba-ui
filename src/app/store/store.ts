// Import necessary libraries and dependencies
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import reducers from './reducers';
import { configureStore } from '@reduxjs/toolkit';

// Configure the Redux store
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore certain actions for serialization checks
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Extract the dispatch function from the store
const { dispatch } = store;

// Typed hook for dispatching actions
const useDispatch = () => useAppDispatch<AppDispatch>();

// Typed hook for accessing the store's state
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

// Define additional types
export type AppDispatch = typeof store.dispatch; // Type for the dispatch function
export type RootState = ReturnType<typeof store.getState>; // Type for the complete store state

// Initialize the redux-persist persister
const persister = persistStore(store);

export const getState = store.getState; // Function to get the current store state

// Export store, dispatch, persister, useSelector, and useDispatch
export { store, dispatch, persister, useSelector, useDispatch };
