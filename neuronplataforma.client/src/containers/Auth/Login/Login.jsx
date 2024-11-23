import React from 'react';
import './Login.css';
import logoBranca from '../../../assets/logoBranca.png';
import juninCadastro from '../../../assets/imagesAuth/juninLogin.png';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSucces = (credentialResponse) => {
        console.log(credentialResponse.credential)
        //envia o token para o back-end
        fetch("http://localhost:5000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: credentialResponse.credential }),
        })
            .then((response) => response.json())
            .then((data) => console.log("Login bem sucedido", data))
            .then((error) => console.error("Erro no login", error))
    }


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

                <GoogleOAuthProvider clientId="">
                    <GoogleLogin
                        onSucces={handleSucces}
                        onError={() => console.log("Erro ao autenticar")}
                    />
                </GoogleOAuthProvider>

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
