import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './Context/Theme/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
