import React from 'react'

const ResultDisplay = ({ result }) => {
  const resultClass = result ? 'success-result' : 'error-result'
  return <div className={`${resultClass}`}>{result ? 'True' : 'False'}</div>
}

export default ResultDisplay
