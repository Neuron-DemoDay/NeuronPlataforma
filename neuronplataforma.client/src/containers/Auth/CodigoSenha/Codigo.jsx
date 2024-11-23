import { FaKey } from "react-icons/fa";
import "./Codigo.css";
import junin from '../../../assets/imagesAuth/juninRecuSenha.png';
import logoBranca from '../../../assets/logoBranca.png';

function Codigo() {
    return (
        <div className="code-pagina-recuperacao">
            <div className="code-container-esquerda">
                <div className="code-logo">
                    <a>
                        <img src={logoBranca} alt="Logo" className="code-logo" />
                    </a>
                </div>
                <img src={junin} alt="Imagem do Junin" className="code-junin" />
            </div>
            <div className='code-container-direita'>
                <div className='code-forms'>
                    <h1 className='code-titulo'>Recuperação de senha</h1>

                    <div className='code-mensagem'>
                        <p>
                            Enviamos um e-mail para você com um código que permitirá a troca da sua senha.
                            Por favor, insira o código recebido no campo abaixo para prosseguir com a alteração.
                        </p>
                    </div>

                    <div className="code-input-container">
                        <FaKey className="code-icon" />
                        <input type="text" maxLength="6" pattern="\d*"
                            className="code-input" placeholder="Código" required />
                    </div>

                    <button type='submit' className='code-button'>Verificar</button>
                </div>
            </div>
        </div>
    );
}

export default Codigo;
