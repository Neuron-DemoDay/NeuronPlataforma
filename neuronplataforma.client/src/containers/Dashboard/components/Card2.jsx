import "./Card2.css"
import { MdOutlineDashboardCustomize } from "react-icons/md";


function Card2() {
  return (
    <>
      <div className="card">
        <div className="card-content">
          <h3 className="card-title">Recomendação Personalizada</h3>
          <p className="card-text">
            A IA selecionou este conteúdo com base nos seus estudos recentes.
            Explore para avançar!
          </p>

          <button className="card-button">Ver Detalhes</button>
        </div>
        <div className="card-icon">
          <i><MdOutlineDashboardCustomize />
          </i>
        </div>
      </div>
    </>
  )
}

export default Card2