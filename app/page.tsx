import Link from 'next/link';
import {
  ExternalLink,
  Shield,
  Zap,
  Activity,
  GitBranch,
  BrainCircuit,
  ArrowRight,
  Server,
} from 'lucide-react';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-gold mb-4 block">{children}</span>
  );
}

function ProductCard({
  label,
  icon: Icon,
  title,
  description,
  details,
  cta,
  ctaHref,
  external = false,
}: {
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  cta: string;
  ctaHref: string;
  external?: boolean;
}) {
  const CtaContent = () => (
    <>
      {cta}
      {external ? (
        <ExternalLink className="ml-1.5 inline h-4 w-4" />
      ) : (
        <ArrowRight className="ml-1.5 inline h-4 w-4" />
      )}
    </>
  );

  return (
    <div className="card-premium hover-lift group flex flex-col gap-6 p-8 md:p-10">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(201,169,110,0.12)] bg-[var(--surface-elevated)]">
          <Icon className="h-5 w-5 text-[var(--gold)]" />
        </div>
        <SectionLabel>{label}</SectionLabel>
      </div>

      <div>
        <h3 className="mb-3 text-2xl font-medium tracking-tight text-[var(--foreground)] md:text-3xl">
          {title}
        </h3>
        <p className="text-body-lg max-w-xl">{description}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {details.map((detail) => (
          <li
            key={detail}
            className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
          >
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
            {detail}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        {external ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
          >
            <CtaContent />
          </a>
        ) : (
          <Link
            href={ctaHref}
            className="inline-flex items-center text-sm font-medium text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
          >
            <CtaContent />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pb-24 pt-40 text-center md:pt-48">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>Infrastructure</SectionLabel>
          <h1 className="text-headline mb-6 text-[var(--foreground)]">
            Reliability and Memory Infrastructure for AI Agents
          </h1>
          <p className="text-body-lg mx-auto max-w-2xl">
            Catch silent agent failures before they cascade. Prevent architectural drift
            as autonomous systems scale. We build the observability and memory layers
            that keep AI agents reliable.
          </p>
        </div>
        <div className="spotlight -translate-x-1/2 left-1/2 top-1/3" />
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Products */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16">
          <SectionLabel>Products</SectionLabel>
          <h2 className="text-3xl font-light tracking-tight text-[var(--foreground)] md:text-4xl">
            Tools for the agentic era
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <ProductCard
            label="Observability"
            icon={Activity}
            title="WatchLLM"
            description="The chaos and observability layer for AI agents. Stress-test and actively break agents before they reach production. Separate critical failures from noise with severity scoring."
            details={[
              'Edge-native architecture built for Cloudflare Workers',
              'Zero cold starts — monitors spin up instantly',
              'Severity scoring filters signal from noise',
            ]}
            cta="Explore WatchLLM"
            ctaHref="https://watchllm.dev"
            external
          />

          <ProductCard
            label="Memory"
            icon={BrainCircuit}
            title="Klyd"
            description="An open-source decision memory harness that stops terminal coding agents from silently ruining your codebase architecture. Prevent slop fortresses before they form."
            details={[
              'Maximum 2 LLM calls per commit',
              'BYOK — Bring Your Own Key',
              'Zero infrastructure — all state lives locally in .klyd/',
            ]}
            cta="Read the Docs"
            ctaHref="/klyd"
          />
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Manifesto / Why */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <SectionLabel>Philosophy</SectionLabel>
            <h2 className="mb-6 text-3xl font-light tracking-tight text-[var(--foreground)] md:text-4xl">
              Agents fail silently. We make them loud.
            </h2>
            <p className="text-body-lg">
              As coding agents become autonomous, the risk is not that they break things
              — it is that they break things slowly. A patch here, a workaround there,
              and suddenly your architecture is a slop fortress nobody understands.
              We build tools that inject memory and observability at the right layer.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="card-glass flex items-start gap-4 p-6">
              <Shield className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
              <div>
                <h3 className="mb-1 font-medium text-[var(--foreground)]">Pre-production chaos</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Break agents in staging, not in production. WatchLLM introduces
                  controlled failure modes to surface weak points.
                </p>
              </div>
            </div>
            <div className="card-glass flex items-start gap-4 p-6">
              <GitBranch className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
              <div>
                <h3 className="mb-1 font-medium text-[var(--foreground)]">Commit-level memory</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Klyd extracts architectural decisions at the commit boundary and
                  reinjects them when agents write files.
                </p>
              </div>
            </div>
            <div className="card-glass flex items-start gap-4 p-6">
              <Server className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
              <div>
                <h3 className="mb-1 font-medium text-[var(--foreground)]">Zero infrastructure</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Both tools are designed to run at the edge or locally. No servers to
                  provision, no dashboards to maintain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

