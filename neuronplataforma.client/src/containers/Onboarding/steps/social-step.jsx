import React from 'react';
import { useOnboarding } from '../onboarding-provider.jsx'
import { BackButton } from '../back-button.jsx'
import { ContinueButton } from '../continue-button.jsx'
import './social-step.css'

export function SocialStep() {
  const { nextStep, prevStep, saveAnswer } = useOnboarding()
  
  const handleContinue = (option) => {
    saveAnswer('social', option)
    nextStep()
  }

  return (
    <div className="step-container">
      <h1 className="step-title">
        Want us to help you keep your daily goal?
      </h1>
      
      <div className="social-buttons">
        <button className="social-button facebook" onClick={() => handleContinue('facebook')}>
          Continue with Facebook
        </button>
        <button className="social-button google" onClick={() => handleContinue('google')}>
          Continue with Google
        </button>
      </div>
      
      <div className="button-container">
        <BackButton onClick={prevStep} />
        <ContinueButton onClick={() => handleContinue('skip')} />
      </div>
    </div>
  )
}

