import React from 'react';
import './timeMachine.css'

export default  function TimeMachine({ selectEra }) {
  return (
    <div className="time-machine">
      <h2 className='text-timeMachine'>Escolha sua era histórica</h2>
      <div className="button-eras">
      <button className='era-histórica' onClick={() => selectEra("Idade Média")}>Idade Média</button>
      <button className='era-histórica' onClick={() => selectEra("Renascimento")}>Renascimento</button>
      <button className='era-histórica' onClick={() => selectEra("Antigo Egito")}>Antigo Egito</button>
      </div>
    </div>
  );
}