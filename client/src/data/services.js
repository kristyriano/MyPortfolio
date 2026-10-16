// Services offered, each one with its own image.
import webAndAppImage from '../assets/service-web-apps.jpg'
import marketingImage from '../assets/service-marketing.jpg'
import aiSalesImage from '../assets/service-ai-sales.jpg'

const services = [
  {
    id: 1,
    name: 'Full-Stack Web and App Development',
    image: webAndAppImage,
    imageDescription: 'Desk with a desktop computer, a laptop and a tablet showing websites',
    description:
      'Creation and optimization of customized web platforms using technologies like WordPress, Python, JavaScript and React Native, tailored to meet your business needs.',
  },
  {
    id: 2,
    name: 'Digital Marketing, Branding and SEO Strategy',
    image: marketingImage,
    imageDescription: 'Team reviewing marketing charts and reports around a table',
    description:
      'Comprehensive digital marketing strategies that include branding to define your business identity, SEO optimization to enhance visibility, and innovative approaches to connect with your target audience.',
  },
  {
    id: 3,
    name: 'AI Solutions for Sales Growth',
    image: aiSalesImage,
    imageDescription: 'Hand holding a phone with an AI assistant next to a book about artificial intelligence',
    description:
      'Implementation of AI tools to optimize customer interactions, automate responses and enhance sales strategies, driving higher conversion rates and personalized customer experiences.',
  },
]

export default services
