require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')

const authenticateMiddleware = require('./middlewares/authenticate')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('tiny'))
}

app.get('/protected', authenticateMiddleware, async (req, res) => {
  res.json({ message: 'Welcome to development world' })
})

app.post('/get-token',
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.json({ errors: errors.array() })
    const { email } = req.body
    const token = jwt.sign({ email }, 'S3cr3t-k3y')
    res.json({ token })
})

module.exports = app
