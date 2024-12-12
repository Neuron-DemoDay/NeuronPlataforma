import React, { useState, useEffect } from 'react'
import { IoIosSettings, IoMdNotificationsOutline } from 'react-icons/io'
import { MdExpandMore, MdNightlightRound } from 'react-icons/md'

function User({toggleMenu, isMenuOpen}) {
    const [userName, setUserName] = useState('Usuário')
    const [userLevel, setUserLevel] = useState('Nível 1')

    useEffect(() => {
        const storedName = localStorage.getItem('userName')
        if (storedName) {
            setUserName(storedName)
        }
    }, [])

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
                        <span id='nome'>{userName}</span>
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

