import Card4 from "./Card4";
import { MdOutlineQuiz } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
import { PiCubeFocus } from "react-icons/pi";

function ProximasAtividades() {
    const atividades = [
        { titulo: "Quiz de Adjetivos", descricao: "Teste seus conhecimentos sobre adjetivos e suas classificações.", icone: <MdOutlineQuiz />, categoria: "duvida" },
        { titulo: "Aula de Biologia", descricao: "Aprenda sobre a célula e sua importância para o meio ambiente.", icone: <FaRegPlayCircle />, categoria: "aula" },
        { titulo: "Atividade de RA", descricao: "Explore as células de uma planta de forma interativa.", icone: <PiCubeFocus />, categoria: "ra" },
        { titulo: "Quiz de Biologia", descricao: "Aperfeiçoe suas habilidades em células.", icone: <MdOutlineQuiz />, categoria: "duvida" }
    ];

    return (
        <div className="proximas-atividades">
            <h2>Próximas Atividades</h2>
            {atividades.map((atividade, index) => (
                <Card4
                    key={index}
                    titulo={atividade.titulo}
                    descricao={atividade.descricao}
                    icone={atividade.icone}
                    categoria={atividade.categoria}
                />
            ))}
        </div>
    );
}

export default ProximasAtividades;
