import React from 'react'
import { useOnboarding } from '../onboarding-provider.jsx'
import { BackButton } from '../back-button.jsx'
import './goal-step.css'

export function GoalStep() {
  const { nextStep, prevStep, saveAnswer } = useOnboarding()
  
  const goals = [
    { id: 'casual', label: 'Casual', time: '5 min / day' },
    { id: 'regular', label: 'Regular', time: '10 min / day' },
    { id: 'serious', label: 'Serious', time: '15 min / day' },
    { id: 'intense', label: 'Intense', time: '20 min / day' }
  ]

  const handleSelect = (goal) => {
    saveAnswer('goal', goal)
    nextStep()
  }

  return (
    <div className="step-container">
      <h1 className="step-title">
        Great. Now choose a daily goal.
      </h1>
      
      <div className="goal-list">
        {goals.map(goal => (
          <button
            key={goal.id}
            onClick={() => handleSelect(goal.id)}
            className="goal-button"
          >
            <span className="goal-label">{goal.label}</span>
            <span className="goal-time">{goal.time}</span>
          </button>
        ))}
      </div>
      
      <div className="button-container">
        <BackButton onClick={prevStep} />
      </div>
    </div>
  )
}

