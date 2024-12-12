import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Card1 from './components/Card1';
import { FcClock } from "react-icons/fc";
import { VscVerifiedFilled } from "react-icons/vsc";
import { IoMdAnalytics } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import Card2 from './components/Card2';
import Card3 from './components/Card3';
import ProximasAtividades from './components/ProximasAtividades';
// import MiniCalendar from './components/Calendar';

function Dashboard() {
  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const statsData = [
    { titulo: "Horas Estudadas", valor: "5:30", icone: <FcClock /> },
    { titulo: "Tarefas Concluídas", valor: "10", icone: <VscVerifiedFilled /> },
    { titulo: "Pontuação Média", valor: "50", icone: <IoMdAnalytics /> },
    { titulo: "Tarefas Pendentes", valor: "4", icone: <MdOutlinePendingActions /> }
  ];

  return (
    <div className="dashboard-grid">
      <div className="header">
        <h1>Dashboard</h1>
        <p>Olá, {userName}. Bem-vindo ao Neuron Dashboard</p>
      </div>
      <div className="stats">
        {statsData.map((stat, index) => (
          <Card1 key={index} {...stat} />
        ))}
      </div>
      <div className="recommendation">
        <Card2 />
      </div>
      <div className="watching">
        <Card3 />
      </div>
      <div className="activities">
        <ProximasAtividades />
      </div>
      <div className="calendar">
        {/* <MiniCalendar /> */}
      </div>
    </div>
  );
}

export default Dashboard;

