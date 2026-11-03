// Users page (admin only): accounts created with Sign Up, with their role.
// The admin can delete user accounts; the admin account itself cannot be deleted here.
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import useRecords from '../lib/useRecords.js'
import { list, remove } from '../user/api-user.js'
import { useAuth } from '../auth/AuthContext.jsx'

function Users() {
  const { token } = useAuth()
  const { records: users, setRecords: setUsers, loading, error, setError } = useRecords(list, token)
  const [pendingDelete, setPendingDelete] = useState(null)

  const confirmDelete = async () => {
    try {
      await remove(pendingDelete._id, token)
      setUsers((current) => current.filter((user) => user._id !== pendingDelete._id))
    } catch (err) {
      setError(err.message)
    }
    setPendingDelete(null)
  }

  return (
    <section className="page">
      <h1 className="page-title">Users</h1>
      <p className="page-intro">Accounts saved in the users collection.</p>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress />}

      {users.length > 0 && (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip size="small" label={user.role} color={user.role === 'admin' ? 'secondary' : 'default'} />
                  </TableCell>
                  <TableCell>{new Date(user.created).toLocaleDateString('en-CA')}</TableCell>
                  <TableCell align="right">
                    {user.role !== 'admin' && (
                      <Button size="small" color="error" onClick={() => setPendingDelete(user)}>
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this user?"
        message={pendingDelete ? `${pendingDelete.name} (${pendingDelete.email}) will be removed.` : ''}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </section>
  )
}

export default Users
