import './DescRecent.css'
import { Link } from 'react-router-dom'
import { VscVerifiedFilled } from "react-icons/vsc";

function DescRecent({color, backgroundColor, link, styleVerif, funcionalidade, tema}){
    return(
        <>
        <Link to={link} className='button recent'>
                                    <div className="verif" style={{color:styleVerif}}><VscVerifiedFilled /></div>
                                    <div className="tema-func">
                                        <span id='tema'>{tema}</span>
                                        <span id='funcionalidades' style={{color: color, backgroundColor:backgroundColor}}>{funcionalidade}</span>
                                        </div>
                                </Link>
        </>
    )
}

export default DescRecent