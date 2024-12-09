import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchTalkingGemini } from "../../../assets/services/RequisiçãoAPI";
import { promptGames } from "../../../assets/services/PromptGames.js";
import { TelaFinal } from '../../../components/Ui/TelaFinal.jsx'
import { Acertou } from "../../../components/Ui/Acertou.jsx";
import { Errou } from "../../../components/Ui/Errou.jsx";
import './CiclosBiologicos.css'

export default function CiclosBiologicos() {
    const [words, setWords] = useState([])
    const [selectedWords, setSelectedWords] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState(null)
    const [gameFinished, setGameFinished] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const estrutura = `
    "correspondence": [
    {
      "element": "Qual é a principal função do coração?",
      "words": ["bombeamento", "de sangue", "de oxigênio", "de digestão", "de nutrição"],
      "answer": "bombeamento de sangue"
    }
  ]
`

    const fetchWords = async () => {
        try {
            const prompt = promptGames('5', "perguntas de Biologia de nivel básico. Contendo uma pergunta, sua resposta e 5 palavras que formem essa resposta(Em algum momento essas palavras podem se completar para chegar na resposta final) a resposta da pergunta ficará em 'answer'", estrutura)
            const result = await fetchTalkingGemini(prompt)
            setWords(result)
            setIsLoading(false)
            

        } catch (error) {
            console.error('Erro ao buscar os elementos. Dados inseridos de forma manual.')
            const result = `
            [
                {
                    "element": "Qual é a principal função dos pulmões?",
                    "words": ["troca", "de gases", "de nutrientes", "de sangue", "de energia"],
                    "answer": "troca de gases"
                },
                {
                    "element": "Qual é a unidade funcional do sistema nervoso?",
                    "words": ["neurônio", "hemoglobina", "mitocôndria", "ribossomo", "gânglio"],
                    "answer": "neurônio"
                },
                {
                    "element": "Qual é o principal componente das células responsáveis pela produção de energia?",
                    "words": ["mitocôndria", "clorofila", "ribossomo", "lisossomo", "nucleotídeo"],
                    "answer": "mitocôndria"
                },
                {
                    "element": "Qual é a molécula responsável pelo transporte de oxigênio no sangue?",
                    "words": ["hemoglobina", "glucose", "DNA", "lipídio", "enzima"],
                    "answer": "hemoglobina"
                },
                {
                    "element": "Qual é o órgão responsável pela filtração do sangue no corpo humano?",
                    "words": ["rim", "pulmão", "coração", "estômago", "fígado"],
                    "answer": "rim"
                }
            ]
            `
            setWords(JSON.parse(result))
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    };

    // useEffect para buscar os elementos na montagem
    useEffect(() => {
        fetchWords()
    }, [])


    const handleWordClick = (word) => {
        if (!selectedWords.includes(word)) { //verificando se a palavra ja foi selecionada e se não, incluindo ela no array de selecionadas
            setSelectedWords([...selectedWords, word])
            setWords(words.filter((w) => w !== word)) //filtrando se a palavra já foi selecionada, se sim, sai do array, se não, se mantem
        }
    }

    const checkAnswer = () => {
        const correctAnswer = (words[currentIndex].answer)
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

        if (currentIndex + 1 < words.length) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setGameFinished(true)
        }
    }

    if (gameFinished) {
        return <TelaFinal score={score} total={words.length} />;
    }

    const animationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };
    return (
        <div className="telaPalavras">
            {isLoading ? (
                <p>gerando perguntas...</p>
            ) : (
                <>
                    {!feedback && words.length > 0 ? (
                        <div className="containerPalavras">
                            <div className="blocoCentral">
                                <img src="" alt="" />
                                <h2>{words[currentIndex].element}</h2>
                            </div>
                            <div className="palavrasAnimation" >
                                {selectedWords.map((word, index) => (
                                    <motion.span
                                        key={index}
                                        className="word"
                                        variants={animationVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5 }}
                                        hidden={selectedWords === true}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                            <div className="palavrasButton">
                                {words[currentIndex].words.map((word, index) => (
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
                            <button className="verifBiologia" onClick={checkAnswer}>Verificar Resposta</button>
                        </div>
                    ) : null}
                </>
            )}
            {feedback === 'acertou' && <Acertou onAnimationComplete={NextWords} />}
            {feedback === 'errou' && <Errou onAnimationComplete={NextWords} />}
        </div>
    )
}