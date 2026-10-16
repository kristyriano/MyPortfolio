// Projects shown on the Projects page: client websites first, then software projects.
// The first two images are screenshots of the client websites; the rest are concept images.
import reposeWellnessImage from '../assets/project-repose.jpg'
import msolutionsImage from '../assets/project-msolutions.jpg'
import inventraImage from '../assets/project-inventra.jpg'
import salesSystemImage from '../assets/project-sales-system.jpg'
import deliveryAppImage from '../assets/project-delivery-app.jpg'
import cancerDetectionImage from '../assets/project-cancer-detection.jpg'

const projects = [
  {
    id: 5,
    title: 'Repose Wellness',
    date: 'Client website',
    technologies: 'Web design, SEO, branding',
    image: reposeWellnessImage,
    role: 'Web designer and developer. I designed and built an SEO-optimized website and a branding strategy for a holistic wellness business.',
    outcome: 'A seamless user experience that connects people with balance and health services.',
  },
  {
    id: 6,
    title: 'Msolutions Multiservices',
    date: 'Client website',
    technologies: 'Web development, SEO, branding',
    image: msolutionsImage,
    role: 'Web developer. I developed a user-friendly website and optimized the online presence of a renovation services company.',
    outcome: 'Stronger engagement and growth for their services through strategic branding and SEO.',
  },
  {
    id: 1,
    title: 'Inventra: AI Inventory Management System',
    date: '2026',
    technologies: 'Jira, Microsoft Visio, UML, Scrum',
    image: inventraImage,
    role: 'Requirements analyst in a Scrum team. I analyzed the software requirements and created the UML diagrams and technical documentation.',
    outcome:
      'A fully documented design for an AI-supported inventory system with stock prediction, low-stock alerts and supplier management.',
  },
  {
    id: 2,
    title: 'Sistema de Ventas (Sales System)',
    date: 'January 2023',
    technologies: 'Java, SQL',
    image: salesSystemImage,
    role: 'Designer and developer. I built an object-oriented sales system in Java connected to a SQL database that retrieves and organizes inventory and customer data.',
    outcome: 'Improved inventory accuracy by 30%.',
  },
  {
    id: 3,
    title: 'Delivery App',
    date: 'March 2023',
    technologies: 'React Native, Tailwind CSS',
    image: deliveryAppImage,
    role: 'Developer and tester. I built a delivery application with a redesigned interface and real-time updates.',
    outcome: 'Users navigate the app 20% faster with the new design.',
  },
  {
    id: 4,
    title: 'Breast Cancer Detection Model',
    date: 'October 2023',
    technologies: 'Python, Jupyter Notebook',
    image: cancerDetectionImage,
    role: 'Developer. I trained and evaluated a machine learning model that detects breast cancer from clinical data.',
    outcome: 'Reduced false positives by 15%.',
  },
]

export default projects
