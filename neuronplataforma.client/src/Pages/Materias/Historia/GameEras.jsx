import React, { useState } from 'react';
import TimeMachine from '../../../components/DadosGames/Historia/TimeMachine';
import EraComponent from '../../../components/DadosGames/Historia/Era';
import './GameEras.css';

export default function GameEras() {
  const [era, setEra] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState(false);


  // Informações das eras com tarefas e explicações
  const eras = {
    "Idade Média": {
      task: "Qual foi o principal evento da Idade Média?",
      options: [
        { choice: "Invenção da imprensa", explanation: "A invenção da imprensa, por Gutenberg, revolucionou a comunicação e a disseminação de informações na Idade Média." },
        { choice: "Revolução Industrial", explanation: "A Revolução Industrial ocorreu após a Idade Média, mudando o panorama econômico e social do mundo." },
        { choice: "Cruzadas", explanation: "As Cruzadas foram importantes conflitos militares durante a Idade Média, com grande impacto na Europa." }
      ]
    },
    "Renascimento": {
      task: "Quem foi um dos maiores artistas do Renascimento?",
      options: [
        { choice: "Leonardo da Vinci", explanation: "Leonardo da Vinci foi um dos artistas mais notáveis do Renascimento, famoso por obras como 'A Mona Lisa'." },
        { choice: "Pablo Picasso", explanation: "Pablo Picasso foi um artista do século 20, não do Renascimento." },
        { choice: "Vincent van Gogh", explanation: "Van Gogh foi um pintor do século 19, anterior ao Renascimento." }
      ]
    },
    "Antigo Egito": {
      task: "Qual era a principal construção dos egípcios antigos?",
      options: [
        { choice: "Pirâmides", explanation: "As pirâmides eram tumbas monumentais, com destaque para a Grande Pirâmide de Gizé." },
        { choice: "Coliseu", explanation: "O Coliseu é um monumento romano, não egípcio." },
        { choice: "Muralhas da China", explanation: "As muralhas da China são estruturas relacionadas à China, não ao Egito." }
      ]
    }
  };

  const selectEra = (era) => {
    setEra(era);
    setTaskCompleted(false);
  };

  const completeTask = () => {
    setTaskCompleted(true);
  };

  const getEraDetails = () => {
    return eras[era];
  };

  const tryAgain = () =>{
    taskCompleted(false)
  }

  return (
    <div className="Eras">
      <div className="App-Eras">
        {!era && <TimeMachine selectEra={selectEra} />}
        {era && !taskCompleted && (
          <EraComponent
            era={era}
            task={getEraDetails().task}
            options={getEraDetails().options}
            completeTask={completeTask}
          />
        )}
        {taskCompleted && (
          <div>
            <p>Parabéns! Você completou a tarefa na era do {era}!</p>
            <button className='interacao-eras' onClick={() => setEra(null)}>Jogar novamente</button>
          </div>
        )}
      </div>
    </div>
  );
}