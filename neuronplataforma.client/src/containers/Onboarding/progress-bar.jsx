import React from 'react'
import { useOnboarding } from './onboarding-provider.jsx'
import './progress-bar.css'

export function ProgressBar () {
  const { step } = useOnboarding()
  const progress = (step / 6) * 100

  return (
    <div className='progress-container'>
      <div className='progress-bar' style={{ width: `${progress}%` }} />
    </div>
  )
}
