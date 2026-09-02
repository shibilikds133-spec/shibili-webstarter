'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
      <h1 className="text-7xl font-extrabold text-brand-light">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center px-5 py-2.5 rounded-lg bg-brand-light text-white text-sm font-medium hover:bg-brand-dark transition-colors no-underline"
      >
        ← Go back home
      </Link>
    </div>
  );
}
