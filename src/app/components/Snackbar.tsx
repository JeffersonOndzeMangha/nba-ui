import { SyntheticEvent } from 'react';

// material-ui
import { Alert, Button, Fade, Grow, IconButton, Slide, SlideProps } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeSnackbar } from '../store/reducers/snackbarSlice';
import { CloseOutlined } from '@material-ui/icons';
import { KeyedObject } from '../types/types';

// animation functions
function TransitionSlideLeft(props: SlideProps): JSX.Element {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps): JSX.Element {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps): JSX.Element {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps): JSX.Element {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps): JSX.Element {
  return <Grow {...props} />;
}

// animation options
const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade
};

/**
 * Snackbar is a reusable React component for displaying snackbars or alerts with customizable options.
 *
 * @component
 *
 * @example
 * // Basic usage:
 * <Snackbar />
 */
const Snackbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const snackbar = useAppSelector((state: any) => state.snackbar);
  const { actionButton, anchorOrigin, alert, close, message, open, transition, variant } = snackbar;

  /**
   * Handles the close event of the snackbar.
   *
   * @param {SyntheticEvent | Event} _event - The event object.
   * @param {string} reason - The reason for closing the snackbar.
   */
  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <>
      {/* default snackbar */}
      {variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          TransitionComponent={animation[transition]}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} sx={{ mt: 0.25 }}>
                <CloseOutlined />
              </IconButton>
            </>
          }
        />
      )}

      {/* alert snackbar */}
      {variant === 'alert' && (
        <MuiSnackbar
          TransitionComponent={animation[transition]}
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            variant={alert.variant}
            color={alert.color}
            action={
              <>
                {actionButton !== false && (
                  <Button color={alert.color} size="small" onClick={handleClose}>
                    UNDO
                  </Button>
                )}
                {close !== false && (
                  <IconButton
                    sx={{ mt: 0.25 }}
                    size="small"
                    aria-label="close"
                    color={alert.color}
                    onClick={handleClose}
                  >
                    <CloseOutlined />
                  </IconButton>
                )}
              </>
            }
            sx={{
              ...(alert.variant === 'outlined' && {
                bgcolor: 'grey.0'
              })
            }}
          >
            {message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;
