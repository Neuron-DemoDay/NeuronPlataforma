import "./Card1.css"

function Card1({titulo, valor, icone}) {
    return (
        <div className="card-horas">
            <div className="card-horas-content">
                <div className="horas-texto">
                    <div className="centro-card1">
                        <h1>{valor}</h1>
                        <i className="icone">{icone} </i>
                    </div>
                    <p>{titulo}</p>
                </div>
            </div>
        </div>
    )
}

export default Card1