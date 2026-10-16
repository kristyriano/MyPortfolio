// Contact page: contact information panel plus a form that captures a message
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Empty form values, used at the start and reusable to reset the form
const emptyContactForm = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  message: '',
}

function Contact() {
  // formValues stores what the visitor types in every field
  const [formValues, setFormValues] = useState(emptyContactForm)
  const navigate = useNavigate()

  // Runs on every keystroke: updates only the field that changed
  function handleFieldChange(event) {
    const { name, value } = event.target
    setFormValues((previousValues) => ({ ...previousValues, [name]: value }))
  }

  // errorMessage shows a warning if the backend could not save the contact
  const [errorMessage, setErrorMessage] = useState('')

  // Runs when the form is sent: saves the contact in MongoDB and redirects to the Home page
  async function handleFormSubmit(event) {
    event.preventDefault() // stops the browser from reloading the page
    setErrorMessage('')

    // The contacts collection stores firstname, lastname and email
    const newContact = {
      firstname: formValues.firstName,
      lastname: formValues.lastName,
      email: formValues.email,
    }

    try {
      // POST /api/contacts -> handled by the Express backend
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      })
      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Your message could not be sent. Please try again.')
        return
      }

      // Sends the first name to Home so it can show a thank-you message
      navigate('/', { state: { senderFirstName: formValues.firstName } })
    } catch (error) {
      console.error('Contact form error:', error)
      setErrorMessage('The server is not available right now. Please try again later.')
    }
  }

  return (
    <section className="page">
      <h1 className="page-title">Contact me</h1>
      <p className="page-intro">Send me a message or reach me directly.</p>

      <div className="contact-grid">
        <aside className="contact-panel">
          <h2>Contact information</h2>
          <dl>
            <dt>Email</dt>
            <dd>
              <a href="mailto:nataripa@gmail.com">nataripa@gmail.com</a>
            </dd>
            <dt>Phone</dt>
            <dd>
              <a href="tel:+14378987702">(437) 898-7702</a>
            </dd>
            <dt>Location</dt>
            <dd>Toronto, Ontario, Canada</dd>
            <dt>LinkedIn</dt>
            <dd>
              <a href="https://ca.linkedin.com/in/kristyriano" target="_blank" rel="noreferrer">
                linkedin.com/in/kristyriano
              </a>
            </dd>
            <dt>GitHub</dt>
            <dd>
              <a href="https://github.com/kristyriano" target="_blank" rel="noreferrer">
                github.com/kristyriano
              </a>
            </dd>
          </dl>
        </aside>

        <form className="contact-form" onSubmit={handleFormSubmit}>
          <div className="form-row">
            <label>
              First name
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleFieldChange}
                autoComplete="given-name"
                required
              />
            </label>
            <label>
              Last name
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleFieldChange}
                autoComplete="family-name"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Contact number
              <input
                type="tel"
                name="contactNumber"
                value={formValues.contactNumber}
                onChange={handleFieldChange}
                autoComplete="tel"
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleFieldChange}
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              value={formValues.message}
              onChange={handleFieldChange}
              required
            />
          </label>

          {errorMessage && (
            <p className="form-error" role="alert">
              {errorMessage}
            </p>
          )}

          <button type="submit" className="button button-primary">
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
