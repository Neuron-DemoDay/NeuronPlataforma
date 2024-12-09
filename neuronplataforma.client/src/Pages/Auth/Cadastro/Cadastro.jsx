import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import junin from '../../../assets/Junin/juninCadastro.png';
import './Cadastro.css';

registerLocale('ptBR', ptBR);

const Cadastro = ({ logoBranca }) => {
    const [date, setDate] = useState(null);
    const [placeholder, setPlaceholder] = useState("*Digite sua data de nascimento");
    const [inputValue, setInputValue] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        email: '',
        confirmarEmail: '',
        senha: '',
        confirmarSenha: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
            setFormData({ ...formData, dataNascimento: parsedDate.toISOString() });
        }

        setInputValue(formattedValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se os campos obrigatórios foram preenchidos
        if (formData.email !== formData.confirmarEmail) {
            alert("Os e-mails não coincidem!");
            return;
        }

        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await fetch('https://plataforma.neuron-ia.com/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: formData.nome,
                    dataNascimento: formData.dataNascimento,
                    email: formData.email,
                    senha: formData.senha,
                }),
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                // Redirecionar para a página de login ou outra página
            } else {
                const errorData = await response.json();
                console.error("Erro:", errorData);
                alert(errorData.message || "Erro ao realizar cadastro.");
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            alert("Ocorreu um erro ao tentar realizar o cadastro.");
        }
    };

    return (
        <div className="conteudo">
            <div className="forms">
                <form onSubmit={handleSubmit}>
                    <div className='titulo'>
                        <h1>Cadastro</h1>
                    </div>
                    <div className="input-container">
                        <FaUser className='icon-cadastro' />
                        <input
                            type="text"
                            name="nome"
                            placeholder='*Digite seu nome completo'
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <FaCalendarAlt className='icon-cadastro' onClick={() => document.getElementById("date-picker").focus()} />
                        <input
                            id="date-picker"
                            name="dataNascimento"
                            value={inputValue}
                            onChange={(e) => handleDateChange(e.target.value)}
                            placeholder={placeholder}
                            onFocus={() => setPlaceholder("*dd/mm/yyyy")}
                            onBlur={() => setPlaceholder("*Digite sua data de nascimento")}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <FaEnvelope className='icon-cadastro' />
                        <input
                            type="email"
                            name="email"
                            placeholder='*Digite seu e-mail'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <FaEnvelope className='icon-cadastro' />
                        <input
                            type="email"
                            name="confirmarEmail"
                            placeholder='*Confirme seu e-mail'
                            value={formData.confirmarEmail}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        {showPassword1 ? (
                            <FaEyeSlash className='icon-cadastro icon-eye' onClick={() => setShowPassword1(!showPassword1)} />
                        ) : (
                            <FaEye className='icon-cadastro icon-eye' onClick={() => setShowPassword1(!showPassword1)} />
                        )}
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            name="senha"
                            placeholder='*Crie sua senha'
                            value={formData.senha}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        {showPassword2 ? (
                            <FaEyeSlash className='icon-cadastro icon-eye' onClick={() => setShowPassword2(!showPassword2)} />
                        ) : (
                            <FaEye className='icon-cadastro icon-eye' onClick={() => setShowPassword2(!showPassword2)} />
                        )}
                        <input
                            type={showPassword2 ? 'text' : 'password'}
                            name="confirmarSenha"
                            placeholder='*Confirme sua senha'
                            value={formData.confirmarSenha}
                            onChange={handleInputChange}
                            required
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
               {/* <img src={junin} alt="Junin" className="junin" />*/}
            </div>
        </div>
    );
};

export default Cadastro;
