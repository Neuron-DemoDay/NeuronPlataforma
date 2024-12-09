import { Link } from "react-router-dom"
import './ButtonsGames.css'
export default function ButtonsGames({ classe, link, gameIcon, gameName, imgGames }) {
    return (
        <div className="buttons-games">
            <Link to={link} className="link-disc">
            <div className="img-games">
                <img src={imgGames} alt="" />
            </div>
            <div className="inf-games">
            <div className="icon-games">
                {gameIcon}
            </div>
            <div className="name-game">
            <span style={{ fontWeight: '800' }}>{gameName}</span>
            </div>
            </div>
        </Link>
        </div>
    )
}