import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchTalkingGemini } from "../../../assets/services/RequisiçãoAPI";
import { promptGames } from "../../../assets/services/PromptGames";
import { Errou } from "../../../components/Ui/Errou";
import { Acertou } from "../../../components/Ui/Acertou";
import { TelaFinal } from "../../../components/Ui/TelaFinal";
import './Desembaralhe.css'

export default function Desembaralhe() {
    const [words, setWords] = useState([])
    const [selectedWords, setSelectedWords] = useState([])
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState("")
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [gameFinished, setGameFinished] = useState(false)
    const estrutura = `
    "correspondence": [
        {
            "words": ["to", "I", "park", "going", "the", "am"],
            "answer": "I am going to the park"
        }
    ]
    `

    const fetchWords = async () => {
        try {
            const prompt = promptGames('5', "perguntas de Inglês de nivel básico. Contendo uma frase que será utilizada como resposta, e suas respectivas palavras que formem essa resposta(frase)", estrutura)
            const result = await fetchTalkingGemini(prompt)
            result.map((x) => {
                x.words.sort(() => Math.random() - 0.5)
            })
            setWords(result)
            setIsLoading(false)
        } catch (error) {
            console.error('Erro ao buscar os elementos. Dados inseridos de forma manual.')
            const result = `
            [
                {
                    "words": ["she", "is", "studying", "English", "now", "now"],
                    "answer": "She is studying English now"
                },
                {
                    "words": ["we", "are", "going", "to", "the", "mall"],
                    "answer": "We are going to the mall"
                },
                {
                    "words": ["they", "have", "finished", "their", "homework"],
                    "answer": "They have finished their homework"
                },
                {
                    "words": ["the", "cat", "is", "sleeping", "on", "the", "sofa"],
                    "answer": "The cat is sleeping on the sofa"
                },
                {
                    "words": ["I", "would", "like", "a", "cup", "of", "coffee"],
                    "answer": "I would like a cup of coffee"
                }
            ]`
            const resultJson = JSON.parse(result)
            resultJson.map((x) => {
                x.words.sort(() => Math.random() - 0.5)
            })
            setWords(resultJson)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchWords()
    }, [])

    const handleWordClick = (word) => {
        setSelectedWords([...selectedWords, word])
        const indexDaPalavraASerRemovida = words[currentSentenceIndex].words.indexOf(word)
        words[currentSentenceIndex].words.splice(indexDaPalavraASerRemovida, 1)
    }

    const handleRemoveWord = (indexToBeRemoved, wordToBeAdded) => {
        const newSelectedWords = [...selectedWords]
        newSelectedWords.splice(indexToBeRemoved, 1)
        setSelectedWords(newSelectedWords)
        wordAddedToList(wordToBeAdded)
    }

    const wordAddedToList = (wordToBeAdded) => {
        const newWords = [...words]
        newWords[currentSentenceIndex].words.push(wordToBeAdded)
        setWords(newWords)
    }

    const animationVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    };

    const checkAnswer = () => {
        const correctAnswer = (words[currentSentenceIndex].answer)
        const answer = selectedWords.join(' ')
        if (answer === correctAnswer) {
            handleFeedback(true)
        } else {
            handleFeedback(false)
        }
    }

    const handleFeedback = (isCorrect) => {
        setFeedback(isCorrect ? 'acertou' : 'errou')
        if (isCorrect) setScore(score + 1)
    }

    const NextWords = () => {
        setSelectedWords([])
        setFeedback(null)

        if (currentSentenceIndex + 1 < words.length) {
            setCurrentSentenceIndex(currentSentenceIndex + 1)
        } else {
            setGameFinished(true)
        }
    }

    if (gameFinished) {
        return <TelaFinal score={score} total={words.length}/>
    }

    return (
        <div className="tela-desembaralhe">
            {isLoading ? (
                <p>gerando perguntas...</p>
            ) : (
                <>
                {!feedback && words.length > 0 ? (
                <div className="desembaralhe">
                    <div className="palavrasEmbaralhadas">
                        {words[currentSentenceIndex].words.map((word, index) => (
                            <motion.button
                                key={index}
                                className="word-button"
                                onClick={() => handleWordClick(word)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {word}
                            </motion.button>
                        ))}
                    </div>
                    <div className="resposta-desembaralhe" >
                        {selectedWords.map((word, index) => (
                            <motion.button
                                key={index}
                                className="word-desembaralhe"
                                variants={animationVariants}
                                initial="hidden"
                                animate="visible"
                                onClick={() => handleRemoveWord(index, word)}
                                transition={{ duration: 0.5 }}
                                hidden={selectedWords === true}
                            >
                                {word}
                            </motion.button>
                        ))}
                    </div>
                    <div className="text-desembaralhe">
                        <h2>Descubra qual a frase embaralhada e organize-a</h2>
                    </div>
                    <button className="verifIngles" onClick={checkAnswer}>Verificar Resposta</button>
                </div>
                    ): null}
                    </>
            )}
            {feedback === 'acertou' && <Acertou onAnimationComplete={NextWords} />}
            {feedback === 'errou' && <Errou onAnimationComplete={NextWords} />}
        </div>
    )

}