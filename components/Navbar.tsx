'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.8)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-mono text-[var(--foreground)] transition-opacity hover:opacity-60"
        >
          KAADZ<span className="text-[var(--text-muted)]">.ME</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-mono transition-colors ${pathname === '/' ? 'text-[var(--foreground)]' : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'}`}
          >
            HOME
          </Link>
          <Link
            href="/klyd"
            className={`text-mono transition-colors ${pathname === '/klyd' ? 'text-[var(--foreground)]' : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'}`}
          >
            KLYD
          </Link>
        </div>
      </div>
    </nav>
  );
}
