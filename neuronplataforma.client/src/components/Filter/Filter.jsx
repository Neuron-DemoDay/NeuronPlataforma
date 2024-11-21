import React, { useState } from "react";

function Filter(props) {

    const [conteudos] = useState([
        (props.temaUm),
        (props.temaDois),
        (props.temaTres),
        (props.temaQuatro),
        (props.temaCinco),
        (props.temaSeis)
    ])
    const [filter, setFilter] = useState('')


        //armazenando o valor digitado
    const handleFilterSubmit = (e) => {
        setFilter(e.target.value)
    }

    //"comparando" o valor digitado e armazeando com os valores do BD
    const filteredConteud = conteudos.filter(conteudo =>
        conteudo.toLowerCase().includes(filter.toLowerCase())
    )
    return (
        <>
            <input
                type="text"
                placeholder="Digite um tema..."
                value={filter}
                onSubmit={handleFilterSubmit} />

            <ul>{filteredConteud.map((conteudos, index) => (  //buscando pelo valor solicitado
                <li key={index}>{conteudos}</li>
            ))}
            </ul>
        </>
    )
}

export default Filter;
