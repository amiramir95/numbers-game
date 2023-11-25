import React from 'react'
import './index.css'

const Button = ({ number, onClick, isCorrect}) => {
  return (
    <button onClick={() => onClick(number)} className={`button button-cursor ${isCorrect ? 'correct' : ''}`}>
      {number}
    </button>
  )
}

export default Button
