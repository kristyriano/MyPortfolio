// Sign In page: controlled react-hook-form + Material UI.
// Sends the credentials to POST /auth/signin and saves the JWT in the auth state.
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import FormTextField from '../components/forms/FormTextField.jsx'
import { emailRules, required } from '../components/forms/rules.js'
import { signin } from '../auth/api-auth.js'
import { useAuth } from '../auth/AuthContext.jsx'

function Signin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [serverError, setServerError] = useState('')

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' }, mode: 'onTouched' })

  const submitForm = async (credentials) => {
    setServerError('')
    try {
      const jwt = await signin(credentials) // { token, user }
      login(jwt)
      // Goes back to the protected page the user wanted, or to Home
      navigate(location.state?.from || '/', { replace: true })
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <section className="page page-narrow">
      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
            Sign In
          </Typography>
          {location.state?.message && <Alert severity="success" sx={{ mb: 2 }}>{location.state.message}</Alert>}

          <form onSubmit={handleSubmit(submitForm)} noValidate>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormTextField name="email" label="Email" type="email" control={control} rules={emailRules} autoComplete="email" />
              </Grid>
              <Grid size={12}>
                <FormTextField name="password" label="Password" type="password" control={control} rules={required('Password')} autoComplete="current-password" />
              </Grid>
              {serverError && (
                <Grid size={12}>
                  <Alert severity="error">{serverError}</Alert>
                </Grid>
              )}
              <Grid size={12}>
                <Button type="submit" variant="contained" fullWidth size="large" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography sx={{ mt: 2 }}>
            New here?{' '}
            <Link component={RouterLink} to="/signup">
              Create an account
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </section>
  )
}

export default Signin
