import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import eventHubLogo from '../../assets/eventhub-logo.svg'

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
          <NavLink className={({ isActive }) => `primary-navigation__link${isActive ? ' is-active' : ''}`} to="/" end onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink className={({ isActive }) => `primary-navigation__link${isActive ? ' is-active' : ''}`} to="/events" onClick={() => setIsMenuOpen(false)}>
            Browse Events
          </NavLink>
          <NavLink className={({ isActive }) => `primary-navigation__link${isActive ? ' is-active' : ''}`} to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </NavLink>
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
