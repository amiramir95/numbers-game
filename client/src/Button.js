import React from 'react';

const Button = ({ number, onClick }) => {
  return (
    <button onClick={() => onClick(number)}>
      {number}
    </button>
  );
};

export default Button;