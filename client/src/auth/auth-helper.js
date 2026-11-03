// auth-helper (Week 9 - Integrating the backend): keeps the JWT and the signed-in user
// in sessionStorage, so a page refresh does not sign the user out.
const STORAGE_KEY = 'jwt'

const auth = {
  // Saves { token, user } after a successful sign in
  authenticate(jwt, callback) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(jwt))
    }
    if (callback) callback()
  },

  // Returns { token, user } or false when nobody is signed in
  isAuthenticated() {
    if (typeof window === 'undefined') return false
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (!saved) return false
    try {
      return JSON.parse(saved)
    } catch {
      return false
    }
  },

  // Removes the token (used by sign out)
  clearJWT(callback) {
    if (typeof window !== 'undefined') sessionStorage.removeItem(STORAGE_KEY)
    if (callback) callback()
  },
}

export default auth
