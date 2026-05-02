import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Terminal,
  GitCommit,
  Database,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Cpu,
  Key,
  HardDrive,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Klyd — Decision Memory Harness for AI Agents',
  description:
    'Open-source decision memory harness that stops terminal coding agents from silently drifting your architecture.',
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-gold mb-4 block">{children}</span>
  );
}

function CodeBlock({ children, language = 'bash' }: { children: string; language?: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-[rgba(201,169,110,0.08)] bg-[#080808]">
      <div className="flex items-center justify-between border-b border-[rgba(201,169,110,0.06)] px-4 py-2">
        <span className="text-xs text-[var(--text-muted)]">{language}</span>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-muted)] opacity-30" />
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-muted)] opacity-30" />
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--text-muted)] opacity-30" />
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-[var(--gold-light)]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function CommandItem({
  command,
  description,
  icon: Icon,
}: {
  command: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-[rgba(201,169,110,0.08)] bg-[var(--surface)] p-6 transition-colors hover:border-[rgba(201,169,110,0.15)]">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-[var(--gold)]" />
        <code className="rounded bg-[#0d0d0d] px-2 py-1 text-sm font-medium text-[var(--foreground)]">
          {command}
        </code>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

export default function KlydPage() {
  return (
    <main className="relative min-h-screen">
      {/* Back link */}
      <div className="mx-auto max-w-3xl px-6 pt-28">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to kaadz.me
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-10">
        <SectionLabel>Documentation</SectionLabel>
        <h1 className="text-headline mb-6 text-[var(--foreground)]">
          keel: the harness that stops terminal coding agents from silently drifting your architecture
        </h1>
        <p className="text-body-lg">
          Klyd is an open-source decision memory harness for terminal coding agents like
          Aider and Claude Code. It extracts architectural decisions at commit time and
          reinjects them into the agent&apos;s context when files are written — preventing
          the slow architectural decay that turns codebases into slop fortresses.
        </p>
      </section>

      <div className="section-divider mx-auto max-w-3xl" />

      {/* Problem / Solution */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12">
          <SectionLabel>The Problem</SectionLabel>
          <div className="card-premium border-l-2 border-l-[var(--gold)] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
              <div>
                <h3 className="mb-2 text-lg font-medium text-[var(--foreground)]">
                  Slop fortresses build one green CI at a time
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Terminal coding agents patch code just to make CI go green. Without
                  architectural memory, each fix is locally optimal and globally
                  destructive. Over time, this creates &quot;slop fortresses&quot; — codebases
                  where no human understands the structure, and no agent can safely modify
                  anything without breaking something else.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>The Solution</SectionLabel>
          <div className="card-premium border-l-2 border-l-[var(--gold)] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
              <div>
                <h3 className="mb-2 text-lg font-medium text-[var(--foreground)]">
                  Commit-level decision memory
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Klyd extracts decisions from every commit via an LLM and stores them in a
                  local SQLite database. Before the agent writes files, Klyd queries the top
                  relevant decisions and injects them into context. The agent now knows the
                  architectural rules before it breaks them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-3xl" />

      {/* Installation */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionLabel>Installation & Setup</SectionLabel>

        <h2 className="mb-4 text-xl font-medium text-[var(--foreground)]">Requirements</h2>
        <ul className="mb-8 flex flex-col gap-2">
          {[
            'Python 3.11+',
            'Click',
            'Anthropic SDK (or compatible provider)',
            'Git repository',
          ].map((req) => (
            <li key={req} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--gold)]" />
              {req}
            </li>
          ))}
        </ul>

        <h2 className="mb-4 text-xl font-medium text-[var(--foreground)]">Setup</h2>
        <p className="mb-4 text-sm text-[var(--text-secondary)]">
          Run the initialization command inside your Git repository:
        </p>
        <CodeBlock>kl init</CodeBlock>
        <p className="mb-8 text-sm text-[var(--text-secondary)]">
          This creates a local <code className="rounded bg-[#0d0d0d] px-1.5 py-0.5 text-[var(--gold-light)]">.klyd/memory.db</code> SQLite database and installs
          <code className="rounded bg-[#0d0d0d] px-1.5 py-0.5 text-[var(--gold-light)]"> post-commit</code> and
          <code className="rounded bg-[#0d0d0d] px-1.5 py-0.5 text-[var(--gold-light)]"> pre-commit</code> Git hooks.
        </p>

        <h2 className="mb-4 text-xl font-medium text-[var(--foreground)]">Provider Support</h2>
        <p className="mb-4 text-sm text-[var(--text-secondary)]">
          Klyd supports BYOK (Bring Your Own Key) for the following providers:
        </p>
        <div className="mb-8 flex flex-wrap gap-3">
          {['Anthropic', 'OpenAI', 'OpenRouter', 'Google Gemini', 'Groq'].map((provider) => (
            <span
              key={provider}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,169,110,0.12)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
            >
              <Key className="h-3 w-3 text-[var(--gold)]" />
              {provider}
            </span>
          ))}
        </div>
      </section>

      <div className="section-divider mx-auto max-w-3xl" />

      {/* Command Reference */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionLabel>Command Reference</SectionLabel>

        <div className="flex flex-col gap-4">
          <CommandItem
            command="kl run <agent>"
            description="Runs a coding agent with the injected memory. Klyd prepares the context window with relevant architectural decisions before the agent starts writing files."
            icon={Terminal}
          />
          <CommandItem
            command="kl status"
            description="Views the current decision memory store. Shows active decisions, confidence levels per entry, and any flagged architectural conflicts that need review."
            icon={Database}
          />
          <CommandItem
            command="kl review"
            description="An interactive command to accept, reject, edit, or skip flagged architectural conflicts. This is your manual override when the LLM extracts a decision incorrectly."
            icon={GitCommit}
          />
        </div>
      </section>

      <div className="section-divider mx-auto max-w-3xl" />

      {/* How it Works */}
      <section className="mx-auto max-w-3xl px-6 py-16 pb-24">
        <SectionLabel>Under the Hood</SectionLabel>

        <h2 className="mb-6 text-xl font-medium text-[var(--foreground)]">
          Two hooks, one harness
        </h2>

        <div className="flex flex-col gap-6">
          <div className="card-glass p-6">
            <div className="mb-3 flex items-center gap-3">
              <GitCommit className="h-5 w-5 text-[var(--gold)]" />
              <h3 className="font-medium text-[var(--foreground)]">post-commit hook</h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              After every commit, the hook sends the diff to an LLM and extracts the
              architectural decisions encoded in the change. These decisions are scored for
              confidence and stored in <code className="rounded bg-[#0d0d0d] px-1.5 py-0.5 text-[var(--gold-light)]">.klyd/memory.db</code>.
              Conflicts with existing decisions are flagged for review.
            </p>
          </div>

          <div className="card-glass p-6">
            <div className="mb-3 flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-[var(--gold)]" />
              <h3 className="font-medium text-[var(--foreground)]">pre-commit hook</h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Before the agent writes files, the hook queries the top-k relevant decisions
              from the memory store based on the files being modified. It writes an injection
              file into the agent&apos;s context, ensuring the agent knows the architectural
              constraints before it generates code.
            </p>
          </div>

          <div className="card-glass p-6">
            <div className="mb-3 flex items-center gap-3">
              <Cpu className="h-5 w-5 text-[var(--gold)]" />
              <h3 className="font-medium text-[var(--foreground)]">Efficiency constraints</h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Klyd is designed to be cheap and fast. It uses a maximum of 2 LLM calls per
              commit — one for extraction and one for conflict detection. All state lives
              locally; there is no cloud dependency, no sync latency, and no vendor lock-in.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
