import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './NovaSenha.css';
import logo from '../../../assets/images/logoBranca.png';
import juninImage from '../../../assets/images/juninNovaSenha.png';

const NovaSenha = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="nova-senha-container">
            <div className="nova-senha-forms">
                <form>
                    <div className='nova-senha-titulo'>
                        <h1>Redefinição de senha</h1>
                    </div>
                    <div className="nova-senha-input-container">
                        <div className='nova-senha-icon-container' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash className='nova-senha-icon' /> : <FaEye className='nova-senha-icon' />}
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='*Crie sua nova senha'
                        />
                    </div>
                    <div className="nova-senha-input-container">
                        <div className='nova-senha-icon-container' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash className='nova-senha-icon' /> : <FaEye className='nova-senha-icon' />}
                        </div>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='*Confirme sua nova senha'
                        />
                    </div>
                    <div className='nova-senha-button-container'>
                        <button type='submit' className="nova-senha-submit-btn">Atualizar Senha</button>
                    </div>
                </form>
            </div>
            <div className="nova-senha-background">
                <img src={logo} alt="Logo" className="nova-senha-logo" />
                <img src={juninImage} alt="Junin" className="nova-senha-junin" />
            </div>
        </div>
    );
};

export default NovaSenha;
