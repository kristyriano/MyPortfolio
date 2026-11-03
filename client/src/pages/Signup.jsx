// Sign Up page: controlled react-hook-form + Material UI.
// Creates a new account with POST /api/users. Every new account has the "user" role.
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import FormTextField from '../components/forms/FormTextField.jsx'
import { emailRules, passwordRules, required } from '../components/forms/rules.js'
import { create } from '../user/api-user.js'

function Signup() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    mode: 'onTouched',
  })

  const submitForm = async ({ name, email, password }) => {
    setServerError('')
    try {
      await create({ name, email, password })
      // After signing up, the user signs in with the new credentials
      navigate('/signin', { state: { message: 'Account created. You can sign in now.' } })
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <section className="page page-narrow">
      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit(submitForm)} noValidate>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormTextField name="name" label="Name" control={control} rules={required('Name')} autoComplete="name" />
              </Grid>
              <Grid size={12}>
                <FormTextField name="email" label="Email" type="email" control={control} rules={emailRules} autoComplete="email" />
              </Grid>
              <Grid size={12}>
                <FormTextField name="password" label="Password" type="password" control={control} rules={passwordRules} autoComplete="new-password" />
              </Grid>
              <Grid size={12}>
                <FormTextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  control={control}
                  autoComplete="new-password"
                  rules={{
                    required: 'Please confirm the password',
                    validate: (value) => value === getValues('password') || 'Passwords do not match',
                  }}
                />
              </Grid>
              {serverError && (
                <Grid size={12}>
                  <Alert severity="error">{serverError}</Alert>
                </Grid>
              )}
              <Grid size={12}>
                <Button type="submit" variant="contained" fullWidth size="large" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Sign Up'}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/signin">
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </section>
  )
}

export default Signup
