// AuthContext: shared state for the signed-in user (state management with useState + Context).
// Any component can read who is signed in and their role with useAuth().
import { createContext, useContext, useState } from 'react'
import auth from './auth-helper.js'
import { signout as signoutRequest } from './api-auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Starts with the session saved in sessionStorage (if any)
  const [session, setSession] = useState(() => auth.isAuthenticated() || null)

  // Called after a successful sign in
  const login = (jwt) => {
    auth.authenticate(jwt)
    setSession(jwt)
  }

  // Signs out in the backend and clears the local session
  const logout = async () => {
    try {
      await signoutRequest()
    } catch (err) {
      console.error('Sign out error:', err)
    }
    auth.clearJWT()
    setSession(null)
  }

  const value = {
    user: session ? session.user : null,
    token: session ? session.token : null,
    isSignedIn: Boolean(session),
    isAdmin: Boolean(session && session.user.role === 'admin'),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
