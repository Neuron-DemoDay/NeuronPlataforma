import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import junin from '..../assets/imagesAuth/juninCadastro.png';
import './Cadastro.css'

registerLocale('ptBR', ptBR);

const Cadastro = ({ logoBranca }) => { // logoBranca é recebida como prop
    const [date, setDate] = useState(null);
    const [placeholder, setPlaceholder] = useState("*Digite sua data de nascimento");
    const [inputValue, setInputValue] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleDateChange = (input) => {
        const cleanValue = input.replace(/\D/g, '');
        let formattedValue = '';

        if (cleanValue.length > 0) {
            formattedValue += cleanValue.substring(0, 2);
        }
        if (cleanValue.length >= 3) {
            formattedValue += '/' + cleanValue.substring(2, 4);
        }
        if (cleanValue.length >= 5) {
            formattedValue += '/' + cleanValue.substring(4, 8);
        }

        const parsedDate = new Date(cleanValue.substring(4, 8), cleanValue.substring(2, 4) - 1, cleanValue.substring(0, 2));
        if (!isNaN(parsedDate.getTime())) {
            setDate(parsedDate);
        }

        setInputValue(formattedValue);
    };

    return (
        <div className="conteudo">
            <div className="forms">
                <form>
                    <div className='titulo'>
                        <h1>Cadastro</h1>
                    </div>
                    <div className="input-container">
                        <FaUser className='icon' />
                        <input type="text" placeholder='*Digite seu nome completo' />
                    </div>
                    <div className="input-container">
                        <FaCalendarAlt className='icon' onClick={() => document.getElementById("date-picker").focus()} />
                        <input
                            id="date-picker"
                            value={inputValue}
                            onChange={(e) => handleDateChange(e.target.value)}
                            placeholder={placeholder}
                            onFocus={() => setPlaceholder("*dd/mm/yyyy")}
                            onBlur={() => setPlaceholder("*Digite sua data de nascimento")}
                        />
                    </div>
                    <div className="input-container">
                        <FaEnvelope className='icon' />
                        <input type="email" placeholder='*Digite seu e-mail' />
                    </div>
                    <div className="input-container">
                        <FaEnvelope className='icon' />
                        <input type="email" placeholder='*Confirme seu e-mail' />
                    </div>
                    <div className="input-container">
                        {showPassword1 ? (
                            <FaEyeSlash className='icon icon-eye' onClick={() => setShowPassword1(!showPassword1)} />
                        ) : (
                            <FaEye className='icon icon-eye' onClick={() => setShowPassword1(!showPassword1)} />
                        )}
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            placeholder='*Crie sua senha'
                        />
                    </div>
                    <div className="input-container">
                        {showPassword2 ? (
                            <FaEyeSlash className='icon icon-eye' onClick={() => setShowPassword2(!showPassword2)} />
                        ) : (
                            <FaEye className='icon icon-eye' onClick={() => setShowPassword2(!showPassword2)} />
                        )}
                        <input
                            type={showPassword2 ? 'text' : 'password'}
                            placeholder='*Confirme sua senha'
                        />
                    </div>
                    <div className="link-container">
                        <a href="#">Já possui uma conta?</a>
                    </div>
                    <div className='button-container'>
                        <button type='submit' className="submit-btn">Finalizar Cadastro</button>
                    </div>
                </form>
            </div>
            <div className="blue-background">
                <img src={logoBranca} alt="Logo Branca" className="logo" />
                <img src={junin} alt="Junin" className="junin" />
            </div>
        </div>
    );
};

export default Cadastro;
