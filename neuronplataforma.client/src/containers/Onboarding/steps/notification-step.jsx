import React from 'react';
import { useOnboarding } from '../onboarding-provider.jsx'
import { BackButton } from '../back-button.jsx'
import { ContinueButton } from '../continue-button.jsx'
import './notification-step.css'

export function NotificationStep() {
  const { nextStep, prevStep, saveAnswer } = useOnboarding()
  
  const handleContinue = () => {
    saveAnswer('notifications', true)
    nextStep()
  }

  return (
    <div className="step-container">
      <h1 className="step-title">
        Get a daily reminder to meet your goal
      </h1>
      
      <div className="notification-content">
        <img src="/placeholder.svg" alt="Notification icon" className="notification-icon" />
        <p className="notification-text">Just in case you forget!</p>
      </div>
      
      <div className="notification-box">
        <p className="notification-message">www.yourdomain.com wants to</p>
        <p className="notification-permission">Show notifications</p>
        <div className="notification-buttons">
          <button className="notification-button notification-block">Block</button>
          <button className="notification-button notification-allow" onClick={handleContinue}>Allow</button>
        </div>
      </div>
      
      <div className="button-container">
        <BackButton onClick={prevStep} />
        <ContinueButton onClick={handleContinue} />
      </div>
    </div>
  )
}

