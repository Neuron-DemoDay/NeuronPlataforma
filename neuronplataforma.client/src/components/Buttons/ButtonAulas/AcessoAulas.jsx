import { Link } from "react-router-dom"
import './AcessoAulas.css'
import { MdArrowForwardIos } from "react-icons/md";


export default function Aulas(/*{ titulo, linkVideo }*/) {
    return (
        <div className="telaAula">
            <div className="infosAulas">
                <div className="titAula">
                    <span>Introdução à Biologia{/*{titulo}*/}</span>
                </div>
                <div className="conteudoAulas">
                    <div className="video"></div>
                    <div className="linksAula">
                        <div className="mapa"><span>Mapa</span></div>
                        <div className="linkQuiz">
                            <Link to='/QuizMateriaAtual' className="quiz"><span>Quiz</span></Link>
                        </div>
                    </div>
                    <div className="anotacoes">
                        <div className="titAnotacoes">
                            <span>Anotações</span>
                        </div>
                        <div className="paragrafAnotacoes">
                            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto corporis perferendis aliquam sed. Mollitia aspernatur, iure cumque eveniet repudiandae accusamus, eaque reiciendis voluptas quia illum suscipit eos odio, ipsam ducimus!</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pageFunc">
                <div className="barraTaref">
                    <span>Anotações</span>
                    <span>Transcrição</span>
                </div>
                <div className="anotacaoIA"><span>Anotações da IA</span></div>
                <div className="topics">
                    <ul>
                        <li><MdArrowForwardIos className="iconTopics" />Introdução a Biologia</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}