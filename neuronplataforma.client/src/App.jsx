import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Header } from './components/Header/Header'
import { Intercambio } from './Pages/Intercâmbio/Intercambio'
import { Dashboard } from './Pages/Dashboard/Dashboard'
import { Aulas } from './Pages/Aulas/Aulas'
import { ThemeProvider, useTheme } from './Contexts/ThemeContext'
import './App.css'
import Biologia from './Pages/Materias/Biologia/Biologia'
import QuizBiologia from './Pages/Materias/Biologia/QuizBiologia'
import CiclosBiologicos from './Pages/Materias/Biologia/CiclosBiologicos'
import QuizFilosofia from './Pages/Materias/Filosofia/QuizFilosofia'
import QuizFisica from './Pages/Materias/Fisica/QuizFisica'
import QuizGeografia from './Pages/Materias/Geografia/QuizGeografia'
import QuizHistoria from './Pages/Materias/Historia/QuizHistoria'
import QuizIngles from './Pages/Materias/Ingles/QuizIngles'
import QuizMatematica from './Pages/Materias/Matematica/QuizMa'
import Filosofia from './Pages/Materias/Filosofia/Filosofia'
import Desembaralhe from './Pages/Materias/Ingles/Desembaralhe'
import Ingles from './Pages/Materias/Ingles/Ingles'
import Historia from './Pages/Materias/Historia/Historia'
import Geografia from './Pages/Materias/Geografia/Geografia'
import Fisica from './Pages/Materias/Fisica/Fisica'
import Matematica from './Pages/Materias/Matematica/Matematica'
import Portugues from './Pages/Materias/Portugues/Portugues'
import Quimica from './Pages/Materias/Quimica/Quimica'
import Puzzle from './Pages/Materias/Matematica/Puzzle'
import TabelaPeriodica from './Pages/Materias/Quimica/TabelaPeriodica'

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
        <Sidebar />
        <main className="main-content bg-background text-foreground">
          <Header />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/intercambio" element={<Intercambio />} />
              <Route path="/aulas" element={<Aulas />} />
              {/* Biologia */}
              <Route path="/biologia" element={<Biologia />} />
              <Route path="/quizBiologia" element={<QuizBiologia />} />
              <Route path="/ciclosBiologicos" element={<CiclosBiologicos />} />
              {/* Filosofia */}
              <Route path="/filosofia" element={<Filosofia />} />
              <Route path="/quizFilosofia" element={<QuizFilosofia />} />
              {/* Fisica */}
              <Route path="/fisica" element={<Fisica />} />
              <Route path="/quizFisica" element={<QuizFisica />} />
              {/* Geografia */}
              <Route path="/geografia" element={<Geografia />} />
              <Route path="/quizGeografia" element={<QuizGeografia />} />
              {/* Historia */}
              <Route path="/historia" element={<Historia />} />
              <Route path="/quizHistoria" element={<QuizHistoria />} />
              {/* Ingles */}
              <Route path="/ingles" element={<Ingles />} />
              <Route path="/quizIngles" element={<QuizIngles />} />
              <Route path="/desembaralhe" element={<Desembaralhe />} />
              {/* Matematica */}
              <Route path="/matematica" element={<Matematica />} />
              <Route path="/quizMatematica" element={<QuizMatematica />} />
              <Route path="/puzzle" element={<Puzzle />} />
              {/* Portugues */}
              <Route path="/portugues" element={<Portugues />} />
              <Route path="/quizPortugues" element={<QuizPortugues />} />
              {/* Quimica */}
              <Route path="/quimica" element={<Quimica />} />
              <Route path="/quizQuimica" element={<QuizQuimica />} />
              <Route path="/tabelaPeriodica" element={<TabelaPeriodica />} />
              {/* Redação */}
              <Route path="/redacao" element={''} />
              <Route path="/quizRedacao" element={''} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
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

