import React from 'react'

const Square = ({ number }) => {
  return (
    <div
      style={{
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#be3144',
        border: '2px solid #d3d6db',
        borderRadius: '8px',
        boxSizing: 'border-box',
        color: '#d3d6db',
        cursor: 'pointer',
        minHeight: '60px',
        outline: 'none',
        padding: '16px 24px',
        textAlign: 'center',
      }}
    >
      {number}
    </div>
  )
}

export default Square
