// Optional: copies the projects and education of Assignment 1 into MongoDB,
// so the Projects and Education pages start with my real portfolio content.
// Run it once from the project root with:  npm run seed-portfolio
// It only adds records when the collection is empty, so it never creates duplicates.
import mongoose from 'mongoose'
import config from '../../config/config.js'
import Project from '../models/project.model.js'
import Qualification from '../models/qualification.model.js'

const owner = { firstname: 'Kristy', lastname: 'Riano', email: 'nataripa@gmail.com' }

const projects = [
  {
    title: 'Repose Wellness',
    description:
      'Client website. Web designer and developer: I designed and built an SEO-optimized website and a branding strategy for a holistic wellness business. Outcome: a seamless user experience that connects people with balance and health services.',
  },
  {
    title: 'Msolutions Multiservices',
    description:
      'Client website. Web developer: I developed a user-friendly website and optimized the online presence of a renovation services company. Outcome: stronger engagement and growth through strategic branding and SEO.',
  },
  {
    title: 'Inventra: AI Inventory Management System',
    description:
      'Jira, Microsoft Visio, UML, Scrum. Requirements analyst in a Scrum team: I analyzed the software requirements and created the UML diagrams and technical documentation for an AI-supported inventory system.',
  },
  {
    title: 'Sistema de Ventas (Sales System)',
    completion: '2023-01-15',
    description:
      'Java, SQL. Designer and developer: I built an object-oriented sales system in Java connected to a SQL database. Outcome: improved inventory accuracy by 30%.',
  },
  {
    title: 'Delivery App',
    completion: '2023-03-15',
    description:
      'React Native, Tailwind CSS. Developer and tester: I built a delivery application with a redesigned interface and real-time updates. Outcome: users navigate the app 20% faster.',
  },
  {
    title: 'Breast Cancer Detection Model',
    completion: '2023-10-15',
    description:
      'Python, Jupyter Notebook. Developer: I trained and evaluated a machine learning model that detects breast cancer from clinical data. Outcome: reduced false positives by 15%.',
  },
]

const qualifications = [
  {
    title: 'Advanced Diploma, Software Engineering Technology – Artificial Intelligence (Co-op)',
    description:
      'Centennial College, Toronto, Canada. 2026 – Present (expected graduation: 2028). Courses: Web Application Development, Software Engineering, Software Fundamentals, Database Design and SQL, Linux/Unix Systems, AI Models Design.',
  },
  {
    title: 'Diploma, Technology in Information Systems Analysis and Development',
    description: 'SENA (National Service of Learning), Bucaramanga, Colombia. 2021 – 2023.',
  },
]

const seedPortfolio = async () => {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('Connected to the database!')

    if ((await Project.countDocuments()) === 0) {
      await Project.insertMany(projects.map((project) => ({ ...owner, ...project })))
      console.log(`${projects.length} projects added.`)
    } else {
      console.log('The projects collection already has data. Nothing added.')
    }

    if ((await Qualification.countDocuments()) === 0) {
      await Qualification.insertMany(qualifications.map((item) => ({ ...owner, ...item })))
      console.log(`${qualifications.length} qualifications added.`)
    } else {
      console.log('The qualifications collection already has data. Nothing added.')
    }
  } catch (err) {
    console.error('Could not seed the portfolio:', err.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedPortfolio()
