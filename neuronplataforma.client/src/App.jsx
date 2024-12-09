import { ThemeProvider, useTheme } from './Contexts/ThemeContext'
import './App.css'

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <h1>ddsdsd</h1>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App;

