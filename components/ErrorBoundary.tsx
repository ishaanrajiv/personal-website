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
        <div className="site-shell flex min-h-screen items-center justify-center">
          <div className="page-frame max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-semibold tracking-[-0.05em] text-text md:text-5xl">
              Something went wrong
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-text-dim md:text-lg">
              We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={this.resetError}
                className="border border-line px-6 py-3 text-sm uppercase tracking-[0.16em] text-text transition-colors duration-300 hover:bg-surface"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="border border-line px-6 py-3 text-sm uppercase tracking-[0.16em] text-text-dim transition-colors duration-300 hover:bg-surface hover:text-text"
              >
                Refresh Page
              </button>
            </div>
            {this.state.error && (
              <details className="mx-auto mt-8 max-w-3xl text-left">
                <summary className="cursor-pointer text-sm uppercase tracking-[0.16em] text-text-faint transition-colors duration-300 hover:text-text-dim">
                  Show error details
                </summary>
                <pre className="mt-4 overflow-auto border border-line bg-surface p-4 text-sm text-text-dim">
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
