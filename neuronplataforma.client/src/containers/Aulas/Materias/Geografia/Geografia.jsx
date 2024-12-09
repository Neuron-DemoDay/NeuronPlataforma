import '../../../../styles/Temas.css'
import DescRecent from '../../../../components/Buttons/ButtonMatérias/DescRecent'
import Tema from  '../../../../components/Buttons/ButtonTemas/Temas'
import JogosDesc from '../../../../components/Buttons/ButtonJogos/JogosDesc'


function Geografia(){
    return(
        <div className="aulas">
        <h2>Geografia</h2>
        <div className="blocos">
            <div className="conteudo">
                <span>Lista de conteúdos</span>
                <input 
                className='filterTema'
                type="text"
                 />
                <div className="temas">
                    <Tema
                    link=''
                    styleVerif='#29CC39'
                    tema="?"
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
                    tema="?"
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
                    tema="?"
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
                    tema="?"
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
                    tema="?"
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
                    tema="?"
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
                    <span>?</span>
                    <ul>
                        <li>
                            <DescRecent
                                link=""
                                styleVerif='#29CC39'
                                tema="?"
                                color=''
                                backgroundColor=''
                                funcionalidade="Mapa Mental"
                            />
                        </li>
                        <li>
                            <DescRecent
                                link=""
                                styleVerif='#29CC39'
                                tema="?"
                                color=''
                                backgroundColor=''
                                funcionalidade="Mapa Mental"
                            />
                        </li>
                        <li>
                            <DescRecent
                                link=""
                                styleVerif='#29CC39'
                                tema="?"
                                color=''
                                backgroundColor=''
                                funcionalidade="Mapa Mental"
                            />
                        </li>
                    </ul>
                </div>
                <div className="conteudoAtual gamesOption">
                    <span>Aprenda de forma Divertida!</span>
                    <ul>
                        <li>
                        <JogosDesc 
                            link={'/QuizGeografia'}
                            name={"Quiz"}
                            styleGame={'#FE5F55'}
                            />
                        </li>
                        <li>
                        <JogosDesc 
                            link={""}
                            name={"?"}
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

export default Geografia