import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Terminal,
  GitCommit,
  Database,
  ArrowLeft,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Klyd — Decision Memory Harness for AI Agents',
  description:
    'Open-source decision memory harness that stops terminal coding agents from silently drifting your architecture.',
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-mono mb-6 block text-[var(--text-muted)]">{children}</span>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="my-8 border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a]">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] px-5 py-3">
        <span className="text-mono text-[var(--text-muted)]">bash</span>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 bg-[var(--text-muted)] opacity-30" />
          <div className="h-2 w-2 bg-[var(--text-muted)] opacity-30" />
          <div className="h-2 w-2 bg-[var(--text-muted)] opacity-30" />
        </div>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-[var(--foreground)]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function CommandItem({
  command,
  description,
}: {
  command: string;
  description: string;
}) {
  return (
    <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--background)] p-8 transition-colors hover:border-[rgba(255,255,255,0.12)]">
      <code className="text-mono mb-4 block text-[var(--foreground)]">{command}</code>
      <p className="text-body-lg">{description}</p>
    </div>
  );
}

export default function KlydPage() {
  return (
    <main className="relative min-h-screen">
      {/* Back link */}
      <div className="mx-auto max-w-4xl px-6 pt-28">
        <Link
          href="/"
          className="text-mono inline-flex items-center text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="mr-2 h-3 w-3" />
          BACK TO KAADZ.ME
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-10">
        <Eyebrow>Documentation // Klyd</Eyebrow>
        <h1 className="text-headline mb-8 text-[var(--foreground)]">
          The harness that stops terminal coding agents from silently drifting your architecture.
        </h1>
        <p className="text-body-lg max-w-2xl">
          Klyd is an open-source decision memory harness for terminal coding agents like
          Aider and Claude Code. It extracts architectural decisions at commit time and
          reinjects them into the agent&apos;s context when files are written.
        </p>
      </section>

      <div className="section-divider mx-auto max-w-4xl" />

      {/* Problem / Solution */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-16">
          <Eyebrow>The Problem</Eyebrow>
          <h2 className="text-subhead mb-6 text-[var(--foreground)]">
            Slop fortresses build one green CI at a time.
          </h2>
          <p className="text-body-lg">
            Terminal coding agents patch code just to make CI go green. Without
            architectural memory, each fix is locally optimal and globally
            destructive. Over time, this creates &quot;slop fortresses&quot; — codebases
            where no human understands the structure, and no agent can safely modify
            anything without breaking something else.
          </p>
        </div>

        <div>
          <Eyebrow>The Solution</Eyebrow>
          <h2 className="text-subhead mb-6 text-[var(--foreground)]">
            Commit-level decision memory.
          </h2>
          <p className="text-body-lg">
            Klyd extracts decisions from every commit via an LLM and stores them in a
            local SQLite database. Before the agent writes files, Klyd queries the top
            relevant decisions and injects them into context. The agent now knows the
            architectural rules before it breaks them.
          </p>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-4xl" />

      {/* Installation */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Installation & Setup</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">01</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="text-subhead mb-6 text-[var(--foreground)]">Requirements</h3>
            <ul className="flex flex-col gap-3">
              {[
                'Python 3.11+',
                'Click',
                'Anthropic SDK',
                'Git repository',
              ].map((req) => (
                <li key={req} className="text-mono text-[var(--text-secondary)]">
                  {req}
                </li>
              ))}
            </ul>

            <h3 className="text-subhead mb-6 mt-16 text-[var(--foreground)]">Providers</h3>
            <div className="flex flex-wrap gap-2">
              {['Anthropic', 'OpenAI', 'OpenRouter', 'Gemini', 'Groq'].map((provider) => (
                <span
                  key={provider}
                  className="text-mono border border-[rgba(255,255,255,0.08)] px-3 py-1.5 text-[var(--text-secondary)]"
                >
                  {provider}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="text-subhead mb-6 text-[var(--foreground)]">Setup</h3>
            <p className="text-body-lg mb-4">
              Run the initialization command inside your Git repository:
            </p>
            <CodeBlock>kl init</CodeBlock>
            <p className="text-body-lg">
              This creates a local <code className="text-[var(--foreground)]">.klyd/memory.db</code> SQLite database and installs <code className="text-[var(--foreground)]">post-commit</code> and <code className="text-[var(--foreground)]">pre-commit</code> Git hooks.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-4xl" />

      {/* Command Reference */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Command Reference</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">02</span>
        </div>

        <div className="grid gap-px bg-[rgba(255,255,255,0.06)] md:grid-cols-3">
          <CommandItem
            command="kl run <agent>"
            description="Runs a coding agent with injected memory. Prepares the context window with relevant architectural decisions before the agent writes files."
          />
          <CommandItem
            command="kl status"
            description="Views the current decision memory store. Shows active decisions, confidence levels, and flagged architectural conflicts."
          />
          <CommandItem
            command="kl review"
            description="Interactive command to accept, reject, edit, or skip flagged conflicts. Manual override for incorrect LLM extractions."
          />
        </div>
      </section>

      <div className="section-divider mx-auto max-w-4xl" />

      {/* How it Works */}
      <section className="mx-auto max-w-4xl px-6 py-20 pb-32">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Under the Hood</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">03</span>
        </div>

        <h2 className="text-headline mb-20 text-[var(--foreground)]">
          Two hooks.<br />One harness.
        </h2>

        <div className="grid gap-px bg-[rgba(255,255,255,0.06)] md:grid-cols-3">
          {[
            {
              label: 'post-commit',
              desc: 'After every commit, the hook sends the diff to an LLM and extracts architectural decisions. Scored for confidence and stored in .klyd/memory.db. Conflicts are flagged for review.',
            },
            {
              label: 'pre-commit',
              desc: 'Before the agent writes files, the hook queries top-k relevant decisions from the memory store. Writes an injection file into the agent\'s context so it knows constraints before generating code.',
            },
            {
              label: 'Efficiency',
              desc: 'Maximum 2 LLM calls per commit — one for extraction, one for conflict detection. All state lives locally. No cloud dependency, no sync latency, no vendor lock-in.',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[var(--background)] p-8 md:p-12"
            >
              <h3 className="text-subhead mb-6 text-[var(--foreground)]">{item.label}</h3>
              <p className="text-body-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
