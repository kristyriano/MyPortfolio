// Turns MongoDB / Mongoose errors into a short, readable message for the API response

// Builds a message like "Email already exists" from a duplicate key error
const getUniqueErrorMessage = (err) => {
  let output
  try {
    // MongoDB tells which field is duplicated in keyValue, or in the index name (e.g. "email_1")
    const indexMatch = /index: (\w+?)_1/.exec(err.message || '')
    const fieldName = Object.keys(err.keyValue || {})[0] || (indexMatch && indexMatch[1]) || 'Field'
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
  } catch (ex) {
    output = 'Unique field already exists'
  }
  return output
}

const getErrorMessage = (err) => {
  let message = ''
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err)
        break
      default:
        message = 'Something went wrong'
    }
  } else if (err.errors) {
    // Validation errors: return the message of the field that failed
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message
    }
  } else {
    message = err.message || 'Something went wrong'
  }
  return message
}

export default { getErrorMessage }
