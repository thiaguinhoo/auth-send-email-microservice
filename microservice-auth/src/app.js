require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('tiny'))
}

app.get('/protected', async (req, res) => {
  res.json({ message: 'Welcome to development world' })
})

module.exports = app
