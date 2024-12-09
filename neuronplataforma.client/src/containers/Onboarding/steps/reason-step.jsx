import React from 'react';
import { useOnboarding } from '../onboarding-provider.jsx'
import { BackButton } from '../back-button.jsx'
import './reason-step.css'

export function ReasonStep() {
  const { nextStep, prevStep, saveAnswer } = useOnboarding()
  
  const reasons = [
    { id: 'family', label: 'Family & Friends', icon: '👨‍👩‍👧‍👦' },
    { id: 'school', label: 'School', icon: '🏫' },
    { id: 'culture', label: 'Culture', icon: '🌍' },
    { id: 'job', label: 'Job Opportunities', icon: '💼' },
    { id: 'brain', label: 'Brain Training', icon: '🧠' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'other', label: 'Other', icon: '🔮' }
  ]

  const handleSelect = (reason) => {
    saveAnswer('reason', reason)
    nextStep()
  }

  return (
    <div className="step-container">
      <h1 className="step-title">
        Why are you learning a language?
      </h1>
      
      <div className="reason-grid">
        {reasons.map(reason => (
          <button
            key={reason.id}
            onClick={() => handleSelect(reason.id)}
            className="reason-button"
          >
            <span className="reason-icon">{reason.icon}</span>
            <span className="reason-label">{reason.label}</span>
          </button>
        ))}
      </div>
      
      <div className="button-container">
        <BackButton onClick={prevStep} />
      </div>
    </div>
  )
}

