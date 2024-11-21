
import { useEffect, useState, useRef } from 'react';
import { fetchTalkingGemini } from '../../../../../../services/RequisiçãoAPI'
import gsap from 'gsap';
import { Acertou } from '../../../../../../components/Feedback/Acertou'
import { Errou } from '../../../../../../components/Feedback/Errou'
import { TelaFinal } from '../../../../../../components/Feedback/TelaFinal'
import './Dados.css'
import { promptGames } from '../../../../../../services/PromptGames';

function Dados() {
    const [symbols, setSymbols] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [userAnswer, setUserAnswer] = useState('')
    const [feedback, setFeedback] = useState(null)
    const [score, setScore] = useState(0)
    const [gameFinished, setGameFinished] = useState(false)
    const [timeLeft, setTimeLeft] = useState(10)
    const symbolRef = useRef(null)
    const estrutura = `"correspondence": [
        {
            "element": "element",
            "answer": {
                "name": "name"
            }
        }
    ]`

    // Fazendo a requisição para a API
// Função para buscar os elementos da API
const fetchSymbols = async () => {
    try {
      const prompt = promptGames('5', 'elementos da tabela períodica e seus respectivos nomes', estrutura)
      const result = await fetchTalkingGemini(prompt);
      setSymbols(result);
    } catch (error) {
      console.error('Erro ao buscar os elementos')
    }
  };

  // useEffect para buscar os elementos na montagem
  useEffect(() => {
    fetchSymbols();
  }, []);

  // useEffect para o temporizador
  useEffect(() => {
    if (timeLeft > 0 && !feedback) {
      const timer = setTimeout(() => {  //começando a contagem
        setTimeLeft(timeLeft - 1)  //diminuindo 1 seg da timeLeft
      }, 1000);    //centésims
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleFeedback(false)// Feedback de erro se o tempo acabar
    }
  }, [timeLeft, feedback])

  // useEffect para animar o elemento atual
  useEffect(() => {
    if (symbolRef.current && !feedback) {  //elemento que está sendo implementado no HTML
      gsap.fromTo(symbolRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
    }
  }, [currentIndex, feedback]);  //lista de dependencias para que o useEffect se direcione de forma mais precisa

  // Função para exibir o feedback de acerto ou erro
  const handleFeedback = (isCorrect) => {
    setFeedback(isCorrect ? 'acertou' : 'errou')
    if (isCorrect) setScore(score + 1)// Aumenta o score se o usuário acertar
  }

  // Função para passar para o próximo elemento
  const nextSymbol = () => {
    setFeedback(null); // Limpa o feedback
    setUserAnswer(''); // Limpa o input do usuário
    setTimeLeft(10); // Reinicia o temporizador

    if (currentIndex + 1 < symbols.length) {
      setCurrentIndex(currentIndex + 1) // Passa para o próximo elemento
    } else {
      setGameFinished(true) // Se não houver mais elementos, o jogo termina
    }
  };

  // Função para verificar a resposta do usuário
  const handleSubmit = (event) => {
    event.preventDefault(); //o prevent faz com que a pagina não carregue e os dados sejam armazenados para que posteriormente sejam validados
    const currentSymbols = symbols[currentIndex];

    if (userAnswer.trim().toLowerCase() === currentSymbols.answer.name.toLowerCase()) {
      handleFeedback(true); // Feedback de acerto
    } else {
      handleFeedback(false); // Feedback de erro
    }
  };

  // Se o jogo terminou, exibe a tela final
  if (gameFinished) {
    return <TelaFinal score={score} totalQuestions={symbols.length} />;
  }

    return (
      <div className="telaDados">
            {/* Exibe o timer no topo da tela */}
            <div className="timer">
                <p>Tempo Restante: <strong>{timeLeft}s</strong></p>
            </div>

            {/* Exibir o símbolo do elemento atual */}
            {!feedback && symbols.length > 0 ? (
                <div className="element-input-container">
                    <div ref={symbolRef} className='symbol'>
                        <p className='element-symbol'>{symbols[currentIndex].element}</p>
                    </div>
                    <div className="input-section">
                        {/* Adição do parágrafo explicativo */}
                        <p>Digite o nome do elemento por extenso. Por exemplo: Cálcio</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                className='input'
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                autoFocus
                            />
                            <button 
                            type="submit"
                            disabled={userAnswer.trim() === ''}
                            >Verificar</button>
                        </form>
                    </div>
                </div>
            ) : null}

            {/* Exibir o componente de feedback */}
            {feedback === 'acertou' && <Acertou onAnimationComplete={nextSymbol} />}
            {feedback === 'errou' && <Errou onAnimationComplete={nextSymbol} />}
      </div>
    )
}

export default Dados;