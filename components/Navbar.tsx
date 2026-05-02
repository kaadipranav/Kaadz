'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(201,169,110,0.08)] bg-[rgba(5,5,5,0.8)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--gold)]"
        >
          kaadz<span className="text-[var(--gold)]">.</span>me
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm transition-colors ${pathname === '/' ? 'text-[var(--gold)]' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'}`}
          >
            Home
          </Link>
          <Link
            href="/klyd"
            className={`text-sm transition-colors ${pathname === '/klyd' ? 'text-[var(--gold)]' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'}`}
          >
            Klyd
          </Link>
        </div>
      </div>
    </nav>
  );
}
