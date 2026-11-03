// Admin editor pages for each object (create + update), built on EditorPage
import EditorPage from '../components/EditorPage.jsx'
import ContactForm from '../components/forms/ContactForm.jsx'
import ProjectForm from '../components/forms/ProjectForm.jsx'
import QualificationForm from '../components/forms/QualificationForm.jsx'
import { emptyContact, emptyProject, emptyQualification } from '../components/forms/emptyValues.js'
import * as contactApi from '../contact/api-contact.js'
import * as projectApi from '../project/api-project.js'
import * as qualificationApi from '../qualification/api-qualification.js'
import { toInputDate } from '../lib/dates.js'

// The date from MongoDB is turned into YYYY-MM-DD for the date field
const withInputDate = (values) => ({ ...values, completion: toInputDate(values.completion) })

export function ContactEditor() {
  return (
    <EditorPage recordName="Contact" FormComponent={ContactForm} emptyValues={emptyContact} api={contactApi} backTo="/contacts" />
  )
}

export function ProjectEditor() {
  return (
    <EditorPage
      recordName="Project"
      FormComponent={ProjectForm}
      emptyValues={emptyProject}
      api={projectApi}
      backTo="/projects"
      toFormValues={withInputDate}
    />
  )
}

export function QualificationEditor() {
  return (
    <EditorPage
      recordName="Qualification"
      FormComponent={QualificationForm}
      emptyValues={emptyQualification}
      api={qualificationApi}
      backTo="/education"
      toFormValues={withInputDate}
    />
  )
}
