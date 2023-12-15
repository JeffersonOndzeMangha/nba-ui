import { ErrorBoundary as RErrorBoundary } from 'react-error-boundary';
import StandardError from './StandardError';
import { ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: JSX.Element;
  customError?: JSX.Element;
};

/**
 * ErrorBoundary is a React component that wraps its children in a boundary to catch and handle errors gracefully.
 * If an error occurs within its children, it displays a customizable error message.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The children components wrapped by the error boundary.
 * @param {ReactNode} [props.customError] - A custom error message to display when an error occurs (optional).
 *
 * @returns {JSX.Element} The wrapped children components or a custom error message.
 *
 * @example
 * // Basic usage:
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // With a custom error message:
 * <ErrorBoundary customError={<div>Custom error message</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
const ErrorBoundary = ({ children, customError }: ErrorBoundaryProps): JSX.Element => {
  return <RErrorBoundary fallback={<StandardError>{customError}</StandardError>}>{children}</RErrorBoundary>;
};

export default ErrorBoundary;
