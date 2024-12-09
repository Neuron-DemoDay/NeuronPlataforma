import React from 'react';
import { Link } from 'react-router-dom';
import './TelaFinal.css'

export const TelaFinal = ({ score, total }) => {
    const approved = score > 3;

    return (
        <div className="telaMaior">
            <div className="tela-final-container">
                <div className="tela-final">
                    <h1>Resultado Final</h1>
                    <p>Pontuação: {score} de {total}</p>

                    {approved ? (
                        <div className='approved'>
                            <h2>Parabéns! Você passou para o próximo jogo!</h2>
                            <div className="buttonTelaFinal">
                                    <Link to="/Materias">Voltar às Aulas</Link>
                            </div>
                        </div>
                    ) : (
                        <div className='reproved'>
                            <h2>Não foi dessa vez, estude um pouco mais para tentarmos novamente!</h2>
                            <div className="buttonTelaFinal">
                                    <Link to="/aulas" className='link-aulas'>Materias</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
