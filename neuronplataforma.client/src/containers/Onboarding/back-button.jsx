import React from 'react'
import './back-button.css'

export function BackButton({ onClick }) {
  return (
    <button onClick={onClick} className="back-button">
      ← Back
    </button>
  )
}

