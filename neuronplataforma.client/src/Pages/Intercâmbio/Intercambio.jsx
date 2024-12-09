import React from 'react'
import { HelpCircle, GraduationCap, Globe, Stamp, Book } from 'lucide-react'
import './Intercambio.css'

const journeySteps = [
  {
    icon: HelpCircle,
    title: "Como funciona?",
    color: "bg-pink-100/10",
    iconColor: "text-pink-300"
  },
  {
    icon: GraduationCap,
    title: "Bolsas universidades e cursos",
    color: "bg-purple-100/10",
    iconColor: "text-purple-300"
  },
  {
    icon: Globe,
    title: "Cidades e planejamento",
    color: "bg-blue-100/10",
    iconColor: "text-blue-300"
  },
  {
    icon: Stamp,
    title: "Solicitação de visto Adaptação",
    color: "bg-green-100/10",
    iconColor: "text-green-300"
  },
  {
    icon: Book,
    title: "Material Extra",
    color: "bg-yellow-100/10",
    iconColor: "text-yellow-300"
  }
]

export function Intercambio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-[#87CEEB] py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-[#1a365d] mb-6">
          INTERCÂMBIOS NA ESPANHA FEITOS PARA VOCÊ!
        </h1>
        <div className="max-w-4xl mx-auto bg-white/90 p-6 rounded-xl shadow-lg">
          <p className="text-lg text-gray-800">
            Suas notas no ensino médio são o passaporte para universidades
            espanholas incríveis. Cresça pessoalmente e profissionalmente,
            explorando a rica cultura ibérica!
          </p>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          INICIE AGORA SUA JORNADA NA ESPANHA
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {journeySteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-4 transition-transform hover:scale-110`}>
                <step.icon className={`w-8 h-8 ${step.iconColor}`} />
              </div>
              <p className="text-sm font-medium text-foreground">{step.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

