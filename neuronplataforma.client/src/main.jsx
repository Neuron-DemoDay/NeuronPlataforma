import React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorPage from "./error-page";
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
import QuizMatematica from './Pages/Materias/Matematica/QuizMatetica'
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
import Onboading from './containers/Onboarding/Onboarding'
import Aula from './containers/Aulas/VideoAulas/video-lesson'
import LoginPage from './Pages/Login/page.jsx';
import ForgotPasswordPage from './Pages/ForgotPassword/page.jsx'
import RegisterPage from './Pages/register/page.jsx'

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar />
      <main className="main-content bg-background text-foreground">
        <Header />
        <div className="content-area"><Outlet /></div>
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <Layout>
      <Dashboard />
    </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/aula",
        element: <Aula />,
        },
        {
            path: "/cronograma",
            element: <Calendar />,
            errorElement: <ErrorPage />,
        },
      {
        path: "/intercambio",
        element: <Intercambio />,
      },
      {
        path: "/aulas",
        element: <Aulas />,
      },
      // Biologia
      {
        path: "/biologia",
        element: <Biologia />,
      },
      {
        path: "/quizBiologia",
        element: <QuizBiologia />,
      },
      {
        path: "/ciclosBiologicos",
        element: <CiclosBiologicos />,
      },
      // Filosofia
      {
        path: "/filosofia",
        element: <Filosofia />,
      },
      {
        path: "/quizFilosofia",
        element: <QuizFilosofia />,
      },
      // Física
      {
        path: "/fisica",
        element: <Fisica />,
      },
      {
        path: "/quizFisica",
        element: <QuizFisica />,
      },
      // Geografia
      {
        path: "/geografia",
        element: <Geografia />,
      },
      
      {
        path: "/quizGeografia",
        element: <QuizGeografia />,
      },
      // História
      {
        path: "/historia",
        element: <Historia />,
      },
      {
        path: "/quizHistoria",
        element: <QuizHistoria />,
      },
      // Inglês
      {
        path: "/ingles",
        element: <Ingles />,
      },
      {
        path: "/quizIngles",
        element: <QuizIngles />,
      },
      {
        path: "/desembaralhe",
        element: <Desembaralhe />,
      },
      // Matemática
      {
        path: "/matematica",
        element: <Matematica />,
      },
      {
        path: "/quizMatematica",
        element: <QuizMatematica />,
      },
      {
        path: "/puzzle",
        element: <Puzzle />,
      },
      // Português
      {
        path: "/portugues",
        element: <Portugues />,
      },
      {
        path: "/quizPortugues",
       // element: <QuizPortugues />,
      },
      // Química
      {
        path: "/quimica",
        element: <Quimica />,
      },
      {
        path: "/quizQuimica",
      //  element: <QuizQuimica />,
      },
      {
        path: "/tabelaPeriodica",
        element: <TabelaPeriodica />,
      },
      // Redação
      {
        path: "/redacao",
        element: "",
      },
      {
        path: "/quizRedacao",
        element: "",
      },
      {
        path: "/Login",
        element: <LoginPage/>,
      }
    ],
    },
    {
        path: "/onboarding",
        element: <Onboading />,
        errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/ForgotPassword",
      element: <ForgotPasswordPage/>
    }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="678425612724-8p2olt0mc1gpk8hndcmr73uchdd2iacm.apps.googleusercontent.com">
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
