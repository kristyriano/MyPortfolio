// FormTextField: a Material UI TextField controlled by react-hook-form.
// <Controller> keeps the value of the field in the form state (controlled component),
// and shows the validation message under the field.
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

function FormTextField({ name, control, rules, helperText, ...textFieldProps }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...textFieldProps}
          id={name}
          fullWidth
          variant="outlined"
          error={Boolean(fieldState.error)}
          helperText={fieldState.error ? fieldState.error.message : helperText}
        />
      )}
    />
  )
}

export default FormTextField
