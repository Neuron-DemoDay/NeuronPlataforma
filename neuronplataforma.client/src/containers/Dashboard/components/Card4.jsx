import "./Card4.css";

function Card4({ titulo, descricao, icone, categoria}) {
    return (
        <div className="atividade">
            <div className={`atividade-icone ${categoria}`}>
                {icone}
            </div>
            <div className="atividade-conteudo">
                <h3>{titulo}</h3>
                <p>{descricao}</p>
            </div>
        </div>
    );
}

export default Card4;
