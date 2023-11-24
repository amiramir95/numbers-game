// App.js
import React, { useEffect, useState } from 'react'
import Button from './Button'
import Square from './Square'
import generateRandomNumbers from './utils'
import ResultDisplay from './ResultDisplay'
import { fetchHighScore, saveScore } from './api'

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
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    // Fetch the high score from the backend when the component mounts
    fetchHighScore()
      .then((result) => setHighScore(result))
      .catch((error) => console.error('Error setting high score:', error))
  }, [])

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
      // Save the score after each game.
      saveScore(score)
        .then(() => fetchHighScore())
        .then((result) => setHighScore(result))
        .catch((error) =>
          console.error('Error saving and fetching score:', error)
        )

      setTimeout(() => {
        alert(`Game Over! Your final score is ${score}.`)
        restartGame()
      }, 100)
    }
  }, [roundsResults])

  return (
    <div style={styles.container}>

      <div style={styles.gameName}>
        NUMBERS GAME
      </div>

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
      <br/>
      <div style={styles.scoreContainer}>Score: {score}</div>

      {/* Display high score */}
      <div style={styles.scoreContainer}>High Score: {highScore}</div>
      <br/>

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
    position: 'relative',
  },
  gameContainer: {
    display: 'flex',
    flexFlow:' wrap',
    alignItems: 'flex-start',
    marginBottom: '20px',
    right: '100px'
  },
  targetNumbersContainer: {
    display: 'flex',
    marginRight: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
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
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    minHeight:'100px',
    minWidth: '200px',
    border: '2px solid #d3d6db',
    borderRadius: '8px',
    padding: '10px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  resultsContainerPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '80px',
  },
  resultPlaceholder: {
    height: '20px',
    backgroundColor: 'transparent',
    marginBottom: '5px',
  },
  scoreContainer: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textTransform: 'uppercase',
    color: '#d3d6db',
  },
  restartButton: {
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
  },
  gameName: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '50px',
  }
}

export default App;
