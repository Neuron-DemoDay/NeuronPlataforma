import { useState } from 'react'
import { Link, useLocation, NavLink} from 'react-router-dom'
import { Home, BarChart2, Globe, ShoppingBag, Settings, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../Contexts/ThemeContext'
import LogoNeuron from '../../assets/img/LogoNeuronBranca.svg'
import './Sidebar.css'

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: BarChart2, label: 'Cronograma', path: '/cronograma' },
  { icon: Globe, label: 'Intercâmbio', path: '/intercambio' },
  {icon : BookOpen, label: 'Aulas', path:'/aulas'},
  { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' }
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(location.pathname)
  const { isDarkMode } = useTheme();

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <aside 
      className={`sidebar ${isExpanded ? 'expanded' : ''} ${isDarkMode ? 'dark' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-header">
        <div className="logo">
          <img src={LogoNeuron} alt="Neuron Logo" className="w-10 h-10" />
          <span className="logo-text">NEURON</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path} 
            to={item.path}
            className={`nav-item ${activeItem === item.path ? 'active' : ''}`}
            title={item.label}
            onClick={() => setActiveItem(item.path)}
          >
            <div className="nav-icon">
              <item.icon size={20} />
            </div>
            <span className="nav-label">{item.label}</span>
            {activeItem === item.path && (
              <motion.div
                className="active-indicator"
                layoutId="activeIndicator"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5
                }}
              />
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

