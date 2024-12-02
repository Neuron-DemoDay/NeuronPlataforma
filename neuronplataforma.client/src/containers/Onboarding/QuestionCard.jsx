import { useState } from "react"

function QuestionCard({ questionData, onNext, onBack }) {
  // Inicializa o estado com segurança
  const [answer, setAnswer] = useState(
    questionData?.type === "multiChoice" ? [] : null
  );

  const handleAnswer = (option) => {
    if (questionData?.type === "multiChoice") {
      setAnswer((prev) =>
        prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
      );
    } else {
      setAnswer(option);
    }
  };

  const handleSubmit = () => {
    onNext(answer);
  };

  if (!questionData) {
    return <div>Carregando pergunta...</div>; // Proteção contra `undefined`
  }

  return (
    <div className="question-card">
      <h2>{questionData.question || "Pergunta não definida"}</h2>
      <div className="options">
        {questionData.options?.length > 0 ? (
          questionData.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className={
                questionData.type === "multiChoice"
                  ? answer.includes(option)
                    ? "selected"
                    : ""
                  : answer === option
                  ? "selected"
                  : ""
              }
            >
              {option}
            </button>
          ))
        ) : questionData.type === "datePicker" ? (
          <input type="date" onChange={(e) => setAnswer(e.target.value)} />
        ) : (
          <p>Sem opções disponíveis.</p>
        )}
      </div>
      <div className="controls">
        <button onClick={onBack}>Voltar</button>
        <button onClick={handleSubmit} disabled={!answer}>
          Próximo
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
