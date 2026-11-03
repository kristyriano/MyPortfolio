// Material UI theme with the same colors and font as the portfolio (index.css)
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#050063' }, // navy, same as the logo
    secondary: { main: '#f26a21' }, // orange accent
    text: { primary: '#050063', secondary: '#555555' },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 6 },
})

export default theme
