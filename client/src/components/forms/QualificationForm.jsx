// QualificationForm: controlled react-hook-form + Material UI.
// Used by the admin to create a new qualification and to update an existing one.
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import FormTextField from './FormTextField.jsx'
import { required, emailRules } from './rules.js'
import { emptyQualification } from './emptyValues.js'

function QualificationForm({ defaultValues = emptyQualification, onSubmit, submitLabel = 'Save', serverError, onCancel }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues, mode: 'onTouched' })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid size={12}>
          <FormTextField name="title" label="Qualification Title" control={control} rules={required('Title')} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField name="firstname" label="First Name" control={control} rules={required('First name')} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField name="lastname" label="Last Name" control={control} rules={required('Last name')} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField name="email" label="Email" type="email" control={control} rules={emailRules} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="completion"
            label="Completion Date"
            type="date"
            control={control}
            helperText="Leave empty if it is still in progress"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={12}>
          <FormTextField
            name="description"
            label="Description"
            control={control}
            rules={required('Description')}
            helperText="Institution, dates and details"
            multiline
            rows={4}
          />
        </Grid>

        {serverError && (
          <Grid size={12}>
            <Alert severity="error">{serverError}</Alert>
          </Grid>
        )}

        <Grid size={12} sx={{ display: 'flex', gap: 1.5 }}>
          <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : submitLabel}
          </Button>
          {onCancel && (
            <Button variant="outlined" size="large" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  )
}

export default QualificationForm
