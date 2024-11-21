import './Regras.css'
import { Link } from 'react-router-dom'

function Regras(props) {
    return (
        <div className="telaQuiz">
        <div className="containerRegras">
            <div class="info-title"><span>Algumas regras do Jogo!</span></div>
            <div class="info-list">
                <div class="infoQuiz">1. {props.regra1}</div>
                <div class="infoQuiz">2. {props.regra2}</div>
                <div class="infoQuiz">3. {props.regra3}</div>
            </div>
            <div class="buttons-info">
                <button class="quit"><Link to="/Aulas" className='link-buttons quit'>Sair do Jogo</Link></button>
                <button class="restart"><Link to={props.link} className='link-buttons'>Continuar</Link></button>
            </div>
        </div>
        </div>
    )
}

export default Regras