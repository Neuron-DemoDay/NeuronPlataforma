import React, { useState, useEffect } from 'react';
import './Gravidade.css';

export default function Gravidade() {
  const [angle, setAngle] = useState(30); // Ângulo de inclinação da rampa
  const [speed, setSpeed] = useState(0);  // Velocidade da bola
  const [position, setPosition] = useState(0); // Posição da bola na rampa
  const [time, setTime] = useState(0); // Tempo desde o início do movimento
  const [gameOver, setGameOver] = useState(false); // Status do jogo

  // Constantes de física
  const gravity = 9.8;  // Aceleração gravitacional (m/s^2)
  const rampLength = 100; // Comprimento da rampa (em metros)

  // Função para calcular a aceleração e a velocidade
  const calculatePhysics = () => {
    // A aceleração na rampa é dada por: a = g * sin(ângulo)
    const acceleration = gravity * Math.sin((angle * Math.PI) / 180);
    
    // A equação do movimento é: v = u + a * t, onde u é a velocidade inicial (0 neste caso)
    const newSpeed = acceleration * time;
    setSpeed(newSpeed);

    // Posição da bola na rampa com base na velocidade
    const newPosition = Math.min(newSpeed * time, rampLength); // Limitar à posição final da rampa
    setPosition(newPosition);

    // Se a posição atingir o fim da rampa, o jogo acaba
    if (newPosition >= rampLength) {
      setGameOver(true);
    }
  };

  // Atualiza a física do jogo a cada segundo
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
        calculatePhysics();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, gameOver, angle]);

  // Funções para controlar o ângulo da rampa
  const increaseAngle = () => {
    if (angle < 60) setAngle(angle + 5);
  };

  const decreaseAngle = () => {
    if (angle > 10) setAngle(angle - 5);
  };

  return (
    <div className="App">
      <h1>Jogo de Física: A Corrida da Gravidade!</h1>
      {gameOver ? (
        <div>
          <h2>Fim do Jogo! Sua velocidade final foi: {speed.toFixed(2)} m/s</h2>
          <button className='interação' onClick={() => window.location.reload()}>Reiniciar</button>
        </div>
      ) : (
        <div>
          <h2>Ângulo da rampa: {angle}°</h2>
          <h2>Velocidade: {speed.toFixed(2)} m/s</h2>
          <h2>Posição: {position.toFixed(2)} metros</h2>
          <h2>Tempo: {time} segundos</h2>

          <div>
            <button className='interação' onClick={increaseAngle}>Aumentar Inclinação</button>
            <button className='interação' onClick={decreaseAngle}>Diminuir Inclinação</button>
          </div>

          <p>Use as setas para controlar a inclinação da rampa e fazer a bola rolar!</p>
        </div>
      )}
    </div>
  );
}