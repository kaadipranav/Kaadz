import Link from 'next/link';
import FlowingCard from '@/components/FlowingCard';
import {
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-mono mb-6 block text-[var(--text-muted)]">{children}</span>
  );
}

function ProductCard({
  number,
  title,
  subtitle,
  description,
  cta,
  ctaHref,
  external = false,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaHref: string;
  external?: boolean;
}) {
  return (
    <div className="card-premium hover-lift group flex flex-col gap-8 p-8 md:p-12">
      <div className="flex items-baseline justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
        <Eyebrow>{subtitle}</Eyebrow>
        <span className="text-mono text-[var(--text-muted)]">{number}</span>
      </div>

      <h3 className="text-subhead text-[var(--foreground)]">
        {title}
      </h3>

      <p className="text-body-lg max-w-lg">{description}</p>

      <div className="mt-auto pt-4">
        {external ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mono inline-flex items-center text-[var(--foreground)] transition-opacity hover:opacity-60"
          >
            {cta}
            <ArrowRight className="ml-2 inline h-3 w-3" />
          </a>
        ) : (
          <Link
            href={ctaHref}
            className="text-mono inline-flex items-center text-[var(--foreground)] transition-opacity hover:opacity-60"
          >
            {cta}
            <ArrowRight className="ml-2 inline h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Geometric Background */}
      <div className="geo-bg select-none">K</div>

      {/* Hero — Asymmetric editorial layout */}
      <section className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-32 pt-32 md:flex-row md:items-end md:justify-between md:pt-44">
        <div className="flex-1">
          <Eyebrow>AI Infrastructure // Founded by Kaadz</Eyebrow>
          <h1 className="hero-display text-[var(--foreground)]">
            Reliability &amp; Memory for Agents.
          </h1>
        </div>

        <div className="max-w-sm md:pb-4">
          <p className="text-body-lg mb-6">
            We catch silent failures before they cascade. Prevent architectural drift
            as autonomous systems scale.
          </p>
          <div className="flex items-center gap-4">
            <span className="status-dot" />
            <span className="text-mono text-[var(--text-muted)]">Building in public</span>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* Products — Full-bleed massive section */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Products</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">02</span>
        </div>

        <h2 className="text-headline mb-20 text-[var(--foreground)]">
          Tools for the agentic era.
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <FlowingCard
            marqueeText="Explore WatchLLM"
            className="rounded-sm"
          >
            <ProductCard
              number="01"
              subtitle="Observability"
              title="WatchLLM"
              description="The chaos and observability layer for AI agents. Stress-test and actively break agents before they reach production. Separate critical failures from noise via severity scoring."
              cta="Explore WatchLLM"
              ctaHref="https://watchllm.dev"
              external
            />
          </FlowingCard>

          <FlowingCard
            marqueeText="Read the Docs"
            className="rounded-sm"
          >
            <ProductCard
              number="02"
              subtitle="Memory"
              title="Klyd"
              description="An open-source decision memory harness that stops terminal coding agents from silently ruining your codebase architecture. Prevent slop fortresses before they form."
              cta="Read the Docs"
              ctaHref="/klyd"
            />
          </FlowingCard>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* Manifesto — Massive statement */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Philosophy</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">01</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-headline mb-12 text-[var(--foreground)]">
              Agents fail silently. We make them loud.
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="text-body-lg mb-8">
              As coding agents become autonomous, the risk is not that they break things
              — it is that they break things slowly. A patch here, a workaround there,
              and suddenly your architecture is a slop fortress nobody understands.
            </p>
            <p className="text-body-lg">
              We build tools that inject memory and observability at the right layer.
              Edge-native. Zero infrastructure. Built for the agentic era.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* Tech specs strip */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Capabilities</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">03</span>
        </div>

        <div className="grid gap-px bg-[rgba(255,255,255,0.06)] md:grid-cols-3">
          {[
            {
              label: 'Pre-production Chaos',
              desc: 'Break agents in staging, not in production. WatchLLM introduces controlled failure modes to surface weak points before they cascade.',
            },
            {
              label: 'Commit-level Memory',
              desc: 'Klyd extracts architectural decisions at the commit boundary and reinjects them when agents write files. Maximum 2 LLM calls per commit.',
            },
            {
              label: 'Zero Infrastructure',
              desc: 'Both tools are designed to run at the edge or locally. No servers to provision, no dashboards to maintain. BYOK for all major providers.',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[var(--background)] p-8 md:p-12"
            >
              <h3 className="text-subhead mb-6 text-[var(--foreground)]">
                {item.label}
              </h3>
              <p className="text-body-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

