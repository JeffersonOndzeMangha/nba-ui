import { ReactNode } from 'react';
import { ErrorBoundary as RErrorBoundary } from 'react-error-boundary';
import StandardError from './StandardError';
import { useAppSelector } from '../store/hooks';
import { Alert, Modal } from '@mui/material';

type ErrorBoundaryProps = {
  children: ReactNode;
  customError?: ReactNode;
};

const ErrorBoundary = ({ children, customError }: ErrorBoundaryProps) => {
  return <RErrorBoundary fallback={<StandardError>{customError}</StandardError>}>{children}</RErrorBoundary>;
};

export default ErrorBoundary;