// Navbar: logo, the links to every page, and the account area (Sign In / Sign Up or Sign Out)
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Logo from './Logo.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

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
  const { user, isSignedIn, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  // Links that depend on the role: signed-in users see Contacts, the admin also sees Users
  const links = [...navigationLinks]
  if (isSignedIn) links.push({ path: '/contacts', label: 'Contacts' })
  if (isAdmin) links.push({ path: '/users', label: 'Users' })

  const handleSignout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="Kristy Riano, home">
          <Logo />
        </Link>

        <nav aria-label="Main navigation">
          <ul className="navbar-links">
            {links.map((navigationLink) => (
              <li key={navigationLink.path}>
                {/* NavLink adds the "active" class to the link of the current page */}
                <NavLink to={navigationLink.path} end={navigationLink.path === '/'}>
                  {navigationLink.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-account">
          {isSignedIn ? (
            <>
              <span className="navbar-user">Hi, {user.name}</span>
              <Chip size="small" label={user.role} color={isAdmin ? 'secondary' : 'default'} />
              <Button size="small" variant="outlined" onClick={handleSignout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button size="small" component={Link} to="/signin">
                Sign In
              </Button>
              <Button size="small" variant="contained" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
