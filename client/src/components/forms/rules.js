// Validation rules shared by the forms (react-hook-form)
export const required = (label) => ({ required: `${label} is required` })

export const emailRules = {
  required: 'Email is required',
  pattern: { value: /.+@.+\..+/, message: 'Please enter a valid email address' },
}

export const passwordRules = {
  required: 'Password is required',
  minLength: { value: 6, message: 'Password must be at least 6 characters' },
}
