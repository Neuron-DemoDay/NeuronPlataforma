import Disciplina from "../../components/Ui/Disciplinas"
import './Aulas.css'

export function Aulas (){
    return(
        <div className="tela">
        <div className="cienciasExatas">
                <div className="titulo"><span>Ciências Exatas</span></div>
                <div className="materias">
                    <Disciplina
                        classe={"biologia rounded-lg border bg-card text-card-foreground"}
                        link={"/biologia"}
                        styleComp={'#29CC39'}
                        icon={''}
                        disciplina={'Biologia'}
                    />
                    <Disciplina
                        classe={"quimica rounded-lg border bg-card text-card-foreground"}
                        link={'/quimica'}
                        styleComp={'#E9488C'}
                        icon={''}
                        disciplina={'Quimica'}
                    />
                    <Disciplina
                        classe={"fisica rounded-lg border bg-card text-card-foreground"}
                        link={'/fisica'}
                        styleIcon={'#2EE6CA'}
                        icon={''}
                        disciplina={'Fisica'}
                    />
                    <Disciplina
                        classe={"matematica rounded-lg border bg-card text-card-foreground"}
                        link={'/matematica'}
                        styleComp={'#FE5F55'}
                        icon={''}
                        disciplina={'Matematica'}
                    />
                </div>
            </div>
            <div className="cienciasHumanas">
                <div className="titulo"><span>Ciências Humanas</span></div>
                <div className="materias">
                    <Disciplina
                        classe={"historia rounded-lg border bg-card text-card-foreground"}
                        link={'/historia'}
                        styleComp={'#B40FE7'}
                        icon={''}
                        disciplina={'Historia'}
                    />
                    <Disciplina
                        classe={"geografia rounded-lg border bg-card text-card-foreground"}
                        link={'/geografia'}
                        styleComp={'#33BFFF'}
                        icon={''}
                        disciplina={'Geografia'}
                    />
                    <Disciplina
                        classe={"filosofia rounded-lg border bg-card text-card-foreground"}
                        link={'/filosofia'}
                        styleComp={'#FFCB33'}
                        icon={''}
                        disciplina={'Filosofia'}
                    />
                </div>
            </div>
            <div className="linguagens">
                <div className="titulo"><span>Linguagens</span></div>
                <div className="materias">
                    <Disciplina
                        classe={"portugues rounded-lg border bg-card text-card-foreground"}
                        link={'/portugues'}
                        styleComp={'#CC7429'}
                        icon={''}
                        disciplina={'Portugues'}
                    />
                    <Disciplina
                        classe={"ingles rounded-lg border bg-card text-card-foreground"}
                        link={'/ingles'}
                        styleComp={'#0F6DE7'}
                        icon={''}
                        disciplina={'Ingles'}
                    />
                    <Disciplina
                        classe={"redacao rounded-lg border bg-card text-card-foreground"}
                        link={'/redacao'}
                        styleComp={'#FF00D0'}
                        icon={''}
                        disciplina={'Redação'}
                    />
                </div>
            </div>
        </div>
    )
}