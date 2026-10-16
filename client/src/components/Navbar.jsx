// Navbar: logo plus the links to every page of the site
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'

// One entry per page; adding a page to the menu only requires a new item here
const navigationLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Me' },
  { path: '/projects', label: 'Projects' },
  { path: '/education', label: 'Education' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
]

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="Kristy Riano, home">
          <Logo />
        </Link>

        <nav aria-label="Main navigation">
          <ul className="navbar-links">
            {navigationLinks.map((navigationLink) => (
              <li key={navigationLink.path}>
                {/* NavLink adds the "active" class to the link of the current page */}
                <NavLink to={navigationLink.path} end={navigationLink.path === '/'}>
                  {navigationLink.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
