import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import eventHubLogo from '../../assets/eventhub-logo.png'
import { useAuth } from '../../contexts/AuthContext'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    setIsMenuOpen(false)
    navigate('/')
  }

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

        <div className="auth-navigation">
          {isAuthenticated && user ? (
            <><span className="auth-navigation__user">{user.name}</span><button type="button" className="auth-navigation__action" onClick={handleLogout}>Logout</button></>
          ) : (
            <><NavLink className="auth-navigation__link" to="/login">Login</NavLink><NavLink className="auth-navigation__link auth-navigation__link--register" to="/register">Register</NavLink></>
          )}
        </div>

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
