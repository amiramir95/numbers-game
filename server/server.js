const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_CONNECTION_STRING)

// Create a Mongoose model for high scores
const HighScore = mongoose.model('HighScore', {
  name: String,
  score: Number,
})

app.use(bodyParser.json())

app.get('/highscore', async (req, res) => {
  try {
    const highestScore = await HighScore.findOne().sort({ score: -1 })
    res.json(highestScore)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/highscore', async (req, res) => {
  const { name, score } = req.body

  try {
    const newHighScore = new HighScore({ name, score })
    await newHighScore.save()
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
