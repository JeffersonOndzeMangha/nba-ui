import { Alert, AlertColor, Link, Typography } from '@mui/material';
import React from 'react';

type StandardErrorProps = {
  message?: string;
  level?: AlertColor;
  children?: React.ReactNode;
};

export default function StandardError({ message, level, children }: StandardErrorProps) {
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
