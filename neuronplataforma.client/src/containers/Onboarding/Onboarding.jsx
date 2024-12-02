import { useState } from 'react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import Summary from './Summary';
import "./Onboarding.css"

const questions = [
    {
        id: 1,
        question: "Qual é o seu nível atual de conhecimento nas matérias que deseja estudar?",
        type: "singleChoice",
        options: ["Iniciante", "Intermediário", "Avançado"],
      },
      {
        id: 2,
        question: "Quantas horas por semana você pode dedicar aos estudos?",
        type: "singleChoice",
        options: ["1-5 horas", "6-10 horas", "11-15 horas", "Mais de 15 horas"],
      },
      {
        id: 3,
        question: "Quais matérias ou áreas você gostaria de estudar?",
        type: "multiChoice",
        options: ["Matemática", "Física", "Química", "Biologia"],
      },
      {
        id: 4,
        question: "Você prefere estudar mais em quais dias da semana?",
        type: "multiChoice",
        options: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
      },
      {
        id: 5,
        question: "Você prefere estudar em qual horário?",
        type: "singleChoice",
        options: ["Manhã", "Tarde", "Noite", "Não tenho preferência"],
      },
      {
        id: 6,
        question: "Qual é o seu objetivo com o estudo?",
        type: "singleChoice",
        options: ["Melhorar notas", "Preparação para provas/exames", "Desenvolvimento pessoal", "Outro (descrever)"],
      },
      {
        id: 7,
        question: "Qual o seu estilo de aprendizagem preferido?",
        type: "singleChoice",
        options: ["Visual (vídeos, gráficos)", "Auditivo (podcasts, áudios)", "Prático (exercícios, simulações)", "Leitura/escrita (textos, resumos)"],
      },
      {
        id: 8,
        question: "Quanto tempo você gostaria de dedicar por sessão de estudo?",
        type: "singleChoice",
        options: ["15-30 minutos", "30-60 minutos", "1-2 horas", "Mais de 2 horas"],
      },
      {
        id: 9,
        question: "Você prefere revisar conteúdos antes de avançar ou seguir para novos temas?",
        type: "singleChoice",
        options: ["Revisar", "Avançar"],
      },
      {
        id: 10,
        question: "Até quando deseja utilizar a plataforma?",
        type: "datePicker",
      },
]

function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState({});
    const [isSummary, setIsSummary] = useState(false);

    const handleNext = (answer) => {
        setResponses({ ...responses, [questions[currentStep].id]: answer });
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsSummary(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleEdit = (questionId) => {
        setCurrentStep(questions.findIndex((q) => q.id === questionId));
        setIsSummary(false);
    };

    const handleFinish = () => {
        console.log("Onboarding concluído com respostas:", responses);
    };

    if (isSummary) {
        return <Summary responses={responses} onEdit={handleEdit} onFinish={handleFinish} />;
    }

    return (
      <div className="onboarding-wrapper">
      <div className="onboarding-container">
        {/* Barra de progresso */}
        <ProgressBar current={currentStep} total={questions.length} />

        {/* Título da pergunta */}
        <h2 className="onboarding-title">{questions[currentStep].question}</h2>

        {/* Opções da pergunta */}
        <div className="options-grid">
          {questions[currentStep].options.map((option, index) => (
            <button
              key={index}
              className="option"
              onClick={() => handleNext(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Botões de navegação */}
        <div className="navigation-buttons">
          {currentStep > 0 && (
            <button className="back-button" onClick={handleBack}>
              Voltar
            </button>
          )}
        </div>
      </div>
    </div>
    );
}

export default Onboarding
