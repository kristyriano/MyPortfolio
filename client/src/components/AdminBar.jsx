// AdminBar: success message after a create/update, and the admin buttons of a list page
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useAuth } from '../auth/AuthContext.jsx'

function AdminBar({ addLabel, addPath, onDeleteAll, hasRecords }) {
  const { isAdmin } = useAuth()
  const location = useLocation()
  const message = location.state?.message

  return (
    <>
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {isAdmin && (
        <Stack direction="row" spacing={1.5} useFlexGap sx={{ mb: 3, flexWrap: 'wrap' }}>
          <Button variant="contained" component={RouterLink} to={addPath}>
            {addLabel}
          </Button>
          {hasRecords && (
            <Button variant="outlined" color="error" onClick={onDeleteAll}>
              Delete all
            </Button>
          )}
        </Stack>
      )}
    </>
  )
}

export default AdminBar
