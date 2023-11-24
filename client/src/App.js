// App.js
import React, { useEffect, useState } from 'react'
import Button from './Button'
import Square from './Square'
import generateRandomNumbers from './utils'
import ResultDisplay from './ResultDisplay'

const App = () => {
  const [buttonNumbers, setButtonNumbers] = useState(
    generateRandomNumbers(9, 1, 9)
  )
  const [targetNumbers, setTargetNumbers] = useState(
    generateRandomNumbers(3, 1, 9)
  )
  const [userNumbers, setUserNumbers] = useState([])
  const [roundsResults, setRoundsResults] = useState([])
  const [score, setScore] = useState(0)

  const handleButtonClick = (number) => {
    // Check if the clicked number is the next target number.
    if (number === targetNumbers[userNumbers.length]) {
      setUserNumbers((prevNumbers) => [...prevNumbers, number])

      // If the user has clicked all target numbers, start new round.
      if (userNumbers.length + 1 === targetNumbers.length) {
        setScore(score + 1)
        setRoundsResults((previousResults) => [...previousResults, true])
        startNewRound()
      }
    } else {
      // If the clicked number is incorrect, start new round.
      setRoundsResults((previousResults) => [...previousResults, false])
      startNewRound()
    }
  }

  const startNewRound = () => {
    setButtonNumbers(generateRandomNumbers(9, 1, 9))
    setTargetNumbers(generateRandomNumbers(3, 1, 9))
    setUserNumbers([])
  }

  const restartGame = () => {
    setRoundsResults([])
    setScore(0)
    startNewRound()
  }

  useEffect(() => {
    if (roundsResults.length === 4) {
      setTimeout(() => {
        alert(`Game Over! Your final score is ${score}.`)
        restartGame()
      }, 1000)
    }
  }, [roundsResults])

  return (
    <div style={styles.container}>
      {/* Display squares with target numbers and results */}
      <div style={styles.gameContainer}>
        <div style={styles.targetNumbersContainer}>
          {targetNumbers.map((num) => (
            <Square key={num} number={num} />
          ))}
        </div>

        {/* Placeholder for result messages */}
        <div style={styles.resultsContainerPlaceholder}>
          {roundsResults.map(() => (
            <div style={styles.resultPlaceholder}></div>
          ))}
        </div>

        {/* Display True or False messages */}
        <div style={styles.resultsContainer}>
          {roundsResults.map((result, index) => (
            <ResultDisplay key={index} result={result} />
          ))}
        </div>
      </div>

      {/* Display buttons with numbers (random order) */}
      <div style={styles.buttonsContainer}>
        {buttonNumbers.map((num) => (
          <Button
            key={num}
            number={num}
            onClick={handleButtonClick}
            style={styles.button}
          />
        ))}
      </div>

      {/* Display score */}
      <div style={styles.scoreContainer}>Score: {score}</div>

      {/* Restart button */}
      <button onClick={restartGame} style={styles.restartButton}>
        Restart Game
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  gameContainer: {
    display: 'flex',
    alignItems: 'flex-start', // Align items to the start to prevent shifting
    marginBottom: '20px',
  },
  targetNumbersContainer: {
    display: 'flex',
    marginRight: '20px',
    width: '120px', // Fixed width to prevent shifting
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    // Add your button styling here
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px', // Adjust the left margin to move it further to the right
  },
  resultsContainerPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '80px', // Set a fixed height for the placeholder
  },
  resultPlaceholder: {
    height: '20px', // Set a fixed height for each placeholder item
    backgroundColor: 'transparent', // Match the background color
    marginBottom: '5px', // Add some spacing between placeholders
  },
  scoreContainer: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  restartButton: {
    padding: '10px 15px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}

export default App;