import { Link } from "react-router-dom";

export default function Disciplina({disciplina,styleComp,link, classe,icon}){
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