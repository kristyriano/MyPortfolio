// Entry point: mounts the React app into the #root element of index.html
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import App from './App.jsx'
import theme from './theme.js'
import { AuthProvider } from './auth/AuthContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables navigation between pages without reloading the site */}
    <BrowserRouter>
      {/* ThemeProvider: Material UI styling. AuthProvider: signed-in user state for the whole app */}
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
