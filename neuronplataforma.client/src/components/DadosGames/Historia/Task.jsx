// src/components/Task.jsx
import React, { useState } from 'react';
import './task.css';

export const Task = ({ task, onComplete }) => {
  const [completed, setCompleted] = useState(false);
  const [attempt, setAttempt] = useState('');

  const options = [
    { choice: 'Escrever o decreto corretamente', correct: true },
    { choice: 'Ignorar o decreto', correct: false },
    { choice: 'Fazer uma interpretação errada', correct: false }
  ];

  const handleChoice = (correct) => {
    if (correct) {
      setCompleted(true);
      onComplete();
    } else {
      setAttempt('Resposta incorreta. Tente novamente!');
    }
  };

  return (
    <div className="task">
      {completed ? (
        <p>Tarefa Completa! 🎉</p>
      ) : (
        <div>
          <p>{task}</p>
          <p>Escolha a ação correta para completar a tarefa:</p>
          {options.map((option, index) => (
            <button className='interacao-task' key={index} onClick={() => handleChoice(option.correct)}>
              {option.choice}
            </button>
          ))}
          <p className="attempt">{attempt}</p>
        </div>
      )}
    </div>
  );
}