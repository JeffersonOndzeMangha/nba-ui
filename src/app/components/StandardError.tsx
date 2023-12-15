import { Alert, AlertColor, Link, Typography } from '@mui/material';
import React from 'react';

type StandardErrorProps = {
  message?: string;
  level?: AlertColor;
  children?: React.ReactNode;
};

/**
 * StandardError is a reusable React component for displaying error messages or alerts with customizable options.
 *
 * @component
 *
 * @param {object} props - The component's props.
 * @param {string} [props.message] - The error message to display.
 * @param {AlertColor} [props.level] - The color level of the error alert (e.g., 'error', 'warning', 'info', 'success').
 * @param {JSX.Element} [props.children] - Additional content to include in the error alert.
 *
 * @example
 * // Basic usage:
 * <StandardError />
 *
 * @example
 * // Custom error message with a different color level:
 * <StandardError message="Custom error message" level="error" />
 */
export default function StandardError({ message, level, children }: StandardErrorProps): JSX.Element {
  const title = 'Oops! Something went wrong.';
  const body = message || <>We weren&apos;t able to load your content properly. Please try again.</>;

  return (
    <Alert color={level || 'info'}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">{body}</Typography>
      {children}
    </Alert>
  );
}
