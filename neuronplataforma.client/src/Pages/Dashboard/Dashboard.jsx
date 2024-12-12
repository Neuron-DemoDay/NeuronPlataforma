import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Zap, Clock, CheckCircle, BarChart2, ListTodo, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Ui/Card"
import { Button } from "../../components/Ui/Button"
import './Dashboard.css'
import { UpcomingEvents } from '../../components/UpcomingEvents'
import { RecentPerformance } from '../../components/RecentPerformance'
import Jailson from '../../assets/img/Jailson1.jpg'

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const currentWeekProgress = ['active', 'active', 'active', 'active', 'active', 'inactive', 'inactive']

export function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [userName, setUserName] = useState('Usuário')
  const navigate = useNavigate()

  useEffect(() => {
    const storedName = localStorage.getItem('nome')
    if (storedName) {
      setUserName(storedName)
    } else {
      // Check for email as an alternative
      const storedEmail = localStorage.getItem('email')
      if (storedEmail) {
        // If email exists, use it as the username
        setUserName(storedEmail.split('@')[0]) // Use the part before @ as the name
      } else {
        // If neither name nor email is found, redirect to Login page
        navigate('/Login')
      }
    }
  }, [navigate])

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    
    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return { days, firstDayOfMonth }
  }

  const { days, firstDayOfMonth } = getDaysInMonth(currentMonth)

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  const formatMonth = (date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }

  return (
    <div className="dashboard-container bg-background text-foreground">
      <div className="dashboard-content space-y-6">
        <div className="dashboard-grid">
          <div className="dashboard-main space-y-6">
            <Card className="week-progress-card bg-card text-card-foreground">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={Jailson}
                    alt="Jailson"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-4xl font-bold">Olá {userName.includes('@') ? userName.split('@')[0] : userName}</CardTitle>
                    <p className="text-xl">Bem-vindo ao seu painel de aprendizado</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl font-semibold mb-4">Progresso Semanal</h3>
                <div className="flex justify-between">
                  {weekDays.map((day, index) => (
                    <div key={day} className="flex flex-col items-center">
                      <div className={`indicator w-8 h-8 rounded-full flex items-center justify-center ${
                        currentWeekProgress[index] === 'active' ? 'bg-green-500' : 'bg-gray-200'
                      }`}>
                        <Zap className={`h-4 w-4 ${currentWeekProgress[index] === 'active' ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <span className="mt-2 text-xs">{day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="stats-grid">
              <Card className="bg-card text-card-foreground">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Horas Estudadas</p>
                    <h3 className="text-2xl font-bold">5:30</h3>
                  </div>
                  <div className="rounded-full bg-primary/20 p-3">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tarefas Concluídas</p>
                    <h3 className="text-2xl font-bold">10</h3>
                  </div>
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pontuação Média</p>
                    <h3 className="text-2xl font-bold">50</h3>
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3">
                    <BarChart2 className="h-5 w-5 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tarefas Pendentes</p>
                    <h3 className="text-2xl font-bold">4</h3>
                  </div>
                  <div className="rounded-full bg-red-100 p-3">
                    <ListTodo className="h-5 w-5 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Continuar Assistindo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative h-24 w-40 overflow-hidden rounded-md">
                    <img 
                      src="/placeholder.svg?height=96&width=160" 
                      alt="Thumbnail da aula"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Plural de Adjetivo Composto</h3>
                    <p className="text-sm text-muted-foreground">[Professor Noslen]</p>
                    <Button className="mt-2" size="sm">Retomar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <UpcomingEvents />
              <RecentPerformance />
            </div>
          </div>

          <div className="dashboard-sidebar">
            <Card className="calendar-widget bg-card text-card-foreground">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{formatMonth(currentMonth)}</CardTitle>
                  <div className="space-x-2">
                    <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Mês anterior</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Próximo mês</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {weekDays.map(day => (
                    <div key={day} className="text-sm font-medium text-muted-foreground">{day}</div>
                  ))}
                  {[...Array(firstDayOfMonth)].map((_, index) => (
                    <div key={`empty-${index}`}></div>
                  ))}
                  {days.map(day => (
                    <div key={day} className={`rounded-full p-2 text-sm ${day === new Date().getDate() ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
                      {day}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

