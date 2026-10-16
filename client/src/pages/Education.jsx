// Education page: timeline of degrees and qualifications with their dates
import educationRecords from '../data/education.js'

function Education() {
  return (
    <section className="page">
      <h1 className="page-title">Education</h1>
      <p className="page-intro">My academic and professional qualifications.</p>

      <ol className="timeline">
        {educationRecords.map((educationRecord) => (
          <li className="timeline-item" key={educationRecord.id}>
            <p className="timeline-dates">{educationRecord.dates}</p>
            <h2>{educationRecord.qualification}</h2>
            <p>{educationRecord.institution}</p>
            {/* Extra details are optional, so they render only when they exist */}
            {educationRecord.details && (
              <p className="timeline-details">{educationRecord.details}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Education
