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
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-6 text-red-400">Content Error</h1>
      <p className="text-muted mb-8">
        There was an error loading this content. This might be a temporary issue.
      </p>
      <div className="flex gap-4 justify-center mb-8">
        <button 
          onClick={resetError}
          className="border border-accent text-primary px-4 py-2 rounded-xl hover:bg-border transition-colors"
        >
          Try Again
        </button>
        <Link 
          href="/"
          className="bg-border text-primary px-4 py-2 rounded-xl hover:bg-accent transition-colors"
        >
          Go Home
        </Link>
      </div>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="text-left">
          <summary className="cursor-pointer text-muted hover:text-primary transition-colors">
            Show error details (development only)
          </summary>
          <pre className="mt-4 p-4 bg-background-elevated rounded-xl text-sm text-red-300 overflow-auto">
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