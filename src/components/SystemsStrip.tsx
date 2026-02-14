const systems = [
  "Idea -> prototype in 24 hours",
  "Telemetry first, features second",
  "Automated checks before every push",
  "Small experiments, fast kill-or-scale"
];

export function SystemsStrip() {
  return (
    <section className="section" id="systems">
      <div className="section-head">
        <p className="eyebrow">Systems I Use</p>
        <h2>Execution loops optimized for speed and evidence.</h2>
      </div>
      <div className="systems-row card">
        {systems.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  );
}
