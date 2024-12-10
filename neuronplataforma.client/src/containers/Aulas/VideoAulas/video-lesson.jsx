import { useState, useEffect } from 'react'
import { Bell, Home, Moon, Settings, Sun, User, BookOpen, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../../components/Ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/Ui/Tabs"
import './video-lesson.css'

export default function VideoLesson() {
  const [currentTime, setCurrentTime] = useState("04:32")
  const [activeTab, setActiveTab] = useState("notes")
  const [activeAnnotation, setActiveAnnotation] = useState("ai")
  const [darkMode, setDarkMode] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizResult, setQuizResult] = useState(null)
  
  const quizQuestions = [
    {
      id: 1,
      question: "Qual é o plural de 'azul-marinho'?",
      options: ['azuis-marinhos', 'azul-marinhos', 'azuis-marinho'],
      correctAnswer: 'azuis-marinhos'
    },
    {
      id: 2,
      question: "Como fica o plural de 'guarda-roupa'?",
      options: ['guardas-roupas', 'guarda-roupas', 'guardas-roupa'],
      correctAnswer: 'guarda-roupas'
    },
    {
      id: 3,
      question: "Qual é o plural correto de 'bem-te-vi'?",
      options: ['bem-te-vis', 'bens-te-vi', 'bens-te-vis'],
      correctAnswer: 'bem-te-vis'
    },
    {
      id: 4,
      question: "O plural de 'alto-falante' é:",
      options: ['altos-falantes', 'alto-falantes', 'altos-falante'],
      correctAnswer: 'alto-falantes'
    },
    {
      id: 5,
      question: "Como fica o plural de 'quinta-feira'?",
      options: ['quintas-feiras', 'quinta-feiras', 'quintas-feira'],
      correctAnswer: 'quintas-feiras'
    }
  ]

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleQuizSubmit = () => {
    const totalQuestions = quizQuestions.length
    const correctAnswers = quizQuestions.filter(q => quizAnswers[q.id] === q.correctAnswer).length
    const incorrectAnswers = totalQuestions - correctAnswers
    
    setQuizResult({
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      percentage: (correctAnswers / totalQuestions) * 100
    })
    
    setQuizSubmitted(true)
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sidebar"
      >
        <div className="mb-8">
          <motion.img 
            src="/placeholder.svg?height=48&width=48" 
            alt="Brain Icon" 
            className="sidebar-icon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>
        <nav className="sidebar-nav">
          <Button variant="ghost" size="icon" className="sidebar-button">
            <Home className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="sidebar-button">
            <BookOpen className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="sidebar-button">
            <Award className="w-6 h-6" />
          </Button>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <motion.header 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="header"
        >
          <h1 className="header-title">
            Plural de Adjetivo Composto
          </h1>
          <div className="header-controls">
            <span className="header-time">{currentTime}</span>
          </div>
        </motion.header>

      {/* Content */}
      <main className="main-grid">
          <div className="video-container">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="video-player"
            >
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube-nocookie.com/embed/YpPkV7Zrhb0?origin=https://your-domain.com"
                title="Aula de Português"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="dark:bg-gray-800 rounded-t-lg">
                <TabsTrigger value="notes" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Anotações</TabsTrigger>
                <TabsTrigger value="quiz" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Quiz</TabsTrigger>
              </TabsList>
              <TabsContent value="notes">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="tab-content"
                >
                  <h2 className="tab-title">Aula de português</h2>
                  <p className="tab-text">
                    Lorem ipsum dolor sit amet consectetur. Adipiscing id elit sagittis luctus commodo fames accumsan id. Praesent tincidunt turpis ipsum mattis ullamcorper sed et. Aliquam mollis condimentum pharetra elit facilisis dictum donec orci. Viverra pretium bibendum commodo augue eu.
                  </p>
                </motion.div>
              </TabsContent>
              <TabsContent value="quiz">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="tab-content"
                >
                  <h2 className="tab-title">Quiz</h2>
                  <p className="tab-text mb-4">Teste seus conhecimentos sobre o plural de adjetivos compostos:</p>
                  {quizQuestions.map((q) => (
                    <div key={q.id} className="quiz-question">
                      <p className="quiz-question-text">{q.id}. {q.question}</p>
                      <div className="quiz-options">
                        {q.options.map((option, index) => (
                          <label key={index} className="quiz-option">
                            <input 
                              type="radio" 
                              name={`q${q.id}`} 
                              value={option}
                              checked={quizAnswers[q.id] === option}
                              onChange={() => handleQuizAnswer(q.id, option)}
                              className="mr-2"
                              disabled={quizSubmitted}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  {!quizSubmitted ? (
                    <Button onClick={handleQuizSubmit} className="mt-4">Enviar Respostas</Button>
                  ) : (
                    <div className="quiz-result">
                      <h3 className="quiz-result-title">Resultado do Quiz</h3>
                      <p>Total de perguntas: {quizResult.totalQuestions}</p>
                      <p>Respostas corretas: {quizResult.correctAnswers}</p>
                      <p>Respostas incorretas: {quizResult.incorrectAnswers}</p>
                      <p>Porcentagem de acerto: {quizResult.percentage.toFixed(2)}%</p>
                      {quizResult.percentage < 60 && (
                        <p className="quiz-result-text-red">
                          Você precisa melhorar seu conhecimento sobre plurais de adjetivos compostos. Revise o material e tente novamente!
                        </p>
                      )}
                      {quizResult.percentage >= 60 && quizResult.percentage < 80 && (
                        <p className="quiz-result-text-yellow">
                          Bom trabalho! Mas ainda há espaço para melhorias. Revise os pontos que você errou e tente novamente.
                        </p>
                      )}
                      {quizResult.percentage >= 80 && (
                        <p className="quiz-result-text-green">
                          Excelente! Você demonstrou um ótimo conhecimento sobre plurais de adjetivos compostos.
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Annotations Section */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="annotations-section"
          >
            <Tabs value={activeAnnotation} onValueChange={setActiveAnnotation} className="w-full">
              <TabsList className="dark:bg-gray-800 rounded-t-lg">
                <TabsTrigger value="ai" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Anotações da IA</TabsTrigger>
                <TabsTrigger value="activities" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Para Atividades</TabsTrigger>
                <TabsTrigger value="transcript" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Transcrição</TabsTrigger>
              </TabsList>
              <TabsContent value="ai">
                <div className="space-y-4 mt-4">
                  {[1, 2, 3, 4].map((item) => (
                    <motion.div 
                      key={item}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: item * 0.1 }}
                      className="annotation-item"
                    >
                      <p className="annotation-text">
                        O português é uma língua românica que evoluiu do latim vulgar, influenciada por línguas celtas, árabes e outras línguas regionais.
                      </p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="activities">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="annotation-item mt-4"
                >
                  <h3 className="tab-title">Atividades Sugeridas</h3>
                  <ul className="list-disc pl-5 space-y-2 dark:text-gray-300">
                    <li>Crie uma lista de 10 adjetivos compostos e seus plurais</li>
                    <li>Escreva um parágrafo usando pelo menos 5 adjetivos compostos no plural</li>
                    <li>Identifique adjetivos compostos em um texto dado e explique suas formas plurais</li>
                  </ul>
                </motion.div>
              </TabsContent>
              <TabsContent value="transcript">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="annotation-item mt-4"
                >
                  <h3 className="tab-title">Transcrição da Aula</h3>
                  <p className="annotation-text">
                    Olá, pessoal! Hoje vamos falar sobre o plural de adjetivos compostos em português. 
                    Este é um tópico que muitas vezes causa confusão, mas com algumas regras simples, 
                    vocês verão que não é tão complicado quanto parece...
                  </p>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

