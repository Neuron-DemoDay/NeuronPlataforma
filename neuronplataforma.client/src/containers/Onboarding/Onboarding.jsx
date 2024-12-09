'use client'

import React, { createContext, useContext, useState } from 'react';
import './onboarding.css'

// Context
const OnboardingContext = createContext({
  step: 1,
  nextStep: () => {},
  prevStep: () => {},
  answers: {},
  saveAnswer: () => {}
});

// Provider
export function OnboardingProvider({ children }) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})

  const nextStep = () => setStep(s => Math.min(s + 1, 6))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const saveAnswer = (question, answer) => {
    setAnswers(prev => ({ ...prev, [question]: answer }))
  }

  return (
    <OnboardingContext.Provider value={{ 
      step, 
      nextStep, 
      prevStep, 
      answers, 
      saveAnswer 
    }}>
      {children}
    </OnboardingContext.Provider>
  )
}

const useOnboarding = () => useContext(OnboardingContext)

// Components
function ProgressBar() {
  const { step } = useOnboarding()
  const progress = (step / 6) * 100

  return (
    <div className="progress-container">
      <div 
        className="progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} className="back-button">
      ← Back
    </button>
  )
}

function ContinueButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="continue-button"
    >
      Continue
    </button>
  )
}

function SourceStep() {
  const { nextStep, prevStep, saveAnswer } = useOnboarding()
  
  const sources = [
    { id: 'youtube', label: 'YouTube', icon: '🎥' },
    { id: 'tv', label: 'TV/streaming', icon: '📺' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'friend', label: 'Friend/Family', icon: '👥' },
    { id: 'news', label: 'News/Article', icon: '📰' },
    { id: 'other', label: 'Other', icon: '✨' }
  ]

  const handleSelect = (source) => {
    saveAnswer('source', source)
    nextStep()
  }

  return (
    <div className="step-container">
      <h1 className="step-title">
        How did you hear about us?
      </h1>
      
      <div className="grid-container">
        {sources.map(source => (
          <button
            key={source.id}
            onClick={() => handleSelect(source.id)}
            className="grid-button"
          >
            <span className="grid-icon">{source.icon}</span>
            <span className="grid-label">{source.label}</span>
          </button>
        ))}
      </div>
      
      <div className="button-container">
        <BackButton onClick={prevStep} />
      </div>
    </div>
  )
}

function ReasonStep() {
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
      
      <div className="grid-container">
        {reasons.map(reason => (
          <button
            key={reason.id}
            onClick={() => handleSelect(reason.id)}
            className="grid-button"
          >
            <span className="grid-icon">{reason.icon}</span>
            <span className="grid-label">{reason.label}</span>
          </button>
        ))}
      </div>
      
      <div className="button-container">
        <BackButton onClick={prevStep} />
      </div>
    </div>
  )
}

function GoalStep() {
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
      
      <div className="list-container">
        {goals.map(goal => (
          <button
            key={goal.id}
            onClick={() => handleSelect(goal.id)}
            className="list-button"
          >
            <span className="list-label">{goal.label}</span>
            <span className="list-time">{goal.time}</span>
          </button>
        ))}
      </div>
      
      <div className="button-container">
        <BackButton onClick={prevStep} />
      </div>
    </div>
  )
}

function NotificationStep() {
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

function SocialStep() {
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

function PathStep() {
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

function OnboardingContent() {
  const { step } = useOnboarding()
  
  return (
    <div className="step-container">
      <ProgressBar />
      
      {step === 1 && <SourceStep key="source" />}
      {step === 2 && <ReasonStep key="reason" />}
      {step === 3 && <GoalStep key="goal" />}
      {step === 4 && <NotificationStep key="notification" />}
      {step === 5 && <SocialStep key="social" />}
      {step === 6 && <PathStep key="path" />}
    </div>
  )
}

export default function Onboarding() {
  return (
    <OnboardingProvider>
      <div className="onboarding-container">
        <div className="onboarding-content">
          <OnboardingContent />
        </div>
      </div>
    </OnboardingProvider>
  )
}

