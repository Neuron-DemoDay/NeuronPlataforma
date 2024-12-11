'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plane, GraduationCap, Globe, BookOpen, Brain, FileText, LineChartIcon as ChartLine, Users } from 'lucide-react'
import { Navbar } from "@/components/Navbar"
import { useTheme } from "@/components/ThemeContext"

export default function Exchange() {
  const { isDarkMode } = useTheme()

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/clouds.svg')] opacity-20 animate-float"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Descubra Oportunidades de Intercâmbio Global
              </h1>
              <p className="text-lg opacity-90">
                Descubra a plataforma Neuron e realize seu sonho de intercâmbio! Com suporte na criação de cartas de apresentação,
                você se destacará no processo. A IA conecta você a bolsas de estudo personalizadas, preparando-o para uma experiência
                internacional enriquecedora.
              </p>
              <Button size="lg" variant="secondary" className="animate-bounce">
                Saiba mais
              </Button>
            </div>
            <div className="relative h-[400px] transform transition-transform hover:scale-105">
              <Image
                src="/student-3d.svg"
                alt="Student with suitcase"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">COMO FUNCIONA?</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Os intercâmbios acontecem como parte do processo de preparação dos alunos
              durante o ensino médio. Através de uma abordagem que combina o plano de
              estudos personalizado e suporte, os estudantes têm acesso a ferramentas que os
              capacitam a melhorar seu desempenho acadêmico. Enquanto se preparam,
              podem participar de atividades que fortalecem seu histórico escolar e suas
              habilidades, aumentando as chances de serem aceitos em programas de
              intercâmbio.
            </p>
          </div>
        </div>
      </section>

      {/* Global Opportunities Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-red-200 bg-white dark:bg-gray-800">
              <div className="text-center space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Oportunidades de Intercâmbio ao redor do mundo
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Nosso site oferece preparação para intercâmbios estudantis e sugere diversos modelos de intercâmbio ao
                  redor do mundo. Explore as opções e prepare-se para uma experiência enriquecedora!
                </p>
                <div className="relative w-48 h-48 mx-auto transform transition-transform hover:scale-110">
                  <Image
                    src="/globe-illustration.svg"
                    alt="Global Opportunities"
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Descubra Oportunidades em Diferentes Países
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: GraduationCap, text: "Programas de Estudo" },
                    { icon: Globe, text: "Graduações" },
                    { icon: BookOpen, text: "Programas de Voluntariado" },
                    { icon: Users, text: "Experiências em Idiomas" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group p-4 bg-blue-500 dark:bg-blue-600 rounded-full aspect-square flex flex-col items-center justify-center text-white cursor-pointer transform transition-all hover:scale-105 hover:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      <item.icon className="w-8 h-8 mb-2" />
                      <span className="text-xs text-center">{item.text}</span>
                    </div>
                  ))}
                </div>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Acesse já
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Como um Ensino Médio Sólido Abre Portas para Oportunidades Internacionais
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Conheça histórias inspiradoras de pessoas que, com uma sólida formação
            acadêmica, conseguiram oportunidades únicas ao redor do mundo.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Leonardo Souza",
                image: "/student1.jpg",
                story: "Meu desempenho no ensino médio abriu portas para oportunidades únicas, que fui aproveitando sempre, ajudando-me a realizar meu sonho."
              },
              {
                name: "Julia Mendes",
                image: "/student2.jpg",
                story: "Sempre tive bom desempenho escolar e a Neuron teve o papel fundamental em me preparar especialmente para essa experiência."
              },
              {
                name: "Caio Machado",
                image: "/student3.jpg",
                story: "Vi excelente desempenho no ensino médio me possibilitar uma vida internacional, proporcionando uma visão diferente do mundo."
              }
            ].map((story, index) => (
              <Card
                key={index}
                className="p-6 bg-purple-50 dark:bg-purple-900 transform transition-all hover:scale-105 hover:shadow-lg"
              >
                <div className="text-center space-y-4">
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{story.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{story.story}</p>
                  <Button variant="link" className="text-purple-600 dark:text-purple-400">
                    Conheça melhor a história
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-blue-50 dark:bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Como nossa IA Potencializa seu caminho para o Intercâmbio
              </h2>
              <div className="space-y-4">
                {[
                  "Oferece suporte personalizado em várias etapas.",
                  "Ajuda a identificar oportunidades alinhadas ao perfil do aluno",
                  "Sugere bolsas de estudo",
                  "Orienta na elaboração de cartas de apresentação (cover letters)",
                  "Monitora o progresso do estudante",
                  "Ajusta as recomendações de conteúdos com base no desempenho do usuário e muito mais"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] transform transition-transform hover:scale-105">
              <Image
                src="/ai-assistant.svg"
                alt="AI Assistant"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-100 dark:bg-red-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Realize seu sonho de Intercâmbio através dos seus estudos
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Use seu desempenho no ensino médio a seu favor e transforme
              seu sonho de intercâmbio em realidade. Com o Neuron, você terá
              o suporte necessário para identificar as melhores oportunidades,
              garantir bolsas de estudo e se preparar para essa experiência
              enriquecedora.
            </p>
            <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
              Comece agora!
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-bold">Neuron</h4>
              <p className="text-sm text-gray-400">
                Transformando a educação através da tecnologia e oportunidades globais.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Recursos</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Plataforma de Estudos</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Simulados Online</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Videoaulas</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Material Didático</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Suporte</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Central de Ajuda</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Comunidade</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Tutoriais</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Newsletter</h4>
              <p className="text-sm text-gray-400">Receba novidades e dicas de estudo</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <Input type="email" placeholder="Seu e-mail" className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Inscrever</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2024 Neuron. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

