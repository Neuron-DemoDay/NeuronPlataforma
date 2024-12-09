import { Link } from 'react-router-dom'

export default function Tema({ link, tema,
    color, color2, color3,
    backgroundColor, backgroundColor2, backgroundColor3,
    nivel, funcionalidade, funcionalidade2 }) {
    return (
        <div className='containerTema rounded-lg border bg-card text-card-foreground'>
            <Link to={link} className='temaLink'>
                <div className="tema-func">
                    <span id='tema'>{(tema)}</span>
                    <div className="func">
                        <span id='nivel' style={{ color: color, backgroundColor: backgroundColor }}>{nivel}</span>
                        <span id='funcionalidades' style={{ color: color2, backgroundColor: backgroundColor2 }}>{funcionalidade}</span>
                        <span id='funcionalidades2' style={{ color: color3, backgroundColor: backgroundColor3 }}>{funcionalidade2}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

