// App.js
import React, { useEffect, useState } from 'react'
import Button from './Button'
import Square from './Square'
import generateRandomNumbers from './utils'
import ResultDisplay from './ResultDisplay'
import { fetchHighScore, saveScore } from './api'
import './index.css'

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
    <div className="container">
      <div className="gameName">NUMBERS GAME</div>

      {/* Display squares with target numbers and results */}
      <div className="gameContainer">
        <div className="targetNumbersContainer">
          {/* Assuming Square is a component with its own styling */}
          {targetNumbers.map((num) => (
            <Square key={num} number={num} />
          ))}
        </div>

        {/* Placeholder for result messages */}
        <div className="resultsContainerPlaceholder">
          {roundsResults.map(() => (
            <div className="resultPlaceholder" key={Math.random()}></div>
          ))}
        </div>

        {/* Display True or False messages */}
        <div className="resultsContainer">
          {roundsResults.map((result, index) => (
            <ResultDisplay key={index} result={result} />
          ))}
        </div>
      </div>

      {/* Display buttons with numbers (random order) */}
      <div className="buttonsContainer">
        {/* Assuming Button is a component with its own styling */}
        {buttonNumbers.map((num) => (
          <button
              key={num}
              number={num}
              onClick={handleButtonClick}
              className="button button-cursor"
            >
            {num}
          </button>
        ))}
      </div>

      {/* Display score */}
      <br />
      <div className="scoreContainer">Score: {score}</div>

      {/* Display high score */}
      <div className="scoreContainer">High Score: {highScore}</div>
      <br />

      {/* Restart button */}
      <button onClick={restartGame} className="button button-cursor">
        Restart Game
      </button>
    </div>
  )
}

export default App
