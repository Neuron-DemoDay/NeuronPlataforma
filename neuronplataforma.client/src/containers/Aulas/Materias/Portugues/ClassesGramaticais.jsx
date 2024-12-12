import React, { useState, useEffect } from 'react';
import './ClassesGramaticais.css';

// Lista de palavras com suas classes gramaticais
const palavras = [
  { palavra: "correr", classe: "verbo" },
  { palavra: "feliz", classe: "adjetivo" },
  { palavra: "cachorro", classe: "substantivo" },
  { palavra: "inteligente", classe: "adjetivo" },
  { palavra: "amigos", classe: "substantivo" },
  { palavra: "estudar", classe: "verbo" },
  { palavra: "rápido", classe: "adjetivo" },
  { palavra: "livro", classe: "substantivo" },
  { palavra: "brincar", classe: "verbo" },
  { palavra: "menino", classe: "substantivo" },
  { palavra: "dançar", classe: "verbo" },
  { palavra: "belo", classe: "adjetivo" },
];

const classesGramaticais = ["verbo", "adjetivo", "substantivo"];

export default function ClassesGramaticais() {
  const [palavraAtual, setPalavraAtual] = useState(null);
  const [resposta, setResposta] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameOver) {
      const palavra = palavras[Math.floor(Math.random() * palavras.length)];
      setPalavraAtual(palavra);
    }
  }, [score, gameOver]);

  const verificarResposta = (classeEscolhida) => {
    if (classeEscolhida === palavraAtual.classe) {
      setFeedback("Correto!");
      setScore(score + 1);
    } else {
      setFeedback("Errado. Tente novamente!");
    }

    setTimeout(() => {
      if (score >= 5) {
        setGameOver(true);
      } else {
        setFeedback("");
      }
    }, 1500);
  };

  const reiniciarJogo = () => {
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="App-gramatica">
      <div className="game-container">
        {gameOver ? (
          <div className="game-over">
            <h1>Fim de Jogo!</h1>
            <p>Pontuação: {score}</p>
            <button className='button-reiniciar' onClick={reiniciarJogo}>Reiniciar</button>
          </div>
        ) : (
          <div className="game">
            <h1>Identifique a Classe Gramatical</h1>
            <div className="palavra-container">
              <h2>{palavraAtual?.palavra}</h2>
            </div>
            <div className="opcoes">
              {classesGramaticais.map((classe) => (
                <button
                  key={classe}
                  className="classe-button"
                  onClick={() => verificarResposta(classe)}
                >
                  {classe}
                </button>
              ))}
            </div>
            <div className={`feedback ${feedback === "Correto!" ? "correct" : "wrong"}`}>
              {feedback}
            </div>
            <p>Pontuação: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
}