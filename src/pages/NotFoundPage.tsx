import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="welcome" aria-labelledby="not-found-title">
      <p className="eyebrow">404</p>
      <h1 id="not-found-title">This page could not be found.</h1>
      <p>The link may be outdated, or the page may have moved.</p>
      <Link className="text-link" to="/">
        Return to EventHub
      </Link>
    </section>
  )
}
