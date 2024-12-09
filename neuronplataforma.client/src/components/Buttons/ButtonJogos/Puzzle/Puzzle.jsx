
import './Puzzle.css'

function PuzzleContainers({ selected, equacao, disabled, value, onChange, onClick }) {


    return (
<>
        <div className="container-puzzle-cards">
            <div className="puzzle-cards">
                <section className="cards">
                    <h1>{selected}</h1>
                </section>
            </div>
        </div>
        <div className="container-puzzle-selected">
        <div className='puzzle-selected'>
                <div className="timer">
                    <section>O tempo vai ficar aqui</section>
                </div>
                <div className="selected">
                        <span className="question-puzzle">A questão aqui</span>
                        <input type="text" className="resposta-puzzle" />
                        <input type="button" value="Enviar" />
                </div>
            </div>
        </div>
</>
    )
}

export default PuzzleContainers