import React from 'react'
import { Moon, Sun } from 'lucide-react'
import Jailson from '../../assets/img/Jailson1.jpg'
import { NotificationPopover } from '../NotificationPopover'
import { useTheme } from '../../Contexts/ThemeContext'
import './Header.css'

export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`header flex items-center justify-end gap-6 w-full ${isDarkMode ? 'bg-background text-foreground' : ''}`}>
      <NotificationPopover />
      <button 
        className="icon-button w-10 h-10"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
      >
        {isDarkMode ? (
          <Sun size={24} className="theme-icon" />
        ) : (
          <Moon size={24} className="theme-icon" />
        )}
      </button>
      <div className="user-profile">
        <img
          src={Jailson}
          alt="Profile"
          className="avatar"
        />
      </div>
    </header>
  )
}

