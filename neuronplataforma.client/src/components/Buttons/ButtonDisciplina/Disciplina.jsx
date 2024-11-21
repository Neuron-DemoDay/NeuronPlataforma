import { Link } from "react-router-dom";
import './Disciplina.css'

function Disciplina({classe,link,icon,disciplina,styleComp}){
    return(
        <div className={classe}><Link to={link} className="link-disc" style={{color:styleComp}}>
                        <div className="icon">
                            {icon}
                        </div>
                        <span style={{fontWeight:'800'}}>{disciplina}</span>
                        </Link>
                        </div>
    )
}
export default Disciplina