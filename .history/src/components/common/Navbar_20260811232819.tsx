import { Link, NavLink } from 'react-router-dom'

import eventHubLogo from '../../assets/eventhub-logo.png'

export function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link className="brand" to="/" aria-label="EventHub home">
          <img className="brand__logo" src={eventHubLogo} alt="EventHub" />
        </Link>

        <nav className="primary-navigation" aria-label="Primary navigation">
          <NavLink
            className={({ isActive }) => `primary-navigation__link${isActive ? ' is-active' : ''}`}
            to="/"
            end
          >
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
