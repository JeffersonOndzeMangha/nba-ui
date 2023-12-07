import { AlertProps, SnackbarOrigin } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from './store';

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

// ==============================|| SLICE - SNACKBAR ||============================== //

const snackbar = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action) {
      const { open, message, anchorOrigin, variant, alert, transition, close, actionButton } = action.payload;

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

export default snackbar.reducer;

export const { closeSnackbar, openSnackbar } = snackbar.actions;

export const openError = (message: string): AppThunk => (dispatch) => {
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
  
  export const openSuccess = (message: string): AppThunk => (dispatch) => {
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

