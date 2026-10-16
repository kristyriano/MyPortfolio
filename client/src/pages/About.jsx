// About Me page: name, photo, short biography and link to the resume PDF
import profilePhoto from '../assets/profile.jpg'

function About() {
  return (
    <section className="page">
      <h1 className="page-title">About me</h1>

      <div className="about-grid">
        <img className="about-photo" src={profilePhoto} alt="Portrait of Kristy Riano" />

        <div className="about-text">
          <h2>Kristy Riano</h2>

          <p>
            I am a Software Engineering Technology student specializing in Artificial
            Intelligence at Centennial College in Toronto. Before that, I worked as a
            freelance web developer, where I built and maintained more than 50
            responsive websites for clients.
          </p>
          <p>
            I also love teaching. I create programming tutorials in Spanish for a
            community of over 15,000 followers, and I volunteered as a Women
            Techmakers ambassador, mentoring women who are starting in technology.
          </p>
          <p>I speak Spanish and English.</p>

          {/* The PDF lives in the public folder, so it is served from the site root */}
          <a
            className="button button-primary"
            href="/Kristy_Riano_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            View my resume (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
