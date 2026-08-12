import { useState } from 'react'
import { Link } from 'react-router-dom'

import eventHubLogo from '../../assets/eventhub-logo.png'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link className="brand" to="/" aria-label="EventHub home">
          <img className="brand__logo" src={eventHubLogo} alt="EventHub" />
        </Link>

        <nav
          id="primary-navigation"
          className={`primary-navigation${isMenuOpen ? ' is-open' : ''}`}
          aria-label="Primary navigation"
        >
          <a className="primary-navigation__link is-active" href="#hero" onClick={() => setIsMenuOpen(false)}>
            Home
          </a>
          <a className="primary-navigation__link" href="#hero" onClick={() => setIsMenuOpen(false)}>
            Browse Events
          </a>
          <a className="primary-navigation__link" href="#hero" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
