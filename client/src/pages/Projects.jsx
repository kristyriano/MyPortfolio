// Projects page: one entry per project with image, technologies, role and outcome
import projects from '../data/projects.js'

function Projects() {
  return (
    <section className="page">
      <h1 className="page-title">Projects</h1>
      <p className="page-intro">A selection of work I have completed or am building now.</p>

      <div className="project-list">
        {projects.map((project) => (
          <article className="project" key={project.id}>
            <img className="project-image" src={project.image} alt={`Image of the project ${project.title}`} />
            <div className="project-body">
              <h2>{project.title}</h2>
              <p className="project-details">
                {project.date} | {project.technologies}
              </p>
              <p>
                <strong>My role:</strong> {project.role}
              </p>
              <p>
                <strong>Outcome:</strong> {project.outcome}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
