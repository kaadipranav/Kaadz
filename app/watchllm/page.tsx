import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Terminal,
  GitCommit,
  Database,
  ArrowLeft,
  Shield,
  Activity,
  GitBranch,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'WatchLLM — Agent Reliability Platform',
  description:
    'Agent reliability platform. Stress test, replay, and debug AI agents before and after production failures.',
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

function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--background)] p-8 transition-colors hover:border-[rgba(255,255,255,0.12)]">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[var(--surface)]">
        <Icon className="h-6 w-6 text-[var(--foreground)]" />
      </div>
      <h3 className="text-subhead mb-4 text-[var(--foreground)]">{title}</h3>
      <p className="text-body-lg">{description}</p>
    </div>
  );
}

export default function WatchLLMPage() {
  return (
    <main className="relative min-h-screen">
      {/* Back link */}
      <div className="mx-auto max-w-6xl px-6 pt-28">
        <Link
          href="/"
          className="text-mono inline-flex items-center text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="mr-2 h-3 w-3" />
          BACK TO KAADZ.ME
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <Eyebrow>Product // WatchLLM</Eyebrow>
        <h1 className="text-headline mb-8 text-[var(--foreground)]">
          Your agent passed every test. WatchLLM shows you what it does when things go wrong.
        </h1>
        <p className="text-body-lg max-w-2xl">
          WatchLLM is an agent reliability platform. It lets engineers stress test, replay, 
          and debug AI agents before and after production failures. Not a logger. Not an 
          observability dashboard. WatchLLM breaks agents on purpose, then gives you the tools 
          to understand and fix what broke.
        </p>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Core Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Core Features</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">01</span>
        </div>

        <div className="grid gap-px bg-[rgba(255,255,255,0.06)] md:grid-cols-3">
          <FeatureItem
            icon={Shield}
            title="Stress Testing"
            description="Run a battery of attack scenarios against any agent before it ships. Attack categories include prompt injection, tool abuse, hallucination induction, context poisoning, infinite loop triggering, jailbreak attempts, data exfiltration probing, and role confusion."
          />
          <FeatureItem
            icon={Activity}
            title="Graph Replay"
            description="Every agent run is recorded as a directed graph of execution nodes. Each node captures type, input, output, timestamp, latency, token count, and cost. Scrub through chronologically to find the exact moment of failure."
          />
          <FeatureItem
            icon={GitBranch}
            title="Fork & Replay"
            description="From any node in any recorded run, fork a new run that starts from that exact state. Change input, prompt, or tool response — rerun from that node forward without re-executing everything before it."
          />
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Architecture */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Architecture</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">02</span>
        </div>

        <h2 className="text-subhead mb-12 text-[var(--foreground)]">
          Zero Cost Until Revenue
        </h2>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="text-subhead mb-6 text-[var(--foreground)]">Stack</h3>
            <div className="space-y-4">
              {[
                'Frontend: Next.js + CF Pages',
                'API Layer: Hono.js on CF Workers',
                'Execution: CF Workers (separate)',
                'Database: Cloudflare D1',
                'Trace Storage: Cloudflare R2',
                'Cache/State: Cloudflare KV',
                'Auth: Clerk Pro',
                'LLM Judge: Cloudflare AI',
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                  <span className="text-body-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="text-subhead mb-6 text-[var(--foreground)]">Data Flow</h3>
            <CodeBlock>Engineer installs SDK → decorates agent with @watchllm.test()
SDK calls POST /api/agents/register → Worker creates agent row in D1
Engineer runs watchllm simulate → POST /api/simulations
API Worker creates simulation row → enqueues to CF Queue (sim job)
Orchestrator Worker picks up sim job → fans out N chaos jobs (one per category)
Chaos Worker picks up chaos job → runs single attack loop:
  1. Generate adversarial input (CF AI or template)
  2. Call engineer&apos;s agent endpoint
  3. Rule-based filter on response
  4. LLM judge evaluates (CF AI)
  5. Write trace node to R2 (gzip JSON)
  6. Write run metadata to D1
Orchestrator aggregates results when all chaos jobs complete
Dashboard polls simulation status → fetches report from R2
Dashboard streams graph replay from R2 trace</CodeBlock>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* What It Is Not */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Positioning</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">03</span>
        </div>

        <h2 className="text-subhead mb-12 text-[var(--foreground)]">
          What It Is Not
        </h2>

        <div className="grid gap-px bg-[rgba(255,255,255,0.06)] md:grid-cols-2">
          {[
            'Not a general observability platform (no metrics dashboards, no uptime monitoring)',
            'Not a prompt management tool',
            'Not a model evaluation/evals platform (though it uses LLM-as-judge internally)',
            'Not a LangChain/CrewAI wrapper',
          ].map((item) => (
            <div key={item} className="bg-[var(--background)] p-8">
              <p className="text-body-lg">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* User & Positioning */}
      <section className="mx-auto max-w-6xl px-6 py-20 pb-32">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Target User</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">04</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-subhead mb-6 text-[var(--foreground)]">
              AI engineers shipping agents to production
            </h2>
            <p className="text-body-lg">
              They use LangChain, CrewAI, AutoGen, or raw OpenAI SDK. They have a working agent 
              in dev that breaks in prod in ways they can&apos;t reproduce. They are willing to pay 
              to not be woken up at 3am by a rogue agent deleting a database.
            </p>
            <p className="text-body-lg">
              Category: Agent reliability platform
              <br />
              Tagline: Agent reliability, from first run to production.
            </p>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-subhead mb-6 text-[var(--foreground)]">
              Competitive Moat
            </h3>
            <p className="text-body-lg">
              No single tool has all four: stress testing + graph replay + fork & replay + 
              run versioning. Balagan Agent has chaos injection only. agent-replay has CLI 
              replay only. LangSmith/Langfuse have post-mortem logs only. WatchLLM is the 
              only unified platform.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
