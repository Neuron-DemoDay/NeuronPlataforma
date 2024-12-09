import React from 'react';
import { useOnboarding } from '../onboarding-provider.jsx'
import { BackButton } from '../back-button.jsx'
import './path-step.css'

export function PathStep() {
  const { nextStep, prevStep, saveAnswer } = useOnboarding()
  
  const handleSelect = (path) => {
    saveAnswer('path', path)
    nextStep()
  }

  return (
    <div className="step-container">
      <h1 className="step-title">
        Choose your path
      </h1>
      
      <div className="path-options">
        <button className="path-button" onClick={() => handleSelect('beginner')}>
          <img src="/placeholder.svg" alt="Beginner icon" className="path-icon" />
          <h2 className="path-heading">Learning French for the first time?</h2>
          <p className="path-description">Start from scratch!</p>
        </button>
        
        <button className="path-button" onClick={() => handleSelect('experienced')}>
          <img src="/placeholder.svg" alt="Experienced icon" className="path-icon" />
          <h2 className="path-heading">Already know some French?</h2>
          <p className="path-description">Check your level here!</p>
        </button>
      </div>
      
      <div className="button-container">
        <BackButton onClick={prevStep} />
      </div>
    </div>
  )
}

