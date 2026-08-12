export function AboutPage() {
  return (
    <section className="about-page" aria-labelledby="about-title">
      <header className="page-heading">
        <p className="eyebrow">About EventHub</p>
        <h1 id="about-title">A simpler way to experience events.</h1>
        <p>EventHub is a modern event ticketing platform that brings discovering and attending great events into one place.</p>
      </header>

      <div className="about-page__surface">
        <p>
          Users can discover events, view their details, purchase tickets, and manage their tickets. Event organizers can
          create and manage their events, while administrators can create users such as organizers.
        </p>
        <section className="about-concepts" aria-labelledby="concepts-title">
          <h2 id="concepts-title">Built around every event moment</h2>
          <div>
            <article><span>01</span><h3>Discover</h3><p>Find events and explore their details.</p></article>
            <article><span>02</span><h3>Book</h3><p>Purchase tickets for available events.</p></article>
            <article><span>03</span><h3>Attend</h3><p>Manage purchased tickets and use them for event check-in.</p></article>
          </div>
        </section>
      </div>
    </section>
  )
}
