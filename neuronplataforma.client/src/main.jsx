import React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import './index.css'
import ErrorPage from "./error-page";
import { Sidebar } from './components/Sidebar/Sidebar'
import { Header } from './components/Header/Header.jsx'
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
import QuizPortugues from './Pages/Materias/Portugues/QuizPortugues'
import QuizQuimica from './Pages/Materias/Quimica/QuizQuimica'
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
import Gravidade from './Pages/Materias/Fisica/Gravidade'
import ClassesGramaticais from './Pages/Materias/Portugues/ClassesGramaticais'
import GameEras from './Pages/Materias/Historia/GameEras'
import Capitais from './Pages/Materias/Geografia/Capitais'
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

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: "/aula/:id",
        element: <ProtectedRoute><Aula /></ProtectedRoute>,
      },
      {
        path: "/intercambio",
        element: <ProtectedRoute><Intercambio /></ProtectedRoute>,
      },
      {
        path: "/aulas",
        element: <ProtectedRoute><Aulas /></ProtectedRoute>,
      },
      // Biologia
      {
        path: "/biologia",
        element: <ProtectedRoute><Biologia /></ProtectedRoute>,
      },
      {
        path: "/quizBiologia",
        element: <ProtectedRoute><QuizBiologia /></ProtectedRoute>,
      },
      {
        path: "/ciclosBiologicos",
        element: <ProtectedRoute><CiclosBiologicos /></ProtectedRoute>,
      },
      // Filosofia
      {
        path: "/filosofia",
        element: <ProtectedRoute><Filosofia /></ProtectedRoute>,
      },
      {
        path: "/quizFilosofia",
        element: <ProtectedRoute><QuizFilosofia /></ProtectedRoute>,
      },
      // Física
      {
        path: "/fisica",
        element: <ProtectedRoute><Fisica /></ProtectedRoute>,
      },
      {
        path: "/quizFisica",
        element: <QuizFisica />,
      },
      // Geografia
      {
        path: "/geografia",
        element: <ProtectedRoute><Geografia /></ProtectedRoute>,
      },
      {
        path: "/quizGeografia",
        element: <QuizGeografia />,
      },
      // História
      {
        path: "/historia",
        element: <ProtectedRoute><Historia /></ProtectedRoute>,
      },
      {
        path: "/quizHistoria",
        element: <QuizHistoria />,
      },
      // Inglês
      {
        path: "/ingles",
        element: <ProtectedRoute><Ingles /></ProtectedRoute>,
      },
      {
        path: "/quizIngles",
        element: <ProtectedRoute><QuizIngles /></ProtectedRoute>,
      },
      {
        path: "/desembaralhe",
        element: <ProtectedRoute><Desembaralhe /></ProtectedRoute>,
      },
      // Matemática
      {
        path: "/matematica",
        element: <ProtectedRoute><Matematica /></ProtectedRoute>,
      },
      {
        path: "/quizMatematica",
        element: <ProtectedRoute><QuizMatematica /></ProtectedRoute>,
      },
      {
        path: "/puzzle",
        element: <ProtectedRoute><Puzzle /></ProtectedRoute>,
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
        element: <ProtectedRoute><TabelaPeriodica /></ProtectedRoute>,
      },
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

const Root = () => (
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

