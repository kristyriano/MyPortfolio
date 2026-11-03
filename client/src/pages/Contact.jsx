// Contact page: contact information panel plus the Contact form (react-hook-form + Material UI).
// The form saves the message in MongoDB with POST /api/contacts and redirects to Home.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactForm from '../components/forms/ContactForm.jsx'
import { create } from '../contact/api-contact.js'

function Contact() {
  const navigate = useNavigate()
  // serverError shows a warning if the backend could not save the contact
  const [serverError, setServerError] = useState('')

  // Runs when the form is valid: saves the contact and redirects to the Home page
  const submitForm = async (values) => {
    setServerError('')
    try {
      await create(values)
      // Sends the first name to Home so it can show a thank-you message
      navigate('/', { state: { senderFirstName: values.firstname } })
    } catch (err) {
      console.error('Contact form error:', err)
      setServerError(err.message || 'The server is not available right now. Please try again later.')
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

        <ContactForm onSubmit={submitForm} serverError={serverError} />
      </div>
    </section>
  )
}

export default Contact
