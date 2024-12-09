<<<<<<< HEAD
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

=======
import React, { useState } from 'react';
import logoBranca from '../../assets/logoBranca.png'
import '../../styles/SideBar.css'
import { NavLink } from "react-router-dom";
import { TbHome } from "react-icons/tb";
import { MdOutlineViewTimeline } from "react-icons/md";
import { LiaPlaneDepartureSolid } from "react-icons/lia";
import { MdOutlineClass } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import User from "../User/User";
import { Outlet } from "react-router-dom";
import { RiApps2AddLine } from "react-icons/ri";
import { RiArrowDropRightLine } from "react-icons/ri";
import SvgIcon from './SvgIcon';

function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <User />
        <div className="container-nav">
          <nav className="navbar">
            <div className="navbar-identidade">
              <img src={logoBranca} alt="Logo" aria-label="Logo da Neuron" />
              <span className='navbar-nome'>Neuron</span>
            </div>
            <ul className="navbar-links">
              <li>
                <NavLink to="/">
                  <i><TbHome className="icon" /> </i>
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cronograma">
                  <i><MdOutlineViewTimeline className="icon" /></i>
                  <span>Cronograma</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/Materias">
                  <i><MdOutlineClass className="icon" /></i>
                  <span>Aulas</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/Games">
                  <i>
                    <IoGameControllerOutline className='icon' /></i>
                  <span>Jogos</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/intercambios">
                  <i><LiaPlaneDepartureSolid className="icon" /></i>
                  <span>Intercâmbios</span>
                </NavLink>
              </li>
              <li>
                  <NavLink to="/Apps">
                      <i><RiApps2AddLine className="icon" /></i>
                      <span>Apps</span>
                  </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="conte">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default SideBar;
>>>>>>> 73b51b75993fe8f92fd706fe2b58ffca7a49f05a
