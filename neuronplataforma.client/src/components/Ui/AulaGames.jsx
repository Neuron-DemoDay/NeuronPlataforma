import { Link } from "react-router-dom";

export default function JogosDesc({link, name}){
    return(
        <div className="gameContainer rounded-lg border bg-card text-card-foreground">
<Link to={link} className='nameLink'>
                <div className="name-status">
                    <span id='name'>{(name)}</span>
                    <div className="status">
                    </div>
                </div>
            </Link>
        </div>
    )
}