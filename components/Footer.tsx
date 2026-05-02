export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-mono text-[var(--text-muted)]">
          Built by Kaadz.
        </p>
        <div className="flex items-center gap-8">
          <a
            href="mailto:contact@kaadz.me"
            className="text-mono text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            EMAIL
          </a>
          <a
            href="https://x.com/kaad_zz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mono text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            TWITTER / X
          </a>
          <a
            href="https://github.com/kaadipranav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mono text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            GITHUB
          </a>
        </div>
      </div>
    </footer>
  );
}
