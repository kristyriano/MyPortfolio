// Contacts page (signed-in users): messages saved by the Contact form.
// user  -> can only view the list
// admin -> can also edit, delete one contact or delete all of them
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import RoleNotice from '../components/RoleNotice.jsx'
import useRecords from '../lib/useRecords.js'
import { list, remove, removeAll } from '../contact/api-contact.js'
import { useAuth } from '../auth/AuthContext.jsx'

function Contacts() {
  const { token, isAdmin } = useAuth()
  const { records: contacts, setRecords: setContacts, loading, error, setError } = useRecords(list, token)
  // pendingDelete: the contact to delete, or "all"; null when the dialog is closed
  const [pendingDelete, setPendingDelete] = useState(null)

  const confirmDelete = async () => {
    try {
      if (pendingDelete === 'all') {
        await removeAll(token)
        setContacts([])
      } else {
        await remove(pendingDelete._id, token)
        setContacts((current) => current.filter((contact) => contact._id !== pendingDelete._id))
      }
    } catch (err) {
      setError(err.message)
    }
    setPendingDelete(null)
  }

  return (
    <section className="page">
      <h1 className="page-title">Contacts</h1>
      <p className="page-intro">Messages sent from the Contact form, saved in MongoDB.</p>
      <RoleNotice />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress />}

      {!loading && contacts.length === 0 && !error && <Alert severity="info">There are no contacts yet.</Alert>}

      {contacts.length > 0 && (
        <>
          {isAdmin && (
            <Stack direction="row" sx={{ mb: 2, justifyContent: 'flex-end' }}>
              <Button color="error" variant="outlined" onClick={() => setPendingDelete('all')}>
                Delete all contacts
              </Button>
            </Stack>
          )}
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Message</TableCell>
                  {isAdmin && <TableCell align="right">Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>{contact.firstname}</TableCell>
                    <TableCell>{contact.lastname}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.contactNumber}</TableCell>
                    <TableCell>{contact.message}</TableCell>
                    {isAdmin && (
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        <Button size="small" component={RouterLink} to={`/contacts/${contact._id}/edit`}>
                          Edit
                        </Button>
                        <Button size="small" color="error" onClick={() => setPendingDelete(contact)}>
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={pendingDelete === 'all' ? 'Delete all contacts?' : 'Delete this contact?'}
        message={
          pendingDelete === 'all'
            ? 'Every contact will be removed from the database.'
            : pendingDelete
              ? `${pendingDelete.firstname} ${pendingDelete.lastname} will be removed from the database.`
              : ''
        }
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </section>
  )
}

export default Contacts
