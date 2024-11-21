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