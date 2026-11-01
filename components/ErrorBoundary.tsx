'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <div className="flex min-h-screen items-center justify-center px-4 sm:px-6">
          <div className="max-w-[42rem] text-center">
            <h1 className="display text-[2.5rem] sm:text-[3.5rem]">Something went wrong.</h1>
            <p className="lede mx-auto mt-5 max-w-[30rem]">
              Something unexpected happened. Please try refreshing the page.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={this.resetError} className="button-primary">
                Try again
              </button>
              <button type="button" onClick={() => window.location.reload()} className="button-quiet">
                Refresh page
              </button>
            </div>
            {this.state.error && (
              <details className="mt-10 text-left">
                <summary className="cursor-pointer text-sm font-semibold text-ink/55 transition-colors hover:text-ink">
                  Show error details
                </summary>
                <pre className="mt-4 overflow-auto rounded-2xl bg-paper-raised p-4 text-sm text-ink/70 ring-1 ring-ink/[0.08]">
                  {this.state.error.message}
                  {this.state.error.stack && (
                    <>
                      {'\n\n'}
                      {this.state.error.stack}
                    </>
                  )}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
