import React, { useState } from 'react';
import './Login.css';
import logoBranca from '../../../assets/img/LogoNeuronBranca.svg';
import juninCadastro from '../../../assets/Junin/juninLogin.png';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async ({ code }) => {
            try {
                //faz a requisição ao backend
                const tokens = await axios.post("https://plataforma.neuron-ia.com/api/google/login", {
                    code,
                })
                console.log("Tokens recebidos:", tokens);
            } catch (error) {
                console.error("Erro ao autenticar no backend:", error.response?.data || error.message)
            }
        },
        onError: (error) => {
            console.error("Erro no login com Google:", error)
        }
    })

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

                {/*Google*/}
                
                <div>
                    <button onClick={() => googleLogin() }>Login com Google</button>        
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
