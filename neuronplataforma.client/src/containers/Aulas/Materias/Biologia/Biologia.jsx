import '../../../../styles/Temas.css'
import DescRecent from '../../../../components/Buttons/ButtonMatérias/DescRecent'
import Tema from  '../../../../components/Buttons/ButtonTemas/Temas'
import JogosDesc from '../../../../components/Buttons/ButtonJogos/JogosDesc'


function Biologia() {

    return (
        <div className="aulas">
            <h2>Biologia</h2>
            <div className="blocos">
                <div className="conteudo">
                    <span>Lista de conteúdos</span>
                    <input 
                    className='filterTema'
                    type="text"
                     />
                    <div className="temas">
                        <Tema
                        link={"/AcessoAulas/Biologia"}
                        styleVerif='#29CC39'
                        tema="Introdução à Biologia"
                        color='#0F6DE7'
                        backgroundColor='rgba(15, 109, 231, 0.40)'
                        funcionalidade="Mapa Mental"
                        color2=''
                        backgroundColor2=''
                        funcionalidade2=""
                        color3=''
                        backgroundColor3=''
                        funcionalidade3=""
                        /> 

                        <Tema
                        link=""
                        styleVerif='#29CC39'
                        tema="Origem da Vida e do Universo"
                        color='#FE5F55'
                        backgroundColor='rgba(254, 95, 85, 0.40)'
                        funcionalidade="Quiz"
                        color2='#B40FE7'
                        backgroundColor2='rgba(180, 15, 231, 0.40)'
                        funcionalidade2="RA"
                        color3=''
                        backgroundColor3=''
                        funcionalidade3=""
                        /> 
                        <Tema
                        link=""
                        styleVerif='#29CC39'
                        tema="Citologia I: A Célula e suas Organelas"
                        color='#FE5F55'
                        backgroundColor='rgba(254, 95, 85, 0.40)'
                        funcionalidade="Quiz"
                        color2='#0F6DE7'
                        backgroundColor2='rgba(15, 109, 231, 0.40)'
                        funcionalidade2="Mapa Mental"
                        color3='#B40FE7'
                        backgroundColor3='rgba(180, 15, 231, 0.40)'
                        funcionalidade3="RA"
                        /> 
                        <Tema
                        link=""
                        styleVerif='#29CC39'
                        tema="Vida e Diversidade Biológica"
                        color='#FE5F55'
                        backgroundColor='rgba(254, 95, 85, 0.40)'
                        funcionalidade="Quiz"
                        color2='#0F6DE7'
                        backgroundColor2='rgba(15, 109, 231, 0.40)'
                        funcionalidade2="Mapa Mental"
                        color3='#B40FE7'
                        backgroundColor3='rgba(180, 15, 231, 0.40)'
                        funcionalidade3="RA"
                        /> 
                        <Tema
                        link=""
                        styleVerif='#29CC39'
                        tema="Ecologia I: Fluxos e Ciclos de Energia"
                        color=''
                        backgroundColor=''
                        funcionalidade="Mapa Mental"
                        color2='#0F6DE7'
                        backgroundColor2='rgba(15, 109, 231, 0.40)'
                        funcionalidade2="Mapa Mental"
                        color3='#B40FE7'
                        backgroundColor3='rgba(180, 15, 231, 0.40)'
                        funcionalidade3="RA"
                        /> 
                        <Tema
                        link=""
                        styleVerif='#29CC39'
                        tema="Divisão Celular"
                        color=''
                        backgroundColor=''
                        funcionalidade="Mapa Mental"
                        color2=''
                        backgroundColor2=''
                        funcionalidade2=""
                        color3=''
                        backgroundColor3=''
                        funcionalidade3=""
                        />
                    </div>
                </div>
                <div className="laterais">
                    <div className="conteudoAtual">
                        <span>Introdução à Biologia!</span>
                        <ul>
                            <li>
                                <DescRecent
                                    link=""
                                    styleVerif='#29CC39'
                                    tema="O início da Biologia"
                                    color=''
                                    backgroundColor=''
                                    funcionalidade="Mapa Mental"
                                />
                            </li>
                            <li>
                                <DescRecent
                                    link=""
                                    styleVerif='#29CC39'
                                    tema="Introdução à Ecologia"
                                    color=''
                                    backgroundColor=''
                                    funcionalidade="Mapa Mental"
                                />
                            </li>
                            <li>
                                <DescRecent
                                    link=""
                                    styleVerif='#29CC39'
                                    tema="Biodiversidade"
                                    color=''
                                    backgroundColor=''
                                    funcionalidade="Mapa Mental"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="gamesOption">
                        <span>Aprenda de forma Divertida!</span>
                        <ul>
                            <li>
                            <JogosDesc 
                                link={'/QuizBiologia'}
                                name={"Quiz"}
                                styleGame={'#FE5F55'}
                                />
                            </li>
                            <li>
                            <JogosDesc 
                                link={'/PalavrasBiologia'}
                                name={"Ciclos Biológicos"}
                                styleGame={'#FE5F55'}
                                />
                            </li>
                            <li>
                                <JogosDesc 
                                link={""}
                                name={"Bloqueado!"}
                                styleGame={'#333'}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Biologia;