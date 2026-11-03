// EditorPage: admin page that creates a new record or updates an existing one.
// - URL without an id (e.g. /projects/new)        -> empty form, POST (create)
// - URL with an id   (e.g. /projects/123/edit)   -> loads the record (read), PUT (update)
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuth } from '../auth/AuthContext.jsx'

// Default: the record is used as it is (defined once, so the effect below does not run again on every render)
const sameValues = (values) => values

function EditorPage({ recordName, FormComponent, emptyValues, api, backTo, toFormValues = sameValues }) {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const { token } = useAuth()
  const navigate = useNavigate()

  const [initialValues, setInitialValues] = useState(isEditing ? null : emptyValues)
  const [loadError, setLoadError] = useState('')
  const [serverError, setServerError] = useState('')

  // Edit mode: reads the record from the backend and fills the form with it
  useEffect(() => {
    if (!isEditing) return
    let active = true
    api
      .read(id, token)
      .then((record) => {
        if (!active) return
        const values = {}
        Object.keys(emptyValues).forEach((key) => {
          values[key] = record[key] ?? ''
        })
        setInitialValues(toFormValues(values))
      })
      .catch((err) => active && setLoadError(err.message))
    return () => {
      active = false
    }
  }, [api, emptyValues, id, isEditing, toFormValues, token])

  const submitForm = async (values) => {
    setServerError('')
    try {
      if (isEditing) await api.update(id, values, token)
      else await api.create(values, token)
      navigate(backTo, { state: { message: `${recordName} ${isEditing ? 'updated' : 'created'} successfully.` } })
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <section className="page page-medium">
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        {isEditing ? `Edit ${recordName}` : `Add ${recordName}`}
      </Typography>
      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          {loadError && <Alert severity="error">{loadError}</Alert>}
          {!loadError && !initialValues && <CircularProgress />}
          {initialValues && (
            <FormComponent
              defaultValues={initialValues}
              onSubmit={submitForm}
              serverError={serverError}
              submitLabel={isEditing ? 'Update' : 'Create'}
              onCancel={() => navigate(backTo)}
            />
          )}
        </CardContent>
      </Card>
    </section>
  )
}

export default EditorPage
