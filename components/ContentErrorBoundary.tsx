'use client';

import React from 'react';
import Link from 'next/link';
import ErrorBoundary from './ErrorBoundary';

interface ContentErrorFallbackProps {
  error?: Error;
  resetError: () => void;
}

function ContentErrorFallback({ error, resetError }: ContentErrorFallbackProps): React.JSX.Element {
  return (
    <div className="mx-auto max-w-[42rem] px-4 py-24 text-center sm:px-6">
      <h1 className="display text-[2.25rem] sm:text-[3rem]">Something went wrong.</h1>
      <p className="lede mx-auto mt-5 max-w-[30rem]">
        There was an error loading this content. This might be a temporary issue.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button type="button" onClick={resetError} className="button-primary">
          Try again
        </button>
        <Link href="/" className="button-quiet">
          Go home
        </Link>
      </div>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mt-10 text-left">
          <summary className="cursor-pointer text-sm font-semibold text-ink/55 transition-colors hover:text-ink">
            Show error details (development only)
          </summary>
          <pre className="mt-4 overflow-auto rounded-2xl bg-paper-raised p-4 text-sm text-ink/70 ring-1 ring-ink/[0.08]">
            {error.message}
          </pre>
        </details>
      )}
    </div>
  );
}

interface ContentErrorBoundaryProps {
  children: React.ReactNode;
}

export default function ContentErrorBoundary({ children }: ContentErrorBoundaryProps): React.JSX.Element {
  return (
    <ErrorBoundary fallback={ContentErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
