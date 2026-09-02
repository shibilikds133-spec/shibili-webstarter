import Link from 'next/link';

import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950">
      <div className="container-base py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white no-underline hover:no-underline">
          shibili-webstarter
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium">Home</Link>
          <Link href="/contact" className="text-sm font-medium">Contact</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
