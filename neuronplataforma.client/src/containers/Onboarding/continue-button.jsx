import React from 'react'
import './continue-button.css'

export function ContinueButton({ onClick, disabled }) {
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

