import React from 'react';
import { useOnboarding } from '../onboarding-provider.jsx'
import { BackButton } from '../back-button.jsx'
import './source-step.css'

export function SourceStep() {
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
      
      <div className="source-grid">
        {sources.map(source => (
          <button
            key={source.id}
            onClick={() => handleSelect(source.id)}
            className="source-button"
          >
            <span className="source-icon">{source.icon}</span>
            <span className="source-label">{source.label}</span>
          </button>
        ))}
      </div>
      
      <div className="button-container">
        <BackButton onClick={prevStep} />
      </div>
    </div>
  )
}

