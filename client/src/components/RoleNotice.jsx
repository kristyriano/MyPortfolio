// RoleNotice: tells the signed-in person what their role allows on this page
import Alert from '@mui/material/Alert'
import { useAuth } from '../auth/AuthContext.jsx'

function RoleNotice() {
  const { isSignedIn, isAdmin } = useAuth()
  if (!isSignedIn) return null
  return isAdmin ? (
    <Alert severity="success" sx={{ mb: 3 }}>
      Signed in as admin: you can create, update and delete records.
    </Alert>
  ) : (
    <Alert severity="info" sx={{ mb: 3 }}>
      Signed in as user: you can view the records. Only the admin can change them.
    </Alert>
  )
}

export default RoleNotice
