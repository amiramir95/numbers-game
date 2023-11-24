const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_CONNECTION_STRING)

// Create a Mongoose model for high scores
const HighScore = mongoose.model('HighScore', {
  score: Number,
})

app.use(bodyParser.json())

app.get('/scores/highscore', async (req, res) => {
  try {
    const highestScore = await HighScore.findOne().sort({ score: -1 })
    if (!highestScore) return res.json({ highscore: 0 })
    res.json({ highscore: highestScore.score })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/scores', async (req, res) => {
  const { score } = req.body

  try {
    const newHighScore = new HighScore({ score })
    await newHighScore.save()
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
