import React, { useState, useEffect } from 'react'
import { Moon, Sun, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Jailson from '../../assets/img/Jailson1.jpg'
import { NotificationPopover } from '../NotificationPopover'
import { useTheme } from '../../Contexts/ThemeContext'
import './Header.css'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/Ui/dropdown-menu"

export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [userName, setUserName] = useState('Usuário')
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const storedName = localStorage.getItem('nome')
    if (storedName) {
      setUserName(storedName)
    } else {
      const storedEmail = localStorage.getItem('email')
      if (storedEmail) {
        setUserName(storedEmail.split('@')[0])
      }
    }
  }, [])

  return (
    <header className={`header flex items-center justify-end gap-6 w-full ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <NotificationPopover />
      <button 
        className={`icon-button w-10 h-10 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
      >
        {isDarkMode ? (
          <Sun size={24} className="theme-icon" />
        ) : (
          <Moon size={24} className="theme-icon" />
        )}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="user-profile flex items-center cursor-pointer">
            <span className="mr-2">{userName.includes('@') ? userName.split('@')[0] : userName}</span>
            {Jailson ? (
              <img
                src={Jailson}
                alt="Profile"
                className="avatar w-10 h-10 rounded-full"
              />
            ) : (
              <User size={24} className={`avatar ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

