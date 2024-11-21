
import { FaGamepad } from "react-icons/fa6";
import imgGames from '../../assets/imgGames.png'
import ButtonsGames from "../../components/Buttons/ButtonsGames/ButtonsGames";
import './Games.css'

export default function Games() {
    return (
        <div className="container-games">
            <div className="texto-inicial">
                <h1>Vamos começar os jogos?</h1>
                <h4>Aqui você encontra os jogos de todas as matérias</h4>
            </div>
            <input
                className='filterTema'
                type="text"
            />
            <div className="all-games">
                <div className="games-options">
                    <ButtonsGames
                        classe="tabela-games"
                        link="/TabelaPeriodica"
                        gameIcon={<FaGamepad />}
                        gameName="Tabela Periódica"
                        imgGames={imgGames}
                    />
                    <ButtonsGames
                        classe="tabela-games"
                        link="/TabelaPeriodica"
                        gameIcon={<FaGamepad />}
                        gameName="Tabela Periódica"
                        imgGames={imgGames}
                    />
                    <ButtonsGames
                        classe="tabela-games"
                        link="/TabelaPeriodica"
                        gameIcon={<FaGamepad />}
                        gameName="Tabela Periódica"
                        imgGames={imgGames}
                    />
                    <ButtonsGames
                        classe="tabela-games"
                        link="/TabelaPeriodica"
                        gameIcon={<FaGamepad />}
                        gameName="Tabela Periódica"
                        imgGames={imgGames}
                    />
                    <ButtonsGames
                        classe="tabela-games"
                        link="/TabelaPeriodica"
                        gameIcon={<FaGamepad />}
                        gameName="Tabela Periódica"
                        imgGames={imgGames}
                    />
                    <ButtonsGames
                        classe="tabela-games"
                        link="/TabelaPeriodica"
                        gameIcon={<FaGamepad />}
                        gameName="Tabela Periódica"
                        imgGames={imgGames}
                    />
                    <ButtonsGames
                        classe="tabela-games"
                        link="/TabelaPeriodica"
                        gameIcon={<FaGamepad />}
                        gameName="Tabela Periódica"
                        imgGames={imgGames}
                    />
                </div>
            </div>
        </div>
    )
}