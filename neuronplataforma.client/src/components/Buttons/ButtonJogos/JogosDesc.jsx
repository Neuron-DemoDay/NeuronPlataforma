import { FaGamepad } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './JogosDesc.css'

function JogosDesc({link, name, styleGame}){
    return(
        <div className="gameContainer">
<Link to={link} className='nameLink'>
                <div className="name-status">
                    <span id='name'>{(name)}</span>
                    <div className="status">
                <div className="game"><FaGamepad style={{color: styleGame}}/></div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default JogosDesc