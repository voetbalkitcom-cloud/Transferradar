export default function HomePage() {
  return (
    <main className="newHome">
      <section className="hero">
        <div className="heroInner">
          <h1>Transfers. Data. Inzicht.</h1>
          <p>
            Premium transferplatform. Geen rommel. Alleen de belangrijkste
            geruchten, strak gepresenteerd.
          </p>

          <div className="actions">
            <button className="btn primary">Bekijk clubs</button>
            <button className="btn ghost">Open backend</button>
          </div>
        </div>
      </section>

      <section className="cards">
        <div className="card">
          <h3>Trending</h3>
          <p>De belangrijkste geruchten van dit moment.</p>
        </div>

        <div className="card">
          <h3>Clubs</h3>
          <p>Ga direct naar jouw club.</p>
        </div>

        <div className="card">
          <h3>Updates</h3>
          <p>Realtime veranderingen.</p>
        </div>
      </section>
    </main>
  );
}
