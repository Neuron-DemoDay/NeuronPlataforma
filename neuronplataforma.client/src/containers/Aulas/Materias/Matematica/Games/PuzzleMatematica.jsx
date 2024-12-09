import { useEffect, useState } from "react";
import PuzzleContainers from "../../../../../components/Buttons/ButtonJogos/Puzzle/Puzzle";
import './PuzzleMatematica.css'
import { promptGames } from "../../../../../services/PromptGames";
import { fetchTalkingGemini } from "../../../../../services/RequisiçãoAPI";
import { TelaFinal } from '../../../../../components/Feedback/TelaFinal'

function Puzzle() {


    const [question, setQuestion] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [userAnswer, setUserAnswer] = useState("")
    const [score, setScore] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const estrutura = `"correspondense": [
        {
            "element": "equation",
            "answer": {
                "resposta": "resposta"
            }
        }
    ]`



    const fetchElements = async () => {
        try {
            const prompt = promptGames('4', 'equações de primeiro grau. Resolva as equações', estrutura)
            const result = await fetchTalkingGemini(prompt)
            setQuestion(result)
        } catch {
            console.log('erro ao buscar elementos')
            setLoading(false)
        } finally {
            setLoading(false)
        }

        useEffect(() => {
            fetchElements()
        }, [])

    }


        const handleSubmit = (event) => {
            event.preventDefault()
            const currentQuestion = question[currentIndex]

            if (userAnswer.trim() === currentQuestion.answer.element) {
                console.log('CERTO')
            } else {
                console.log('Errado')
            }
        }

    return (
        <div className="puzzles">
            {/* {isLoading ? (
                <h1>Gerando Perguntas...</h1>)
                : ( */}
            <div className="containers">

                <>
                    <PuzzleContainers
                        selected={'1'}
                        equacao={question[currentIndex]}
                        correct={'incorrect'}
                        disabled={userAnswer.trim() === ''}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onClick={handleSubmit}
                    />
                    <PuzzleContainers
                        selected={'2'}
                        equacao={'vao ficar aqui'}
                        correct={'incorrect'}
                        disabled={userAnswer.trim() === ''}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onClick={handleSubmit}
                    />
                    <PuzzleContainers
                        selected={'3'}
                        equacao={'vao ficar aqui'}
                        correct={'incorrect'}
                        disabled={userAnswer.trim() === ''}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onClick={handleSubmit}
                    />
                    <PuzzleContainers
                        selected={'4'}
                        equacao={'vao ficar aqui'}
                        correct={'incorrect'}
                        disabled={userAnswer.trim() === ''}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onClick={handleSubmit}
                    />
                </>
            </div>
            {/* )} */}
        </div>
    )
}


export default Puzzle
// {currentQuestion < question.length ? (
//                     ) : (
//                         <TelaFinal
//                         score={score}/>
//                     )}