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
    <div className="page-frame py-16 text-center">
      <h1 className="mb-6 text-3xl font-semibold tracking-[-0.05em] text-text md:text-4xl">Content Error</h1>
      <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-text-dim md:text-lg">
        There was an error loading this content. This might be a temporary issue.
      </p>
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={resetError}
          className="border border-line px-5 py-2.5 text-sm uppercase tracking-[0.16em] text-text transition-colors duration-300 hover:bg-surface"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-line px-5 py-2.5 text-sm uppercase tracking-[0.16em] text-text-dim transition-colors duration-300 hover:bg-surface hover:text-text"
        >
          Go Home
        </Link>
      </div>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mx-auto max-w-3xl text-left">
          <summary className="cursor-pointer text-sm uppercase tracking-[0.16em] text-text-faint transition-colors duration-300 hover:text-text-dim">
            Show error details (development only)
          </summary>
          <pre className="mt-4 overflow-auto border border-line bg-surface p-4 text-sm text-text-dim">
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
