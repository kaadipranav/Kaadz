const activeWork = [
  "WatchLLM event correlation UX",
  "Provider-level reliability scoring",
  "Self-serve experiment console"
];

export function CurrentlyBuilding() {
  return (
    <section className="section" id="building">
      <div className="section-head">
        <p className="eyebrow">Currently Building</p>
        <h2>Live tracks in motion right now.</h2>
      </div>
      <div className="card build-list">
        {activeWork.map((item) => (
          <div key={item} className="build-item">
            <span className="pulse" aria-hidden="true" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
