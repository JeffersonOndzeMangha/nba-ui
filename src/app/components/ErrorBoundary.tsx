import { ReactNode } from 'react';

import StandardError from './StandardError';
import { Box } from '@mui/material';

type ErrorBoundaryProps = {
  children: ReactNode;
  customError?: ReactNode;
};

const ErrorBoundary = ({ children, customError }: ErrorBoundaryProps) => {
  const standardError: ReactNode = (
    <>
      <StandardError>{customError}</StandardError>
      <Box style={{ padding: '8px 0 16px' }} />
      {children}
    </>
  );
  // @ts-ignore
  return <>{standardError}</>;
};

export default ErrorBoundary;
