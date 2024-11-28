import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import './index.css'

import Onboarding from './containers/Onboarding/Onboarding';

import Login from "./containers/Auth/Login/Login";
import Cadastro from "./containers/Auth/Cadastro/Cadastro";
import NovaSenha from "./containers/Auth/NovaSenha/NovaSenha";
import RecuperarSenha from "./containers/Auth/RecuperarSenha/Recu";
import CodigoSenha from "./containers/Auth/CodigoSenha/Codigo";

import ErrorPage from "./error-page";
import Dashboard from './containers/Dashboard/Dashboard'

import Calendar from './containers/Cronograma/Calendar'
import Aulas from './containers/Aulas/Materias'
import Intercambio from './containers/Intercâmbio/Intercambio'
import Apps from './containers/Apps/Apps'
import Materias from './containers/Aulas/Materias'
import Games from './containers/Games/Games'

import SideBar from './components/SideBar/SideBar'

import Quimica from './containers/Aulas/Materias/Quimica/Quimica'
import QuimicaQuiz from './containers/Aulas/Materias/Quimica/Game/QuizQuimica/QuimicaQuiz'
import TabelaPeriodica from './containers/Aulas/Materias/Quimica/Game/Tabela Periodica/TabelaPeriodica';

import Fisica from './containers/Aulas/Materias/Fisica/Fisica'
import QuizFisica from './containers/Aulas/Materias/Fisica/Games/QuizFisica'

import Biologia from './containers/Aulas/Materias/Biologia/Biologia'
import QuizBiologia from './containers/Aulas/Materias/Biologia/Games/QuizBiologia'
import JogoDePalavras from './containers/Aulas/Materias/Biologia/Games/PalavrasBiologia'

import Matematica from './containers/Aulas/Materias/Matematica/Matematica'
import QuizMatematica from './containers/Aulas/Materias/Matematica/Games/QuizMatematica'
import Puzzle from './containers/Aulas/Materias/Matematica/Games/PuzzleMatematica'

import Historia from './containers/Aulas/Materias/Historia/Historia'
import QuizHistoria from './containers/Aulas/Materias/Historia/Games/QuizHistoria'

import Geografia from './containers/Aulas/Materias/Geografia/Geografia'
import QuizGeografia from './containers/Aulas/Materias/Geografia/Games/QuizGeografia'

import Filosofia from './containers/Aulas/Materias/Filosofia/Filosofia'
import QuizFilosofia from './containers/Aulas/Materias/Filosofia/Games/QuizFilosofia'

import Portugues from './containers/Aulas/Materias/Portugues/Portugues'
import QuizPortugues from './containers/Aulas/Materias/Portugues/Games/PortuguesQuiz/QuizPortugues'

import Ingles from './containers/Aulas/Materias/Ingles/Ingles'
import QuizIngles from './containers/Aulas/Materias/Ingles/Games/QuizIngles'

import Redacao from './containers/Aulas/Materias/Redacao/Redacao'
import QuizRedacao from './containers/Aulas/Materias/Redacao/Games/QuizRedação'
import QuizTranscricao from './components/Jogos/QuizTranscricao';

const router = createBrowserRouter([
    {
    path: "/",
    element: <SideBar/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        },
      {
        path: "/cronograma",
        element: <Calendar />,
      },
      {
        path: "/Materias",
        element: <Materias />,
      },
      {
        path: "/Games",
        element: <Games />,
      },
      {
        path: "/QuizMateriaAtual",
        element: <QuizTranscricao />,
      },
      {
        path: "/Intercambios",
        element: <Intercambio />,
      },
      {
        path: "/Apps",
        element: <Apps />,
      },
      // QUIMICA
      {
        path: '/Quimica',
        element: <Quimica />,
      },
      {
        path: "/TabelaPeriodica",
        element: <TabelaPeriodica />,
      },
      {
        path: "/QuizQuimica",
        element: <QuimicaQuiz />,
      },
      // FISICA
      {
        path: "/Fisica",
        element: <Fisica />,
      },
      {
        path: "/QuizFisica",
        element: <QuizFisica />,
      },
      // BIOLOGIA
      {
        path: "/Biologia",
        element: <Biologia />,
      },
      {
        path: "/AcessoAulas/Biologia",
        element: <Aulas/>
      },
      {
        path: "/QuizBiologia",
        element: <QuizBiologia />,
      },
      {
        path: "/PalavrasBiologia",
        element: <JogoDePalavras />,
      },
      // MATEMATICA
      {
        path: "/Matematica",
        element: <Matematica />,
      },
      {
        path: "/QuizMatematica",
        element: <QuizMatematica />,
      },
      {
        path: "/Puzzle",
        element: <Puzzle />,
      },
      // HISTORIA
      {
        path: "//Historia",
        element: <Historia />,
      },
      {
        path: "/QuizHistoria",
        element: <QuizHistoria />,
      },
      // GEOGRAFIA
      {
        path: "/Geografia",
        element: <Geografia />,
      },
      {
        path: "/QuizGeografia",
        element: <QuizGeografia />,
      },
      // FILOSOFIA
      {
        path: "/Filosofia",
        element: <Filosofia />,
      },
      {
        path: "/QuizFilosofia",
        element: <QuizFilosofia />,
      },
      // PORTUGUES
      {
        path: "/Portugues",
        element: <Portugues />,
      },
      {
        path: "/QuizPortugues",
        element: <QuizPortugues />,
      },
      // INGLES
      {
        path: "/Ingles",
        element: <Ingles />,
      },
      {
        path: "/QuizIngles",
        element: <QuizIngles />,
      },
      // REDACAO
      {
        path: "/Redacao",
        element: <Redacao />,
      },
      {
        path: "/QuizRedacao",
        element: <QuizRedacao />,
      },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/cadastro",
        element: <Cadastro />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/recuperar-senha",
        element: <RecuperarSenha />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/nova-senha",
        element: <NovaSenha />,
        errorElement: <ErrorPage />,
    },
    {
      path: "/onboarding",
      element: <Onboarding />,
      errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
