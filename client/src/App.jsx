// App: defines the shared layout (navbar and footer) and the route of each page
// Assignment 3: Sign In / Sign Up pages and protected pages for signed-in users and the admin
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoute from './auth/PrivateRoute.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Education from './pages/Education.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Contacts from './pages/Contacts.jsx'
import Users from './pages/Users.jsx'
import { ContactEditor, ProjectEditor, QualificationEditor } from './pages/editors.jsx'

function App() {
  return (
    <div className="site">
      <Navbar />

      <main className="site-main">
        {/* Each Route connects a URL path with the page component it shows */}
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Signed-in users (user or admin): view the contacts */}
          <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />

          {/* Admin only: create, update and delete */}
          <Route path="/contacts/:id/edit" element={<PrivateRoute adminOnly><ContactEditor /></PrivateRoute>} />
          <Route path="/projects/new" element={<PrivateRoute adminOnly><ProjectEditor /></PrivateRoute>} />
          <Route path="/projects/:id/edit" element={<PrivateRoute adminOnly><ProjectEditor /></PrivateRoute>} />
          <Route path="/education/new" element={<PrivateRoute adminOnly><QualificationEditor /></PrivateRoute>} />
          <Route path="/education/:id/edit" element={<PrivateRoute adminOnly><QualificationEditor /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute adminOnly><Users /></PrivateRoute>} />

          {/* Any unknown URL falls back to the Home page */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
