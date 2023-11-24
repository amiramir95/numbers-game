import React from 'react'

const Button = ({ number, onClick, style }) => {
  return (
    <button onClick={() => onClick(number)} style={style}>
      {number}
    </button>
  )
}

export default Button
