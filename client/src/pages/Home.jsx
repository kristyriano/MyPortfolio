// Home page: welcome message, key numbers, services overview and links to other pages
import { Link, useLocation } from 'react-router-dom'
import services from '../data/services.js'

// Key results shown under the hero
const careerHighlights = [
  { id: 1, figure: '50+', label: 'websites built for clients' },
  { id: 2, figure: '15K+', label: 'followers learning tech with me' },
  { id: 3, figure: '260K+', label: 'views on my tutorials' },
]

function Home() {
  // When the contact form redirects here, it sends the visitor's name in location.state
  const location = useLocation()
  const senderFirstName = location.state?.senderFirstName

  return (
    <>
      {/* Hero: first block of the page, with a background photo */}
      <section className="hero">
        <div className="hero-inner">
          {/* Confirmation shown only after the contact form was submitted */}
          {senderFirstName && (
            <p className="notice" role="status">
              Thank you, {senderFirstName}. Your message was received.
            </p>
          )}

          <div className="hero-content">
            <h1 className="hero-title">Everything you dream of is possible.</h1>

            <p className="hero-text">
              Welcome to Kristy Riano. Websites, apps, digital marketing and AI solutions
              that help your business get found, sell more and grow.
            </p>

            <div className="button-row">
              <Link to="/contact" className="button button-primary">
                Start your project
              </Link>
              <Link to="/about" className="button button-light">
                Meet Kristy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key numbers under the hero */}
      <section className="highlights">
        <ul className="highlight-list">
          {careerHighlights.map((careerHighlight) => (
            <li key={careerHighlight.id}>
              <span className="highlight-figure">{careerHighlight.figure}</span>
              <span className="highlight-label">{careerHighlight.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Services overview: the same data used by the Services page */}
      <section className="home-services">
        <div className="home-services-inner">
          <h2 className="home-services-title">
            Everything your business needs to grow online.
          </h2>

          <ul className="home-service-list">
            {services.map((service) => (
              <li key={service.id}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>

          <div className="button-row">
            <Link to="/contact" className="button button-primary">
              Let's talk
            </Link>
            <Link to="/services" className="button button-dark">
              Explore my services
            </Link>
            <Link to="/projects" className="button button-dark">
              See my work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
