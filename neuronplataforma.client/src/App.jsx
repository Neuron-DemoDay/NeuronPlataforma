<<<<<<< HEAD
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

=======

import Cronograma from "./containers/Cronograma/Cronograma"
import Dashboard from "./containers/Dashboard/Dashboard"
import Aulas from "./containers/Aulas/Aulas"
import Intercambio from "./containers/Intercâmbio/Intercambio"
import './index.css'


function App() {
}

export default App
>>>>>>> 73b51b75993fe8f92fd706fe2b58ffca7a49f05a
