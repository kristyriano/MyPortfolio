// Education page: the qualifications are read from MongoDB (GET /api/qualifications).
// Everyone can view them; the admin also sees Add, Edit and Delete.
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import AdminBar from '../components/AdminBar.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import RoleNotice from '../components/RoleNotice.jsx'
import useRecords from '../lib/useRecords.js'
import { formatMonthYear, sortByCompletion } from '../lib/dates.js'
import { list, remove, removeAll } from '../qualification/api-qualification.js'
import { useAuth } from '../auth/AuthContext.jsx'

function Education() {
  const { token, isAdmin } = useAuth()
  const { records, setRecords, loading, error, setError } = useRecords(list)
  const [pendingDelete, setPendingDelete] = useState(null) // a qualification, "all" or null

  const confirmDelete = async () => {
    try {
      if (pendingDelete === 'all') {
        await removeAll(token)
        setRecords([])
      } else {
        await remove(pendingDelete._id, token)
        setRecords((current) => current.filter((item) => item._id !== pendingDelete._id))
      }
    } catch (err) {
      setError(err.message)
    }
    setPendingDelete(null)
  }

  const qualifications = sortByCompletion(records)

  return (
    <section className="page">
      <h1 className="page-title">Education</h1>
      <p className="page-intro">My academic and professional qualifications.</p>
      <RoleNotice />
      <AdminBar
        addLabel="Add qualification"
        addPath="/education/new"
        hasRecords={qualifications.length > 0}
        onDeleteAll={() => setPendingDelete('all')}
      />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress />}
      {!loading && !error && qualifications.length === 0 && (
        <Alert severity="info">There are no qualifications yet.</Alert>
      )}

      {qualifications.length > 0 && (
        <ol className="timeline">
          {qualifications.map((qualification) => (
            <li className="timeline-item" key={qualification._id}>
              <p className="timeline-dates">
                {qualification.completion ? `Completed ${formatMonthYear(qualification.completion)}` : 'In progress'}
              </p>
              <h2>{qualification.title}</h2>
              <p className="timeline-details">{qualification.description}</p>
              <p className="record-owner">
                {qualification.firstname} {qualification.lastname} · {qualification.email}
              </p>
              {isAdmin && (
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button size="small" variant="outlined" component={RouterLink} to={`/education/${qualification._id}/edit`}>
                    Edit
                  </Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => setPendingDelete(qualification)}>
                    Delete
                  </Button>
                </Stack>
              )}
            </li>
          ))}
        </ol>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={pendingDelete === 'all' ? 'Delete all qualifications?' : 'Delete this qualification?'}
        message={
          pendingDelete === 'all'
            ? 'Every qualification will be removed from the database.'
            : pendingDelete
              ? `"${pendingDelete.title}" will be removed from the database.`
              : ''
        }
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </section>
  )
}

export default Education
