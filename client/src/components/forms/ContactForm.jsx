// ContactForm: controlled react-hook-form + Material UI.
// Used by the public Contact page (create) and by the admin edit page (update).
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import FormTextField from './FormTextField.jsx'
import { required, emailRules } from './rules.js'
import { emptyContact } from './emptyValues.js'

function ContactForm({ defaultValues = emptyContact, onSubmit, submitLabel = 'Send message', serverError }) {
  // control: connects every field to the form state; isSubmitting: true while the API call runs
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues, mode: 'onTouched' })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField name="firstname" label="First Name" control={control} rules={required('First name')} autoComplete="given-name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField name="lastname" label="Last Name" control={control} rules={required('Last name')} autoComplete="family-name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField name="contactNumber" label="Contact Number" type="tel" control={control} autoComplete="tel" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField name="email" label="Email" type="email" control={control} rules={emailRules} autoComplete="email" />
        </Grid>
        <Grid size={12}>
          <FormTextField name="message" label="Message" control={control} rules={required('Message')} multiline rows={5} />
        </Grid>

        {serverError && (
          <Grid size={12}>
            <Alert severity="error">{serverError}</Alert>
          </Grid>
        )}

        <Grid size={12}>
          <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : submitLabel}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ContactForm
