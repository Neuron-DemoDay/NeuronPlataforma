'use client'

import React from 'react';
import { OnboardingProvider, useOnboarding } from './onboarding-provider.jsx'
import { ProgressBar } from './progress-bar.jsx'
import { 
  SourceStep,
  ReasonStep,
  GoalStep,
  NotificationStep,
  SocialStep,
  PathStep
} from './steps/step-components.jsx';
import './onboarding.css'

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

