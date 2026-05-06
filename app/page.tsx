import Link from 'next/link';
import FlowingCard from '@/components/FlowingCard';
import {
  ExternalLink,
  ArrowRight,
  Github,
  Star,
  GitFork,
  Users,
  Shield,
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
            Reliability &amp; Memory Infrastructure for AI Agents.
          </h1>
        </div>

        <div className="max-w-sm md:pb-4">
          <p className="text-body-lg mb-6">
            Building WatchLLM and Klyd. We catch silent failures before they cascade. 
            Prevent architectural drift as autonomous systems scale.
          </p>
          <div className="flex items-center gap-4">
            <span className="status-dot" />
            <span className="text-mono text-[var(--text-muted)]">Building in public</span>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* GitHub Stats */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>GitHub</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">01</span>
        </div>

        <h2 className="text-headline mb-20 text-[var(--foreground)]">
          Open source by design.
        </h2>

        <div className="grid gap-px bg-[rgba(255,255,255,0.06)] md:grid-cols-3">
          <a
            href="https://github.com/kaadipranav"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--background)] p-8 md:p-12 transition-colors hover:border-[rgba(255,255,255,0.12)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[var(--surface)]">
              <Github className="h-6 w-6 text-[var(--foreground)]" />
            </div>
            <h3 className="text-subhead mb-4 text-[var(--foreground)]">@kaadipranav</h3>
            <p className="text-body-lg mb-4">
              Full-stack developer building AI infrastructure tools. 
              Focused on reliability and memory systems for autonomous agents.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-mono text-[var(--text-muted)]">1.2k+</span>
              </div>
              <div className="flex items-center gap-2">
                <GitFork className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-mono text-[var(--text-muted)]">200+</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-mono text-[var(--text-muted)]">50+</span>
              </div>
            </div>
          </a>

          <a
            href="https://github.com/getKlyd/klyd"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--background)] p-8 md:p-12 transition-colors hover:border-[rgba(255,255,255,0.12)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[var(--surface)]">
              <GitFork className="h-6 w-6 text-[var(--foreground)]" />
            </div>
            <h3 className="text-subhead mb-4 text-[var(--foreground)]">getKlyd/klyd</h3>
            <p className="text-body-lg mb-4">
              Open-source decision memory harness for terminal coding agents. 
              Stops architectural drift at commit time.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-mono text-[var(--text-muted)]">GitHub</span>
              </div>
              <div className="flex items-center gap-2">
                <GitFork className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-mono text-[var(--text-muted)]">MIT</span>
              </div>
            </div>
          </a>

          <a
            href="https://github.com/kaadipranav/watchllm"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--background)] p-8 md:p-12 transition-colors hover:border-[rgba(255,255,255,0.12)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[var(--surface)]">
              <Shield className="h-6 w-6 text-[var(--foreground)]" />
            </div>
            <h3 className="text-subhead mb-4 text-[var(--foreground)]">kaadipranav/watchllm</h3>
            <p className="text-body-lg mb-4">
              Agent reliability platform. Stress test, replay, and debug 
              AI agents before and after production failures.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-mono text-[var(--text-muted)]">GitHub</span>
              </div>
              <div className="flex items-center gap-2">
                <GitFork className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-mono text-[var(--text-muted)]">MIT</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Products</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">02</span>
        </div>

        <h2 className="text-headline mb-20 text-[var(--foreground)]">
          Tools for the agentic era.
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <FlowingCard marqueeText="Explore WatchLLM" className="rounded-sm">
            <ProductCard
              number="01"
              subtitle="Observability"
              title="WatchLLM"
              description="Agent reliability platform. Stress test, replay, and debug AI agents before and after production failures."
              cta="Explore WatchLLM"
              ctaHref="/watchllm"
            />
          </FlowingCard>

          <FlowingCard marqueeText="Read the Docs" className="rounded-sm">
            <ProductCard
              number="02"
              subtitle="Memory"
              title="Klyd"
              description="Open-source decision memory harness that stops terminal coding agents from silently ruining your codebase architecture."
              cta="Read the Docs"
              ctaHref="/klyd"
            />
          </FlowingCard>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* Manifesto */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 flex items-end justify-between">
          <Eyebrow>Philosophy</Eyebrow>
          <span className="text-mono text-[var(--text-muted)]">03</span>
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
    </main>
  );
}

