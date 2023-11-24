import React from 'react'
import './index.css'

const Button = ({ number, onClick}) => {
  return (
    <button onClick={() => onClick(number)} className="button button-cursor">
      {number}
    </button>
  )
}

export default Button
