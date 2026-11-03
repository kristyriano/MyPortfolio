// PrivateRoute: protects frontend pages.
// - Not signed in -> goes to the Sign In page (and comes back after signing in)
// - adminOnly pages -> a "user" sees an access message instead of the page
import { Navigate, useLocation } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import { useAuth } from './AuthContext.jsx'

function PrivateRoute({ children, adminOnly = false }) {
  const { isSignedIn, isAdmin } = useAuth()
  const location = useLocation()

  if (!isSignedIn) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }

  if (adminOnly && !isAdmin) {
    return (
      <section className="page">
        <Alert severity="warning">
          Only the admin can create, update or delete records. Your account can view the records.
        </Alert>
      </section>
    )
  }

  return children
}

export default PrivateRoute
