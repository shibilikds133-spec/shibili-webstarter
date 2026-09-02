export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950">
      <div className="container-base py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} shibili-webstarter. All rights reserved.</p>
        <p>
          Built with{' '}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="font-medium">
            Next.js
          </a>{' '}
          &amp;{' '}
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="font-medium">
            Tailwind
          </a>
        </p>
      </div>
    </footer>
  );
}
