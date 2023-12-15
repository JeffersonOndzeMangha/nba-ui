import { AlertProps, SnackbarOrigin } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

// Define the shape of the Snackbar state
export interface SnackbarProps {
  action: boolean;
  open: boolean;
  message: string;
  anchorOrigin: SnackbarOrigin;
  variant: string;
  alert: AlertProps;
  transition: string;
  close: boolean;
  actionButton: boolean;
}

// Define the initial state for the Snackbar slice
const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  variant: 'default',
  alert: {
    color: 'primary' as AlertProps['color'],
    variant: 'filled'
  },
  transition: 'Fade',
  close: true,
  actionButton: false
};

// Create the Snackbar slice with reducers and actions
const snackbar = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action) {
      const {
        open,
        message,
        anchorOrigin,
        variant,
        alert,
        transition,
        close,
        actionButton
      } = action.payload;

      // Update the state with the payload values or use initial values if not provided
      state.action = !state.action;
      state.open = open || initialState.open;
      state.message = message || initialState.message;
      state.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
      state.variant = variant || initialState.variant;
      state.alert = {
        color: alert?.color || initialState.alert.color,
        variant: alert?.variant || initialState.alert.variant
      };
      state.transition = transition || initialState.transition;
      state.close = close === false ? close : initialState.close;
      state.actionButton = actionButton || initialState.actionButton;
    },

    closeSnackbar(state) {
      state.open = false;
    }
  }
});

// Export the reducer
export default snackbar.reducer;

// Export the actions
export const { closeSnackbar, openSnackbar } = snackbar.actions;

// Helper functions to open error and success snackbar messages
export const openError = (message: string) => () => {
  const snackbarData = {
    message,
    open: true,
    variant: 'alert',
    alert: {
      color: 'error',
    },
    close: true,
  };
  
  dispatch(openSnackbar(snackbarData));
};

export const openSuccess = (message: string) => () => {
  const snackbarData = {
    message,
    open: true,
    variant: 'alert',
    alert: {
      color: 'success',
    },
    close: true,
  };
  
  dispatch(openSnackbar(snackbarData));
};
