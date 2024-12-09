import { Link } from 'react-router-dom'


export default function AulasRecentes({ link, tema }) {
    return (

        <>
            <Link to={link} className='button recent rounded-lg border bg-card text-card-foreground'>
                <div className="tema-func-recentes">
                    <span id='name'>{(tema)}</span>
                </div>
            </Link>
        </>
    )
}