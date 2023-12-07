import { ReactNode } from 'react';
import { ErrorBoundary as RErrorBoundary } from 'react-error-boundary';
import StandardError from './StandardError';

type ErrorBoundaryProps = {
  children: ReactNode;
  customError?: ReactNode;
};

const ErrorBoundary = ({ children, customError }: ErrorBoundaryProps) => {
  return <RErrorBoundary fallback={<StandardError>{customError}</StandardError>}>{children}</RErrorBoundary>;
};

export default ErrorBoundary;