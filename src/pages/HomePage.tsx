import eventImage from '../assets/eventhub-landing-event.png'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <section id="hero" className="hero" aria-labelledby="home-title">
      <div className="hero__content">
        <p className="eyebrow">Welcome to EventHub</p>
        <h1 id="home-title">
          Every great event
          begins with a place <br />
          to <span>gather.</span>
        </h1>
        <p className="hero__description">
          EventHub is building a simpler way to discover, share, and experience the events that matter.
        </p>

        <div className="hero__actions" aria-label="Landing page actions">
          <Link className="button button--primary" to="/events">
            Explore Events <span aria-hidden="true">→</span>
          </Link>
          <Link className="button button--secondary" to="/about">Learn More</Link>
        </div>

        <ul className="hero-features" aria-label="How EventHub works">
          <li>
            <span className="feature-icon" aria-hidden="true">⌕</span>
            <div>
              <strong>Discover</strong>
              <span>Find events you love</span>
            </div>
          </li>
          <li>
            <span className="feature-icon" aria-hidden="true">⌑</span>
            <div>
              <strong>Book</strong>
              <span>Get your tickets easily</span>
            </div>
          </li>
          <li>
            <span className="feature-icon" aria-hidden="true">✦</span>
            <div>
              <strong>Attend</strong>
              <span>Create great memories</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="hero__visual" aria-label="Live EventHub events">
        <img src={eventImage} alt="A lively concert audience under warm stage lights" />
      </div>
    </section>
  )
}
