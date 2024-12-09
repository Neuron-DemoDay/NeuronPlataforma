import { useEffect, useState } from 'react';
import './Quiz.css'
import { promptGames } from '../../assets/services/PromptGames.js';
import { fetchTalkingGemini } from '../../assets/services/RequisiçãoAPI.js';
import { TelaFinal } from '../../components/Ui/TelaFinal.jsx'

export default function DadosQuiz({ tema, materia }) {

    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectAnswer, setSelectedAnswer] = useState(0)
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [score, setScore] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isQuizComplete, setIsQuizComplete] = useState(false)
    const estrutura = `"correspondence": [
{
"element": "Pergunta",
"answers": [
{ "Text": "alternativa 1", "correct": "boolean" },
{ "Text": "alternativa 1", "correct": "boolean" },
{ "Text": "alternativa 1", "correct": "boolean" },
{ "Text": "alternativa 1", "correct": "boolean" }
]
} ]`

    const fetchQuestions = async () => {
        try {
            const prompt = promptGames('5 questões e 4 alternativas', tema, estrutura)
            const result = await fetchTalkingGemini(prompt)
            setQuestions(result)
            setIsLoading(false)
        } catch (error) {
            console.log('Erro ao gerar perguntas')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    const handleAnswerSelect = (isCorrect, index) => {
        if (selectAnswer) return
        setSelectedAnswer(true)

        setSelectedAnswer(index)
        setIsAnswerSelected(true)

        if (isCorrect) {
            setScore(score + 1)
        }

        setTimeout(() => {
            setIsAnswerSelected(false)
            setSelectedAnswer(false);
            goToNextQuestion();
        }, 1000)
    }

    const goToNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsQuizComplete(true);
        }
    };

    if (isQuizComplete) {
        return <TelaFinal score={score} total={questions.length} disciplina={materia} />
    }


    return (
        <div className="telaQuiz">
            {isLoading ? (
                <h1>Gerando Perguntas...</h1>)
                : (
                    <div className="containerQuiz">
                        <>
                            <h2 className='question'>{questions[currentIndex]?.element}</h2>
                            <div className="quiz">
                                <div className="answer-buttons">
                                    {questions[currentIndex]?.answers.map((answer, index) => (
                                        <button
                                            key={index}
                                            className={`btn ${isAnswerSelected
                                                ? index === selectAnswer
                                                    ? answer.correct
                                                        ? 'correct'
                                                        : 'incorrect'
                                                    : ''
                                                : ''
                                                }`}
                                            onClick={() => handleAnswerSelect(answer.correct, index)}
                                            disabled={isAnswerSelected}
                                        >
                                            {answer.Text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    </div>
                )}
        </div>

    )
}
