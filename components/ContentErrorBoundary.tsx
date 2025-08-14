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
      <p className="text-[#737373] mb-8">
        There was an error loading this content. This might be a temporary issue.
      </p>
      <div className="flex gap-4 justify-center mb-8">
        <button 
          onClick={resetError}
          className="border border-[#525252] text-[#ededed] px-4 py-2 rounded-xl hover:bg-[#262626] transition-colors"
        >
          Try Again
        </button>
        <Link 
          href="/"
          className="bg-[#262626] text-[#ededed] px-4 py-2 rounded-xl hover:bg-[#404040] transition-colors"
        >
          Go Home
        </Link>
      </div>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="text-left">
          <summary className="cursor-pointer text-[#737373] hover:text-[#ededed] transition-colors">
            Show error details (development only)
          </summary>
          <pre className="mt-4 p-4 bg-[#1a1a1a] rounded-xl text-sm text-red-300 overflow-auto">
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