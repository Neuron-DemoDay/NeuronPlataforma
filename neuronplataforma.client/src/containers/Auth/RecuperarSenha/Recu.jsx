import { FaEnvelope} from "react-icons/fa";
import "./Recu.css";
import junin from '../../../assets/imagesAuth/juninRecuSenha.png';
import logoBranca from '../../../assets/logoBranca.png';

function Recu() {
    return (
        <div className="recovery-pagina-recuperacao">
            <div className="recovery-container-esquerda">
                <div className="recovery-logo">
                    <a>
                        <img src={logoBranca} alt="Logo" className="recovery-logo" />
                    </a>
                </div>
                <img src={junin} alt="Imagem do Junin" className="recovery-junin" />
            </div>
            <div className='recovery-container-direita'>
                <div className='recovery-forms'>
                    <h1 className='recovery-titulo'>Recuperação de senha</h1>

                    <div className="recovery-input-container">
                        <FaEnvelope className="recovery-icon" />
                        <input type="text" className="recovery-input" placeholder="*E-mail para recuperação" />
                    </div>

                    <button type='submit' className='recovery-button'>Enviar código</button>
                </div>
            </div>
        </div>
    );
}

export default Recu;