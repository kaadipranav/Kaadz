import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(201,169,110,0.08)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-[var(--text-muted)]">
          Built by Kaadz.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:contact@kaadz.me"
            className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--foreground)]"
          >
            Email
          </a>
          <a
            href="https://x.com/kaad_zz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--foreground)]"
          >
            Twitter / X
          </a>
          <a
            href="https://github.com/kaadipranav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
