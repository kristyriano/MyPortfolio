// Projects page: the projects are read from MongoDB (GET /api/projects).
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
import { findProjectImage } from '../lib/projectImages.js'
import { list, remove, removeAll } from '../project/api-project.js'
import { useAuth } from '../auth/AuthContext.jsx'

function Projects() {
  const { token, isAdmin } = useAuth()
  const { records, setRecords, loading, error, setError } = useRecords(list)
  const [pendingDelete, setPendingDelete] = useState(null) // a project, "all" or null

  const confirmDelete = async () => {
    try {
      if (pendingDelete === 'all') {
        await removeAll(token)
        setRecords([])
      } else {
        await remove(pendingDelete._id, token)
        setRecords((current) => current.filter((project) => project._id !== pendingDelete._id))
      }
    } catch (err) {
      setError(err.message)
    }
    setPendingDelete(null)
  }

  const projects = sortByCompletion(records)

  return (
    <section className="page">
      <h1 className="page-title">Projects</h1>
      <p className="page-intro">A selection of work I have completed or am building now.</p>
      <RoleNotice />
      <AdminBar
        addLabel="Add project"
        addPath="/projects/new"
        hasRecords={projects.length > 0}
        onDeleteAll={() => setPendingDelete('all')}
      />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress />}
      {!loading && !error && projects.length === 0 && <Alert severity="info">There are no projects yet.</Alert>}

      <div className="project-list">
        {projects.map((project) => {
          const image = findProjectImage(project.title)
          return (
            <article className={image ? 'project' : 'project project-no-image'} key={project._id}>
              {image && <img className="project-image" src={image} alt={`Image of the project ${project.title}`} />}
              <div className="project-body">
                <h2>{project.title}</h2>
                {project.completion && (
                  <p className="project-details">Completed {formatMonthYear(project.completion)}</p>
                )}
                <p>{project.description}</p>
                <p className="record-owner">
                  {project.firstname} {project.lastname} · {project.email}
                </p>
                {isAdmin && (
                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    <Button size="small" variant="outlined" component={RouterLink} to={`/projects/${project._id}/edit`}>
                      Edit
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => setPendingDelete(project)}>
                      Delete
                    </Button>
                  </Stack>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={pendingDelete === 'all' ? 'Delete all projects?' : 'Delete this project?'}
        message={
          pendingDelete === 'all'
            ? 'Every project will be removed from the database.'
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

export default Projects
