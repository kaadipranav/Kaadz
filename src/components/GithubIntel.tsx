export function GithubIntel() {
  return (
    <section className="section" id="github">
      <div className="section-head">
        <p className="eyebrow">GitHub Intel</p>
        <h2>Real public activity and output.</h2>
      </div>

      <div className="github-grid">
        <article className="card">
          <h3>Profile Stats</h3>
          <img
            alt="GitHub stats for kaadipranav"
            src="https://github-readme-stats.vercel.app/api?username=kaadipranav&show_icons=true&theme=transparent&hide_border=true&title_color=7dd3fc&text_color=cbd5e1&icon_color=22d3ee"
          />
        </article>

        <article className="card">
          <h3>Top Languages</h3>
          <img
            alt="Top languages for kaadipranav"
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=kaadipranav&layout=compact&theme=transparent&hide_border=true&title_color=7dd3fc&text_color=cbd5e1"
          />
        </article>

        <article className="card github-heatmap">
          <h3>Contribution Heatmap</h3>
          <img
            alt="Contribution heatmap for kaadipranav"
            src="https://ghchart.rshah.org/0f172a/kaadipranav"
          />
        </article>
      </div>
    </section>
  );
}
