import React from 'react';
import './Login.css';
import logoBranca from '..../assets/logoBranca.png';
import juninCadastro from '..../assets/imagesAuth/juninCadastro.png';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="login-container">
            <div className="login-purple-background">
                <img src={logoBranca} alt="Logo" className="login-logo" />
                <img src={juninCadastro} alt="Junin" className="login-junin" />
            </div>

            <div className="login-form-container">
                <div className="login-titulo">
                    <h1>Bem-vindo ao Neuron!</h1>
                    <p>Login</p>
                </div>
                <div className="login-input-container">
                    <FaEnvelope className='login-icon' />
                    <input
                        type="email"
                        className="login-input"
                        placeholder="*Digite seu e-mail"
                    />
                </div>

                <div className="login-input-container">
                    {showPassword ? (
                        <FaEyeSlash className='login-icon icon-eye' onClick={togglePasswordVisibility} />
                    ) : (
                        <FaEye className='login-icon icon-eye' onClick={togglePasswordVisibility} />
                    )}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="login-input"
                        placeholder="*Digite sua senha"
                    />
                </div>
                <div className="login-link-container">
                    <a href="#">Esqueceu a senha?</a>
                </div>
                
                <div className="login-button-container">
                    <button className="login-btn"><span>Fazer Login</span></button>
                    <button className="login-create-account-btn"><span>Criar Conta</span></button>
                </div>
            </div>
        </div>
    );
}

export default Login;
