import { useEffect, useRef, useState } from "react";
import './Puzzle.css'
import gsap from 'gsap';
import { fetchTalkingGemini } from "../../../assets/services/RequisiçãoAPI";
import { promptGames } from "../../../assets/services/PromptGames";
import { Errou } from "../../../components/Ui/Errou";
import { Acertou } from "../../../components/Ui/Acertou";
import { TelaFinal } from "../../../components/Ui/TelaFinal";

function Puzzle() {


    const [question, setQuestion] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [userAnswer, setUserAnswer] = useState("")
    const [feedback, setFeedback] = useState(null)
    const [gameFinished, setGameFinished] = useState(false)
    const [tips, setTips] = useState("")
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(180)
    const [isLoading, setLoading] = useState(true)
    const puzzleRef = useRef(null)
    const estrutura = `
    "correspondence": [
        {
            "question": "question",
            "tip": "tip",
            "answer": {
                "response": "resposta"
            }
        }
    ]
        `

    const fetchElements = async () => {
        try {
            const result = `
            [
    {
      "question": "Qual é o resultado da equação 3x + 5 = 14?",
      "tip": "Isole o 'x' subtraindo 5 de ambos os lados e depois dividindo.",
      "answer": {
        "response": 3
      }
    },
    {
      "question": "Se um triângulo retângulo tem catetos com medidas 6 e 8, qual é a medida da hipotenusa?",
      "tip": "Use o Teorema de Pitágoras: a² + b² = c²",
      "answer": {
        "response": 10
      }
    },
    {
      "question": "Qual é a área de um círculo com raio de 5 cm?",
      "tip": "Use a fórmula da área do círculo: A = πr² (use π = 3.14)",
      "answer": {
        "response": 78.5
      }
    },
    {
      "question": "Se um trem viaja a 60 km/h por 2 horas, quantos quilômetros ele percorre?",
      "tip": "Multiplique a velocidade pela duração da viagem.",
      "answer": {
        "response": 120
      }
    }
  ]`
            setQuestion(JSON.parse(result))
            setLoading(false)
        } catch (error) {
            console.log('Erro ao buscar elementos.')
            const prompt = promptGames('4', 'questões de matemática e uma dica para cada questão. Resolva as questões. Sua resposta será sempre numérica', estrutura)
            const result = await fetchTalkingGemini(prompt)
            setQuestion(result)
            setLoading(false)
            console.log(result)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchElements()
    }, [])

    useEffect(() => {
        if (puzzleRef.current && !feedback) {  //elemento que está sendo implementado no HTML
            gsap.fromTo(puzzleRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
        }
    }, [currentIndex, feedback])

    useEffect(() => {
        if (timeLeft > 0 && !feedback) {
            const timer = setTimeout(() => {  //começando a contagem
                setTimeLeft(timeLeft - 1)  //diminuindo 1 seg da timeLeft
                if (timeLeft <= 60) {
                    setTips(question[currentIndex].tip)
                }
            }, 1000);    //centésims
            return () => clearTimeout(timer)
        }
        else if (timeLeft === 0) {
            console.log("acabou o tempo")
            handleFeedback(false)// Feedback de erro se o tempo acabar
        }
    }, [timeLeft, feedback])

    const handleFeedback = (isCorrect) => {
        setFeedback(isCorrect ? 'acertou' : 'errou')
        if (isCorrect) setScore(score + 1)// Aumenta o score se o usuário acertar
    }

    const nextSymbol = () => {
        setFeedback(null)
        setUserAnswer('')
        setTimeLeft(180)
        setTips("")

        if (currentIndex + 1 < question.length) {
            setCurrentIndex(currentIndex + 1) // Passa para o próximo elemento
        } else {
            setGameFinished(true) // Se não houver mais elementos, o jogo termina
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentQuestion = question[currentIndex];

        if (userAnswer.trim() === currentQuestion.answer.response) {
            console.log(userAnswer)
            console.log(currentQuestion.answer.response)
            handleFeedback(true);
        } else {
            console.log(userAnswer)
            console.log(currentQuestion.answer.response)
            handleFeedback(false);
        }
    }

    if (gameFinished) {
        return <TelaFinal score={score} total={question.length}/>;
    }

    return (
        <>
            {isLoading ? (
                <h1>Gerando Perguntas...</h1>)
                : (
                    <div className="container-puzzle">
                        {!feedback && question.length > 0 ? (
                            <div className='puzzle'>
                                <div ref={puzzleRef} className="card-puzzle">
                                    <div className="timer-puzzle">
                                        <span><p>Tempo Restante: <strong>{timeLeft}s</strong></p></span>
                                    </div>
                                    <div className="question-puzzle">
                                        <span>{question[currentIndex].question}</span>
                                    </div>
                                    <p>Responda somente de forma <strong>numérica!</strong></p>
                                    {tips !== "" ? (
                                        <p>Dica: {tips}</p>
                                    ) : null}
                                    <form className="input-puzzle" onSubmit={handleSubmit}>
                                        <input
                                            className="resposta-puzzle"
                                            type="text"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            disabled={userAnswer.trim() === ''}
                                        >Enviar</button>
                                    </form>
                                </div>
                            </div>
                        ) : null}
                        {feedback === 'acertou' && <Acertou onAnimationComplete={nextSymbol} />}
                        {feedback === 'errou' && <Errou onAnimationComplete={nextSymbol} />}
                    </div>
                )}
        </>
    )
}


export default Puzzle
// {currentQuestion < question.length ? (
//                     ) : (
//                         <TelaFinal
//                         score={score}/>
//                     )}