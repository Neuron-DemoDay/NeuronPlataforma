import { useNavigate } from 'react-router-dom';
import Tema from "../../../components/Ui/Materias"
import AulasRecentes from "../../../components/Ui/MateriasRecentes"
import JogosDesc from "../../../components/Ui/AulaGames"
import { dadosMaterias } from "../../../assets/DadosMaterias/dadosMaterias"
import '../Materias.css'

export default function Biologia() {
    const navigate = useNavigate();

    const handleTopicClick = (topicName) => {
        // Gera um ID aleatório 
        const randomId = Math.random().toString(36).substring(2, 15);

        // Navega para a página de aula passando o títuloftema
        navigate(`/aula/${randomId}`, {
            state: {
                title: topicName
            }
        });
    };

    const handleRecentTopicClick = (subtopicName) => {
        const randomId = Math.random().toString(36).substring(2, 15);

        navigate(`/aula/${randomId}`, {
            state: {
                title: subtopicName
            }
        });
    };

    return (
        <div className="aulas">
            <h2>Biologia</h2>
            <div className="blocos recent rounded-lg border bg-card text-card-foreground">
                <div className="inicias">
                    <div className="conteudoAtual">
                        <span>Aulas acessadas recentemente</span>
                        <ul>
                            {dadosMaterias.biologia.topics[4].subtopics.slice(2, 6).map((subtopic, index) => (
                                <li key={index}>
                                    <AulasRecentes
                                        link="#"
                                        tema={subtopic.name}
                                        onClick={() => handleRecentTopicClick(subtopic.name)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="gamesOption">
                        <span>Aprenda de forma Divertida!</span>
                        <ul>
                            <li>
                                <JogosDesc
                                    link={'/quizBiologia'}
                                    name={"Quiz"}
                                    styleGame={'#FE5F55'}
                                />
                            </li>
                            <li>
                                <JogosDesc
                                    link={'/ciclosBiologicos'}
                                    name={"Ciclos Biológicos"}
                                    styleGame={'#FE5F55'}
                                />
                            </li>
                            <li>
                                <JogosDesc
                                    link={""}
                                    name={"Bloqueado!"}
                                    styleGame={'#333'}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="conteudo-maior recent rounded-lg border bg-card text-card-foreground">
                <div className="conteudo">
                    <span className="titulo-materias">Matérias</span>
                    <div className="temas ">
                        {dadosMaterias.biologia.topics.map((topic, index) => (
                            <Tema
                                key={index}
                                link={`/aula/${topic.name}`} 
                                tema={topic.name}
                                nivel={topic.level}
                                color='#FE5F55'
                                backgroundColor='rgba(254, 95, 85, 0.40)'
                                funcionalidade="Mapa Mental"
                                color2='#B40FE7'
                                backgroundColor2='rgba(180, 15, 231, 0.40)'
                                funcionalidade2=""
                                color3=''
                                backgroundColor3=''
                                onClick={() => handleTopicClick(topic.name)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}