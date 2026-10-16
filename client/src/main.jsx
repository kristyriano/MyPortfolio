// Entry point: mounts the React app into the #root element of index.html
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables navigation between pages without reloading the site */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
