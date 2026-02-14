const labProjects = [
  {
    name: "WatchLLM",
    stage: "Active",
    problem: "LLM products fail quietly without observability.",
    solution: "Unified traces, eval loops, and alerting in one pipeline.",
    impact: "Faster incident response and safer production shipping."
  },
  {
    name: "Prompt Guard Rails",
    stage: "Experiment",
    problem: "Prompt updates can regress behavior unexpectedly.",
    solution: "Diff-based prompt tests with historical baseline replay.",
    impact: "Catches quality drift before it reaches users."
  },
  {
    name: "Launch Microsystems",
    stage: "Deployed",
    problem: "Ideas die in planning loops.",
    solution: "Automated scaffold + deploy templates for 24h MVP cycles.",
    impact: "Shortens idea-to-live from weeks to days."
  }
];

export function LabGrid() {
  return (
    <section className="section" id="lab">
      <div className="section-head">
        <p className="eyebrow">The Lab</p>
        <h2>Products and experiments with proof of work.</h2>
      </div>
      <div className="lab-grid">
        {labProjects.map((project) => (
          <article className="card lab-card" key={project.name}>
            <div className="card-topline">
              <h3>{project.name}</h3>
              <span className="badge">{project.stage}</span>
            </div>
            <p><strong>Problem:</strong> {project.problem}</p>
            <p><strong>Solution:</strong> {project.solution}</p>
            <p><strong>Impact:</strong> {project.impact}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
