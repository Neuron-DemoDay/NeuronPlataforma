import './Temas.css'
import { Link } from 'react-router-dom'
import { VscVerifiedFilled } from "react-icons/vsc";

function Tema({link, tema, styleVerif,
    color, color2, color3, 
    backgroundColor, backgroundColor2, backgroundColor3,
    funcionalidade, funcionalidade2, funcionalidade3 }) {
    return (
        <div className='containerTema'>
            <Link to={link} className='temaLink'>
                <div className="verif"><VscVerifiedFilled style={{color: styleVerif}}/></div>
                <div className="tema-func">
                    <span id='tema'>{(tema)}</span>
                    <div className="func">
                    <span id='funcionalidades' style={{color: color, backgroundColor: backgroundColor}}>{funcionalidade}</span>
                    <span id='funcionalidades2' style={{color: color2, backgroundColor: backgroundColor2}}>{funcionalidade2}</span>
                    <span id='funcionalidades3' style={{color: color3, backgroundColor: backgroundColor3}}>{funcionalidade3}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Tema