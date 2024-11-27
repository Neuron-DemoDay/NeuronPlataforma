import { useState } from "react";

function Summary({responses, onEdit, Onfinish}){
    const handleEdit = (questionId) =>{
        onEdit(questionId);
    }

    return (
        <div className="summary-container">
        <h2>Resumo das Suas Respostas</h2>
        <ul className="summary-list">
            {Object.entries(responses).map(([id, answer], idx) => (
                <li key={id} className="summary-item">
                    <p className="question">{`${idx + 1}. Pergunta ${id}`}</p>
                    <p className="answer">{Array.isArray(answer) ? answer.join(", ") : answer}</p>
                    <button className="edit-button" onClick={() => handleEdit(Number(id))}>
                        Editar
                    </button>
                </li>
            ))}
        </ul>
        <button className="finish-button" onClick={onFinish}>
            Concluir Onboarding
        </button>
    </div>
    )
}

export default Summary