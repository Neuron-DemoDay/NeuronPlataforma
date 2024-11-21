import '../../styles/User.css'
import { MdNightlightRound } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";




function User({toggleMenu, isMenuOpen}) {
    return (
        <div className="barraUser">
            <div className="user-func">
                <div className="icons">
                    <IoIosSettings />
                </div>
                <div className="icons">
                    <IoMdNotificationsOutline />
                </div>
                <div className="info">
                    <div className="img-user"><img src="" alt="" /></div>
                    <div className="infos-user">
                        <span id='nome'>Joilson Costa</span>
                        <span id='level'>Major 26</span>
                    </div>
                    <div className="more-user" onClick={toggleMenu}>
                        
                        <MdExpandMore />
                    </div>
                </div>
                <div className="icons">
                    <MdNightlightRound />
                </div>
            </div>
        </div>
    )
}

export default User;