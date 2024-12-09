import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Target, BookOpen, Timer, ArrowRight, ArrowLeft, Video, Brain, Book, Clock4, Sun, Sunset, Moon, HelpCircle, GraduationCap, Lightbulb, Pencil, Headphones, Dumbbell, Newspaper } from 'lucide-react'

const questions = [
  {
    id: 'preferredTime',
    question: 'Você prefere estudar em qual horário?',
    icon: <Clock className="w-6 h-6" />,
    options: [
      { id: 'manha', label: 'Manhã', icon: <Sun className="w-6 h-6" /> },
      { id: 'tarde', label: 'Tarde', icon: <Sunset className="w-6 h-6" /> },
      { id: 'noite', label: 'Noite', icon: <Moon className="w-6 h-6" /> },
      { id: 'sem_preferencia', label: 'Não tenho preferência', icon: <HelpCircle className="w-6 h-6" /> }
    ]
  },
  {
    id: 'studyGoal',
    question: 'Qual é o seu objetivo com o estudo?',
    icon: <Target className="w-6 h-6" />,
    options: [
      { id: 'melhorar_notas', label: 'Melhorar notas', icon: <GraduationCap className="w-6 h-6" /> },
      { id: 'preparacao_provas', label: 'Preparação para provas/exames', icon: <Book className="w-6 h-6" /> },
      { id: 'desenvolvimento_pessoal', label: 'Desenvolvimento pessoal', icon: <Lightbulb className="w-6 h-6" /> },
      { id: 'outro', label: 'Outro', icon: <Pencil className="w-6 h-6" /> }
    ]
  },
  {
    id: 'learningStyle',
    question: 'Qual o seu estilo de aprendizagem preferido?',
    icon: <BookOpen className="w-6 h-6" />,
    options: [
      { id: 'visual', label: 'Visual (vídeos, gráficos)', icon: <Video className="w-6 h-6" /> },
      { id: 'auditivo', label: 'Auditivo (podcasts, áudios)', icon: <Headphones className="w-6 h-6" /> },
      { id: 'pratico', label: 'Prático (exercícios, simulações)', icon: <Dumbbell className="w-6 h-6" /> },
      { id: 'leituraEscrita', label: 'Leitura/escrita (textos, resumos)', icon: <Newspaper className="w-6 h-6" /> }
    ]
  },
  {
    id: 'studySessionDuration',
    question: 'Quanto tempo você gostaria de dedicar por sessão de estudo?',
    icon: <Timer className="w-6 h-6" />,
    options: [
      { id: '15_30_min', label: '15-30 minutos', icon: <Timer className="w-6 h-6" /> },
      { id: '30_60_min', label: '30-60 minutos', icon: <Timer className="w-6 h-6" /> },
      { id: '1_2_horas', label: '1-2 horas', icon: <Timer className="w-6 h-6" /> },
      { id: 'mais_2_horas', label: 'Mais de 2 horas', icon: <Timer className="w-6 h-6" /> }
    ]
  },
  {
    id: 'studyPreference',
    question: 'Você prefere revisar conteúdos antes de avançar ou seguir para novos temas?',
    icon: <ArrowRight className="w-6 h-6" />,
    options: [
      { id: 'revisar', label: 'Revisar', icon: <ArrowLeft className="w-6 h-6" /> },
      { id: 'avancar', label: 'Avançar', icon: <ArrowRight className="w-6 h-6" /> }
    ]
  }
]

function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [otherReason, setOtherReason] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const handleAnswer = (questionId, answerId) => {
    const newAnswers = { ...answers, [questionId]: answerId }
    setAnswers(newAnswers)
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else if (answerId === 'avancar') {
      setIsComplete(true)
      console.log('Respostas:', newAnswers)
    }
  }

  const handleReview = () => {
    setCurrentStep(0)
    setAnswers({})
    setOtherReason('')
  }

  const currentQuestion = questions[currentStep]

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1519]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-8"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#58CC02]"
              initial={{ width: 0 }}
              animate={{ width: currentStep === questions.length - 1 ? '100%' : `${(currentStep / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {!isComplete ? (
          <>
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center mb-6">
                {currentQuestion.icon}
                <h2 className="text-2xl font-bold ml-3 text-white">{currentQuestion.question}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(currentQuestion.id, option.id)}
                    className="w-full p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors duration-200 flex items-center space-x-4 border border-gray-700"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg">
                      {option.icon}
                    </div>
                    <span className="text-lg text-white">{option.label}</span>
                  </motion.button>
                ))}
              </div>

              {currentQuestion.id === 'studyGoal' && answers.studyGoal === 'outro' && (
                <motion.input
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  type="text"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Descreva seu objetivo"
                  className="w-full mt-4 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#58CC02]"
                />
              )}
            </motion.div>

            {currentStep === questions.length - 1 && (
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReview}
                  className="flex-1 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Revisar</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(currentQuestion.id, 'avancar')}
                  className="flex-1 py-3 bg-[#58CC02] text-white rounded-xl hover:bg-[#4CAF00] transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Avançar</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Obrigado por completar o onboarding!</h2>
            <p className="text-gray-400">Suas respostas foram registradas com sucesso.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default OnboardingForm

