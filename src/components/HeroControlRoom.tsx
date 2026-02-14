const missionSignals = [
  "Ship weekly experiments",
  "Deploy product-grade telemetry",
  "Validate with live user behavior"
];

export function HeroControlRoom() {
  return (
    <section className="hero section">
      <div className="hero-copy card float-in">
        <p className="eyebrow">KAADZ.ME / Founder Lab</p>
        <h1>Control room for products, systems, and live experiments.</h1>
        <p>
          Not a portfolio. This is where real tools are built, stress-tested, and shipped.
        </p>
        <div className="signal-list">
          {missionSignals.map((signal) => (
            <span key={signal} className="signal-chip">{signal}</span>
          ))}
        </div>
      </div>

      <div className="hero-panel card float-in-delayed" aria-label="Operations panel">
        <div className="panel-head">
          <span>Ops Feed</span>
          <span className="live-dot">LIVE</span>
        </div>
        <ul>
          <li><strong>WatchLLM:</strong> tracing + anomaly routing active</li>
          <li><strong>Latency budget:</strong> p95 under review</li>
          <li><strong>Current mode:</strong> build, test, ship</li>
        </ul>
      </div>
    </section>
  );
}
