'use client';

import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
      <h1 className="text-5xl font-extrabold text-red-500">Something went wrong!</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        An unexpected error occurred. Please try again.
      </p>
      {process.env.NODE_ENV === 'development' && (
        <pre className="text-left text-xs text-red-400 bg-red-50 dark:bg-red-950 p-4 rounded-lg max-w-lg overflow-auto">
          {error.message}
        </pre>
      )}
      <button
        onClick={reset}
        className="mt-4 inline-flex items-center px-5 py-2.5 rounded-lg bg-brand-light text-white text-sm font-medium hover:bg-brand-dark transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
