'use client'

import React, { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext({
  step: 1,
  nextStep: () => {},
  prevStep: () => {},
  answers: {},
  saveAnswer: () => {}
});

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

export const useOnboarding = () => useContext(OnboardingContext)

