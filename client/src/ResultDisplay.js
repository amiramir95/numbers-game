import React from 'react';

const ResultDisplay = ({ result }) => {
  return <div>{result ? 'True' : 'False'}</div>;
};

export default ResultDisplay;